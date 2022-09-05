import './productcart.css'
import {Link} from 'react-router-dom'
function ProductCart (props){
    const {title,brand,price,imageUrl,rating,id} = props.product
  
    return (
        <Link to={`/products/${id}`} className = "Link">
        <li className="product-list">
            <img src = {imageUrl} alt = {title} className = "image-product"/>
            <h1 className='product-title'>{title}</h1>
            <p className='brand'>by {brand}</p>
            <div className='price-and-rating-container'>
                <p className='price'>Rs {price}</p>
                <div className = "rating-container">
                    <p className='rating'>{rating}</p>
                    <img src="https://assets.ccbp.in/frontend/react-js/star-img.png" alt="star" className="star" />
                </div>
            </div>
        </li>
        </Link>
    )
    
}
export default ProductCart