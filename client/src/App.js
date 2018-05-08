import React, { Component } from 'react'
import logo from './logo.svg'
import Login from './components/Login'
import Home from './components/Home'
import ContactsList from './components/ContactsList'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'

class App extends Component {
  state = {
    contacts: [],
    currentUser: {},
    loggedIn: false,
    newContactAdded: false,
    redirect: false,
    currentContact: {}
  }
  newContact = async(contactInfo) => {
    try{
      console.log('Clicked')
      const user_id = this.state.currentUser.id
      const response = await axios.post(`/api/users/${user_id}/contacts`, contactInfo)
      console.log(response)
      this.setState({newContactAdded: true})
    }
    catch(error){
      console.log(error)
    }
  }
  loginUser = async(userEmail, pass)=>{
    try{
      const response = await axios.post(`/api/sign_in`, {email: userEmail, password: pass})
      console.log(response.data)
      const currentUser = response.data.data
      this.setState({currentUser, loggedIn: true})
    }
    catch(error){
      console.log(error)
    }
    
  }
  getContacts = async() => {
    console.log("CALLEDIT")
    const user_id = this.state.currentUser.id
    try{
      const response = await axios.get(`${user_id}/contacts`)
      const contacts = response.data
      console.log(contacts)
      this.setState({contacts})
    }
    catch(error){
      console.log(error)
    }
  }
  render() {
      const LoginComponent = () => (<Login loggedIn={this.state.loggedIn}
      loginUser={this.loginUser}/>)
      const NewContactComponent = () => (<NewContact newContact={this.newContact}
        newContactAdded={this.state.newContactAdded} 
        userId={this.state.currentUser.id}/>)
      const ContactsComponent = () => (<ContactsList currentUser={this.state.currentUser} getContacts={this.getContacts} contacts={this.state.contacts}/>)
    return (
      <Router>
      <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={LoginComponent}/>
            <Route exact path="/contacts" render={ContactsComponent}/>
            <Route exact path="/new_contact" render={NewContactComponent}/>
          </Switch>
      </div>
    </Router>

    )
  }
}

export default App
