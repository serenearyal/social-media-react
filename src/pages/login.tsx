import {auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate();

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate('/')
    }
    return (
        <div>
            <h1>Sign in with Google to post.</h1>
            <button onClick={signIn}>Sign in with Google</button>
        </div>
    )
}