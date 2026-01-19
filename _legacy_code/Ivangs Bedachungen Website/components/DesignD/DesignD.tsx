import React, { useState } from 'react';
import Layout from './Layout';
import Home from './Home';
import About from './About';
import Services from './Services';
import ServiceDetail from './ServiceDetail';
import Career from './Career';
import Contact from './Contact';
import { Page, ServiceId } from '../../types';

const DesignD: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [currentService, setCurrentService] = useState<ServiceId>('steildach');

  const navigateToService = (id: ServiceId) => {
    setCurrentService(id);
    setCurrentPage(Page.SERVICE_DETAIL);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <Home setCurrentPage={setCurrentPage} />;
      case Page.ABOUT: return <About />;
      case Page.SERVICES: return <Services setCurrentPage={setCurrentPage} navigateToService={navigateToService} />;
      case Page.SERVICE_DETAIL: return <ServiceDetail serviceId={currentService} setCurrentPage={setCurrentPage} />;
      case Page.CAREER: return <Career setCurrentPage={setCurrentPage} />;
      case Page.CONTACT: return <Contact />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default DesignD;