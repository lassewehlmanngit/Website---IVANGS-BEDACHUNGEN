import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSettings } from '@/shared/lib/content/globals';

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<{
    gtmId?: string;
    umamiId?: string;
    umamiSrc?: string;
  }>({});

  useEffect(() => {
    // Load settings from 'en' as default for global keys
    getSettings('en').then((settings) => {
      setConfig({
        gtmId: settings.gtmId,
        umamiId: settings.umamiId,
        umamiSrc: settings.umamiSrc,
      });
    });
  }, []);

  return (
    <>
      {config.gtmId && (
        <Helmet>
          <script>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.gtmId}');`}
          </script>
        </Helmet>
      )}
      {config.umamiId && (
        <Helmet>
          <script
            async
            defer
            data-website-id={config.umamiId}
            src={config.umamiSrc || 'https://analytics.umami.is/script.js'}
          />
        </Helmet>
      )}
      {children}
    </>
  );
};
