import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import GeneralHeader from '../UI/GeneralHeader'
import './SellCardsDetails.css'

const SellCardsDetails = () => {
    const [productData, setProductData] = useState([])
    const param = useParams()
    let id = param.id

    useEffect(() => {
        axios.get("http://localhost:3000/sellproducts/"+id)
            .then((res) => setProductData(res.data))
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            <GeneralHeader />
            <div className='cards_details_section'>
                <div className='cards_description'>
                    <div className='card_description_img'>
                        <img src={productData.postimg} alt="" />
                    </div>
                    <div className='card_brand_details'>
                        <h3>Details</h3>
                        <span>Brand</span>
                        <span>{productData.brand}</span>
                        <span>Model</span>
                        <span>{productData.modelname}</span>
                        <hr></hr>
                        <h3>Description</h3>
                        <p>{productData.description}</p>
                    </div>
                </div>
                <div className='seller_details_section'>
                    <div className='card_price_details'>
                        <h2>&#x20B9; {productData.productprice}</h2>
                        <span>{`${productData.brand} ${productData.modelname}`} for sale</span>
                    </div>
                    <div className='selling_details'>
                        <h3>Seller Description</h3>
                        <a href={'https://wa.me/' + 112233} target="_blank" >Contact to seller</a>
                    </div>
                </div>
            
            </div>
        </>
    )
}

export default SellCardsDetails