import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { brand, site } from '../data/site.js';

// html2canvas + jsPDF são carregados sob demanda (só ao gerar PDF), fora do bundle inicial.
async function loadPdfLibs() {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);
  return { html2canvas, jsPDF };
}

const { green, gold, ink, cream, border, paper, muted } = brand;

/* ───────── Dados ───────── */
const CORES = [
  { nome: 'Verde-garrafa', hex: green, uso: 'Cor primária: marca, fundos premium, textos de destaque, CTAs.' },
  { nome: 'Dourado âmbar', hex: gold, uso: 'Acento: detalhes, ícones, hovers, ornamentos e realces.' },
  { nome: 'Grafite', hex: ink, uso: 'Texto corrido e rodapé institucional.' },
  { nome: 'Neutro médio', hex: muted, uso: 'Textos de apoio, legendas e metadados.' },
  { nome: 'Creme', hex: cream, uso: 'Fundo geral do site (papel).' },
  { nome: 'Linha', hex: border, uso: 'Bordas, divisores e contornos de cards.' },
  { nome: 'Branco', hex: paper, uso: 'Fundo de cards e seções alternadas.' },
];

const TIPOS = [
  { peso: 'Black 900', amostra: 'ARAÇATUBA', uso: 'Logotipo, títulos de seção e números-destaque.', w: 900 },
  { peso: 'Bold 700 / Extrabold 800', amostra: 'Abastecendo o seu negócio', uso: 'Subtítulos, rótulos e botões.', w: 800 },
  { peso: 'Semibold 600', amostra: 'Atendimento próximo, entrega no prazo.', uso: 'Navegação, chips e labels.', w: 600 },
  { peso: 'Regular 400 / Medium 500', amostra: 'Distribuição de alimentos e bebidas em Manaus e região metropolitana.', uso: 'Corpo de texto e parágrafos.', w: 400 },
];

const ESCALA = [12, 13, 14, 16, 19, 24, 32, 40, 56];

const TABS = [
  { id: 'logo', label: 'Logo' },
  { id: 'cores', label: 'Cores' },
  { id: 'tipografia', label: 'Tipografia' },
  { id: 'ui', label: 'UI System' },
  { id: 'timbrado', label: 'Papel timbrado' },
  { id: 'cartao', label: 'Cartão & E-mail' },
  { id: 'manual', label: 'Manual de uso' },
];

/* ───────── Emblema "A" parametrizável ───────── */
function Emblem({ size, bg = green, letter = gold, ring = gold, baseline = false }) {
  const inset = Math.max(4, Math.round(size * 0.062));
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.17, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flex: 'none' }}>
      <div style={{ position: 'absolute', inset, border: `${Math.max(1.5, size * 0.014)}px solid ${ring}`, borderRadius: size * 0.12, opacity: 0.82 }} />
      <span style={{ fontWeight: 900, fontSize: size * 0.62, lineHeight: 1, color: letter, letterSpacing: '-0.03em' }}>A</span>
      {baseline && <div style={{ position: 'absolute', bottom: size * 0.17, width: size * 0.3, height: Math.max(3, size * 0.027), borderRadius: 2, background: letter, opacity: 0.9 }} />}
    </div>
  );
}

function Block({ label, titulo, desc, children }) {
  return (
    <section style={{ width: '100%', maxWidth: 1120, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 4 }}>
        <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.22em', color: gold, textTransform: 'uppercase' }}>{label}</span>
        {titulo && <h2 style={{ margin: 0, fontWeight: 900, fontSize: 30, letterSpacing: '-0.02em', color: green }}>{titulo}</h2>}
        {desc && <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: ink, maxWidth: 720 }}>{desc}</p>}
      </div>
      {children}
    </section>
  );
}

function H3({ children }) {
  return <h3 style={{ margin: '18px 0 4px', fontWeight: 800, fontSize: 19, color: green }}>{children}</h3>;
}

