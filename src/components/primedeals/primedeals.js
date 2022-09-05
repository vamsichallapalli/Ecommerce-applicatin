import { Component } from "react";
import Cookies from "js-cookie";
import ProductCart from "../productCart/productcart";
import Loader from "react-loader-spinner";
import './primedeals.css'

const apistatusConstants = {
    initial:"INITIAL",
    success : "SUCCESS",
    failure : 'FAILURE',
    inProgress : 'IN_PROGRESS'
}
class PrimeDeals extends Component{
  state = {
    PrimeDeals : [],
    apistatus : apistatusConstants.initial
  }
  componentDidMount(){
    this.getPrimeDeals()
  }


  getPrimeDeals = async() => {
    this.setState({apistatus:apistatusConstants.inProgress})
   const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/prime-deals'
    const options = {
        method:"GET",
        headers:{
            Authorization:`Bearer ${jwtToken}`
        }
    }
    const response = await fetch(apiUrl,options)
    if(response.ok === true){
       const data = await response.json()
       const updatedDeals = data.prime_deals.map(product =>{
        return {
            title: product.title,
            brand: product.brand,
            price: product.price,
            id: product.id,
            imageUrl: product.image_url,
            rating: product.rating,
        }
       })
       this.setState({PrimeDeals:updatedDeals,apistatus:apistatusConstants.success})
    }
    else if(response.status === 401) {
     this.setState({apistatus:apistatusConstants.failure})
    }
  }
  renderPrimeDealList = () =>{
    const{PrimeDeals} = this.state;
        return(
            <div className = "all-products-container">
                <h1 className = "all-products-heading">Prime Deals</h1>
                <ul className="unordered-productdeals-list">
                  {PrimeDeals.map(currentItem =>{
                 return <ProductCart product = {currentItem} key = {currentItem.id}/>
                  })}
                </ul>
              
            </div>
            )
  }
    renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />

  )
  renderLoadingView = () => (
   
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" className = "Loader" />

  )


    render () {
        const {apistatus} = this.state
     switch(apistatus){
        case apistatusConstants.success:
            return this.renderPrimeDealList()
        case apistatusConstants.failure:
            return this.renderPrimeDealsFailureView()
        case apistatusConstants.inProgress:
            return this.renderLoadingView()
        default:
            return null
     }
    }
}
export default PrimeDeals