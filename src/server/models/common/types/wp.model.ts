import { WP_Post, WP_REST_API_Post } from 'wp-types';

export interface WpLinkRequest extends WP_REST_API_Post {
  link_name: string;
  quick_page: WP_Post[];
  redirect_url: URL;
}
