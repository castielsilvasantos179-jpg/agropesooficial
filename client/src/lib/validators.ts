/**
 * Validadores e utilitários para o checkout
 */

/**
 * Valida um CPF brasileiro
 * Remove caracteres especiais e verifica dígitos verificadores
 */
export function validateCPF(cpf: string): boolean {
  // Remove caracteres especiais
  const cleanCPF = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Calcula o primeiro dígito verificador
  let sum = 0;
  let remainder = 0;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
}

/**
 * Formata CPF para o padrão XXX.XXX.XXX-XX
 */
export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/\D/g, "");
  if (cleanCPF.length !== 11) return cpf;
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/**
 * Interface para dados de endereço retornados pela ViaCEP
 */
export interface CEPData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

/**
 * Busca endereço pela ViaCEP
 * Retorna null se o CEP for inválido ou não encontrado
 */
export async function fetchAddressByCEP(cep: string): Promise<CEPData | null> {
  try {
    // Remove caracteres especiais do CEP
    const cleanCEP = cep.replace(/\D/g, "");

    // Valida o tamanho do CEP
    if (cleanCEP.length !== 8) {
      return null;
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // ViaCEP retorna erro=true se o CEP não existe
    if (data.erro) {
      return null;
    }

    return data as CEPData;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
}

/**
 * Formata CEP para o padrão XXXXX-XXX
 */
export function formatCEP(cep: string): string {
  const cleanCEP = cep.replace(/\D/g, "");
  if (cleanCEP.length !== 8) return cep;
  return cleanCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
}
