export interface IProduct {
  _id: string;
  title: string;
  desc: string;
  price: number;
  type: "chameleons" | "amphibians" | "spiders";
  imageUrl: string;
}
