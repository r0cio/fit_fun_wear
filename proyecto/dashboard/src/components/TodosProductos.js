import React from 'react';
import { Link } from 'react-router-dom';
//import imagenFondo from '../assets/images/mandalorian.jpg';

function TodosProductos(props){
    console.log(props.obj);
    console.log(props.type);
    return(
        <div className="col-md-4 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className={`sm-0 font-weight-bold text-gray-800 ${props.text}`}>{props.obj.title}</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={props.obj.img} alt="Imagen de producto"/>
                    </div>
                    <p>{props.obj.description}</p> 
                    { props.type == 'products' ? <Link className="btn btn-info" to={`/detalle-producto/${props.obj.id}`}> Ver el detalle </Link> : <Link className="btn btn-info" to={`/detalle-usuario/${props.obj.id}`}> Ver el detalle </Link>}                  
                    
                </div>
            </div>
        </div>
    )
}

export default TodosProductos;
