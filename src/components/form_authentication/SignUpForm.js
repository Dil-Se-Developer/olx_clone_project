import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../UI/FormInput";
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

  const loginNavigate = useNavigate();
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
    loginNavigate("/login");
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
      axios
        .get("http://localhost:3000/users")
        .then((responses) => responses.data)
        .then((usersData) => {
          let usersEmail = usersData.map((user) => user.emailid);
          return usersEmail.includes(formValues.emailid);
        })
        .then((userExist) => {
          if (userExist) {
            alert("User is already there");
          } else {
            axios
              .post("http://localhost:3000/users", formValues)
              .then((response) => response.data)
              .then((userData) => {
                loginNavigate("/login", { replace: true });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formErrors]);

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
      <form>
        <FormInput
          inputLabel="First Name:-"
          inputType="text"
          inputName="firstname"
          inputValue={formValues.firstname}
          onHandleChange={handleChange}
          errorMessage={formErrors.lastname}
        />

        <FormInput
          inputLabel="Last Name:-"
          inputType="text"
          inputName="lastname"
          inputValue={formValues.lastname}
          onHandleChange={handleChange}
          errorMessage={formErrors.lastname}
        />

        <FormInput
          inputLabel="Mobile No:-"
          inputType="number"
          inputName="mobileno"
          inputValue={formValues.mobileno}
          onHandleChange={handleChange}
          errorMessage={formErrors.mobileno}
        />

        <FormInput
          inputLabel="Email ID:-"
          inputType="email"
          inputName="emailid"
          inputValue={formValues.emailid}
          onHandleChange={handleChange}
          errorMessage={formErrors.emailid}
        />

        <FormInput
          inputLabel="City:-"
          inputType="text"
          inputName="city"
          inputValue={formValues.city}
          onHandleChange={handleChange}
          errorMessage={formErrors.city}
        />

        <FormInput
          inputLabel="Country:-"
          inputType="text"
          inputName="country"
          inputValue={formValues.country}
          onHandleChange={handleChange}
          errorMessage={formErrors.country}
        />

        <FormInput
          inputLabel="Password:-"
          inputType="password"
          inputName="password"
          inputValue={formValues.password}
          onHandleChange={handleChange}
          errorMessage={formErrors.password}
        />

        <div className="form_input">
          <button onClick={loginHandler} className="form_btn">
            Login
          </button>
          <button onClick={signupHandler} className="form_btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
