"use client"
import React from "react";
import styles from "./Sidebar.module.css"
import { help_ad, home_ad, logo_ad, movie_ad, msg_ad, person_ad, pwd_ad, setting_ad, signout_ad } from "@/assets/svgs";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux/apiRequests";
import axios from "axios";
import { useRouter } from "next/navigation";
import { log } from "console";
export default function Sidebar (){
    const dispatch =useDispatch()
    const router =useRouter()
    const user= useSelector((state:any)=>state.auth.login.currentUser)
    const handleSignoutBtn=()=>{
        logOut(dispatch,user?.user?._id,user?.token, axios,router)
    }

    return(
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <Image width={40}height={40}src={logo_ad} alt="" className={styles.header_icon}/>
                US Happy 
            </div>
            <div className={styles.menu}>
                <div className={styles.menu_item}>
                    <Image  className={styles.icon} width={30}height={30}src={home_ad} alt=""/>
                    Dashboard</div>
                <div className={`${styles.menu_item} ${styles.menu_item_focus_custom}`} onClick={()=>router.push("/admin/movie")}>
                    <Image  className={styles.icon} width={30}height={30}src={movie_ad} alt=""/>
                    Movies</div>
                <div className={styles.menu_item} onClick={()=>router.push("/admin/schedule")}>
                    <Image  className={styles.icon} width={30}height={30}src={person_ad}  alt=""/>
                    Schedules</div>
                <div className={styles.menu_item}>
                    <Image  className={styles.icon} width={30}height={30}src={msg_ad} alt=""/>
                    Messages</div>
                <div className={styles.menu_item}>
                    <Image  className={styles.icon} width={30}height={30}src={setting_ad} alt=""/>
                    Settings</div>
                <div className={styles.menu_item}>
                    <Image  className={styles.icon} width={30}height={30}src={pwd_ad} alt=""/>
                    Password</div>
                <div className={styles.menu_item}>
                    <Image  className={styles.icon} width={30}height={30}src={help_ad} alt=""/>
                    Help</div>
                <div className={styles.menu_item} onClick={()=>handleSignoutBtn()}>
                    <Image  className={styles.icon} width={30}height={30}src={signout_ad} alt=""/>
                    Sign out</div>
            </div>
        </div>
    )
}