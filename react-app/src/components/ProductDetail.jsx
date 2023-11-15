import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";


function ProductDetail() {

    const [product, setproduct] = useState()

    const p = useParams()

    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])


    return (
        <div>
            <Header />


            <div>
                {product && <div className="d-flex justify-content-between flex-wrap">
                    <div>
                        <img width="300px" height="400px" src={'http://localhost:4000/' + product.pimage} alt="" />
                        {product.pimage2 && <img width="300px" height="400px" src={'http://localhost:4000/' + product.pimage2} alt="" />}
                    </div>
                    <div>
                        <div>
                            <h4>{product.pname}</h4>
                        </div>
                        <h3 className="m-2 price-text">Rs. {product.price} /-</h3>
                        <p>{product.category}</p>
                        <div>{product.pdesc}</div>
                        <button>Message</button>
                    </div>

                </div>}
            </div>
        </div>
    )
}

export default ProductDetail;