import {Link} from 'react-router-dom'
import {auth} from '../config/firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from 'firebase/auth'
import "./navbar.css"
import logo from "./dump-logo.png"
import { useNavigate } from "react-router-dom"


export const Navbar = () => {
    const [user] = useAuthState(auth)

    const navigate = useNavigate()

    const logOut = async () => {
        await signOut(auth)
        navigate("./")
    }
    return (
        <div className='navbar'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="links">
                <Link to="/"> Home</Link>
                {!user?
                    (<Link to="/login"> Login</Link>):

                (<Link to="/createpost"> Create Post</Link>)
                }
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