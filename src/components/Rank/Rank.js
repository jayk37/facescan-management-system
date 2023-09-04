import React from 'react';
import  'tachyons';
class Rank extends React.Component{
    render(){
        return(
            <div>
                <div className='black f3'>
                    {` ${this.props.name} the number of images you have currently searched is...`}
                </div>
                <div className='black f1'>
                    {this.props.entries}
                </div>
            </div>
        )
    }
}
export default Rank