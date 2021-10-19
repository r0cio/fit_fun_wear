import React from 'react';
import PropTypes from 'prop-types';

function SmallCard(props){
    //console.log(props.categoryName);
    let myClass = 'col-md-4 mb-4';
    if (props.tama) {
        myClass = 'col-md-6';
    }

    let username = '';
    let userImg = '';
    if (props.user) {               
        username = "id: " + props.user.id + ",  " + props.user.name + ' ' + props.user.last_name;
        userImg = props.img;
    }

    let productName = '';
    let productImg = '';
    if (props.product) {
        productName = "id: " + props.product.id_product + ",  " + props.product.name;
        productImg = props.product.image;
    }
    
    return(
        <div className={myClass}>
            <div className="shadow h-100 py-2">
                <div className="card-body">
                    <div className="text-center">
                        <i className={`fas ${props.icon} fa-2x text-gray-300`}></i>
                    </div>
                    <div className="row no-gutters align-items-center">                        
                        <div className="col mr-2">                         
                            <div className={`text-xs font-weight-bold text-${props.color} text-center text-uppercase mb-1`}> {props.title}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800 text-center">{props.length}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800 text-center">{username}</div>                            
                            <img src={userImg} className="mx-auto d-block" style={{maxWidth: "90px"}}/>
                            {
                                userImg === undefined &&
                                <div className="spinner-border text-warning mx-auto d-block" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }
                            <div className="h5 mb-0 font-weight-bold text-gray-800 text-center">{productName}</div>                            
                            <img src={productImg} className="mx-auto d-block" style={{maxWidth: "90px"}}/>
                            {
                                productImg === undefined &&
                                <div className="spinner-border text-primary mx-auto d-block" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }                          
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
            
    )
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

SmallCard.defaultProps = {
    title: 'No Title',
    color: 'success',
    cuantity: 'No cuatity',
    icon: 'fa-clipboard-list'
}

/* PROPTYPES */

SmallCard.propTypes = {
    atritutes: PropTypes.shape({
        title: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        cuantity: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        icon: PropTypes.string.isRequired
    })
}



export default SmallCard;