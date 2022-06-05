import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();
    const handleLogOut=()=>{
        localStorage.removeItem("Token");
        navigate("/login");
    }


    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location])
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">iNoteBook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
                        <Link className="nav-link" to="/about">About</Link>
                    </li>

                </ul>
                {!localStorage.getItem("Token")?
                <form className="d-flex">
                    <Link className="btn btn-primary" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/sign-up" role="button">SignUp</Link>
                </form>:
                <button className='btn btn-primary' onClick={handleLogOut}>Log Out</button>
                }
            </div>
        </nav>
    )
}

export default Navbar
