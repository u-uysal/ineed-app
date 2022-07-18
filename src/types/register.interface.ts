export interface Register {
  id: string
  __typename: string
}

export interface Data {
  register: Register
}

export interface RegisterResponse {
  data: Data
}
