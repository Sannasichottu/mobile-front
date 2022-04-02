//import logo from './logo.svg';
import "./App.css";
import { createContext, useContext, useEffect, useState } from "react";

const API = "http://localhost:4000";

//const API = 'https://mobile-ecommerce-app.herokuapp.com'

const cartCtx = createContext();

const INITIAL_CART = [
  {
    _id: "6246de5379ef151912b02bf6",
    model: "OnePlus 9 5G",
    img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    company: "Oneplus",
    qty: 2,
  },
  {
    _id: "6246de5379ef151912b02bf7",
    model: "Iphone 13 mini",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
    company: "Apple",
    qty: 4,
  },
];

//cart - {[pid, image, model , company, qty]}
function App() {
  const [cart, setCart] = useState(INITIAL_CART);

  // +/- /Addtocart
  const updateCart = ({ mobile, action }) => {
    //    ----- post -> setCart -----
    const entireCart = []; //TODO
    //mobile / mobile.id
    if(action === 'add'){
      const updateItem = cart.find(item => item._id === mobile._id)
      if(updateItem){
        //get Index & update
      } else{
        setCart([...cart, {...mobile, qty:1}])
      }
    }

    //vs
    //updateOne ... options {upsert: true} 

   /* fetch(`${API}/cart`, {
      method: "POST",
      body: JSON.stringify(entireCart),
      headers: {
        contentType: "application/json",
      },
    })
      .then((data) => data.json())
      .then((latestCart) => setCart(latestCart));*/
  };

  return (
    <div className="App">
      <cartCtx.Provider value={[cart, updateCart]}>
        <PhoneList />
        <Cart />
      </cartCtx.Provider>
    </div>
  );
}

function Cart() {
  const [cart, updateCart] = useContext(cartCtx);
  return (
    <section className="cart-list">
      <h2>Purchase Items</h2>
      <div className="phone-list-container">
        {cart.map((mobile) => (
          <CartItem key={mobile._id} mobile={mobile} />
        ))}
        <div>
          <button className="cart-checkout">✅ Checkout</button>
        </div>
      </div>
    </section>
  );
}

function CartItem({ mobile }) {
  return (
    <div className="cart-item-container">
      <img src={mobile.img} alt={mobile.model} className="cart-item-picture" />
      <div>
        <h2 className="cart-item-name">{mobile.model}</h2>
        <p className="cart-item-company">{mobile.company}</p>
        <p className="cart-item-quantity">
          <span>Quantity:</span>
          {mobile.qty}
        </p>
      </div>
    </div>
  );
}

function PhoneList() {
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    fetch(`${API}/mobiles`)
      .then((data) => data.json())
      .then((mbs) => setMobiles(mbs));
  }, []);

  return (
    <div className="phone-list-container">
      {mobiles.map((mobile) => (
        <Phone key={mobile._id} mobile={mobile} />
      ))}
    </div>
  );
}

function Phone({ mobile }) {
  const [cart, updateCart] = useContext(cartCtx);
  return (
    <div className="phone-container">
      <img src={mobile.img} alt={mobile.model} className="phone-picture" />
      <h2 className="phone-name">{mobile.model}</h2>
      <p className="phone-company">{mobile.company}</p>
      <button
        className="phone-add-cart"
        onClick={() => updateCart({ mobile, action: "add" })}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default App;
