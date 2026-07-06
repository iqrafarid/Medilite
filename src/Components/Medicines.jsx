import MedicineCard from "./MedicineCard";
import './Medicines.css'
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";

function Medicines({onAddToCart,medicines,loading}){


const [query, setQuery] = useState("")
const [filtered, setFiltered] = useState([])


useEffect(()=>{

  const result=medicines.filter(med=>med.name.toLowerCase().includes(query.toLowerCase()))

  setFiltered(result)

},[query,medicines])

if (loading) return <p>Loading...</p>


if (filtered.length === 0 && query !== "") return <p>No medicines found</p>




  return(
    <div>
      <SearchBar onSearch={setQuery} />
      {filtered.map((med)=>(
        <MedicineCard key={med.id} name={med.name} price={med.price} description={med.description} onAddToCart={()=> onAddToCart(med)} id={med.id}/>
         ))}
         
      

    </div>
  )
}

export default Medicines;