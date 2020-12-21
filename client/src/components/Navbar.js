import React from "react";
import { Link } from 'react-router-dom';

function  Navabar() {
    return (
        <div>
            <div>
                <Link to="/" className="Nav-brand">UserAuth Demo</Link>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/login" className="nav-link">Log In</Link>
                    </li>
                    <li>
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navabar