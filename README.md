# Araçatuba Distribuidora — Site Institucional

Site institucional da **Distribuidora Araçatuba de Alimentos LTDA** (CNPJ 34.602.080/0001-77 — Manaus/AM), portado do export estático `.dc.html` para a stack React que a MAZARI usa nos projetos.

## Stack
- **React 19** + **Vite 8** (SPA)
- **react-router-dom 7** (base para rotas futuras)
- **framer-motion** (reveals on-scroll)
- Estilo: inline styles + tokens de marca (`src/data/site.js`) + `src/index.css` (hovers, carrossel, responsividade)
- Deploy: **Netlify** (`netlify.toml`, SPA redirect)

## Rodar local
```bash
npm install
npm run dev        # http://localhost:5000 (cai pra 5001 se a 5000 estiver ocupada)
```

Build de produção:
```bash
npm run build      # gera dist/
npm run preview
```

## Estrutura
```
src/
  App.jsx              # composição das seções
  main.jsx             # entrypoint
  index.css            # base, hovers, marquee, media queries
  components/          # uma seção por arquivo (Header, Hero, Empresa, ...)
  data/               # site.js (marca+contato), depoimentos.js, faqs.js
public/images/        # fotos reais (equipe, frota, galpão)
design-source/        # export .dc.html original (referência de design)
```

## Seções
Header · Hero · A empresa · Operação · Prova social (carrossel) · Nossa estrutura · Ouvidoria + Trabalhe conosco · FAQ · Footer · WhatsApp flutuante.

## Marca
Verde `#1c3a2b` · Dourado `#d9a441` · Ink `#1a1a17` · Creme `#f4f0e7` · Fonte **Archivo**.
