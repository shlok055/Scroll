import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { BiSearchAlt } from 'react-icons/bi';
import { useState } from 'react';


function Header(props) {


  const [showOver, setshowOver] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  return (
    <div className='header-container d-flex justify-content-between'>

      <div className="header">

        <Link to="/" className='links'>Scroll</Link>


        <input className='search'
          placeholder='Search'
          type='text'
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
        />
        <button onClick={() => props.handleclick && props.handleclick()} className='search-btn'>
          <BiSearchAlt />
        </button>
      </div>
      <div>
        {!!localStorage.getItem('token') &&
          <Link to="/add-product">
            <button className="sell-btn"> Sell </button>
          </Link>}
          {!localStorage.getItem('token') &&<Link to="/login"><button className="logout-btn">Login</button></Link>}

{!!localStorage.getItem('token') && <div>
<div onClick={() => {
          setshowOver(!showOver)
        }}
          className='profile'> P </div>

        <div>
          {showOver && <div className='drop'>

            <div>
              <Link to="/liked-products" className='link'>Wishlist</Link>
            </div>
            <div>
              <Link to="/my-products" className='link'>My Ads</Link>
            </div>
            <div> 

                <button onClick={handleLogout} className='link'> LogOut</button>

            </div>

          </div>}
</div>

        </div>}
      </div>
    </div>

  )
}

export default Header;