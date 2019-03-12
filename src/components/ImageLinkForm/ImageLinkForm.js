import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="f3">
                Give this Smart BRAIN an <span style={{fontWeight: 'bold'}}>image URL</span> ant it will find the faces in the image
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                <input onChange={onInputChange} className="f4 pa2 w-70 center" type="text"/>
                <button onClick={onButtonSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-red">DETECT</button>
                </div>
                </div>
        </div>
    )
}

export default ImageLinkForm;
