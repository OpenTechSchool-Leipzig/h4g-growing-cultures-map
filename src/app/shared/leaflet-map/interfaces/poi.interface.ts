export interface PointOfInterest {
  id: string;
  name: string;
  location: {
    lat: number;
    lon: number;
  };
  images: {
    url: string;
    description: string;
  }[];
  info_nodes: {
    type?:
      'latin-name' |
      'origin' |
      'leaves' |
      'blossoms' |
      'fruits' |
      'relation-to-leipzig';
    name?: string;
    text?: string;
    audio?: string;
  }[];
}
