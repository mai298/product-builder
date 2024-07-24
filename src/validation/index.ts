//** productObj===validationObj (title,desc,img,price)*/

export const productValidation = (product: {
  title: string;
  desc: string;
  imgUrl: string;
  price: string;
}) => {
  //**returns an object */
  const errors: { title: string; desc: string; imgUrl: string; price: string } =
    {
      title: "",
      desc: "",
      imgUrl: "",
      price: "",
    };

  const validUrl = /^(ftp|http|https):\/\/[^ ]+\.(jpeg|jpg|gif|png|svg)$/.test(
    product.imgUrl
  );

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "product title must be between 10 and 80 characters!";
  }

  if (
    !product.desc.trim() ||
    product.desc.length < 10 ||
    product.desc.length > 80
  ) {
    errors.desc = "product description must be between 10 and 900 characters!";
  }

  if (!product.imgUrl.trim() || !validUrl) {
    errors.imgUrl = "valid image url is required!";
  }


  if (
                    !product.price.trim() ||
                   
                    isNaN(Number(product.price))
                  ) {
                    errors.price = "valid price is required!";
                  }
  return errors;
};
