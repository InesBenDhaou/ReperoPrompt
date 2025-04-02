"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter,useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = ()=>{

    const router = useRouter(); // allows navigation inside client components
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting , setSubmitting] =  useState(false);
    const [post , setPost] =  useState({
        prompt:"",
        tag:"",
    });

    const EditPrompt = async (e)=> { 
        e.preventDefault(); 
        setSubmitting(true);
        if(!promptId) return alert("Prompt does not exists !")
        try{
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt: post.prompt,
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

    useEffect(()=>{
        const getPostDetails = async()=>{
          const response = await fetch(`/api/prompt/${promptId}`)
          const data = await response.json();
          setPost({
            prompt:data.prompt,
            tag:data.tag
          })
        }
        if (promptId) getPostDetails();
   
    },[promptId]) // will reload whenever the prompt id changes

    return(
      <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={EditPrompt}
      />
    )
}
export default EditPrompt;