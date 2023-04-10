import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, Providers } from '../config/firebase'
import image from '../assets/images/title_image.jpg'


function Navbar() {
    const [signedIn, setSignedIn] = useState(Boolean)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            // User is signed in
            setSignedIn(true);
          } else {
            // User is signed out
            setSignedIn(false);
          }
        })
    });

    const signOutOnClick = () => {
        signOut(auth)
        setTimeout(() => {location.reload() }, 500)
        setSignedIn(false)
    }

    const signInOnClick = async () => {
        const response = await signInWithPopup(auth, Providers.google);
        if ( response.user ) {
            location.reload()
        }
        setSignedIn(true)
    }

    
   
    
  return (
    <nav>
        <div className="nav-bar">
            <Link to='/' className='title'><img src={`${image}`}  alt="" /></Link>
            <div className='nav-btns'>
                <Link to='/' className="nav-btn" >
                    Search
                </Link>
                <Link to='/plans' className="nav-btn">
                    My Plans
                </Link>
                <Link to='/about' className="nav-btn">
                    About
                </Link>
                {signedIn ?
                <button onClick={signOutOnClick} className="nav-btn">
                    Log Out
                </button> 
                :
                <button onClick={signInOnClick} className="nav-btn">
                    Log In        
                </button> 
                }
                
            </div>

        </div>
    </nav>
  )
}

export default Navbar