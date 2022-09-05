import { Component } from "react";
import './productItemDetails.css'
import Header from "../Header/header"
import Cookies from "js-cookie";
import SpecialProduct from "../specialProductDetails/specialProductDetails";
import Loader from "react-loader-spinner";
import {Redirect,withRouter} from 'react-router-dom'
const apiStatusConstants = {
    initial:"INITIAL",
    inprogress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"
}
class ProductItem extends Component{
    state = {
        productSpecfications : {},
        cartValue:1,
        similarPro:[],
        apiStatus:apiStatusConstants.initial
    
    }
    componentDidMount(){
        this.getEachProductDetails()
    }
    getEachProductDetails = async () =>{
     const {match} = this.props
     const{params} = match
     const jwtToken = Cookies.get('jwt_token')
     this.setState({apiStatus:apiStatusConstants.inprogress})
     const apiUrl = `https://apis.ccbp.in/products/${params.id}`
     const options = {
        method:"GET",
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
     }
     const response = await fetch(apiUrl,options)
     const data = await response.json()
     if(response.ok === true){
        this.setState({productSpecfications:data,similarPro:data.similar_products,apiStatus:apiStatusConstants.success})
     }
     else if(data.status_code === 404){
       this.setState({apiStatus:apiStatusConstants.failure})
     }
    }

    //onclick function for increment of cart value
    onIncrement =() =>{
        this.setState({cartValue:this.state.cartValue+1})
    }

    //onclick function for decrement of cart value
    onDecrement =() =>{
        const{cartValue} = this.state
      if(cartValue > 1){
        this.setState({cartValue:this.state.cartValue-1})
      } 
    }

    // function for render productdetails
    renderProductDetails =  () =>{
        const{productSpecfications,cartValue,similarPro} = this.state
        console.log(similarPro)
       const{ id,image_url, title,  price, description, brand, total_reviews, 
        rating, availability} = productSpecfications
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
          return <Redirect to="/login" />
        }
       return(
         <>
        <Header/>
        <div className="container-for-specified-product">
            <img src  = {image_url} alt = {`product${title}`} className  ="specified-image"></img>
            <div>
            <h1 className="specified-product-title">{title}</h1>
            <h1 className = {1}>Rs {price}/-</h1>
            <div className = "specified-rating-container">
                <div>
                    <p className='specified-rating'>{rating}</p>
                    <img src="https://assets.ccbp.in/frontend/react-js/star-img.png" alt="star" className="star"/> 
                </div> 
                    <p>{total_reviews}Reviews</p>      
            </div>
            <p className="specified-product-description">{description}</p>
            <h3>Availabilty:<span className="span"> {availability}</span></h3>
            <h3 className="brand-title">Brand:<span className="span"> {brand}</span></h3>
            <hr/>
            <div className="increment-decrement-container">
                <div >
                    <button  onClick = {this.onIncrement} className="button-inc">+</button>
                </div>
                <p className ="button-value">{cartValue}</p>
                <div>
                    <button onClick =  {this.onDecrement} className="button-desc">-</button>
                </div>
            </div>
           <div>
           <button className="add-to-cart-button">Add To Cart</button>
           </div>
        </div>
        </div>
        <div>
            <h1 className="special-product-title">similar products</h1>
            <ul className="similar-products-unorderlist">
            <SpecialProduct similarProduct = {similarPro} key = {id}/>
            </ul>
        </div>
        
        </>
        )
    
    }
    renderLoadingView = () => (
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" className = "Loaders" />
    )
    onContinueShopping = () =>{
     
        const{history} = this.props
        history.replace('/products')
    }

    //function for failure case of http get request.
    //404 means no web resource for particular http request
    httpRequestFailure = () =>{
        
        return (
        <>
        <Header/>
        <div className="http-failure-container">
        <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png" alt = "error-view" className="error-image"></img>
        <h1 className="error-heading">Product Not Found</h1>
        <div>
            <button className="continue-shopping-button" onClick={this.onContinueShopping}>Continue Shopping</button>
        </div>
        </div>
        </>)
    }

    render(){
        const{apiStatus} = this.state
        switch (apiStatus){
            case apiStatusConstants.inprogress:
                return this.renderLoadingView()
            case apiStatusConstants.success:
                return this.renderProductDetails()
            case apiStatusConstants.failure:
                return this.httpRequestFailure()
            default:
                return null
                
        }
    }
}
export default withRouter(ProductItem)