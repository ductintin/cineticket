import {apiV1, apiV1_user, get, post, put, patch, delele, postUpload} from "./generic";

const movieAPI = {
  
  getNowShowingMovies: function () {
    const url = `${apiV1}/showtimes/now-showing`;
    return get(url, "");
  },
  getComingSoonMovies: function () {
    const url = `${apiV1}/showtimes/comingSoon`;
    return get(url, "");
  },
  searchMovie: function (query:string){
    const url=`${apiV1}/search?q=${query}`;
    return get(url, "");
  },
  getAllMovies: function (token: string) {
    const url =`${apiV1}/movies/`;
    return get(url,token);
  },
  createMovie: function (token: string, data:any) {
    const url =`${apiV1}/movies/`;
    return post(url,data,token);
  },
  getMovie: function (id: string){
    const url =`${apiV1}/movies/${id}`;
    return get (url,"");
  },

  uploadImage: function (id: string,data: FormData, token:string){
    const url =`${apiV1}/movies/photo/${id}`;
    return postUpload(url,data,token);
  },
 
  quickBuyTicket: function (query:string) {
    const url = `${apiV1}/quick-buy/${query}`;
  },
  getDateOfShowtime: function (id:string) {
    const url = `${apiV1}/quick-buy/date/${id}`;
    return get(url, "");
  },
 
  patchMovie: function(id:string, data:any, token:string){
    const url = `${apiV1}/movies/${id}`;
    return patch(url, data, token)
  },

  getTheatreOfShowtime: function (id:string,date:string) {
    const url = `${apiV1}/quick-buy/theatre/${id}/${date}`;
    return get(url, "");
  },

  getTimeOfShowtime: function (id:string,date:string,theatre: string) {
    const url = `${apiV1}/quick-buy/time/${id}/${date}/${theatre}`;
    return get(url, "");
  },

  getUpComingMovies: function () {
    const url = `${apiV1}/showtimes/upcoming`;
    return get(url, "");
  },

  getIDSeat: function(){
    const url = `${apiV1}/seats`;
    return get(url, "");
  },
  getAllSeats: function(){
    const url = `${apiV1}/seats/`;
    return get(url, "");
  },

  getAllTicketsByReservation: function (id:string) {
    const url = `${apiV1}/reservations/${id}`;
    return get(url, "");
  },
  getAllReservationByUserId: function (userId:string, token: string) {
    const url = `${apiV1}/reservations/tickets/${userId}`;
    return get(url, token);
  },

  getIdTest: function (reservationId: string) {
    const url = `${apiV1}/reservations/${reservationId}/tickets`;
    return get(url, "");
  },
  

  getUser: function(token: string){
    const url = `${apiV1}/user/`;
    return get(url,token);
  },

  // getUser: function (token: string) {
  //   const url = `${apiV1}/user/`;
  //   return axios.get(url, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // },

};

export default movieAPI;
