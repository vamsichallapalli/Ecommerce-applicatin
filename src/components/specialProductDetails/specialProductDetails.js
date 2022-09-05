import './specialProductDetails.css'
function SpecialProduct (props){
   
    const {similarProduct} = props
   
    
    return(
        
     <>
     {
      similarProduct.map(currentValue=>{
        const{id,image_url,title,price,brand,rating,} = currentValue
       return (
        <li className='similar-product-list' key = {`${id}`}>
            <img src = {image_url} alt = {`special${id}`} className = "similar-image"></img>
            <h1 className='product-title'>{title}</h1>
            <p className='brand'>by {brand}</p>
            <div className='price-and-rating-container'>
                <h1 className='price'>Rs {price}</h1>
                <div className = "rating-container">
                    <p className='rating'>{rating}</p>
                    <img src="https://assets.ccbp.in/frontend/react-js/star-img.png" alt="star" className="star" />
                </div>
                
            </div>

        </li>
       )
      })
     }
     </>
    )
}
export default SpecialProduct