import ReactGA from 'react-ga';
import Cookies from 'js-cookie';

const addAnalytics = (alreadyConsented = false) => {
  if (!alreadyConsented) {
    // user has consented to analytics
    setCookieContent(1);
  }
  // if we're in production start up analytics
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(process.env.NEXT_PUBLIC_ANALYTICS);
    // if user toggles analyics cookies on and off we need to reset this window variable
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out
    window[`ga-disable-${process.env.NEXT_PUBLIC_ANALYTICS}`] = false;
  }
};

const removeAnalytics = () => {
  // user has removed their consent to analytics
  setCookieContent(0);
  // remove analytic cookies if they are there
  Cookies.remove('_ga');
  Cookies.remove('_gat');
  Cookies.remove('_gid');
  // if user toggles analyics cookies on and off we need to reset this window variable
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out
  if (process.env.NODE_ENV === 'production') {
    window[`ga-disable-${process.env.NEXT_PUBLIC_ANALYTICS}`] = true;
  }
};

const getCookieContent = () => {
  return Cookies.get('cookie_consent');
};

const setCookieContent = (value: number) => {
  Cookies.set('cookie_consent', String(value), {
    expires: 365,
    secure: !!(process.env.NODE_ENV === 'production'),
    sameSite: 'strict',
  });
};

const trackPageView = (path: string) => {
  if (!window['ga']) return;
  ReactGA.set({ page: path });
  ReactGA.pageview(path);
};

const trackModalView = (modalName: string) => {
  if (!window['ga']) return;
  ReactGA.modalview(modalName);
};

const trackNewRound = (title: string) => {
  if (!window['ga']) return;
  ReactGA.event({
    category: 'Games',
    action: `New Round - ${title}`,
    label: title,
  });
};

export const analytics = {
  add: addAnalytics,
  remove: removeAnalytics,
};

export const consent = {
  get: getCookieContent,
  set: setCookieContent,
};

export const track = {
  modalView: trackModalView,
  newRound: trackNewRound,
  pageView: trackPageView,
};
