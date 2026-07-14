import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Ao trocar de rota, volta ao topo (senão a nova página herda o scroll da anterior).
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
