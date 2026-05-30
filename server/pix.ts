/**
 * Gerador de Payload PIX Estático (BR Code / EMV QR Code)
 * Especificação: Manual de Padrões para Iniciação do Pix - BACEN
 * Formato TLV (Tag-Length-Value) conforme padrão EMV
 */

/**
 * Formata um campo TLV: ID (2 dígitos) + tamanho (2 dígitos) + valor
 */
function tlv(id: string, value: string): string {
  const len = String(value.length).padStart(2, "0");
  return `${id}${len}${value}`;
}

/**
 * Calcula o CRC16-CCITT (polinômio 0x1021) para validação do payload PIX
 */
function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Remove acentos e caracteres especiais para compatibilidade ASCII
 */
function sanitize(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .toUpperCase()
    .substring(0, 25);
}

/**
 * Sanitiza cidade (máx 15 caracteres)
 */
function sanitizeCity(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .toUpperCase()
    .substring(0, 15);
}

export interface PixPayloadOptions {
  /** Chave PIX (CNPJ, CPF, email, telefone ou chave aleatória) */
  key: string;
  /** Nome do recebedor (máx 25 caracteres, sem acentos) */
  merchantName: string;
  /** Cidade do recebedor (máx 15 caracteres, sem acentos) */
  merchantCity: string;
  /** Valor da transação (ex: 999.90). Se omitido, valor em aberto. */
  amount?: number;
  /** Identificador da transação (TXID, máx 25 caracteres alfanuméricos) */
  txid?: string;
  /** Descrição/mensagem adicional ao pagador (máx 72 caracteres) */
  description?: string;
}

/**
 * Gera o payload PIX estático (Pix Copia e Cola) conforme especificação BACEN
 */
export function generatePixPayload(options: PixPayloadOptions): string {
  const {
    key,
    merchantName,
    merchantCity,
    amount,
    txid = "***",
    description,
  } = options;

  // Campo 26 - Merchant Account Information (Pix)
  // Subcampo 00: GUI do arranjo Pix (fixo)
  const gui = tlv("00", "BR.GOV.BCB.PIX");
  // Subcampo 01: Chave Pix do recebedor
  const pixKey = tlv("01", key);
  // Subcampo 02: Descrição (opcional)
  const descField = description ? tlv("02", description.substring(0, 72)) : "";
  const merchantAccountInfo = tlv("26", gui + pixKey + descField);

  // Campo 52 - Merchant Category Code (0000 = genérico)
  const mcc = tlv("52", "0000");

  // Campo 53 - Transaction Currency (986 = BRL)
  const currency = tlv("53", "986");

  // Campo 54 - Transaction Amount (opcional)
  const amountField =
    amount !== undefined
      ? tlv("54", amount.toFixed(2))
      : "";

  // Campo 58 - Country Code
  const countryCode = tlv("58", "BR");

  // Campo 59 - Merchant Name (máx 25 chars, sem acentos)
  const name = tlv("59", sanitize(merchantName));

  // Campo 60 - Merchant City (máx 15 chars, sem acentos)
  const city = tlv("60", sanitizeCity(merchantCity));

  // Campo 62 - Additional Data Field Template
  // Subcampo 05: TXID
  const txidField = tlv("05", txid.substring(0, 25));
  const additionalData = tlv("62", txidField);

  // Monta o payload sem o CRC
  const payloadWithoutCrc =
    tlv("00", "01") +
    merchantAccountInfo +
    mcc +
    currency +
    amountField +
    countryCode +
    name +
    city +
    additionalData +
    "6304"; // ID 63 + tamanho 04, sem o valor ainda

  // Calcula e adiciona o CRC16
  const crcValue = crc16(payloadWithoutCrc);
  return payloadWithoutCrc + crcValue;
}
