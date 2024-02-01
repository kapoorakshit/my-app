import * as yup from "yup";
export const ProductRequestTypeSchema = yup.object().shape({
  title: yup.string().required("Please enter product name"),
  description: yup.string().required("Please enter product description"),
  price: yup.number().min(10).required("This field is requried"),
  discountPercentage: yup.number().required("This field is requried"),
  rating: yup.number().required("This field is requried"),
  stock: yup.number().required("This field is requried"),
  brand: yup.string().required("Please enter the brand"),
  category: yup.string().required("Please enter the category"),
});
