"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = ()=>{

    const {data:session} = useSession();
    const router = useRouter(); // allows navigation inside client components
    const [submitting , setSubmitting] =  useState(false);
    const [post , setPost] =  useState({
        prompt:"",
        tag:"",
    });

    // In Mongoose, we need an API route to act as a middle layer between the frontend and the database
    // In the frontend, we don’t talk to MongoDB directly. Instead, we send a request to the API route.

    const createPrompt = async (e)=> { /*why we do all this instead of a simple methode call Prompt.create()*/
        e.preventDefault(); // prevents the page from reloading when the form is submitted
        setSubmitting(true);
        try{
            const response = await fetch('/api/prompt/new',{
                method:'POST',
                body:JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })
            if (response.ok){
                router.push('/')
            }
        }catch(error){
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    }
    return(
      <Form
          type="create"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createPrompt}
      />
    )
}
export default CreatePrompt;