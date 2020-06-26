import React from 'react';
import "./profile.css"

export default function ProfileGlobal({profile}) {
    return (
        <div className="Profile_Global_container">
            <img className="Profile_Global_coverImage" src={profile.coverImage} alt="" />
            <img className="Profile_Global_profileImage" src={profile.profileImage} alt="" />
            <p className="">{profile.username}</p>
            <div className="Profile_Global_statusContent" dangerouslySetInnerHTML={{ __html: profile.statusContent }} />
        </div>
    )
}