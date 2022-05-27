import axios from "axios";
import React, { useEffect, useState } from "react";
import FormInput from '../UI/FormInput'
import './LoginForm.css';

const LoginForm = (props) => {
    const intialValues = {
        emailid: "",
        password: "",
    };
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
        if (Object.keys(formErrors).length === 0 && isSubmit) {

        }
    }, [formErrors, isSubmit, formValues]);
    
    return (
        <div className="form_card">
            <form>
                <FormInput
                    inputLabel="Email ID:-"
                    inputType="email"
                    inputName="emailid"
                    inputValue={formValues.emailid}
                    errorMessage={formErrors.emailid}
                    onHandleChange={handleChange}

                />
                <FormInput
                    inputLabel="Password:-"
                    inputType="password"
                    inputName="password"
                    inputValue={formValues.password}
                    errorMessage={formErrors.password}
                    onHandleChange={handleChange}

                />
                <div className="form_input login_btn">
                    <button className="form_btn" onClick={loginHandler}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm