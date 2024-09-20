"use clinet"
import {useState,useEffect} from 'react'
import React from 'react'
import {FaUser} from 'react-icons/fa'
import Spinner from '@/components/Spinner'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {login,reset} from '../features/auth/authSlice'

const Login = () => {

  const [formData,setFormData]=useState({email:'',password:''})
  const {email,password}=formData;
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  const dispatch = useDispatch();
  const router=useRouter();
  const {user,isLoading,isSuccess,message,isError}=useSelector((state)=>state.auth)


  useEffect(()=>{
    if(isError){
      console.log(isError)
     setPasswordError('Password is incorrect pls try again')
    }
   
    if(isSuccess){
      alert('login Sucessfull')
       router.push('/mealsorder')
       dispatch(reset())
    }

    return(()=>{
      dispatch(reset())
    })
  
  },[isError,isSuccess,user,message,router,dispatch])
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if(e.target.name==='email') setEmailError('')
    if(e.target.name==='password') setPasswordError('')
  };
  const onSubmit=(e)=>{
    e.preventDefault();

    if (!email) {
      setEmailError('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email')
    }
    if (!password) {
      setPasswordError('Password is required')
    } else if (password.length < 6) {
      setPasswordError('You have Entered the Wrong Password')
    }
    if (email && /\S+@\S+\.\S+/.test(email) && password && password.length >= 6) {
      const userData = { email, password }
      dispatch(login(userData))
    }
   

  }
    if(isLoading){
      return <Spinner/>;
    }

  
  return (
   <>
   <section className='heading'>
    <h1>
      <FaUser/> Login
    </h1>
   </section>
   <section className='from'>
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <input
        type="email"
        className='form-control'
        id='email'
        name='email'
        value={email}
        onChange={onChange}
        placeholder='Enter your Email'
        required
        />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
       </div>

       <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter Your Password"
            required
          />
               {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        <div className='form-group'>
          <button className='btn btn-block'>Submit</button>


        </div>
        <div>
          <p>Dont Have Account Pls<Link href='/Register'> <b>Register </b></Link></p>
        </div>
    </form>

   </section>
   </>
  )
}

export default Login


