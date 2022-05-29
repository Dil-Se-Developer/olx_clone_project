// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// function Test() {
//     const [productData, setProductData] = useState([])
//     const param = useParams()
//     let id = param.id

//     useEffect(() => {
//         axios.get("http://localhost:3000/sellproducts/" + id)
//             .then((res) => setProductData(res.data))
//             .catch((error) => {
//                 console.log(error);
//             });
//     }, [])

//     return (
//         <div>{productData && productData.brand}
//             <a href={'https://wa.me/' + 112233} target="_blank" >Contact Me</a>
//         </div>
//     )
// }

// export default Test