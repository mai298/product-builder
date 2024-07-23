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
  name:'title' |'desc'|'imgUrl'|'price';
  label:string;
  type:string
}
