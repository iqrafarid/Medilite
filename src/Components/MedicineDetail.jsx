import { useParams } from "react-router-dom";
function MedicineDetail({medicines}){
     const {id}=useParams();
     const medicine=medicines.find(m=>m.id===parseInt(id));
    return(
        <div>
            
            <h1>{medicine.name}</h1>
            <p>{medicine.description}</p>
            <p>Price: ${medicine.price}</p>
            



        </div>
    )
}

export default MedicineDetail;