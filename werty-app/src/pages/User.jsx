// import { useContext } from "react";
import Products from "../components/Products";
// import { DataContext } from "../store/DataStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function User({user}){

  //  const {products, fetchData} = useContext(DataContext);


    return(
      <>
      <div
      className="container mt-4"
      style={{
        zIndex: 1,
        position: "relative",
        paddingBottom: "80px",
        paddingTop: "80px",
      }}
    >
     <Link to={`/cart?userEmail=${user.email}`} className="btn" style={{backgroundColor:"white", borderColor:"#FD5F07", marginBottom:"3px", marginLeft:"1120px", zIndex:999}}><FontAwesomeIcon icon={faShoppingCart} /></Link>
      <Link to={`/wish?userEmail=${user.email}`} className="btn" style={{backgroundColor:"white", borderColor:"#FD5F07", position:"fixed", marginBottom:"3px", marginLeft:"1120px", zIndex:999}}><FontAwesomeIcon icon={faHeart} /></Link>
      <Products
      user={user}
      // products={products}
      // fetchData={fetchData}
    />
    </div>
    </>
    );
}