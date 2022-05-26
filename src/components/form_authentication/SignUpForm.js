import React, { useState, useEffect } from "react";
import "./SignUpForm.css";

const SignUpForm = (props) => {
  const intialValues = {
    firstname: "",
    lastname: "",
    mobileno: "",
    emailid: "",
    city: "",
    country: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    console.log('hii');
    
  };

  const signupHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };


  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors,isSubmit,formValues]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "Firstname is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    }
    if (!values.mobileno) {
      errors.mobileno = "Mobileno is required!";
    } else if (values.mobileno.length !== 10) {
      errors.mobileno = "Mobileno cannot exceed more than 10 characters";
    }
    if (!values.emailid) {
      errors.emailid = "Emailid is required!";
    } else if (!regex.test(values.emailid)) {
      errors.emailid = "This is not a valid email format!";
    }
    if (!values.city) {
      errors.city = "City is required!";
    }
    if (!values.country) {
      errors.country = "Country is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="form_card">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div>Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form>
        <div className="form_input">
          <label htmlFor="firstname">First Name:-</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={formValues.firstname}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.firstname}</p>
        <div className="form_input">
          <label htmlFor="lastname">Last Name:-</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={formValues.lastname}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.lastname}</p>
        <div className="form_input">
          <label htmlFor="mobileno">Mobile No:-</label>
          <input
            type="number"
            name="mobileno"
            id="mobileno"
            value={formValues.mobileno}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.mobileno}</p>
        <div className="form_input">
          <label htmlFor="emailid">Email ID:-</label>
          <input
            type="email"
            name="emailid"
            id="emailid"
            value={formValues.emailid}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.emailid}</p>
        <div className="form_input">
          <label htmlFor="city">City:-</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formValues.city}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.city}</p>
        <div className="form_input">
          <label htmlFor="country">Country:-</label>
          <input
            type="text"
            name="country"
            id="country"
            value={formValues.country}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.country}</p>
        <div className="form_input">
          <label htmlFor="password">Password:-</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.password}</p>
        <div className="form_input">
          <button onClick={loginHandler} className="form_btn" type="submit">
            Login
          </button>
          <button onClick={signupHandler} className="form_btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
