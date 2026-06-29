import React from "react";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Pane, Spinner, Toastr, Typography } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Footer from "./Footer";
import Form from "./Form";

import {
  FILTER_FORM_INITIAL_VALUES,
  STATUS_FILTER_OPTIONS,
} from "../constants";

const SearchFilters = ({ filters, isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const { data: categories = [], isLoading } = useFetchCategories();

  const appliedFilters = filters ?? FILTER_FORM_INITIAL_VALUES;

  const categoryOptions = categories.map(({ id, name }) => ({
    label: name,
    value: String(id),
  }));

  const statusOptions = STATUS_FILTER_OPTIONS.map(({ labelKey, value }) => ({
    label: t(labelKey),
    value,
  }));

  const initialValues = {
    ...appliedFilters,
    categoryIds: categoryOptions.filter(option =>
      appliedFilters.categoryIds.includes(option.value)
    ),
    status:
      statusOptions.find(option => option.value === appliedFilters.status) ??
      statusOptions[0],
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex w-full justify-center py-8">
          <Spinner />
        </div>
      );
    }

    return (
      <Form categoryOptions={categoryOptions} statusOptions={statusOptions} />
    );
  };

  return (
    <Pane
      closeButton
      closeOnEsc
      closeOnOutsideClick
      isOpen={isOpen}
      onClose={onClose}
    >
      <Pane.Header>
        <Typography
          data-cy="neeto-filters-pane-header"
          style="h3"
          weight="semibold"
        >
          {t("posts.filters.searchFilters")}
        </Typography>
      </Pane.Header>
      <NeetoUIForm
        className="w-full"
        formikProps={{
          enableReinitialize: true,
          initialValues,
          onSubmit: values => {
            onSubmit(values);
            Toastr.success(t("toast.filtersApplied"));
            onClose();
          },
        }}
      >
        <Pane.Body>{renderContent()}</Pane.Body>
        <Pane.Footer>
          <Footer onClose={onClose} onSubmit={onSubmit} />
        </Pane.Footer>
      </NeetoUIForm>
    </Pane>
  );
};

SearchFilters.propTypes = {
  filters: PropTypes.shape({
    categoryIds: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchFilters;
