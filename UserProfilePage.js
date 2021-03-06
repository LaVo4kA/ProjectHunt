import React, {useEffect} from "react";
import KeyTechnologiesList from "../CardList/CardList";
import CustomSelectProfile from "../CustomSelect/CustomSelectProfile";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./UserProfilePageStyles.css"
import ProfileProjectCardsList from "../ProfileProjectCardsList/ProfileProjectCardsList";
import { useNavigate } from "react-router-dom";
import Context from "../Contexts/Context";
import Loader from "../Loader/Loader";

export default function MyProfilePage(){
    var [projects, setProjects] = React.useState([])
    var [userInfo, setUserInfo] = React.useState({})
    var [eventInfo, setEventInfo] = React.useState({})
    var [eventNames, setEventNames] = React.useState([""]);
    var [userEvents, setUserEvents] = React.useState([])
    var [loading, setLoading] = React.useState({loadSettings: false, loadProjects: false})

    var navigate = useNavigate()

    function GetProjectsFromServer(){
        var userId = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1)
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/projects/getUserProjects?userId=" + userId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log(xhr.responseText)
                setProjects(JSON.parse("[" + xhr.responseText + "]")[0])
                loading.loadProjects = true
                setLoading({...loading})
            }

            if (xhr.readyState === 4 && (xhr.status === 401 || xhr.status === 0)){
                navigate("/login")
              }
        }
    }

    function GetUserInfo(){
        var userId = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1)
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/catalogs/getUserInfo?userId=" + userId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log(xhr.responseText)
                
                var info = JSON.parse("[" + xhr.responseText + "]")[0]
                if(!info.showEmail)
                {
                    info.email = null
                }

                setUserInfo(info)
                loading.loadSettings = true
                setLoading({...loading})
            }

            if (xhr.readyState === 4 && (xhr.status === 401 || xhr.status === 0)){
                navigate("/login")
              }
        }
    }

    function GetUserEventsInfo(){
        var userId = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1)
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/catalogs/getUserEventsInfo?userId=" + userId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log(xhr.responseText + "---------------------------")
                var events = JSON.parse("[" + xhr.responseText + "]")[0]
                setUserEvents(JSON.parse("[" + xhr.responseText + "]")[0])
                setEventNames(events.map(event => event.eventName))
            }

            if (xhr.readyState === 4 && (xhr.status === 401 || xhr.status === 0)){
                navigate("/login")
              }
        }
    }
    
    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        GetProjectsFromServer()
        GetUserInfo()
        GetUserEventsInfo()
    }, [])

    function CheckDescription()
    {
        console.log(eventInfo.description)
        if(eventInfo.description !== ""){
            return <p>{eventInfo.description}</p>
        }
        else {
            return <p className="profile-placeholder">???????????????? ??????????????????????</p>
        }
    }

    function CheckEvent(){
        if(eventInfo.skills === undefined){
            return <p className="profile-placeholder profile-event-placeholder">?????????????????????? ???? ??????????????</p>
        }
        else {
            return (
                <div className="profile-user-event-info">
                    <div className="profile-user-user_info-card profile-user-user_info-card-event-about">
                        <h2>?????? ??????</h2>
                        {CheckDescription()}
                    </div>
                    <div className="profile-user-user_info-card profile-user-user_info-card-event-info">
                        <h2>?????? ????????????</h2>
                        <h3>???????????????????????????????? ????????</h3>
                        <div className="profile-user-user_info-card-event-info-list">
                            <KeyTechnologiesList labels={[eventInfo.role]}></KeyTechnologiesList>
                        </div>
                        <h3>???????????????? ????????????</h3>
                        <div className="profile-user-user_info-card-event-info-list">
                            <KeyTechnologiesList labels={eventInfo.skills}></KeyTechnologiesList>
                        </div>
                    </div>
                </div>
            )
        }
    }

    function CheckProjects(){
        if(projects.length === 0)
        {
            return <p className="profile-placeholder">?? ???????????????????????? ?????? ????????????????</p>
        }
        else {
            return <ProfileProjectCardsList projects={projects}></ProfileProjectCardsList>
        }
    }
    
    return (
        <div style={styles} className="profile-user">
            <Header></Header>
            <div className="wrapper">
                {!loading.loadSettings || !loading.loadProjects ? <Loader/> :
                <div>
                    <div className="profile-user-title">
                        <h1>??????????????</h1>
                    </div>
                    <div className="profile-user-user_info">
                        <div className="profile-user-user_info-card profile-user-user_info-card-info">
                            <img src="../img/profile-avatar.svg" alt=""></img>
                            <div className="profile-user-user_info-card-info-text">
                                <h2>{userInfo.firstName + " " + userInfo.secondName}</h2>
                                <p>????????????</p>
                                {
                                    (userInfo.educationGroup == null || userInfo.educationGroup === "")
                                    ? <p className="profile-placeholder">???????????? ???? ??????????????</p>
                                    : <p>{userInfo.educationGroup}</p>
                                }
                            </div>
                        </div>
                        <div className="profile-user-user_info-card profile-user-user_info-card-contacts">
                            <h2>???????????????????? ????????????</h2>
                            {CheckContacts(userInfo)}
                        </div>
                    </div>
                    <Context.Provider value={{userEvents, setEventInfo}}>
                        <div className="profile-user-event-title">
                            <div className="profile-user-event-title-choose">
                                <h1>??????????????????????</h1>
                            </div>
                            <CustomSelectProfile id="profile-user-event-title-select" items={eventNames}></CustomSelectProfile>

                            {/*<div hidden className="profile-user-title-invite_button">
                                <p>???????????????????? ?? ????????????</p>
                            </div>*/}
                        </div>
                    </Context.Provider>
                    {CheckEvent()}
                    <div className="profile-user-projects-title">
                        <p>?????? ?????????????? ????????????????????????</p>
                    </div>
                    {CheckProjects()}
                </div>}
            </div>
            <Footer></Footer>
        </div>
    );
}

function CheckContacts(userInfo){
    if((userInfo.email === null || userInfo.email === "")
    && (userInfo.vk === null || userInfo.vk === "")
    && (userInfo.telegram === null || userInfo.telegram === "")
    && (userInfo.comment === null || userInfo.comment === "")){
        return <p className="profile-placeholder">???????????????? ???? ??????????????</p>
    }
    return (
      <div>
            {
                (userInfo.email !== null && userInfo.email !== "") &&
                <div className="profile-user-user_info-card-contacts-contact">
                    <img src="../img/profile-email.svg" alt=""></img>
                    <p>{userInfo.email}</p>
                </div>
            }
            {
                (userInfo.vk !== null && userInfo.vk !== "") &&
                <div className="profile-user-user_info-card-contacts-contact">
                    <img src="../img/profile-vk.svg" alt=""></img>
                    <p>{userInfo.vk}</p>
                </div>
            }
            {
                (userInfo.telegram !== null && userInfo.telegram !== "") &&
                <div className="profile-user-user_info-card-contacts-contact">
                    <img src="../img/profile-telegram.svg" alt=""></img>
                    <p>{userInfo.telegram}</p>
                </div>
            }
            {
                (userInfo.comment !== null && userInfo.comment !== "") &&
                <p className="profile-user-user_info-card-contacts-comment">{userInfo.comment}</p>
            }
      </div>  
    );
}