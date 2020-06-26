import React from 'react'
import { AuthContext } from '../Context/AuthContext';
import { themeContext } from '../Context/ThemeContext';

import ProductNavbar from '../NavBar/ProductNavbar';

import "./Products.css";

function Products() {
    const { user } = React.useContext( AuthContext );
    const { theme } = React.useContext( themeContext );
    // user._id
    //theme = dark.black
    //theme2 = light, undefined


    return (
        <div>
            <ProductNavbar/>
            <div className="products_wrapper">
                <aside>
                    adfjgkbadfjkgbadfgjakdfgbnadf<br/>
                    adfgajdfkgbadfgkjvbadfv<br/>
                    adfvbjhabdfvjkadfvbadfngv
                </aside>
                <main>
                    dasfjkgnasdf<br/>kjglbandfgjkladfg
                </main>
            </div>
        </div>
    )
}

export default Products
