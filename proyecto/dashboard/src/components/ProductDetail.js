import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import imagenFondo from '../assets/images/mandalorian.jpg';

function ProductDetail(props){
    const { id } = useParams();
    console.log(id);

    const [ products, setProducts ] = useState([]);
    const [ img, setImg ] = useState('');
    const [ description, setDescription ] = useState([]);
    
    // obtenemos productos
    useEffect( ()=> {
        //console.log("Se monto el componente");
        fetch('/api/products/')
            .then( response => response.json())
            .then( products => {
                console.log(products);
                for (let i = 0; i < products.products.length; i++) {
                    console.log(products.products[i]);
                    if (products.products[i].id_product == id) {
                        /* titulo = products.products[i].name;
                        img = products.products[i].image;
                        descripcion = products.products[i].description; */
                        setProducts(products.products[i].name)
                        setImg(products.products[i].image)
                        setDescription(products.products[i].description)
                    }
                    
                } 
                
            })
            .catch( err => console.log(err))
    }, [])
    
    return(
        <div className="col-md-12 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="sm-0 font-weight-bold text-gray-800 text-center">{products}</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                            {
                                !img &&
                                <div className="spinner-border text-primary mx-auto d-block" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            } 
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem', maxHeight: "500px", objectFit: "cover"}} src={img} alt="Imagen"/>
                    </div>
                    <p>{description}</p>                                                                                                    
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
