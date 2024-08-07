import CircleColor from "./CircleColor";
import Image from "./Image";
import { IProduct } from "./interfaces";
import Button from "./ui/Button";
import { txtSlicer } from "./utils/functions";

interface Iprops {
  product: IProduct;
  setEditProduct: (product: IProduct) => void;
  setEditProductIdx: (value: number) => void;
  idx: number;
  openEditModal: () => void;
  openConfirmModal: () => void;
}

export const ProductCard = ({
  product,
  setEditProduct,
  openEditModal,
  setEditProductIdx,
  openConfirmModal,
  idx,
}: Iprops) => {
  const { title, desc, imgUrl, price, colors, category } = product;

  {
    const renderProductColor = colors.map((color) => (
      <CircleColor key={color} color={color} />
    ));

    const onEdit = () => {
      setEditProduct(product);
      openEditModal();
      setEditProductIdx(idx);
    };

    const onRemove = () => {
      setEditProduct(product);
      openConfirmModal();
    };
    return (
      <div className="max-w-sm md:w-full md:max-w-lg mx-auto  border rounded-md p-2 flex flex-col space-y-2">
        <Image
          imgUrl={imgUrl}
          alt="product-name"
          className="rounded-md h-52 w-full lg:object-cover"
        />
        <h3>{title}</h3>
        <p>{txtSlicer(desc)}</p>
        <div className="flex items-center my-4 space-x-2">
          {renderProductColor}
        </div>

        <div className="flex items-center justify-between ">
          <span>${price}</span>

          <Image
            imgUrl={category.imgUrl}
            alt={category.name}
            className="w-10 h-10 rounded-full object-bottom"
          />
        </div>

        <div className=" mt-5 flex items-center justify-between space-x-2">
          <Button className="bg-indigo-700" onClick={onEdit}>
            EDIT{" "}
          </Button>
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </div>
    );
  }
};
