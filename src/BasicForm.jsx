/** @format */

import React, { useEffect, useRef, useState } from "react";
import { Formik, useFormik } from "formik";

const Basic = () => {
  const handleChangeInside = (e) => {
    setEmail(e.target.value);
    formik.handleChange(e);
  };

  const emailField = useRef(null);
  const [email, setEmail] = useState();

  useEffect(() => {
    console.log(email);
    formik.setFieldValue("email", email);
  }, [email]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (emailField.current) {
        setEmail(emailField.current.value);
        //do the same for all autofilled fields
        clearInterval(interval);
      }
    }, 100);
  });

  const formik = useFormik({
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">Email</label>
      <input
        ref={emailField}
        id="email"
        name="email"
        type="text"
        onChange={handleChangeInside}
        value={formik.values.email}
      />
      {formik.errors.email}
      <button type="submit">Submit</button>
    </form>
  );
};
export default Basic;
