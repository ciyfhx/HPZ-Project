import axios from 'axios';


export default function sendFeedback(msg){
  return (dispatch) => {
    return axios.post("api/feedback", {message:msg});
  }
}
