import React from 'react';
import imagenFondo from '../assets/images/notFound.jpg';

function NotFound(){
    return(
        <div className="row">
            <h1 className="text-center mx-auto d-block">404 Not Found</h1>
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 mx-auto d-block" style={{width: 30 +'rem'}} src={imagenFondo} alt=" Star Wars - Mandalorian "/>
        </div>
        
    )
}


export default NotFound;