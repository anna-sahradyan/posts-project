import React, {useEffect, useState} from 'react';
import s from './TableList.module.scss';
import Table from 'react-bootstrap/Table';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useDispatch, useSelector} from "react-redux";
import {fetchAsyncGetPosts, selectPost} from "../../store/postSlice";
import TableBox from "../../components/tableBox";
import {Pagination, PaginationItem,Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import InputContainer from "../../components/search/InputConteiner";


const TableList = () => {
    const location = useLocation();
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState(parseInt(location.search?.split('=')[1] || 0));
    const postsPerPage = 10;
    const pagesVisited = page * postsPerPage + 1;
    const dispatch = useDispatch();
    const posts = useSelector(selectPost);
    const [sortPost, setSortPost] = useState([]);
    const [order, setOrder] = useState('ASC');
    const [flag, setFlag] = useState(false)
    const pageCount = Math.ceil(posts.length / postsPerPage - 1);
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
    console.log(itemSearch);
    //!get posts
    useEffect(() => {
        dispatch(fetchAsyncGetPosts());
    }, [dispatch]);

    //!sort posts
    const handleClick = (field) => {
        const copySort = posts.concat();
        setSortPost(copySort);
        const sortData = copySort.sort((a, b) => {
            const title = a[field].toLowerCase() < b[field].toLowerCase();
            const postTitle = b[field].toLowerCase() > a[field].toLowerCase();

            return title || postTitle ? 1 : -1;
        });
        console.log(sortData)
        setSortPost(sortData)
        setFlag(true);
    }


//!next
    const increment = () => {
        setPage(prev => prev + 1);

    }
    //!prev
    const decrement = () => {
        setPage((page) => page - 1);

    }
    //!pagination
    const handleChange = (event, value) => {
        setPage(value);

    }

    return (<>
        <div className={s.contentDiv}>
            <div className={s.content}>
                {/*!partInput*/}
                <div className={s.input}>
                    <InputContainer inputValue={inputValue} setInputValue={setInputValue}/>
                </div>
                <div className={s.tableContainer}>
                    <Table striped bordered hover className={s.table}>
                        <thead>
                        <tr className={s.thead}>
                            <th>ID <ArrowDropDownIcon/></th>
                            <th>Заголовок <ArrowDropDownIcon onClick={() => handleClick('title')}/></th>
                            <th>Описание <ArrowDropDownIcon/></th>
                        </tr>
                        </thead>
                    </Table>




                    {flag ? (itemsSort.map((item, index) => <TableBox key={`${item}_${index}`} title={item.title}
                                                                      id={item.id}
                                                                      body={item.body}/>)) : (itemsPosts.map((item, index) =>
                        <TableBox key={`${item}_${index}`} title={item.title} id={item.id} body={item.body}/>))}
                    {/*!partInputContainer */}
                    {(inputValue !== '') && itemSearch.map((item, index) => <TableBox key={`${item}_${index}`}
                                                                                      title={item.title}
                                                                                      id={item.id}
                                                                                      body={item.body}/>)}
                </div>
                {/*!partPagination*/}
                <div className={s.page}>
                    <Pagination
                        page={page}
                        count={10}
                        onChange={handleChange}

                        renderItem={(item) => (<PaginationItem
                            component={Link}
                            to={`/post${item.page === 1 ? '' : `?page=${item.page}`}`}
                            {...item}
                        />)}
                    />
                    <Typography style={{
                        position: "absolute", left: "-300px",

                        fontWeight: "bold"
                    }} onClick={decrement}>Назад</Typography>
                    <Typography style={{position: "absolute", left: "500px", fontWeight: "bold"}}
                                onClick={increment}>Далее</Typography>


                </div>
            </div>
        </div>
    </>);
};

export default TableList;