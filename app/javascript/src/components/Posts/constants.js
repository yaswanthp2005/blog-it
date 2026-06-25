import * as Yup from "yup";

const POST_FORM_INITIAL_VALUES = {
  categoryIds: [],
  title: "",
  description: "",
};

const POST_FORM_VALIDATION_SCHEMA = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(125, "Title must be at most 125 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(10000, "Description must be at most 10000 characters"),
  categoryIds: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required(),
        value: Yup.mixed().required(),
      })
    )
    .min(1, "Select at least one category"),
});

export { POST_FORM_INITIAL_VALUES, POST_FORM_VALIDATION_SCHEMA };
