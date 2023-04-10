import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, Providers } from '../config/firebase'

interface Props {
    children: React.ReactNode;
}

const AuthChecker = ({ children }: Props) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const logOut = auth.onAuthStateChanged(user => {
        
        if (!user) {
          navigate('../');
          signInWithPopup(auth, Providers.google);
        }
      });
  
      return () => logOut();
    }, [navigate]);
  
    return <>{children}</>;
  };
  
  export default AuthChecker;