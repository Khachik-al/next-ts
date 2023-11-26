export interface PhoneInfo {
  id: number;
  manufacturer: string;
  name: string;
  image_location: string;
  customerID: string;
  vanity_name: string;
}
export interface PhoneList {
  products: PhoneInfo[];
}
