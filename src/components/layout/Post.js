import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../UI/FormInput";
import "./Post.css";

const Post = (props) => {
  const intialValues = {
    category: "cars",
    brand: "",
    modelname: "",
    description: "",
    productprice: "",
    postimg: ""
  };

  const Navigate = useNavigate();

  const [formValues, setFormValues] = useState(intialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [baseImage, setBaseImage] = useState("");


  const [errorObj, setErrorObj] = useState({
    category: false,
    brand: false,
    modelname: false,
    description: false,
    productprice: false,
    postimg: false
  })

  const postHandler = (event) => {
    event.preventDefault();
    // setFormErrors(validate(formValues));
    validate(formValues)
    if (!Object.values(formValues).includes("")) {
      axios
        .post("http://localhost:3000/sellproducts", formValues)
        .then((response) => response.data)
        .then((postData) => {
          console.log(postData);
          Navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(formValues);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const validate = (values) => {
    Object.keys(values).forEach((key) => {
      setErrorObj((prevState) => {
        return { ...prevState, [key]: values[key] === "" }
      })
    })
  };


  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    // setBaseImage((prevState) => base64);
    setFormValues((prevState) => { return { ...prevState, "postimg": base64 } })
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <div className="post_header">
        <svg
          width="48px"
          height="48px"
          viewBox="0 0 1024 1024"
          data-aut-id="icon"
          fillRule="evenodd"
        >
          <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
        </svg>
      </div>

      <div className="form_card">
        <h1>Post Your AD</h1>
        <form>
          <div className="form_input">
            <label htmlFor="category">Choose A Category:- </label>
            <select name="category" value={formValues.category} id="category" onChange={handleChange}>
              <option value="cars" >Cars</option>
              <option value="motorcycles">Motorcycles</option>
              <option value="mobilephones">Mobile Phones</option>
              <option value="scooters">Scooters</option>
              <option value="commercial&othervehicles">Commercial & Other Vehicles</option>
            </select>
          </div>
          <FormInput
            inputLabel="Brand :- "
            inputType="text"
            inputName="brand"
            inputValue={formValues.brand}
            onHandleChange={handleChange}
            errorMessage={errorObj.brand ? "Brand feild is required" : ""}
            customClass={"form_input"}
          />
          <FormInput
            inputLabel="Model Name:- "
            inputType="text"
            inputName="modelname"
            inputValue={formValues.modelname}
            onHandleChange={handleChange}
            // errorMessage={formErrors.modelname}
            errorMessage={errorObj.modelname ? "Model Name feild is required" : ""}
            customClass={"form_input"}
          />

          <div className="form_input">
            <label htmlFor="description">Description:-</label>
            <textarea
              value={formValues.description}
              onChange={handleChange}
              name="description"
              id="description"
              rows="4"
              cols="21"
              placeholder="Enter some details..."
            />
            {errorObj.description && <p>Description is required</p>}
          </div>

          <FormInput
            inputLabel="Set A Price:- "
            inputType="number"
            inputName="productprice"
            inputValue={formValues.productprice}
            onHandleChange={handleChange}
            // errorMessage={formErrors.productprice}
            errorMessage={errorObj.productprice ? "Price feild is required" : ""}
            customClass={"form_input"}
          />

          <div className="form_input">
            <label htmlFor="postimg">Choose a Image:</label>

            <input type="file"
              id="postimg" name="postimg"
              accept="image/png, image/jpeg" onChange={(event) => {
                uploadImage(event);
              }} />

            <br></br>
            {errorObj.postimg && <p>Image is required</p>}

            <img src={formValues.postimg} height="200px" alt="" />
          </div>

          <div className="form_input">
            <button className="form_btn" onClick={postHandler}>
              POST
            </button>
          </div>
        </form>
      </div>
    </>
  )
};

export default Post;
