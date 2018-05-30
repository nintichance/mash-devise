import Login from '../Login'
import React from 'react'
import { Form, FormInput } from '../styled-components/Form'
import { shallow } from 'enzyme'
const renderComponent = () => {
    return shallow(
        <Login loginUser={loginUser}/>
    )
}
let component 
const loginUser = jest.fn()
beforeEach(()=>{
    console.log("Hello")
    component=renderComponent()
})
it('Tests if user input is submitted', () => {
    const form = component.find('form')
    console.log(form)
    const inputOne = component.find('input').at(0)
    const inputTwo = component.find('input').at(1)


    console.log("Hello", inputOne, "Hi", inputTwo)
    const userEmail = 'test string'
    const userPassword = 'test string'
    const changeEvent = {
        target: {
            name: 'email',
            value: userEmail
        },
        target: {
            name: 'password',
            value: userPassword
        },
        preventDefault: jest.fn()
    }

    inputOne.simulate('change', changeEvent)
    inputTwo.simulate('change', changeEvent)

    const submitEvent = {
        preventDefault: jest.fn()
    }
    form.simulate('submit', submitEvent)
    const state =  {
        email: 'test string',
        password: 'test string'
    }
    const expectedState =  {
        email: userEmail,
        password: userPassword
    }
    expect(state).toEqual(expectedState)
})