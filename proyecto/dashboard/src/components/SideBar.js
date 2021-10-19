import React from 'react';
import image from '../assets/images/Logo.png';
import MainContent from './MainContent';
import CantidadTotales from './CantidadTotales';
import NotFound from './NotFound';
import {Link, Route, Switch} from 'react-router-dom';
//import SearchMovies from './SearchMovies';
import SearchMovies2 from './SearchMovies copy';
import UltimosCreados from './UltimosCreados';
import Categorias from './Categorias';
import ContentProducts from './ContentProducts';
import ContentUser from './ContentUser';
import ProductDetail from './ProductDetail';
import UserDetail from './UserDetail';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}            
            <ul className="navbar-nav fixed-top navbar-light sidebar sidebar-dark accordion" style={{backgroundColor: "#29adb8"}} id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" style={{height:"60px", borderRadius:"5px"}} src={image} alt="Logo FitFunWear"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>FitFunWear Dashboard</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/cantidad-totales">
                        <i className="fas fa-fw fa-folder"></i>
                        <span className="text-white font-weight-bold">Totales</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/ultimos-creados">
                        <i className="fas fa-fast-backward"></i>
                        <span className="text-white font-weight-bold">Últimos creados</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/categorias">
                        <i className="fas fa-align-center"></i>
                        <span className="text-white font-weight-bold">Categorias</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/productos">
                        <i className="fas fa-book-open"></i>
                        <span className="text-white font-weight-bold">Todos los productos</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/usuarios">
                        <i className="fas fa-address-card"></i>
                        <span className="text-white font-weight-bold">Todos los usuarios</span>
                    </Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>            
            {/*<!-- End of Sidebar -->*/}

            <Switch>
                <Route exact path="/">
                    <MainContent />
                </Route>                
                <Route path="/productos">
                    <ContentProducts tama={"container-fluid mt-5"} />
                </Route>
                <Route path="/usuarios">
                    <ContentUser tama={"container-fluid mt-5"} />
                </Route>
                <Route path="/cantidad-totales">
                    <CantidadTotales tama={"container-fluid mt-5"} />
                </Route>
                <Route path="/ultimos-creados">
                    <UltimosCreados tama={"container-fluid mt-5"} />
                </Route>
                <Route path="/categorias">
                    <Categorias tama={"container-fluid mt-5"} />
                </Route>
                <Route path="/search">
                    <SearchMovies2 />
                </Route>
                <Route path="/detalle-producto/:id">
                    <ProductDetail tama={"container-fluid mt-5"} />
                </Route>
                <Route path="/detalle-usuario/:id">
                    <UserDetail tama={"container-fluid mt-5"} />
                </Route>
                <Route component={NotFound} />
            </Switch>
            {/*<!-- End Microdesafio 2 -->*/}
        </React.Fragment>
    )
}
export default SideBar;