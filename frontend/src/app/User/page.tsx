"use client"
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect,useState } from 'react'
import styles from './User.module.css'
import {movie_img} from '@/assets/imgs'
import Image from 'next/image'
import movieAPI from "@/app/api/movieAPI";
import { movieInterface } from "@/app/api/apiResponse";
import { useSelector } from "react-redux";

export default function User (){

  const user = useSelector((state: any) => state.auth.login.currentUser);
  console.log(user); // Kiểm tra thông tin người dùng trong console log


  const [movies, pickMovies] = useState<any[]>([]);

  const reser = async () => {
    const Reservation = await movieAPI.getAllReservationByUserId(user?.user._id,user?.token);
    console.log("res: ", Reservation);
    pickMovies(Reservation.data.tickets); // Update movies state with the tickets array
  };

    // const reser = async () => {
    // const Reservation = await movieAPI.getAllTicketsByReservation(`${user?.user?._id}`);
    // const Reservation = await movieAPI.getIdTest();
    // console.log("res: ", Reservation);
    // pickMovies(Reservation.data);

    // }
    
    useEffect(()=>{
        reser();
    },[])

    return(
        <div className={styles.body}>
            <div className={styles.Box1}>
                <div className={styles.ibox}>


                    <div className={styles.name}> {user?.user?.name}</div>

                    <div className={styles.infoList}>
                        <div className={styles.row}>
                            <div>
                            <span className={styles.label}>Số điện thoại:</span>
                            </div>
                            <div>
                            <span>{user?.user?.phone}</span>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div>
                            <span className={styles.label}>Email:</span>
                            </div>
                            <div>
                            <span>{user?.user?.email}</span>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div>
                            <span className={styles.label}>Vai trò:</span>
                            </div>
                            <div>
                            <span>{user?.user?.role}</span>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div>
                            <span className={styles.label}>User Name:</span>
                            </div>
                            <div>
                            <span>{user?.user?.username}</span>
                            </div>
                        </div>
                        </div>
                </div>
                {/*<Image className={styles.pic} src={movie_img} alt='er'></Image>*/}
            </div>



            { <div className={styles.body}>
                    <div className={styles.Box2}>
                    <div className={styles.hbox}>

                        {movies.length > 0 ? (
                            <table className="table-auto mx-auto bg-white shadow-lg rounded-lg">
                                <thead>
                                <tr>
                                    <th className="border border-slate-600 p-2">Tên phim</th>
                                    <th className="border border-slate-600 p-2">Tên rạp</th>
                                    <th className="border border-slate-600 p-2">Ngày xem</th>
                                    <th className="border border-slate-600 p-2">Giờ chiếu</th>
                                    <th className="border border-slate-600 p-2">Ghế ngồi</th>
                                    <th className="border border-slate-600 p-2">Chi Tiết</th>
                                </tr>
                                </thead>
                                <tbody>
                                {movies.map((movie) => (
                                    <tr key={movie._id}>
                                        <td className="border border-slate-700 p-2 text-center">{movie.movieTitle}</td>
                                        <td className="border border-slate-700 p-2 text-center">{movie.theatre}</td>
                                        <td className="border border-slate-700 p-2 text-center">
                                            {(() => {
                                                const variable = new Date(movie.date);
                                                return variable.getDate() + "/" + (variable.getMonth()+ 1) + "/" + variable.getFullYear()  ;
                                            })()}
                                        </td>
                                        <td className="border border-slate-700 p-2 text-center">{movie.time}</td>
                                        <td className="border border-slate-700 p-2 text-center">{movie.seatPosition.map((pos:any, index:number) =>{
                                            return pos;
                                        }).join("-")}</td>
                                        <td className="border border-slate-700 p-2 text-center"><a href={`/User/reservation/${movie.reservationId}`}>Chi tiết</a></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No movies available.</p>
                        )}
                
                    </div>

                    <div className={styles.his}>
                            Lịch sử xem phim
                    </div>
                </div>
                </div>}


            




        </div>
    )
}
