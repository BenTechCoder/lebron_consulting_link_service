export interface Link {
  id: number;
  customSlug?: string;
  redirectionUrl: URL;
  created: Date;
  lastModified: Date;
}
