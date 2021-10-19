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

function UltimosCreados(props){

    const [ products, setProducts ] = useState({title: '', product: [], icon: ''});
    const [ users, setUsers ] = useState({title: '', user: [], icon: ''});    
    
    useEffect( ()=> {
        //console.log("Se monto el componente");
        fetch('/api/products')
            .then( response => response.json())
            .then( allProducts => {
                //console.log(allProducts);
                setProducts({title: "Producto", product: allProducts.products.pop(), icon: 'fa-list-ol', color: 'primary'});
            })
            .catch( err => console.log(err))
    }, [])

    useEffect( ()=> {
        //console.log("Se monto el componente users");
        fetch('/api/users')
            .then( response => response.json())
            .then( allUsers => {
                //console.log(allUsers.meta.users.pop());

                fetch('api/users/' + allUsers.meta.count)
                .then( response => response.json())
                .then( lastUser => {
                    setUsers({title: "Usuario", user: allUsers.meta.users.pop(), img: lastUser.url_image, icon:'fa-address-book', color: 'warning'});
                })

            })
            .catch( err => console.log(err))
    }, [])

    let cartPropsUltimos = [products, users];

    return (
        <div className={props.tama}>
            <h2 className="mt-3 h3 mb-0 text-gray-800 text-center">ÚLTIMOS CREADOS</h2>
			<hr/>
            <div className="row mb-5">
                
                {/* {cartProps.map( (movie, i) => {

                    return <SmallCard {...movie} key={i}/>
                
                })} */}
                {cartPropsUltimos.map( (elem, i) => {

                    return <SmallCard {...elem} key={i} tama={"col-md-6"}/>

                })}

            </div>
        </div>
    )
}

export default UltimosCreados;