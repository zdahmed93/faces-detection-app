import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, box}) => {
    const facesNumber = box.length;
    return (
        <div>
            {
                (facesNumber > 0) ? <h2>{`${facesNumber} Faces`}</h2> : <p></p>
            }
        <div className="center ma">
            <div className="absolute mt2">
                <img src={imageUrl}
                     alt=""
                     id='input-image'
                     width='500px'
                     height='auto'
                />
                {box.map(item =>
                    <div key={item.topRow}
                         className="bounding-box"
                         style={{
                             top: item.topRow,
                             right: item.rightCol,
                             bottom: item.bottomRow,
                             left: item.leftCol
                         }}
                    />
                )
                }
            </div>

        </div>
        </div>

    )
}

export default FaceRecognition;
