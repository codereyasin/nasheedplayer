import { useEffect, useState } from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom'
import {Login, Home, Dashboard, NasheedPlayer} from './components';
import { app } from './config/firebase.config';
import {getAuth} from 'firebase/auth'
import {AnimatePresence} from 'framer-motion'
import { validateUser } from './api';
import {motion} from 'framer-motion'
import { useStateValue} from './context/StateProvider'
import { actionType } from './context/reducer';
function App() {
  const firebaseAuth = getAuth(app)
  const [auth, setAuth] = useState(false || window.localStorage.getItem('auth' === 'true'))
  const [{user, isNasheedPlaying}, dispatch] = useStateValue()

  const navigate = useNavigate()
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if(userCred){
        userCred.getIdToken().then((token) =>{
        validateUser(token).then((data) => {
         dispatch({
          type: actionType.SET_USER,
          user: data,
         })
        });
      });
    }else{
        setAuth(false)
        window.localStorage.setItem('auth', 'false')
        dispatch({
          type: actionType.SET_USER,
          user: null,
        })
        navigate('/login')
      }
    })
  }, [])
  

  return (
    <AnimatePresence exitBeforeEnter>
    <div className=" h-auto bg-primary justify-center flex items-center">
       <Routes>
          <Route path='/login' element={<Login setAuth={setAuth}/>}/>
          <Route path='/*' element={<Home/>}/>
          <Route path='/dashboard/*' element={<Dashboard/>}/>
       </Routes>

       {isNasheedPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <NasheedPlayer />
          </motion.div>
        )}
    </div>
    </AnimatePresence>
  );
}

export default App;
