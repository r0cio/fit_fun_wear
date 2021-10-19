import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';

function Categorias(props){

    const [ categoriesHombre, setCategoriesHombre ] = useState({title: '', length: 0, icon: ''});
    const [ categoriesMasVendidos, setCategoriesMasVendidos ] = useState({title: '', length: 0, icon: ''});
    const [ categoriesMujeres, setCategoriesMujeres ] = useState({title: '', length: 0, icon: ''});
    const [ categoriesNormales, setCategoriesNormales ] = useState({title: '', length: 0, icon: ''});
    const [ categoriesOfertas, setCategoriesOfertas ] = useState({title: '', length: 0, icon: ''});
    const [ categoriesTendencias, setCategoriesTendencias ] = useState({title: '', length: 0, icon: ''});
    const [ categoriesUnisex, setCategoriesUnisex ] = useState({title: '', length: 0, icon: ''});

    useEffect( ()=> {
        //console.log("Se monto el componente");
        fetch('/api/products')
            .then( response => response.json())
            .then( allProducts => {
                console.log(allProducts.meta.countByCategory);
                //let lengthCategorias = Object.keys(allProducts.meta.countByCategory).length;  
                setCategoriesHombre({title: "Hombres", length: "Total productos: " + allProducts.meta.countByCategory.hombres, icon: 'fa-male'});
                setCategoriesMasVendidos({title: "Mas Vendidos", length: "Total productos: " + allProducts.meta.countByCategory.masVendidos, icon: 'fa-money-check-alt'});
                setCategoriesMujeres({title: "Mujeres", length: "Total productos: " + allProducts.meta.countByCategory.mujeres, icon: 'fa-female'});
                setCategoriesNormales({title: "Normales", length: "Total productos: " + allProducts.meta.countByCategory.normales, icon: 'fa-user-tie'});
                setCategoriesOfertas({title: "Ofertas", length: "Total productos: " + allProducts.meta.countByCategory.ofertas, icon: 'fa-hand-holding-usd'});
                setCategoriesTendencias({title: "Tendencias", length: "Total productos: " + allProducts.meta.countByCategory.tendencias, icon: 'fa-signal'});
                setCategoriesUnisex({title: "Unisex", length: "Total productos: " + allProducts.meta.countByCategory.unisex, icon: 'fa-neuter'});
            })
            .catch( err => console.log(err))
    }, [])

    let cartPropsCategories = [categoriesHombre, categoriesMasVendidos, categoriesMujeres, categoriesNormales, categoriesOfertas, categoriesTendencias, categoriesUnisex];

    return (
        <div className={props.tama}>
            <h2 className="mt-3 h3 mb-0 text-gray-800 text-center">CATEGORÍAS</h2>
			<hr/>
            <div className="row">
                {cartPropsCategories.map( (elem, i) => {
                    return <SmallCard {...elem} key={i}/>
                })}
            </div>
        </div>
    )
}

export default Categorias;