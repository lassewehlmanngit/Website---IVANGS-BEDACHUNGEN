import React, { useState } from 'react';
import Layout from './Layout';
import Home from './Home';
import About from './About';
import ServiceDetail from './ServiceDetail';
import Career from './Career';
import Contact from './Contact';
import Impressum from './Legal/Impressum';
import Datenschutz from './Legal/Datenschutz';
import AGB from './Legal/AGB';
import CookieSettings from './Legal/CookieSettings';
import NotFound from './NotFound';
import { Page, ServiceId } from '../../types';

const DesignA: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [currentService, setCurrentService] = useState<ServiceId>('steildach');

  const navigateToService = (id: ServiceId) => {
    setCurrentService(id);
    setCurrentPage(Page.SERVICE_DETAIL);
    // Smooth scroll to top when navigation happens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <Home setCurrentPage={setCurrentPage} navigateToService={navigateToService} />;
      case Page.ABOUT: return <About />;
      case Page.SERVICE_DETAIL: return <ServiceDetail serviceId={currentService} setCurrentPage={setCurrentPage} />;
      case Page.CAREER: return <Career setCurrentPage={setCurrentPage} />;
      case Page.CONTACT: return <Contact />;
      
      // Legal & Misc Pages
      case Page.IMPRESSUM: return <Impressum />;
      case Page.DATENSCHUTZ: return <Datenschutz />;
      case Page.AGB: return <AGB />;
      case Page.COOKIE_SETTINGS: return <CookieSettings />;
      
      // Fallback
      case Page.NOT_FOUND: return <NotFound setCurrentPage={setCurrentPage} />;
      default: return <NotFound setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      navigateToService={navigateToService}
      currentService={currentService}
    >
      {renderPage()}
    </Layout>
  );
};

export default DesignA;