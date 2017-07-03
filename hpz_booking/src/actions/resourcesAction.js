import axios from 'axios';

export function setResources(data){
  return {
    type: "SET_RESOURCES",
    resources: data
  }
}

export default function getResources(){
  return (dispatch) => {
    return axios.get('api/resources').then(res => {
      dispatch(setResources(res.data.result))
    });
  }
}
