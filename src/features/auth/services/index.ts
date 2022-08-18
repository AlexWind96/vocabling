import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { UsersService, auth } from '@/services'
import { AuthUser, ROLE } from '../types'

export type RegisterUserDTO = {
  email: string
  password: string
  name: string
}

export type LoginUserDTO = {
  email: string
  password: string
}

class AuthService {
  register = async ({ email, name, password }: RegisterUserDTO): Promise<AuthUser> => {
    return new Promise<AuthUser>((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user
          const response = await UsersService.createWithId(
            { email: user.email, name, role: ROLE.User, id: user.uid },
            user.uid
          )
          resolve({ email: user.email!, name, role: ROLE.User, id: user.uid })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          reject(new Error(`${errorCode} : ${errorMessage}`))
        })
    })
  }

  login = async ({ email, password }: LoginUserDTO): Promise<AuthUser> => {
    return new Promise<AuthUser>((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user
          const response = await UsersService.getOneById(user.uid)
          resolve(response as AuthUser)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          reject(new Error(`${errorCode} : ${errorMessage}`))
        })
    })
  }

  logout = async () => {
    return new Promise<void>((resolve, reject) => {
      signOut(auth)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getUser = () => {
    return auth.currentUser
  }
}

export const authService = new AuthService()
