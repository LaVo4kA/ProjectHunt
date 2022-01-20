import React, {useContext, useState} from "react";
import Context from "../Contexts/Context";
import CustomSearch from "../CustomSearch/CustomSearch";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./ProjectsPageFilterStyles.css";
import { Link } from 'react-router-dom'

export default function Filters(props){
    var {start_projects, setProjects} = useContext(Context);
    var [filter, setFilter] = useState({hide_busy: false, search_by_technology: "", search_by_name: "", search_by_role: "", sort_by_name: false, sort_by_freeRolesCount: false})
    var roles = props.roles == undefined ? [] : props.roles;
    var technologies = props.technologies == undefined ? [] :  props.technologies;
    var eventId = window.location.href.slice(window.location.href.indexOf("/projects-list") - 36, window.location.href.indexOf("/projects-list"))

    function Filtering(func){
        func();
        Filter()
    }

    function ChangeRoleSelect(roleName){
        Filtering(() => filter.search_by_role = roleName)
    }

    function ChangeTechnologiesSelect(technology){
        Filtering(() => filter.search_by_technology = technology)
    }

    function ChangeNameSearch(name){
        console.log(name)
        Filtering(() => filter.search_by_name = name)
    }

    function Filter(){
        console.log(filter)
        var now_members = []
        now_members.push(...start_projects)
        
        ChangeCheckbox("checkbox_busy", filter.hide_busy)
        if(filter.hide_busy){
            now_members = now_members.filter(project => project.freeRoleNames.length !== 0);
        }
    
        ChangeText("buttons_options_sort-by-freeRolesCount", filter.sort_by_freeRolesCount)
        if(filter.sort_by_freeRolesCount){
            now_members.sort(FreeRolesCountComparer);
        }
    
        ChangeText("buttons_options_sort-by-name", filter.sort_by_name)
        if(filter.sort_by_name){
            now_members.sort(NameComparer);
        }

        if(filter.search_by_role !== ''){
            now_members = now_members.filter(project => project.freeRoleNames.filter(freeRole => freeRole === filter.search_by_role).length !== 0)
        }

        if(filter.search_by_technology !== ''){
            now_members = now_members.filter(project => project.keyTechnology === filter.search_by_technology)
        }

        if(filter.search_by_name !== ''){
            now_members = now_members.sort(SearchComparer)
        }

        setProjects(now_members)
    }

    function ChangeCheckbox(className, is_active){
        console.log(is_active)
        var e = document.getElementsByClassName(className)[0]
        var path_on = "../img/checkbox-on.svg";
        var path_off = "../img/checkbox-off.svg";
        if(is_active === true)
        {
            e.setAttribute("src", path_on)
        }
        else
        {
            e.setAttribute("src", path_off)
        }
    }
    
    function ChangeText(className, is_active){
        var e = document.getElementsByClassName(className)[0]
        if(is_active === true){
            e.setAttribute("style", "color: #EF0D0D;")
        }
        else {
            e.setAttribute("style", "color: #040D14;")
        }
    }
    
    function FreeRolesCountComparer(a, b){
        var firstCount = a.freeRoleNames.length
        var secondCount = b.freeRoleNames.length
        if(firstCount > secondCount){
            return -1;
        }
        if(firstCount === secondCount){
            return 0;
        }
        if(firstCount < secondCount){
            return 1;
        }
    }

    function SearchComparer(a, b){
        var searchToken = filter.search_by_name.toLowerCase()
        var aNameIndex = a.name.toLowerCase().indexOf(searchToken)
        var bNameIndex = b.name.toLowerCase().indexOf(searchToken)

        if(aNameIndex == -1 && bNameIndex == -1){
            return 0;
        }

        if(aNameIndex >= 0 && bNameIndex == -1){
            return -1;
        }

        if(aNameIndex == -1 && bNameIndex >= 0){
            return 1;
        }
    }
    
    function NameComparer(a, b){
        if(a.name > b.name){
            return 1;
        }
        if(a.name === b.name){
            return 0;
        }
        if(a.name < b.name){
            return -1;
        }
    }

    return(
        <div style={styles} className="filters">
            <div className="title-projects">
                <div className="event-main-title">
                    <h2>Проекты</h2>
                    <h2>{props.count}</h2>
                </div>
                <Link to={"/" + eventId + "/create-project"}>
                    <div className="create-project-button">
                        <img src="../img/plus.svg" alt=""></img>
                        <p>Создать проект</p>
                    </div>
                </Link>
            </div>
            <div className="projects-input-field-filters">
                <div className="projects_selects">
                    <CustomSelect changeFunc={ChangeRoleSelect} defaultValue="Роль в проекте" id="projects-role-list" items={roles}></CustomSelect>
                    <CustomSelect changeFunc={ChangeTechnologiesSelect} defaultValue="Ключевая технология" id="projects-technology-list" items={technologies}></CustomSelect>
                </div>
                <CustomSearch changeFunc={ChangeNameSearch} defaultValue="Название проекта"></CustomSearch>
            </div>
            <div className="one-tup-filters">
                <div className="one-tup-filters_checkboxes">
                    <div onClick={() => Filtering(() => filter.hide_busy = !filter.hide_busy)} className="one-tup-filters_checkboxes_non-description">
                        <img className="checkbox_busy" src="../img/checkbox-off.svg" alt=""></img>
                        <p>Скрыть сформированные проекты</p>
                    </div>
                </div>
                <div className="one-tup-filters_buttons">
                    <p>Сортировка по:</p>
                    <div className="one-tup-filters_buttons_options">
                        <p className="buttons_options_sort-by-freeRolesCount" onClick={() => Filtering(() => filter.sort_by_freeRolesCount = !filter.sort_by_freeRolesCount)}>Кол-ву участников</p>
                        <p className="buttons_options_sort-by-name" onClick={() => Filtering(() => filter.sort_by_name = !filter.sort_by_name)}>Названию</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}