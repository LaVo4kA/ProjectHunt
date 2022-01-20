import React, {useEffect} from "react";
import styles from "./ProjectPageStyles.css";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Heading from "../Heading/Heading";
import CardList from "../CardList/CardList"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function ProjectPage(){
    var [project, setProject] = React.useState(GetDefaultProject())
    var [loading, setLoading] = React.useState(true)
    var [choosenRole, setChoosenRole] = React.useState("");
    var navigate = useNavigate()
    var eventId = window.location.href.slice(window.location.href.lastIndexOf("/") - 36, window.location.href.lastIndexOf("/"))

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var projectId = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1)

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/projects/getProjectById?projectId=" + projectId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var project = JSON.parse("[" + xhr.responseText + "]")[0]
                localStorage.setItem("ownerId", project.ownerId)
                setProject(project)
                setLoading(false)
            }
        }
    }, [])

    function JoinInRole(){
        var btn = document.getElementsByClassName("project-team-join_button")[0]
        btn.setAttribute("style", "background: #AAACF4; cursor:default")

        var roleId = choosenRole.id
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("POST", "http://localhost:5001/projects/joinInRole?roleId=" + roleId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log("Успешно вступили в роль!")
                var index = project.team.roles.findIndex(r => r.id === choosenRole.id)
                project.team.roles[index].userFirstName = window.localStorage.getItem("userFirstName")
                project.team.roles[index].userSecondName = window.localStorage.getItem("userSecondName")
                project.team.roles[index].userId = window.localStorage.getItem("userId")
                setProject({...project})
            }
            if (xhr.readyState === 4 && xhr.status !== 200){
                console.log("Не удалось вступить в роль")
            }
        }
    }

    function HidePopup(){
        var e = document.getElementsByClassName("project-team-join_popup")[0]
        ChooseFreeRole("")
        e.hidden = !e.hidden
    }

    function ChooseFreeRole(freeRole, id){
        var freeRolesElements = document.getElementsByClassName("project-team-join_popup-content-main-freeRole")
        for(var i = 0; i < freeRolesElements.length; i++){
            var e = freeRolesElements[i]
            var roleId = e.getAttribute("id")
    
            if("project-team-join_popup-content-main-freeRole" + id === roleId)
            {
                e.setAttribute("style", "border: 1px solid #6667AB;")
            }
            else
            {
                e.setAttribute("style", "border: 1px solid #FFFFFF;")
            }
        }
        setChoosenRole(freeRole)
    }

    function GetTeam(team){
        var busyRolesCount = team.roles.filter(role => role.userFirstName !== null).length
        var freeRoles = team.roles.filter(role => role.userFirstName === null)

        function CheckJoin(){
            if(busyRolesCount != team.roles.length && team.roles.filter(role => role.userId == localStorage.getItem("userId")).length == 0){
                return (
                    <div onClick={() => HidePopup()} className="project-team-join_button">
                        <img src="../img/plus.svg" alt=""></img>
                        <p>Присоединиться</p>
                    </div>
                )
            }
        }

        function DisableClickOnCard(cardId){
            var card = document.getElementById(cardId)
            card.setAttribute("is_active", "false")
        }
        
        function EnableClickOnCard(cardId){
            var card = document.getElementById(cardId)
            card.setAttribute("is_active", "true")
        }

        function DeleteUserFromProject(role)
        {
            var projectId = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1)
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true
            xhr.open("DELETE", "http://localhost:5001/projects/deleteUserFromProject?userId=" + role.userId + "&projectId=" + projectId)
            xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
            xhr.send()
        
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status === 200){
                    console.log("Человек успешно удалён")
                    var role_index = project.team.roles.findIndex(r => r.userId === role.userId)
                    project.team.roles[role_index].userFirstName = null
                    setProject({...project})
                }
                if (xhr.readyState === 4 && xhr.status !== 200){
                    console.log("Не удалось удалить человека")
                }
            }
        }

        function CheckBusyRole(role, cardId){
            if(role.userFirstName === null)
            {
                return <h2>В поисках</h2>
            }
            
            if(role.userId === localStorage.getItem("userId") || role.userId === localStorage.getItem("ownerId")){
                return <h2>{role.userFirstName + " " + role.userSecondName}</h2>
            }
        
            if(role.userId === localStorage.getItem("ownerId")){
        
            }
            return (
                <div className="project-team-cards-card-title-name">
                    <h2>{role.userFirstName + " " + role.userSecondName}</h2>
                    <a>
                        <div onMouseEnter={() => DisableClickOnCard(cardId)}  onMouseLeave={() => EnableClickOnCard(cardId)} onClick={() => DeleteUserFromProject(role)} className="project-team-cards-card-title-name-delete">
                            <p>Удалить</p>
                            <img src="../img/delete-cross.svg" alt=""></img>
                        </div>
                    </a>
                </div>
            )
        }
    
        function CheckSkills(role){
            if(role.roleSkills.length === 0){
                return (
                    <p>Не указаны</p>
                );
            }
            else {
                return (
                    <CardList labels={role.roleSkills}></CardList>
                );
            }
        }
    
        function GetPopUpFreeRoles(freeRoles){
            var key = 1
            var id = 0
            return (
                <div className="project-team-join_popup-content-main-freeRoles">
                    {freeRoles.map(freeRole => {
                        var t = id++
                        return (
                            <div id={"project-team-join_popup-content-main-freeRole" + t} onClick={() => {ChooseFreeRole(freeRole, t)}} value={freeRole.roleName} className="project-team-join_popup-content-main-freeRole" key={key++}>
                                <p>{freeRole.roleName}</p>
                            </div>
                        )
                    })}
                </div>
            );
        }

        function ClickOnCard(role, cardId){
            var card = document.getElementById(cardId)
            if(card.getAttribute("is_active") === "true")
            {
                navigate(role.userId == localStorage.getItem("userId") ? "/me": ("/profile/" + role.userId))
            }
        }

        var id = 1;
        return (
            <div className="project-team">
                <div className="project-team-title">
                    <h1 className="project-team-name">Команда "{team.name}" ({busyRolesCount}/{team.roles.length})</h1>
                    {CheckJoin()}
                </div>
                <div className="project-team-cards">
                    {team.roles.map(role => {
                        var cardId = "project-team-cards-card" + id
                        return (
                            <div style={{backgroundColor: role.userFirstName == null ? "#FFFFFF" : "", cursor: role.userFirstName == null ? "default" : ""}} onClick={() => ClickOnCard(role, cardId)} className="project-team-cards-card" key={id++} id={cardId} is_active={role.userFirstName == null ? "false" : "true"}>
                                <div className="project-team-cards-card-title">
                                    {CheckBusyRole(role, cardId)}
                                    <div className="project-team-cards-card-title-role">
                                        <p>{role.roleName}</p>
                                    </div>
                                </div>
                                <div className="project-team-cards-card-skills">
                                    <h3>Ключевые навыки</h3>
                                    {CheckSkills(role)}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div hidden className="project-team-join_popup">
                    <div className="project-team-join_popup-content">
                        <img onClick={() => HidePopup()} src="../img/cross.svg" alt=""></img>
                        <div className="project-team-join_popup-content-main">
                            <h1>Выбирите роль</h1>
                            {GetPopUpFreeRoles(freeRoles)}
                            <div onClick={() => {JoinInRole(); HidePopup()}} className="project-team-join_popup-content-main-join_button">
                                <p>Присоединиться</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function GetProjectsDescription(motivation, goal, description){
        return (
            <div className="project-main-description">
                <h1>Описание проекта</h1>
                <p>{motivation}</p>
                <h2>Цель</h2>
                <p>{goal}</p>
                <h2>Итоговый продукт</h2>
                <p>{description}</p>
            </div>
        );
    }
    
    return (
        <div>
            <Header></Header>
            <div className="wrapper">
                {loading ? <Loader/> :
                <div style={styles} className="project-page">
                    <BreadCrumb link={"/" + eventId + "/projects-list"} title="К списку проектов"></BreadCrumb>
                    <Heading title={project.name}></Heading>
                    {GetProjectsDescription(project.motivation, project.goal, project.description)}
                    {GetTeam(project.team)}
                </div>}
            </div>
            <Footer></Footer>
        </div>
    );
}

function GetDefaultProject(){
    return {
        id: "",
        name: "",
        keyTechnology: "",
        motivation: "",
        goal: "",
        description: "",
        team: {
            name: "",
            roles: [
                {
                    id: "",
                    roleName: "",
                    userFirstName: "",
                    userSecondName: "",
                    roleSkills: [
                    ]
                }
            ]
        }
    }
}