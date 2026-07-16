//const http = require('http');

//const server = http.createServer((req,res)=>{
//   if(req.url==='/'){
//    res.writeHead(200,{'Content-Type':'text/plain'});
//    res.end("MediLite Backend Server is running");
//    }
//    else if(req.url==='/api/health'){
//        res.writeHead(200,{'Content-Type':'application/json'});
//        res.end(JSON.stringify({Status:'OK'}))
//    }
//  
   
//})

//server.listen(5000,()=>{
//    console.log("Server is running on port 5000");
//})


let medicines = 
    [
        {
          id: 1,
          name: "Paracetamol",
          generic: "Yes",
          price: 5.99,
          category: "Pain Relief",
          stock: 50,
          prescriptionRequired: false,
          description: "Used for pain relief and fever reduction"
        },
        {
          id: 2,
          name: "Ibuprofen",
          generic: "No",
          price: 8.99,
          category: "Pain Relief",
          stock: 30,
          prescriptionRequired: false,
          description: "Nonsteroidal anti-inflammatory drug (NSAID) used for pain relief, fever reduction, and inflammation reduction.."
        },
        {
          id: 3,
          name: "Amoxicillin",
          generic: "Yes",
          price: 12.99,
          category: "Antibiotic",
          stock: 0,
          prescriptionRequired: true,
          description: "Antibiotic used to treat bacterial infections"
        },
        {
          id: 4,
          name: "Loratadine",
          generic: "Yes",
          price: 6.99,
          category: "Allergy",
          stock: 25,
          prescriptionRequired: true,
          description: "Antihistamine used to relieve allergy symptoms"
        },
        {
          id: 5,
          name: "Metformin",
          generic: "No",
          price: 10.99,
          category: "Diabetes",
          stock: 15,
          prescriptionRequired: true,
          description:
            "Used to treat type 2 diabetes by controlling blood sugar levels."
        },
        {
          id: 6,
          name: "Atorvastatin",
          generic: "No",
          price: 15.99,
          category: "Cholesterol",
          stock: 10,
          prescriptionRequired: true,
          "description":
            "Used to lower cholesterol and reduce the risk of heart disease."
        }];







const express = require('express');
const cors = require('cors');
const {v4:uuidv4} = require('uuid');

const app= express();

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("MediLite Backend Server is running");
});

app.get('/api/health',(req,res)=>{
    res.json({Status:'OK'})
})

app.get('/api/medicines',(req,res)=>{
    const {search,category} = req.query;
    let result = medicines;
    if(search){
        result = result.filter(m=> m.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category){
        result = result.filter(m=> m.category.toLowerCase()===category.toLowerCase());
    }
    res.json(result);
   
})

app.get('/api/medicines/:id',(req,res)=>{
    const id = Number(req.params.id);
    const medicine = medicines.find(m=> m.id===id);
    if(!medicine){
        return res.status(404).json({error:'Medicine Not Found'})
    }
    res.json(medicine)
})

app.post('/api/medicines',(req,res)=>{
    const {name,generic,price,category,stock,prescriptionRequired,description} = req.body;
    if(!name || !generic || !price || !category || !stock || prescriptionRequired === undefined || !description){
        return res.status(400).json({error:'Missing required fields'})
    }
    if(price<0 || stock<0){
        return res.status(400).json({error:'Price and Stock must be non-negative'})
    }
    if(typeof prescriptionRequired !== 'boolean'){
        return res.status(400).json({error:'Prescription Required must be a boolean value'})
    }
    if(typeof name !== 'string' || typeof generic !== 'string' || typeof category !== 'string' || typeof description !== 'string'){
        return res.status(400).json({error:'Name, Generic, Category and Description must be string values'})
    }
    if(typeof price !== 'number' || typeof stock !== 'number'){
        return res.status(400).json({error:'Price and Stock must be number values'})
    }
   
    const newMedicine = {
        id: uuidv4(),
        name,
        generic,
        price,
        category,
        stock,
        prescriptionRequired,
        description

    }
    medicines.push(newMedicine);
    res.status(201).json(newMedicine)
})

   
app.put('/api/medicines/:id', (req,res)=>{
    const id =Number(req.params.id);
    const index = medicines.findIndex(m=> m.id===id);
    if(index===-1){
        return res.status(404).json({error:"Medicine Not Found"})
    }
    const {name,generic,price,category,stock,prescriptionRequired,description} = req.body;
    if(!name || !generic || !price || !category || !stock || prescriptionRequired === undefined || !description){
        return res.status(400).json({error:'Missing required fields'})
    }
    if(price<0 || stock<0){
        return res.status(400).json({error:'Price and Stock must be non-negative'})
    }
    if(typeof prescriptionRequired !== 'boolean'){
        return res.status(400).json({error:'Prescription Required must be a boolean value'})
    }
    if(typeof name !== 'string' || typeof generic !== 'string' || typeof category !== 'string' || typeof description !== 'string'){
        return res.status(400).json({error:'Name, Generic, Category and Description must be string values'})
    }
    if(typeof price !== 'number' || typeof stock !== 'number'){
        return res.status(400).json({error:'Price and Stock must be number values'})
    }

    const updateMedicine= {
        id,
        name,
        generic,
        price,
        category: category || medicines[index].category,
        stock,
        prescriptionRequired: prescriptionRequired || medicines[index].prescriptionRequired,
        description: description || medicines[index].description
    }
    medicines[index] = updateMedicine;
    res.json(updateMedicine)
})

app.patch('/api/medicines/:id',(req,res)=>{
    const id = Number(req.params.id);
    const index = medicines.findIndex(m=> m.id===id);
    if(index===-1){
        return res.status(404).json({error:"Medicine Not Found"})
    }
    const {name,generic,price,category,stock,prescriptionRequired,description} = req.body;
    if(price<0 || stock<0){
        return res.status(400).json({error:'Price and Stock must be non-negative'})
    }
    if(prescriptionRequired !== undefined && typeof prescriptionRequired !== 'boolean'){
        return res.status(400).json({error:'Prescription Required must be a boolean value'})
    }
    if(name && typeof name !== 'string' || generic && typeof generic !== 'string' || category && typeof category !== 'string' || description && typeof description !== 'string'){
        return res.status(400).json({error:'Name, Generic, Category and Description must be string values'})
    }
    if(price && typeof price !== 'number' || stock && typeof stock !== 'number'){
        return res.status(400).json({error:'Price and Stock must be number values'})
    }

    const updateMedicine={
        ...medicines[index], ...req.body , id
    }
    medicines[index] = updateMedicine;
    res.json(updateMedicine)
})


app.delete('/api/medicines/:id', (req, res) => {
    const id = Number(req.params.id)
    const medicine = medicines.find(m => m.id === id)
    if (!medicine) {
        return res.status(404).json({ error: 'Medicine Not Found' })
    }
    medicines = medicines.filter(m => m.id !== id)
    res.status(200).json({ message: 'Medicine Deleted Successfully', deletedMedicine: medicine })
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})