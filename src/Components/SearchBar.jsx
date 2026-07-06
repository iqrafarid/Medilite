import {useState} from 'react';


function SearchBar({onSearch}){

    const [inputValue,setInputValue] = useState('');

    function handleInputChange(e){
        setInputValue(e.target.value);
        onSearch(e.target.value);
    }

    return(
        <div>
            <input type="text" placeholder="Search for medicines..." value={inputValue} onChange={handleInputChange}/>
            <button onClick={()=>onSearch(inputValue)}>Search</button>
        </div>
    )
}
        

export default SearchBar;