"use client";
import movieAPI from "../../api/movieAPI";
import s from "./idfilm.module.css";
import { Metadata, ResolvingMetadata } from "next";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import showtimeAPI from "@/app/api/showtimeAPI";
import { showtimeInterface } from "@/app/api/apiResponse";
import { useRouter } from "next/navigation";
import {Button, Card} from "antd";

type movieInterface = {
  _id: string;
  title: string;
  image: string;
  language: string[];
  genre: string[];
  director: string;
  cast: string[];
  description: string;
  duration: number;
  rating: number;
  __v: number;
};

type Props = {
  params: { movie: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function MoviesPage({ params, searchParams }: Props) {
  const [movieId, setMovieId] = useState(params.movie);

  const [movie, setMovie] = useState<movieInterface>();
  const [schedule, setSchedule] = useState<any[]>([]);
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
  console.log("time", time);

  const fetchMovie = async () => {
    const res = await movieAPI.getMovie(movieId);
    console.log("data", res.data);
    setMovie(res.data);
  };

  const shc = async () => {
    const ScheduleData = await showtimeAPI.getAllScheduleByMovieIdAnDate(
      movieId
    );
    console.log("shcjkajd: ", ScheduleData.data);
    setSchedule(ScheduleData.data);
  };

  useEffect(() => {
    fetchMovie();
    shc();
  }, []);

  const [image, setimage] = useState<string[]>([]);
  const [showtime, setshowtime] = useState<string[]>([]);

  const transformId = async (id: string) => {
    return showtimeAPI
      .getShowtime(id)
      .then((data) => String(data.data.movie.image));
  };

  const stt1 = async () => {
    const res11 = await showtimeAPI.getAllShowtimes();

    const ids1 = Object.values(res11.data).map((obj: any) => obj.id);
    const results1 = await Promise.all(ids1);
    setshowtime(results1);

    const ids2 = Object.values(res11.data).map((obj: any) =>
      transformId(obj.id)
    );
    const results2 = await Promise.all(ids2);
    setimage(results2);
  };
  useEffect(() => {
    stt1();
  }, []);

  const [selectedDate, setSelectedDate] = useState("2023-06-13");
  const [useDate, setUseDate] = useState("2023/06/13");
  function handleDateChange(event: ChangeEvent<HTMLInputElement>): void {
    setSelectedDate(event.target.value);
    setUseDate(event.target.value.replace(/-/g, "/"));
  }

  const [selectedTheater, setSelectedTheater] = useState("Tất cả các rạp");

  const handleTheaterChange = (event: any) => {
    setSelectedTheater(event.target.value);
  };

  //showtime
  const fetchSche = async () => {
    const res = await showtimeAPI.quickbuy1(movieId, "", useDate);
    setQ1([]);
    setQ2([]);
    setQ3([]);
    setQ4([]);
    setQ5([]);

    res.data.forEach((item: any) => {
      for (let i = 0; i < res.data.length; i++) {
        if (item.theatre === "Happy Us Theatre Quận 1") {
          setQ1(item.time);
        }
        if (item.theatre === "Happy Us Theatre Quận 2") {
          setQ2(item.time);
        }
        if (item.theatre === "Happy Us Theatre Quận 3") {
          setQ3(item.time);
        }
        if (item.theatre === "Happy Us Theatre Quận 4") {
          setQ4(item.time);
        }
        if (item.theatre === "Happy Us Theatre Quận 5") {
          setQ5(item.time);
        }
      }
    });
  };
  useEffect(() => {
    fetchSche();
  }, [useDate]);
  const [Q1, setQ1] = useState([]);
  const [Q2, setQ2] = useState([]);
  const [Q3, setQ3] = useState([]);
  const [Q4, setQ4] = useState([]);
  const [Q5, setQ5] = useState([]);

  const handleClick = (theatreName: string, time: string) => {
    const showtimeId = params.movie;
    theatreName = encodeURIComponent(theatreName);
    const date = selectedDate;
    time = encodeURIComponent(time);
    const link = `http://localhost:3000/screen?showtimeId=${showtimeId}&theatreName=${theatreName}&date=${date}&time=${time}&fbclid=IwAR34WyDJEGXy12f310JUJfyj62-do7hb8Bk4aoqu8Sjm5zMNU_8z9LAJx34`;
    window.location.href = link;
    console.log("hello");
  };

  const route = useRouter();
  const handleBook = (scheduleId: string, date: String) => {
    const link = `/screen?scheduleId=${scheduleId}&date=${date}`;

    route.push(link);
  };

  const clickbutton = () => {
    const scrollOptions: ScrollToOptions = { top: 1350, behavior: "smooth" };
    window.scrollTo(scrollOptions);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollingRight, setIsScrollingRight] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;
        if (isScrollingRight) {
          containerRef.current.scrollLeft += 270;
        } else {
          containerRef.current.scrollLeft -= 270;
        }

        if (scrollLeft === 0) {
          setIsScrollingRight(true);
        } else if (scrollWidth - clientWidth - scrollLeft < 1) {
          setIsScrollingRight(false);
        }
      }
    }, 2500); // 1000 milliseconds = 1 second

    return () => {
      clearInterval(interval);
    };
  }, [isScrollingRight]);

  return (
    <>
      <div className={s.idfilm}>
        <div className={s.container}>
          <div className={s.leftcolumn}>
            <div className={s.a1}>
              {!movie ? <div></div> : <img src={movie.image} alt="Mô tả ảnh" className="w-full aspect-video"/>}
            </div>
          </div>

          <div className={s.rightcolumn}>
            {/*<div className={s.intro}>*/}
            {/*  {!movie ? <div></div> : <div className={s.i1}>{movie.title}</div>}*/}

            {/*  {!movie ? (*/}
            {/*    <div></div>*/}
            {/*  ) : (*/}
            {/*    <div className={s.i2}>*/}
            {/*      Language: {movie.language.join(", ")}*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*  {!movie ? (*/}
            {/*    <div></div>*/}
            {/*  ) : (*/}
            {/*    <div className={s.i2}>Genre: {movie.genre.join(", ")} </div>*/}
            {/*  )}*/}
            {/*  {!movie ? (*/}
            {/*    <div></div>*/}
            {/*  ) : (*/}
            {/*    <div className={s.i2}>Director: {movie.director}</div>*/}
            {/*  )}*/}
            {/*  {!movie ? (*/}
            {/*    <div></div>*/}
            {/*  ) : (*/}
            {/*    <div className={s.i3}>Cast: {movie.cast.join(", ")}</div>*/}
            {/*  )}*/}
            {/*  {!movie ? (*/}
            {/*    <div></div>*/}
            {/*  ) : (*/}
            {/*    <div className={s.i2}>Duration: {movie.duration} min</div>*/}
            {/*  )}*/}

            {/*  /!*{!movie ? (*!/*/}
            {/*  /!*  <div></div>*!/*/}
            {/*  /!*) : (*!/*/}
            {/*  /!*  <div className={s.i2}>Rating: {movie.rating}</div>*!/*/}
            {/*  /!*)}*!/*/}
            {/*  /!*<div className={s.starvote}>*!/*/}
            {/*  /!*  <div className={s.i2}>Rate: </div>*!/*/}
            {/*  /!*  <div className={s.rating}>*!/*/}
            {/*  /!*    <input type="radio" id="star5" name="rating" value="5" />*!/*/}
            {/*  /!*    <label htmlFor="star5"></label>*!/*/}
            {/*  /!*    <input type="radio" id="star4" name="rating" value="4" />*!/*/}
            {/*  /!*    <label htmlFor="star4"></label>*!/*/}
            {/*  /!*    <input type="radio" id="star3" name="rating" value="3" />*!/*/}
            {/*  /!*    <label htmlFor="star3"></label>*!/*/}
            {/*  /!*    <input type="radio" id="star2" name="rating" value="2" />*!/*/}
            {/*  /!*    <label htmlFor="star2"></label>*!/*/}
            {/*  /!*    <input type="radio" id="star1" name="rating" value="1" />*!/*/}
            {/*  /!*    <label htmlFor="star1"></label>*!/*/}
            {/*  /!*  </div>*!/*/}
            {/*  /!*</div>*!/*/}

            {/*  /!*<div>*!/*/}
            {/*  /!*  <div className={s.j1}> DESCRIPTION</div>*!/*/}
            {/*  /!*  {!movie ? (*!/*/}
            {/*  /!*    <div></div>*!/*/}
            {/*  /!*  ) : (*!/*/}
            {/*  /!*      <p >{movie.description}</p>*!/*/}
            {/*  /!*  )}*!/*/}
            {/*  /!*</div>*!/*/}
            {/*  <button className={s.btnbooking} onClick={clickbutton}>*/}
            {/*    ĐẶT VÉ*/}
            {/*  </button>*/}
            {/*</div>*/}

            <Card className={s.intro}>
              {!movie ? (
                  <div></div>
              ) : (
                  <>
                    <p className="text-3xl text-green-700 text-center bg-white p-1"> {movie.title}
                    </p>

                    <p className="text-2xl p-1 mt-5">
                      Language: {movie.language.join(", ")}
                    </p>
                    <p className="text-2xl p-1">Genre: {movie.genre.join(", ")} </p>
                    <p className="text-2xl p-1">Director: {movie.director}</p>
                    <p className="text-2xl p-1">Cast: {movie.cast.join(", ")}</p>
                    <p className="text-2xl p-1">Duration: {movie.duration} min</p>
                    <p className="text-2xl p-1">Description: {movie.description}</p>

                    <Button onClick={clickbutton} className="bg-amber-400 my-5" size="large" block>Đặt vé</Button>
                  </>

              )}
            </Card>
          </div>
        </div>
        {/* <div className={s.newmoviewrap}>
       <div className={s.newmovie}> PHIM HAY TRONG TUẦN</div>
       </div>
       <div className={s.slider}>
        <div className={s.slidercontainer} ref={containerRef}>
          <a href={"http://localhost:3000/movie/"+showtime[0]}> <img src={image[0]} /> </a>   
          <a href={"http://localhost:3000/movie/"+showtime[1]}> <img src={image[1]} /> </a>   
          <a href={"http://localhost:3000/movie/"+showtime[2]}> <img src={image[2]} /> </a>
          <a href={"http://localhost:3000/movie/"+showtime[3]}> <img src={image[3]} /> </a>   
          <a href={"http://localhost:3000/movie/"+showtime[4]}> <img src={image[4]} /> </a>   
          <a href={"http://localhost:3000/movie/"+showtime[5]}> <img src={image[5]} /> </a>   
          <a href={"http://localhost:3000/movie/"+showtime[6]}> <img src={image[6]} /> </a>   
          <a href={"http://localhost:3000/movie/"+showtime[7]}> <img src={image[7]} /> </a>   
          <a href={"http://localhost:3000/movie/"+showtime[8]}> <img src={image[8]} /> </a>   
          <a href={"http://localhost:3000/movie/"+showtime[9]}> <img src={image[9]} /> </a>   
          <a href={"http://localhost:3000/movie/"+showtime[10]}> <img src={image[10]} /> </a>   
        </div>
       </div> */}

        <div className={s.mschedule}>
          <div className={s.schewrap}>
            <div className={s.sche}> LỊCH CHIẾU</div>
          </div>
          <div className={s.select}>
            {/* <input
              type="date"
              className={s.datetime}
              value={selectedDate}
              onChange={handleDateChange}
            ></input>
            <select className={s.theater} onChange={handleTheaterChange}>
              <option>Tất cả các rạp</option>
              <option>Happy Us Theatre Quận 1</option>
              <option>Happy Us Theatre Quận 2</option>
              <option>Happy Us Theatre Quận 3</option>
              <option>Happy Us Theatre Quận 4</option>
              <option>Happy Us Theatre Quận 5</option>
            </select> */}
          </div>

          {schedule.map((sh, index) => (
            <div className={s.box} key={sh._id}>
              <div className={s.namett}>{sh.theatre}</div>
              <div>
                {(() => {
                  const variable = new Date(sh.date);
                  console.log("vauushs", variable);
                  console.log("current", currentTime);
                  console.log("bab", variable.getDate() == currentTime.getDate());
                  return variable.getDate() + "/" + (variable.getMonth()+ 1) + "/" + variable.getFullYear()  ;
                })()}
              </div>
              <div className={s.schedule}>
                <div className={s.type}>2D - Phụ đề</div>
                <div className={s.alltime}>
                  {sh.time.map((shh:any, i:string) => (
                      console.log("ss", shh > time),
                      console.log("time", shh.time),
                    <div
                      style={{
                        border: ((new Date(sh.date).getDate() > currentTime.getDate() ? "1px solid #ccc" : ((new Date(sh.date).getDate() == currentTime.getDate() && shh > time) ? "1px solid #ccc" : ""))),
                        borderRadius: "4px",
                        padding: "10px",
                        margin: "10px",
                        background: ((new Date(sh.date).getDate() > currentTime.getDate() ? "" : ((new Date(sh.date).getDate() == currentTime.getDate() && shh > time) ? "": "#c5d3e0"))),
                      }}
                      key={i}
                      className={shh}
                      onClick={() =>
                        ((new Date(sh.date).getDate() > currentTime.getDate() ? handleBook(sh._id, shh) : ((new Date(sh.date).getDate() == currentTime.getDate() && shh > time) ? handleBook(sh._id, shh): {})))

                        // ((new Date(sh.date) > currentTime) && (sh.time > time))
                        //   ? {}
                        //   : handleClick("Happy Us Theatre Quận 1", shh)
                      }
                    >
                      {shh}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* <div className={s.box} style={{ display: selectedTheater === 'Happy Us Theatre Quận 1' || selectedTheater === 'Tất cả các rạp' ? 'block' : 'none' }}>
                <div className={s.namett}>
                Happy Us Theatre Quận 1
                </div>
                <div className={s.schedule}>
                        <div className={s.type}>
                        2D - Phụ đề
                        </div>
                        <div className={s.alltime}>
                        {Q1.map((element, index) => (
                            <div key={index} className={s.time} onClick={() => handleClick('Happy Us Theatre Quận 1', element)}>
                            {element}
                            </div>
                        ))}
                        </div>
                </div>  
            </div>

            <div className={s.box} style={{ display: selectedTheater === 'Happy Us Theatre Quận 2' || selectedTheater === 'Tất cả các rạp' ? 'block' : 'none' }}>
                <div className={s.namett}>
                Happy Us Theatre Quận 2
                </div>
                <div className={s.schedule}>
                        <div className={s.type}>
                        2D - Phụ đề
                        </div>
                        <div className={s.alltime}>
                        {Q2.map((element, index) => (
                            <div key={index} className={s.time} onClick={() => handleClick('Happy Us Theatre Quận 2', element)}>
                            {element}
                            </div>
                        ))}
                        </div>
                </div>  
            </div>

            <div className={s.box} style={{ display: selectedTheater === 'Happy Us Theatre Quận 3' || selectedTheater === 'Tất cả các rạp' ? 'block' : 'none' }}>
                <div className={s.namett}>
                Happy Us Theatre Quận 3
                </div>
                <div className={s.schedule}>
                        <div className={s.type}>
                        2D - Phụ đề
                        </div>
                        <div className={s.alltime}>
                        {Q3.map((element, index) => (
                            <div key={index} className={s.time} onClick={() => handleClick('Happy Us Theatre Quận 3', element)}>
                            {element}
                            </div>
                        ))}
                        </div>
                </div>  
            </div>

            <div className={s.box} style={{ display: selectedTheater === 'Happy Us Theatre Quận 4' || selectedTheater === 'Tất cả các rạp' ? 'block' : 'none' }} >
                <div className={s.namett}>
                Happy Us Theatre Quận 4
                </div>
                <div className={s.schedule}>
                        <div className={s.type}>
                        2D - Phụ đề
                        </div>
                        <div className={s.alltime}>
                        {Q4.map((element, index) => (
                            <div key={index} className={s.time} onClick={() => handleClick('Happy Us Theatre Quận 4', element)}>
                            {element}
                            </div>
                        ))}
                        </div>
                </div>  
            </div>

            <div className={s.box} style={{ display: selectedTheater === 'Happy Us Theatre Quận 5' || selectedTheater === 'Tất cả các rạp' ? 'block' : 'none' }}>
                <div className={s.namett}>
                Happy Us Theatre Quận 5
                </div>
                <div className={s.schedule}>
                        <div className={s.type}>
                        2D - Phụ đề
                        </div>
                        <div className={s.alltime}>
                        {Q5.map((element, index) => (
                            <div key={index} className={s.time} onClick={() => handleClick('Happy Us Theatre Quận 5', element)}>
                            {element}
                            </div>
                        ))}
                        </div>
                </div>  
            </div> */}
        </div>
      </div>
    </>
  );
}

// export async function generateMetadata(
//     { params, searchParams }: Props,
//     parent?: ResolvingMetadata,
//   ): Promise<Metadata> {
//     // read route params
//     const id = params.movie;

//     const res= await showtimeAPI.getShowtime(id);
//     const movie=res.data
// console.log("Movie: ", movie)
//     return {
//     title: movie.movie.title
//     };
//   }
// export async function generateStaticParams() {
//   const res= await showtimeAPI.getAllShowtimes();
//   const movies=res.data
//   // console.log("Movies path: ", movies)
//   return movies.map((movie:showtimeInterface) => ({
//     movie: movie.id,
//   }));
// }
