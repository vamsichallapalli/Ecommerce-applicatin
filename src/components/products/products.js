import AllProductDetails from "../Allproductsdetails/Allproduct";
import PrimeDeals from "../primedeals/primedeals";
import { Fragment } from "react";
import Header from "../Header/header"
import Cookies from "js-cookie";
import { Redirect } from 'react-router-dom'
function Product (){
  
  const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
          return <Redirect to="/login" />
        }
  return (
    <>
    <Header/>
    <div>
        <PrimeDeals/>
        <AllProductDetails/>
    </div>
    </>
  )
}
export default Product