import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./components/Store";
import Category from "./components/Category";
import Inventory from "./components/Inventory";
import Card from "./components/Card";

function App() {
  return (
    <>
      <Routes>
        <Route path="/store" element={<Store></Store>}></Route>
        <Route path="/category" element={<Category></Category>}></Route>
        <Route path="/inventory" element={<Inventory></Inventory>}></Route> 
        <Route path="/productSearch" element={<Card></Card>}></Route> 
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </>
  );
}

export default App;
