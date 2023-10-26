import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {Post as IPost} from "./main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost;
}

export const Post = (props: Props)=>{
    const {post} = props
    const [user] = useAuthState(auth)
    const [likeAmount, setLikeAmount] = useState<number>(0)

    const likesRef = collection(db, "likes")

    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const getLikes = async ()=>{
        const data = await getDocs(likesDoc);
        setLikeAmount(data.docs.length)
    }

    const addLike = async () =>{
        try{

            await addDoc(likesRef, {userId:user?.uid, postId: post.id})
            setLikeAmount(likeAmount+1)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getLikes()
    },[])
    return (
            <div>
                <div>
                    <h1> {post.title}</h1>
                </div>

                <div>
                    <p>{post.description}</p>
                </div>
                <div>
                    <p>Dumper: {post.username}</p>
                    <button onClick={addLike}>&hearts;</button>
                    <p>{likeAmount}</p>
                </div>
            </div>    
        )
    }