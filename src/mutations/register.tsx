import { gql } from '@apollo/client'

const REGISTER = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      firstname: $firstname
      lastname: $lastname
      password: $password
      confirmPassword: $confirmPassword
      email: $email
    ) {
      id
      email
    }
  }
`

export default REGISTER
