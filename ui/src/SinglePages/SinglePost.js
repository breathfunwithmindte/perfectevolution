import React from 'react';
import "./singlepage.css";
import socket from '../socket';
import { AuthContext } from '../Context/AuthContext';
import { themeContext } from '../Context/ThemeContext';
import { CommentsP } from '../Pages/ExportsFolder';
import NavBarSinglePage from '../NavBar/NavBarSinglePage';
import CreateComment from './CreateComment';
import SinglePostContent from './SinglePostContent';
import LinearProgress from '@material-ui/core/LinearProgress';


function SinglePost(props) {
   const [singlePost, setSinglePost] = React.useState();
   const [loading, setLoading] = React.useState(true);
   const { user } = React.useContext( AuthContext );
   const { theme } = React.useContext( themeContext );
   const [profile, setProfile] = React.useState({});

   const likes = 43;

   const id = props.match.params.id

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
   })

if(singlePost === undefined) return <LinearProgress color="secondary" />
  else if(theme === undefined) {
      return (
         <div>
            <NavBarSinglePage />
            <div className="singlePost_post">
               {singlePost === undefined ? null :
               <SinglePostContent post={singlePost} />}
            </div>
            <div>
               <div>
                  title place
               </div>
               <div>
                  Comments will be here
               </div>
               <div className="create_comment_forPost">
                  <CreateComment postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} userID={user._id} profile={user.profile}/>
               </div>
            </div>
         </div>
      )
   }
   else if(theme === "dark") {
      return (
         <div className="SinglePost_Container__DARK">
            <header>
               <NavBarSinglePage />
            </header>
            <div className="singlePost_post">
               {singlePost === undefined ? null :
               <SinglePostContent post={singlePost} />}
            </div>
            <div>
               <div>
                  title place
               </div>
               <div>
                  Comments will be here
               </div>
               <div className="create_comment_forPost">
                  <CreateComment postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} userID={user._id} profile={user.profile}/>
               </div>
            </div>
         </div>
      )
   }
   else if(theme === "light") {
      return (
         <div className="SinglePost_Container__LIGHT">
            <main>
               <section className="singlePost_title">
                  <img src={""} alt="profile"/>
                  <div>
                     <span>LK</span>
                     <span>DL</span>
                     <span>({likes})</span>
                  </div>
                  <p>{Date.now()}</p>
               </section>

               
               <section className="singlePost_body">
                  adfjgkadfgkjadfbgakd<br/>
                  adfjgkadfgkjadfbgakd<br/>
                  adfjgkadfgkjadfbgakd<br/>
                  adfjgkadfgkjadfbgakd<br/>
                  adfjgkadfgkjadfbgakd<br/>
                  adfjgkadfgkjadfbgakd<br/>
                  adfjgkadfgkjadfbgakd<br/>
               </section>
            </main>

            <aside>
               <NavBarSinglePage/>

               <section className="singlePost_comments">
                  
               </section>   
            </aside>
         </div>
      )
   }
   else if(theme === "black") {
      return (
         <div className="SinglePost_Container__BLACK">
            <header>
                <NavBarSinglePage />
            </header>
            <div className="singlePost_post">
               {singlePost === undefined ? null :
               <SinglePostContent post={singlePost} />}
            </div>
            <div>
               <div>
                  title place
               </div>
               <div>
                  Comments will be here
               </div>
               <div className="create_comment_forPost">
                  <CreateComment postID={singlePost._id} Writter={singlePost.auth._id} user_firstname={user.firstName} authID={user._id} profile={user.profile}/>
               </div>
            </div>
         </div>
      )
   }

}

export default SinglePost
