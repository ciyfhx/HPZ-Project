import axios from 'axios';

export function setBookings(data){
  return {
    type: "SET_BOOKINGS",
    bookings: data
  }
}

export default function getBookings(){
  return (dispatch) => {
    return axios.get('api/bookings').then(res => {
      dispatch(setBookings(res.data.result))
    });
  }
}
