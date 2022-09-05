
import './App.css';
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import Login from './components/login/login';
import Home from './components/HOME/home';
import Product from './components/products/products';
import ProductItem from './components/productIteamDetails/productItemDetails';
import NotFound from './components/NOT-FOUND/notfound';




const  App = () => (
  
<BrowserRouter>
<Switch>
  <Route exact path = "/login" component={Login}/>
  <Route exact path= "/" component={Home}/> 
  <Route exact path= "/products" component={Product}/>
  <Route exact path = '/products/:id' component={ProductItem}/>
  <Route path = "/not-found" component = {NotFound}/>
  <Redirect to= "/not-found"/>
  </Switch>
</BrowserRouter> 
)

export default App;
