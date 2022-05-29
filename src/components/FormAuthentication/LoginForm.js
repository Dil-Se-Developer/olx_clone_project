import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../UI/FormInput";
import GeneralHeader from '../UI/GeneralHeader';
import "./LoginForm.css";

const LoginForm = (props) => {
  const intialValues = {
    emailid: "",
    password: "",
  };
  const Navigate = useNavigate();
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const loginHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.emailid) {
      errors.emailid = "Emailid is required!";
    } else if (!regex.test(values.emailid)) {
      errors.emailid = "This is not a valid email format!";
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

  useEffect(() => {
    // function disableBack() { window.history.forward() }
    // setTimeout(disableBack(), 0)
    //   window.onunload = function () { return null }
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .get("http://localhost:3000/users")
        .then((responses) => responses.data)
        .then((usersData) => {
          let usersEmail = usersData.map((user) => user.emailid);
          let usersPassword = usersData.map((user) => user.password);
          console.log(usersData);
          console.log(usersEmail);
          console.log(usersPassword);
          return (
            usersEmail.includes(formValues.emailid) &&
            usersPassword.includes(formValues.password)
          );
        })
        .then((userExist) => {
          if (userExist) {
            props.handleLogin()
            Navigate("/home");
          } else {
            alert("Kindly Check emailid and password");
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [formErrors]);

  return (
    <>
      <GeneralHeader />
      <div className="form_card">
        <form>
          <FormInput
            inputLabel="Email ID:-"
            inputType="email"
            inputName="emailid"
            inputValue={formValues.emailid}
            errorMessage={formErrors.emailid}
            onHandleChange={handleChange}
            customClass={"form_input"}
          />
          <FormInput
            inputLabel="Password:-"
            inputType="password"
            inputName="password"
            inputValue={formValues.password}
            errorMessage={formErrors.password}
            onHandleChange={handleChange}
            customClass={"form_input"}
          />
          <Link to="signup">Create an account</Link>
          <div className="form_input login_btn">
            <button className="form_btn" onClick={loginHandler}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
