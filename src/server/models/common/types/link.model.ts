export interface Link {
  id: number;
  customSlug?: string;
  // TODO: (store as `new URL("https://www.example.com")`)
  redirectionUrl: URL;
  created: Date;
  lastModified: Date;
}
