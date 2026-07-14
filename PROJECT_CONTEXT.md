# PROJECT_CONTEXT — Araçatuba Distribuidora

> Visão consolidada + status/localização para quem (ou qual agente) continuar o projeto.

## Localização
- **Projeto React (ativo):** `C:\Users\user\aracatuba`
- **Export original de design:** `design-source/` (`.dc.html`) — cópia do que veio no Desktop
- **Repo GitHub:** https://github.com/Opresida/aracatuba (org Opresida)

## Como rodar
```bash
cd /c/Users/user/aracatuba
npm install
npm run dev     # porta 5000 (cai para 5001+ se ocupada)
```
Não abrir Simple Browser / VS Code embutido (ANTIGRAVITY) — só informar a URL localhost.

## Stack e convenções
Vite + React 19 + react-router-dom + framer-motion + html2canvas/jsPDF. Deploy Netlify, porta 5000, host 0.0.0.0. Padrão institucional MAZARI (ref: GLOMAM), mas **design exclusivo da Araçatuba** (verde/dourado, Archivo). Detalhes em `CLAUDE.md`, `CONTEXT.md`, `ARCHITECTURE.md`.

## O que é
Site institucional (one-page) + manual de marca (`/brandbook`) da Distribuidora Araçatuba de Alimentos — atacado de alimentos e bebidas em Manaus/AM, desde 2019. CNPJ 34.602.080/0001-77. Cliente da MAZARI Holding.

## Status
- **Pronto e responsivo** (mobile/tablet/desktop), build de produção limpo.
- Rotas `/` (site) e `/brandbook` (manual completo, 7 submenus, geradores de cartão/assinatura/timbrado).
- Formulários client-side (sem backend).
- **Deploy pendente** — só conectar o repo na Netlify (ver `TODO.md`).

## Próximos passos prováveis
Ver `TODO.md`: publicar na Netlify → ajustar OG absoluta → (quando pedido) ligar Netlify Forms → refinar fotos/itens de produto conforme o cliente.
