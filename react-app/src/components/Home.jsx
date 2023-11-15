import { useNavigate } from "react-router-dom";
import Header from "./Header";
import './Home.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./Categories";
import { AiOutlineHeart } from 'react-icons/ai';

function Home() {

    const navigate = useNavigate()
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);

    useEffect(() => {
        const url = 'http://localhost:4000/get-products';
        axios.get(url)
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
        //API Call
        const url = 'http://localhost:4000/search?search=' + search;
        axios.get(url)
            .then((res) => {
                setcproducts(res.data.products);
                setissearch(true);
            })
            .catch((err) => {
                alert('Server Err.')
            })


        //Local Call
        //let userId = localStorage.getItem('userId');
        // let filteredProducts = products.filter((item) => {
        //     if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
        //         item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        //         item.category.toLowerCase().includes(search.toLowerCase())) {
        //         return item;
        //     }
        // })
        // setcproducts(filteredProducts)
    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId, e) => {

        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        const url = 'http://localhost:4000/like-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked')
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }

    const handleProduct = (id) => {
        navigate('/product/' + id)
    }


    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleclick={handleclick} />
            <Categories handleCategory={handleCategory} />
            {issearch && cproducts && 
            <h5> Search Results 
                <button onClick={() => setissearch(false)} className="clear-btn"> Clear </button>
                </h5>}
            {issearch && cproducts && cproducts.length == 0 && <h5> No Results Found</h5>}
            {issearch && <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {

                        return (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                {!!localStorage.getItem('token') && <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                                    <AiOutlineHeart className="icons" />
                                </div>}
                                <img width="300px" height="200px" src={'http://localhost:4000/' + item.pimage} />
                                <p className="m-1"> {item.pname} | {item.category} </p>
                                <p className=" m-1 text-success"> {item.pdesc} </p>
                                <h3 className=" m-1 price-text"> {item.price} </h3>

                            </div>
                        )

                    })}
            </div>}


            { !issearch && <h5> All Results </h5>}

            { !issearch && <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                {!!localStorage.getItem('token') && <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                                    <AiOutlineHeart className="icons" />
                                </div>}
                                <img width="300px" height="300px" src={'http://localhost:4000/' + item.pimage} />
                                <h3 className=" m-1 price-text">Rs. {item.price} /- </h3>
                                <p className="m-1"> {item.pname} | {item.category} </p>
                                <p className=" m-1 text-success"> {item.pdesc} </p>


                            </div>
                        )

                    })}
            </div>}





        </div>
    )
}

export default Home;