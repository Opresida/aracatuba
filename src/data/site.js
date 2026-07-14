// Tokens de marca e dados institucionais da Araçatuba Distribuidora.
// Fonte: export original .dc.html (design-source/Site Araçatuba.dc.html).

export const brand = {
  green: '#1c3a2b',
  gold: '#d9a441',
  ink: '#1a1a17',
  muted: '#8a8578',
  cream: '#f4f0e7', // fundo (bg)
  border: '#e6e1d5', // hairline
  paper: '#ffffff',
  whatsapp: '#25D366',
};

export const site = {
  nome: 'Araçatuba',
  sub: 'Distribuidora',
  razaoSocial: 'Distribuidora Araçatuba de Alimentos LTDA',
  cnpj: '34.602.080/0001-77',
  tagline: 'Abastecendo o seu negócio',
  fundacao: '2019',
  cidade: 'Manaus • Amazonas',
  whatsappNumero: '559285902501',
  get wa() {
    return `https://wa.me/${this.whatsappNumero}`;
  },
  telefone: '(92) 8590-2501',
  endereco: ['R. Macatuba, 401 — Cidade de Deus', 'Jorge Teixeira, Manaus/AM', 'CEP 69.088-245'],
};

export const nav = [
  { href: '#empresa', label: 'A empresa' },
  { href: '#operacao', label: 'Operação' },
  { href: '#estrutura', label: 'Estrutura' },
  { href: '#trabalhe', label: 'Trabalhe conosco' },
  { href: '#faq', label: 'FAQ' },
];
