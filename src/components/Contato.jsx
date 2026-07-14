import { useState } from 'react';
import { brand } from '../data/site.js';
import Reveal from './Reveal.jsx';

const inputLight = { padding: '14px 16px', border: `1px solid ${brand.border}`, borderRadius: 12, background: brand.cream, fontSize: 15, color: brand.ink };
const inputDark = { padding: '14px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, background: 'rgba(255,255,255,0.08)', fontSize: 15, color: '#fff' };

function Ouvidoria() {
  const [sent, setSent] = useState(false);
  return (
    <div id="ouvidoria" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.22em', color: brand.gold, textTransform: 'uppercase' }}>Ouvidoria</span>
        <h2 style={{ margin: 0, fontWeight: 900, fontSize: 32, lineHeight: 1.08, letterSpacing: '-0.02em', color: brand.green }}>Fale com a gente. A gente ouve.</h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: brand.ink }}>Elogios, sugestões ou reclamações — todo retorno nos ajuda a melhorar o atendimento.</p>
      </div>
      {sent ? (
        <div style={{ background: 'rgba(28,58,43,0.08)', border: `1px solid ${brand.green}`, borderRadius: 16, padding: 24, color: brand.green, fontWeight: 600, fontSize: 15 }}>
          Recebemos sua mensagem. Obrigado pelo contato — retornaremos em breve. 🙌
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input required placeholder="Seu nome" style={inputLight} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input required placeholder="E-mail ou telefone" style={inputLight} />
            <select style={inputLight}>
              <option>Elogio</option><option>Sugestão</option><option>Reclamação</option><option>Dúvida</option>
            </select>
          </div>
          <textarea required rows={4} placeholder="Sua mensagem" style={{ ...inputLight, resize: 'vertical' }} />
          <button type="submit" className="btn-green" style={{ alignSelf: 'flex-start', fontWeight: 700, fontSize: 15, border: 'none', padding: '14px 26px', borderRadius: 999, cursor: 'pointer' }}>
            Enviar mensagem
          </button>
        </form>
      )}
    </div>
  );
}

function Trabalhe() {
  const [sent, setSent] = useState(false);
  return (
    <div id="trabalhe" style={{ display: 'flex', flexDirection: 'column', gap: 20, background: brand.green, borderRadius: 24, padding: 36 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.22em', color: brand.gold, textTransform: 'uppercase' }}>Trabalhe conosco</span>
        <h2 style={{ margin: 0, fontWeight: 900, fontSize: 32, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#fff' }}>Venha crescer com a Araçatuba.</h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,0.82)' }}>Buscamos gente comprometida para os times de vendas, logística e operação. Deixe seus dados abaixo.</p>
      </div>
      {sent ? (
        <div style={{ background: 'rgba(255,255,255,0.12)', border: `1px solid ${brand.gold}`, borderRadius: 16, padding: 24, color: '#fff', fontWeight: 600, fontSize: 15 }}>
          Currículo recebido! Nosso RH vai analisar e entrar em contato. 💚
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input required placeholder="Seu nome" style={inputDark} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input required placeholder="Telefone / WhatsApp" style={inputDark} />
            <select style={inputDark}>
              <option style={{ color: brand.ink }}>Vendas</option>
              <option style={{ color: brand.ink }}>Logística / Entrega</option>
              <option style={{ color: brand.ink }}>Operação / Depósito</option>
              <option style={{ color: brand.ink }}>Administrativo</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: '1px dashed rgba(255,255,255,0.35)', borderRadius: 12, cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
            <span style={{ width: 34, height: 34, borderRadius: 8, background: brand.gold, color: brand.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, flex: 'none' }}>+</span>
            Anexar currículo (PDF)
            <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
          </label>
          <button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start', fontWeight: 700, fontSize: 15, border: 'none', padding: '14px 26px', borderRadius: 999, cursor: 'pointer' }}>
            Enviar candidatura
          </button>
        </form>
      )}
    </div>
  );
}

export default function Contato() {
  return (
    <section style={{ background: '#fff', borderTop: `1px solid ${brand.border}`, borderBottom: `1px solid ${brand.border}` }}>
      <div className="wrap contato-grid" style={{ padding: '88px 28px' }}>
        <Reveal><Ouvidoria /></Reveal>
        <Reveal delay={0.1}><Trabalhe /></Reveal>
      </div>
    </section>
  );
}
