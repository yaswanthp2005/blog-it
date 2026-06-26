import { t } from "i18next";
import * as Yup from "yup";

const POST_STATUSES = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

const MAX_DESCRIPTION_LENGTH = 1000;
const TITLE_MAX_LENGTH = 50;
const DEFAULT_PAGE_SIZE = 10;

const POST_FORM_INITIAL_VALUES = {
  categoryIds: [],
  title: "",
  description: "",
};

const POST_FORM_VALIDATION_SCHEMA = Yup.object({
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

const PRIMARY_ACTION_LABEL_KEYS = {
  [POST_STATUSES.DRAFT]: "posts.saveAsDraft",
  [POST_STATUSES.PUBLISHED]: "posts.publish",
};

export {
  DEFAULT_PAGE_SIZE,
  MAX_DESCRIPTION_LENGTH,
  POST_FORM_INITIAL_VALUES,
  POST_FORM_VALIDATION_SCHEMA,
  POST_STATUSES,
  PRIMARY_ACTION_LABEL_KEYS,
  TITLE_MAX_LENGTH,
};
