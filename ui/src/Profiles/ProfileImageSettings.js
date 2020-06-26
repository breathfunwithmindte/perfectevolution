import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { PhotoCamera } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';
import axios from 'axios';
import socket from '../socket'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

const ProfileImageSettings = (props) => {
    const classes = useStyles();
    const [newProfile, setnewProfile] = React.useState("");
    const [newCover, setnewCover] = React.useState("");
    const [Err, setErr] = React.useState("");
    const [loading, setloading] = React.useState(false)

    async function ProfileSubmit(){
        try{
            setloading(true)
            let files = newProfile;
            let file_data = await new FormData();
            file_data.append("file", files[0]);
            file_data.append("upload_preset", "Profile_Photoes");
            let SendDataToCloudinaryServer = await axios.post("https://api.cloudinary.com/v1_1/perfectevolutionsite/image/upload", file_data)
            let SendSecureURLtoSERVER = await socket.emit("update_profilePhoto", {profileImage: SendDataToCloudinaryServer.data.secure_url, authID: props.user._id, profile: props.user.profile});
            setloading(false)
            setErr("You photo succefully saved !!")
        }catch(err){ alert(err) }
        }
    async function CoverSubmit(){
        try{
            setloading(true)
            let files = newCover;
            let cover_data = await new FormData();
            cover_data.append("file", files[0]);
            cover_data.append("upload_preset", "Profile_Cover");
            let SendDataToCloudinaryServer = await axios.post("https://api.cloudinary.com/v1_1/perfectevolutionsite/image/upload", cover_data)
            let SendSecureURLtoSERVER = await socket.emit("update_coverPhoto", {coverImage: SendDataToCloudinaryServer.data.secure_url, profile: props.user.profile});
            setloading(false)
            setErr("You photo succefully saved !!")
         }catch(err){ alert(err) }
        }
     

    if(props.theme === "dark" || props.theme === "black")
    return (
        <div className="Dialog_ProfileImageSettings_container__DARK">
            <div style={{display: "flex", flexDirection: "column"}}>
                <p>Profile Image</p>
                {Err === "" ? null : <p style={{color: "red"}}>{Err}</p>}
                <img src={props.profile.profileImage} alt="" />
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" name="profile" 
                    onChange={(event)=>{
                    let file = event.target.files[0]
                    let isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if(!isJpgOrPng){setErr('Only jpg or Png is allowed');}
                    else if(!isLt2M){setErr('Too big Photo');}
                    else {
                        setErr('');
                        setnewProfile(event.target.files)
                     }  
                   }
                 }/>
                  <label htmlFor="icon-button-file">
                    <IconButton className="createSelfie_mUI_btn" color="secondary" aria-label="upload picture" component="span">
                         <PhotoCamera style={{fontSize: '46px'}}/>
                    </IconButton>
                 </label> 
                 <div>
                 {newProfile !== "" ? <Button name="profile" className="save_button_for_profile_Image_settings" color="secondary" onClick={ProfileSubmit}>save</Button> : null}
                 {loading === true ? <CircularProgress color="secondary" /> : null}
                 </div>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <p>Cover Image</p>
                <img src={props.profile.coverImage} alt="" />
                <input accept="image/*" className={classes.input} id="icon-button-file-cover" type="file" name="cover" 
                    onChange={(event)=>{
                    let file = event.target.files[0]
                    let isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if(!isJpgOrPng){setErr('Only jpg or Png is allowed');}
                    else if(!isLt2M){setErr('Too big Photo');}
                    else {
                        setErr('');
                        setnewCover(event.target.files)
                     }  
                   }
                 }/>
                  <label htmlFor="icon-button-file-cover">
                    <IconButton className="createSelfie_mUI_btn" color="secondary" aria-label="upload picture" component="span">
                         <PhotoCamera style={{fontSize: '46px'}}/>
                    </IconButton>
                 </label> 
                 <div>
                 {newCover !== "" ? <Button name="cover" color="secondary" className="save_button_for_cover_Image_settings" onClick={CoverSubmit}>save</Button> : null}
                 {loading === true ? <CircularProgress color="secondary" /> : null}
                 </div>
            </div>
            
        </div>
    ) 
    else if(props.theme === "light") return (
        <div className="Dialog_ProfileImageSettings_container__LIGHT">
            <div style={{display: "flex", flexDirection: "column"}}>
                <p>Profile Image</p>
                {Err === "" ? null : <p style={{color: "red"}}>{Err}</p>}
                <img src={props.profile.profileImage} alt="" />
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" name="profile" 
                    onChange={(event)=>{
                    let file = event.target.files[0]
                    let isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if(!isJpgOrPng){setErr('Only jpg or Png is allowed');}
                    else if(!isLt2M){setErr('Too big Photo');}
                    else {
                        setErr('');
                        setnewProfile(event.target.files)
                     }  
                   }
                 }/>
                  <label htmlFor="icon-button-file">
                    <IconButton className="createSelfie_mUI_btn" color="secondary" aria-label="upload picture" component="span">
                         <PhotoCamera style={{fontSize: '46px'}}/>
                    </IconButton>
                 </label> 
                 <div>
                 {newProfile !== "" ? <Button name="profile" className="save_button_for_profile_Image_settings" color="secondary" onClick={ProfileSubmit}>save</Button> : null}
                 {loading === true ? <CircularProgress color="secondary" /> : null}
                 </div>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <p>Cover Image</p>
                <img src={props.profile.coverImage} alt="" />
                <input accept="image/*" className={classes.input} id="icon-button-file-cover" type="file" name="cover" 
                    onChange={(event)=>{
                    let file = event.target.files[0]
                    let isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if(!isJpgOrPng){setErr('Only jpg or Png is allowed');}
                    else if(!isLt2M){setErr('Too big Photo');}
                    else {
                        setErr('');
                        setnewCover(event.target.files)
                     }  
                   }
                 }/>
                  <label htmlFor="icon-button-file-cover">
                    <IconButton className="createSelfie_mUI_btn" color="secondary" aria-label="upload picture" component="span">
                         <PhotoCamera style={{fontSize: '46px'}}/>
                    </IconButton>
                 </label> 
                 <div>
                 {newCover !== "" ? <Button name="cover" color="secondary" className="save_button_for_cover_Image_settings" onClick={CoverSubmit}>save</Button> : null}
                 {loading === true ? <CircularProgress color="secondary" /> : null}
                 </div>
            </div>
            
        </div>
    )
}

export default React.memo(ProfileImageSettings);