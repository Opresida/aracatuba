import { brand, site } from '../data/site.js';
import Reveal from './Reveal.jsx';

const stats = [
  { n: site.fundacao, l: 'ano de fundação' },
  { n: '+40', l: 'categorias de produtos' },
  { n: '7 dias', l: 'de logística ativa' },
];

export default function Hero() {
  return (
    <section id="hero" className="wrap hero-grid" style={{ padding: '72px 28px 84px' }}>
      <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, width: 'fit-content', background: 'rgba(28,58,43,0.08)', padding: '8px 16px', borderRadius: 999 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: brand.gold }} />
          <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.14em', color: brand.green, textTransform: 'uppercase' }}>
            {site.cidade} • desde {site.fundacao}
          </span>
        </div>
        <h1 className="hero-h1" style={{ margin: 0, fontWeight: 900, fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.025em', color: brand.green, textWrap: 'balance' }}>
          Gente que abastece o seu negócio, todos os dias.
        </h1>
        <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: brand.ink, maxWidth: 520, textWrap: 'pretty' }}>
          Somos uma distribuidora de alimentos e bebidas que nasceu para estar perto de quem faz o comércio de Manaus acontecer. Atendimento próximo, entrega no prazo e um portfólio completo para a sua prateleira nunca ficar vazia.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
          <a href={site.wa} target="_blank" rel="noreferrer" className="btn-green" style={{ fontWeight: 700, fontSize: 15, padding: '15px 26px', borderRadius: 999 }}>
            Fazer um pedido
          </a>
          <a href="#empresa" className="btn-outline" style={{ fontWeight: 700, fontSize: 15, padding: '15px 26px', borderRadius: 999 }}>
            Conheça a empresa
          </a>
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 16, flexWrap: 'wrap' }}>
          {stats.map((s) => (
            <div key={s.l} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 900, fontSize: 30, color: brand.green }}>{s.n}</span>
              <span style={{ fontSize: 13, color: brand.muted, fontWeight: 600 }}>{s.l}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} style={{ position: 'relative' }}>
        <div style={{ borderRadius: 26, overflow: 'hidden', aspectRatio: '4 / 5', boxShadow: '0 30px 70px -40px rgba(20,40,25,0.6)' }}>
          <img src="/images/hero-equipe.webp" alt="Equipe da Araçatuba Distribuidora" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', bottom: -22, left: -22, background: brand.green, color: '#fff', borderRadius: 18, padding: '18px 22px', maxWidth: 230, boxShadow: '0 18px 40px -22px rgba(20,40,25,0.7)' }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: brand.gold, marginBottom: 4 }}>Perto de você</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'rgba(255,255,255,0.9)' }}>Um time que conhece o comércio de Manaus pelo nome.</div>
        </div>
      </Reveal>
    </section>
  );
}
