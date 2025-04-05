import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logout from '../Icons/logout.png';
import '../Styles/navbar.css';

function MyNavbar() {
  const [name, setName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName.toUpperCase());
    }
  }, []);


  const handleLogout = (event) => {
    console.log("Logout button clicked");
    event.stopPropagation(); // Prevent dropdown interference
    localStorage.clear();
    
    navigate('/login'); // Redirect to the login page
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const menubar=()=>{
    setDropdownOpen(false)
    setMenuOpen(!menuOpen)
    
  }
  
  return (
    <div>
      <nav className='navbar'>
        <div className='nav-logo'>
          jewellaryshop
        </div>
      
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul className={`nav_link ${menuOpen ? "open" : ""}`}>
          <li><Link className="scroll-link" to="/">Home</Link></li>
          <li><Link className="scroll-link" to="/buypage">Shop</Link></li>
          <li><Link className="scroll-link" to="/sellpage">Sell</Link></li>
        
        </ul>
        {name ? (
          <div className="nav-username">
            <h1
              className="navhead"
              onClick={() => {
                console.log("Dropdown clicked");
                setDropdownOpen(!dropdownOpen);}}
              style={{ cursor: 'pointer' }}
            >
             {name}
            </h1>
            {dropdownOpen && (
              <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                <button className="dropdown-item" onClick={handleLogout}><img className='logout' alt="Logout icon" src={logout} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={`nav_btns ${menuOpen ? "open" : ""}`}>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            
            <Link to="/signup">
              <button className="login-btn">Sign Up</button>
            </Link>
            
          </div>
        )}
        
        </div>
        <div className="hamburger" onClick={menubar}>
        ☰
      </div>
      </nav>
    </div>
  );
}
export default MyNavbar;
