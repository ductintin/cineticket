"use client"
import s from './Film_manager.module.css'
import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import NextIcon from '@mui/icons-material/KeyboardArrowRight'
import BeforeIcon from '@mui/icons-material/KeyboardArrowLeft'
import axios, { AxiosRequestConfig } from 'axios';

import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaTimes} from 'react-icons/fa';
import movieAPI from '@/app/api/movieAPI';
import { ResolvingMetadata, Metadata } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import showtimeAPI from '@/app/api/showtimeAPI';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns'; // Import thư viện date-fns để định dạng ngày tháng
import { showtimeInterface } from '@/app/api/apiResponse';
import { useRouter } from 'next/navigation'
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete, Layout,
} from 'antd';


type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
type Schedule ={
  _id: string;
  showtimeId: string;
  date: string;
  theatre: string;
  time: string[];
  __v: number;
};

type addSchedule ={
  No: number;
  date: string;
  theatre: string;
  time: string[];
};

type films = {
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

  

export default function Film_manager ({params, searchParams}: Props) {

  // id của phim
      const id=params.id
      const user=useSelector((state:any)=> state.auth.login.currentUser)
      const token=user?.token
      console.log('token ne ', token)
      const [films, setfilms] = useState<any>({});
      const router = useRouter();

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

      const stt = async () => {
        const res11= await showtimeAPI.getShowtime(id)
        setfilms(res11.data.movie)
        const res3= await showtimeAPI.getSchebyShowtime(id)
        setAllSche(res3.data)
        setSche(res3.data.slice(0,5))
      }
      useEffect(()=>{
          stt();
      },[])


      const toastOptionsError = {
        position: toast.POSITION.TOP_CENTER as ToastPosition,
        autoClose: 2000, // Thời gian tự động đóng thông báo (ms)
        hideProgressBar: true, // Ẩn thanh tiến trình
        closeOnClick: true, // Đóng thông báo khi nhấp chuột vào nó
        pauseOnHover: true, // Tạm dừng tự động đóng thông báo khi di chuột qua
        draggable: true, // Có thể kéo thông báo
        progress: undefined, // Tùy chọn thanh tiến trình tùy chỉnh (ví dụ: progress: <MyProgressBar />)
        style: {
          color: 'black',
          backgroundColor: '#FFAEA2',
          fontWeight: '500',
        },
        icon: <FaTimes style={{color:'red'}}/>

      };
     
      const toastOptions = {
        position:  toast.POSITION.TOP_CENTER as ToastPosition,
        style: {
          color: 'black',

          backgroundColor: '#8BFF92',
        },
        autoClose: 2000, 
        hideProgressBar: false,
        closeOnClick: true, // 
        pauseOnHover: true, // 
        draggable: true, // 
        progress: undefined, 
      };

      //PART 1
      const [isEditing, setIsEditing] = useState(false);
      const [text, setText] = useState<films>();

      const handleEditClick = () => {
        setText(films);
        setIsEditing(true);
      };
      const handleInputChange1 = (e:any) => {
        setText(e.target.value);
        films.title=e.target.value;
      };
      const handleInputChange2 = (e:any) => {
        setText(e.target.value.split(", "));
        films.genre=e.target.value.split(", ");
      };
      const handleInputChange3 = (e:any) => {
        setText(e.target.value);
        films.director=e.target.value;
      };
      const handleInputChange4 = (e:any) => {
        setText(e.target.value.split(", "));
        films.cast=e.target.value.split(", ");
      };
      const handleInputChange5 = (e:any) => {
        setText(e.target.value);
        films.duration=e.target.value;
      };
      const handleInputChange6 = (e:any) => {
        setText(e.target.value.split(", "));
        films.language=e.target.value.split(", ");
      };
      const handleInputChange7 = (e:any) => {
        setText(e.target.value);
        films.rating=e.target.value;
      };
      const handleInputChange8 = (e:any) => {
        setText(e.target.value);
        films.description=e.target.value;
      };
      const handleSaveClick = async () => {
        const moviedata= {
          title: films?.title,
          image: films?.image,
          language:films?.language,
          genre: films?.genre,
          director: films?.director,
          cast: films?.cast,
          description: films?.description,
          duration: films?.duration,
          rating: films?.rating
        }
        // const id=films?._id
        // setIsEditing(false);
        console.log('movie data ', moviedata)
        try {
          const respond = await movieAPI.createMovie( token,moviedata);
          await router.push(`/admin/movie/${respond.data?.movie._id}`);
          toast.success('Tạo movie thành công!', toastOptions);
        } catch (error) {
          // @ts-ignore
            toast.success('Lỗi!', toastOptionsError);
        }
      };
   
      //PART 2
      const [allsche, setAllSche] = useState<Schedule[]>([]);
      const [sche, setSche] = useState<Schedule[]>([]);
       
        // NúT TRƯỚC
        const handleBefore = () => {
          let page=((allsche.indexOf(sche[0])+1-1)/5)-1
          if (page===-1) {
            console.log("da la trang dau")
            return; 
          }
          console.log('trang truoc: ', page)
          setSche(allsche.slice(0+page*5,5+page*5));
        };
        // Nút SAU
        const handleNext = () => {
          let page=~~(allsche.indexOf(sche[0])/5+1)
          if (page > ~~(allsche.length/5) || (page)*5==allsche.length){
            console.log("da la trang cuoi")
            return; 
          }
          console.log('page sau ne: ', page)
          setSche(allsche.slice(0+page*5,5+page*5));
        };
        

        //PART 3
        const availableTimes = [
          "08:00",
          "08:30",
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
          "18:30",
          "19:00",
          "19:30",
          "20:00",
          "20:30",
          "21:00",
          "21:30",
          "22:00",
          "22:30",
          "23:00",
          "23:30",
          "00:00",
          
        ];
        const [data, setData] = useState<addSchedule[]>([]);
        const handleDeleteRow = (No: number) => {
          setData(prevData => prevData.filter(row => row.No !== No));
        };
      
        const handleChangeField = (id: number, field: keyof addSchedule, value: any) => {
          setData(prevData =>
            prevData.map(row => (row.No === id ? { ...row, [field]: value } : row))
          );
          console.log('Change')
        };  

        //Nút ADD ROW
        const handleAddRow = () => {
          const newRow: addSchedule = {
            date: '', theatre: '', time: [],
            No: data.length + 1
          };
          setData(prevData => [...prevData, newRow]);
        };

        //Nút SAVE
        const handleSaveSche = async (No: number) => {   
          const i = data.findIndex(item => item.No === No);    
          const schedata= {
            date: data[i].date.replace(/-/g, "/"),
            showtimeId: id,
            theatre: data[i].theatre,
            time:  data[i].time}           
          try {
            const respond = await showtimeAPI.postSchedule(schedata, token);
            toast.success('Thêm thành công!', toastOptions);
            const old=data.filter((element, index) => index !== i);
            setData(old)
          } catch (error) {
            toast.success('Lỗi!', toastOptionsError);
          }
        };

    return (
        <Layout>

      {/*<div className={s.title}>*/}
      {/*  <div>*/}
      {/*    {isEditing ? (*/}
      {/*      <input className={s.name} type="text" value={text?.title} />*/}
      {/*    ) : (*/}
      {/*      <div>*/}
      {/*        {*/}
      {/*          (!films ) ? */}
      {/*          <div></div>:<div className={s.name}>{films.title}</div>*/}
      {/*        }*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</div>*/}


        <Form {...formItemLayout} className="mx-10">
            <Form.Item label="Title">
                <Input value={text?.title} onChange={handleInputChange1}/>
            </Form.Item>
            <Form.Item label="Genre">
                <Input value={text?.genre} onChange={handleInputChange2}/>
            </Form.Item>
            <Form.Item label="Director">
                <Input value={text?.director} onChange={handleInputChange3}/>
            </Form.Item>
            <Form.Item label="Cast">
                <Input value={text?.cast} onChange={handleInputChange4}/>
            </Form.Item>
            <Form.Item label="Duration">
                <Input value={text?.duration} onChange={handleInputChange5}/>
            </Form.Item>
            <Form.Item label="Language">
                <Input value={text?.language} onChange={handleInputChange6}/>
            </Form.Item>
            <Form.Item label="Rating">
                <Input value={text?.rating} onChange={handleInputChange7}/>
            </Form.Item>
            <Form.Item label="Description">
                <Input value={text?.description} onChange={handleInputChange8}/>
            </Form.Item>

        </Form>

        <Layout>
            <Button onClick={handleSaveClick} className=" mx-auto bg-blue-600">
                Save
            </Button>
        </Layout>


      {/*<div className={s.flex}>*/}
      {/*  <div className={s.info}> Title: </div>*/}
      {/*  <div>*/}
      {/*      <input className={s.data} type="text" value={text?.title} onChange={handleInputChange1} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className={s.flex}>*/}
      {/*  <div className={s.info}> Genre: </div>*/}
      {/*  <div>*/}
      {/*      <input className={s.data} type="text" value={text?.genre} onChange={handleInputChange2} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className={s.flex}>*/}
      {/*  <div className={s.info}> Director: </div>*/}
      {/*  <div>*/}
      {/*      <input className={s.data} type="text" value={text?.director} onChange={handleInputChange3} />*/}

      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className={s.flex}>*/}
      {/*  <div className={s.info}> Cast: </div>*/}
      {/*  <div>*/}
      {/*      <input className={s.data} type="text" value={text?.cast} onChange={handleInputChange4} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className={s.flex}>*/}
      {/*  <div className={s.info}> Duration: </div>*/}
      {/*  <div>*/}
      {/*      <input className={s.data} type="text" value={text?.duration} onChange={handleInputChange5} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className={s.flex}>*/}
      {/*  <div className={s.info}> Language: </div>*/}
      {/*  <div>*/}
      {/*      <input className={s.data} type="text" value={text?.language} onChange={handleInputChange6} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className={s.flex}>*/}
      {/*  <div className={s.info}> Rating: </div>*/}
      {/*  <div>*/}
      {/*      <input className={s.data} type="text" value={text?.rating} onChange={handleInputChange7} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className={s.flex}>*/}
      {/*  <div className={s.info}> Description: </div>*/}
      {/*  <div>*/}
      {/*      <input className={s.data} type="text" value={text?.description} onChange={handleInputChange8} />*/}
      {/*  </div>*/}
      {/*</div>*/}

        <ToastContainer />
        </Layout>
    );
}


