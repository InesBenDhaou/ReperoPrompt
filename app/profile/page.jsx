"use client"
import { useState,useEffect} from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";


const MyProfile = () => {
    const {data:session} = useSession();
    const router = useRouter();
    const [posts,setPosts] = useState([]);

    const handleEdit = (post) =>{
      router.push(`update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
      if(hasConfirmed){
        try{
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:'DELETE'
          });
        const filtredPosts = posts.filter((p)=>p.id !== post._id);
        setPosts(filtredPosts);
        }catch(error){

        }
      }
    }

    useEffect (()=> { // once the page loaded we will call all the posts created
      const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
      }
      if (session?.user.id) fetchPosts();
    },[]);

    return (
        <Profile 
            name="My"
            desc="welcome to my personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
         
    )
}

export default MyProfile ;