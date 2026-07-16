import { useState, useEffect } from 'react'
import api from '../api'

function Admin() {
    const [medicines, setMedicines] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [editMedicine, setEditMedicine] = useState(null)
    const [formData, setFormData] = useState({
        name: "", price: "", stock: "", category: "", description: ""
    })

    useEffect(() => {
        api.get('/api/medicines')
        .then(res => setMedicines(res.data))
    }, [])

    function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this medicine?")) {
            api.delete(`/api/medicines/${id}`)
            .then(() => setMedicines(medicines.filter(m => m.id !== id)))
        }
    }

    function handleEdit(medicine) {
        setEditMedicine(medicine)
        setFormData({
            name: medicine.name,
            price: medicine.price,
            stock: medicine.stock,
            category: medicine.category,
            description: medicine.description
        })
    }

    function handleAddSubmit(e) {
        e.preventDefault()
        api.post('/api/medicines', {
            name: formData.name,
            price: Number(formData.price),
            stock: Number(formData.stock),
            category: formData.category,
            description: formData.description,
            generic: "Yes",
            prescriptionRequired: false
        })
        .then(res => {
            setMedicines([...medicines, res.data])
            setShowAddForm(false)
            setFormData({ name: "", price: "", stock: "", category: "", description: "" })
        })
    }
    function handleEditSubmit(e) {
  e.preventDefault()
  if (!editMedicine) return  // ← add this line!
  
  api.put(`/api/medicines/${editMedicine.id}`, {
    name: formData.name,
    price: Number(formData.price),
    stock: Number(formData.stock),
    category: formData.category,
    description: formData.description,
    generic: editMedicine.generic || "Yes",
    prescriptionRequired: editMedicine.prescriptionRequired || false
  })
  .then(res => {
    setMedicines(medicines.map(m => m.id === editMedicine.id ? res.data : m))
    setEditMedicine(null)
    setFormData({ name: "", price: "", stock: "", category: "", description: "" })
  })
}

    
    function handleCancel() {
        setShowAddForm(false)
        setEditMedicine(null)
        setFormData({ name: "", price: "", stock: "", category: "", description: "" })
    }

    return (
        <div>
            <header>
                <h1>Admin Panel</h1>
            </header>

            <h2>Medicine Management</h2>
            <button onClick={() => setShowAddForm(true)}>+ Add Medicine</button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(m => (
                        <tr key={m.id}>
                            <td>{m.name}</td>
                            <td>${m.price}</td>
                            <td>{m.stock}</td>
                            <td>{m.category}</td>
                            <td>{m.description}</td>
                            <td>
                                <button onClick={() => handleEdit(m)}>Edit</button>
                                <button onClick={() => handleDelete(m.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddForm && (
                <form onSubmit={handleAddSubmit}>
                    <h3>Add New Medicine</h3>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})} />

                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})} />

                    <label htmlFor="stock">Stock</label>
                    <input type="number" id="stock" value={formData.stock}
                        onChange={e => setFormData({...formData, stock: e.target.value})} />

                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})} />

                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})} />

                    <button type="submit">Add Medicine</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            )}

            {editMedicine && (
                <form onSubmit={handleEditSubmit}>
                    <h3>Edit Medicine</h3>
                    <label htmlFor="ename">Name</label>
                    <input type="text" id="ename" value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})} />

                    <label htmlFor="eprice">Price</label>
                    <input type="number" id="eprice" value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})} />

                    <label htmlFor="estock">Stock</label>
                    <input type="number" id="estock" value={formData.stock}
                        onChange={e => setFormData({...formData, stock: e.target.value})} />

                    <label htmlFor="ecategory">Category</label>
                    <input type="text" id="ecategory" value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})} />

                    <label htmlFor="edescription">Description</label>
                    <input type="text" id="edescription" value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})} />

                    <button type="submit">Update Medicine</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            )}
        </div>
    )
}

export default Admin