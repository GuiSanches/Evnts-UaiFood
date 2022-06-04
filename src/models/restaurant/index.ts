import Item from "../Item";

export default interface Restaurant {
  name: string;
  city: string;
  segment: string;
  stars: number;
  address: string;
  tags: string[];
  meals: Item[];
  location: [number, number];
}
