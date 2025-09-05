/*
Service for managing and interacting with the WP-API
*/

import ENV from '@src/common/constants/ENV';
import { Link } from '@src/models/common/types/link.model';
import { WpLinkRequest } from '@src/models/common/types/wp.model';
import { WP_REST_API_Page } from 'wp-types';

const WP: string = ENV.WpDomain;
const WPAuth: string = ENV.WpAuth;
const wpHeaders = new Headers({
  'Content-Type': 'application/json',
  Authorization: WPAuth,
});

export async function getAllLinks(): Promise<Link[]> {
  const wpRequest = await fetch(`${WP}/link_service/`, {
    headers: wpHeaders,
  });
  const wpResponse = (await wpRequest.json()) as WpLinkRequest[];

  // TODO REFACTOR TO RESPOND TO WEBHOOK AND ADD TO DB ON REQUEST NOT ALL AT ONCE

  return Promise.all(
    wpResponse.map(async (link: WpLinkRequest) => {
      const linkRedirectUrl: URL = link.quick_page
        ? await getQuickPageLink(link.quick_page[0].ID)
        : link.redirect_url;

      const processedLink: Link = {
        id: link.id,
        redirectionUrl: new URL(linkRedirectUrl),
        created: new Date(link.date),
        lastModified: new Date(link.modified),
      };
      return processedLink;
    })
  );
}

export async function getQuickPageLink(id: number): Promise<URL> {
  const wpRequest = await fetch(`${WP}/quick/${id}`, {
    headers: wpHeaders,
  });
  const wpResponse = (await wpRequest.json()) as WP_REST_API_Page;
  return new URL(wpResponse.link);
}
