import React, {useEffect, useState} from "react";
import ProjectsPageFilter from "../Filters/ProjectsPageFilter"
import Context from "../Contexts/Context";
import ProjectsCardList from "../ProjectsCardList/ProjectCardList";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import styles from "./ProjectsListPageStyles.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

var start_projects = []

export default function ProjectsPage(){
    var [projects, setProjects] = React.useState([])
    var [eventInfo, setEventInfo] = React.useState({})
    var [isAdmin, setIsAdmin] = useState(false)
    var [loading, setLoading] = React.useState(true)
    var eventId = window.location.href.slice(window.location.href.indexOf("/projects-list") - 36, window.location.href.indexOf("/projects-list"))

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        GetProjectsFromServer()
        GetEventName()
        CheckAdmin()
    }, [])

    function CheckAdmin(){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/secrets/isAdmin")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log("Успешно получили список мероприятий!")
                setIsAdmin(JSON.parse("[" + xhr.responseText + "]")[0])
            }
            if (xhr.readyState === 4 && xhr.status !== 200){
                console.log("Не удалось получить список мероприятий")
            }
        }
    }

    function GetProjectsFromServer(){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/projects/getAllProjects?eventId=" + eventId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log(xhr.responseText)
                start_projects = JSON.parse("[" + xhr.responseText + "]")[0]
                setProjects(JSON.parse("[" + xhr.responseText + "]")[0])
                setLoading(false)
            }
        }
    }

    function GetEventName(){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/catalogs/getEventById?eventId=" + eventId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                setEventInfo(JSON.parse('[' + xhr.responseText + ']')[0])
            }
        }
    }

    return (
        <Context.Provider value={{start_projects, projects, setProjects}}>
            <Header></Header>
            <div style={styles} className="wrapper">
                <div className="projects-page">
                    <BreadCrumb link={"/now-events"} title="К мероприятиям"></BreadCrumb>
                    <div className="projects-page-title">
                        {eventInfo.name == null ? <Loader isMiniLoader={true}/> : <h1>{eventInfo.name}</h1>}
                        {isAdmin && 
                        <div className="projects-page-title-accessCode">
                            <p>Код мероприятия:</p>
                            <div className="projects-page-title-accessCode-code">
                                <p>{eventInfo.accessCode == null ? "" : eventInfo.accessCode}</p>
                            </div>
                        </div>}
                    </div>
                    <div className="title-lists">
                        <Link to={"/" + eventId + "/projects-list"}>
                            <div className="projects_project-list">
                                <p>Список проектов</p>
                            </div>
                        </Link>
                        <Link to={"/" + eventId + "/members-list"}>
                            <div className="projects_members-list">
                                <p>Список участников</p>
                            </div> 
                        </Link>
                    </div>
                    <ProjectsPageFilter count={projects.length} roles={eventInfo.roles} technologies={eventInfo.keyTechnologies}></ProjectsPageFilter>
                    {loading ? <Loader/> :
                    ( projects.length === 0 
                        ?   <div className="projects-page-empty">
                                <p>Пока что нет созданных проектов</p>
                            </div>
                        :   <ProjectsCardList projects={projects}></ProjectsCardList>
                    )}
                </div>
            </div>
            <Footer></Footer>
        </Context.Provider>
    );
}