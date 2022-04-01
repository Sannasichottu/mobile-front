import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



//const API = 'http://localhost:4000/mobiles'

const API = 'https://mobile-ecommerce-app.herokuapp.com'

function App() {
  return (
    <div className="App">
      <PhoneList />
    </div>
  );
}

function PhoneList(){
  const [ mobiles , setMobiles ] = useState([]);

  useEffect(() =>{
    fetch(`${API}/mobiles`)
   .then((data) => data.json())
   .then((mbs) => setMobiles(mbs));
  }, [])

  return (
    <div className="phone-list-container">
      {mobiles.map(mobile => <Phone key={mobile._id} mobile = {mobile} /> )}
    </div>
  );
}

function Phone({ mobile }){

  return(
  <div className='phone-container'>
    <img src={mobile.img} alt={mobile.model} className='phone-picture'/>
    <h2 className='phone-name'>{mobile.model}</h2>
    <p className='phone-company'>{mobile.company}</p>
  </div>
)}


export default App;
