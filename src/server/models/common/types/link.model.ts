export interface LinkTable {
  id: number;
  linkSource: string;
  linkSourceId: number;
  redirectUrl: URL;
  customUrlSlug?: string;
  encodedUrlSlug: string;
  createdAt: Date;
  lastModified: Date;
}

export type Link = Omit<LinkTable, 'id' | 'encodedUrlSlug'>;

export interface redirectQuery {
  redirect_url: string;
}
