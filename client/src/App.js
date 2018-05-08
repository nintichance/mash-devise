import React, { Component } from 'react'
import logo from './logo.svg'
import Login from './components/Login'
import Home from './components/Home'
import NewContact from './components/NewContact'
import EditContact from './components/EditContact'
import ContactsList from './components/ContactsList'
import SignUp from './components/SignUp'
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
  signUp = async(userInfo) => {
    try{
          const response = await axios.post('/api', userInfo)
          const user = response.data.data
          console.log(user)

          this.setState({loggedIn: true, currentUser: user})
      }
      catch(error){
          alert("Sign Up failed. Please try again.")
      }
}
  deleteContact = async(userId, contactId) => {
    try{
        axios.delete(`${userId}/contacts/${contactId}`)
        alert("contact deleted")
        this.setState({redirect: true})
    }
    catch(error){
    }
}
  setCurrentContact = (contact) =>{
    this.setState({currentContact: contact})
  }
  updateContact = async(updatedContact) =>{
    const currentContact = this.state.currentContact
    const contactId = this.state.currentContact.id
    const userId = this.state.currentUser.id
    try {
        await axios.patch(`${userId}/contacts/${contactId}`, updatedContact, currentContact)
        console.log("UPDATEIT")
        this.setState({ redirect: true })
    }
    catch (err) {
        console.log(err)
    }
  }
  
  newContact = async(contactInfo) => {
    try{
      console.log('Clicked')
      const user_id = this.state.currentUser.id
      const response = await axios.post(`${user_id}/contacts`, contactInfo)
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
      alert("Login failed. Please try again.")
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
  logout = () => {
    this.setState({currentUser: {}, loggedIn: false})
  }
  render() {
      const LoginComponent = () => (<Login loggedIn={this.state.loggedIn}
      loginUser={this.loginUser}/>)
      const NewContactComponent = () => (<NewContact newContact={this.newContact}
        newContactAdded={this.state.newContactAdded} 
        userId={this.state.currentUser.id}/>)
      const EditContactComponent = () => (<EditContact redirect={this.state.redirect} 
          currentContact={this.state.currentContact} 
          updateContact={this.updateContact}/>) 
      const ContactsComponent = () => (<ContactsList loggedIn={this.state.loggedIn}logout={this.logout}deleteContact={this.deleteContact} setCurrentContact={this.setCurrentContact} currentUser={this.state.currentUser} getContacts={this.getContacts} contacts={this.state.contacts}/>)
      const SignUpComponent = () => (<SignUp loggedIn={this.state.loggedIn} 
        signUp={this.signUp}/>)  
      return (
      <Router>
      <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={LoginComponent}/>
            <Route exact path="/contacts" render={ContactsComponent}/>
            <Route exact path="/new_contact" render={NewContactComponent}/>
            <Route exact path="/edit_contact" render={EditContactComponent}/>
            <Route exact path="/signup" render={SignUpComponent}/>
          </Switch>
      </div>
    </Router>

    )
  }
}

export default App
