import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Particles from 'react-particles-js';

import 'tachyons';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'f246162fd02b47f6983ff15c7488c896'
});

const particlesOptions = {
    particles: {
        number: {
            value: 120,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

class App extends Component {
    constructor() {
        super();

        this.state = {
            input: '',
            box: []


        }
    }

    calculateFacesPositions = (data) => {
        const clarifaiFace = data.outputs[0].data.regions.map(item=>item.region_info.bounding_box);
        const image = document.getElementById('input-image');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(`width: ${width} & height: ${height}`);
        return clarifaiFace.map(item=> {
            return {
                leftCol: item.left_col * width,
                topRow: item.top_row * height,
                rightCol: width - (item.right_col * width),
                bottomRow: height - (item.bottom_row * height)
            }
        }
    )
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {

        app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
            .then(generalModel => {
                return generalModel.predict(this.state.input);
            })
            .then(response => this.displayFaceBox(this.calculateFacesPositions(response)))
            .catch(error => console.log("Oops Something went wrong ", error))
    }

    render() {
        return (

            <div className="App">
                <Particles className="particles"
                           params={particlesOptions}
                />
                < Logo/>
                < ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition
                    imageUrl={this.state.input}
                    box={this.state.box}
                />


            </div>
        );
    }
}


export default App;
