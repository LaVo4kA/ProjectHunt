import React, {useState, useEffect} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Heading from "../Heading/Heading";
import styles from "./JoinEventPageStyles.css"
import { useNavigate } from "react-router-dom";

export default function JoinEventPage(){
    var [user, setUser] = useState({role: null, skills: [], description: null})
    var [skills, setSkills] = useState([])
    var [roles, setRoles] = useState([])
    var navigate = useNavigate()

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        GetRoles()
        GetSkills()
    }, [])

    function GetRoles(){
        var eventId = window.location.href.slice(window.location.href.indexOf("/join") - 36, window.location.href.indexOf("/join"))
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "http://localhost:5001/catalogs/getEventRoles?eventId=" + eventId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send()
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно получены роли")
            setRoles(JSON.parse("[" + xhr.responseText + "]")[0])
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить роли")
          }
        }
    }

    function GetSkills(){
        var eventId = window.location.href.slice(window.location.href.indexOf("/join") - 36, window.location.href.indexOf("/join"))
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "http://localhost:5001/catalogs/getEventSkills?eventId=" + eventId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send()
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно получены навыки")
            setSkills(JSON.parse("[" + xhr.responseText + "]")[0])
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить навыки")
          }
        }
    }

    function GetSelectRole(placeholder, roles){
        var id = Math.random() * 1000;
        var key = 1
        return(
            <div className="create-project-page-team-input">
                <div>
                    <img src="../img/search.svg"></img>
                    <input id={"create-project-page-team-input-field_role"} onBlur={() => HideList(id)} onFocus={() => HideList(id)} type={"text"} placeholder={placeholder} defaultValue={user.role == null ? null : user.role}></input>
                </div>
                <ul hidden id={id} className="create-project-page-team-input-list">
                    {roles.map(role => {
                        return <li onMouseDown={() => ChooseRole(role)} key={key++}>{role}</li>
                    })}
                </ul>
            </div>
        );
    }

    function HideList(id){
        var list = document.getElementById(id)
        list.hidden = !list.hidden
    }

    function ChooseRole(role){
        var input = document.getElementById("create-project-page-team-input-field_role")
        input.value = role
        user.role = role
    }

    function GetSelectSkills(placeholder, skills, value){
        var id = Math.random() * 1000;
        var key = 1
        return(
            <div className="create-project-page-team-input">
                <div>
                    <img src="../img/search.svg"></img>
                    <input id={"create-project-page-team-input-field_skill"} onBlur={() => HideList(id)} onFocus={() => HideList(id)} type={"text"} placeholder={placeholder} defaultValue={value == null ? null : value}></input>
                </div>
                <ul hidden id={id} className="create-project-page-team-input-list">
                    {skills.map(skill => {
                        return <li onMouseDown={() => ChooseSkill(skill)} key={key++}>{skill}</li>
                    })}
                </ul>
            </div>
        );
    }

    function ChooseSkill(skill){
        user.skills.push(skill)
        if(user.skills.length >= 3)
        {
            var input = document.getElementById("create-project-page-team-input-field_skill")
            input.setAttribute("disabled", "disabled")
        }
        var new_user = {role: user.role, skills: user.skills, description: user.description}
        setUser(new_user)
    }

    function GetSkillsList(skills){
        var key = 1
        console.log(skills)
        if(skills.length === 0){
            return <p className="create-project-page-team-member-options-skills-placeholder">Ключевые навыки не выбраны</p>
        }
        else {
            return (
                skills.map(skill => {
                    return <div className="create-project-page-team-member-options-skills-skill" key={key++}>
                        <div className="create-project-page-team-member-options-skills-skill-name">
                            <p>{skill}</p>
                        </div>
                        <img onClick={() => DeleteSkill(skill)} src="../img/cross-skill.svg"></img>
                    </div>
                })
            );
        }
    }

    function DeleteSkill(skill)
    {
        user.skills = user.skills.filter(e => e != skill )
        var input = document.getElementById("create-project-page-team-input-field_skill")
        input.disabled = false
        var new_user = {role: user.role, skills: user.skills, description: user.description}
        setUser(new_user)
    }

    function GetJoinEventObject(){
    return {
            eventId: window.location.href.slice(window.location.href.indexOf("/join") - 36, window.location.href.indexOf("/join")),
            description: document.getElementById("join-event-page-description").value,
            role: user.role,
            skills: user.skills
        }
    }

    function Join(){
        var info = GetJoinEventObject()
        var request = JSON.stringify(info)
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", "http://localhost:5001/events/join")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(request)
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно вступили в мероприятие")
            navigate("/" + info.eventId + "/" + "projects-list")
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось вступить в мероприятие")
          }
        }
    }

    return (
        <div style={styles} className="join-event-page">
            <Header></Header>
            <div className="wrapper">
                <Heading title={"Почти готово!"}></Heading>
                <p className="join-event-page-before">Для подключения к мероприятию необходимо добавить немного информации о себе, чтобы тебе было проще найти команду.</p>
                <div className="join-event-page-options">
                    <div className="join-event-page-before-role">
                        <p className="join-event-page-before-role-title">Желаемая роль в команде<span className="create-project-page-input_name-title-star">*</span></p>
                        {GetSelectRole("Выбирите роль, которая нужна для проекта", roles)}
                    </div>
                    <div className="join-event-page-before-skills">
                        <p className="join-event-page-before-skills-title">Твои ключевые навыки<span className="create-project-page-input_name-title-star">*</span></p>
                        {GetSelectSkills("Выбирите до 3х ключевых навыков", skills, user.skills.length >= 3 ? "Нельзя выбрать скиллов больше, чем 3" : null)}
                        <div className="join-event-page-before-skills-list">
                            {GetSkillsList(user.skills)}
                        </div>
                    </div>
                </div>
                <p className="join-event-page-before-role-title">Немного о себе</p>
                <textarea id="join-event-page-description" className="join-event-page-text" placeholder="Чем больше полезной информации ты о себе напишешь, тем вероятнее, что тобой
                 заинтересуются и пригласят в комаду"></textarea>
                <div className="join-event-page-join-wrapper">
                    <div onClick={() => Join()} className="join-event-page-join">
                        <p>Подключиться</p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}