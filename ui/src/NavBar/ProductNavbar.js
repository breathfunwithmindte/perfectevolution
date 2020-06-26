import React from 'react'
import { RiBook2Line } from 'react-icons/ri';
import { FiHelpCircle } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io'
import { AiFillMessage } from 'react-icons/ai'
import { AiFillHome } from 'react-icons/ai'

function ProductNavbar() {
    return (
        <nav className="productPage">
            <a href="/" id="logo">
                <RiBook2Line style={{fontSize:"250%"}}/>
                <h1>Books</h1>
            </a>
            <ul>
                <li><a><FiHelpCircle/></a></li>
                <li><a><FaUserAlt/></a></li>
                <li><a><IoMdNotifications/></a></li>
                <li><a><AiFillMessage/></a></li>
                <li><a><AiFillHome/></a></li>
            </ul>
        </nav>
    )
}

export default ProductNavbar
