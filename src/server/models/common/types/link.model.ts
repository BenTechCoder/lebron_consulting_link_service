export type LinkTable = {
  id: number;
  linkSource: string;
  linkSourceId: number;
  redirectUrl: URL;
  customUrlSlug?: string;
  encodedUrlSlug: string;
  createdAt: Date;
  lastModified: Date;
}

export type Link = Omit<LinkTable, 'id' | 'encodedUrlSlug' >
