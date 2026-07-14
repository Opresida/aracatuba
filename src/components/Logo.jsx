import { brand, site } from '../data/site.js';

// Logo "A" da Araçatuba (marca desenhada em CSS, sem imagem).
export default function Logo({ size = 44, nameColor = brand.green, subColor = brand.ink }) {
  const r = size / 4.4;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: size, height: size, borderRadius: size / 4.4, background: brand.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flex: 'none',
        }}
      >
        <div style={{ position: 'absolute', inset: 4, border: `1.5px solid ${brand.gold}`, borderRadius: r * 0.6, opacity: 0.85 }} />
        <span style={{ fontWeight: 900, fontSize: size * 0.64, lineHeight: 1, color: brand.gold, letterSpacing: '-0.03em' }}>A</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.95 }}>
        <span style={{ fontWeight: 900, fontSize: size * 0.43, color: nameColor, letterSpacing: '-0.02em' }}>
          {site.nome.toUpperCase()}
        </span>
        <span style={{ fontWeight: 700, fontSize: size * 0.19, letterSpacing: '0.32em', color: subColor }}>
          {site.sub.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
