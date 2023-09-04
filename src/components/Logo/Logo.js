import Tilt from 'react-tilt'
import React from 'react';
import './Logo.css';
import icon from './icon.png';
import 'tachyons';
class Logo extends React.Component{
    render(){
        return(
            <div className='ma4 mt0'>
                <Tilt className="Tilt shadow-2 br2 ma4 grow" options={{ max : 95 }} style={{ height: 195, width: 195 }} >
                    <div className="Tilt-inner pa3"> 
                        <img alt="logo to be displayed" style={{paddingTop: '5px'}} src={icon}/>
                    </div>
                </Tilt>
            </div>
        )
    }
}
export default Logo