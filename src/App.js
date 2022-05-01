import React from 'react';
import TableList from "./container/table/TableList";
import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";

const App = () => {
    return (<>
        <div className={'wrapper'}>
            <div className={'main'}>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/post'} element={ <TableList/>}/>


                </Routes>

            </div>
        </div>
    </>);
};

export default App;