import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc, collection} from "firebase/firestore"
import {auth, db} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import "./create-form.css"

interface FormData{
    title: string;
    description: string;
}

export const CreateForm = () =>{

    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const schema = yup.object().shape({
        title: yup.string().required("Posts must have a title."),
        description: yup.string().required("Please write some description."),
    })

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts")

    const onCreatePost = async (data: FormData) =>{
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,

        })
    navigate("/")
    }
    return (
        <form onSubmit= {handleSubmit(onCreatePost)}>
            <input className="title" placeholder="Title..." {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea className="description" placeholder="Description..." {...register("description")}/>
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input className="dump-button" type="submit" value="Dump"/>
        </form>
    )
}