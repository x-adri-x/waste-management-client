import React from 'react'

const Navbar = () => {
    return(
        <nav className = 'navigation'>
            <ul>
                <li><a href = '/home'>Home</a></li>
                <li><a href = '/drivers'>Drivers</a></li>
                <li><a href = '/catalog'>Catalog</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
