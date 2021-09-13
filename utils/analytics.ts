import ReactGA from 'react-ga';

export const initializeAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(process.env.NEXT_PUBLIC_ANALYTICS);
  }
};

export const trackPageView = (path: string) => {
  ReactGA.set({ page: path });
  ReactGA.pageview(path);
};

export const trackModalView = (modalName: string) => {
  ReactGA.modalview(modalName);
};

export const trackNewRound = (title: string) => {
  ReactGA.event({
    category: 'Games',
    action: `New Round - ${title}`,
    label: title,
  });
};
