import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc, collection} from "firebase/firestore"
import {auth, db} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

interface FormData{
    title: string;
    description: string;
}

export const CreateForm = () =>{

    const [user] = useAuthState(auth)

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
    }
    return (
        <form onSubmit= {handleSubmit(onCreatePost)}>
            <input placeholder="Title..." {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register("description")}/>
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input type="submit" />
        </form>
    )
}