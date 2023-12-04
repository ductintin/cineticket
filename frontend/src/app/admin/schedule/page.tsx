/* eslint-disable react/jsx-key */
"use client"
import styles from "./schedule.module.css";
// import AdminAPI from 
 import { useCallback, useEffect, useState } from 'react';//
 import React from 'react';
 import Image from 'next/image'
import AdminAPI from "@/app/api/adminAPI";
import { add_ad } from "@/assets/svgs";
import theatreAPI from "@/app/api/theatreAPI";
import movieAPI from "@/app/api/movieAPI";



export default function Schedule_Admin (){
   const [isAddingSchedule, setIsAddingSchedule]= useState(0) // 0: khong, 1: co
   const [movieList, setMovieList] = useState([]);
   const [theatreList, setTheatreList]= useState([])
   const [Schedules, take] = useState<any[]>([]); ///
   const [SById, setSByID] = useState<any[]>([]); ///
  
  let count=1;
   const Schedule = async () => {
     const ScheduleData = await AdminAPI.getAllShowtime();
     console.log("res: ", ScheduleData);
     take(ScheduleData.data);
     }

     useEffect(()=>{
      Schedule();
  },[])
  // fetch data
  useEffect (()=> {
    const fetchTheatreList= async()=> {
      const res= await theatreAPI.getAllTheatres();
      setTheatreList(res.data)
      console.log("theatres : ", res.data);
    }
    const fetchMovieList = async() => {
      //const res =await movieAPI.getAllMovies();
      // setMovieList(res.data);
      // console.log("Movies : ", res.data);
    }
    
    // SchById();
    //fetchMovieList();
    fetchTheatreList();
  },[])
  /// new schedule
  const maxtheatre=10
  const [newsch_movieID, setNewsch_movieID] = useState("")
  const [newsch_movieName, setNewsch_movieName] = useState("")
  const [newsch_startDate, setNewsch_startDate]= useState("");
  const [newsch_endDate, setNewsch_endDate]= useState("");
  const [newsch_times, setNewsch_times]= useState<any[]>([]);
  const [newnumtimes, setNewNumTimes] = useState(1)
  const [newtimes, setNewTimes] = useState([""])
  const [newTheatre, setNewTheatre] = useState([""])
  const [newNumTime, setNewNumTime] = useState<any[]>([1])
  const [newTime, setNewTime] = useState<any[][]>([[""]])

  const Cinema = ['Happy Us Theatre Quận 1', 
                  'Happy Us Theatre Quận 2', 
                  'Happy Us Theatre Quận 3', 
                  'Happy Us Theatre Quận 4',
                  'Happy Us Theatre Quận 5',  ];


  const handleAddScheduleButton = () => {
    setIsAddingSchedule(1);
   
  }
  const handleSaveAddingButton = () => {
    const data = {
      movieName: newsch_movieName,
      startDate: newsch_startDate,
      endDate: newsch_endDate,
      isActive: true,
      times: newsch_times.map((date, idxtimes) => {
        return {
          _id: `648a020e27d32dfd9816931${idxtimes}`,
        showtimeId: "6489ec98ba4769263484ac62",
        date: date,
        theatreName: newTheatre,
        time: newTime[idxtimes],
        };
      }),
    };
    console.log(data);
  };
  const handleIncreaseDays=useCallback(()=>{
  
    setNewNumTimes((t) => newnumtimes+1);

    setNewTimes((t) => [...t, ""])
    console.log("day affter", newnumtimes)
    setNewTime((t)=>[...t,[""]])
  },[newnumtimes])




  const handleMovieChange = (event:any) => {
    const selectedMovieTitle = event.target.value;
    setNewsch_movieName(selectedMovieTitle);
  };


  const handleStartDateChange = (value:any) => {
    setNewsch_startDate(value);
  };

  const handleEndDateChange = (value:any) => {
    setNewsch_endDate(value);
  };

  const handleDayRowChange = (idxtimes:number, event:any) => {
    const value = event.target.value;
    const formattedDate = value.replaceAll("-", "/");
    let newTimesCopy = [...newsch_times];
    newTimesCopy[idxtimes] = formattedDate;
    setNewsch_times(newTimesCopy);
  };

  const handleTheatreChange = (event:any) => {
    const selectedTheatreName = event.target.value;
    setNewTheatre(selectedTheatreName);
  };

  const handleTimeChange = (idxtimes:number, idxtime:number, value:any) => {
    const newTimeCopy = [...newTime[idxtimes]];
    newTimeCopy[idxtime] = value;
  
    let newTimeCopyArray = [...newTime];
    newTimeCopyArray[idxtimes] = newTimeCopy;
    setNewTime(newTimeCopyArray);
  };
  
  const handleIncreaseTime=useCallback((idxtimes: number) =>{

    let tempnumtime=newNumTime
    let temptime=newTime
    tempnumtime[idxtimes]=newNumTime[idxtimes]+1
    temptime[idxtimes].push("")
    setNewNumTimes((t) => t+1)
    setNewTime((t) =>temptime)
    setNewNumTime((t) => tempnumtime)
  },[newNumTime,newTime])


    return(
      <div  className={styles.lay1}>
        <table className={styles.table}>
  <thead>
    <tr>
      <th>No.</th>
      <th>Name</th>
      <th>Start</th>
      <th>End</th>
      <th>Date</th>
      <th>Theatre</th>
      <th>Time</th>
      <th>opt</th>
    </tr>
  </thead>
  <tbody>
    {/** add schedule row */}

      {
        newtimes.map((etimes, idxtimes)=>(
          <tr key="">
            {
              true?(
            <>
              {/* stt */}
              <td ></td>

              {/* name */}
              <td >
                {/* <label htmlFor="">Choose movie</label> */}
                <select name="movies" id="movies" onChange={handleMovieChange}>
                <option value="" hidden>Chọn phim</option> 
                  {Schedules.map((movie: any)=> (
                    <option key = {movie}>{ movie.movieName}</option>
                  ))}
                </select>
              </td>
              {/* start date */}
              <td ><input className={styles.input} value={newsch_startDate} onChange={(e)=>handleStartDateChange( e.target.value)} type="date"/></td>
              {/* end date */}
              <td ><input  className={styles.input} value={newsch_endDate} onChange={(e)=>handleEndDateChange( e.target.value)} type="date"/></td>
            </>
              ):null}
              {/* date */}

                  <td >
                    <input value={newsch_times} onChange={(e)=> handleDayRowChange(idxtimes, e)} className={styles.input} type="text"/>   
                  </td>
                  <td className={styles.add_sheet}> <select name="theatres" id="theatres" onChange={handleTheatreChange}>
                  <option value="" hidden>Chọn Rạp</option> 
                      {Cinema.map((theatre: any) => (
                        <option key={theatre}>{theatre}</option>
                      ))} </select>
                    {/* {idxtimes !== newtimes.length - 1 ? (
                      <></>
                    ) : (
                      <Image
                        src={add_ad} onClick={handleIncreaseDays} alt="" className={styles.add_row_img} width={20} height={20}/>
                    )} */}
                  </td>
  
          
          <td className= {styles.add_sheet}> 

          
          <ul>
          {newTime[idxtimes]?.map((etime, idxtime) => (
            <li key={idxtime} id={`${idxtimes}-${idxtime}`}>
              <input
                value={etime}
                onChange={(e) => handleTimeChange(idxtimes, idxtime, e.target.value)}
                key={idxtime}
              />
              {idxtime !== newTime[idxtimes].length - 1 ? (
                <></>
              ) : (
                <Image
                  src={add_ad}onClick={() => handleIncreaseTime(idxtimes)} alt="" className={styles.add_row_img} width={20} height={20}/>
              )}
            </li>
          ))}
</ul>
          </td>
          <td><button onClick={handleSaveAddingButton}>Save</button></td>
        </tr>
        )
        )
      }
     
    {/* ))
  ))} */}
  {Schedules.map((schedule, index) => (schedule?.schedules.length >0)?( 
    schedule?.schedules.map((timeSlot:any, timeIndex:any) => (
      <tr key={`${index}-${timeIndex}`}>
        {timeIndex === 0 ? (
          <>
            <td rowSpan={schedule?.schedules.length}>{count++}</td>
            <td rowSpan={schedule?.schedules.length}>{schedule?.movieName}</td>
            <td rowSpan={schedule?.schedules.length}>{schedule?.dateRange?.start?.substring(0,10)}</td>
            <td rowSpan={schedule?.schedules.length}>{schedule?.dateRange?.end?.substring(0,10)}</td>
          </>
        ) : null}
       <td>{timeSlot.date.substring(0,10)}</td>
        <td>{timeSlot.theatre}</td>
       
        <td>
          <ul>
            {timeSlot.time.map((time:any, index:number) => (
              <li key={index}>
                <span key={index}>{time} </span>
              </li>
            ))}
          </ul>
        </td>
        <td>opt</td>
      </tr>
    ))
  ):(<></>))
  }
</tbody>
</table>



      </div> 
    )
}