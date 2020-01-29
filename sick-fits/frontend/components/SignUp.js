import React, { Component } from 'react';
import Mutations from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import styled from 'styled-components';


const ContainerStyles = styled.div`
  max-width: 460px;
  margin: 0 auto;
`;
class SignUp extends Component{
  state = {
    name: '',
    password: '',
    email: ''
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render () {
    return (
      <ContainerStyles>
        <Form>
          <fieldset>
            <h2>Sign up</h2>
            <label htmlFor="name" >
              Name
              <input type="name" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
            </label>
            <label htmlFor="email">
              Email
              <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
            </label>
            <label htmlFor="password">
              Password
              <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
            </label>

            <input type="submit" value="Submit"/>
          </fieldset>
        </Form>
      </ContainerStyles>
    )
  }
}

export default SignUp
