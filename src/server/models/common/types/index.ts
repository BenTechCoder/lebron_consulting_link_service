export interface ILink {
  id: number;
  customSlug?: string;
  title: string;
  // TODO: (store as `new URL("https://www.example.com")`)
  redirectionUrl: URL;
  created: Date;
  lastModified: Date;
}
