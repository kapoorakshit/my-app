import * as yup from "yup";

export const LoginRequestInitialValueSchema = yup.object().shape({
  username: yup.string().required("Please enter valid username"),
  password: yup.string().required("Please enter valid password"),
});
