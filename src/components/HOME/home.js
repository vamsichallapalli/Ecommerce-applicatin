import {Component} from 'react'
import Header from '../Header/header'
import {Fragment} from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import './home.css'
class Home extends Component {
    render(){
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
          return <Redirect to="/login" />
        }
        return(
            <>
                <Header/>
                <div className='home-container'>
                    <div className='sub-container'>
                    <h1 className='clothes-noticed-heading'>Clothes That you get noticed</h1>
                    <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png" alt = "clothes that you noticed" className='clothes-noticed-images'></img>
                    <p className="home-description">
                    Fashion is part of the daily air and it does not quite help that it
                    changes all the time. Clothes have always been a marker of the era and
                    we are in a revolution. Your fashion makes you been seen and heard
                    that way you are. So, celebrate the seasons new and exciting fashion
                    in your own way.
                   </p>
                  <button type="button" className="shop-now-button">
                      Shop Now
                  </button>
                  </div>
                  <div>
                  <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png" alt = "clothes that you noticed" className='clothes-noticed-images-desktop'></img>
                  </div>
                </div>

            </>
        )
    }
}
export default Home