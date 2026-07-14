# CLAUDE.md — Araçatuba Distribuidora

Instruções para o Claude Code ao trabalhar neste repositório. Carregado automaticamente em qualquer máquina onde o repo for clonado — funciona como **pacote de contexto portátil**.

---

## 👤 Quem é o usuário

**Humberto** (humbertodeassuncao@gmail.com). Product/estratégia da **MAZARI Holding** (Araçatuba é cliente). Plano Claude Max. Usa o **Antigravity IDE** no Windows.

### Preferências fortes
- **Nunca abrir VS Code Simple Browser nem browser embutido.** Ao subir o dev server, apenas informar a URL (`http://localhost:5000`) — o Humberto abre no browser dele.
- **PT-BR direto.** Vocativo "meu amigo" é OK. Respostas objetivas, sem floreio.
- Ao explicar decisão técnica, mostrar o **trade-off** — não escolher por ele em silêncio.
- **Verificar de verdade** antes de afirmar que está pronto (rodar/printar, não só buildar).
- Explicar mudanças técnicas com **analogia do dia a dia** quando fizer sentido.

---

## 🎨 Marca (paleta oficial — OBRIGATÓRIA)

```
Verde-garrafa  #1c3a2b   /* cor primária: marca, seções premium, CTAs */
Dourado âmbar  #d9a441   /* acento: ícones, hovers, ornamentos */
Grafite        #1a1a17   /* texto corrido, rodapé */
Neutro médio   #8a8578   /* apoio, legendas */
Creme          #f4f0e7   /* fundo geral (papel) */
Linha          #e6e1d5   /* bordas e divisores */
Branco         #ffffff   /* cards, seções alternadas */
```
Fonte única: **Archivo** (400–900). Tokens em `src/data/site.js`. **Na dúvida entre uma cor "que parece certa" e um token, use o token.** ⚠️ Nunca usar amarelo puro no lugar do dourado âmbar. O design é **exclusivo da Araçatuba** — não replicar anatomia visual de outros clientes MAZARI.

---

## 📚 Stack e arquitetura

- **React 19** + **Vite 8** + **React Router DOM 7** (SPA multi-page: `index.html` + `brandbook.html`)
- **Framer Motion** (reveals) · **html2canvas** + **jsPDF** (PDF do brandbook, lazy-load)
- **Sem Tailwind, sem CSS-modules:** inline styles + tokens + `src/index.css` (hovers/animações/responsivo)
- **Netlify** (deploy). **Sem backend, sem banco.** SPA estática.

### Estrutura
- `src/pages/` — `Home.jsx`, `Brandbook.jsx`
- `src/components/` — uma seção por arquivo
- `src/data/` — `site.js` (marca+contato), `produtos.js`, `depoimentos.js`, `faqs.js`
- `public/` — favicon, OG images, robots, `images/`
- `scripts/` — `enhance-photos.py`, `gen-og.py`
- `design-source/` — export `.dc.html` original (referência)

---

## 🚀 Como rodar

```bash
npm install
npm run dev      # http://localhost:5000 (cai para 5001+ se ocupada)
```
Projeto usa **npm** (tem `package-lock.json`). Não abrir browser embutido — só avisar a URL.

Build: `npm run build` (gera `dist/` com `index.html` + `brandbook.html`).

Regenerar assets: `python scripts/gen-og.py` (OG + favicon) · `python scripts/enhance-photos.py` (fotos).

---

## 📝 Documentação (regra do Humberto em todos os projetos)

5 docs canônicos, atualizados após cada feature aprovada:

| Arquivo | Propósito |
|---|---|
| `README.md` | Instalação, comandos, rotas |
| `CONTEXT.md` | Cliente, regras de negócio, design system |
| `PROJECT_CONTEXT.md` | Visão consolidada + status/localização |
| `ARCHITECTURE.md` | Estrutura, camadas, decisões |
| `TODO.md` | Concluído + pendente (marcar `[x]`, não apagar histórico) |

---

## 🔒 Regras invioláveis

- ❌ Nunca abrir Simple Browser / browser embutido — só informar URL.
- ❌ Nunca alterar os tokens de cor sem aprovação do Humberto.
- ❌ Nunca criar backend/API/banco — projeto é 100% estático.
- ❌ Nunca introduzir Tailwind ou CSS-in-JS — design system é inline + tokens.
- ❌ Nunca deixar meia-obra: se cota, executa; ponta a ponta (build → verificar → commit).
- ❌ Commits de IA terminam com `Co-Authored-By` apropriado.

## ✅ Princípios de trabalho

- **Mapear o que já existe antes de criar do zero** (reutilizar > duplicar).
- **Manter o mock/DEMO espelhando o AO VIVO** (mesmos nomes/rótulos/formato).
- **Testar responsividade** (breakpoints 900/860/620/560/400px) — zero overflow horizontal.
- **Verificar no navegador** (print/comportamento) antes de dizer "pronto".
- Commits em **PT-BR**, mensagem clara.

---

## 🎯 Estado atual (snapshot 2026-07-14)

### Concluído
- Conversão do export `.dc.html` → React 19 + Vite; repo `Opresida/aracatuba`.
- Home: Hero, A empresa, **Nossos produtos** (cesta básica + bebidas linha seca, split 70/30, galeria de fotos reais tratadas), Operação, Prova social, Estrutura, Ouvidoria + Trabalhe conosco, FAQ, Footer, WhatsApp flutuante.
- Rota **/brandbook** completa — 7 submenus: Logo, Cores (copiar hex), Tipografia, UI System, Papel timbrado (PDF A4), Cartão & E-mail (cartão em PDF + assinatura de e-mail HTML + OG download), Manual de uso.
- **Responsividade completa** (menu hamburger, grids colapsam, sem overflow).
- Favicon, OG por rota (`og-image.png` / `og-brandbook.png`), `netlify.toml` endurecido.

### Pendente
- **Deploy Netlify** (só conectar o repo — build já configurado).
- Pós-deploy: trocar `og:image` para URL absoluta + `og:url` nos dois HTMLs.
- **Netlify Forms** (Ouvidoria/Trabalhe) — Humberto pediu: depois. Upload de currículo precisa de storage.
- Trocar `#` das redes sociais pelos perfis reais; confirmar telefone/WhatsApp com o cliente.
