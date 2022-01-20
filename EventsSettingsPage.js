import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Context from "../Contexts/Context";
import CustomSelectProfile from "../CustomSelect/CustomSelectProfile";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Heading from "../Heading/Heading";
import styles from "./EventsSettingsPageStyles.css"

export default function EventsSettingsPage(){
    var [userEvents, setUserEvents] = useState([])
    var [eventInfo, setEvent] = useState({})
    var [eventNames, setEventNames] = useState([""])
    var [eventState, setEventState] = useState({})
    var btnClasses = ["events-settings-page-save-btn"]

    function setEventInfo(event){
        setEvent({...event})
        var state = {...event}
        setEventState(state)
    }

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        GetUserEventsInfo()
    }, [])

    function GetUserEventsInfo(){
        var userId = localStorage.getItem("userId")
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/catalogs/getUserEventsInfo?userId=" + userId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var events = JSON.parse("[" + xhr.responseText + "]")[0]
                setUserEvents(events)
                setEventNames(events.map(event => event.eventName))
            }
        }
    }

    function SaveEventInfo(){
        var obj = GetUpdateObject()
        var request = JSON.stringify(obj)
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("PATCH", "http://localhost:5001/events/updateUserEventInfo")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send(request)
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var ok = document.getElementById("events-settings-page-save-ok")
                ok.style.display = "block"
                setTimeout(function(){ok.style.display = "none"}, 1000)

                var index = userEvents.findIndex(e => e.eventId == eventState.eventId)
                userEvents[index] = {...eventState}
                eventInfo = {...eventState}
                setEvent(eventInfo)
                setUserEvents([...userEvents])
            }
        }
    }

    function GetUpdateObject(){
        return {
            eventId: eventState.eventId,
            role: eventState.role,
            description: eventState.description,
            skills: eventState.skills
        }
    }

    function CheckChanges(){
        if(eventInfo.role == eventState.role
            && eventInfo.description == eventState.description
            && eventInfo.skills == eventState.skills)
            {
                btnClasses.push('settings-events-save-bnt-disabled')
            }
    }

    function CheckDisabled(){
        var e = document.getElementsByClassName("events-settings-page-save-btn")[0]
        if(!e.classList.contains("settings-events-save-bnt-disabled"))
        {
            SaveEventInfo()
        }
    }

    function ChangeSearchRoleValue(){
        var input = document.getElementById("create-project-page-team-input-field_role")
        var searchValue = input.value.toLowerCase()

        var selectElements = document.getElementsByClassName("create-project-page-team-input-list-element")
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

    function GetSelectRole(roles){
        var id = Math.random() * 1000;
        var key = 1
        return(
            <div className="create-project-page-team-input">
                <div>
                    <img src="../img/search.svg"></img>
                    <input key={id} id={"create-project-page-team-input-field_role"} onChange={() => ChangeSearchRoleValue()} onBlur={() => HideList(id)} onFocus={() => HideList(id)} type={"text"} defaultValue={eventState.role}></input>
                </div>
                <ul hidden id={id} className="create-project-page-team-input-list">
                    {roles.map(role => {
                        return <li className="create-project-page-team-input-list-element" onMouseDown={() => ChooseRole(role, id)} key={key++}>{role}</li>
                    })}
                </ul>
            </div>
        );
    }

    function ChooseRole(role, id){
        var input = document.getElementById("create-project-page-team-input-field_role")
        input.value = role
        eventState.role = role
        HideList(id)
        setEventState({...eventState})
    }

    function HideList(id){
        var list = document.getElementById(id)
        list.hidden = !list.hidden
    }

    function CheckEvent(){
        if(eventState.baseRoles === undefined)
        {
            return <p className="settings-placeholder">Сначала выберите мероприятие</p>
        }
        else {
            return (
                <div>
                    <div className="events-settings-page-settings">
                        <div className="events-settings-page-settings-roles">
                            <p className="join-event-page-before-role-title">Желаемая роль в команде<span className="create-project-page-input_name-title-star">*</span></p>
                            {GetSelectRole(eventState.baseRoles)}
                        </div>
                        <div className="events-settings-page-settings-skills">
                            <p className="join-event-page-before-role-title">Твои ключевые навыки<span className="create-project-page-input_name-title-star">*</span></p>
                            {GetSelectSkills("Выберите 3 своих ключевых навыка", eventState.baseSkills, eventState.skills.length >= 3 ? "3 ключевых навыка выбрано" : "")}
                            <div className="create-project-page-team-member-options-skills-list">
                                {GetSkillsList(eventState.skills)}
                            </div>
                        </div>
                        <div className="events-settings-page-settings-skills-about">
                            <p className="events-settings-page-settings-skills-about-title">Немного о себе</p>
                            <textarea key={eventState.eventId} id="events-settings-page-settings-skills-about-description" onBlur={() => SaveDescriprion()} className="events-settings-page-settings-skills-about-text" placeholder="Чем больше полезной информации ты о себе напишешь, тем вероятнее, что тобой заинтересуются и
                            пригласят в комаду" defaultValue={eventState.description}></textarea>
                        </div>
                    </div>
                </div>
            )
        }
    }

    function SaveDescriprion(){
        var input = document.getElementById("events-settings-page-settings-skills-about-description")
        eventState.description = input.value
        setEventState({...eventState})
    }

    function ChangeSearchSkillValue(){
        var input = document.getElementById("events-settings-page-settings-skill")
        var searchValue = input.value.toLowerCase()

        var selectElements = document.getElementsByClassName("create-project-page-team-input-list-element")
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

    function GetSelectSkills(placeholder, skills, value){
        var id = Math.random() * 1000;
        var key = 1
        return(
            <div className="create-project-page-team-input">
                <div>
                    <img src="../img/search.svg"></img>
                    <input tabIndex={-1} key={id++} id={"events-settings-page-settings-skill"} disabled={eventState.skills.length >= 3 ? true : false} onChange={() => ChangeSearchSkillValue()} onBlur={() => HideList(id)} onFocus={() => HideList(id)} type={"search"} placeholder={placeholder} defaultValue={value}></input>
                </div>
                <ul hidden id={id} className="create-project-page-team-input-list">
                    {skills.map(skill => {
                        if(eventState.skills.find(s => s === skill) == undefined){
                            return <li className="create-project-page-team-input-list-element" onMouseDown={() => ChooseSkill(skill, id)} key={key++}>{skill}</li>
                        }
                    })}
                </ul>
            </div>
        );
    }

    function ChooseSkill(skill){
        var selectElements = document.getElementsByClassName("create-project-page-team-input-list-element")
        for (let i = 0; i < selectElements.length; i++) {
            var s = selectElements[i];
            s.hidden = false
        }
        /* Костыль! Без этого почему-то изменяет состояние eventInfo вместе с eventState */
        var t = [...eventState.skills]
        t.push(skill)
        eventState.skills = [...t]
        HideList("events-settings-page-settings-skill")
        setEventState({...eventState})
    }

    function GetSkillsList(skills){
        var key = 1
        return (
            skills.map(skill => {
                return (
                    <div className="create-project-page-team-member-options-skills-skill" key={key++}>
                        <div className="create-project-page-team-member-options-skills-skill-box">
                            <div className="create-project-page-team-member-options-skills-skill-name">
                                <p>{skill}</p>
                            </div>
                        </div>
                        <div className="create-project-page-team-member-options-skills-skill-img-box">
                            <img onClick={() => DeleteSkill(skill)} src="../img/cross-skill.svg"></img>
                        </div>
                    </div>
                );
            })
        );
    }

    function DeleteSkill(skill)
    {
        eventState.skills = eventState.skills.filter(e => e != skill )
        setEventState({...eventState})
    }

    return (
        <Context.Provider value={{userEvents, setEventInfo}}>
            <div style={styles} className="events-settings-page">
                <Header></Header>
                <div className="wrapper">
                    <Heading title="Настройки"></Heading>
                    <div className="events-settings-page-title">
                        <h2>Мероприятие</h2>
                        <CustomSelectProfile className={"events-settings-page-title-select"} id={"events-settings-page-title-select"} items={eventNames}></CustomSelectProfile>
                    </div>
                    <div className="events-settings-page-main">
                        <div className="events-settings-page-options">
                            {CheckEvent()}
                        </div>
                        <div className="events-settings-page-all_settings">
                            <Link to={"/settings/profile"}>
                                <div className="events-settings-page-all_settings-profile">
                                    <img src="../img/settings-profile.svg" alt=""></img>
                                    <p>Учётная запись</p>
                                </div>
                            </Link>
                            <div className="events-settings-page-all_settings-events">
                                <img src="../img/settings-event.svg" alt=""></img>
                                <p>Мероприятия</p>
                            </div>
                        </div>
                    </div>
                    {CheckChanges()}
                    {eventState.baseRoles !== undefined &&
                        <div className="events-settings-page-save">
                            <div onClick={() => CheckDisabled()} className={btnClasses.join(' ')}>
                                <p>Сохранить</p>
                            </div>
                            <img hidden id="events-settings-page-save-ok" src="../img/ok-green.svg"></img>
                        </div>
                    }
                </div>
                <Footer></Footer>
            </div>
        </Context.Provider>
    )
}