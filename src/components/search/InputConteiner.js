import React from 'react';
import {Box,  TextField} from "@mui/material";



const SearchList = ({inputValue, setInputValue, handelPress}) => {

    return (
        <>
            <form>
                <Box
                    sx={{
                        width: 700, maxWidth: '100%',
                    }}
                >
                    <TextField fullWidth label="Поиск" id="fullWidth"
                               style={{backgroundColor: '#5A5C66', marginLeft: "100px", marginTop: "10px"}}
                               autoFocus
                               value={inputValue}
                               onChange={(e) => setInputValue(e.target.value)}
                               onKeyPress={handelPress}
                    />


                </Box>
            </form>

        </>
    );
};

export default SearchList;