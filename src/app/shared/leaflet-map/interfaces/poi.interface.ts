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
    type?: string;
    name?: string;
    text?: string;
    audio?: string;
  }[];
}
