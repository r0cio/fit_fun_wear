import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */

let moviesInDB = {
    title: 'Movies in Data Base',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Total awards --> */

let totalAwards = {
    title:' Total awards', 
    color:'success', 
    cuantity: '79',
    icon:'fa-award'
}

/* <!-- Actors quantity --> */

let actorsQuantity = {
    title:'Actors quantity' ,
    color:'warning',
    cuantity:'49',
    icon:'fa-user-check'
}

let cartProps = [moviesInDB, totalAwards, actorsQuantity];

function CantidadTotales(props){

    const [ products, setProducts ] = useState({title: '', length: 0, icon: ''});
    const [ users, setUsers ] = useState({title: '', length: 0, icon: ''});
    const [ categories, setCategories ] = useState({title: '', length: 0, icon: ''});
    
    useEffect( ()=> {
        //console.log("Se monto el componente");
        fetch('/api/products')
            .then( response => response.json())
            .then( allProducts => {
                //console.log(allProducts);
                let lengthCategorias = Object.keys(allProducts.meta.countByCategory).length;
                setProducts({title: "Productos", length: allProducts.meta.count, icon: 'fa-clipboard-list'});
                setCategories({title: "Categorias", length: lengthCategorias, icon: 'fa-box-open'});
            })
            .catch( err => console.log(err))
    }, [])

    useEffect( ()=> {
        //console.log("Se monto el componente users");
        fetch('/api/users')
            .then( response => response.json())
            .then( allUsers => {
                //console.log(allUsers);
                setUsers({title: "Usuarios", length: allUsers.meta.count, icon:'fa-user-check'});
            })
            .catch( err => console.log(err))
    }, [])

    let cartPropsTotales = [products, users, categories];

    return (
        <div className={props.tama}>
            <h2 className="h3 mb-0 text-gray-800 text-center">TOTALES</h2>
            <hr/>
            <div className="row">
                
                {/* {cartProps.map( (movie, i) => {

                    return <SmallCard {...movie} key={i}/>
                
                })} */}
                {cartPropsTotales.map( (elem, i) => {

                    return <SmallCard {...elem} key={i}/>

                })}

            </div>
        </div>
    )
}

export default CantidadTotales;