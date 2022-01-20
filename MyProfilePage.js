import React, {useEffect} from "react";
import KeyTechnologiesList from "../CardList/CardList";
import CustomSelectProfile from "../CustomSelect/CustomSelectProfile";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./MyProfilePageStyles.css"
import ProfileProjectCardsList from "../ProfileProjectCardsList/ProfileProjectCardsList";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Contexts/Context";
import Loader from "../Loader/Loader";

export default function MyProfilePage(){

    var [projects, setProjects] = React.useState([])
    var [userInfo, setUserInfo] = React.useState({})
    var [eventInfo, setEventInfo] = React.useState(null)
    var [eventNames, setEventNames] = React.useState([""]);
    var [userEvents, setUserEvents] = React.useState([])
    var [loading, setLoading] = React.useState({loadProjects: false, loadSettings: false})

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
        if(eventInfo.description !== ""){
            return <p>{eventInfo.description}</p>
        }
        else {
            return <p className="profile-placeholder">Описание отсутствует</p>
        }
    }

    function CheckEvent(){
        if(eventInfo === null){
            return <p className="profile-placeholder profile-event-placeholder">Мероприятие не выбрано</p>
        }
        else {
            return (
                <div className="profile-my-event-info">
                    <div className="profile-my-user_info-card profile-my-user_info-card-event-about">
                        <h2>Обо мне</h2>
                        {CheckDescription()}
                    </div>
                    <div className="profile-my-user_info-card profile-my-user_info-card-event-info">
                        <h2>Мои навыки</h2>
                        <h3>Предпочтительная роль</h3>
                        <div className="profile-my-user_info-card-event-info-list">
                            <KeyTechnologiesList labels={[eventInfo.role]}></KeyTechnologiesList>
                        </div>
                        <h3>Ключевые навыки</h3>
                        <div className="profile-my-user_info-card-event-info-list">
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
            return <p className="profile-placeholder">У пользователя нет проектов</p>
        }
        else {
            return <ProfileProjectCardsList projects={projects}></ProfileProjectCardsList>
        }
    }
    
    return (
        <div style={styles} className="profile-my">
            <Header></Header>
            <div className="wrapper">
                {(!loading.loadSettings || !loading.loadProjects) ? <Loader/> :
                <div>
                    <div className="profile-my-title">
                        <h1>Профиль</h1>
                        <Link to={"/settings/profile"}>
                            <div className="profile-my-title-edit_button">
                                <p>Редактировать</p>
                            </div>
                        </Link>
                    </div>
                    <div className="profile-my-user_info">
                        <div className="profile-my-user_info-card profile-my-user_info-card-info">
                            <img src="../img/profile-avatar.svg" alt=""></img>
                            <div className="profile-my-user_info-card-info-text">
                                <h2>{userInfo.firstName + " " + userInfo.secondName}</h2>
                                <p>Группа</p>
                                {
                                    (userInfo.educationGroup == null || userInfo.educationGroup === "")
                                    ? <p className="profile-placeholder">Группа не указана</p>
                                    : <p>{userInfo.educationGroup}</p>
                                }
                            </div>
                        </div>
                        <div className="profile-my-user_info-card profile-my-user_info-card-contacts">
                            <h2>Контактные данные</h2>
                            {CheckContacts(userInfo)}
                        </div>
                    </div>
                    <Context.Provider value={{userEvents, setEventInfo}}>
                        <div className="profile-my-event-title">
                            <h1>Мероприятие</h1>
                            <CustomSelectProfile id="profile-my-event-title-select" items={eventNames}></CustomSelectProfile>
                        </div>
                    </Context.Provider>
                    {CheckEvent()}
                    <div className="profile-my-projects-title">
                        <p>Все проекты пользователя</p>
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
        return <p className="profile-placeholder">Контакты не указаны</p>
    }
    return (
      <div>
            {
                (userInfo.email !== null && userInfo.email !== "") &&
                <div className="profile-my-user_info-card-contacts-contact">
                    <img src="../img/profile-email.svg" alt=""></img>
                    <p>{userInfo.email}</p>
                </div>
            }
            {
                (userInfo.vk !== null && userInfo.vk !== "") &&
                <div className="profile-my-user_info-card-contacts-contact">
                    <img src="../img/profile-vk.svg" alt=""></img>
                    <p>{userInfo.vk}</p>
                </div>
            }
            {
                (userInfo.telegram !== null && userInfo.telegram !== "") &&
                <div className="profile-my-user_info-card-contacts-contact">
                    <img src="../img/profile-telegram.svg" alt=""></img>
                    <p>{userInfo.telegram}</p>
                </div>
            }
            {
                (userInfo.comment !== null && userInfo.comment !== "") &&
                <p className="profile-my-user_info-card-contacts-comment">{userInfo.comment}</p>
            }
      </div>  
    );
}