import React, { Component } from 'react'
import NavBar from './NavBar'
import { Form, 
         Container, 
         FormWrapper, 
         FormBody, 
         FormInput, 
         FormButton,
         PassWordMaskDiv } from './styled-components/Form'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        event.preventDefault()
    }
    handleLogin = (event) => {
      event.preventDefault()
      this.props.loginUser(this.state.email, this.state.password)
    }

    render(){
      if(this.props.loggedIn === true){
        return(
          <Redirect to="/contacts" />
        )
      }
        return(
            <Container>
                <NavBar />
                <FormWrapper>
                <FormBody>
                    <p> Welcome Back!</p>
                    <Form onSubmit={this.handleLogin}>
                        <FormInput
                            type="string"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                            />
                        <FormInput
                            type="string"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            />
                        <FormButton className="input-button" type="submit" value="Login" />
                    </Form>
                </FormBody>
                </FormWrapper>
            </Container>
        )
    }
}

export default Login