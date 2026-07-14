import { brand } from '../data/site.js';
import { split, linhas } from '../data/produtos.js';
import Reveal from './Reveal.jsx';

const { green, gold, ink, cream, paper } = brand;

// Ícones simples em CSS para cada linha.
function Icone({ tipo }) {
  if (tipo === 'cesta') {
    // sacola / cesta
    return (
      <span style={{ position: 'relative', width: 22, height: 22, display: 'block' }}>
        <span style={{ position: 'absolute', top: 0, left: 6, width: 10, height: 8, border: `2.5px solid ${gold}`, borderBottom: 'none', borderRadius: '8px 8px 0 0' }} />
        <span style={{ position: 'absolute', bottom: 0, left: 0, width: 22, height: 14, background: gold, borderRadius: '3px 3px 5px 5px' }} />
      </span>
    );
  }
  // garrafa
  return (
    <span style={{ position: 'relative', width: 22, height: 22, display: 'block' }}>
      <span style={{ position: 'absolute', top: 0, left: 9, width: 4, height: 5, background: gold, borderRadius: '1px 1px 0 0' }} />
      <span style={{ position: 'absolute', top: 4, left: 6, width: 10, height: 18, background: gold, borderRadius: '3px 3px 4px 4px' }} />
    </span>
  );
}

function BarraSplit() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', height: 22, borderRadius: 999, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
        {split.map((s) => (
          <div
            key={s.chave}
            style={{
              width: `${s.pct}%`,
              background: s.chave === 'alimentos' ? gold : 'rgba(255,255,255,0.22)',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        {split.map((s) => (
          <div key={s.chave} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: s.chave === 'alimentos' ? gold : 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>{s.pct}%</span>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{s.rotulo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ linha, i }) {
  return (
    <Reveal delay={i * 0.1} style={{ background: paper, borderRadius: 22, padding: 30, display: 'flex', flexDirection: 'column', gap: 18, height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <Icone tipo={linha.icone} />
          </div>
          <h3 style={{ margin: 0, fontWeight: 900, fontSize: 22, color: green, letterSpacing: '-0.01em' }}>{linha.titulo}</h3>
        </div>
        <span style={{ fontWeight: 800, fontSize: 13, color: green, background: 'rgba(28,58,43,0.08)', padding: '7px 12px', borderRadius: 999, whiteSpace: 'nowrap' }}>
          {linha.pct}% da operação
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: ink }}>{linha.resumo}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 2 }}>
        {linha.itens.map((it) => (
          <span key={it} style={{ fontSize: 13, fontWeight: 600, color: green, background: cream, border: `1px solid ${brand.border}`, padding: '7px 13px', borderRadius: 999 }}>
            {it}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export default function Produtos() {
  return (
    <section id="produtos" style={{ background: green, color: '#fff' }}>
      <div className="wrap" style={{ padding: '88px 28px' }}>
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40, maxWidth: 680 }}>
          <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.22em', color: gold, textTransform: 'uppercase' }}>Nossos produtos</span>
          <h2 className="section-h2" style={{ margin: 0, fontWeight: 900, fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff', textWrap: 'balance' }}>
            Tudo que a sua prateleira precisa, num só fornecedor.
          </h2>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', textWrap: 'pretty' }}>
            Trabalhamos com a cesta básica completa e toda a linha seca de bebidas. Hoje a nossa operação se divide entre alimentos e bebidas:
          </p>
          <div style={{ marginTop: 8 }}><BarraSplit /></div>
        </Reveal>

        <div className="cards-grid" style={{ alignItems: 'stretch' }}>
          {linhas.map((linha, i) => <Card key={linha.chave} linha={linha} i={i} />)}
        </div>
      </div>
    </section>
  );
}
