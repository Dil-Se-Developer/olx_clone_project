import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GeneralHeader from "../UI/GeneralHeader";
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
          // console.log(postData);
          Navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // console.log(formValues);
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
      <GeneralHeader />
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
