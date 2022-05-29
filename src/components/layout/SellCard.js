import React from 'react'
import { useNavigate } from 'react-router-dom'

// import scooter from '../assets/scooter_img_1.webp'
import './SellCard.css'

const SellCard = (props) => {

  const Navigate = useNavigate()
  const handleClick = (id) => {
    Navigate("/home/product/"+id)
  }
  return (
    <div className='sellcard' onClick={() => { handleClick(props.postValue.id) }}>
      <img src={props.postValue.postimg} alt="" />
      <h3> &#x20B9; {props.postValue.productprice}</h3>
      <p>{props.postValue.brand}</p>
      <span>{props.postValue.modelname}</span>
    </div>
  )
}

export default SellCard