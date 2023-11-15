import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Login.css"
import { useState } from "react";
import axios from "axios";

function Signup({ url, data }) {

    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');


    const handleApi = () => {
        const url = 'http://localhost:4000/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                     navigate('/login')
                }   
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }


    return (
        <div>
            <Header />
            <div className="input-container p-3 m-3">
                <label className="input-label">UserName</label>
                <input
                    type="text"
                    className="input-field"
                    value={username}
                    onChange={(e) => {
                        setusername(e.target.value)
                    }} 
                />
                <label className="input-label">Email</label>
                <input
                    type="text"
                    className="input-field"
                    value={email}
                    onChange={(e) => {
                        setemail(e.target.value)
                    }}
                />
                <label className="input-label">Mobile No.</label>
                <input
                    type="text"
                    className="input-field"
                    value={mobile}
                    onChange={(e) => {
                        setmobile(e.target.value)
                    }}
                />
                <label className="input-label">Password</label>
                <input
                    type="text"
                    className="input-field"
                    value={password}
                    onChange={(e) => {
                        setpassword(e.target.value)
                    }}
                />
                <button className="lgn-btn" 
                        onClick={handleApi}>
                    Sign-Up
                </button>
                <Link to="/login" className="lnk">Login</Link>
            </div>
        </div>
    )
}

export default Signup;