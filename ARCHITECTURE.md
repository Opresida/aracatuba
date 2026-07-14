# ARCHITECTURE — Araçatuba Distribuidora

## Visão geral
SPA estática (sem backend). Todo o conteúdo é renderizado no cliente a partir de dados em `src/data/`. **Multi-page**: duas entradas HTML (`index.html`, `brandbook.html`) para que cada rota tenha sua própria meta OG lida por bots (WhatsApp/redes não executam JS). Deploy como site estático no Netlify.

## Camadas
| Camada | Onde | Responsabilidade |
|--------|------|------------------|
| Entradas HTML | `index.html`, `brandbook.html` | Meta/OG por rota + injeção do bundle (via `build.rollupOptions.input`) |
| Entrypoint | `src/main.jsx` | Monta o React root |
| Rotas | `src/App.jsx` | `BrowserRouter` + `ScrollToTop` + rotas `/` e `/brandbook` |
| Páginas | `src/pages/` | `Home.jsx` (composição das seções) · `Brandbook.jsx` (7 submenus) |
| Seções | `src/components/*.jsx` | Uma seção da landing por arquivo |
| Dados | `src/data/*.js` | Marca, contato, produtos, depoimentos, FAQ (fonte única) |
| Estilo | inline + `src/index.css` | Layout inline; hovers/animações/responsivo no CSS |

## Componentes (Home)
`Header` (nav sticky + menu hamburger mobile) · `Hero` · `Empresa` · `Produtos` (split 70/30 + galeria) · `Operacao` · `Depoimentos` (carrossel CSS) · `Estrutura` · `Contato` (Ouvidoria + Trabalhe, forms com estado local) · `FAQ` · `Footer` · `WhatsAppBtn`. Utilitários: `Logo`, `Reveal` (framer-motion), `ScrollToTop`.

## Brandbook (`src/pages/Brandbook.jsx`)
Página com abas (submenus) via estado `tab`. Sub-componentes internos: `Emblem` (marca "A" parametrizável), `Block`. Funções: `copyHex`, `baixarCartaoPDF`, `baixarTimbradoPDF`, `assinaturaHTML`/`copiarAssinatura`/`baixarAssinaturaHTML`. **html2canvas + jsPDF são carregados sob demanda** (`loadPdfLibs()`), fora do bundle inicial.

## Decisões
- **Inline styles + tokens** (não Tailwind/CSS-modules) para fidelidade 1:1 com o export `.dc.html` e ajustes visuais pontuais.
- **framer-motion** só para reveal on-scroll (padrão institucional MAZARI).
- **Marquee em CSS puro** (`@keyframes`) para o carrossel de depoimentos.
- **Multi-page** em vez de SSR/prerender: solução leve para OG por rota numa SPA estática.
- **Lazy-load do PDF** (html2canvas/jspdf ~600kb) para não pesar o carregamento inicial.
- **Dados centralizados** em `src/data/` — produtos, cores e contato editáveis sem tocar em componentes.

## Responsividade
Grids colapsam via classes em `index.css` (breakpoints 900/860/620/560/400px). Header vira menu hamburger ≤860px. Formulários colapsam para 1 coluna. Tipografia de títulos reduz em degraus. Meta: zero overflow horizontal em qualquer largura.

## Assets & scripts
- `public/` — favicon (svg/png), `og-image.png`, `og-brandbook.png`, `robots.txt`, `images/` (fotos reais tratadas).
- `scripts/enhance-photos.py` — realce (autocontraste + unsharp) das fotos de produto → webp.
- `scripts/gen-og.py` — gera as imagens OG (site + manual) e o favicon PNG.

## Netlify (`netlify.toml`)
Node 22 · rewrite `/brandbook → /brandbook.html` + catch-all SPA · cache de assets/imagens · headers de segurança.
