import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Login.css"
import { useState } from "react";
import axios from "axios";

function Login() {

    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        
        const url = 'http://localhost:4000/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if(res.data.token){
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId)
                        navigate('/');
                    }
                }   
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }



    return (
        <div>
            <Header />
            <div className="input-container">
                <label className="input-label">UserName</label>
                <input
                    type="text"
                    className="input-field"
                    value={username}
                    onChange={(e) => {
                        setusername(e.target.value)
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
                <button className="lgn-btn" onClick={handleApi}>
                    Login
                </button>
                <Link to="/register" className="lnk">Register</Link>
            </div>
        </div>
    )
}

export default Login;