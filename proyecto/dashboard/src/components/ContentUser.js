import React, { useState, useEffect } from 'react';
import TodosProductos from './TodosProductos';

function ContentUser(props){

    const [ users, setUsers ] = useState([]);
    let myUsers = new Array();

    // obtenemos usuarios
    useEffect( ()=> {
        //console.log("Se monto el componente");
        fetch('/api/users')
            .then( response => response.json())
            .then( allUsers => {
                console.log(allUsers.meta.users); 
                
                for (let i = 0; i < allUsers.meta.users.length; i++) { 
                    let obj = {id: allUsers.meta.users[i].id, title: allUsers.meta.users[i].name, img: allUsers.meta.users[i].image, description: allUsers.meta.users[i].name + ' ' + allUsers.meta.users[i].last_name};
                    myUsers.push({obj})
                }
                
                setUsers(myUsers);   
            })
            .catch( err => console.log(err))
    }, [])
    
    console.log(users);

    return (
        <div className={props.tama}>
            <h2 className="h3 mt-2 mb-0 text-gray-800 text-center">USUARIOS</h2>
            <hr/>
            <div className="row">
                {/*<!-- Last Movie in DB -->*/} 
                {users.map( (elem, i) => {                    
                    return <TodosProductos {...elem} key={i} type={"users"} />
                })           
                }

            </div>
        </div>
    )
}

export default ContentUser;