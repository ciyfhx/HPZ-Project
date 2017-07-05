import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export function setUser(user){
  return {
    type: "SET_USER",
    user
  }
}

export default function login(userData){
  return (dispatch) => {
    return axios.post('api/login', userData).then(res => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      console.log(jwtDecode(res.data.token))
      dispatch(setUser(jwtDecode(res.data.token)))
    });
  }
}
