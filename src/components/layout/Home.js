import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import SubHeader from "./SubHeader";
import SortProducts from "./SortProducts";
import SellProducts from "./SellProducts";
import './Home.css'

const Home = (props) => {

  const [postValues, setPostValues] = useState([])
  const [selectedCategory, setSelectedCatetgory] = useState("all")
  const [searchString, setSearchString] = useState("")
  const [sortValue,setSortValue] = useState("none")
  useEffect(() => {
    axios
      .get('http://localhost:3000/sellproducts')
      .then((responses) => setPostValues(responses.data))
      .catch((error) => {
        console.log(error)
      })
  }, [])



  const handleSearchChange = (searchProduct) => {
    setSearchString(searchProduct)
    // console.log(searchString);
  }

  const handleCategoryChange = (event) => {
    let { value } = event.target
    setSelectedCatetgory(value)
  }

  const filterProducts = () => {
    if (selectedCategory === "all") {
      return postValues
    } else {
      let filteredProducts = postValues.filter((post) => post.category === selectedCategory);
      return filteredProducts
    }
  }

  const searchProducts = (products) => {
    let searchArray = products.map((product) => {
      if (product.brand.toLowerCase().includes(searchString.toLowerCase())) {
        return product
      } else {
        return null
      }
    })
    // console.log(searchArray);
    return searchArray
  }

  // let $products = useMemo(() => {
  //   let products = filterProducts()
  //   products = searchProducts(products)
  //   return products
  // },[selectedCategory,searchString])

  const handleSoritngChange = (event) => {
    let { value } = event.target
    // console.log(value);
    setSortValue(value)
  }

  const sortData = (sortType,products) => {
    let sortedArray = []
    if(sortType === "none"){
      sortedArray = products.sort((prod1,prod2) => {
        return prod1.id - prod2.id
      })
    }else if(sortType === "lowtohigh"){
      sortedArray = products.sort((prod1,prod2) => {
        return prod1.productprice - prod2.productprice
      })
    }else if(sortType === "hightolow"){
      sortedArray = products.sort((prod1,prod2) => {
        return prod2.productprice - prod1.productprice
      })
    }
    return sortedArray
  }

  let $products = filterProducts()
  $products = sortData(sortValue,$products)
  $products = searchProducts($products)

  return (
    <div className="home_section">
      <Header searchValue={searchString} handleSearch={handleSearchChange} handleLogout = {props.handleLogout} />
      <SubHeader selectedCategory={selectedCategory} handleCategorySelect={handleCategoryChange} />
      <SortProducts handleSoritngSelect={handleSoritngChange} />
      <SellProducts postValues={$products} />
    </div>
  );
};

export default Home;

