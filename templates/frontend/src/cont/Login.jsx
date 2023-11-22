// import { React, useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom'
import login from '../login1.jpg'
// import { useHistory } from 'react-router-dom';
// import axios from 'axios'

// const Login = ({ onUserLogin }) => {
//   const [passwd, setpasswd] = useState('')
//   const [auth, setauth] = useState('')
//   const navigate = useNavigate();
//   const [uname, setusernam] = useState('')
//   const location = useLocation()

//   const [username, setusername] = useState('')
//   // const {authabc} = location.state.authent || {authabc : 'not'}
//   const { user } = location.state || { user: 'notfound' }; // Get the user value from the state
//   const { authent } = location.state || { authent: 'not' }
//   useEffect(() => {
//     setusernam(user);
//     onUserLogin(user);
//     setauth(authent);
//     console.log(location.state, authent)
//   }, [user,authent]);

//   const tosign = () => {
//     navigate('/', { state: { user: uname, authent: auth } });
//   }
//   const tosignup = () => {
//     navigate('/signup', { state: { user: uname, authent: auth } });
//   }

//   const tologin = () => {
//     navigate('/login', { state: { user: uname, authent: auth } });
//   }

//   const tocontact = () => {
//     navigate('/contactus', { state: { user: uname, authent: auth } });
//   }

//   const toabout = () => {
//     navigate('/aboutus', { state: { user: uname, authent: auth } });
//   }

//   const totext = () => {
//     navigate('/text_sign', { state: { user: uname, authent: auth } });
//   }

//   const handlelogout = () => {
//     location.state.authent = 'False'
//     setauth('False')
//     setusernam('None')
//   }

//   const handlesubmit = () => {
//     console.log("Username ", username, " Password", passwd)
//     axios
//       .post('http://127.0.0.1:8000/login/', { 'username': username, 'passwd': passwd }, { headers: { 'Content-Type': 'application/json' } })
//       .then((response) => {
//         setauth(response.data.auth)
//         if (response.data.auth === 'False') {
//           alert('Authorization Failed')
//         }
//         else {
//           alert('Successful')
//           setauth(response.data.auth)
//           setusernam(response.data.id);
//           setusername('')
//           setpasswd('')
//           // navigate('/',{state:response.data.id});
//         }
//         console.log(response.data.auth)

//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   }


//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   }

//   return (
    // <>
    //   <div className='bg-gradient-to-tr from-black via-blue-600 to-gray-400 min-h-fit'>
    //     <nav className='bg-black py-5 px-5'>
    //       <div className='flex items-center justify-between'>
    //         <div>
    //           <button className='text-white text-xl'>logo</button>
    //         </div>
    //         <div className='hidden sm:flex lg:flex-row gap-7'>
    //           <a onClick={tosign}>
    //             <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>Sign to Text</button>
    //           </a>
    //           {auth === 'True' && (
    //             <>
    //               <a onClick={totext}>
    //                 <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>Text to Sign</button>
    //               </a>
    //             </>
    //           )}
    //           <a onClick={toabout}>
    //             <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>About us</button>
    //           </a>
    //           <a onClick={tocontact}>
    //             <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>Contact us</button>
    //           </a>
    //           <a onClick={tologin}>
    //             <button className='text-white outline outline-blue-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-blue-600 hover:scale-110 hover:delay-75 bg-blue-600'>Log in</button>
    //           </a>
    //           <a onClick={tosignup}>
    //             <button className='text-white outline outline-green-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-green-600 hover:scale-110 hover:delay-75 bg-green-600 '>Sign up</button>
    //           </a>
    //         </div>
    //         <div className='sm:hidden'>
    //           <button
    //             className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'
    //             onClick={toggleDropdown}
    //           >
    //             Menu
    //           </button>
    //         </div>
    //       </div>
    //       {isDropdownOpen && (
    //         <div className='sm:hidden md:hidden mt-4 '>
    //           <div className='flex flex-col gap-2'>
    //             <a onClick={tosign}>
    //               <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Sign to Text</button>
    //             </a>
    //             <a onClick={toabout}>
    //               <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>About us</button>
    //             </a>
    //             {auth === 'True' && (
    //               <>
    //                 <a onClick={totext}>
    //                   <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Text to Sign</button>
    //                 </a>
    //               </>
    //             )}
    //             <a onClick={tocontact}>
    //               <button disabled className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Contact us</button>
    //             </a>
    //             <a onClick={tologin}>
    //               <button className='text-white outline outline-blue-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-blue-600 hover:scale-110 hover:delay-75 bg-blue-600'>Log in</button>
    //             </a>
    //             <a onClick={tosignup}>
    //               <button className='text-white outline outline-green-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-green-600 hover:scale-110 hover:delay-75 bg-green-600 '>Sign up</button>
    //             </a>
    //           </div>
    //         </div>
    //       )}
    //     </nav>
    //     <div className='min-h-screen  '>
    //       <div className='outline outline-black bg-white xs:w-full md:w-96 2xl:w-96 sm:w-96 xl:w-max   pt-1 mt-10   mx-auto pt'>
    //         <div className='justify-center flex flex-row origin-center '>
    //           <div>
    //             <img src={login} className='w-max shadow-md shadow-black ' />
    //           </div>
    //           <div className='w-full justify-center'>
    //             {auth === 'True' ? (
    //               <>
    //                 <button onClick={handlelogout} className='text-2xl my-[50%] outline outline-black px-2 py-2 rounded-md shadow-md shadow-black hover:scale-110'>Log out</button>
    //               </>
    //             ) : (
    //               <>
                    
    //             <h1 className='text-xl mt-20'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rounded font-semibold outline outline-2 text-2xl text-black'>Log in</span></h1>

    //             <div className='flex flex-col gap-5 mx-auto my-8  w-[70%]  content-center'>
    //               <input type='text' onChange={(e) => (setusername(e.target.value))} placeholder='Username' value={username} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
    //               <input type='password' onChange={(e) => (setpasswd(e.target.value))} placeholder='Password' value={passwd} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
    //               {/* <textarea type='text' placeholder='Message' className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></textarea> */}
    //               {/* <input type='text' placeholder='Full name' className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input> */}
    //               <button onClick={handlesubmit} className='px-2 py-1 mb-5 w-20 self-center rounded hover:scale-110 bg-white text-lg font-serif text-white outline outline-white'>Submit</button>
    //             </div>
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
//   )
// }

