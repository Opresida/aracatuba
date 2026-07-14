import { brand, site } from '../data/site.js';
import Reveal from './Reveal.jsx';

const cards = [
  { icon: 'square', titulo: 'Portfólio completo', texto: 'Alimentos, bebidas, laticínios, padaria, higiene e limpeza — tudo em um só fornecedor.' },
  { icon: 'circle', titulo: 'Atendimento próximo', texto: 'Consultores que conhecem cada cliente e ajudam a montar o pedido certo.' },
  { icon: 'diamond', titulo: 'Entrega no prazo', texto: 'Frota e roteirização próprias para cumprir o combinado com o seu estoque.' },
  { icon: 'stack', titulo: 'Escala de atacado', texto: 'Poder de compra que vira preço competitivo na sua prateleira.' },
];

function Icon({ kind }) {
  const base = { width: 16, height: 16 };
  const inner = {
    square: <div style={{ ...base, border: `2.5px solid ${brand.gold}`, borderRadius: 4 }} />,
    circle: <div style={{ ...base, border: `2.5px solid ${brand.gold}`, borderRadius: '50%' }} />,
    diamond: <div style={{ ...base, transform: 'rotate(45deg)', border: `2.5px solid ${brand.gold}` }} />,
    stack: <div style={{ width: 16, height: 3, background: brand.gold, boxShadow: `0 6px 0 ${brand.gold}, 0 -6px 0 ${brand.gold}` }} />,
  };
  return (
    <div style={{ width: 40, height: 40, borderRadius: 10, background: brand.green, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
      {inner[kind]}
    </div>
  );
}

export default function Empresa() {
  return (
    <section id="empresa" style={{ background: '#fff', borderTop: `1px solid ${brand.border}`, borderBottom: `1px solid ${brand.border}` }}>
      <div className="wrap empresa-grid" style={{ padding: '88px 28px' }}>
        <Reveal className="empresa-sticky" style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 96 }}>
          <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.22em', color: brand.gold, textTransform: 'uppercase' }}>A empresa</span>
          <h2 className="section-h2" style={{ margin: 0, fontWeight: 900, fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.02em', color: brand.green, textWrap: 'balance' }}>
            Nascida em Manaus, feita para servir o comércio local.
          </h2>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: brand.ink, textWrap: 'pretty' }}>
            A <strong>Distribuidora Araçatuba de Alimentos</strong> começou em 2019 como representação comercial de produtos alimentícios e bebidas. De lá para cá, crescemos para nos tornar um parceiro completo de abastecimento — do atacado à logística de entrega.
          </p>
          <div style={{ marginTop: 6, padding: '16px 20px', background: brand.cream, borderRadius: 14, border: `1px solid ${brand.border}` }}>
            <div style={{ fontSize: 12, color: brand.muted, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Razão social</div>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>{site.razaoSocial}</div>
            <div style={{ fontSize: 13, color: brand.muted, marginTop: 6, fontFamily: 'monospace' }}>CNPJ {site.cnpj}</div>
          </div>
        </Reveal>

        <div className="cards-grid">
          {cards.map((c, i) => (
            <Reveal key={c.titulo} delay={i * 0.08} style={{ background: brand.cream, border: `1px solid ${brand.border}`, borderRadius: 18, padding: 26 }}>
              <Icon kind={c.icon} />
              <h3 style={{ margin: '0 0 6px', fontWeight: 800, fontSize: 18, color: brand.green }}>{c.titulo}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: brand.ink }}>{c.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
