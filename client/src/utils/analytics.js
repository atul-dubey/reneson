import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Initializes Google Analytics 4.
 */
export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

/**
 * Logs a custom event to Google Analytics.
 * 
 * @param {string} category - Event category (e.g., 'CTA', 'Navigation')
 * @param {string} action - Event action (e.g., 'Schedule Free Call Clicked')
 * @param {string} label - Event label (e.g., 'Schedule Free Call')
 */
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

/**
 * Custom hook that automatically listens to route changes using React Router
 * and sends a pageview event to Google Analytics.
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
      title: document.title,
    });
  }, [location]);
};
