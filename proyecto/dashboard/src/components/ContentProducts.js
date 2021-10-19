import React, { useState, useEffect } from 'react';
import TodosProductos from './TodosProductos';

function ContentProducts(props){

    const [ products, setProducts ] = useState([]);
    let myProducts = new Array();

    // obtenemos productos
    useEffect( ()=> {
        //console.log("Se monto el componente");
        fetch('/api/products')
            .then( response => response.json())
            .then( allProducts => {
                console.log(allProducts); 
                
                for (let i = 0; i < allProducts.products.length; i++) { 
                    let obj = {id: allProducts.products[i].id_product, title: allProducts.products[i].name, img: allProducts.products[i].image, description: allProducts.products[i].description};
                    myProducts.push({obj})
                }
                
                setProducts(myProducts);   
            })
            .catch( err => console.log(err))
    }, [])

    return (
        <div className={props.tama}>
            <h2 className="h3 mt-2 mb-0 text-gray-800 text-center">PRODUCTOS</h2>
            <hr/>
            <div className="row">
                {/*<!-- Last Movie in DB -->*/} 
                {products.map( (elem, i) => {                    
                    return <TodosProductos {...elem} key={i} text={"text-center"} type={"products"} />
                })           
                }

            </div>
        </div>
    )
}

export default ContentProducts;