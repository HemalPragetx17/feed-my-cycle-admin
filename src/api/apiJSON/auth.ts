import { ILoginData, IForgotPassword, IResetPassword } from '../../types'
import { IChangePassword } from '../../types/request_data/auth';

export const AUTHJSON = {
  login: ({ email, password }: ILoginData) => {
    return {
      email: email,
      password: password,
    }
  },
  forgotPassword: ({ email }: IForgotPassword) => {
    return {
      email: email,
    }
  },
  resetPassword: ({ token, newPassword, confirmNewPassword }: IResetPassword) => {
    return {
      token: token,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };
  },
  changePassword: ({ oldPassword, newPassword }: IChangePassword) => {
    return {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
  }
}
