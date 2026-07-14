import { site } from '../data/site.js';

export default function WhatsAppBtn() {
  return (
    <a
      href={site.wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"
      className="wa-float"
      style={{
        position: 'fixed', bottom: 26, right: 26, zIndex: 80,
        display: 'flex', alignItems: 'center', gap: 12, color: '#fff',
        padding: '14px 22px 14px 16px', borderRadius: 999,
        boxShadow: '0 14px 34px -12px rgba(0,0,0,0.5)', fontWeight: 800, fontSize: 15,
      }}
    >
      <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <span style={{ width: 18, height: 16, background: '#25D366', borderRadius: '50% 50% 50% 3px', display: 'block' }} />
      </span>
      Fale no WhatsApp
    </a>
  );
}
