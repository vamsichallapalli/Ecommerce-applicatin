import { Component } from "react";
import './header.css'
import Cookies from "js-cookie";
import {Link,withRouter} from 'react-router-dom'
class Header extends Component{
  onLogout = () =>{
    const{history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
 }
    render(){
        return (
            
            <nav className="nav-main-container">
                <div className="ecommerce-logo-section">
                    <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="logo" className="trendz-image"></img>
                    <button onClick={this.onLogout}><img src =  "https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png" alt = "logout" className="logout-image"/></button>
                </div>
                    <ul className="nav-unorder-container-for-mobile">
                    <li className="nav-list-mobile"><Link to = '/'><img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png" alt = "home" className="home-image"/></Link></li>
                    <li className="nav-list-mobile"><Link to ="/products"><img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png" alt = "products" className="product-image"/></Link></li>
                    <li className="nav-list-mobile"><Link to = "/cart"><img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png" alt = "cart" className="cart-image"/></Link></li>
                    </ul>

                {/* desktop */}
                <div className="header-container">
                <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="logo" className="trendz-imagee"></img>
                <div className="navigation">
                <ul className="nav-unorder-container-for-desktop">
                        <li className="nav-list-desktop"> <Link to ='/' className="naviation-link">Home</Link></li>
                        <li className="nav-list-desktop"><Link to ={'/products'} className="naviation-link">Products</Link></li>
                        <li className="nav-list-desktop"><Link to = '/cart' className="naviation-link">Cart</Link></li>
                </ul>
                <div>
                <button className="logout-button" onClick={this.onLogout}>logout</button>
                </div>
                    
                </div>
                
                

                </div>
                
            </nav>
        )
    }
}
export default withRouter(Header)