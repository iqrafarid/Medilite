function CartSidebar({cart, onRemove, onClose}){
    return(
        <div className="wholecart">
            <h1>Items In Cart</h1>
            {cart.map(c=>(
                <div key={c.id}>
                <h3>{c.name}</h3>
                <p>Price:{c.price}</p>
                <button onClick={()=>onRemove(c.id)}>Remove</button>
                <button onClick={onClose}>Close</button>
                </div>
            ))}
            <h2>Total:{cart.reduce((sum,c)=>sum+c.price,0)}</h2>
        </div>
    )

}

export default CartSidebar;