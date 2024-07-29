import { ProductName } from "../../types";

export interface IProduct {
  id?: string | undefined;
  title: string;
  desc: string;
  imgUrl: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imgUrl: string;
  };
}


export interface IFormInput{
  id:string;
  name:ProductName;
  label:string;
  type:string
}

export interface ICategory{
  id:string;
  name:string;
  imgUrl: string;

}
