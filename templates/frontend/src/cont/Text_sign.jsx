import {React,useEffect,useState,useRef} from 'react'
import {useSpeechRecognition} from 'react-speech-recognition'
import axios from 'axios'
import { useLocation,useNavigate} from 'react-router-dom'
import image from './HandGestureRecognition'
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

const Text_sign = () => {
  
  // const [images,setimage] = useState[null]
  const [cameraError, setCameraError] = useState(false);
  const [txt,settxt] = useState('')
  const [uname,setusername] = useState('')
  const videoRef = useRef(null);
  const [Clean,setclean] = useState([])
  const location = useLocation()
  const {user} = location.state || {user:'notfound'}
  const {authent} = location.state || {authent:'not'}
  const [btext,setbtext] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.user) {
      setusername(location.state.user);
    }
  }, [location.state]);

  const tocontact=()=>{
    navigate('/contactus',{state:{user:user,authent:authent}});
    }
    
    const toabout=()=>{
    navigate('/aboutus',{state:{user:user,authent:authent}});
    }

  const tosign=()=>{
    navigate('/',{state:{user:uname,authent:authent}});
      }

      const tosignup=()=>{
        navigate('/signup',{state:{user:uname,authent:authent}});
          }
      
  const tologin=()=>{
    navigate('/login',{state:{user:uname,authent:authent}});
      }
      
  const totext=()=>{
    navigate('/text_sign',{state:{user:uname,authent:authent}});
      }



  // useEffect(() => {
  //   extchar()
  // },[txt])

  const extchar = () => {
    var Clr = []
    var clrb = ''
    for (let i =0 ; i<txt.length;i++)
    {
        console.log(txt[i])
        if(txt[i].match(/^[A-Za-z ]+$/))
        {
          // console.log(txt[i].toUpperCase())
          Clr = Clr.concat(txt[i].toUpperCase())
          clrb = clrb.concat(txt[i].toLowerCase())
          setclean(Clr)
        }
        else
        {
          setclean([' '])
          alert('Only the alphabets will be processed')
          window.self.location.reload()
        } 
      }

      console.log("text",clrb.toString())
      console.log("uesr_id",location.state.user[0][0])
      axios
      .post('http://127.0.0.1:8000/text/', { 'text': clrb.toString(),'user_id':location.state.user[0][0] }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error);
      });
  }


  // const getsign = async () => {
  //  axios
  //  .get('https://127.0.0.1:8000/sign')
  //  .then((response) =>
  //   setimage = response.data.sign
  //  ) 
  //  .catch((error) => {
  //   console.log(error)
  //  })
  // }


  // const handletext = () => {
  //   axios
  //     .post('http://127.0.0.1:8000/text/', { 'text': btext,'user_id':location.state[0][0] }, { headers: { 'Content-Type': 'application/json' } })
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div>
        <nav className='bg-black py-5 px-5'>
        <div className='flex items-center justify-between'>
          <div>
            <button className='text-white text-xl'>logo</button>
          </div>
          <div className='hidden sm:flex lg:flex-row gap-7'>
            <a onClick={tosign}>
              <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>Sign to Text</button>
            </a>
            {location.state.authent === 'True' && (
                <>
            <a onClick={totext}>
              <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>Text to Sign</button>
            </a>
                </>
              )}
            <a onClick={toabout}>
              <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>About us</button>
            </a>
              <a onClick={tocontact}>
                <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>Contact us</button>
              </a>
              <a onClick={tologin}>
                <button className='text-white outline outline-blue-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-blue-600 hover:scale-110 hover:delay-75 bg-blue-600'>Log in</button>
              </a>
              <a onClick={tosignup}>
                <button className='text-white outline outline-green-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-green-600 hover:scale-110 hover:delay-75 bg-green-600 '>Sign up</button>
              </a>
          </div>
          <div className='sm:hidden'>
            <button
              className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'
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
                <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Sign to Text</button>
              </a>
              <a onClick={toabout}>
                <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>About us</button>
              </a>
              {location.state.authent === 'True' && (
                <>
              <a onClick={totext}>
                <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Text to Sign</button>
              </a>
                </>
              )}
              <a onClick={tocontact}>
                <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Contact us</button>
              </a>
              <a onClick={tologin}>
                <button className='text-white outline outline-blue-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-blue-600 hover:scale-110 hover:delay-75 bg-blue-600'>Log in</button>
              </a>
              <a onClick={tosignup}>
                <button className='text-white outline outline-green-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-green-600 hover:scale-110 hover:delay-75 bg-green-600 '>Sign up</button>
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* {uname} */}
      {/* <div>
      <h1 className='text-5xl my-3 text-center snap-center sm:justify-center md:justify-center lg:justify-center justify-center'>Enter your text</h1>
      <textarea  onChange={(e) => (settxt(e.target.value))}  className='outline outline-black mt-5 font-serif text-lg shadow-md shadow-black w-[60%] h-36 px-1'></textarea><br></br><br></br>
      <button onClick={extchar} className='rounded-md bg-green-600 text-white px-2 py-1 font-serif text-lg shadow-sm shadow-black hover:scale-110 hover:delay-75'>Submit</button>
       <div className="flex-wrap grid grid-cols-10 mx-16 mt-5  gap-2 mb-10">
          {Clean.map((item) => (
            item === ' '  ? (
              <>
                <div>
                <img key={item} src={require("../white.png")} alt="" />
                </div>
                </>
            ) : (
              <>
              <div className='outline outline-2 outline-black group pt-1 hover:scale-[106%]'>
                <p className='font-semibold group-hover:scale-110 '>{item}</p>
              <img key={item} src={require('../' + item + '.jpg')} className=' ' alt="" ></img>
              </div> </>
            )
          ))}
        </div>
      </div> */}
      <div>
  {/* <h1 className='text-5xl my-3 text-center snap-center sm:justify-center md:justify-center lg:justify-center justify-center'>Enter your text</h1> */}
  <textarea placeholder='Enter your text'
    onChange={(e) => settxt(e.target.value)}
    className='placeholder-gray-900  mt-5 font-serif text-lg focus:outline-double focus:outline-black px-2 mx-auto outline-double  outline-black outline-4 border-double border-black border-x-8  w-full sm:w-[60%] h-36 '
  ></textarea>
  <br /><br />
  <button
    onClick={extchar}
    className='rounded-md bg-green-600 text-white px-2 py-1 font-serif text-lg shadow-sm shadow-black hover:scale-110 hover:delay-75'
  >
    Submit
  </button>
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
  )
}

export default Text_sign
