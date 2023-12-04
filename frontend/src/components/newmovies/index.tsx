"use client"
import axios from "axios";
import React,{useState, useEffect, FC} from "react";

// import {useSelector, useDispatch, Provider} from "react-redux"

import { getUsersData } from "@/app/state/actions/userActions";

import Loader from "../loader";
import { Underdog } from "next/font/google";
// import { store } from "@/app/state/store/store";
import { AppProps } from "next/app";
import Footer from "../footer/footer";
import Header from "../header/header";
import { store } from "@/app/state/store/store";
import { useSelector, useDispatch, Provider } from "react-redux";

 function NewMovies  (){
    const users=useSelector((state: any)=> state?.users).UsersData
    const dispatch=useDispatch();
    const fetchUsers=async() =>{
        await axios.get("https://gokisoft.com/api/fake/1395/movies/nowShowing")
        .then((res)=>{
            dispatch(getUsersData(res.data))
            console.log(res.data)
        })
    }
    useEffect(()=>{
        fetchUsers();
    },[])
    // console.log("res: ",users.UsersData)

    return (
        <>
        <h1>Phim moi</h1>\
        {
            (!users && users == undefined)? 
            <> 
            <Loader/>
            </>
            :
            users.map((user:any)=> {
                return(
                    <>
                    <h3>Name: {user.title}</h3>
                    </>
                )
            })
        }
        </>
    )

}


const App: FC = () => {
    // const router = useRouter();
    // useEffect(() => {
    //     const handleRouteChange = (url) => {
    //         gtag.pageview(url);
    //     };
    //     router.events.on('routeChangeComplete', handleRouteChange);
    //     return () => {
    //         router.events.off('routeChangeComplete', handleRouteChange);
    //     };
    // }, [router.events]);
  
    return (
    //   <Provider store={store}>
          <NewMovies/>
    //   </Provider>
    );
  };
  export default App;
