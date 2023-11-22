import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'

const Admin = () => {

    const [data, setData] = useState([]);
    const [head, sethead] = useState([]);

    const [selectedUser, setSelectedUser] = useState('User');
    const [selectedOption, setSelectedOption] = useState('Text to sign');
    const [selectedTime, setSelectedTime] = useState('Today');

  const location = useLocation()
//   const navigate = useNavigate();
  const [uname,setusername] = useState('')


  const {user} = location.state || {user:'Guest'}
  // const { authent } = location.state || { authent: 'not' };

  const authent = location?.state?.authent || 'not';
  const navigate = useNavigate();
  // if(location.state.authent == undefined)
  // {
  //   const {authent} = location.state.authent
  //   authent = 'not'
  // }
  // else
  // {
  //   const {authent} = location.state.authent
  // }

  // useEffect(() => {
  //   setusername(user);
  // }, [user]);

  useEffect(() => {
    if (location.state && location.state.user) {
      setusername(user);
    }
  }, []);
    
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

          const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  useEffect(() => {
    // Fetch data from the backend based on the selected options
    fetchData(selectedUser, selectedOption, selectedTime);
  }, [selectedUser, selectedOption, selectedTime]);

  const fetchData = (user, option, time) => {
    // Make the API request to fetch data from the backend
    // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API
    axios
      .post('http://127.0.0.1:8000/dash/', { 'user': user,'option':option,'time':time}, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        // Update the data state with the fetched data
        setData(response.data.res);
        sethead(response.data.headers)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const listItems = data.map((myList) =>  
    <li>{myList}</li>  
  );  

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
      {/* <div className='outline outline-black mx-3 pt-0.5 mt-2 pb-5'>
        <div className='mt-5'>
            <select className='mx-36 outline outline-black rounded-md '>
                <option>User</option>
                <option>Guest</option>
            </select>
            <select className='mx-36 outline outline-black rounded-md '>
                <option>Text to sign</option>
                <option>Sign to text</option>
                <option>None</option>
            </select>    
            <select className='mx-36 outline outline-black rounded-md '>
                <option>Today</option>
                <option>This week</option>
                <option>This month</option>
                <option>All time</option>
            </select>        
        </div>
            <table className=' border border-black text-3xl outline-black table-auto mt-8 mx-auto'>
                <thead>
                    <tr>
                        <th>Hello</th>
                        <th>world</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Some</td>
                        <td>thing</td>
                    </tr>
                </tbody>
            </table>
      </div> */}
      <div className=' outline-black mx-3 pt-0.5 mt-2 pb-5'>
        <div className='mt-5'>
          <select
            className='mx-36 outline outline-black rounded-md '
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option>User</option>
            <option>Guest</option>
          </select>
          <select
            className='mx-36 outline outline-black rounded-md '
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option>Text to sign</option>
            <option>Sign to text</option>
            <option>None</option>
          </select>
          <select
            className='mx-36 outline outline-black rounded-md '
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
            <option>All time</option>
          </select>
        </div>
        <table className='border border-black text-md outline-black table-fixed w-full mt-8'>
          <thead>
              <tr>
          {head.map((row) => (
                    <th>{row}</th>
                    ))}
                    </tr>
          </thead>
          <tbody>
          {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
        </tbody>
        </table>
{/*         
         <h2>React Map Example</h2>  
              <ul>{listItems}</ul>   */}
      </div>

    </div>
  )
}

export default Admin
