import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.09);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 2rem;
    font-size: 1rem;
    font-weight: normal;
    text-transform: uppercase;
    color: #606060;
  }
  input,
  textarea,
  select {
    margin-top: 5px;
    width: 100%;
    padding: 1.3rem;
    font-size: 1.3rem;
    border: 1px solid #eee;
    border-radius: 6px;
    background: #f6f6f6;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.accent};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: ${props => props.theme.accent};
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
