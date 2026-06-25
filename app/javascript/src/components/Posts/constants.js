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

const getPostFormValidationSchema = t =>
  Yup.object({
    title: Yup.string()
      .required(t("posts.validation.titleRequired"))
      .max(125, t("posts.validation.titleMax")),
    description: Yup.string()
      .required(t("posts.validation.descriptionRequired"))
      .max(
        MAX_DESCRIPTION_LENGTH,
        t("posts.validation.descriptionMax", { max: MAX_DESCRIPTION_LENGTH })
      ),
    categoryIds: Yup.array()
      .of(
        Yup.object({
          label: Yup.string().required(),
          value: Yup.mixed().required(),
        })
      )
      .min(1, t("posts.validation.categoryRequired")),
  });

export {
  getPostFormValidationSchema,
  MAX_DESCRIPTION_LENGTH,
  POST_FORM_INITIAL_VALUES,
  POST_STATUSES,
};
