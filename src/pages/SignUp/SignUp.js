import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../images/login/login.svg'
import { AuthContext } from "../../contexts/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTitle from '../../hooks/useTitle';
import SocialSignIn from '../../shared/SocialSignIn/SocialSignIn';


const SignUp = () => {
  const [passwordError, setPasswordError] = useState("");
  const { createUserByEmail,updateName, loading} =  useContext(AuthContext);
  
  const navigate = useNavigate()
     
useTitle('signup')
  const handleEmailPassword = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value
    // console.log(name, email, password)

    if (password.length < 8) {
      setPasswordError("password should be 8 character");
      return;
    }

    createUserByEmail(email, password)
      .then((result) => {
        const user = result.user;
        const currentUser = {
          email : user.email
      }
        fetch('https://fly-plane-web-server.vercel.app/jwt',{
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(currentUser)
        })
        .then(res=>res.json())
        .then(data=>{
          localStorage.setItem('token', data.token)
           
        })
        updateName()
        navigate('/')
        toast("Wow so easy!")
        handleUpdateProfile(name, photoURL)
        console.log(user);
  
      })
      .catch((error) => {
        setPasswordError(error.message);
      });

  };
 
  const handleUpdateProfile = (name, photoURL) => {
    const profileName = { displayName: name, photoURL: photoURL };
    updateName(profileName)
      .then(() => {})
      .catch((error) => setPasswordError(error.message));
  };
  
    return (

        <div>

          {
            loading ?  <div class="text-center">
            <div role="status">
                <svg class="inline mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        
          </div> : <div className="hero min-h-screen bg-base-200">
        <ToastContainer />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
         
        <img className="hidden md:flex" src={image} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleEmailPassword} className="card-body">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name='name' placeholder="name" className="input input-bordered" required/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input type="text" name='photoURL' placeholder="photoURL" className="input input-bordered" required/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required/>
              <label className="label">
                <p>Already have an account?
                <Link to='/signin' className="label-text-alt link link-hover text-blue-400 text-xl">Sign In</Link></p>
              </label>
            </div>
            <p className='text-red-300'>{passwordError}</p>
            <div className="form-control mt-6">
               <button  className='btn btn-primary'>Sign Up</button>
               <div  >

               <SocialSignIn></SocialSignIn>
               </div>
            </div>
          </form>
        </div>
      </div>
    </div>
          }
        </div>

      
 
    );
};

export default SignUp;