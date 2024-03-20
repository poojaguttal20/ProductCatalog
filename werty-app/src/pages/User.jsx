import { useContext } from "react";
import Products from "../components/Products";
import { DataContext } from "../store/DataStore";

export default function User({user}){

   const {products, fetchData} = useContext(DataContext);


    return(
      <div
      className="container mt-4"
      style={{
        zIndex: 1,
        position: "relative",
        paddingBottom: "80px",
        paddingTop: "80px",
      }}
    >
      <Products
      user={user}
      products={products}
      fetchData={fetchData}
    />
    </div>
      
    );
}