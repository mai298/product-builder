import CircleColor from "./CircleColor";
import Image from "./Image";
import { IProduct } from "./interfaces";
import Button from "./ui/Button";
import { txtSlicer } from "./utils/functions";

interface Iprops {
  product: IProduct;
  setEditProduct:(product:IProduct)=>void;
  openEditModal:()=>void;

}


export const  ProductCard=({product,setEditProduct,openEditModal}: Iprops)=>{
const { title, desc, imgUrl ,price,colors,category}=product;


{



  const renderProductColor = colors.map((color) => (
    <CircleColor key={color} color={color}  />

  ));



  const onEdit =()=>{
    setEditProduct(product);
    openEditModal()
    }
  return (
    <div
      className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3"
    >
      <Image imgUrl={imgUrl} alt="product-name" className="rounded-md h-52 w-full lg:object-cover" />
      <h3>{title}</h3>
      <p>{txtSlicer(desc)}</p>
      <div className="flex items-center my-4 space-x-2">
              {renderProductColor}
            </div>
      {/* <div className="flex items-center my-4 space-x-2">
        <span className="w-5 h-5 cursor-pointer bg-indigo-600 rounded-full" />
        <span className="w-5 h-5 cursor-pointer bg-yellow-600 rounded-full" />
        <span className="w-5 h-5 cursor-pointer bg-red-600 rounded-full" />
      </div> */}

      <div className="flex items-center justify-between ">
        <span>${price}</span>

        <Image
          imgUrl={category.imgUrl}
          alt={category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>

      

      <div className=" mt-5 flex items-center justify-between space-x-2">
      <Button
        className="bg-indigo-700"
        onClick={onEdit}
      >
        EDIT{" "}
      </Button>
        <Button className="bg-red-700">DELETE</Button>

      </div>
    </div>
  );
}
}
