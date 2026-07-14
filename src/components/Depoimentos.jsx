import { brand } from '../data/site.js';
import { depoimentos } from '../data/depoimentos.js';

function Card({ d }) {
  return (
    <div style={{ width: 340, background: brand.cream, border: `1px solid ${brand.border}`, borderRadius: 20, padding: 26, display: 'flex', flexDirection: 'column', gap: 14, flex: 'none' }}>
      <div style={{ display: 'flex', gap: 3, color: brand.gold, fontSize: 16 }}>★★★★★</div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: brand.ink, textWrap: 'pretty' }}>{d.texto}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: brand.green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: brand.gold, fontWeight: 800, fontSize: 16, flex: 'none' }}>{d.inicial}</div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontWeight: 800, fontSize: 14, color: brand.green }}>{d.nome}</span>
          <span style={{ fontSize: 12.5, color: brand.muted }}>{d.negocio}</span>
        </div>
      </div>
    </div>
  );
}

export default function Depoimentos() {
  // Duplicado para o loop infinito do marquee (translateX -50%).
  const loop = [...depoimentos, ...depoimentos];
  return (
    <section id="clientes" style={{ background: '#fff', borderTop: `1px solid ${brand.border}`, borderBottom: `1px solid ${brand.border}`, padding: '80px 0', overflow: 'hidden' }}>
      <div className="wrap" style={{ padding: '0 28px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.22em', color: brand.gold, textTransform: 'uppercase' }}>Prova social</span>
        <h2 style={{ margin: 0, fontWeight: 900, fontSize: 36, lineHeight: 1.05, letterSpacing: '-0.02em', color: brand.green }}>
          Quem abastece com a Araçatuba, recomenda.
        </h2>
      </div>
      <div style={{ position: 'relative' }}>
        <div className="marquee-track">
          {loop.map((d, i) => <Card key={i} d={d} />)}
        </div>
      </div>
    </section>
  );
}
