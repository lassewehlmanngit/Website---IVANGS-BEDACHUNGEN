import React from 'react';
import { Link } from 'react-router-dom';

export type LinkType = 'internal' | 'external' | 'download' | 'section' | 'phone' | 'email';

export interface LinkData {
  linkType?: LinkType;
  url?: string;
  openInNewTab?: boolean;
}

export interface SmartLinkProps {
  link?: LinkData | string; // Support both new object format and legacy string format
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * SmartLink component that handles different types of links:
 * - internal: React Router Link for internal navigation
 * - external: Opens in new tab with rel="noopener noreferrer"
 * - download: Downloads a file
 * - section: Scrolls to anchor on page
 * - phone: tel: link for phone numbers
 * - email: mailto: link for emails
 * 
 * Also supports legacy string format for backward compatibility
 */
export const SmartLink: React.FC<SmartLinkProps> = ({ link, children, className, onClick }) => {
  // Handle legacy string format
  if (typeof link === 'string') {
    // Auto-detect link type from string
    if (link.startsWith('tel:')) {
      return (
        <a href={link} className={className} onClick={onClick}>
          {children}
        </a>
      );
    }
    if (link.startsWith('mailto:')) {
      return (
        <a href={link} className={className} onClick={onClick}>
          {children}
        </a>
      );
    }
    if (link.startsWith('#')) {
      return (
        <a href={link} className={className} onClick={onClick}>
          {children}
        </a>
      );
    }
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
          {children}
        </a>
      );
    }
    // Default to internal link
    return (
      <Link to={link} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Handle object format
  if (!link || !link.url) {
    // No link provided, render as span
    return <span className={className}>{children}</span>;
  }

  const { linkType = 'internal', url, openInNewTab } = link;

  switch (linkType) {
    case 'external':
      return (
        <a
          href={url}
          target={openInNewTab !== false ? '_blank' : undefined}
          rel={openInNewTab !== false ? 'noopener noreferrer' : undefined}
          className={className}
          onClick={onClick}
        >
          {children}
        </a>
      );

    case 'download':
      return (
        <a href={url} download className={className} onClick={onClick}>
          {children}
        </a>
      );

    case 'section':
      return (
        <a href={url.startsWith('#') ? url : `#${url}`} className={className} onClick={onClick}>
          {children}
        </a>
      );

    case 'phone':
      const phoneUrl = url.startsWith('tel:') ? url : `tel:${url}`;
      return (
        <a href={phoneUrl} className={className} onClick={onClick}>
          {children}
        </a>
      );

    case 'email':
      const emailUrl = url.startsWith('mailto:') ? url : `mailto:${url}`;
      return (
        <a href={emailUrl} className={className} onClick={onClick}>
          {children}
        </a>
      );

    case 'internal':
    default:
      return (
        <Link to={url} className={className} onClick={onClick}>
          {children}
        </Link>
      );
  }
};
