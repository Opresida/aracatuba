# TODO — Araçatuba Distribuidora

## Deploy Netlify — passo manual (só isto falta pra ir ao ar)
Projeto pronto pra publicar. Como o deploy exige login na Netlify (não automatizável daqui), faça uma vez:
1. Netlify → **Add new site → Import an existing project → GitHub → `Opresida/aracatuba`**.
2. Build já vem do `netlify.toml` (`npm run build`, publish `dist`, Node 22). **Deploy**.
3. (Opcional) **Domain settings** → domínio final.

### Ajuste fino de SEO pós-deploy (quando souber a URL)
- [ ] `og:image`/`twitter:image` → **URL absoluta** nos dois HTMLs (`index.html` e `brandbook.html`). WhatsApp exige absoluta pra mostrar a prévia.
- [ ] Adicionar `og:url` com o domínio final em cada HTML.

## Backend / integrações
- [x] **Netlify Forms** — Ouvidoria (`ouvidoria`) e Trabalhe conosco (`trabalhe-conosco`, com upload de currículo) ligados: forms ocultos de detecção no `index.html` + forms React com `name`/honeypot/`form-name` + envio AJAX. **Testar no site publicado** (só funciona no Netlify, não local) e configurar notificações por e-mail no painel Netlify → Forms.
- [ ] **Redes sociais** — trocar os `#` do rodapé pelos perfis reais.

## Conteúdo
- [ ] Adicionar/trocar fotos de produto (galeria data-driven em `src/data/produtos.js`).
- [ ] Confirmar telefone/WhatsApp e e-mail institucional com o cliente.
- [ ] Ajustar mix de itens dos chips se o cliente refinar o portfólio.

## Melhorias possíveis (não urgentes)
- [ ] Barra de submenus do brandbook: hoje rola horizontal no mobile — avaliar quebrar em 2 linhas.
- [ ] Logos completos (principal/mono) em download no brandbook, além do ícone.

## Feito
- [x] Conversão do export `.dc.html` → React 19 + Vite; repo `Opresida/aracatuba`.
- [x] Home completa + seção **Nossos produtos** (cesta básica + bebidas linha seca, split 70/30, galeria de fotos reais tratadas).
- [x] Rota **/brandbook** completa (Logo · Cores/copiar hex · Tipografia · UI System · Papel timbrado PDF A4 · Cartão & E-mail: cartão PDF + assinatura HTML + OG download · Manual de uso). PDF em lazy-load.
- [x] **Responsividade completa** (menu hamburger, grids colapsam, sem overflow horizontal).
- [x] Favicon (SVG+PNG) e **OG por rota** (`og-image.png` / `og-brandbook.png`).
- [x] `netlify.toml` (Node 22, redirect SPA + rewrite brandbook, cache, headers de segurança).
- [x] 5 docs canônicos (README, CONTEXT, ARCHITECTURE, PROJECT_CONTEXT, TODO) + CLAUDE.md.
