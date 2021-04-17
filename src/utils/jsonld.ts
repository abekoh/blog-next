import { siteData } from '../data/site';
import { dateToString } from './dateToString';

export type ListItemProperty = {
  type: 'ListItem';
  position: number;
  name: string;
  item: string;
};

export type BreadcrumbListProperty = {
  type: 'BreadcrumbList';
  itemListElement: ListItemProperty[];
};

export type ImageProperty = {
  type: 'ImageObject';
  url: string;
};

export type ArticleJsonldProperty = {
  type: 'Article';
  headline?: string;
  description?: string;
  datePublished?: Date;
  dateModified?: Date;
  image?: ImageProperty[];
};

export type WebSiteJsonldProperty = {
  type: 'WebSite';
  headline?: string;
  description?: string;
  image?: ImageProperty[];
};

export type JsonldProperty =
  | ArticleJsonldProperty
  | WebSiteJsonldProperty
  | BreadcrumbListProperty;

export const generateJsonld: (properties: JsonldProperty[]) => string = (
  properties,
) => {
  const results = properties.map((property: JsonldProperty) => {
    switch (property.type) {
      case 'Article':
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': property.type,
          name: siteData.title,
          headline: property.headline,
          description: property.description,
          datePublished:
            property.type === 'Article' &&
            property.datePublished &&
            dateToString(property.datePublished, '-'),
          dateModified:
            property.type === 'Article' &&
            property.dateModified &&
            dateToString(property.dateModified, '-'),
          image:
            property.image &&
            property.image.map((img) => {
              return {
                '@type': img.type,
                url: img.url,
              };
            }),
        };
      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': property.type,
          itemListElement: property.itemListElement.map((item) => {
            return {
              '@type': item.type,
              position: item.position,
              name: item.name,
              item: item.item,
            };
          }),
        };
    }
  });
  return JSON.stringify(
    results.length === 1 ? results[0] : results,
    undefined,
    2,
  );
};
