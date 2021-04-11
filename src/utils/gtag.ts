/* eslint-disable */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

type ContactEvent = {
  action: 'submit_form';
  category: 'contact';
  label: string;
};

type ClickEvent = {
  action: 'click';
  category: 'other';
  label: string;
};

export type Event = ContactEvent | ClickEvent;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// @ts-ignore
export const event = ({ action, category, label, value }) => {
  if (!GA_TRACKING_ID) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value: value,
  });
};