const card = { background: paper, border: `1px solid ${border}`, borderRadius: 20, display: 'flex' };
const field = { width: '100%', minWidth: 0, padding: '12px 14px', border: `1px solid ${border}`, borderRadius: 10, background: cream, fontSize: 14.5, color: ink };
const btnGreen = { display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14, padding: '12px 20px', borderRadius: 999, border: 'none', cursor: 'pointer' };

/* ═══════════════════════════════════════════ */
export default function Brandbook() {
  const [tab, setTab] = useState('logo');
  const [copied, setCopied] = useState(null);
  const [pessoa, setPessoa] = useState({
    nome: 'João da Silva',
    cargo: 'Consultor de Vendas',
    email: 'joao@aracatuba.com.br',
    telefone: site.telefone,
  });
  const [pdfMsg, setPdfMsg] = useState('');
  const [copyMsg, setCopyMsg] = useState('');
  const frenteRef = useRef(null);
  const versoRef = useRef(null);
  const timbradoRef = useRef(null);

  useEffect(() => { document.title = 'Manual de Marca — Araçatuba Distribuidora'; }, []);

  const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function copyHex(hex) {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1400);
  }

  async function baixarCartaoPDF() {
    if (!frenteRef.current || !versoRef.current) return;
    setPdfMsg('Gerando PDF…');
    try {
      const { html2canvas, jsPDF } = await loadPdfLibs();
      const opts = { scale: 4, backgroundColor: null, useCORS: true, logging: false };
      const f = await html2canvas(frenteRef.current, opts);
      const v = await html2canvas(versoRef.current, opts);
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [90, 50] });
      pdf.addImage(f.toDataURL('image/png'), 'PNG', 0, 0, 90, 50, undefined, 'FAST');
      pdf.addPage([90, 50], 'landscape');
      pdf.addImage(v.toDataURL('image/png'), 'PNG', 0, 0, 90, 50, undefined, 'FAST');
      pdf.save(`cartao-aracatuba-${slug(pessoa.nome) || 'sem-nome'}.pdf`);
      setPdfMsg('PDF baixado (90×50mm). Pronto para a gráfica.');
      setTimeout(() => setPdfMsg(''), 3500);
    } catch (e) {
      setPdfMsg(`Erro: ${e.message}`);
    }
  }

  async function baixarTimbradoPDF() {
    if (!timbradoRef.current) return;
    setPdfMsg('Gerando timbrado…');
    try {
      const { html2canvas, jsPDF } = await loadPdfLibs();
      const c = await html2canvas(timbradoRef.current, { scale: 3, backgroundColor: '#ffffff', useCORS: true, logging: false });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(c.toDataURL('image/png'), 'PNG', 0, 0, 210, 297, undefined, 'FAST');
      pdf.save('papel-timbrado-aracatuba.pdf');
      setPdfMsg('Timbrado A4 baixado.');
      setTimeout(() => setPdfMsg(''), 3500);
    } catch (e) {
      setPdfMsg(`Erro: ${e.message}`);
    }
  }

  function assinaturaHTML(p) {
    return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;max-width:520px">
  <tr>
    <td style="padding-right:18px;border-right:2px solid ${gold};vertical-align:top">
      <table cellpadding="0" cellspacing="0"><tr><td style="width:64px;height:64px;background:${green};border-radius:14px;text-align:center;vertical-align:middle;font-family:Arial,sans-serif;font-weight:900;font-size:38px;color:${gold}">A</td></tr></table>
    </td>
    <td style="padding-left:18px;vertical-align:top">
      <p style="margin:0;font-size:15px;font-weight:bold;color:${green};letter-spacing:0.02em">${p.nome}</p>
      <p style="margin:2px 0 0;font-size:11px;color:${gold};letter-spacing:0.12em;text-transform:uppercase;font-weight:bold">${p.cargo}</p>
      <div style="height:1px;background:rgba(217,164,65,0.25);margin:9px 0"></div>
      <p style="margin:0;font-size:11px;color:#6b6b64;line-height:1.6">
        <strong style="color:${green}">Araçatuba Distribuidora</strong><br/>
        ${site.endereco[0]} — ${site.endereco[1]}<br/>
        ${p.email} · ${p.telefone}
      </p>
      <p style="margin:7px 0 0;font-size:11px;color:${gold};font-weight:bold">${site.tagline}</p>
    </td>
  </tr>
</table>`;
  }

  async function copiarAssinatura() {
    try {
      await navigator.clipboard.writeText(assinaturaHTML(pessoa));
      setCopyMsg('HTML copiado. Cole no editor de assinatura do Gmail/Outlook.');
      setTimeout(() => setCopyMsg(''), 3500);
    } catch (e) {
      setCopyMsg(`Falha ao copiar: ${e.message}`);
    }
  }

  function baixarAssinaturaHTML() {
    const blob = new Blob([assinaturaHTML(pessoa)], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assinatura-aracatuba-${slug(pessoa.nome) || 'sem-nome'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const setP = (k) => (e) => setPessoa((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div style={{ background: cream, minHeight: '100vh', fontFamily: 'Archivo, sans-serif', color: ink }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(244,240,231,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Emblem size={38} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.95 }}>
              <span style={{ fontWeight: 900, fontSize: 16, color: green, letterSpacing: '-0.02em' }}>ARAÇATUBA</span>
              <span style={{ fontWeight: 700, fontSize: 8, letterSpacing: '0.28em', color: muted }}>MANUAL DE MARCA</span>
            </div>
          </div>
          <Link to="/" className="link-ink" style={{ fontWeight: 700, fontSize: 14 }}>← Voltar ao site</Link>
        </div>
      </header>

      {/* Submenus */}
      <nav className="bb-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={`bb-tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </nav>

      <div className="bb-content" style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>

        {/* ═══════════ LOGO ═══════════ */}
        {tab === 'logo' && (
          <>
            <div className="bb-hero" style={{ ...card, width: '100%', maxWidth: 1120, margin: '0 auto', flexDirection: 'column', alignItems: 'center', gap: 8, boxShadow: '0 24px 60px -40px rgba(20,30,20,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 36, flexWrap: 'wrap', justifyContent: 'center', maxWidth: '100%' }}>
                <Emblem size={148} baseline />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                  <div className="bb-wordmark" style={{ fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: green }}>ARAÇATUBA</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="bb-hero-divider" style={{ height: 2, background: gold, flex: 'none' }} />
                    <div className="bb-hero-dist" style={{ fontWeight: 700, color: ink }}>DISTRIBUIDORA</div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 38, fontWeight: 600, fontSize: 20, letterSpacing: '0.06em', color: muted, textTransform: 'uppercase' }}>{site.tagline}</div>
            </div>

            <Block label="Variações de assinatura">
              <div className="bb-lockups" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 0.7fr', gap: 16 }}>
                <div style={{ ...card, padding: '48px 24px', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                  <Emblem size={84} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontWeight: 900, fontSize: 34, lineHeight: 0.9, color: green, letterSpacing: '-0.02em' }}>ARAÇATUBA</div>
                    <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.34em', color: ink }}>DISTRIBUIDORA</div>
                  </div>
                </div>
                <div style={{ ...card, padding: 24, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                  <Emblem size={60} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ fontWeight: 900, fontSize: 26, lineHeight: 0.9, color: green, letterSpacing: '-0.02em' }}>ARAÇATUBA</div>
                    <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: '0.28em', color: ink }}>DISTRIBUIDORA</div>
                  </div>
                </div>
                <div style={{ ...card, padding: 24, alignItems: 'center', justifyContent: 'center' }}>
                  <Emblem size={88} baseline />
                </div>
              </div>
            </Block>

            <Block label="Versões sobre fundo">
              <div className="bb-grid3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div style={{ background: green, borderRadius: 20, padding: '44px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                  <Emblem size={66} bg={gold} letter={green} ring={green} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{ fontWeight: 900, fontSize: 26, lineHeight: 0.9, color: paper, letterSpacing: '-0.02em' }}>ARAÇATUBA</div>
                    <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: '0.3em', color: gold }}>DISTRIBUIDORA</div>
                  </div>
                </div>
                <div style={{ background: gold, borderRadius: 20, padding: '44px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                  <Emblem size={66} bg={green} letter={gold} ring={gold} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{ fontWeight: 900, fontSize: 26, lineHeight: 0.9, color: green, letterSpacing: '-0.02em' }}>ARAÇATUBA</div>
                    <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: '0.3em', color: green, opacity: 0.75 }}>DISTRIBUIDORA</div>
                  </div>
                </div>
                <div style={{ ...card, borderRadius: 20, padding: '44px 24px', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                  <Emblem size={66} bg={ink} letter={paper} ring={paper} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{ fontWeight: 900, fontSize: 26, lineHeight: 0.9, color: ink, letterSpacing: '-0.02em' }}>ARAÇATUBA</div>
                    <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: '0.3em', color: muted }}>DISTRIBUIDORA</div>
                  </div>
                </div>
              </div>
            </Block>

            <Block label="Download do ícone" desc="Emblema da marca em vetor (SVG) e imagem (PNG).">
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/favicon.svg" download="aracatuba-icone.svg" className="btn-green" style={btnGreen}>↓ Ícone SVG</a>
                <a href="/favicon.png" download="aracatuba-icone.png" className="btn-green" style={btnGreen}>↓ Ícone PNG</a>
              </div>
            </Block>
          </>
        )}

        {/* ═══════════ CORES ═══════════ */}
        {tab === 'cores' && (
          <Block label="01 — Paleta" titulo="Cores da marca" desc="Clique em qualquer cor para copiar o código. A regra: na dúvida entre uma cor “que parece certa” e um token oficial, use sempre o token.">
            <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
              {CORES.map((c) => (
                <button key={c.hex} onClick={() => copyHex(c.hex)} style={{ ...card, flexDirection: 'column', textAlign: 'left', padding: 0, overflow: 'hidden', cursor: 'pointer', border: `1px solid ${border}` }}>
                  <div style={{ height: 96, background: c.hex, borderBottom: `1px solid ${border}` }} />
                  <div style={{ padding: '14px 16px', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 14.5, color: green }}>{c.nome}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: copied === c.hex ? green : muted }}>{copied === c.hex ? 'copiado ✓' : 'copiar'}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: muted, fontFamily: 'monospace', marginTop: 2 }}>{c.hex}</div>
                    <div style={{ fontSize: 12.5, color: ink, marginTop: 8, lineHeight: 1.45 }}>{c.uso}</div>
                  </div>
                </button>
              ))}
            </div>

            <H3>Aplicabilidade</H3>
            <div className="do-dont">
              <div style={{ background: green, borderRadius: 16, padding: 24, color: '#fff' }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: gold, marginBottom: 10 }}>Sobre fundo verde</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>Texto em branco ou creme; acentos e ícones em dourado. Usado em seções premium (Produtos, Trabalhe conosco, painel da frota).</p>
              </div>
              <div style={{ ...card, flexDirection: 'column', borderRadius: 16, padding: 24 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: gold, marginBottom: 10 }}>Sobre fundo claro</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: ink }}>Fundo creme ou branco; títulos em verde-garrafa, texto em grafite, rótulos em dourado. Base do site institucional.</p>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: muted, marginTop: 4 }}>Contraste: manter no mínimo <strong style={{ color: ink }}>4.5:1</strong> (WCAG AA) para texto corrido. Dourado sobre creme só em textos grandes/rótulos, nunca em corpo pequeno.</p>
          </Block>
        )}

        {/* ═══════════ TIPOGRAFIA ═══════════ */}
        {tab === 'tipografia' && (
          <Block label="02 — Tipografia" titulo="Archivo" desc="A marca usa uma única família — Archivo — em todos os pesos. Sem serifa, geométrica e forte, transmite a solidez de uma distribuidora de atacado.">
            <div style={{ ...card, flexDirection: 'column', padding: 28, gap: 4 }}>
              <div style={{ fontWeight: 900, fontSize: 64, lineHeight: 1, color: green, letterSpacing: '-0.02em' }}>Aa</div>
              <div style={{ fontSize: 13, color: muted, letterSpacing: '0.1em', marginTop: 8 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
              <div style={{ fontSize: 13, color: muted, letterSpacing: '0.1em' }}>abcdefghijklmnopqrstuvwxyz 0123456789</div>
            </div>

            <H3>Pesos e usos</H3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TIPOS.map((t) => (
                <div key={t.peso} style={{ ...card, flexDirection: 'column', padding: '18px 22px', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: gold }}>{t.peso}</span>
                    <span style={{ fontSize: 12.5, color: muted }}>{t.uso}</span>
                  </div>
                  <div style={{ fontWeight: t.w, fontSize: 26, color: green, lineHeight: 1.15 }}>{t.amostra}</div>
                </div>
              ))}
            </div>

            <H3>Escala tipográfica (px)</H3>
            <div style={{ ...card, flexDirection: 'column', padding: '10px 22px' }}>
              {ESCALA.map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '8px 0', borderBottom: `1px solid ${border}` }}>
                  <code style={{ width: 48, color: muted, fontSize: 12.5 }}>{s}px</code>
                  <span style={{ fontSize: s, fontWeight: s >= 24 ? 900 : 600, color: green, letterSpacing: s >= 24 ? '-0.02em' : 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Araçatuba Distribuidora</span>
                </div>
              ))}
            </div>
            <pre className="code-block">{`/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap');
font-family: 'Archivo', system-ui, sans-serif;`}</pre>
          </Block>
        )}

        {/* ═══════════ UI SYSTEM ═══════════ */}
        {tab === 'ui' && (
          <Block label="03 — UI System" titulo="Componentes" desc="Blocos reutilizáveis do site, com os estilos-chave para replicar em novos materiais.">
            <H3>Botões</H3>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="btn-green" style={{ fontWeight: 700, fontSize: 15, padding: '14px 24px', borderRadius: 999 }}>Fazer um pedido</span>
              <span className="btn-outline" style={{ fontWeight: 700, fontSize: 15, padding: '14px 24px', borderRadius: 999 }}>Conheça a empresa</span>
              <span className="btn-gold" style={{ fontWeight: 700, fontSize: 15, padding: '14px 24px', borderRadius: 999 }}>Enviar candidatura</span>
            </div>
            <pre className="code-block">{`.btn-green  { background:${green}; color:#fff; }
.btn-green:hover { background:${gold}; color:${green}; }
.btn-outline{ background:transparent; color:${green}; border:1.5px solid ${green}; }
.btn-gold   { background:${gold}; color:${green}; }
/* raio: 999px · padding 14px 24px · peso 700 */`}</pre>

            <H3>Cards & chips</H3>
            <div className="do-dont">
              <div style={{ ...card, flexDirection: 'column', padding: 24, gap: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                  <div style={{ width: 16, height: 16, border: `2.5px solid ${gold}`, borderRadius: 4 }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: 17, color: green }}>Título do card</div>
                <div style={{ fontSize: 14, color: ink, lineHeight: 1.5 }}>Fundo creme/branco, borda fina, raio 18–22px, ícone em quadrado verde.</div>
              </div>
              <div style={{ ...card, flexDirection: 'column', padding: 24, gap: 12, justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Arroz', 'Feijão', 'Café', 'Refrigerantes', 'Cervejas'].map((c) => (
                    <span key={c} style={{ fontSize: 13, fontWeight: 600, color: green, background: cream, border: `1px solid ${border}`, padding: '7px 13px', borderRadius: 999 }}>{c}</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: muted }}>Chips: pílula creme, borda fina, texto verde 600.</div>
              </div>
            </div>

            <H3>Formulário</H3>
            <div style={{ ...card, flexDirection: 'column', padding: 24, gap: 12, maxWidth: 460 }}>
              <input placeholder="Seu nome" readOnly style={field} />
              <input placeholder="E-mail ou telefone" readOnly style={field} />
              <span className="btn-green" style={{ alignSelf: 'flex-start', fontWeight: 700, fontSize: 14, padding: '12px 22px', borderRadius: 999 }}>Enviar</span>
            </div>

            <H3>Iconografia</H3>
            <p style={{ fontSize: 14, color: ink, margin: 0 }}>Ícones geométricos simples em <code>{gold}</code> dentro de quadrado verde 40–46px. Formas: quadrado, círculo, losango e barras — linha, não preenchimento.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              {['square', 'circle', 'diamond'].map((k) => (
                <div key={k} style={{ width: 46, height: 46, borderRadius: 12, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 16, height: 16, border: `2.5px solid ${gold}`, borderRadius: k === 'circle' ? '50%' : 4, transform: k === 'diamond' ? 'rotate(45deg)' : 'none' }} />
                </div>
              ))}
            </div>
          </Block>
        )}

        {/* ═══════════ PAPEL TIMBRADO ═══════════ */}
        {tab === 'timbrado' && (
          <Block label="04 — Papel timbrado" titulo="Modelo A4" desc="Cabeçalho e rodapé institucional prontos para cartas, ofícios e propostas. Clique para baixar o PDF em A4.">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
              <button className="btn-green" style={btnGreen} onClick={baixarTimbradoPDF}>↓ Baixar timbrado (PDF A4)</button>
              {pdfMsg && <span style={{ fontSize: 13, color: green, alignSelf: 'center' }}>{pdfMsg}</span>}
            </div>
            <div className="lh-scroll">
              <div ref={timbradoRef} style={{ width: 720, minWidth: 720, aspectRatio: '210 / 297', background: paper, margin: '0 auto', boxShadow: `0 20px 50px -30px rgba(20,30,20,0.4)`, padding: 56, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Emblem size={54} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                      <span style={{ fontWeight: 900, fontSize: 22, color: green, letterSpacing: '-0.02em' }}>ARAÇATUBA</span>
                      <span style={{ fontWeight: 700, fontSize: 9.5, letterSpacing: '0.3em', color: ink }}>DISTRIBUIDORA</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: 11, color: muted, lineHeight: 1.6 }}>
                    {site.endereco.map((l, i) => <div key={i}>{l}</div>)}
                    <div>Tel: {site.telefone}</div>
                  </div>
                </div>
                <div style={{ height: 2, background: gold, margin: '18px 0 28px' }} />
                <div style={{ flex: 1, fontSize: 13, color: ink, lineHeight: 1.8 }}>
                  <p style={{ margin: '0 0 20px', color: muted }}>Manaus, ____ de ______________ de 20____.</p>
                  <p style={{ margin: '0 0 16px' }}>Prezado(a) Senhor(a),</p>
                  <p style={{ margin: '0 0 14px', color: 'rgba(26,26,23,0.55)' }}>[ Corpo da carta / ofício / proposta. Este é um modelo de papel timbrado com o cabeçalho e rodapé institucionais da Araçatuba Distribuidora. ]</p>
                  <p style={{ margin: 0, color: 'rgba(26,26,23,0.4)' }}>__________________________________________________________________</p>
                </div>
                <div style={{ marginTop: 24 }}>
                  <div style={{ height: 1, background: border, marginBottom: 12 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 10.5, color: muted, flexWrap: 'wrap' }}>
                    <span>{site.razaoSocial}</span>
                    <span>CNPJ {site.cnpj}</span>
                    <span>{site.tagline}</span>
                  </div>
                </div>
              </div>
            </div>
          </Block>
        )}

        {/* ═══════════ CARTÃO & E-MAIL ═══════════ */}
        {tab === 'cartao' && (
          <>
            <Block label="05 — Materiais" titulo="Cartão de visita" desc="Preencha os dados e baixe o PDF (90×50mm), pronto para a gráfica. A prévia atualiza em tempo real.">
              <div className="gen-wrap">
                <div style={{ ...card, flexDirection: 'column', padding: 22, gap: 12 }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12.5, fontWeight: 700, color: muted }}>Nome<input value={pessoa.nome} onChange={setP('nome')} style={field} /></label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12.5, fontWeight: 700, color: muted }}>Cargo<input value={pessoa.cargo} onChange={setP('cargo')} style={field} /></label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12.5, fontWeight: 700, color: muted }}>E-mail<input value={pessoa.email} onChange={setP('email')} style={field} /></label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12.5, fontWeight: 700, color: muted }}>Telefone<input value={pessoa.telefone} onChange={setP('telefone')} style={field} /></label>
                  <button className="btn-green" style={{ ...btnGreen, marginTop: 4 }} onClick={baixarCartaoPDF}>↓ Baixar cartão (PDF)</button>
                  {pdfMsg && <div style={{ fontSize: 12.5, color: green }}>{pdfMsg}</div>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>Frente</span>
                  <div ref={frenteRef} style={{ width: '100%', maxWidth: 360, aspectRatio: '9 / 5', background: paper, borderRadius: 14, border: `1px solid ${border}`, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 14px 34px -22px rgba(20,30,20,0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Emblem size={40} />
                      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.95 }}>
                        <span style={{ fontWeight: 900, fontSize: 16, color: green, letterSpacing: '-0.02em' }}>ARAÇATUBA</span>
                        <span style={{ fontWeight: 700, fontSize: 7.5, letterSpacing: '0.28em', color: ink }}>DISTRIBUIDORA</span>
                      </div>
                    </div>
                    <div style={{ height: 1, background: border }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: green }}>{pessoa.nome || '—'}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: gold, textTransform: 'uppercase' }}>{pessoa.cargo || '—'}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: 10.5, color: muted }}>
                      <span>{pessoa.email || '—'} · {pessoa.telefone || '—'}</span>
                      <span>{site.endereco[0]} — {site.endereco[1]}</span>
                    </div>
                  </div>

                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>Verso</span>
                  <div ref={versoRef} style={{ width: '100%', maxWidth: 360, aspectRatio: '9 / 5', background: green, borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 14px 34px -22px rgba(20,30,20,0.5)' }}>
                    <Emblem size={62} bg={gold} letter={green} ring={green} />
                    <div style={{ fontWeight: 900, fontSize: 24, color: '#fff', letterSpacing: '-0.02em' }}>ARAÇATUBA</div>
                    <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: '0.3em', color: gold }}>{site.tagline.toUpperCase()}</div>
                  </div>
                </div>
              </div>
            </Block>

            <Block label="Assinatura de e-mail" desc="Usa os mesmos dados do cartão. Copie o HTML e cole no editor de assinatura do Gmail, Outlook ou Apple Mail.">
              <div style={{ ...card, padding: 24, overflowX: 'auto' }}>
                <div dangerouslySetInnerHTML={{ __html: assinaturaHTML(pessoa) }} />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn-green" style={btnGreen} onClick={copiarAssinatura}>📋 Copiar HTML</button>
                <button className="btn-outline" style={{ ...btnGreen, background: 'transparent', border: `1.5px solid ${green}`, color: green }} onClick={baixarAssinaturaHTML}>↓ Baixar .html</button>
                {copyMsg && <span style={{ fontSize: 13, color: green, alignSelf: 'center' }}>{copyMsg}</span>}
              </div>
              <details style={{ marginTop: 8 }}>
                <summary style={{ cursor: 'pointer', fontSize: 13.5, fontWeight: 700, color: green }}>Ver código HTML</summary>
                <pre className="code-block" style={{ marginTop: 10 }}>{assinaturaHTML(pessoa)}</pre>
              </details>
            </Block>

            <Block label="Compartilhamento (OG)" desc="Artes exibidas na prévia dos links no WhatsApp e redes. Baixe para reuso.">
              <div className="og-grid">
                {[
                  { img: '/og-image.png', nome: 'Site institucional', file: 'aracatuba-og-site.png' },
                  { img: '/og-brandbook.png', nome: 'Manual de marca', file: 'aracatuba-og-manual.png' },
                ].map((o) => (
                  <div key={o.img} style={{ ...card, padding: 16, flexDirection: 'column', gap: 14 }}>
                    <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${border}`, aspectRatio: '1200 / 630' }}>
                      <img src={o.img} alt={`OG — ${o.nome}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 800, fontSize: 15, color: green }}>{o.nome}</span>
                        <span style={{ fontSize: 12.5, color: muted }}>PNG · 1200×630</span>
                      </div>
                      <a href={o.img} download={o.file} className="btn-green" style={{ ...btnGreen, padding: '11px 18px' }}>↓ Baixar</a>
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          </>
        )}

        {/* ═══════════ MANUAL DE USO ═══════════ */}
        {tab === 'manual' && (
          <Block label="06 — Manual de uso" titulo="Regras de aplicação" desc="Normas para manter a integridade da marca em todos os pontos de contato.">
            <div className="do-dont">
              <div style={{ ...card, flexDirection: 'column', borderRadius: 18, padding: 26, borderTop: `4px solid ${green}` }}>
                <h4 style={{ margin: '0 0 14px', fontWeight: 900, fontSize: 18, color: green }}>✓ Fazer</h4>
                <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, lineHeight: 1.55, color: ink }}>
                  <li>Usar apenas os tokens oficiais da paleta (verde-garrafa, dourado, grafite, creme e neutros).</li>
                  <li>Aplicar o emblema sobre fundo verde, dourado ou claro — sempre respeitando os pares de cor das variações.</li>
                  <li>Manter a área de respiro mínima de <strong>1×</strong> a altura do emblema ao redor da marca.</li>
                  <li>Usar <strong>Archivo</strong> em todos os textos (Black para títulos, Regular para corpo).</li>
                  <li>Preferir fundo verde-garrafa em seções premium; creme/branco no institucional.</li>
                  <li>Garantir contraste mínimo <strong>4.5:1</strong> (WCAG AA).</li>
                </ul>
              </div>
              <div style={{ ...card, flexDirection: 'column', borderRadius: 18, padding: 26, borderTop: `4px solid ${gold}` }}>
                <h4 style={{ margin: '0 0 14px', fontWeight: 900, fontSize: 18, color: ink }}>✗ Não fazer</h4>
                <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, lineHeight: 1.55, color: ink }}>
                  <li>Recolorir a marca ou usar cores fora da paleta oficial.</li>
                  <li>Distorcer, inclinar, aplicar sombra pesada ou contornar o emblema.</li>
                  <li>Usar dourado puro (amarelo) — sempre o <strong>dourado âmbar {gold}</strong>.</li>
                  <li>Colocar o emblema dourado sobre fundo claro sem contraste suficiente.</li>
                  <li>Trocar a fonte por outra família ou misturar tipografias.</li>
                  <li>Espremer a marca sem área de respiro ou sobre imagens poluídas.</li>
                </ul>
              </div>
            </div>
          </Block>
        )}

      </div>
    </div>
  );
}
