import React, {useContext, useState} from "react";
import Context from "../Contexts/Context";
import CustomSearch from "../CustomSearch/CustomSearch";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./MembersPageFilterStyles.css";

export default function Filters(props){
    var {start_members, setMembers} = useContext(Context);
    var [filter, setFilter] = useState({hide_busy: false, hide_non_description: false, search_by_name: "", search_by_role: "", sort_by_name: false, sort_by_role: false})
    var roles = props.roles == undefined ? [] : props.roles

    function Filtering(func){
        func();
        Filter()
    }

    function ChangeRoleSelect(roleName){
        Filtering(() => filter.search_by_role = roleName)
    }

    function ChangeNameSearch(name){
        console.log(name)
        Filtering(() => filter.search_by_name = name)
    }

    function Filter(){
        console.log(filter)
        var now_members = []
        now_members.push(...start_members)
        
        ChangeCheckbox("checkbox_busy", filter.hide_busy)
        if(filter.hide_busy){
            now_members = now_members.filter((member) => member.isBusy === false);
        }
        
        ChangeCheckbox("checkbox_non-description", filter.hide_non_description)
        if(filter.hide_non_description){
            now_members = now_members.filter((member) => member.description !== null && member.description.trim() !== "");
        }
    
        ChangeText("buttons_options_sort-by-name", filter.sort_by_name)
        if(filter.sort_by_name){
            now_members.sort(NameComparer);
        }
    
        ChangeText("buttons_options_sort-by-role", filter.sort_by_role)
        if(filter.sort_by_role){
            now_members.sort(RoleComparer);
        }

        if(filter.search_by_role !== ''){
            now_members = now_members.filter(member => member.role === filter.search_by_role)
        }

        if(filter.search_by_name !== ''){
            now_members = now_members.sort(SearchComparer)
        }

        setMembers(now_members)
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
    
    function NameComparer(a, b){
        var first = a.firstName + " " + a.secondName
        var second = b.firstName + " " + b.secondName
        if(first > second){
            return 1;
        }
        if(first === second){
            return 0;
        }
        if(first < second){
            return -1;
        }
    }

    function SearchComparer(a, b){
        var searchToken = filter.search_by_name.toLowerCase()
        var aFirstNameIndex = a.firstName.toLowerCase().indexOf(searchToken)
        var bFirstNameIndex = b.firstName.toLowerCase().indexOf(searchToken)
        var aSecondNameIndex = a.secondName.toLowerCase().indexOf(searchToken)
        var bSecondNameIndex = b.secondName.toLowerCase().indexOf(searchToken)

        console.log(aFirstNameIndex + " " + bFirstNameIndex + " " + aSecondNameIndex + " " + bSecondNameIndex)
        
        if(aFirstNameIndex == -1 && bFirstNameIndex == -1
        && aSecondNameIndex == -1 && bSecondNameIndex == -1){
            return 0;
        }

        if((aFirstNameIndex >= 0 && bFirstNameIndex == -1)
        || (aSecondNameIndex >= 0 && bSecondNameIndex == -1)){
            return -1;
        }

        if((aFirstNameIndex == -1 && bFirstNameIndex >= 0)
        || (aSecondNameIndex == -1 && bSecondNameIndex >= 0)){
            return 1;
        }
    }
    
    function RoleComparer(a, b){
        if(a.role > b.role){
            return 1;
        }
        if(a.role === b.role){
            return 0;
        }
        if(a.role < b.role){
            return -1;
        }
    }

    return(
        <div style={styles} className="filters">
            <div className="title-members">
                <h2>Участники</h2>
                <h2>{props.count}</h2>
            </div>
            <div className="members-input-field-filters">
                <CustomSelect changeFunc={ChangeRoleSelect} defaultValue="Роль в проекте" id="members-role-select" items={roles}></CustomSelect>
                <CustomSearch changeFunc={ChangeNameSearch} defaultValue="Поиск по имени/фамилии"></CustomSearch>
            </div>
            <div className="one-tup-filters">
                <div className="one-tup-filters_checkboxes">
                    <div onClick={() => Filtering(() => filter.hide_busy = !filter.hide_busy)} className="one-tup-filters_checkboxes_busy">
                        <img className="checkbox_busy" src="../img/checkbox-off.svg" alt=""></img>
                        <p>Скрыть занятых</p>
                    </div>
                    <div onClick={() => Filtering(() => filter.hide_non_description = !filter.hide_non_description)} className="one-tup-filters_checkboxes_non-description">
                        <img className="checkbox_non-description" src="../img/checkbox-off.svg" alt=""></img>
                        <p>Скрыть без описания</p>
                    </div>
                </div>
                <div className="one-tup-filters_buttons">
                    <p>Сортировка по:</p>
                    <div className="one-tup-filters_buttons_options">
                        <p className="buttons_options_sort-by-name" onClick={() => Filtering(() => filter.sort_by_name = !filter.sort_by_name)}>Имени</p>
                        <p className="buttons_options_sort-by-role" onClick={() => Filtering(() => filter.sort_by_role = !filter.sort_by_role)}>Роли</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}