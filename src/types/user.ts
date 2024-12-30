export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface Login extends Pick<User, 'email' | 'password'> {}