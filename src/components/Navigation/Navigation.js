import React from 'react';
import 'tachyons';

class Navigation extends React.Component{
    render(){
        if(this.props.isSignedin){
            return(
                <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
                <h3 onClick={()=>this.props.onlogin('signout')} className='f3 link dim black grow pa4 ma4 pointer'>Sign Out</h3>
                </nav>
            )
        }
        else{
            return(
                <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
                    <h3 onClick={()=>this.props.onlogin('signin')} className='f3 link dim black grow pa2 ma2 pointer'>Sign In</h3>
                    <h3 onClick={()=>this.props.onlogin('register')} className='f3 link dim black grow pa2 ma2 pointer'>Register</h3>
                </nav>
            )
        }
    }
}
export default Navigation;














// import React from 'react';

// const Navigation = ({ onRouteChange, isSignedIn }) => {
//     if (isSignedIn) {
//       return (
//         <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
//           <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
//         </nav>
//       );
//     } else {
//       return (
//         <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
//           <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
//           <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
//         </nav>
//       );
//     }
// }

// export default Navigation;