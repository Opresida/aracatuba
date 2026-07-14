import { Link } from 'react-router-dom';
import { brand, site } from '../data/site.js';

const { green, gold, ink, cream, border, paper, muted } = brand;

// Emblema "A" da marca, parametrizável por tamanho e cores.
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

// Bloco de seção com rótulo em caixa alta.
function Block({ label, children }) {
  return (
    <section style={{ width: '100%', maxWidth: 1120, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.22em', color: muted, textTransform: 'uppercase' }}>{label}</div>
      {children}
    </section>
  );
}

const card = { background: paper, border: `1px solid ${border}`, borderRadius: 20, display: 'flex' };

export default function Brandbook() {
  return (
    <div style={{ background: cream, minHeight: '100vh', fontFamily: 'Archivo, sans-serif', color: ink }}>
      {/* Barra superior */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(244,240,231,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
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

      <div style={{ padding: '56px 48px 88px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 56 }}>

        {/* ===== LOGO PRINCIPAL ===== */}
        <div style={{ ...card, width: '100%', maxWidth: 1120, padding: '88px 48px', flexDirection: 'column', alignItems: 'center', gap: 8, boxShadow: '0 24px 60px -40px rgba(20,30,20,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Emblem size={148} baseline />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontWeight: 900, fontSize: 74, lineHeight: 0.92, letterSpacing: '-0.02em', color: green }}>ARAÇATUBA</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ height: 2, width: 44, background: gold }} />
                <div style={{ fontWeight: 700, fontSize: 23, letterSpacing: '0.42em', color: ink }}>DISTRIBUIDORA</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 38, fontWeight: 600, fontSize: 20, letterSpacing: '0.06em', color: muted, textTransform: 'uppercase' }}>{site.tagline}</div>
        </div>

        {/* ===== VARIAÇÕES DE ASSINATURA ===== */}
        <Block label="Variações de assinatura">
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 0.7fr', gap: 16 }} className="bb-lockups">
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

        {/* ===== VERSÕES SOBRE FUNDO ===== */}
        <Block label="Versões sobre fundo">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }} className="bb-grid3">
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

        {/* ===== PALETA ===== */}
        <Block label="Paleta">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="bb-grid4">
            {[
              { nome: 'Verde-garrafa', hex: green },
              { nome: 'Dourado âmbar', hex: gold },
              { nome: 'Grafite', hex: ink },
              { nome: 'Creme', hex: cream, hairline: true },
            ].map((c) => (
              <div key={c.nome} style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${border}` }}>
                <div style={{ height: 96, background: c.hex, borderBottom: c.hairline ? `1px solid ${border}` : 'none' }} />
                <div style={{ padding: '12px 14px', background: paper }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{c.nome}</div>
                  <div style={{ fontSize: 12, color: muted, fontFamily: 'monospace' }}>{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* ===== APLICAÇÕES ===== */}
        <Block label="Aplicações">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }} className="bb-apps">
            <div style={{ ...card, padding: 20, flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', fontWeight: 700, color: muted, textTransform: 'uppercase' }}>Frota</div>
              <div style={{ borderRadius: 14, background: green, height: 210, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <Emblem size={88} bg={gold} letter={green} ring={green} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontWeight: 900, fontSize: 46, lineHeight: 0.9, color: paper, letterSpacing: '-0.02em' }}>ARAÇATUBA</div>
                    <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.32em', color: gold }}>DISTRIBUIDORA</div>
                    <div style={{ marginTop: 4, fontWeight: 600, fontSize: 13, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{site.tagline}</div>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: -26, left: 90, width: 52, height: 52, borderRadius: '50%', background: ink }} />
                <div style={{ position: 'absolute', bottom: -26, right: 90, width: 52, height: 52, borderRadius: '50%', background: ink }} />
              </div>
            </div>
            <div style={{ ...card, padding: 20, flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', fontWeight: 700, color: muted, textTransform: 'uppercase' }}>Redes sociais</div>
              <div style={{ borderRadius: 14, background: cream, height: 210, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 132, height: 132, borderRadius: '50%', background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 12px 26px -14px rgba(15,40,25,0.7)' }}>
                  <div style={{ position: 'absolute', inset: 12, border: `2px solid ${gold}`, borderRadius: '50%', opacity: 0.8 }} />
                  <span style={{ fontWeight: 900, fontSize: 78, lineHeight: 1, color: gold, letterSpacing: '-0.03em' }}>A</span>
                </div>
              </div>
            </div>
          </div>
        </Block>

      </div>
    </div>
  );
}
