# CONTEXT — Araçatuba Distribuidora

## O que é
Cliente da **MAZARI Holding**. Distribuidora de alimentos e bebidas no atacado, sediada em Manaus/AM, fundada em 2019. Atende varejo (mercadinhos, conveniências, bares, padarias, supermercados) em Manaus e região metropolitana.

## Objetivo do site
Site institucional (one-page) para: apresentar a empresa, mostrar o portfólio de produtos, transmitir credibilidade (prova social + estrutura), captar pedidos via WhatsApp, e receber mensagens de ouvidoria e candidaturas. Inclui um **manual de marca** completo em `/brandbook`.

## Origem
Entregue como export estático `.dc.html` (formato DesignCombo, com runtime `support.js`/`image-slot.js`). Este repositório é a **conversão fiel** para React/Vite, mantendo o design (verde/dourado, Archivo) e o conteúdo. O export original está em `design-source/`.

## Dados institucionais
- Razão social: Distribuidora Araçatuba de Alimentos LTDA
- CNPJ: 34.602.080/0001-77
- Endereço: R. Macatuba, 401 — Cidade de Deus, Jorge Teixeira, Manaus/AM — CEP 69.088-245
- Telefone: (92) 8590-2501 · WhatsApp: 559285902501
- Tagline: "Abastecendo o seu negócio"
- Fonte única de verdade desses dados: `src/data/site.js`

## Portfólio (definido pelo cliente)
- **Alimentos — 70% da operação:** cesta básica completa (arroz, feijão, açúcar, café, óleo, farinhas, macarrão, leite, enlatados, **Bolacha Amori**, biscoitos, molhos, temperos, grãos…).
- **Bebidas — 30% da operação (linha seca):** refrigerantes, águas, sucos, néctares, energéticos, isotônicos, chás, cervejas e destilados (**Whisky, Old Parr, Red Label, Cachaça Camelinho (Jamel), Campari, Gin Rocks**).
- Editável em `src/data/produtos.js` (chips + galeria de fotos data-driven).

## Design system
- Paleta: verde-garrafa `#1c3a2b`, dourado âmbar `#d9a441`, grafite `#1a1a17`, neutro `#8a8578`, creme `#f4f0e7`, linha `#e6e1d5`, branco `#fff`.
- Tipografia: **Archivo** (400–900). Black para títulos/logo, Regular para corpo.
- Padrão visual: seções alternam creme/branco; verde-garrafa em seções premium (Produtos, Trabalhe conosco, painel da frota). Cards com borda fina e raio 18–22px. Chips em pílula creme. Botões raio 999px.
- **Regra:** o design é exclusivo da Araçatuba — não replicar a anatomia visual de outros clientes MAZARI (stack/utilities OK).

## Estado atual
Site completo, responsivo (mobile/tablet/desktop) e com build de produção limpo. Formulários (Ouvidoria/Trabalhe) são **client-side** (mostram sucesso, sem backend). Netlify Forms está planejado (Humberto pediu: depois). Deploy pendente (só conectar o repo).

## Repositório
GitHub: `Opresida/aracatuba` (org Opresida) — hospeda a versão React.
