import yup from "yup";

export const emailSchema = yup.string().email();
