import React from 'react';
import "./singlepage.css";
import socket from '../socket';
import { AuthContext } from '../Context/AuthContext';
import { themeContext } from '../Context/ThemeContext';
import NavBarSinglePage from '../NavBar/NavBarSinglePage';
import CreateComment from './CreateComment';
import SinglePostContent from './SinglePostContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import CommentsP from '../Comments/CommentsP/CommentsP';
import { LikeDis } from '../Comments/ExportFolder'
import { FcLike, FcLikePlaceholder} from 'react-icons/fc'


function SinglePost(props) {
   const [singlePost, setSinglePost] = React.useState(undefined);
   const [loading, setLoading] = React.useState(true);
   const { user } = React.useContext( AuthContext );
   const { theme } = React.useContext( themeContext );
   const [profile, setProfile] = React.useState({});

   const id = props.match.params.id;
   console.log("singlepost ===>>>",singlePost)

   React.useEffect(() => {
      async function Initialisation() {
            setLoading(true)
         let ServerReq = await socket.emit("single_post", {id});
         socket.on("get_signlePost", ({post}) => {
            setSinglePost(post);
            setLoading(false);
         })
      }
      Initialisation();
   }, [id])

   React.useEffect(() => {
      async function getProfile_forSinglePost(){
         try{
            let RequestServer_forProfileByID = socket.emit("get_profile_byID", {profileID: user.profile, userID: user._id});
            socket.on(`profile_response_forUser_${user._id}`, ({profile, error}) => {
               if(error && error === "smth went wrong"){
                  alert("smth went wrong we are trying to fix the problem as soon as this is possible !!")
               }else {
                  setLoading(false);
                  setProfile(profile);
               }
            })
         }catch(err){
            console.log(err);
            alert("smth went wrong with profiles, perfectevolution team is trying hard to fix the problem as soos as this is possible. Refresh tha page or try again later");
         }
      }
      getProfile_forSinglePost();
   },[id])

if(singlePost === undefined) return <LinearProgress color="secondary" />
  else if(theme === undefined) {
      return (
         <div className="SinglePost_Container__DARK">
         <main>
            <section className="singlePost_title__DARK">
              <img src={singlePost.auth.profileImage} alt="" style={{ width: "34px", height: "34px", borderRadius: "50%"}} />
      
       <p>{singlePost.auth.username}</p>         <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                  {
                     singlePost.Love.find(d=>d._id === user._id) ? <FcLike data-toggle="tooltip"
                     title="You already loved this post" style={{fontSize: "34px", color: "red"}} /> 
                     :
                     <FcLikePlaceholder style={{fontSize: "34px", color: "white"}} data-toggle="tooltip" title="Love this post?" onClick={async () => {
                        try{
                           let ReqServer = await socket.emit("love_post", {postID: singlePost._id, authID: user._id})
                        }catch(err){
                           //console.log(err)
                           alert("smth went wrong refresh the page !!")
                        }
                     }}/>
                  }
                  <LikeDis postID={singlePost._id} Writter={singlePost.auth._id} authID={user._id} profile={profile}/>
               </div>
               <p>{Date.now()}</p>
            </section>

            
            <section className="singlePost_body__DARK">
                <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />

            </section>
         </main>

         <aside>
            <NavBarSinglePage user={user}/>

            <section className="singlePost_comments">
               <div>
                 <CommentsP style={{overflowY:"scroll"}} postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} authID={user._id} profile={user.profile}/>
               </div>
               <CreateComment postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} authID={user._id} profile={user.profile}/>
            </section>   
         </aside>
      </div>
      )
   }
   else if(theme === "dark") {
      return (
         <div className="SinglePost_Container__DARK">
         <main>
            <section className="singlePost_title__DARK">
              <img src={singlePost.auth.profileImage} alt="" style={{ width: "34px", height: "34px", borderRadius: "50%"}} />
      
       <p>{singlePost.auth.username}</p> <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
       {
          singlePost.Love.find(d=>d._id === user._id) ? <FcLike data-toggle="tooltip"
          title="You already loved this post" style={{fontSize: "34px", color: "red"}} /> 
          :
           <FcLikePlaceholder style={{fontSize: "34px", color: "white"}} data-toggle="tooltip" title="Love this post?" onClick={async () => {
              try{
               let ReqServer = await socket.emit("love_post", {postID: singlePost._id, authID: user._id})
              }catch(err){
                 //console.log(err)
                 alert("smth went wrong refresh the page !!")
              }
          }}/>
       }
       <LikeDis postID={singlePost._id} Writter={singlePost.auth._id} authID={user._id} profile={profile}/>
    </div>
               <p>{Date.now()}</p>
            </section>

            
            <section className="singlePost_body__DARK">
               <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />
            </section>
         </main>

         <aside>
            <NavBarSinglePage user={user}/>

            <section className="singlePost_comments">
               <div>
                 <CommentsP style={{overflowY:"scroll"}} postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} authID={user._id} profile={user.profile}/>
               </div>
               <CreateComment postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} authID={user._id} profile={user.profile}/>
            </section>   
         </aside>
      </div>
      )
   }
   else if(theme === "light") {
      return (
         <div className="SinglePost_Container__LIGHT">
            <main>
               <section className="singlePost_title__LIGHT">
                 <img src={singlePost.auth.profileImage} alt="" style={{ width: "34px", height: "34px", borderRadius: "50%"}} />
                  <p style={{color: "black", marginLeft: "-4vw"}}>{singlePost.auth.username}</p>
                 <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                  {
                     singlePost.Love.find(d=>d._id === user._id) ? <FcLike data-toggle="tooltip"
                     title="You already loved this post" style={{fontSize: "34px", color: "red"}} /> 
                     :
                     <FcLikePlaceholder style={{fontSize: "34px", color: "white"}} data-toggle="tooltip" title="Love this post?" onClick={async () => {
                        try{
                           let ReqServer = await socket.emit("love_post", {postID: singlePost._id, authID: user._id})
                        }catch(err){
                           //console.log(err)
                           alert("smth went wrong refresh the page !!")
                        }
                     }}/>
                  }
                  <LikeDis postID={singlePost._id} Writter={singlePost.auth._id} authID={user._id} profile={profile}/>
               </div>
                  <p>{Date.now()}</p>
               </section>

               
               <section className="singlePost_body__LIGHT">
                <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />
               </section>
            </main>

            <aside>
               <NavBarSinglePage user={user}/>

               <section className="singlePost_comments">
                  <div>
                    <CommentsP style={{overflowY:"scroll"}} postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} authID={user._id} profile={user.profile}/>
                  </div>
                  <CreateComment postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} authID={user._id} profile={user.profile}/>
               </section>   
            </aside>
         </div>
      )
   }
   else if(theme === "black") {
      return (
         <div className="SinglePost_Container__BLACK">
            <main>
               <section className="singlePost_title__BLACK">
                 <img src={singlePost.auth.profileImage} alt="" style={{ width: "34px", height: "34px", borderRadius: "50%"}} />
                  <p>{singlePost.auth.username}</p>
                 <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                  {
                     singlePost.Love.find(d=>d._id === user._id) ? <FcLike data-toggle="tooltip"
                     title="You already loved this post" style={{fontSize: "34px", color: "red"}} /> 
                     :
                     <FcLikePlaceholder style={{fontSize: "34px", color: "white"}} data-toggle="tooltip" title="Love this post?" onClick={async () => {
                        try{
                           let ReqServer = await socket.emit("love_post", {postID: singlePost._id, authID: user._id})
                        }catch(err){
                           //console.log(err)
                           alert("smth went wrong refresh the page !!")
                        }
                     }}/>
                  }
                  <LikeDis postID={singlePost._id} Writter={singlePost.auth._id} authID={user._id} profile={profile}/>
               </div>
                  <p>{Date.now()}</p>
               </section>

               
               <section className="singlePost_body__BLACK">
                 <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />
               </section>
            </main>

            <aside>
               <NavBarSinglePage user={user}/>

               <section className="singlePost_comments">
                  <div>
                    <CommentsP style={{overflowY:"scroll"}} postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} authID={user._id} profile={user.profile}/>
                  </div>
                  <CreateComment postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} authID={user._id} profile={user.profile}/>
               </section>   
            </aside>
         </div>
      )
   }

}

export default React.memo(SinglePost);
