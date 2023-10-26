import {getDocs, collection} from "firebase/firestore"
import { db} from '../../config/firebase'
import { useEffect, useState } from "react"
import {Post} from './post'
import "./main.css"

export interface Post {
    id: string;
    userID: string;
    title: string;
    username: string;
    description: string;
}

export const Main = () => {
    const [postList, setPostsList] = useState<Post[] | null>(null)
    const postsRef = collection(db, "posts")

    const getPosts =async () => {
        const data = await getDocs(postsRef)
        const postListDraft = data.docs.map((doc)=> ({...doc.data(), id: doc.id})) as Post[]

        function shuffleArray(array: any) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(postListDraft)
        
        setPostsList(postListDraft)
    }

    useEffect(()=>{
        getPosts();
    }, []);
    return (
        <>
            <div className="main-header">
                <h1>Today's Feature Dumps</h1>
            </div>
            <div className="posts">
                {postList?.slice(0,20).map((post)=>(
                    <Post post={post}/>
                )
                )}
            </div>
        </>
    )
}