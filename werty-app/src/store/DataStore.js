import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();


export const DataProvider = ({children}) =>{
    const [products, setProducts] = useState([]);
    
    const fetchData = async () =>{
        try{
            const response = await fetch("http://localhost:3001/products", {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                },
            });
            if(response.ok){
                const data = await response.json();
                setProducts(data);
                console.log("Displayed products");
            }else{
                console.log("Error fetching products");
            }
        }catch(error){
            console.log("error", error);
        }
    };

    useEffect(()=>{
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{products, fetchData}}>
            {children}
        </DataContext.Provider>
    );

}