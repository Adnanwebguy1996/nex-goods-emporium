
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { visitorService } from '@/lib/firebase/visitorService';

export const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track visitor when page changes
    visitorService.trackVisitor(location.pathname).catch(console.error);
  }, [location.pathname]);

  useEffect(() => {
    // Update visitor activity every 30 seconds while on page
    const interval = setInterval(() => {
      visitorService.updateVisitorPage(location.pathname).catch(console.error);
    }, 30000);

    return () => clearInterval(interval);
  }, [location.pathname]);
};
