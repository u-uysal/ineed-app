export interface Login {
  id: string
  __typename: string
}

export interface Data {
  login: Login
}

export interface LoginResponse {
  data: Data
}
