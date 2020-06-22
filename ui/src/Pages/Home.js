import React from 'react';
import './home.css'
import '../global_style.css';
import useDocumentTitle from "use-document-title";
import { AuthContext } from '../Context/AuthContext';
import { themeContext } from '../Context/ThemeContext';
import HomeHeader  from './HomeComponents/HomeHeader';
import {useHistory} from 'react-router-dom';
import {Posts, Selfies, AskQuestions, Girls, Premade} from './ExportsFolder';
import { TiWorld } from 'react-icons/ti'
import { FcGallery, FcIdea, FcOnlineSupport} from 'react-icons/fc'

function Home(props) {
    const { user } = React.useContext( AuthContext );
    const { theme } = React.useContext( themeContext );

    let pageRender = props.match.params.pageRender;
    console.log(pageRender)

    useDocumentTitle(`HaveFun ${user.firstName}`);
    const History = useHistory();


    if(theme === "dark") return (
                <div className="Home_container__DARK">
                <HomeHeader />
                <div className="Home_changePages">
                    <button className="Home_chageP_button__DARK" onClick={() => {
                        History.push(`/${user.firstName}'s_App/Posts`)
                    }}>
                        <h3>
                            Posts
                        </h3>
                           <TiWorld />
                    </button>
                    <button className="Home_chageP_button__DARK" onClick={() => {
                        History.push(`/${user.firstName}'s_App/Selfies`)
                    }}>
                        <h3>
                            Selfies
                        </h3>
                           <FcGallery />
                    </button >
                    <button className="Home_chageP_button__DARK" onClick={() => {
                            History.push(`/${user.firstName}'s_App/AskQuestions`)
                    }}>
                        <h3>
                            AskQuestions
                        </h3>
                           <FcIdea />
                    </button>
                    <button className="Home_chageP_button__DARK" onClick={() => {
                        History.push(`/${user.firstName}'s_App/Girls`)
                    }}>
                        <h3>
                            Girls
                        </h3>
                            <FcOnlineSupport />
                    </button>
                    <button className="Home_chageP_button__DARK" onClick={() => {
                            History.push(`/${user.firstName}'s_App/Premades`)
                    }}>
                        Find Premade!!
                    </button> 
                </div>
                <div style={{position: "fixed", top: "3vh", right: "5vw", width: "20vw", height: "34vh", borderRadius: "4px", backgroundColor: "red", zIndex: "3"}}>
                    here will be products ff
                </div>
                <div style={{position: "fixed", top: "40vh", right: "5vw", width: "20vw", height: "56vh", borderRadius: "4px",background: "white", zIndex: "3"}}>
                    here will users
                </div>
                <div style={{marginLeft: "20vw", paddingLeft: "2vw", paddingRight: '2vw', width: "50vw",             minHeight: "50%"}}>
                    {
                        pageRender === "Posts" ? <Posts /> : 
                        pageRender === "Selfies" ? <Selfies /> :
                        pageRender === "AskQuestions" ? <AskQuestions /> :
                        pageRender === "Girls" ? <Girls /> :
                        pageRender === "Premades" ? <Premade /> :
                        <h3>nothing was found</h3>
                    }
                </div>
            </div>
)
else if(theme==="light")
    return (
        <div className="Home_container__LIGHT">
            <HomeHeader />
            <div className="Home_changePages">
                <button className="Home_chageP_button__LIGHT" onClick={() => {
                    History.push(`/${user.firstName}'s_App/Posts`)
                }}>
                    <h3>
                        Posts
                    </h3>
                    <TiWorld />
                </button>
                <button className="Home_chageP_button__LIGHT" onClick={() => {
                    History.push(`/${user.firstName}'s_App/Selfies`)
                }}>
                    <h3>
                        Selfies
                    </h3>
                       <FcGallery />
                </button >
                <button className="Home_chageP_button__LIGHT" onClick={() => {
                        History.push(`/${user.firstName}'s_App/AskQuestions`)
                }}>
                    <h3>
                        AskQuestions
                    </h3>
                       <FcIdea />
                </button>
                <button className="Home_chageP_button__LIGHT" onClick={() => {
                    History.push(`/${user.firstName}'s_App/Girls`)
                }}>
                    <h3>
                        Girls
                    </h3>
                    <FcOnlineSupport />
                </button>
                <button className="Home_chageP_button__LIGHT" onClick={() => {
                        History.push(`/${user.firstName}'s_App/Premades`)
                }}>
                    Find Premade!!
                </button> 
            </div>
            <div style={{position: "fixed", backgroundColor: "grey", top: "3vh", right: "5vw", width: "20vw", height: "34vh", borderRadius: "4px",zIndex: "3"}}>
                here will be products 
            </div>
            <div style={{backgroundColor: "grey", position: "fixed", top: "40vh", right: "5vw", width: "20vw", height: "56vh", borderRadius: "4px", zIndex: "3"}}> here will be users
            </div>
            <div style={{marginLeft: "20vw", paddingLeft: "2vw", paddingRight: '2vw', width: "50vw", minHeight: "50%"}}>
                {
                    pageRender === "Posts" ? <Posts /> : 
                    pageRender === "Selfies" ? <Selfies /> :
                    pageRender === "AskQuestions" ? <AskQuestions /> :
                    pageRender === "Girls" ? <Girls /> :
                    pageRender === "Premades" ? <Premade /> :
                    <h3>nothing was found</h3>
                }
            </div>
        </div>
    );
    else if(theme==="black")
    return (
        <div className="Home_container__BLACK">
            <HomeHeader />
            <div className="Home_changePages">
                <button className="Home_chageP_button__BLACK" onClick={() => {
                    History.push(`/${user.firstName}'s_App/Posts`)
                }}>
                    <h3>
                        Posts
                    </h3>
                       <TiWorld />
                </button>
                <button className="Home_chageP_button__BLACK" onClick={() => {
                    History.push(`/${user.firstName}'s_App/Selfies`)
                }}>
                    <h3>
                        Selfies
                    </h3>
                       <FcGallery />
                </button >
                <button className="Home_chageP_button__BLACK" onClick={() => {
                        History.push(`/${user.firstName}'s_App/AskQuestions`)
                }}>
                    <h3>
                        AskQuestions
                    </h3>
                       <FcIdea />
                </button>
                <button className="Home_chageP_button__BLACK" onClick={() => {
                    History.push(`/${user.firstName}'s_App/Girls`)
                }}>
                    <h3>
                        Girls
                    </h3>
                    <FcOnlineSupport />
                </button>
                <button className="Home_chageP_button__BLACK" onClick={() => {
                        History.push(`/${user.firstName}'s_App/Premades`)
                }}>
                    Find Premade!!
                </button> 
            </div>
            <div style={{position: "fixed", top: "3vh", right: "5vw", width: "20vw", height: "34vh", borderRadius: "4px", background: "#202020", zIndex: "3"}}>
                here will be products 
            </div>
            <div style={{position: "fixed", top: "40vh", right: "5vw", width: "20vw", height: "56vh", borderRadius: "4px", background: "#202020", zIndex: "3"}}>
            </div>
            <div style={{marginLeft: "20vw", paddingLeft: "2vw", paddingRight: '2vw', width: "50vw", minHeight: "50%"}}>
                {
                    pageRender === "Posts" ? <Posts /> : 
                    pageRender === "Selfies" ? <Selfies /> :
                    pageRender === "AskQuestions" ? <AskQuestions /> :
                    pageRender === "Girls" ? <Girls /> :
                    pageRender === "Premades" ? <Premade /> :
                    <h3>nothing was found</h3>
                }
            </div>
        </div>
    );
    else if(theme===undefined)
    return (
        <div className="Home_container__UNDEFINED">
            <HomeHeader />
            <div className="Home_changePages">
                <button className="Home_chageP_button__UNDEFINED" onClick={() => {
                    History.push(`/${user.firstName}'s_App/Posts`)
                }}>
                    <h3>
                        Posts
                    </h3>
                       <TiWorld />
                </button>
                <button className="Home_chageP_button__UNDEFINED" onClick={() => {
                    History.push(`/${user.firstName}'s_App/Selfies`)
                }}>
                    <h3>
                        Selfies
                    </h3>
                       <FcGallery />
                </button >
                <button className="Home_chageP_button__UNDEFINED" onClick={() => {
                        History.push(`/${user.firstName}'s_App/AskQuestions`)
                }}>
                    <h3>
                        AskQuestions
                    </h3>
                       <FcIdea />
                </button>
                <button className="Home_chageP_button__UNDEFINED" onClick={() => {
                    History.push(`/${user.firstName}'s_App/Girls`)
                }}>
                    <h3>
                        Girls
                    </h3>
                    <FcOnlineSupport />
                </button>
                <button className="Home_chageP_button__UNDEFINED" onClick={() => {
                        History.push(`/${user.firstName}'s_App/Premades`)
                }}>
                    Find Premade!!
                </button> 
            </div>
            <div style={{position: "fixed", top: "3vh", right: "5vw", width: "20vw", height: "34vh", borderRadius: "4px", background: "#202020", zIndex: "3"}}>
                here will be products 
            </div>
            <div style={{position: "fixed", top: "40vh", right: "5vw", width: "20vw", height: "56vh", borderRadius: "4px", background: "#202020", zIndex: "3"}}>
            </div>
            <div style={{background: "#202020", marginLeft: "20vw", paddingLeft: "2vw", paddingRight: '2vw', width: "50vw", minHeight: "50%"}}>
                {
                    pageRender === "Posts" ? <Posts /> : 
                    pageRender === "Selfies" ? <Selfies /> :
                    pageRender === "AskQuestions" ? <AskQuestions /> :
                    pageRender === "Girls" ? <Girls /> :
                    pageRender === "Premades" ? <Premade /> :
                    <h3>nothing was found</h3>
                }
            </div>
        </div>
    );

}

export default Home;