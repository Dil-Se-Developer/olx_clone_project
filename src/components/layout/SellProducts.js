import React from 'react'
import SellCard from './SellCard'
import './SellProducts.css'

const SellProducts = (props) => {
    // console.log(props.postValues);
    return (
        <div className='sellproducts'>
            {props.postValues.map((postValue) => postValue ? <SellCard postValue={postValue} key={postValue.id} /> : null)}
        </div>
    )
}


export default SellProducts