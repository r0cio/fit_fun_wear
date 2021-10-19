import React from 'react';
import ContentProducts from './ContentProducts';
import CantidadTotales from './CantidadTotales';
import UltimosCreados from './UltimosCreados';
import Categorias from './Categorias';
import ContentUser from './ContentUser';

function TotalesMain(){
    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
				
					{/*<!-- Content Row Movies-->*/}
					<CantidadTotales />					
					<UltimosCreados />					
					<Categorias />

					<ContentProducts />
					<ContentUser />					
	
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )

}
export default TotalesMain;