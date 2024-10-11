export interface Image {
  id: string;
  url: string;
  alt: string;
}
export interface PropertyImage extends Image {
  propertyId: string;
}
