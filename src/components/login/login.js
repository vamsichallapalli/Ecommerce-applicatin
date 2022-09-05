import { Component } from "react";
import Cookies from "js-cookie";
import './login.css'
class Login extends Component{
    state = {
        username: '',
        password: '',
        errorMsg:""
      }
      onSubmitSuccess = (jwtToken) => {
      Cookies.set("jwt_token",jwtToken, {expires:30})
        const {history} = this.props
        history.replace('/')
      }
      onSubmitFailure = (errormsg) =>{
         this.setState({errorMsg:errormsg})
      }
      onChangePassword = (event) =>{
       this.setState({password:event.target.value})
      }
      onChangeUsername = (event) =>{
        this.setState({username:event.target.value})
      }
      submitForm = async(event) =>{
        event.preventDefault()
        const {username, password} = this.state
       const userDetails = {username, password}
       const url = 'https://apis.ccbp.in/login'
      const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
  
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    }
    else{
        this.onSubmitFailure(data.error_msg)
    }
      }
      renderPasswordField = () => {
        const {password} = this.state
        return (
          <>
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label><br/>
            <input
              type="password"
              id="password"
              className="password-input-filed"
              value={password}
              onChange={this.onChangePassword}
            />
          </>
        )
      }
      renderUsernameField = () => {
       const {username} = this.state
        return (
          <>
            <label className="input-label" htmlFor="username">
              USERNAME
            </label><br/>
            <input
              type="text"
              id="username"
              className="username-input-filed"
               value = {username}
              onChange={this.onChangeUsername}
            />
          </>
        )
      }
    render(){
        const{errorMsg} = this.state
      return (
        <div className="bg-container">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="trendz" className="website-logo-img"/> 
            <img src= "https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" alt="website login" className="website-login-img"></img>
            <form className="form-container" onSubmit={this.submitForm}>
              <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
               />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p>{errorMsg}</p>
        </form>
        </div>

      )  
    }
}
export default Login