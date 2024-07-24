import { ChangeEvent, FormEvent, useState } from "react";
import { colors, formInputList, productList } from "./components/data";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/ui/InputData";
import { IProduct } from "./components/interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColor from "./components/CircleColor";

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
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    imgUrl: "",
    price: "",
  });

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
    const errors = productValidation({
      title: product.title,
      desc: product.desc,
      imgUrl: product.imgUrl,
      price: product.price,
    });
    console.log(errors);

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
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
      <ErrorMsg msg={errors[formInput.name]} />
    </div>
  ));

  const renderProductColor = colors.map((color) => (
    <CircleColor key={color} color={color} onClick={() => {
      if(tempColor.includes(color)){
        setTempColor(prev=>prev.filter(item=>item!==color));
        return;
      }
      setTempColor(prev=>[...prev,color]);
      
    }} />
  ));
console.log(tempColor)

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
            <div className="flex items-center my-4 space-x-2">
              {renderProductColor}
            </div>


            <div className="flex items-center my-4 space-x-2">
              {tempColor.map(color=>(
                <span key={color} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{background:color}}>{color}</span>

              ))}
            </div>

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
