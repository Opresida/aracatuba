import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Empresa from './components/Empresa.jsx';
import Operacao from './components/Operacao.jsx';
import Depoimentos from './components/Depoimentos.jsx';
import Estrutura from './components/Estrutura.jsx';
import Contato from './components/Contato.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppBtn from './components/WhatsAppBtn.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Empresa />
        <Operacao />
        <Depoimentos />
        <Estrutura />
        <Contato />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppBtn />
    </>
  );
}
