import { useState, useEffect } from 'react';
import { brand } from '../data/site.js';

const { green, gold } = brand;

// Tela de carregamento (4s) com a logo + spinner. Aparece no load inicial e some com fade.
export default function Loader() {
  const [fade, setFade] = useState(false); // inicia o fade-out aos 4s
  const [gone, setGone] = useState(false); // remove do DOM após o fade

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 4000);
    const t2 = setTimeout(() => setGone(true), 4600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, background: green,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30,
        opacity: fade ? 0 : 1, transition: 'opacity .55s ease', pointerEvents: fade ? 'none' : 'auto',
      }}
    >
      {/* Emblema + anel giratório */}
      <div style={{ position: 'relative', width: 118, height: 118, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ldr-ring" />
        <div style={{ width: 64, height: 64, borderRadius: 16, background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 5, border: `1.5px solid ${green}`, borderRadius: 11, opacity: 0.6 }} />
          <span style={{ fontWeight: 900, fontSize: 40, color: green, letterSpacing: '-0.03em', lineHeight: 1 }}>A</span>
        </div>
      </div>

      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <span style={{ fontWeight: 900, fontSize: 28, color: '#fff', letterSpacing: '-0.02em' }}>ARAÇATUBA</span>
        <span style={{ fontWeight: 700, fontSize: 10, letterSpacing: '0.36em', color: gold }}>DISTRIBUIDORA</span>
      </div>

      {/* Barra de progresso (4s) */}
      <div style={{ width: 180, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 999, overflow: 'hidden' }}>
        <div className="ldr-bar" />
      </div>
    </div>
  );
}
