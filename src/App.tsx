import { ChangeEvent, FormEvent, useState } from "react";
import {
  caregories,
  colors,
  formInputList,
  productList,
} from "./components/data";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/ui/InputData";
import { IProduct } from "./components/interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { ProductCard } from "./components/ProductCard";
import { ProductName } from "./types";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultProductObj = {
    title: "",
    desc: "",
    imgUrl: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imgUrl: "",
    },
  };
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct>(defaultProductObj);
  const [editProductIdx, setEditProductIdx] = useState<number>(0);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    imgUrl: "",
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(caregories[3]);

  //add
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, desc, price, imgUrl } = product;

    const errors = productValidation({
      title,
      desc,
      imgUrl,
      price,
    });
    console.log(errors);

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColor, category: selectedCategory },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
    toast("product is added successfully", {
      icon: "👏",
      style: {
        background: "black",
        color: "white",
      },
    });
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };

  //end add

  // edit
  function openEditModal() {
    setIsOpenEditModal(true);
  }

  function closeEditModal() {
    setIsOpenEditModal(false);
  }

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, desc, price, imgUrl } = editProduct;

    const errors = productValidation({
      title,
      desc,
      imgUrl,
      price,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[editProductIdx] = {
      ...editProduct,
      colors: tempColor.concat(editProduct.colors),
    };
    setProducts(updatedProducts);
    setEditProduct(defaultProductObj);
    setTempColor([]);
    closeEditModal();
    toast("product is edited successfully", {
      icon: "👏",
      style: {
        background: "black",
        color: "white",
      },
    });
  };

  const onEditCancel = () => {
    setEditProduct(defaultProductObj);
    closeEditModal();
  };
  //end edit

  //delete

  function openConfirmModal() {
    setIsOpenConfirmModal(true);
  }

  function closeConfirmModal() {
    setIsOpenConfirmModal(false);
  }

  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== editProduct.id
    );
    setProducts(filtered);
    closeConfirmModal();
    toast("product has been deleted", {
      icon: "👏",
      style: {
        background: "black",
        color: "white",
      },
    });
  };
  //end delete

  //renders

  const renderProductList = () => {
    return products.map((product, idx) => (
      <ProductCard
        key={product.id}
        product={product}
        setEditProduct={setEditProduct}
        openEditModal={openEditModal}
        idx={idx}
        setEditProductIdx={setEditProductIdx}
        openConfirmModal={openConfirmModal}
      />
    ));
  };

  const renderFormInputList = formInputList.map((formInput) => (
    <div className="flex flex-col" key={formInput.id}>
      <label
        htmlFor={formInput.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {formInput.label}
      </label>
      <Input
        type="text"
        id={formInput.id}
        name={formInput.name}
        value={product[formInput.name]}
        onChange={onChangeHandler}
      />
      <ErrorMsg msg={errors[formInput.name]} />
    </div>
  ));

  const renderProductColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }

        if (editProduct.colors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const renderEditPRoduct = (id: string, label: string, name: ProductName) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[2px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={editProduct[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMsg msg={errors[name]} />
      </div>
    );
  };

  //end renders

  return (
    <div className="bg-orange-50" style={{ width: "100%" }}>
      <main className="container">
        <Button
          className="bg-indigo-700 hover:bg-indigo-800 mt-4"
          onClick={openModal}
        >
          Add
        </Button>
        <div
          className=" m-5
       grid grid-cols-1 md:grid-col-2 lg:grid-col-3 xl:grid-cols-4 gap-2 md:gap-4
        p-2
        rounded-md"
        >
          {renderProductList()}
        </div>
        {/* ADD MODAL */}
        <Modal isOpen={isOpen} closeModal={close} title="ADD A NEW PRODUCT">
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderFormInputList}
            <Select
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />

            <div className="flex items-center my-4 space-x-2">
              {renderProductColor}
            </div>

            <div className="flex items-center my-4 space-x-2">
              {tempColor.map((color) => (
                <span
                  key={color}
                  className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                  style={{ background: color }}
                >
                  {color}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-3 ">
              <Button
                className="bg-indigo-700  hover:bg-indigo-800"
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={onCancel}
                className="bg-gray-400 hover:bg-gray-500"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
        <Toaster />

        {/* EDIT MODAL */}
        <Modal
          isOpen={isOpenEditModal}
          closeModal={closeEditModal}
          title="EDIT PRODUCT"
        >
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {renderEditPRoduct("title", "product title", "title")}
            {renderEditPRoduct("desc", "product description", "desc")}
            {renderEditPRoduct("imgUrl", "product image url", "imgUrl")}
            {renderEditPRoduct("price", "price", "price")}

            <Select
              selected={editProduct.category}
              setSelected={(value) => {
                setEditProduct({ ...editProduct, category: value });
              }}
            />

            <div className="flex items-center my-4 space-x-2">
              {renderProductColor}
            </div>

            <div className="flex items-center my-4 space-x-2">
              {tempColor.concat(editProduct.colors).map((color) => (
                <span
                  key={color}
                  className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                  style={{ background: color }}
                >
                  {color}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-3 ">
              <Button
                className="bg-indigo-700  hover:bg-indigo-800"
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={onEditCancel}
                className="bg-gray-400 hover:bg-gray-500"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
        <Toaster />

        {/* Delete product confirm MODAL */}
        <Modal
          isOpen={isOpenConfirmModal}
          closeModal={closeConfirmModal}
          title="Are you sure you want to remove this product from your store?"
        >
          <div className="flex items-center space-x-3 ">
            <Button
              className="bg-[#c2344d] hover:bg-red-800"
              type="submit"
              onClick={removeProductHandler}
            >
              Yes,Remove
            </Button>
            <Button
              onClick={closeConfirmModal}
              className="bg-gray-500 hover:bg-gray-300 text-black"
            >
              Cancel
            </Button>
          </div>
        </Modal>
        <Toaster />
      </main>
    </div>
  );
}

export default App;
