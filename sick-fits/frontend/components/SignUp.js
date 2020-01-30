import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import styled from "styled-components";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    # then will run our schema called:
    signup(email: $email, name: $name, password: $password) {
      id
      name
      email
    }
  }
`;

const ContainerStyles = styled.div`
  max-width: 460px;
  margin: 0 auto;
`;
class SignUp extends Component {
  state = {
    name: "",
    password: "",
    email: ""
  };
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const resp = await signup();
      this.setState({name: '', email: '', password: ''})
    } catch (error) {
      if (error) {
        return error;
      }
    }
  }
  render() {
    return (
      <ContainerStyles>
        <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
          {(signup, { error, loading }) => {
            return (
              <Form method="post" onSubmit={this.handleSubmit}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Sign up</h2>
                  <Error error={error} />
                  <label htmlFor="name">
                    Name
                    <input
                      type="name"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </label>
                  <label htmlFor="email">
                    Email
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </label>
                  <label htmlFor="password">
                    Password
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </label>

                  <input type="submit" value="Submit" />
                </fieldset>
              </Form>
            );
          }}
        </Mutation>
      </ContainerStyles>
    );
  }
}

export default SignUp;
