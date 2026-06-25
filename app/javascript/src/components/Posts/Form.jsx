import React from "react";

import { Input, Textarea } from "neetoui/formik";
import PropTypes from "prop-types";

const Form = ({ children }) => (
  <div className="neeto-ui-shadow-s neeto-ui-rounded-lg flex min-h-[calc(100vh-12rem)] flex-col justify-between border border-gray-200 bg-white p-6">
    <div className="flex flex-col gap-y-4">
      <Input required label="Title" name="title" placeholder="Enter title" />
      <Textarea
        required
        label="Description*"
        name="description"
        placeholder="Enter description"
        rows={4}
      />
    </div>
    {children}
  </div>
);

Form.propTypes = {
  children: PropTypes.node,
};

export default Form;
