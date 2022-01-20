import React, {useState, useEffect} from "react";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import CustomSelect from "../CustomSelect/CustomSelect";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Heading from "../Heading/Heading";
import styles from "./CreateProjectPageStyles.css"
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function CreateProjectPage(){
    var [keyTechnologies, setKeyTechnologies] = useState([])
    var [teamMembers, setTeamMembers] = useState([{ name: "Участник 1 (Создатель)", role: null, skills: [], id: Math.random() }])
    var [skills, setSkills] = useState([])
    var [roles, setRoles] = useState([])
    var [loading, setLoading] = useState(true)
    var navigate = useNavigate()
    var eventId = window.location.href.slice(window.location.href.indexOf("/create-project") - 36, window.location.href.indexOf("/create-project"))

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        GetKeyTechnologies()
        GetRoles()
        GetSkills()
    }, [])

    function GetKeyTechnologies(){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "http://localhost:5001/catalogs/getEventKeyTechnologies?eventId=" + eventId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send()
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно получены ключевые технологии")
            setKeyTechnologies(JSON.parse("[" + xhr.responseText + "]")[0])
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить ключевые технологии")
          }
        }
    }

    function GetRoles(){
        var eventId = window.location.href.slice(window.location.href.indexOf("/create-project") - 36, window.location.href.indexOf("/create-project"))
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
        var eventId = window.location.href.slice(window.location.href.indexOf("/create-project") - 36, window.location.href.indexOf("/create-project"))
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
            setLoading(false)
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить навыки")
          }
        }
    }

    function AddNewMember(){
        console.log("Добавляем нового участника")
        console.log(teamMembers)
        teamMembers.push(
            {
                name: "Участник " + (teamMembers.length + 1).toString(),
                role: null,
                skills: [],
                id: Math.random()
            }
        )
        console.log(teamMembers)
        setTeamMembers([...teamMembers])
    }

    function GetMembers(teamMembers, roles, skills){
        return (
            <div>
                {GetMemberList(teamMembers, roles, skills)}
                {CheckMembersCount()}
            </div>
        );
    }

    function CheckMembersCount(){
        if(teamMembers.length < 10)
        {
            return (
                <div onClick={() => AddNewMember()} className="create-project-page-team-add_member">
                    <img src="../img/plus-purple.svg"></img>
                    <p>Добавить ещё участника</p>
                </div>
            )
        }
    }
    
    function GetMemberList(teamMembers, roles, skills)
    {
        var key = 0;
        return (
            teamMembers.map(member => {
                return <div className="create-project-page-team-member" key={key++}>
                            <div className="create-project-page-team-member-title">
                                <p>{member.name}</p>
                                {teamMembers[0].id === member.id ? <div></div> : <img onClick={() => DeleteMember(member.id)} src="../img/cross.svg" alt=""></img>}
                            </div>
                            <div className="create-project-page-team-member-options">
                                {GetSelectRole("Выбирите роль, которая нужна для проекта", roles, member.role, member.id)}
                                <div className="create-project-page-team-member-options-skills">
                                    {GetSelectSkills("Выбирите до 3х ключевых навыков", skills, member.skills.length >= 3 ? "Нельзя выбрать скиллов больше, чем 3" : null, member.id)}
                                    <div className="create-project-page-team-member-options-skills-list">
                                        {GetSkillsList(member.skills, member.id)}
                                    </div>
                                </div>
                            </div>
                        </div>
                })
        );
    }

    function DeleteMember(memberId){
        teamMembers = teamMembers.filter(member => member.id !== memberId)
        for(var i = 1; i < teamMembers.length; i++){
            teamMembers[i].name = "Участник " + (i + 1)
        }
        setTeamMembers([...teamMembers])
    }
    
    function GetSkillsList(skills, memberId){
        var key = 1
        console.log(skills)
        if(skills.length === 0){
            return <p className="create-project-page-team-member-options-skills-placeholder">Ключевые навыки не выбраны</p>
        }
        else {
            return (
                skills.map(skill => {
                    return <div className="create-project-page-team-member-options-skills-skill" key={key++}>
                        <div className="create-project-page-team-member-options-skills-skill-box">
                            <div className="create-project-page-team-member-options-skills-skill-name">
                                <p>{skill}</p>
                            </div>
                        </div>
                        <div className="create-project-page-team-member-options-skills-skill-img-box">
                            <img onClick={() => DeleteSkill(skill, memberId)} src="../img/cross-skill.svg"></img>
                        </div>
                    </div>
                })
            );
        }
    }

    function DeleteSkill(skill, memberId)
    {
        var e_index = teamMembers.findIndex((member) => member.id === memberId)
        teamMembers[e_index].skills = teamMembers[e_index].skills.filter(e => e != skill )
        console.log(teamMembers)
        var input = document.getElementById("create-project-page-team-input-field_skill" + memberId)
        input.disabled = false
        setTeamMembers([...teamMembers])
    }

    function FocusColor(className){
        var e = document.getElementsByClassName(className)[0]
        e.style.border = "1px solid #9F87FF"
        e.style.boxShadow = "0px 0px 0px 3px rgba(159, 135, 255, 0.2)"

    }

    function BlurColor(className){
        var e = document.getElementsByClassName(className)[0]
        e.style.border = "1px solid rgba(0, 0, 0, 0.2)"
        e.style.boxShadow = ""
    }

    function ChangeSearchRoleValue(memberId){
        var input = document.getElementById("create-project-page-team-input-field_role" + memberId)
        var searchValue = input.value.toLowerCase()

        var selectElements = document.getElementsByClassName("create-project-page-team-input-list" + memberId)
        for (let i = 0; i < selectElements.length; i++) {
            var s = selectElements[i];
            var s_value = s.innerText.toLowerCase()
            console.log(s_value)
            console.log(searchValue)
            console.log(s_value.indexOf(searchValue))
            if(s_value.indexOf(searchValue) === -1){
                s.hidden = true
            }
            else{
                s.hidden = false
            }
        }
    }
    
    function GetSelectRole(placeholder, items, value, memberId){
        var id = Math.random() * 1000;
        var key = 1
        return(
            <div className="create-project-page-team-input">
                <div className="create-project-page-team-input-role">
                    <img src="../img/search.svg"></img>
                    <input id={"create-project-page-team-input-field_role" + memberId} onChange={() => ChangeSearchRoleValue(memberId)} onBlur={() => {BlurColor("create-project-page-team-input-role"); HideList(id)}} onFocus={() => {FocusColor("create-project-page-team-input-role"); HideList(id) }} type={"text"} placeholder={placeholder} defaultValue={value == null ? null : value}></input>
                </div>
                <ul hidden id={id} className="create-project-page-team-input-list">
                    {items.map(item => {
                        if(teamMembers.filter(e => e.id == memberId)[0].skills.filter(skill => skill === item).length == 0){
                            return <li className={"create-project-page-team-input-list" + memberId} onMouseDown={() => ChooseRole(item, memberId)} key={key++}>{item}</li>
                        }
                    })}
                </ul>
            </div>
        );
    }

    function ChooseRole(role, memberId){
        var selectElements = document.getElementsByClassName("create-project-page-team-input-list" + memberId)
        for (let i = 0; i < selectElements.length; i++) {
            var s = selectElements[i];
                s.hidden = false
        }

        var input = document.getElementById("create-project-page-team-input-field_role" + memberId)
        input.value = role
        var e_index = teamMembers.findIndex((member) => member.id === memberId)
        teamMembers[e_index].role = role
    }

    function ChangeSearchSkillValue(memberId){
        var input = document.getElementById("create-project-page-team-input-field_skill" + memberId)
        var searchValue = input.value.toLowerCase()

        var selectElements = document.getElementsByClassName("create-project-page-team-skill" + memberId)
        for (let i = 0; i < selectElements.length; i++) {
            var s = selectElements[i];
            var s_value = s.innerText.toLowerCase()
            console.log(s_value)
            console.log(searchValue)
            console.log(s_value.indexOf(searchValue))
            if(s_value.indexOf(searchValue) === -1){
                s.hidden = true
            }
            else{
                s.hidden = false
            }
        }
    }

    function GetSelectSkills(placeholder, skills, value, memberId){
        var id = Math.random() * 1000;
        var key = 1
        return(
            <div className="create-project-page-team-input">
                <div className="create-project-page-team-input-skills">
                    <img src="../img/search.svg"></img>
                    <input id={"create-project-page-team-input-field_skill" + memberId} onChange={() => ChangeSearchSkillValue(memberId)} onBlur={() => {BlurColor("create-project-page-team-input-skills"); HideList(id)}} onFocus={() => {FocusColor("create-project-page-team-input-skills") ;HideList(id)}} type={"text"} placeholder={placeholder} defaultValue={value == null ? null : value}></input>
                </div>
                <ul hidden id={id} className="create-project-page-team-input-list">
                    {skills.map(skill => {
                        var e_index = teamMembers.findIndex((member) => member.id === memberId)
                        if(teamMembers[e_index].skills.find(s => s === skill) == undefined){
                            return <li className={"create-project-page-team-skill" + memberId} onMouseDown={() => ChooseSkill(skill, memberId)} key={key++}>{skill}</li>
                        }
                    })}
                </ul>
            </div>
        );
    }

    function ChooseSkill(skill, memberId){
        var input = document.getElementById("create-project-page-team-input-field_skill" + memberId)
        input.value = ""
        var selectElements = document.getElementsByClassName("create-project-page-team-skill" + memberId)
        for (let i = 0; i < selectElements.length; i++) {
            var s = selectElements[i];
                s.hidden = false
        }

        var e_index = teamMembers.findIndex((member) => member.id === memberId)
        teamMembers[e_index].skills.push(skill)
        if(teamMembers[e_index].skills.length >= 3)
        {
            var input = document.getElementById("create-project-page-team-input-field_skill" + memberId)
            input.setAttribute("disabled", "disabled")
        }
        setTeamMembers([...teamMembers])
    }
    
    function HideList(id){
        var list = document.getElementById(id)
        list.hidden = !list.hidden
    }

    function CreateProject(){
        var xhr = new XMLHttpRequest();
        var eventId = window.location.href.slice(window.location.href.indexOf("/create-project") - 36, window.location.href.indexOf("/create-project"))
        var request = JSON.stringify(GetProjectObject())
        console.log(request)
        xhr.withCredentials = true;
        xhr.open("POST", "http://localhost:5001/projects/create")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(request)
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 201){
            console.log("Проект успешно создан")
            var projectId = JSON.parse('"' + xhr.responseText + '"')
            navigate("/" + eventId + "/" + projectId)
          }
        }
    }

    function GetProjectObject(){
        return {
            name: document.getElementById("create-project-page-project-input-project_name").value,
            keyTechnology: document.getElementById("create-project-page-project-select-text").innerText,
            eventId: window.location.href.slice(window.location.href.indexOf("/create-project") - 36, window.location.href.indexOf("/create-project")),
            description: document.getElementById("create-project-page-project-input-project_description").value,
            motivation: document.getElementById("create-project-page-project-input-project_motivation").value,
            goal: document.getElementById("create-project-page-project-input-project_goal").value,
            team: {
                name: document.getElementById("create-project-page-team-input-team_name").value,
                roles: GetTeamRoles()
            }
        }
    }

    function GetTeamRoles(){
        return teamMembers.map(member => {
            if(member.name === "Участник 1 (Создатель)"){
                return{roleName: member.role, roleSkills: member.skills, userId: localStorage.getItem("userId")}
            }
            else {
                return {roleName: member.role, roleSkills: member.skills, userId: ""}
            }
        })
    }

    return (
        <div style={styles} className="create-project-page">
            <Header></Header>
            <div className="wrapper">
                <BreadCrumb link={"/" + eventId + "/projects-list"} title={"К списку проектов"}></BreadCrumb>
                <Heading title={"Создание проекта"}></Heading>
                <div>
                    <div className="create-project-page-project">
                        <h2 className="create-project-page-project-title">О проекте</h2>
                        <div className="create-project-page-input_label">
                            <p>Название проекта</p>
                            <p className="create-project-page-input_name-title-star">*</p>
                        </div>
                        <input id="create-project-page-project-input-project_name" type={"text"}></input>

                        <div className="create-project-page-input_label">
                            <p>Ключевая технология</p>
                            <p className="create-project-page-input_name-title-star">*</p>
                        </div>
                        <CustomSelect defaultValue={""} items={keyTechnologies} id="create-project-page-project-select"></CustomSelect>
                        
                        <div className="create-project-page-input_label">
                            <p>Подводка к сути проекта/Мотивация/Причина по которой занялись им</p>
                            <p className="create-project-page-input_name-title-star">*</p>
                        </div>
                        <textarea id="create-project-page-project-input-project_motivation" className="create-project-page-project-motivation"></textarea>

                        <div className="create-project-page-input_label">
                            <p>Цель проекта</p>
                            <p className="create-project-page-input_name-title-star">*</p>
                        </div>
                        <textarea id="create-project-page-project-input-project_goal" className="create-project-page-project-goal"></textarea>

                        <div className="create-project-page-input_label">
                            <p>Описание итогового продукта</p>
                            <p className="create-project-page-input_name-title-star">*</p>
                        </div>
                        <textarea id="create-project-page-project-input-project_description" className="create-project-page-project-description"></textarea>
                    </div>
                    <div className="create-project-page-team">
                        <h2 className="create-project-page-team-label">Команда ({teamMembers.length}/10)</h2>
                        <div className="create-project-page-input_label">
                            <p>Название команды</p>
                            <p className="create-project-page-input_name-title-star">*</p>
                        </div>
                        <input id="create-project-page-team-input-team_name" type={"text"}></input>
                    </div>
                    {GetMembers(teamMembers, roles, skills)}
                    <div className="create-project-page-team-submit">
                        <div onClick={() => CreateProject()} className="create-project-page-team-submit-create">
                            <p>Создать проект</p>
                        </div>
                        <div onClick={() => window.history.back()} className="create-project-page-team-submit-cancel">
                            <p>Отмена</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}