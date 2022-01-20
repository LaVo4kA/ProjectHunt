import React, {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Heading from "../Heading/Heading";
import styles from "./CreateEventPageStyles.css"
import { useNavigate } from "react-router-dom";

export default function CreateProjectPage(){
    var [baseRoles, setBaseRoles] = useState([])
    var [baseSkills, setBaseSkills] = useState([])
    var [baseKeyTechnologies, setBaseKeyTechnologies] = useState([])
    var [roles, setRoles] = useState([])
    var [skills, setSkills] = useState([])
    var [keyTechnologies, setKeyTechnologies] = useState([])
    var navigate = useNavigate()

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        GetBaseKeyTechnologies()
        GetBaseRoles()
        GetBaseSkills()
    }, [])
    
    function GetBaseKeyTechnologies(){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "http://localhost:5001/catalogs/getBaseKeyTechnologies")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send()
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно получены навыки")
            setBaseKeyTechnologies(JSON.parse("[" + xhr.responseText + "]")[0])
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить навыки")
          }
        }
    }

    function GetBaseRoles(){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "http://localhost:5001/catalogs/getBaseRoles")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send()
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно получены навыки")
            setBaseRoles(JSON.parse("[" + xhr.responseText + "]")[0])
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить навыки")
          }
        }
    }

    function GetBaseSkills(){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "http://localhost:5001/catalogs/getBaseSkills")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send()
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 200){
            console.log("Успешно получены навыки")
            setBaseSkills(JSON.parse("[" + xhr.responseText + "]")[0])
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось получить навыки")
          }
        }
    }

    function CreateEvent(){
        var obj = GetCreateEventObj()
        var request = JSON.stringify(obj)
        console.log(request)
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", "http://localhost:5001/events/create")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(request)
        
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4 && xhr.status === 201){
            console.log("Успешно создали мероприятие")
            var eventId = xhr.responseText
            navigate("/" + eventId + "/projects-list")
          }
          if (xhr.readyState === 4 && xhr.status !== 200){
            console.log("Не удалось создать мероприятие")
          }
        }
    }

    function GetCreateEventObj(){
        return {
            name: document.getElementsByClassName("create-event-name-name-input")[0].value,
            roles: roles,
            keyTechnologies: keyTechnologies,
            skills: skills,
            closeTime: document.getElementsByClassName("create-event-date_people-date-input")[0].value,
            maxProjectPeople: Number(document.getElementsByClassName("create-event-date_people-people-input")[0].value)
        }
    }

    function HideList(id){
        var list = document.getElementById(id)
        list.hidden = !list.hidden
    }

    function GetSelectItems(placeholder, baseItems, items, itemsType, setItemsFunc, setBaseItemsFunc){
        var id = Math.random() * 1000;
        var key = 1
        baseItems.sort()
        return(
            <div className="create-event-items-select">
                <div>
                    <img src="../img/search.svg"></img>
                    <input key={id++} id={"create-event-items-select-input" + itemsType} onChange={() => ChangeSearchSkillValue(itemsType)} onBlur={() => HideList(id)} onFocus={() => HideList(id)} type={"search"} placeholder={placeholder}></input>
                </div>
                <ul hidden id={id} className="create-event-items-select-input-list">
                    {baseItems.map(item => {
                        return <li className={"create-event-items-select-input-element" + itemsType} onMouseDown={() => ChooseItem(item, id, itemsType, baseItems, items, setItemsFunc, setBaseItemsFunc)} key={key++}>{item}</li>
                    })}
                </ul>
            </div>
        );
    }

    function ChooseItem(item, id, itemsType, baseItems, items, setItemsFunc, setBaseItemsFunc){
        var selectElements = document.getElementsByClassName("create-event-items-select-input-element" + itemsType)
        for (let i = 0; i < selectElements.length; i++) {
            var s = selectElements[i];
            s.hidden = false
        }

        items.push(item)
        baseItems = baseItems.filter(i => i !== item)
        HideList(id)
        setBaseItemsFunc([...baseItems])
        setItemsFunc([...items])
    }

    function ChangeSearchSkillValue(itemsType){
        var input = document.getElementById("create-event-items-select-input" + itemsType)
        var searchValue = input.value.toLowerCase()

        var selectElements = document.getElementsByClassName("create-event-items-select-input-element" + itemsType)
        for (let i = 0; i < selectElements.length; i++) {
            var s = selectElements[i];
            var s_value = s.innerText.toLowerCase()
            if(s_value.indexOf(searchValue) === -1){
                s.hidden = true
            }
            else{
                s.hidden = false
            }
        }
    }

    function GetItemsList(placeholder, items, baseItems, setItemsFunc, setBaseItemsFunc){
        if(items.length === 0){
            return <p className="empty-list-placeholder">{placeholder}</p>
        }
        else {
            var key = 1
            console.log(items)
            return (
                items.map(item => {
                    return (
                        <div className="create-project-page-team-member-options-skills-skill" key={key++}>
                            <div className="create-project-page-team-member-options-skills-skill-box">
                                <div className="create-project-page-team-member-options-skills-skill-name">
                                    <p>{item}</p>
                                </div>
                            </div>
                            <div className="create-project-page-team-member-options-skills-skill-img-box">
                                <img onClick={() => DeleteItem(item, items, baseItems, setItemsFunc, setBaseItemsFunc)} src="../img/cross-skill.svg"></img>
                            </div>
                        </div>
                    );
                })
            );
        }
    }

    function DeleteItem(item, items, baseItems, setItemsFunc, setBaseItemsFunc)
    {
        items = items.filter(i => i !== item)
        baseItems.push(item)
        setItemsFunc([...items])
        setBaseItemsFunc([...baseItems])
    }

    function GetTodayDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        } 
            
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today)
        return today
    }

    return (
        <div>
            <Header></Header>
            <div className="wrapper">
                <div style={styles} className="create-event-page">
                    <Heading title="Создайте своё мероприятие"></Heading>
                    <div className="create-event-name-name">
                        <p className="create-event-input_title">Название<span className="create-event-star">*</span></p>
                        <input className="create-event-name-name-input" type={"text"}></input>
                    </div>
                    <div className="create-event-date_people">
                        <div className="create-event-date_people-date">
                            <p className="create-event-input_title">Дата окончания<span className="create-event-star">*</span></p>
                            <input min={GetTodayDate()} className="create-event-date_people-date-input" type={"date"}></input>
                        </div>
                        <div className="create-event-date_people-name">
                            <p className="create-event-input_title">Кол-во участников в проекте<span className="create-event-star">*</span></p>
                            <input placeholder="Макс. допустимое кол-во" className="create-event-date_people-people-input" type={"text"}></input>
                        </div>
                    </div>
                    <div className="create-event-technologies">
                        <p className="create-event-input_title">Набор ключевых технологий<span className="create-event-star">*</span></p>
                        {GetSelectItems("Выберите ключевые технологии, которые будут использованы в проектах", baseKeyTechnologies, keyTechnologies, "technology", setKeyTechnologies, setBaseKeyTechnologies)}
                        <div className="create-event-values">
                            {GetItemsList("Ключевые технологии не выбраны", keyTechnologies, baseKeyTechnologies, setKeyTechnologies, setBaseKeyTechnologies)}
                        </div>
                    </div>
                    <div className="create-event-roles">
                        <p className="create-event-input_title">Набор ролей<span className="create-event-star">*</span></p>
                        {GetSelectItems("Выберите роли, которые будут доступны участникам", baseRoles, roles, "roles", setRoles, setBaseRoles)}
                        <div className="create-event-values">
                            {GetItemsList("Роли не выбраны", roles, baseRoles, setRoles, setBaseRoles)}
                        </div>
                    </div>
                    <div className="create-event-skills">
                        <p className="create-event-input_title">Набор ключевых навыков<span className="create-event-star">*</span></p>
                        {GetSelectItems("Выберите ключевые навыки, которые смогут выбирать участники", baseSkills, skills, "skill", setSkills, setBaseSkills)}
                        <div className="create-event-values">
                            {GetItemsList("Ключевые навыки не выбраны", skills, baseSkills, setSkills, setBaseSkills)}
                        </div>
                    </div>
                    <div onClick={() => CreateEvent()} className="create-event-create">
                        <p>Создать мероприятие</p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
        
    );
}