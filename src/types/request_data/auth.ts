export interface ILoginData {
  email: string
  password: string
}
export interface IForgotPassword {
  email: string
}
export interface IResetPassword {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}