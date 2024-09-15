import * as yup from "yup";

const registrationSchemaEn = yup
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

const registrationSchemaRu = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Z]|[А-ЯЁ].+/, "Первая буква должна быть заглавной")
      .required("Обязательное поле"),
    email: yup
      .string()
      .email("Электронное письмо должно выглядеть как 'example@mail.com'")
      .matches(
        /\b[A-Za-z0-9._%+-]+[^.]@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
        "Электронное письмо должно выглядеть как 'example@mail.com'",
      )
      .required("Обязательное поле"),
    password: yup
      .string()
      .min(8, "Должно быть не менее 8 символов")
      .matches(/[0-9]/, "Must contain one number")
      .matches(/[A-Z]|[А-ЯЁ]/, "Должно содержать одну заглавную букву")
      .matches(/[a-z]|[а-яё]/, "Должен содержать одну строчную букву")
      .matches(
        /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
        "Должен содержать один специальный символ",
      )
      .required("Обязательное поле"),
    confirmPassword: yup
      .string()
      .required("Обязательное поле")
      .oneOf([yup.ref("password")], "Пароли должны совпадать"),
  })
  .required();

export { registrationSchemaEn, registrationSchemaRu };
