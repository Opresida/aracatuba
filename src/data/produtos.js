// Linhas de produto da Araçatuba.
// Operação atual: 70% alimentos / 30% bebidas.
// Cesta básica: atende tudo. Bebidas: todas as bebidas de linha seca (não refrigeradas).

export const split = [
  { chave: 'alimentos', rotulo: 'Alimentos', pct: 70 },
  { chave: 'bebidas', rotulo: 'Bebidas', pct: 30 },
];

export const linhas = [
  {
    chave: 'alimentos',
    titulo: 'Cesta básica completa',
    pct: 70,
    resumo: 'Atendemos a cesta básica inteira — do arroz-com-feijão do dia a dia ao que não pode faltar na prateleira do seu comércio.',
    icone: 'cesta',
    itens: [
      'Arroz', 'Feijão', 'Açúcar', 'Café', 'Óleo de soja', 'Farinha de trigo',
      'Farinha de mandioca', 'Macarrão', 'Sal', 'Leite', 'Enlatados', 'Biscoitos',
      'Bolacha Amori', 'Bolachas', 'Fubá e flocão', 'Molhos e extratos', 'Temperos', 'Grãos e cereais',
    ],
    fotos: [
      { src: '/images/produtos/alimentos-1.webp', alt: 'Estoque de alimentos no galpão da Araçatuba' },
      { src: '/images/produtos/alimentos-2.webp', alt: 'Produtos de cesta básica armazenados' },
      { src: '/images/produtos/alimentos-3.webp', alt: 'Linha de alimentos da Araçatuba' },
    ],
  },
  {
    chave: 'bebidas',
    titulo: 'Bebidas — linha seca',
    pct: 30,
    resumo: 'Toda a linha seca de bebidas — de refrigerantes e águas a cervejas e destilados. Distribuição completa para abastecer o seu ponto de venda.',
    icone: 'bebida',
    itens: [
      'Refrigerantes', 'Águas minerais', 'Água com gás', 'Sucos', 'Néctares',
      'Água de coco', 'Energéticos', 'Isotônicos', 'Chás prontos', 'Cervejas',
      'Whisky', 'Whisky Old Parr', 'Whisky Red Label', 'Cachaça Camelinho (Jamel)', 'Campari', 'Gin Rocks',
    ],
    fotos: [
      { src: '/images/produtos/bebidas-1.webp', alt: 'Pallets de cerveja no galpão da Araçatuba' },
      { src: '/images/produtos/bebidas-2.webp', alt: 'Estoque de bebidas da Araçatuba' },
      { src: '/images/produtos/bebidas-3.webp', alt: 'Linha de bebidas da Araçatuba' },
    ],
  },
];
