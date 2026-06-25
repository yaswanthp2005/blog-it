import * as Yup from "yup";

const POST_STATUSES = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

const MAX_DESCRIPTION_LENGTH = 1000;

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
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Description must be at most ${MAX_DESCRIPTION_LENGTH} characters`
    ),
  categoryIds: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required(),
        value: Yup.mixed().required(),
      })
    )
    .min(1, "Select at least one category"),
});

export {
  MAX_DESCRIPTION_LENGTH,
  POST_FORM_INITIAL_VALUES,
  POST_FORM_VALIDATION_SCHEMA,
  POST_STATUSES,
};
