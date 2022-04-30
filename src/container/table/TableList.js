import React, {useEffect, useState} from 'react';
import s from './TableList.module.scss';
import Table from 'react-bootstrap/Table';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useDispatch, useSelector} from "react-redux";
import {fetchAsyncGetPosts, fetchAsyncGetPostsId, selectPost} from "../store/postSlice";
import TableBox from "../components/tableBox";
import {Pagination, Stack, Typography} from "@mui/material";
import {brown} from "@mui/material/colors";
import {useParams} from "react-router-dom";
import SearchList from "./search/SearchList";
import ReactPaginate from "react-paginate";


const TableList = () => {
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState(0);
    const postsPerPage = 10;
    const pagesVisited = page * postsPerPage + 1;
    const dispatch = useDispatch();
    const posts = useSelector(selectPost);
    const [sortPost, setSortPost] = useState([]);
    const [flag, setFlag] = useState(false)
    const pageCount = Math.ceil(posts.length / postsPerPage - 1);
    const handleChange = (event, value) => {
        setPage(value);
    }
    let itemsSort = sortPost.slice(pagesVisited, pagesVisited + postsPerPage).map((item) => {
        return {...item}
    });
    let itemsPosts = posts.slice(pagesVisited, pagesVisited + postsPerPage).map((item) => {
        return {...item}
    });
    //!search

    let search = posts.filter((item) => {
        if (inputValue === '') {
            return item;
        } else if (item.title.toLowerCase().includes(inputValue.toLowerCase())) {

            return item;
        }

    });
    let itemSearch = search.slice(pagesVisited, pagesVisited + postsPerPage).map((item) => {
        return {...item}
    });
    console.log(itemSearch)
    //!get posts
    useEffect(() => {
        dispatch(fetchAsyncGetPosts());
    }, [dispatch]);
    //!sort posts
    const handleClick = (field) => {
        const copySort = posts.concat();
        setSortPost(copySort);
        const sortData = copySort.sort((a, b) => {
            const title = a[field] > b[field];
            const postTitle = a[field] > b[field];
            return title || postTitle ? 1 : -1;
        });
        setSortPost(sortData);
        setFlag(true);
    }
//!next
    const increment = () => {
        setPage(prev => prev + 1);
        return setPage(prev=>prev-1);
    }
    //!prev
    const decrement = () => {
        setPage(prev => prev - 1);
        return setPage(prev=>prev-1);


    }


    const changePage = ({ selected }) => {
        setPage(selected);
    };
    return (
        <>
            <div className={s.contentDiv}>
                <div className={s.content}>
                    <div className={s.input}>
                        <SearchList inputValue={inputValue} setInputValue={setInputValue}/>
                    </div>
                    <div className={s.tableContainer}>
                        <Table striped bordered hover className={s.table}>
                            <thead>
                            <tr className={s.thead}>
                                <th>ID <ArrowDropDownIcon/></th>
                                <th>Заголовок <ArrowDropDownIcon onClick={() => handleClick(posts.title)}/></th>
                                <th>Описание <ArrowDropDownIcon/></th>
                            </tr>
                            </thead>
                        </Table>
                        {flag ? (itemsSort.map((item, index) => <TableBox key={`${item}_${index}`} title={item.title}
                                                                          id={item.id}
                                                                          body={item.body}/>)) : (itemsPosts.map((item, index) =>
                            <TableBox key={`${item}_${index}`} title={item.title} id={item.id} body={item.body}/>))}
                        {/*!partInput*/}
                        {inputValue !== '' && itemSearch.map((item, index) => <TableBox key={`${item}_${index}`}
                                                                                        title={item.title}
                                                                                        id={item.id}
                                                                                        body={item.body}/>)}
                    </div>
                    <div className={s.partPosts}>

                    </div>
                    <div className={s.page}>
                        {/*<ReactPaginate*/}
                        {/*    previousLabel={"Prev"}*/}
                        {/*    nextLabel={"Next"}*/}
                        {/*    pageCount={pageCount}*/}
                        {/*    onPageChange={changePage}*/}
                        {/*    containerClassName={"paginationBttns"}*/}
                        {/*    previousLinkClassName={"previousBttn"}*/}
                        {/*    nextLinkClassName={"nextBttn"}*/}
                        {/*    disabledClassName={"paginationDisabled"}*/}
                        {/*     activeClassName={"paginationActive"}*/}
                        {/*/>*/}
                        <Stack spacing={2}>
                            <Typography style={{
                                position: "absolute",
                                left: "-400px",
                                top: '20px',
                                fontWeight: "bold"
                            }} onClick={increment}>Next</Typography>

                            <Pagination count={10} page={page} onChange={handleChange} sx={{
                                color: brown[800], '&.Mui-checked': {
                                    color: brown[600],
                                },
                            }}

                            />

                            <Typography style={{position: "absolute", left: "550px", fontWeight: "bold"}}
                                        onClick={decrement}>Prev</Typography>
                        </Stack>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TableList;