import React, { Component } from 'react'
import logo from './logo.svg'
import Login from './components/Login'
import './App.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'

class App extends Component {
  state = {
    currentUser: {},
    loggedIn: false
  }
  loginUser = async(userEmail, pass)=>{
    try{
      const response = await axios.post(`/api/sign_in`, {email: userEmail, password: pass})
      console.log(response.data)
      this.setState({loggedIn: true, currentUser: response.data[0]})
    }
    catch(error){
      console.log(error)
    }
    
  }
  render() {
      const LoginComponent = () => (<LoginUser loggedIn={this.state.loggedIn}
      loginUser={this.loginUser}/>)
      const SignUpComponent = () => (<SignUp />)
    return (
      <Router>
      <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={LoginComponent}/>
            <Route exact path="/contacts" render={ContactsComponent}/>
          </Switch>
      </div>
    </Router>

    )
  }
}

export default App
