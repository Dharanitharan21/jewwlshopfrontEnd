import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logout from '../Icons/logout.png'
import '../Styles/navbar.css'

function MyNavbar() {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName.toUpperCase());
    }
  }, []);

  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (event) => {
    console.log("Logout button clicked");
    event.stopPropagation();
    localStorage.clear();
    navigate('/login');
  };

  const menubar = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div>
      <nav className='navbar'>
        <div className='nav-logo'>
          Jewellaryshop
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
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ cursor: 'pointer' }}
              >
                {name}
              </h1>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    <img className='logout' src={logout} alt="logout-icon" />
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

          <div className="hamburger" onClick={menubar}>
            ☰
          </div>
        </div>
      </nav>
    </div>
  )
}

export default MyNavbar;
