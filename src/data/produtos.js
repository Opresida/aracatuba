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
      'Bolachas', 'Fubá e flocão', 'Molhos e extratos', 'Temperos', 'Grãos e cereais',
    ],
  },
  {
    chave: 'bebidas',
    titulo: 'Bebidas — linha seca',
    pct: 30,
    resumo: 'Toda a linha seca de bebidas (não refrigeradas): a distribuição completa para abastecer o seu ponto de venda.',
    icone: 'bebida',
    itens: [
      'Refrigerantes', 'Águas minerais', 'Água com gás', 'Sucos', 'Néctares',
      'Água de coco', 'Energéticos', 'Isotônicos', 'Chás prontos', 'Cervejas',
    ],
  },
];
