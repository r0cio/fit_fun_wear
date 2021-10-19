import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import imagenFondo from '../assets/images/mandalorian.jpg';

function UserDetail(props){
    const { id } = useParams();
    console.log(id);

    const [ user, setUsers ] = useState([]);
    const [ img, setImg ] = useState('');
    const [ description, setDescription ] = useState([]);
    
    // obtenemos productos
    useEffect( ()=> {
        //console.log("Se monto el componente");
        fetch('/api/users/')
            .then( response => response.json())
            .then( users => {
                console.log(users.meta.users);
                for (let i = 0; i < users.meta.users.length; i++) {
                    console.log(users.meta.users[i]);
                    if (users.meta.users[i].id == id) {                        
                        setUsers(users.meta.users[i].name);
                        setImg(users.meta.users[i].image);
                        setDescription(users.meta.users[i].name + ' ' + users.meta.users[i].last_name);
                    }
                    
                } 
                
            })
            .catch( err => console.log(err))
    }, [])

    return(
        <div className="col-md-12 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="sm-0 font-weight-bold text-gray-800 text-center">{user}</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                            {
                                !img &&
                                <div className="spinner-border text-warning mx-auto d-block" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            } 
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 20 +'rem', maxHeight: "500px", objectFit: "cover"}} src={img} alt="Imagen"/>
                    </div>
                    <p>{description}</p>                                                                                                    
                </div>
            </div>
        </div>
    )
}

export default UserDetail;
