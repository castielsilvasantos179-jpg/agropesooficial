// AgroPeso — Dados dos Produtos
// Design: Agro-Tech Moderno | Paleta: Navy + Amber
// Integração: Preços fictícios + Carrossel de imagens + Checkout

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  model: string;
  name: string;
  category: string;
  categoryColor: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[]; // Carrossel de imagens
  price: number; // Preço em reais
  specs: ProductSpec[];
  features: string[];
  applications: string[];
  capacity: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "balanca-barra-60",
    model: "INBA-60",
    name: "Balança de Barra 60cm",
    category: "Linha Standard",
    categoryColor: "blue",
    shortDescription:
      "Indicada para instalação em corredores de passagem (Tronco) com prancha de madeira, possibilitando a pesagem precisa dos animais durante o manejo.",
    fullDescription:
      "A Balança de Barra INBA-60 é a solução ideal para produtores que trabalham com corredores de passagem e troncos de contenção. Com 60 cm de comprimento, esta balança eletrônica de alta precisão foi projetada para suportar as condições mais exigentes do ambiente rural. Sua estrutura em aço carbono com pintura eletrostática garante resistência à corrosão, enquanto os pés articulados permitem nivelamento preciso em qualquer superfície. O cabo de 5 metros com mangueira de proteção oferece flexibilidade na instalação e durabilidade prolongada.",
    image: "https://inbalancebalancas.com.br/products/standard/INBA-60 1.webp",
    gallery: [
      "https://inbalancebalancas.com.br/products/standard/INBA-60 1.webp",
      "https://inbalancebalancas.com.br/videos/app-img-1.webp",
      "https://inbalancebalancas.com.br/videos/app-img-2.webp",
    ],
    price: 999.90,
    capacity: "Até 2.000 kg",
    badge: "Mais Vendido",
    specs: [
      { label: "Capacidade", value: "2.000 kg" },
      { label: "Divisão", value: "0,5 kg" },
      { label: "Comprimento", value: "60 cm" },
      { label: "Formato da Barra", value: "Retangular" },
      { label: "Cabos", value: "5 m c/ proteção" },
      { label: "Suporte Fixação", value: "Furação Superior" },
      { label: "Pés Articulados", value: "Sim" },
      { label: "Aplicação", value: "Corredor · Tronco" },
      { label: "Alimentação", value: "Bivolt (110/220V)" },
      { label: "Garantia", value: "12 meses" },
    ],
    features: [
      "Barra blindada contra roedores",
      "Pintura eletrostática de alta durabilidade",
      "5 m de cabos com mangueiras de proteção",
      "Pés articulados para nivelamento preciso",
      "Indicador digital com display LCD",
      "Função tara e zero automático",
    ],
    applications: [
      "Corredores de passagem",
      "Troncos de contenção",
      "Currais de manejo",
      "Instalações fixas",
    ],
  },
  {
    id: "2",
    slug: "balanca-barra-90",
    model: "INBA-90",
    name: "Balança de Barra 90cm",
    category: "Linha Standard",
    categoryColor: "blue",
    shortDescription:
      "Indicada para uso em bretes de contenção, troncos de vacinação, gaiolas de pesagem e corredores de passagem com suporte ajustável.",
    fullDescription:
      "A Balança de Barra INBA-90 oferece versatilidade superior com seu suporte de fixação ajustável, tornando-a compatível com a grande maioria dos bretes e troncos disponíveis no mercado. Com 90 cm de comprimento, esta balança atende operações de médio porte com precisão e confiabilidade. Ideal para fazendas que realizam vacinação, pesagem de controle e avaliação de ganho de peso. A barra retangular blindada protege os componentes internos contra danos causados por roedores, garantindo maior vida útil do equipamento.",
    image: "https://inbalancebalancas.com.br/products/standard/INBA-90 1.webp",
    gallery: [
      "https://inbalancebalancas.com.br/products/standard/INBA-90 1.webp",
      "https://inbalancebalancas.com.br/videos/app-img-2.webp",
      "https://inbalancebalancas.com.br/videos/app-img-3.webp",
    ],
    price: 999.90,
    capacity: "Até 2.000 kg",
    specs: [
      { label: "Capacidade", value: "2.000 kg" },
      { label: "Divisão", value: "0,5 kg" },
      { label: "Comprimento", value: "90 cm" },
      { label: "Formato da Barra", value: "Retangular" },
      { label: "Cabos", value: "5 m c/ proteção" },
      { label: "Suporte Fixação", value: "Ajustável" },
      { label: "Pés Articulados", value: "Sim" },
      { label: "Aplicação", value: "Brete · Tronco · Gaiola" },
      { label: "Alimentação", value: "Bivolt (110/220V)" },
      { label: "Garantia", value: "12 meses" },
    ],
    features: [
      "Suporte ajustável para diferentes modelos de brete",
      "Barra blindada contra roedores",
      "Pintura eletrostática de alta durabilidade",
      "5 m de cabos com mangueiras de proteção",
      "Pés articulados para nivelamento preciso",
      "Indicador digital com memória de pesagens",
    ],
    applications: [
      "Bretes de contenção",
      "Troncos de vacinação",
      "Gaiolas de pesagem",
      "Corredores de passagem",
    ],
  },
  {
    id: "3",
    slug: "balanca-barra-120",
    model: "INBA-120",
    name: "Balança de Barra 120cm",
    category: "Linha Standard",
    categoryColor: "blue",
    shortDescription:
      "Ideal para gaiolas onde se pesa mais de um animal simultaneamente e bretes de vacinação com entre chassis de 1,16 a 1,20 m.",
    fullDescription:
      "A Balança de Barra INBA-120 é a escolha certa para operações de grande escala que exigem pesagem de múltiplos animais ou trabalham com gaiolas de maior dimensão. Com 120 cm de comprimento, esta balança suporta bretes com entre chassis de 1,16 a 1,20 m, sendo compatível com os principais modelos de gaiolas multi-animal do mercado. Perfeita para confinamentos, leilões e operações de alto volume onde a eficiência no manejo é fundamental para a rentabilidade da operação.",
    image: "https://inbalancebalancas.com.br/products/standard/INBA-120 1.webp",
    gallery: [
      "https://inbalancebalancas.com.br/products/standard/INBA-120 1.webp",
      "https://inbalancebalancas.com.br/videos/app-img-3.webp",
      "https://inbalancebalancas.com.br/videos/app-img-4.webp",
    ],
    price: 999.90,
    capacity: "Até 3.000 kg",
    badge: "Multi-Animal",
    specs: [
      { label: "Capacidade", value: "3.000 kg" },
      { label: "Divisão", value: "0,5 kg" },
      { label: "Comprimento", value: "120 cm" },
      { label: "Formato da Barra", value: "Retangular" },
      { label: "Cabos", value: "5 m c/ proteção" },
      { label: "Suporte Fixação", value: "Ajustável" },
      { label: "Pés Articulados", value: "Sim" },
      { label: "Aplicação", value: "Gaiola multi-animal" },
      { label: "Entre Chassis", value: "1,16 a 1,20 m" },
      { label: "Garantia", value: "12 meses" },
    ],
    features: [
      "Compatível com gaiolas multi-animal",
      "Suporte ajustável para entre chassis de 1,16 a 1,20 m",
      "Barra blindada contra roedores",
      "Pintura eletrostática de alta durabilidade",
      "5 m de cabos com mangueiras de proteção",
      "Maior capacidade para pesagem simultânea",
    ],
    applications: [
      "Gaiolas multi-animal",
      "Bretes de vacinação de grande porte",
      "Confinamentos",
      "Leilões e exposições",
    ],
  },
  {
    id: "5",
    slug: "balanca-barra-s-60",
    model: "INBA-60S",
    name: "Balança de Barra S 60cm",
    category: "Linha S",
    categoryColor: "purple",
    shortDescription:
      "Versão S de 60 cm indicada para corredores de passagem (Tronco) com maior capacidade de carga e barra em perfil U.",
    fullDescription:
      "A Balança de Barra INBA-60S é a versão premium da série com maior capacidade de carga e barra em perfil U para maior resistência. Indicada para corredores de passagem e troncos onde se exige durabilidade extrema. Com capacidade de 2.000 kg e estrutura reforçada, esta balança é ideal para operações intensivas onde a confiabilidade é crítica. O perfil em U oferece maior rigidez estrutural, reduzindo vibrações e melhorando a precisão das leituras mesmo sob condições adversas.",
    image: "https://inbalancebalancas.com.br/products/series-s/INBA-60S 1.webp",
    gallery: [
      "https://inbalancebalancas.com.br/products/series-s/INBA-60S 1.webp",
      "https://inbalancebalancas.com.br/videos/app-img-1.webp",
      "https://inbalancebalancas.com.br/videos/app-img-4.webp",
    ],
    price: 999.90,
    capacity: "Até 2.000 kg",
    badge: "Premium",
    specs: [
      { label: "Capacidade", value: "2.000 kg" },
      { label: "Divisão", value: "0,5 kg" },
      { label: "Comprimento", value: "60 cm" },
      { label: "Formato da Barra", value: "Perfil em U" },
      { label: "Cabos", value: "5 m c/ proteção" },
      { label: "Suporte Fixação", value: "Furação Superior" },
      { label: "Pés Articulados", value: "Sim" },
      { label: "Aplicação", value: "Corredor · Tronco" },
      { label: "Alimentação", value: "Bivolt (110/220V)" },
      { label: "Garantia", value: "24 meses" },
    ],
    features: [
      "Barra em perfil U para maior rigidez",
      "Barra blindada contra roedores",
      "Pintura eletrostática de alta durabilidade",
      "5 m de cabos com mangueiras de proteção",
      "Pés articulados para nivelamento preciso",
      "Indicador digital com display LCD de alta visibilidade",
    ],
    applications: [
      "Corredores de passagem intensivos",
      "Troncos de contenção de alta demanda",
      "Currais de manejo profissional",
      "Operações de leilão",
    ],
  },
  {
    id: "6",
    slug: "balanca-barra-s-90",
    model: "INBA-90S",
    name: "Balança de Barra S 90cm",
    category: "Linha S",
    categoryColor: "purple",
    shortDescription:
      "Versão S de 90 cm para bretes de contenção, troncos de vacinação, gaiolas e corredores com maior capacidade de carga.",
    fullDescription:
      "A Balança de Barra INBA-90S é a solução robusta para operações que exigem máxima durabilidade e capacidade de carga. Com 90 cm de comprimento e barra em perfil U, esta balança suporta 4.000 kg de capacidade, sendo ideal para operações com animais de maior peso ou pesagem de múltiplos animais. O suporte de fixação em barra oferece maior estabilidade e compatibilidade com diferentes modelos de bretes. Perfeita para confinamentos, leilões e operações de alto volume.",
    image: "https://inbalancebalancas.com.br/products/series-s/INBA-90S 1.webp",
    gallery: [
      "https://inbalancebalancas.com.br/products/series-s/INBA-90S 1.webp",
      "https://inbalancebalancas.com.br/videos/app-img-2.webp",
      "https://inbalancebalancas.com.br/videos/app-img-1.webp",
    ],
    price: 999.90,
    capacity: "Até 4.000 kg",
    badge: "Premium",
    specs: [
      { label: "Capacidade", value: "4.000 kg" },
      { label: "Divisão", value: "0,5 kg" },
      { label: "Comprimento", value: "90 cm" },
      { label: "Formato da Barra", value: "Perfil em U" },
      { label: "Cabos", value: "5 m c/ proteção" },
      { label: "Suporte Fixação", value: "Barra de fixação" },
      { label: "Pés Articulados", value: "Sim" },
      { label: "Aplicação", value: "Brete · Tronco · Gaiola" },
      { label: "Alimentação", value: "Bivolt (110/220V)" },
      { label: "Garantia", value: "24 meses" },
    ],
    features: [
      "Furação na barra de fixação para máxima estabilidade",
      "Barra em perfil U com 4000 kg de capacidade",
      "Pintura eletrostática de alta durabilidade",
      "5 m de cabos com mangueiras de proteção",
      "Pés articulados para nivelamento preciso",
      "Indicador digital com memória avançada de pesagens",
    ],
    applications: [
      "Bretes de contenção profissional",
      "Troncos de vacinação de grande porte",
      "Gaiolas multi-animal",
      "Confinamentos e operações intensivas",
    ],
  },
  {
    id: "7",
    slug: "balanca-barra-s-120",
    model: "INBA-120S",
    name: "Balança de Barra S 120cm",
    category: "Linha S",
    categoryColor: "purple",
    shortDescription:
      "Versão S de 120 cm para gaiolas multi-animal e bretes com entre chassis de 1,20 m, com máxima capacidade de carga.",
    fullDescription:
      "A Balança de Barra INBA-120S é o topo de linha para operações que exigem máxima capacidade e confiabilidade. Com 120 cm de comprimento e barra em perfil U, esta balança é capaz de suportar até 4.000 kg, sendo ideal para gaiolas multi-animal e bretes de grande porte. O suporte de fixação em barra oferece estabilidade excepcional mesmo em operações de alto volume. Perfeita para leilões, confinamentos de grande escala e operações profissionais onde a precisão e durabilidade são críticas.",
    image: "https://inbalancebalancas.com.br/products/series-s/INBA-120S 1.webp",
    gallery: [
      "https://inbalancebalancas.com.br/products/series-s/INBA-120S 1.webp",
      "https://inbalancebalancas.com.br/videos/app-img-3.webp",
      "https://inbalancebalancas.com.br/videos/app-img-2.webp",
    ],
    price: 999.90,
    capacity: "Até 4.000 kg",
    badge: "Premium",
    specs: [
      { label: "Capacidade", value: "4.000 kg" },
      { label: "Divisão", value: "0,5 kg" },
      { label: "Comprimento", value: "120 cm" },
      { label: "Formato da Barra", value: "Perfil em U" },
      { label: "Cabos", value: "5 m c/ proteção" },
      { label: "Suporte Fixação", value: "Barra de fixação" },
      { label: "Pés Articulados", value: "Sim" },
      { label: "Aplicação", value: "Gaiola multi-animal" },
      { label: "Entre Chassis", value: "1,20 m" },
      { label: "Garantia", value: "24 meses" },
    ],
    features: [
      "Barra em perfil U com 4000 kg de capacidade",
      "Compatível com gaiolas multi-animal de grande porte",
      "Suporte de fixação em barra para máxima estabilidade",
      "Pintura eletrostática de alta durabilidade",
      "5 m de cabos com mangueiras de proteção",
      "Indicador digital com display LED de alta visibilidade",
    ],
    applications: [
      "Gaiolas multi-animal de grande porte",
      "Bretes de vacinação profissional",
      "Confinamentos de alta capacidade",
      "Leilões e exposições agropecuárias",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
