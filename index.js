const express = require('express');
const mongoose=require('mongoose');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB database'))
  .catch((err) => console.error('Database connection error:', err));
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
const allData = [];
allData.clear
app.get('/', (req, res) => {
  res.send('Hello, World111!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.post('/postdata', async(req, res) => {
  const data = req.body;
  
   name= data['firstName'];
   email=data['lastName'];
  const newUser=new User({name,email});
  const savedUser = await newUser.save();
  res.status(201).json({
      message: 'Data saved successfully to the database!',
      data: savedUser
    });
  newdata={
    firstname: data['firstName'],
    lastname: data['lastName'],
    password: data['password'],
  }
  allData.push(newdata);
  console.log('All data:', allData);
  console.log('Received data:', newdata);
  res.status(200).json({ message: 'Data received successfully', receivedData: newdata });
});
app.get('/getdata', (req, res) => {
  res.status(200).json({'alldata':allData });
});
app.delete('/deletedata',(req,res)=>{
  console.log('delete request')
  const incomingdata=req.body['firstname'];
  allData.forEach(element => {
     console.log(element);
    if(element['firstname']==incomingdata)
    {
      console.log(element);
      var x=allData.indexOf(element);
      allData.splice(x,1);
      console.log(x);
      return;
    }
  });
  console.log(incomingdata);
});
app.put('/updatedata',(req,res)=>{
  console.log('Update Pressed');
  data=req.body;
  console.log(data);
  
  const incomingdata=req.body['firstname'];
  allData.forEach(element=>{
    console.log(element);
    console.log('vvvvvvvvvvvvvvvvvvvv');
    if(element['firstname']==incomingdata){
      console.log(element); 
      var index=allData.indexOf(element);
      newdata={
    firstname: data['firstname'],
    lastname: data['lastname'],
    password: data['password'],
  }
  allData[index]=newdata;
   console.log(allData);
    }
  });
});