import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import sign1 from '../signup.jpg'
import {motion,useAnimation} from 'framer-motion'
import {useInView} from 'react-intersection-observer'
const Signup = () => {
  const [username, setusername] = useState('')
  const [passwd, setpasswd] = useState('')
  const [passwdr, setpasswdr] = useState('')
  const [email, setemail] = useState('')
  const [auth, setauth] = useState('')

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const location = useLocation()
  const navigate = useNavigate()
  const { authent } = location.state || { authent: 'not' };
  const { user } = location.state || { user: 'notfound' }; // Get the user value from the state

  const tosign = () => {
    navigate('/', { state: { user: user, authent: authent } });
  }


  const tocontact = () => {
    navigate('/contactus', { state: { user: user, authent: authent } });
  }

  const toabout = () => {
    navigate('/aboutus', { state: { user: user, authent: authent } });
  }


  const tologin = () => {
    console.log(authent, location.state.user)
    navigate('/login', { state: { user: user, authent: authent } });
  }


  const totext = () => {
    navigate('/text_sign', { state: { user: user, authent: authent } });
  }
  const tosignup = () => {
    navigate('/signup', { state: { user: user, authent: authent } });
  }


  const handlesubmit = () => {
    console.log("username : ", username, "\nPasswd", passwd, "\nPasswdr", passwdr, "\nemail", email)
    if (username == '' || passwd == '' || passwdr == '' || email == '') {
      alert('field was empty')
    }
    else {
      if (!isValidEmail) {
        alert('Invalid email format');
        return;
      }
      else {
        if (passwd.localeCompare(passwdr) == 0) {
          axios
            .post('http://127.0.0.1:8000/signup/', { 'username': username, 'passwd': passwd, 'email': email }, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
              setauth(response.data.auth)
              if (response.data.auth === 'False') {
                alert('The user already exists')
              }
              else {
                alert('Successfull')
                setusername('')
                setpasswd('')
                setpasswdr('')
                setemail('')
              }
              console.log(response.data.state)
            })
            .catch((error) => {
              console.error(error)
            })
        }
        else {
          alert('Confirm password was not the same')
        }
      }
    }
  }


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const control = useAnimation()
  const [ref,inview] = useInView({
    triggerOnce:false,
    threshold:0.4    
  })
  useEffect(()=>{
    if(inview)
    {
      control.start({
        opacity:1,
        y:0,
        transition:{duration:0.7,type:"tween"},
      });
    }else{
      control.start({
        opacity:0,
        y:50
      })
    }
  },[control,inview])


  return (
    <>
      {/* <div className='bg-gradient-to-tr from-black via-green-600 to-gray-500 min-h-screen'>
            <nav className='bg-black py-5 min-w-max px-5'>
           For Large 
          <div className='flex items-center justify-between'>
            <div className=''>
              <button className='text-white lg:text-xl md:text-base sm:text-sm '>logo</button>
            </div>
            <div className=' lg:text-md md:text-base sm:text-sm flex lg:flex-row sm:flex-wrap lg:gap-7 md:gap-4 sm:gap-3'>
              <a  onClick={tosign}><button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md  shadow-white hover:scale-110 hover:delay-75'>Sign to Text</button></a>
              <a onClick={totext}><button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md  shadow-white hover:scale-110 hover:delay-75'>Text to Sign</button></a>
              <a onClick={toabout}><button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md  shadow-white hover:scale-110 hover:delay-75'>About us</button></a>
            <a  onClick={tocontact}><button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md  shadow-white hover:scale-110 hover:delay-75'>Contact us</button></a>
              <Link to="/login" onClick={tologin}><button className='text-white outline outline-blue-600 outline-2 px-2 py-1 rounded-md shadow-md  shadow-blue-600 hover:scale-110 hover:delay-75 bg-blue-600'>Log in</button></Link>
              <Link to="/signup"><button className='text-white outline outline-green-600 outline-2 px-2 py-1 rounded-md shadow-md  shadow-green-600 hover:scale-110 hover:delay-75 bg-green-600'>Sign up</button></Link>
            </div>
          </div>
        </nav>
                <div className='min-h-screen min-w-full  '>
                    <div className='outline outline-black bg-black  w-96 pt-1 mt-10 object-center align-middle  mx-auto pt'>
                        <form className=''>
                            <h1 className='text-xl mt-5'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rouded rounded-lg outline outline-white text-white'>Sign up</span></h1>
                            <div>
                            <div className='grid grid-cols-2 mt-8 pr-12'>
                                <div className='text-right pr-3 pl-0'>
                                    <lable className='text-white'>Username :</lable>
                                </div>
                                <div>
                                <input required type='text' name='username' onChange={(e) => { setusername(e.target.value) }} className=' text-black outline outline-2 outline-black focus:outline-2 focus:outline-black '></input><br/><br/>
                                </div>
                                <div className='text-right pr-3'>
                                    <lable className='text-white'>Password : </lable><br></br>
                                </div>
                                <div>
                                    <input type='password' name='passwd' onChange={(e) => { setpasswd(e.target.value) }} className=' text-black outline outline-2 outline-black'></input><br/><br/>
                                </div>
                                <div className='text-right pr-3'>
                                    <lable className='text-white'>Confirm-password : </lable><br></br>
                                </div>
                                <div>
                                    <input type='password' name='passwd' onChange={(e) => { setpasswdr(e.target.value) }} className=' text-black outline outline-2 outline-black'></input><br/><br/>
                                </div>
                                <div className='text-right pr-3'>
                                    <lable className='text-white'>E-mail : </lable><br></br>
                                </div>
                                <div className=''>
                                <input type='text' name='passwd' onChange={(e) => { setemail(e.target.value) }} className=' text-black outline outline-2 outline-black'></input><br/><br/>
                                </div>
                            </div>
                            </div>
                        </form>
                        <button onClick={handlesubmit} className='px-2 py-1 mb-5 rounded hover:scale-90 bg-black text-white outline outline-white'>Submit</button>
                    </div>
                </div>
            </div> */}
      <div className='bg-gradient-to-tr from-black via-green-600 to-gray-500 min-h-fit'>
      {/* <div className=' min-h-fit'> */}
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
        <motion.div
        initial={{opacity:0,y:50}} ref={ref} animate={control}
         className='min-h-screen  '>
          <div className='outline outline-black bg-white xs:w-full md:w-96 2xl:w-96 sm:w-96 xl:w-[60%]   pt-1 mt-10   mx-auto pt'>
            <div className='flex flex-row shadow-lg shadow-black'>
              <div className='w-screen'>
                <h1 className='text-xl mt-20'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rounded font-semibold outline outline-2 text-2xl text-black'>Sign up</span></h1>
                
                <div className='flex flex-col gap-5 mx-auto my-8  w-[70%]  content-center'>
                  <input name='username' onChange={(e) => { setusername(e.target.value) }} type='text' placeholder='Username' value={username} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                  <input type='password' name='passwd' onChange={(e) => { setpasswd(e.target.value) }} placeholder='Password' value={passwd} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                  <input type='password' name='passwd' onChange={(e) => { setpasswdr(e.target.value) }} placeholder='Confirm-password' value={passwdr} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                  <input name='passwd' onChange={(e) => { setemail(e.target.value) }} type='text' placeholder='E-mail' value={email} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                  <button onClick={handlesubmit} className='px-2 py-1 mb-5 w-20 justify-center self-center rounded hover:scale-110 bg-gray-900 text-lg font-serif text-white outline outline-white'>Submit</button>
                </div>
              </div>
              <div>
                <img src={sign1} className='w-full h-full shadow-md shadow-black ' />
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </>
  )
}

export default Signup
