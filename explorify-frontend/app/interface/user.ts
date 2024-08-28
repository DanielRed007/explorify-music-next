export interface SpotifyUser {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  type: string;
  uri: string;
  followers: {
    href: string | null;
    total: number;
  };
}
