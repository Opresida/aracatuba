import { brand } from '../data/site.js';
import { faqs } from '../data/faqs.js';
import Reveal from './Reveal.jsx';

export default function FAQ() {
  return (
    <section id="faq" style={{ maxWidth: 860, margin: '0 auto', padding: '88px 28px' }}>
      <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36, textAlign: 'center', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.22em', color: brand.gold, textTransform: 'uppercase' }}>Perguntas frequentes</span>
        <h2 style={{ margin: 0, fontWeight: 900, fontSize: 38, lineHeight: 1.05, letterSpacing: '-0.02em', color: brand.green }}>Tudo que você precisa saber</h2>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <details style={{ background: '#fff', border: `1px solid ${brand.border}`, borderRadius: 16, padding: '4px 22px' }}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '20px 0', fontWeight: 800, fontSize: 17, color: brand.green }}>
                {f.q}
                <span className="faq-plus" style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(28,58,43,0.08)', color: brand.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flex: 'none' }}>+</span>
              </summary>
              <p style={{ margin: 0, padding: '0 0 20px', fontSize: 15.5, lineHeight: 1.6, color: brand.ink, textWrap: 'pretty' }}>{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
