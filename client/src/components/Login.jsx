import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "../config/firebase.config"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { validateUser } from '../api'
import {BgImg} from '../assets/img'
const Login = ({setAuth}) => {
  const navigate = useNavigate()
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{user}, dispatch] = useStateValue()
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data
                })
              })
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null
            })
            navigate("/login");
          }
        });
      }
    });
  };
  useEffect(() =>{
    if(window.localStorage.getItem("auth" === "true")){
      navigate("/", {replace: true})
    }
  })
  return (
    <div className='relative w-screen h-screen '>
      <img src={BgImg} className='w-full h-full object-cover' alt="" />
      <div className='absolute inset-0  flex items-center flex-col justify-center p-4'>
       <h1 className='z-10 top-[70px] md:text-[40px] sm:text-[30px] text-[20px] text-[#285568] font-bold pb-10'><span className='text-[#5CA39C]'>এসো</span> ইসলামের <span className='text-[#d11593]'>পথে</span></h1>
        <div className='w-full md:w-375 p-4 bg-gray-300 shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all '
          onClick={loginWithGoogle}>
            <FcGoogle className='text-xl' />
            Sing in with Google
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login