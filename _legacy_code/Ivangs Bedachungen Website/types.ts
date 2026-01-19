export enum Page {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  SERVICE_DETAIL = 'service_detail',
  CAREER = 'career',
  CONTACT = 'contact',
  IMPRESSUM = 'impressum',
  DATENSCHUTZ = 'datenschutz',
  AGB = 'agb',
  COOKIE_SETTINGS = 'cookie_settings',
  NOT_FOUND = 'not_found'
}

export type ServiceId = 'steildach' | 'flachdach' | 'fenster' | 'sanierung' | 'solar';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  description: string;
  image: string;
}

export interface JobOffer {
  id: string;
  title: string;
  type: string;
  description: string;
}

export interface DesignProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}