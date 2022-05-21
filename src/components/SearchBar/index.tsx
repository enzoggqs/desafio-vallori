import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'

interface SearchBarProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ setSearch }: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState('');

    function searchTitle(e: React.ChangeEvent<any>){
        e.preventDefault();
        setSearch(searchValue);
    }
    return (
        <Paper
            component="form"
            sx={{ marginTop:10, p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}
            onSubmit={searchTitle}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, color:'#6283a3', height: 55, fontSize: 20}}
                placeholder="Pesquise Por Títulos"
                onChange={(e) => {setSearchValue(e.target.value)}}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchBar
