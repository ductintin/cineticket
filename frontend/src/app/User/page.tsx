"use client"
import React, { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect,useState } from 'react'
import styles from './User.module.css'
import {movie_img} from '@/assets/imgs'
import Image from 'next/image'
import movieAPI from "@/app/api/movieAPI";
import { movieInterface } from "@/app/api/apiResponse";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Form, Input, Table} from "antd";
import {Content} from "antd/es/layout/layout";
import { logOut } from "@/redux/apiRequests";
import {useRouter} from "next/navigation";
import axios from "axios";
export default function User (){

  const user = useSelector((state: any) => state.auth.login.currentUser);
  console.log(user); // Kiểm tra thông tin người dùng trong console log
    const dispatch =useDispatch()
    const router =useRouter()
  const [movies, pickMovies] = useState<any[]>([]);
    const [dataSource, setDataSource] = useState<any[]>([]);

  const reser = async () => {
    const Reservation = await movieAPI.getAllReservationByUserId(user?.user._id,user?.token);
    console.log("res: ", Reservation);
    pickMovies(Reservation.data.tickets);

      const db1 = Reservation.data.tickets.map((item) => ({
          id: item.reservationId,
          title: item.movieTitle,
          theatre: item.theatre,
          date: new Date(item.date).toLocaleDateString("en-GB"),
          time: item.time,
          seat: item.seatPosition.map(lg => lg).join(","),
          price: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price),
          //detail: "Chi tiết"
      }));
      setDataSource([...db1]);
    // Update movies state with the tickets array
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

    const formItemLayout = {
        labelCol: {
            xs: { span: 20 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 20 },
            sm: { span: 10 },
        },
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Theatre',
            dataIndex: 'theatre',
            key: 'theatre',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Seat',
            dataIndex: 'seat',
            key: 'seat',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
            render: (text, record) => (
                <a href={`/User/reservation/${record.id}`}>Chi tiết</a>
            ),
        },
    ];


    const logout = () =>{
        logOut(dispatch,user?.user?._id,user?.token, axios,router);
    }

    return(
        <>

            <Card className="flex-col">
                <Content className="bg-green-300 text-center text-2xl">{user?.user.name}</Content>
                <Form {...formItemLayout} className="mx-20 my-10">
                    <Form.Item label="Số điện thoại">
                        <Input value={user?.user?.phone} disabled={true}/>
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input value={user?.user?.email} disabled={true}/>
                    </Form.Item>
                    <Form.Item label="Vai trò">
                        <Input value={user?.user?.role} disabled={true}/>
                    </Form.Item>
                    <Form.Item label="Username" >
                        <Input value={user?.user?.username} disabled={true}/>
                    </Form.Item>
                    <Button onClick={logout} className="bg-red-400">Đăng xuất</Button>
                </Form>
                <Content className="bg-amber-500 text-center text-2xl">Lịch sử đặt vé</Content>
                <Table columns={columns} dataSource={dataSource} />

            </Card>

        </>


        // <div className={styles.body}>
        //     <div className={styles.Box1}>
        //         <div className={styles.ibox}>
        //
        //
        //             <div className={styles.name}> {user?.user?.name}</div>
        //
        //             <div className={styles.infoList}>
        //                 <div className={styles.row}>
        //                     <div>
        //                     <span className={styles.label}>Số điện thoại:</span>
        //                     </div>
        //                     <div>
        //                     <span>{user?.user?.phone}</span>
        //                     </div>
        //                 </div>
        //                 <div className={styles.row}>
        //                     <div>
        //                     <span className={styles.label}>Email:</span>
        //                     </div>
        //                     <div>
        //                     <span>{user?.user?.email}</span>
        //                     </div>
        //                 </div>
        //
        //                 <div className={styles.row}>
        //                     <div>
        //                     <span className={styles.label}>Vai trò:</span>
        //                     </div>
        //                     <div>
        //                     <span>{user?.user?.role}</span>
        //                     </div>
        //                 </div>
        //
        //                 <div className={styles.row}>
        //                     <div>
        //                     <span className={styles.label}>User Name:</span>
        //                     </div>
        //                     <div>
        //                     <span>{user?.user?.username}</span>
        //                     </div>
        //                 </div>
        //                 </div>
        //         </div>
        //         {/*<Image className={styles.pic} src={movie_img} alt='er'></Image>*/}
        //     </div>
        //
        //
        //
        //     { <div className={styles.body}>
        //             <div className={styles.Box2}>
        //             <div className={styles.hbox}>
        //
        //                 {movies.length > 0 ? (
        //                     <table className="table-auto mx-auto bg-white shadow-lg rounded-lg">
        //                         <thead>
        //                         <tr>
        //                             <th className="border border-slate-600 p-2">Tên phim</th>
        //                             <th className="border border-slate-600 p-2">Tên rạp</th>
        //                             <th className="border border-slate-600 p-2">Ngày xem</th>
        //                             <th className="border border-slate-600 p-2">Giờ chiếu</th>
        //                             <th className="border border-slate-600 p-2">Ghế ngồi</th>
        //                             <th className="border border-slate-600 p-2">Chi Tiết</th>
        //                         </tr>
        //                         </thead>
        //                         <tbody>
        //                         {movies.map((movie) => (
        //                             <tr key={movie._id}>
        //                                 <td className="border border-slate-700 p-2 text-center">{movie.movieTitle}</td>
        //                                 <td className="border border-slate-700 p-2 text-center">{movie.theatre}</td>
        //                                 <td className="border border-slate-700 p-2 text-center">
        //                                     {(() => {
        //                                         const variable = new Date(movie.date);
        //                                         return variable.getDate() + "/" + (variable.getMonth()+ 1) + "/" + variable.getFullYear()  ;
        //                                     })()}
        //                                 </td>
        //                                 <td className="border border-slate-700 p-2 text-center">{movie.time}</td>
        //                                 <td className="border border-slate-700 p-2 text-center">{movie.seatPosition.map((pos:any, index:number) =>{
        //                                     return pos;
        //                                 }).join("-")}</td>
        //                                 <td className="border border-slate-700 p-2 text-center"><a href={`/User/reservation/${movie.reservationId}`}>Chi tiết</a></td>
        //                             </tr>
        //                         ))}
        //                         </tbody>
        //                     </table>
        //                 ) : (
        //                     <p>No movies available.</p>
        //                 )}
        //
        //             </div>
        //
        //             <div className={styles.his}>
        //                     Lịch sử xem phim
        //             </div>
        //         </div>
        //         </div>}
        //
        // </div>
    )
}
