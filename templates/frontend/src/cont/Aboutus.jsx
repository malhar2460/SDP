import { React, useState, useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { ReactDOM } from 'react'
import {createRoot} from 'react-dom/client'
import { Link } from 'react-router-dom'
import { motion,useAnimation } from 'framer-motion';
import {Canvas} from '@react-three/fiber' 
import {BoxGeometry} from 'three'
import EarthCanvas from './Earth'
// import Box  from '../geo/Box'
import { useInView } from 'react-intersection-observer';
// import { useHistory } from 'react-router-dom';
import axios from 'axios'
import indexHtmlContent from './indexhtml';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Aboutus = () => {

    const location = useLocation() 
    const navigate = useNavigate()
    const [uname,setusernam] = useState('')
    const { user } = location.state || {user:'notfound'};
    const { authent } = location.state || {user:'not'};
    console.log(location.state)
    const tosign=()=>{
      navigate('/',{state:{user:user,authent:authent}});
      }
  
        
      const tocontact=()=>{
      navigate('/contactus',{state:{user:user,authent:authent}});
      }
      
      const toabout=()=>{
      navigate('/aboutus',{state:{user:user,authent:authent}});
      }
  
        
      const tologin=()=>{
          console.log(authent,location.state.user)
      navigate('/login',{state:{user:user,authent:authent}});
      }
  
        
      const totext=()=>{
      navigate('/text_sign',{state:{user:user,authent:authent}});
      }
            const tosignup=()=>{
                navigate('/signup',{state:{user:user,authent:authent}});
                }
          
      

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  const fadeInVariants = {
    hidden: { opacity: 0 },   // Initial style (fully transparent)
    visible: { opacity: 1 },  // Target style (fully opaque)
  };
  const control = useAnimation()
  const [ref,inview] = useInView({
    triggerOnce:false,
    threshold:0.2
  });
  useEffect(() => {
    if (inview) {
      // If the element is in view, start the fade-in animation
      control.start({
        opacity: 1,
        x: 0,
        transition: { duration: 1,type:"tween" }, // Set the animation duration
      });
    } else {
      // If the element is not in view, set opacity to 0 to hide it
      control.start({ opacity: 0, x: 100 });
    }
  }, [control, inview])

  // //==============================MIC WORKS======================================
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition
  // } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }
  //=============================================================================
  return (
    <div  className='bg-black min-h-screen '  >
      
        <nav className='bg-black py-5 px-5'>
        <div className='flex items-center justify-between'>
          <div>
            <button className='text-white text-xl'>logo</button>
          </div>
          <div className='hidden sm:flex lg:flex-row gap-7'>
            <a onClick={tosign}>
              <button className='text-white  px-2 py-1 rounded-md '>Sign to Text</button>
            </a>
            {location.state.authent === 'True' && (
                <>
              <a onClick={totext}>
                <button className='text-white  px-2 py-1 rounded-md '>Text to Sign</button>
              </a>
                </>
              )}
            <a onClick={toabout}>
              <button className='text-white  px-2 py-1 border-b-2 '>About us</button>
            </a>
            <a onClick={tocontact}>
              <button className='text-white  px-2 py-1 rounded-md '>Contact us</button>
            </a>
            <a onClick={tologin}>
                <button className='text-white  px-2 py-1 rounded-md bg-blue-600 '>Log in</button>
              </a>
              <a onClick={tosignup}>
                <button className='text-white px-2 py-1 rounded-md  bg-green-600 '>Sign up</button>
              </a>
          </div>
          <div className='sm:hidden'>
            <button
              className='text-white  px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'
              onClick={toggleDropdown}
            >
              Menu
            </button>
          </div>
        </div>
        {isDropdownOpen && (
          <div className='sm:hidden md:hidden mt-4 '>
            <div className='flex flex-col gap-2'>
              <a onClick={tosign}>
                <button className='w-full  px-2 py-1 text-white'>Sign to Text</button>
              </a>
              {location.state.authent === 'True' && (
                <>
              <a onClick={totext}>
                <button className='w-full  px-2 py-1 text-white'>Text to Sign</button>
              </a>
                </>
              )}
              <a onClick={toabout}>
                <button className='w-full  px-2 py-1 text-white'>About us</button>
              </a>
              <a onClick={tocontact}>
                <button className='w-full  px-2 py-1 text-white'>Contact us</button>
              </a>
              <a onClick={tologin}>
                <button className='w-full text-white outline outline-blue-600 outline-1 px-2 py-1'>Log in</button>
              </a>
              <a onClick={tosignup}>
                <button className='w-full text-white outline outline-green-600 outline-1 px-2 py-1'>Sign up</button>
              </a>
            </div>
          </div>
        )}
      </nav>
      <div className='flex flex-col xl:flex xl:flex-row md:flex md:flex-col 2xl:flex 2xl:flex-row'>

      
      {/* <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 100 }}
        animate={control}
        className=" mx-auto h-fit w-fit scale-150"
      >
         {/* xl:h-[52%] xl:w-[27%] md:h-[45%] md:w-[22%] 
        {/* h-[52%] w-[27%] 
        <EarthCanvas />
      </motion.div> */}
       {/* <div className='bg-white'>
          <div>
            Show microphone status
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            Start and stop buttons
            <button onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening({ continuous: true })}>
              {listening ? 'Stop' : 'Start'}
            </button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
          </div>
        </div> */}
       <motion.div
               ref={ref}
               initial={{ opacity: 0, x: 100 }}
               animate={control}
        // variants={slideIn("right", "tween", 0.2, 1)}
        className='md:h-[430px] h-[350px] w-full mx-auto'
      >
        <EarthCanvas />
      </motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 100 }}
        animate={control}
        className="mt-8 mb-[100%] float-right"
      >
        <div className="pt-8 pb-5 xl:mr-24 bg-transparent outline-transparent whitespace-pre-line shadow-lg rounded-lg outline">
          <h1 className="text-2xl text-white font-bold mb-4">About Us</h1>
          <p className="text-gray-400 mb-4">
            Welcome to our website! We offer a free and accessible platform that
            enables users to convert sign language into text and text into sign
            language.
          </p>
          <p className="text-gray-400 mb-4">
            Our mission is to bridge the communication gap between individuals
            who are deaf or hard of hearing and those who communicate primarily
            through spoken language. We aim to provide a seamless experience for
            users to express themselves and understand others effectively.
          </p>
          <p className="text-gray-400 mb-4">
            With our innovative sign language recognition technology, users can
            simply do sign language gestures or enter text, and our platform
            will convert them into written text
          </p>
          <p className="text-gray-400">
            We believe in inclusivity and empowering individuals by promoting
            equal access to communication. Our team is dedicated to improving
            and expanding our services to make sign language more accessible to
            everyone.
          </p>
          <p className="text-gray-400">
            Get started today and experience the power of communication without
            barriers!
          </p>
          <a onClick={tosignup}>
            <button className="mt-7 mb-2 px-4 py-2 rounded-lg shadow-md shadow-black bg-green-600 text-white outline outline-green-600">
              Sign up
            </button>
          </a>
        </div>
      </motion.div>
      </div>

    </div>
    
  )
}

export default Aboutus
