import { ChangeEvent, FormEvent, useState } from "react";
import { formInputList, productList } from "./components/data";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/ui/InputData";
import { IProduct } from "./components/interfaces";
import { productValidation } from "./validation";

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
  const [isOpen, setIsOpen] = useState(false);

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
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productValidation({
      title: product.title,
      desc: product.desc,
      imgUrl: product.imgUrl,
      price: product.price,
    });
    console.log(errors);
  };
  const onCancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };
  const renderProductList = () => {
    return productList.map((product) => (
      <ProductCard key={product.id} product={product} />
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
    </div>
  ));

  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>
        Add
      </Button>
      <div
        className=" m-5
       grid grid-cols-1 md:grid-col-2 lg:grid-col-3 xl:grid-cols-4 gap-2 md:gap-4
        p-2
        rounded-md"
      >
        {renderProductList()}
        <Modal isOpen={isOpen} closeModal={close} title="ADD A NEW PRODUCT">
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderFormInputList}
            <div className="flex items-center space-x-3">
              <Button
                className="bg-indigo-700 hover:bg-indigo-800"
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
      </div>
    </main>
  );
}

export default App;
