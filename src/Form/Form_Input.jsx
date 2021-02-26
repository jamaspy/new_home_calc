import React from "react";

const Form_Input = ({ field, label, type, formik }) => {
  return (
    <div className="">
      <label htmlFor={field}>{label}</label>
      <input
        className="border rounded-lg my-2 mx-2"
        id={field}
        name={field}
        type={type}
        onChange={formik.handleChange}
        value={formik.values.field}
      />
    </div>
  );
};

export default Form_Input;
