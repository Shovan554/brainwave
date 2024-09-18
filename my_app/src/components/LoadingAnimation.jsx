import react from 'react';
import Lottie from 'react-lottie';
import loadData from '../assets/animations/load.json';


const LoadingAnimation= () =>{
    const defaultOptions = {
        loop :false,
        autoplay :true,
        animationData : loadData,
        rendererSettings:{
            preserveAspectRatio: 'xMidYMid slice'
        } ,

    };

    return (
        <div className = "load-animation">
                  <Lottie options={defaultOptions} height={250} width={250} /> {/* Increase size here */}

        </div>
    )
}

export default LoadingAnimation;