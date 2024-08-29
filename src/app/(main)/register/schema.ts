import * as yup from "yup";

const registrationSchema = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Z]|[А-ЯЁ].+/, "First letter must be uppercase")
      .required("Field is required"),
    email: yup
      .string()
      .email("Email must look like 'example@mail.com'")
      .matches(
        /\b[A-Za-z0-9._%+-]+[^.]@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
        "Email must look like 'example@mail.com'",
      )
      .required("Field is required"),
    password: yup
      .string()
      .min(8, "Must be at least 8 characters")
      .matches(/[0-9]/, "Must contain one number")
      .matches(/[A-Z]|[А-ЯЁ]/, "Must contain one uppercase letter")
      .matches(/[a-z]|[а-яё]/, "Must contain one lowercase letter")
      .matches(
        /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
        "Must contain one special characters",
      )
      .required("Field is required"),
    confirmPassword: yup
      .string()
      .required("Field is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

export default registrationSchema;