// export default Login
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {motion,useAnimation} from 'framer-motion'
import moduleName from 'react-three-fiber'
import {useInView} from 'react-intersection-observer'
// import login from '../login1.jpg';

const Login = ({ onUserLogin }) => {
  const [passwd, setpasswd] = useState('');
  const [auth, setauth] = useState('');
  const navigate = useNavigate();
  const [uname, setusernam] = useState('');
  const location = useLocation();

  const [username, setusername] = useState('');
  const { user } = location.state || { user: 'notfound' }; // Get the user value from the state
  const { authent } = location.state || { authent: 'not' };

  // Get stored auth and user from localStorage during component initialization
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    const storedUser = localStorage.getItem('user');
    if (storedAuth) {
      setauth(storedAuth);
      onUserLogin(storedUser);
      setusernam(storedUser);
      
    } else {
      setauth(authent);
      onUserLogin(user);
      setusernam(user);

    }
  }, [user, authent, onUserLogin]);

  const tosign = () => {
    navigate('/', { state: { user: uname, authent: auth } });
  };

  const tosignup = () => {
    navigate('/signup', { state: { user: uname, authent: auth } });
  };

  const tologin = () => {
    navigate('/login', { state: { user: uname, authent: auth } });
  };

  const tocontact = () => {
    navigate('/contactus', { state: { user: uname, authent: auth } });
  };

  const toabout = () => {
    navigate('/aboutus', { state: { user: uname, authent: auth } });
  };

  const totext = () => {
    navigate('/text_sign', { state: { user: uname, authent: auth } });
  };

  const handlelogout = () => {
    localStorage.setItem('auth', 'False');
    localStorage.setItem('user', 'notfound');
    setauth('False');
    setusernam('None');
  };

  // const handleBeforeUnload = () => { 
  //   if (auth === 'True') {
  //   // If the user is logged in, perform the logout action
  //   handlelogout();
  // }
  // }

  // useEffect(() => {
  //   // Add event listener when the component mounts
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  const handlesubmit = () => {
    console.log("Username ", username, " Password", passwd);
    axios
      .post('http://127.0.0.1:8000/login/', { 'username': username, 'passwd': passwd }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        setauth(response.data.auth);
        if (response.data.auth === 'False') {
          alert('Authorization Failed');
        } else {
          alert('Successful');
          setauth(response.data.auth);
          setusernam(response.data.id);
          setusername('');
          setpasswd('');
          // Set the auth and user values in localStorage after successful login
          localStorage.setItem('auth', response.data.auth);
          localStorage.setItem('user', response.data.id);
          window.self.location.reload()
        }
        console.log(response.data.auth);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <div className='bg-gradient-to-tr from-black via-blue-600 to-gray-400 min-h-fit'>
        <nav className='bg-black py-5 px-5'>
          <div className='flex items-center justify-between'>
            <div>
              <button className='text-white text-xl'>logo</button>
            </div>
            <div className='hidden sm:flex lg:flex-row gap-7'>
              <a onClick={tosign}>
                <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>Sign to Text</button>
              </a>
              {auth === 'True' && (
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
                {auth === 'True' && (
                  <>
                    <a onClick={totext}>
                      <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Text to Sign</button>
                    </a>
                  </>
                )}
                <a onClick={tocontact}>
                  <button disabled className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Contact us</button>
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
        <motion.div initial={{opacity:0,y:50}} ref={ref} animate={control} className='min-h-screen  '>
          <div className='outline outline-black bg-white xs:w-full md:w-96 2xl:w-96 sm:w-96 xl:w-max   pt-1 mt-10   mx-auto pt'>
            <div className='justify-center flex flex-row origin-center '>
              <div>
                <img src={login} className='w-max shadow-md shadow-black ' />
              </div>
              <div className='w-full justify-center'>
                {auth === 'True' ? (
                  <>
                    <button onClick={handlelogout} className='text-2xl my-[50%] outline outline-black px-2 py-2 rounded-md shadow-md shadow-black hover:scale-110'>Log out</button>
                  </>
                ) : (
                  <>
                    <h1 className='text-xl mt-20'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rounded font-semibold outline outline-2 text-2xl text-black'>Log in</span></h1>
                    <div className='flex flex-col gap-5 mx-auto my-8  w-[70%]  content-center'>
                      <input type='text' onChange={(e) => (setusername(e.target.value))} placeholder='Username' value={username} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                      <input type='password' onChange={(e) => (setpasswd(e.target.value))} placeholder='Password' value={passwd} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                      <button onClick={handlesubmit} className='px-2 py-1 mb-5 w-20 self-center rounded hover:scale-110 text-white text-lg font-serif bg-slate-600'>Submit</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
<footer class="bg-black text-white">
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="lg:flex lg:items-start lg:gap-8">
      

      <div
        class="mt-8 w-full grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16"
      >
        <div class="col-span-2 sm:col-span-1">
          <p class="font-medium text-white">Services</p>

          <ul class="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                1on1 Coaching
              </a>
            </li>

            <li>
              <a href="#" class="text-whtie transition hover:opacity-75">
                Company Review
              </a>
            </li>

            <li>
              <a href="#" class="text-whtie transition hover:opacity-75">
                Accounts Review
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                HR Consulting
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                SEO Optimisation
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <p class="font-medium text-white">Company</p>

          <ul class="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                About
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                Meet the Team
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                Accounts Review
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <p class="font-medium text-white">Helpful Links</p>

          <ul class="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                Contact
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                FAQs
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                Live Chat
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <p class="font-medium text-white">Legal</p>

          <ul class="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                Accessibility
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                Returns Policy
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                Refund Policy
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                Hiring Statistics
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-2 sm:col-span-1">
          <p class="font-medium text-white">Downloads</p>

          <ul class="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                Marketing Calendar
              </a>
            </li>

            <li>
              <a href="#" class="text-white transition hover:opacity-75">
                SEO Infographics
              </a>
            </li>
          </ul>
        </div>

        <ul
          class="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end"
        >
          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-white transition hover:opacity-75"
            >
              <span class="sr-only">Facebook</span>

              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-white transition hover:opacity-75"
            >
              <span class="sr-only">Instagram</span>

              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-white transition hover:opacity-75"
            >
              <span class="sr-only">Twitter</span>

              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-white transition hover:opacity-75"
            >
              <span class="sr-only">GitHub</span>

              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              class="text-white transition hover:opacity-75"
            >
              <span class="sr-only">Dribbble</span>

              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8 border-t border-gray-100 pt-8">
      <div class="sm:flex sm:justify-between">
        <p class="text-xs text-white">
          &copy; 2022. Company Name. All rights reserved.
        </p>

        <ul
          class="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end"
        >
          <li>
            <a href="#" class="text-white transition hover:opacity-75">
              Terms & Conditions
            </a>
          </li>

          <li>
            <a href="#" class="text-white transition hover:opacity-75">
              Privacy Policy
            </a>
          </li>

          <li>
            <a href="#" class="text-white transition hover:opacity-75">
              Cookies
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
    </>
  );
};

export default Login;

