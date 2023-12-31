import { apiV1, apiV1_user, get, post, put, patch, delele} from "./generic";

const showtimeAPI = {
  

  getAllShowtimes: function () {
    const url =`${apiV1}/showtimes/`;
    return get(url,"");
  },
  addShowtimes: function (data:any,token:string) {
    const url =`${apiV1}/showtimes/`;
    return post(url,data,token);
  },
  getShowtime: function (id: string){
    const url =`${apiV1}/showtimes/id/${id}`;
    return get (url,"");
  },
  getSchebyShowtime: function (id: string){
    const url =`${apiV1}/schedules/showtime/${id}`;
    return get (url,"");
  },
  updateShowtime: function (id: string | undefined, token: string, data: any){
    const url =`${apiV1}/showtimes/${id}`;
    return patch (url,data,token);
  },
  getShowTimebyMovieId: function (id: string){
    const url =`${apiV1}/schedules/showtime/${id}`;
    return get (url,"");
  },
  quickbuy: function (showtimeId: string, theatre: string, date:string){
    const url =`${apiV1}/schedules/search/?showtimeId=${showtimeId}&theatre=${theatre}&date=${date}`
    return get(url, "")
  },
  quickbuy1: function (showtimeId: string, theatre: string, date:string){
    const url =`${apiV1}/schedules/?showtimeId=${showtimeId}&theatre=${theatre}&date=${date}`
    return get(url, "")
  },
  searchShowtimes: function(query: string){
    const url =`${apiV1}/showtimes/search?q=${query}`
    return get(url, "")
  },
  postSchedule: function(data:any, token:string){
    const url = `${apiV1}/schedules/`
    return post(url, data, token)
  },
  getAllScheduleByMovieIdAnDate: function(movieId: string){
    const url = `${apiV1}/schedules/get/${movieId}`
    return get(url, "")
  },
  getScheduleByShowtimeIdAndDate: function(showtimeId: string, date: string, theatre: string){
    const url = `${apiV1}/schedules?showtimeId=${showtimeId}&date=${date}&theatre=${theatre}`
    return get(url, "")
  }
};

export default showtimeAPI;
