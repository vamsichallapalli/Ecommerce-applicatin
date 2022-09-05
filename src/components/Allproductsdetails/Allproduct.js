import Cookies from "js-cookie";
import { Component } from "react";
import Loader from "react-loader-spinner";
import ProductCart from "../productCart/productcart";
import ProductHeader from "../productsHeader/productHeader";
import FilteredGroup from "../filtergroup/filtergroup"; 
import './Allproduct.css'

const sortByOptions = [
    {
        optionId: 'PRICE_HIGH',
        displayText: 'Price (High-Low)',
      },
      {
        optionId: 'PRICE_LOW',
        displayText: 'Price (Low-High)',
      },

]

const Category = [
  {
    categoryId:"1",
    name:"Clothing"
  },
  {
    categoryId:"2",
    name:"Electronics"
  },
  {
    categoryId:"3",
    name:"Appliances"
  },
  {
    categoryId:"4",
    name:"Grocery"
  },
  {
    categoryId:"5",
    name:"Toys"
  }
]
const ratingOption = [
  {
    ratingId:"4",
    imageUrl:"https://res.cloudinary.com/dlzcgycpi/image/upload/v1660838217/991985_gverlj.png"
  },
  {
    ratingId:"3",
    imageUrl:"https://res.cloudinary.com/dlzcgycpi/image/upload/v1660840004/3star_yj3wbb.png"
  },
  {
      ratingId:"2",
      imageUrl:"https://res.cloudinary.com/dlzcgycpi/image/upload/v1660840179/2_star_udj47r.png"
  }
      
]
const apistatusConstants = {
  initial:"INITIAL",
  success : "SUCCESS",
  failure : 'FAILURE',
  inProgress : 'IN_PROGRESS'
}
class AllProductDetails extends Component{
    state = {
        productDetails: [],
        isLoader: true,
        activeOption:sortByOptions[1].optionId,
        title_search:"",
        category:"",
        rating:"",
        apistatus:apistatusConstants.initial,
        responseStatus:""
    }
    componentDidMount(){
      this.getProducts()
    }
    getProducts = async() => {
      this.setState({apistatus:apistatusConstants.inProgress})
        const jwtToken = Cookies.get('jwt_token')
        const{activeOption,title_search,category,rating} = this.state
        const apiUrl =`https://apis.ccbp.in/products?sort_by=${activeOption}&title_search=${title_search}&category=${category}&rating=${rating}`;
        const options = {
            method:"GET",
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }
        const response = await fetch(apiUrl,options)
        this.setState({responseStatus:response.status})
      
        const data = await response.json()
       
        const updatedData = data.products.map((product) =>{
            
            return {
                title: product.title,
                brand: product.brand,
                price: product.price,
                id: product.id,
                imageUrl: product.image_url,
                rating: product.rating,
            }
        })
        this.setState({productDetails:updatedData,isLoader:false})
      
     
       
    }

    //function for Active option
    OnOptionUpdation = (parameter)  =>{
     this.setState({activeOption:parameter},this.getProducts)

    }
    // Function for the updating the state value of user search title
    onTitleSearchUpdation = (parameter) =>{
   
      this.setState({title_search:parameter},this.getProducts)
    }
    // function for the updating the state value of Category
    onCategoryUpdation =(parameter) =>{
      
      this.setState({category:parameter},this.getProducts)
    }

    //function for the updating the state value of rating
    onRatingUpdation = (parameter) =>{
      this.setState({rating:parameter},this.getProducts)
    }
    // function for the clear filter

    onClearFilter=(parameter) =>{
      this.setState({title_search : parameter, category:parameter, rating:parameter},this.getProducts)
    }
    renderProductList = () => {
        const{productDetails,activeOption,title_search,responseStatus} = this.state;
        return(
            <div className = "all-products-container">
               <ProductHeader sortByOptionslist = {sortByOptions} activeOptionid = {activeOption} OnOptionUpdation = {this.OnOptionUpdation} titleSearch = {title_search}  onTitleUpdationfun = { this.onTitleSearchUpdation}/>
               <div className="filter-and-allproducts-container">
                <FilteredGroup Category = {Category} onCategoryUpdation = {this.onCategoryUpdation} ratingOption = {ratingOption} onRatingUpdation={this.onRatingUpdation}  onClearFilter = {this.onClearFilter}/>
               <ul className="unordered-product-list">
                  {productDetails.map(currentItem =>{
                 return <ProductCart product = {currentItem} key = {currentItem.id}/>
                  })}
                </ul>
                {productDetails.length === 0 && this.noProducts()}
                {responseStatus=== 401 && this.failureView()}
                
               </div>
               
              
            </div>
            )
    }
    renderLoader = () => {
      return (
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" className = "Loader"/>
      )
    }

    noProducts = () =>{
      
     return (
       <div className="no-products-image-container">
      <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt = "no-products" className="no-products-image"></img>
      <h4>No Products Found</h4>
      <p>we could not find any products. Try other filters</p>
      </div>
      )
    }
    failureView = () =>{
      return <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png" alt = "error"></img>
    }
    render(){
        const {isLoader} = this.state
        return isLoader?this.renderLoader():this.renderProductList()
    }
}
export default AllProductDetails