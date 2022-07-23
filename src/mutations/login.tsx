import { gql } from '@apollo/client'

const LOGIN = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    register(
      email: $email
      password: $password
    ) {
      id
    }
  }
`

export default LOGIN
