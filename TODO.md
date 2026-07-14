# TODO — Araçatuba Distribuidora

## Pendências técnicas
- [ ] **Favicon** — adicionar `public/favicon.ico` + `<link rel="icon">` no `index.html` (hoje dá 404, cosmético).
- [ ] **OG image** — gerar `public/og-image.png` (1200×630) e apontar as metas `og:image`/`twitter:image` no `index.html`.
- [ ] **Domínio/URL** — preencher `og:url` quando o domínio final for definido.

## Backend / integrações (quando aprovado)
- [ ] **Formulários reais** — Ouvidoria e Trabalhe conosco hoje são client-side (só mostram sucesso). Ligar a Netlify Forms (padrão GLOMAM) ou e-mail (Resend). Upload de currículo (PDF) precisa de storage.
- [ ] **Redes sociais** — trocar os `#` do rodapé pelos perfis reais (Instagram/Facebook/X) quando existirem.

## Conteúdo
- [ ] Substituir fotos do galpão/frota por versões finais quando o cliente enviar as definitivas.
- [ ] Confirmar telefone/WhatsApp com o cliente (hoje: (92) 8590-2501 / 559285902501).

## Deploy
- [ ] Publicar no Netlify e configurar domínio.
- [ ] Decidir se o repo `Opresida/aracatuba` passa a hospedar esta versão React (substituindo o export `.dc.html`).

## Feito
- [x] Conversão fiel do export `.dc.html` para React 19 + Vite.
- [x] Todas as 10 seções portadas e verificadas no navegador.
- [x] Responsividade mobile adicionada.
- [x] Build de produção limpo.
