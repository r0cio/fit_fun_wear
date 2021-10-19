import React from 'react';
import MainTop from './MainTop';
import TotalesMain from './TotalesMain';
import Footer from './Footer';
function MainContent(){
    return (
        <React.Fragment>
            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <MainTop />
                    <TotalesMain />
                    <Footer />
                </div>
            </div>    
        </React.Fragment>
    )
}
export default MainContent;