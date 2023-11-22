import {React,useState} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'

const Contact = () => {
    
    const [fname, setfname] = useState('')
    const [email, setemail] = useState('')
    const [lname, setlname] = useState('')
    const [phone, setphone] = useState('')
    const [msg,setmsg] = useState('')
    const [auth, setauth] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    console.log("State",location.state)
    const { authent } = location.state || { authent: 'not' };

    // const {auth} = location.state.authent || {authent : 'not'}
    const { user } = location.state || {user:'notfound'}; // Get the user value from the state
    console.log(authent,user)
    
    
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const tosign=()=>{
    navigate('/',{state:{user:user,authent:authent}});
    }

      
    const tocontact=()=>{
    navigate('/contactus',{state:{user:user,authent:authent}});
    }
    
    const toabout=()=>{
    navigate('/aboutus',{state:{user:user,authent:authent}});
    }

    const tosignup=()=>{
      navigate('/signup',{state:{user:user,authent:authent}});
        }
    const tologin=()=>{
        console.log(authent,location.state.user)
    navigate('/login',{state:{user:user,authent:authent}});
    }

      
    const totext=()=>{
    navigate('/text_sign',{state:{user:user,authent:authent}});
    }

      const handlesubmit = () => {
        if(fname == '' || email == '' || msg == '' )
        {
            alert('field was empty')
        }
        else
        {
            if (!isValidEmail) {
                alert('Invalid email format');
                return;
            }
            else
            {
            axios
                .post('http://127.0.0.1:8000/contact/', { 'fname': fname,'email':email,'msg':msg,'lname':lname,'phone':phone }, { headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    alert(response.data.res)
                    setfname('')
                    setemail('')
                    setmsg('')
                    setlname('')
                    setphone('')
                    console.log(response.data.state)
                })
                .catch((error) => {
                    console.error(error)
                })
             }
           
        }
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    }


  return (
    <>
    <div className='bg-gradient-to-tr   from-green-600 via-green-600 via-40% to-blue-600 min-h-fit'>
    <nav className='bg-black py-5 px-5'>
        <div className='flex items-center justify-between'>
          <div>
            <button className='text-white text-xl'>logo</button>
          </div>
          <div className='hidden sm:flex lg:flex-row gap-7'>
            <a onClick={tosign}>
              <button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md shadow-white hover:scale-110 hover:delay-75'>Sign to Text</button>
            </a>
            {authent === 'True' && (
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
              {authent === 'True' && (
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
       <div className='min-h-screen  '>
                    <div className='outline outline-black bg-white xs:w-full md:w-96 2xl:w-96 sm:w-96 xl:w-96   pt-1 mt-10   mx-auto pt'>
                        <form className='justify-center origin-center '>
                            <h1 className='text-xl mt-5'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rounded font-semibold outline outline-2 text-2xl text-black'>Contact us</span></h1>
                            
                                <div className='flex flex-col gap-5 mx-auto my-8  w-[70%]  content-center'>
                                     <input type='text'  onChange={(e) => (setfname(e.target.value))} placeholder='First name' value={fname} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                                     <input type='text' onChange={(e) => (setlname(e.target.value))} placeholder='Last name' value={lname} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                                     <input type='text' onChange={(e) => (setemail(e.target.value))} placeholder='E-mail' value={email} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                                     <input type='text' onChange={(e) => (setphone(e.target.value))} placeholder='Phone number' value={phone} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                                     <textarea type='text' onChange={(e) => (setmsg(e.target.value))} placeholder='Message' value={msg} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></textarea>
                                     {/* <input type='text' placeholder='Full name' className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input> */}
                                </div>
                            
                        </form>
                        <button onClick={handlesubmit} className='px-2 py-1 mb-5 rounded hover:scale-110 bg-gray-900 text-lg font-serif text-white outline outline-white'>Submit</button>
                    </div>
                </div>
    </div>
    </>
  )
}

export default Contact

{/* <div className='bg-[url("https://source.unsplash.com/1820x680/?code")] min-h-screen opacity-[85%]'>
<div className="p-5">
  <h1 className="text-2xl font-bold mb-4 text-white">About Us</h1>
  <p className='text-white'>
    Welcome to our website! We specialize in converting sign language into alphabetic letters based on the signs captured by the camera. Additionally, we provide the capability to translate text into sign language. Our goal is to bridge the communication gap between individuals who use sign language and those who communicate using written language.
  </p> 
</div>
 </div> */}