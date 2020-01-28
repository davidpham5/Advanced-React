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
  render () {
    return (
      <ContainerStyles>
        <Form>
          <fieldset>
            <h2>Sign up</h2>
          </fieldset>
        </Form>
      </ContainerStyles>
    )
  }
}

export default SignUp
