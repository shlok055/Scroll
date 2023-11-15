import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import './Home.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./Categories";
import { AiOutlineHeart } from 'react-icons/ai';

function LikedProducts() {


    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');


    useEffect(() => {
        const url = 'http://localhost:4000/liked-products';
        let data = { userId: localStorage.getItem('userId')}
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])

    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleclick = () => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
           if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const url = 'http://localhost:4000/like-product';
        const data = { userId, productId}
        axios.post(url, data)
            .then((res) => {
               if(res.data.message) {
                alert('Liked')
               }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }


    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleclick={handleclick} />
            <Categories handleCategory={handleCategory}/>
            <h5> Search Results </h5>
            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {

                        return (
                            <div key={item._id} className="card m-3">
                                {!!localStorage.getItem('token') &&  <div onClick={()=> handleLike(item._id)} className="icon-con">
                                    <AiOutlineHeart className="icons"/>
                                </div>}
                                <img width="300px" height="200px" src={'http://localhost:4000/' + item.pimage} />
                                <p className="m-1"> {item.pname} | {item.category} </p>
                                <p className=" m-1 text-success"> {item.pdesc} </p>
                                <h3 className=" m-1 text-primary"> {item.price} </h3>

                            </div>
                        )

                    })}
            </div>
            

            <h5> All Results </h5>

            <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                            <div key={item._id} className="card m-3">
                               {!!localStorage.getItem('token') &&  <div onClick={()=> handleLike(item._id)} className="icon-con">
                                    <AiOutlineHeart className="icons"/>
                                </div>}
                                <img width="300px" height="300px" src={'http://localhost:4000/' + item.pimage} />
                                <p className="m-1"> {item.pname} | {item.category} </p>
                                <p className=" m-1 text-success"> {item.pdesc} </p>
                                <h3 className=" m-1 text-primary"> {item.price} </h3>

                            </div>
                        )

                    })}
            </div>

            



        </div>
    )
}

export default LikedProducts;