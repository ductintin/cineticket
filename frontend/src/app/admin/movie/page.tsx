/* eslint-disable react/jsx-key */
"use client"
import React, { useEffect, useState } from "react";
import styles from "./Movies.module.css"
import { add_ad, create, edit, help_ad, home_ad, logo_ad, movie_ad, msg_ad, person_ad, pwd_ad, search_ad, setting_ad, signout_ad } from "@/assets/svgs";
import Image from "next/image";
import Header_admin from "@/components/Admin_page/Header_admin/Header_admin";
import { movieInterface } from "@/app/api/apiResponse";
import movieAPI from "@/app/api/movieAPI";
import { useSelector } from "react-redux";
import  Link  from "next/link";
import {visit} from "yaml/dist/parse/cst-visit";
import itemAtPath = visit.itemAtPath;
import {Button, Menu, Table} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import { useRouter } from "next/navigation";


export default function Movies_Admin (){
    const [movies, setMovies] = useState<movieInterface[]>([])
    const user = useSelector((state: any)=>state.auth.login.currentUser)
    console.log("user", user?.token)
    const tabname=["All", "Now Showing", "Coming Soon"]
    const [tabidx, setTabidx]=useState(0)
    const [dataSource, setDataSource] = useState<any[]>([]);
    const fetchMovies = async (opt: Number) => {
        try {
            switch (opt) {
                case 0:
                    const res = await movieAPI.getAllMovies(user?.token);
                    setMovies(res.data);
                    const db1 = res.data.map((item: { _id: any; title: any; language: any[]; genre: any[]; director: any; cast: any[]; duration: any; rating: any; }) => ({
                        id: item._id,
                        title: item.title,
                        language: item.language.map(lg => lg).join(","),
                        genre: item.genre.map(g => g).join(","),
                        director: item.director,
                        cast: item.cast.map(c => c).join(","),
                        duration: item.duration,
                        rating: item.rating,
                        action: "Update"
                    }));
                    setDataSource([...db1]);
                    break;
                case 1:
                    const res1 = await movieAPI.getNowShowingMovies();
                    // @ts-ignore
                    setMovies(res1.data.map(item=> item.movieId));
                    const db2 = res1.data.map(item=> item.movieId).map((item: { _id: any; title: any; language: any[]; genre: any[]; director: any; cast: any[]; duration: any; rating: any; }) => ({
                        id: item._id,
                        title: item.title,
                        language: item.language.map(lg => lg).join(","),
                        genre: item.genre.map(g => g).join(","),
                        director: item.director,
                        cast: item.cast.map(c => c).join(","),
                        duration: item.duration,
                        rating: item.rating,
                        action: "Update"
                    }));
                    setDataSource([...db2]);

                    break;
                case 2:
                    const res3 = await movieAPI.getUpComingMovies();
                    // @ts-ignore
                    setMovies(res3.data.map(item=> item.movieId));
                    const db3 = res3.data.map(item=> item.movieId).map((item: { _id: any; title: any; language: any[]; genre: any[]; director: any; cast: any[]; duration: any; rating: any; }) => ({
                        id: item._id,
                        title: item.title,
                        language: item.language.map(lg => lg).join(","),
                        genre: item.genre.map(g => g).join(","),
                        director: item.director,
                        cast: item.cast.map(c => c).join(","),
                        duration: item.duration,
                        rating: item.rating,
                        action: "Update"
                    }));
                    setDataSource([...db3]);
                    break;
            }

        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }


    useEffect(()=>{
        fetchMovies(0)
    },[])

    const handleCreateBtn=(id: string)=>{

    }

    const route = useRouter();
    const addMovie = () => {
        const link = `/admin/movie/new`;
        route.push(link);
    }

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
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Director',
            dataIndex: 'direction',
            key: 'direction',
        },
        {
            title: 'Cast',
            dataIndex: 'cast',
            key: 'cast',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    const handleClick=async (index: number) => {
        setTabidx(index)
        fetchMovies(index);
        // switch (index) {
        //     case 0:
        //
        //         break;
        //     case 1:
        //         const res1 = await movieAPI.getNowShowingMovies();
        //         // @ts-ignore
        //         setMovies(res1.data.map(item=> item.movieId))
        //
        //         break;
        //     case 2:
        //         const res3 = await movieAPI.getUpComingMovies();
        //         // @ts-ignore
        //         setMovies(res3.data.map(item=> item.movieId))
        //         break;
        // }
    }
    return(
    <div>
        {/*<div className={styles.navbar}>*/}
        {/*    <ul className={styles.nav_list}>*/}
        {/*        {tabname.map((e, index)=> e===tabname[tabidx]?(<li className={styles.nav_item_curr} >{e}</li>): (<li className={styles.nav_item} onClick={()=>handleClick(index)}>{e}</li>))}*/}
        {/*      */}
        {/*    </ul>*/}
        {/*    /!*<div className={styles.search_bar_nav}>*!/*/}
        {/*    /!*    <Image src={search_ad} alt="" width={15} height={15} className={styles.search_bar_nav_icon}/>*!/*/}
        {/*    /!*    <input type="text" placeholder="Enter movie name to search movie. . ." className={styles.input} />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*</div>*/}

        <Menu mode="horizontal">
            {tabname.map((e, index)=> e===tabname[tabidx]?
                ( <Menu.Item key={e} icon={<HomeOutlined/>} onClick={() => handleClick(index)}>
                    {e}
                </Menu.Item>):
                (<Menu.Item key={e} icon={<HomeOutlined/>} onClick={() => handleClick(index)}>
                    {e}
                </Menu.Item>))}

            {/*<Menu.Item key="movie" icon={<HomeOutlined/>} onClick={() => handleMenuClick('movies')}>*/}
            {/*    Movies*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="movie" icon={<HomeOutlined/>} onClick={() => handleMenuClick('movies')}>*/}
            {/*    Movies*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="movie" icon={<HomeOutlined/>} onClick={() => handleMenuClick('movies')}>*/}
            {/*    Movies*/}
            {/*</Menu.Item>*/}
        </Menu>

        <Button className="bg-amber-400 m-4" onClick={e => { e.stopPropagation(); addMovie()}}>Add movie </Button>
        <Table columns={columns} dataSource={dataSource} />

        {/*<div className={styles.movies_part}>*/}
        {/*    /!* filter to date *!/*/}
        {/*    <div className={styles.header}>*/}
        {/*        /!*<div className={styles.addmovie}>*!/*/}
        {/*        /!*    <Link href={`/admin/movie/new`}><Image src={add_ad} alt="" width={15} height={15}/> Add movie</Link>*!/*/}
        {/*        /!*</div>*!/*/}
        {/*        /!*<div className={styles.timing}> Start:   </div>*!/*/}
        {/*        /!*<div className={styles.header__date}>31/07/2022</div>*!/*/}

        {/*        /!*<div className={styles.timing}>End:      </div>*!/*/}
        {/*        /!*<div className={styles.header__date}>31/07/2022</div>*!/*/}


        {/*    </div>*/}

        {/*    <Button type="primary" className="text-black bg-amber-400" onClick={e => { e.stopPropagation(); addMovie()}}>Add movie</Button>*/}

        {/*    /!* table *!/*/}
        {/*    <div className={styles.movies_table}>*/}
        {/*        <div className={styles.movies_table_header}>*/}
        {/*            <div className={styles.movies_table_col}>No.</div>*/}
        {/*            <div className={styles.movies_table_col}>Title</div>*/}
        {/*            <div className={styles.movies_table_col}>Genre</div>*/}
        {/*            <div className={styles.movies_table_col}>Director</div>*/}
        {/*            <div className={styles.movies_table_col}>Cast</div>*/}
        {/*            <div className={styles.movies_table_col}>Duration</div>*/}
        {/*            <div className={styles.movies_table_col}>Language</div>*/}
        {/*            <div className={styles.movies_table_col}>Rating</div>*/}
        {/*            <div className={styles.movies_table_col}>Actions</div>*/}
        {/*        </div>*/}
        {/*        <div className={styles.movies_table_rows}>*/}
        {/*          */}
        {/*           {movies.map((movie:movieInterface, index)=>(*/}
        {/*            // eslint-disable-next-line react/jsx-key*/}
        {/*            <div className={styles.movies_table_row}>*/}
        {/*                <div className={styles.movies_table_col}>{index +1}</div>*/}
        {/*                <div className={styles.movies_table_col}>{movie.title}</div>*/}
        {/*                <div className={styles.movies_table_col}>{movie.genre[0]}</div>*/}
        {/*                <div className={styles.movies_table_col}>{movie.director}</div>*/}
        {/*                <div className={styles.movies_table_col}>{movie.cast[0]}, {movie.cast[1]}</div>*/}
        {/*                <div className={styles.movies_table_col}>{movie.duration}</div>*/}
        {/*                <div className={styles.movies_table_col}>{movie.language.map((lang, index)=> index===movie.language.length-1?<>{lang} </>:<>{lang}, </> )}</div>*/}
        {/*                <div className={styles.movies_table_col}>{movie.rating}</div>*/}
        {/*                <div className={styles.movies_table_col}>*/}
        {/*                    <Link href={`/admin/movie/${movie._id}`}><Image src={edit} alt="" width={15} height={15}/></Link>*/}
        {/*                    /!*<Image src = {create} alt =" " width={15} height={15} onClick={()=> handleCreateBtn(movie._id)}/>*!/*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*           ))}*/}
        {/*        </div>*/}
        {/*            */}
        {/*        </div>    */}
        {/*    </div>*/}
    </div>
    )
}