import './MedicineCard.css'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'

function MedicineCard({name,price,description,onAddToCart,id}){
    const navigate = useNavigate();
   

    

    const handleAddToCart=(e)=>{
        e.stopPropagation();
        onAddToCart();
    }

    function handleCardClick(){
        navigate(`/medicines/${id}`);
    }
    return(
        <div className='medicine-card' onClick={handleCardClick}>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Price:${price}</p>
        <button className="add" onClick={onAddToCart}>Add to Cart</button>
        </div>
    )
}

export default MedicineCard;