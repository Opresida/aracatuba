# ARCHITECTURE — Araçatuba Distribuidora

## Visão geral
SPA estática (sem backend). Todo o conteúdo é renderizado no cliente a partir de dados em `src/data/`. Deploy como site estático no Netlify.

## Camadas
| Camada | Onde | Responsabilidade |
|--------|------|------------------|
| Entrypoint | `src/main.jsx` | Monta o React root |
| Composição | `src/App.jsx` | Ordena as seções da página |
| Seções | `src/components/*.jsx` | Uma seção da landing por arquivo |
| Dados | `src/data/*.js` | Marca, contato, depoimentos, FAQ (fonte única) |
| Estilo | inline + `src/index.css` | Layout inline; hovers/animações/responsivo no CSS |

## Componentes
- `Header` — nav sticky + logo + CTA WhatsApp
- `Hero` — headline, stats, foto da equipe, badge
- `Empresa` — 4 cards de diferenciais + card de razão social
- `Operacao` — painel da marca + fotos da frota
- `Depoimentos` — carrossel infinito (CSS marquee, lista duplicada)
- `Estrutura` — grid de fotos do galpão
- `Contato` — Ouvidoria + Trabalhe conosco (forms com estado local)
- `FAQ` — accordion nativo `<details>`
- `Footer` — contato, links institucionais, redes
- `WhatsAppBtn` — botão flutuante fixo
- `Logo` / `Reveal` — utilitários compartilhados

## Decisões
- **Inline styles + tokens** (não Tailwind/CSS-modules) para manter fidelidade 1:1 com o export `.dc.html` de origem e facilitar ajustes visuais pontuais.
- **framer-motion** só para reveal on-scroll (padrão dos projetos institucionais MAZARI, ex.: GLOMAM).
- **Marquee em CSS puro** (`@keyframes`) em vez de JS — mesma técnica do original.
- **react-router-dom** incluído para permitir rotas futuras (ex.: página de política/LGPD), hoje a app é one-page com âncoras.

## Responsividade
Grids colapsam em `@media (max-width:900px)` e `620px` (ver `index.css`). O export original era desktop-only; a versão React adiciona mobile.
