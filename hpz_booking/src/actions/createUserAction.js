import axios from 'axios';

export default function createUser(user){
  return (dispatch) => {
    return axios.post('api/create-user', user);
  }
}
