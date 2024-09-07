import * as yup from "yup";

const endpointSchema = yup
  .object({
    endpoint: yup
      .string()
      .url("Must be a valid URL")
      .required("Endpoint is required"),
  })
  .required();

export default endpointSchema;
