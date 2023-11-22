import { React, useState, useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { ReactDOM } from 'react'
import {createRoot} from 'react-dom/client'
import { Link } from 'react-router-dom'
import { motion,useAnimation } from 'framer-motion';
import {Canvas} from '@react-three/fiber' 
import {  useRef } from 'react';
import {BoxGeometry} from 'three'
import EarthCanvas from './Earth'
// import Box  from '../geo/Box'
import { useInView } from 'react-intersection-observer';
// import { useHistory } from 'react-router-dom';
import axios from 'axios'
import indexHtmlContent from './indexhtml';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import A from '../A.jpg'
import B from '../B.jpg'
import C from '../C.jpg'
import D from '../D.jpg'
import E from '../E.jpg'
import F from '../F.jpg'
import G from '../G.jpg'
import H from '../H.jpg'
import I from '../I.jpg'
import J from '../J.jpg'
import K from '../K.jpg'
import L from '../L.jpg'
import M from '../M.jpg'
import N from '../N.jpg'
import O from '../O.jpg'
import P from '../P.jpg'
import Q from '../Q.jpg'
import R from '../R.jpg'
import S from '../S.jpg'
import T from '../T.jpg'
import U from '../U.jpg'
import V from '../V.jpg'
import W from '../W.jpg'
import X from '../X.jpg'
import Y from '../Y.jpg'
import Z from '../Z.jpg'

const Speech = () => {
    
    const [Clean,setclean] = useState([])
    const [txt,settxt] = useState('')
    const location = useLocation() ;
    const navigate = useNavigate();
    const [uname,setusernam] = useState('')
    const { user } = location.state || {user:'notfound'};
    // const { authent } = location.state || {user:'not'};
    const authent = location?.state?.authent || 'not';
    // console.log(location.state.authent)
    const tosign=()=>{
      handleBeforeUnload()
      navigate('/',{state:{user:user,authent:authent}});
      }
  
        
      const tocontact=()=>{
        handleBeforeUnload()
      navigate('/contactus',{state:{user:user,authent:authent}});
      }
      
      const toabout=()=>{
        handleBeforeUnload()
      navigate('/aboutus',{state:{user:user,authent:authent}});
      }
  
        
      const tologin=()=>{
        handleBeforeUnload()
          console.log(authent,location.state.user)
      navigate('/login',{state:{user:user,authent:authent}});
      }
  
        
      const totext=()=>{
        handleBeforeUnload()
      navigate('/text_sign',{state:{user:user,authent:authent}});
      }
      const tosignup=()=>{
        handleBeforeUnload()
      navigate('/signup',{state:{user:user,authent:authent}});
      }
          
      const handleBeforeUnload = (event) => {
      // Customize the message you want to show in the confirmation dialog
      axios
      .post('http://127.0.0.1:8000/speech/', { 'transcript': transcript}, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
          alert(response.data.response)
          // setfname('')
          // setemail('')
          // setmsg('')
          // setlname('')
          // setphone('')
          console.log(response.data.state)
      })
      .catch((error) => {
          console.error(error)
      })
    
      };
      
      useEffect(() => {
        console.log("Adding beforeunload event listener");
        window.addEventListener('beforeunload', handleBeforeUnload);
      
        return () => {
          console.log("Removing beforeunload event listener");
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, [Clean]);
      
              

      const [content, setContent] = useState([]);
      const containerRef = useRef(null);
                
                // Add new content dynamically (you can replace this with your logic)
      const addNewContent = () => {
      const newContent = `New Content ${content.length + 1}`;
      setContent((prevContent) => [...prevContent, newContent]);
      };
                
                // Scroll to the bottom of the container when content changes
      useEffect(() => {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }, [content]);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Customize the message you want to show in the confirmation dialog
      const message = "Are you sure you want to leave?";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    // Add event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  const extchar = () => {
      var Clr = []
      var clrb = ''
      let i =0
      console.log("Inside extchar")
      for (let i =0 ; i<transcript.length;i++)
      {
        console.log(transcript[i])
        if(transcript[i].match(/^[A-Za-z ]+$/))
        {
            // console.log(transcript[i].toUpperCase())
          Clr = Clr.concat(transcript[i].toUpperCase())
          clrb = clrb.concat(transcript[i].toLowerCase())
          setclean(Clr)
        }
        else
        {
          setclean([' '])
          //   alert('Only the alphabets will be processed')
          window.self.location.reload()
        } 
    }
}
//==============================MIC WORKS======================================
//   const {
    //     transcript,
    //     listening,
    //     resetTranscript,
    //     browserSupportsSpeechRecognition
    //   } = useSpeechRecognition();
    
    const {
        transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ continuous: true , onEnd: extchar,});

  useEffect(() => {
    extchar();
    // Other logic or dependencies for useEffect...
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    //=============================================================================
  const handleSpeechRecognition = () => {
      if (listening) {
      SpeechRecognition.stopListening();
    } else {
        SpeechRecognition.startListening({ continuous: true });
    }
};


  return (
    <div  className='bg-white min-h-screen '  >
      
        <nav className='bg-black py-5 px-5'>
        <div className='flex items-center justify-between'>
          <div>
            <button className='text-white text-xl'>logo</button>
          </div>
          <div className='hidden sm:flex lg:flex-row gap-7'>
            <a onClick={tosign}>
              <button className='text-white  px-2 py-1 rounded-md '>Sign to Text</button>
            </a>
            {authent === 'True' && (
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
       <div className='bg-white'>
          <div>
            {/* Show microphone status */}
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            {/* Start and stop buttons */}
            <button onClick={handleSpeechRecognition}>
              {listening ? 'Stop' : 'Start'}
            </button>
            <button onClick={resetTranscript}>Reset</button>
            {/* <textarea placeholder={transcript} onChange={() => extchar()}></textarea> */}
            <p onChange={() => extchar()}>{transcript}</p>
          </div>
          <div>
      <div
        ref={containerRef}
        style={{
          overflowY: 'auto',
          maxHeight: '200px', // Adjust as needed
          border: '1px solid #ccc',
        }}
      ></div>
          <div className="flex flex-wrap justify-center mx-2 sm:mx-16 mt-5 gap-2 mb-10">
            {Clean.map((item) => (
            item === ' ' ? (
            <div className="flex items-center justify-center w-28 h-28"> {/* Add w-16 and h-16 classes */}
            <img key={item} src={require("../white.png")} alt="" />
            </div>
            ) : (
            <div className="outline outline-2 outline-black group pt-1 hover:scale-[106%]">
            <p className="font-semibold group-hover:scale-110">{item}</p>
            <img key={item} src={require('../' + item + '.jpg')} className="w-28 h-28" alt="" /> {/* Add w-16 and h-16 classes */}
      </div>
    )
  ))}
</div>
</div>
        </div>
       
      </div>

    </div>
  )
}

export default Speech
