import { LoginResponseType } from "../interfaces/LoginResponseType";

export default function setLoginResponse(data: LoginResponseType) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  localStorage.setItem("firstName", data.firstName);
  localStorage.setItem("firstName", data.lastName);
  localStorage.setItem("userId", data.id);
  localStorage.setItem("email", data.email);
}
