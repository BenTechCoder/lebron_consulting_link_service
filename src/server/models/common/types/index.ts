export interface IModel {
  id: number;
  created: Date;
}

export interface ILink {
  id: number;
  customSlug?: string;
  title: string;
  // TODO: Make/Grab/Vaidate Url as a type
  redirectionUrl: string;
  created: Date;
  lastModified: Date;
}
