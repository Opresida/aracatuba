# Araçatuba Distribuidora — Site Institucional

Site institucional + manual de marca da **Distribuidora Araçatuba de Alimentos LTDA** (CNPJ 34.602.080/0001-77 — Manaus/AM). Cliente da **MAZARI Holding**. Portado do export estático `.dc.html` para a stack React que a MAZARI usa nos projetos institucionais (referência: GLOMAM).

## Stack
- **React 19** + **Vite 8** (SPA multi-page)
- **react-router-dom 7** — rotas `/` e `/brandbook`
- **framer-motion** — reveals on-scroll
- **html2canvas** + **jsPDF** — geração de PDF no brandbook (cartão de visita, papel timbrado), em lazy-load
- Estilo: inline styles + tokens de marca (`src/data/site.js`) + `src/index.css` (hovers, animações, responsividade)
- Deploy: **Netlify** (`netlify.toml`)

## Rotas
| Rota | Página | OG própria |
|------|--------|-----------|
| `/` | Site institucional (one-page) | `og-image.png` |
| `/brandbook` | Manual de marca (7 submenus) | `og-brandbook.png` |

## Rodar local
```bash
npm install
npm run dev        # http://localhost:5000 (cai para 5001+ se ocupada)
```
> Não abrir Simple Browser / browser embutido — apenas informar a URL (Humberto usa ANTIGRAVITY).

Build de produção:
```bash
npm run build      # gera dist/ (index.html + brandbook.html)
npm run preview
```

## Estrutura
```
index.html · brandbook.html   # 2 entradas (cada rota tem sua OG estática lida por bots)
src/
  App.jsx           # BrowserRouter + rotas
  main.jsx · index.css
  pages/            # Home.jsx · Brandbook.jsx
  components/       # uma seção por arquivo (Header, Hero, Produtos, ...)
  data/             # site.js (marca+contato) · produtos.js · depoimentos.js · faqs.js
public/             # favicon, og-image, og-brandbook, robots, images/
scripts/            # enhance-photos.py (realce de fotos) · gen-og.py (imagens OG)
design-source/      # export .dc.html original (referência)
```

## Seções da Home
Header · Hero · A empresa · **Nossos produtos** (cesta básica + bebidas linha seca, split 70/30, galeria) · Operação · Prova social (carrossel) · Nossa estrutura · Ouvidoria + Trabalhe conosco · FAQ · Footer · WhatsApp flutuante.

## Brandbook (`/brandbook`)
7 submenus: **Logo** · **Cores** (copiar hex) · **Tipografia** · **UI System** · **Papel timbrado** (PDF A4) · **Cartão & E-mail** (gerador de cartão em PDF + assinatura de e-mail HTML + download das artes OG) · **Manual de uso** (fazer / não fazer).

## Marca
Verde-garrafa `#1c3a2b` · Dourado âmbar `#d9a441` · Grafite `#1a1a17` · Creme `#f4f0e7` · Linha `#e6e1d5` · Fonte **Archivo**.

## Deploy
Ver `TODO.md` → conectar `Opresida/aracatuba` na Netlify (build já configurado no `netlify.toml`).
