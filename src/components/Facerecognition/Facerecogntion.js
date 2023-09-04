import React from 'react';
import './Facerecognition.css'
class FaceRecognition extends React.Component{
    render(){
        return(
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img alt="alternateimage" id='inputimage' src={this.props.imageUrl} width='500px' height='auto'/>
                    <div className='bounding-box' style={{top: this.props.box.toprow, right:this.props.box.rightcol, bottom:this.props.box.bottomrow, left:this.props.box.leftcol}}></div>
                </div>
            </div>
        )
    }
}
export default FaceRecognition;










// import React from 'react';
// import './Facerecognition.css';

// const FaceRecogntion = ({ imageUrl, box }) => {
//   return (
//     <div className='center ma'>
//       <div className='absolute mt2'>
//         <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
//         <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
//       </div>
//     </div>
//   );
// }

// export default FaceRecogntion;