# PROJECT_CONTEXT — Araçatuba Distribuidora

> Contexto operacional para quem (ou qual agente) for continuar o projeto.

## Localização
- **Projeto React (ativo):** `C:\Users\user\aracatuba`
- **Export original de design:** `C:\Users\user\Desktop\MAZARI HOLDING\aracatuba` (`.dc.html`) — também copiado em `aracatuba/design-source/`
- **Repo GitHub:** https://github.com/Opresida/aracatuba (org Opresida)

## Como rodar
```bash
cd /c/Users/user/aracatuba
npm install
npm run dev     # porta 5000 (cai pra 5001 se ocupada)
```
Não abrir Simple Browser / VS Code embutido (Humberto usa ANTIGRAVITY) — só informar a URL localhost.

## Stack e convenções
Espelha o padrão institucional MAZARI (referência: GLOMAM): Vite + React 19 + react-router-dom + framer-motion, deploy Netlify, porta 5000, host 0.0.0.0. Design é **exclusivo** da Araçatuba (verde/dourado, Archivo) — não replicar visual de outros clientes.

## Natureza do site
One-page institucional, sem backend. Formulários são client-side por enquanto (ver TODO para integração real).

## Cliente
Distribuidora de alimentos e bebidas (atacado) — Manaus/AM, desde 2019. CNPJ 34.602.080/0001-77.

## Próximos passos prováveis
Ver `TODO.md`. Prioridades típicas: favicon/OG, deploy Netlify, decidir git (React vs export no repo), e ligar os formulários se o cliente quiser recebê-los.
