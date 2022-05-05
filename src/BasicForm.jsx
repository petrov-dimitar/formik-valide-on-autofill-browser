/** @format */

import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";

const Basic = () => {
  ///do the same for all autofilled fields
  const handleChangeInside = (e) => {
    setEmail(emailField.current.value);
  };

  const emailField = useRef(null);

  const [email, setEmail] = useState();

  useEffect(() => {
    if (email) {
      formik.setFieldValue("email", email);
    }
  }, [email]);

  //--

  const formik = useFormik({
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        // Use this to test autofill. Deliberatly deleted @ to show you validation error when you actually auto-fill in using browser an email with @
        // !/^[A-Z0-9._%+-]+[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
