import React from 'react';
import './App.css';
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/Facerecognition/Facerecogntion';
import Clarifai from "clarifai";


const particlesInit = async (main) => {

  await loadFull(main);
};
const particlesLoaded = (container) => {
};
const app = new Clarifai.App({
  apiKey: "019b3ced1d8a4a78a1e6988e41473afb",
})
const params={
  fpsLimit: 120,
  interactivity: 
  {
    events: 
    {
      onClick: 
      {
        enable: true,
        mode: "push",
      },
      onHover: 
      {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: 
    {
      push: 
      {
        quantity: 4,
      },
      repulse: 
      {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: 
  {
    color: 
    {
      value: "#ffffff",
    },
    links: 
    {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 1,
      width: 1,
    },
    collisions: 
    {
      enable: false,
    },
    move: 
    {
      direction: "none",
      enable: true,
      outModes: 
      {
        default: "bounce",
      },
      random: false,
      speed: 3,
      straight: false,
    },
    number: 
    {
      density: 
      {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: 
    {
      value: 1,
    },
    shape: 
    {
      type: "square",
    },

    size: 
    {
      value: { min: 1, max: 2 },
    },
  }
}


class App extends React.Component
{
  constructor(){
    super();
    this.state={
      input: "",
      imageUrl: "https://www.betterteam.com/images/what-is-people-operations-2400x2400-20201118.jpg?crop=4:3,smart&width=1200&dpr=2",
      box: {},
      route: 'signin',
      isSignedin: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
  onlogin=(routeobt)=>{
    this.setState({route:routeobt})
    if(routeobt==='signout')
    {
      this.setState({isSignedin: false})
    }
    else if(routeobt==='home'){
      this.setState({isSignedin: true})
    }
  }

  
  loadUser=(data)=>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  Calcfacelocn = (data) =>{
    const clarifaiface= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width+"  "+height)
    return{
      leftcol: clarifaiface.left_col * width,
      toprow: clarifaiface.top_row * height,
      rightcol : width - (clarifaiface.right_col*width),
      bottomrow: height - (clarifaiface.bottom_row*height)
    }
  }


  displayfacebox=(box)=>{
    this.setState({box:box});
  }

  onInputChange = (event) =>{ 
    this.setState({input: event.target.value});
  }

  onSubmit = () =>{
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=>{
        if(response){
          fetch('http://localhost:3000/image',{
            method:'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        this.displayfacebox(this.Calcfacelocn(response))
      }).catch(err=>console.log(err))

  }  

  
  
  render()
  {
    return (
      <div className="App">
        <Particles className="particles"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options=
          {params} 
        />
        <Navigation isSignedin={this.state.isSignedin} onlogin={this.onlogin}/>
        <Logo/>
        {this.state.route ==='home'
          ? <div>
              <Rank rank={this.state.count} name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
            </div>
          : (
              this.state.route ==='signin'
              ? <Signin onlogin={this.onlogin} loadUser={this.loadUser} />
              : <Register onlogin={this.onlogin} loadUser={this.loadUser}/>
            )
          }
      </div>
    );
  }
}
export default App;

