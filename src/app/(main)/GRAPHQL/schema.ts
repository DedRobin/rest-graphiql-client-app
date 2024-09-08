import * as yup from "yup";

export const validationSchema = yup.object({
  endpoint: yup
    .string()
    .url("Must be a valid URL")
    .required("Endpoint is required"),
  sdl: yup.string().url("Must be a valid URL").required("SDL URL is required"),
});
