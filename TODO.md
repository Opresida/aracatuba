# TODO — Araçatuba Distribuidora

## Deploy Netlify — passo manual (só isto falta)
O projeto está **pronto pra publicar**. Como o deploy exige login na Netlify (não dá pra automatizar por aqui), faça uma vez:

1. Netlify → **Add new site → Import an existing project → GitHub → `Opresida/aracatuba`**.
2. Build já vem preenchido pelo `netlify.toml` (command `npm run build`, publish `dist`, Node 22). É só **Deploy**.
3. (Opcional) **Domain settings** → definir o domínio/subdomínio final.

Depois do deploy, um ajuste fino de SEO (quando souber a URL final):
- [ ] Trocar `og:image`/`twitter:image` para **URL absoluta** nos dois HTMLs — `index.html` (`/og-image.png`) e `brandbook.html` (`/og-brandbook.png`). O WhatsApp exige URL absoluta pra mostrar a prévia (ex.: `https://aracatuba.netlify.app/og-image.png`).
- [ ] Adicionar `og:url` com o domínio final em cada HTML.

## Backend / integrações (quando aprovado)
- [ ] **Formulários reais** — Ouvidoria e Trabalhe conosco hoje são client-side. Ligar a Netlify Forms (Humberto pediu: *depois*, não agora). Upload de currículo (PDF) precisa de storage.
- [ ] **Redes sociais** — trocar os `#` do rodapé pelos perfis reais quando existirem.

## Conteúdo
- [ ] Substituir/adicionar fotos de produto conforme o cliente enviar (galeria é data-driven em `src/data/produtos.js`).
- [ ] Confirmar telefone/WhatsApp com o cliente.

## Feito
- [x] Conversão do export `.dc.html` para React 19 + Vite.
- [x] Todas as seções portadas + seção **Nossos produtos** (cesta básica + bebidas linha seca, split 70/30, galeria de fotos).
- [x] Rota **/brandbook** completa, com submenus: Logo · Cores (copiar hex) · Tipografia · UI System · Papel timbrado (PDF A4) · Cartão & E-mail (gerador de cartão em PDF + assinatura de e-mail HTML) · Manual de uso (fazer/não fazer). Libs de PDF (html2canvas/jspdf) em lazy-load.
- [x] **Responsividade completa** (mobile/tablet/desktop) com menu hamburger.
- [x] **Favicon** (SVG + PNG) e **OG image** 1200×630 pra compartilhamento.
- [x] `netlify.toml` com Node 22, redirect SPA, cache de assets e headers de segurança.
- [x] Build de produção validado (preview servindo `dist` com todos os assets 200).
- [x] Repo `Opresida/aracatuba` hospedando a versão React.
