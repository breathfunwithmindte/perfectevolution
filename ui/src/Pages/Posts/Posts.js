import React from 'react';
import CreatePost from './CreatePost';
import './posts.css'
import { AuthContext } from '../../Context/AuthContext';
import { themeContext } from '../../Context/ThemeContext';
import socket from '../../socket';
import PostsMap from './PostsMap'

function Posts() {
   const { user } = React.useContext( AuthContext );
   const { theme } = React.useContext( themeContext );
   const [loading, setLoading] = React.useState(true);
   const [posts, setPosts] = React.useState([]);

   React.useEffect(() => {
      async function InitialPosts () {
         try{
            let sendServerReq = await socket.emit("get_Posts", {})
            socket.on("Posts", ({posts, error}) => {
               //console.log(posts, error)
               if(error === undefined){
                  setPosts(posts);
                  setLoading(false);
               }else {
                  setLoading(true)
               }
            })
         }catch(err){
            //console.log(err)
            alert("smth went wrong refresh the page")
         } 
      }
      InitialPosts();
   }, [user])

if(theme === "dark") return (
   <div className="Post_Container__DARK">
      <div className="CreatePost_Container__DARK">
         <CreatePost authID={user._id} theme={theme} profile={user.profile} />  
      </div>
      <hr />
      <PostsMap posts={posts} loading={loading} />
   </div>
)
else if(theme === "light") return (
   <div className="Post_Container__LIGHT">
      <div className="CreatePost_Container__LIGHT">
         <CreatePost authID={user._id} theme={theme} profile={user.profile}/>  
      </div>
        <hr />
        <PostsMap posts={posts} loading={loading} />
   </div>
) 
else if(theme === "black") return (
   <div className="Post_Container__BLACK">
      <div className="CreatePost_Container__BLACK">
         <CreatePost authID={user._id} theme={theme} profile={user.profile}/>  
      </div>
      <hr />
      <PostsMap posts={posts} loading={loading} />
   </div>
)
else if(theme === undefined) return (
   <div className="Post_Container__DARK">
      <div className="CreatePost_Container__DARK">
         <CreatePost authID={user._id} theme={theme} profile={user.profile}/>  
      </div>
      <hr />
      <PostsMap posts={posts} loading={loading}/>
   </div>
)
}

export default Posts
