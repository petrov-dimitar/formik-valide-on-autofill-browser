/** @format */

import React, { useEffect, useRef, useState } from "react";
import { Formik, useFormik } from "formik";

const Basic = () => {
  const handleChangeInside = (handleChange, e, validateForm, values) => {
    setEmail(e.target.value);

    handleChange(e);
    console.log(values);
    validateForm();
    console.log("onChange Triggered");
  };

  const emailField = useRef(null);
  const [email, setEmail] = useState();

  useEffect(() => {
    console.log(email);
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
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        validateOnMount
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          validateForm,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>

              <input
                ref={emailField}
                type="email"
                name="email"
                onChange={(e) =>
                  handleChangeInside(handleChange, e, validateForm, values)
                }
                onBlur={handleBlur}
                onInput={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </div>
            <div>
              <label>password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default Basic;
