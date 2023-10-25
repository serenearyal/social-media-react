import {Link} from 'react-router-dom'
import {auth} from '../config/firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from 'firebase/auth'
import "./navbar.css"

export const Navbar = () => {
    const [user] = useAuthState(auth)

    const logOut = async () => {
        await signOut(auth)
    }
    return (
        <div className='navbar'>
            <div className="links">
                <Link to="/"> Home</Link>
                <Link to="/login"> Login</Link>
            </div>

            <div className='userInfo'>
                {user &&
                    <>
                        <p>{user?.displayName}</p>
                        <button onClick={logOut}>Log Out</button>
                    </>
                }
            </div>
        </div>
    )
}