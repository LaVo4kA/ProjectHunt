import React, {useContext} from "react";
import styles from "./CustomSelectProfileStyles.css"
import Context from "../Contexts/Context";

export default function CustomSelectProfile(props){
    var id = props.id
    var textId = id + "-text"
    var placeHolderId = id + "-placeholder"
    var items = props.items
    var {userEvents, setEventInfo} = useContext(Context)

    function Hide(){
        let e = document.getElementById(id);
        var p = document.getElementsByClassName("custom-select-profile_placeholder")[0]
        var now_width = p.offsetWidth
        e.hidden = !e.hidden
        e.style.width = now_width + "px"
    }
    
    function ChangePlaceholder(eventName){
        let e = document.getElementById(textId);
        e.innerText = eventName;
        setEventInfo(userEvents.filter(event => event.eventName === eventName)[0])
    }

    document.addEventListener("mouseup", function(){
        var e = document.getElementById(id)
        if(e !== null && !e.hidden)
        {
            e.hidden = true;
        }
    })
    
    var li_id = 1
    var defaultValue;

    if(items.length === 0){
        defaultValue = "Нет мероприятий"
    }
    else {
        defaultValue = "Выберите мероприятие"
    }

    function CheckItems(){
        if(items.length !== 0)
        {
            return <img src="../img/arrow-down-profile.svg" alt=""/>
        }
        else {
            var e = document.getElementById(textId)
            if(e !== null)
            {
                e.style.marginRight = "12px";
                var p = document.getElementById(placeHolderId)
                p.style.background = "#F9F9F9";
                p.style.opacity = "0.5"
                p.style.cursor = "default"
                p.onclick = function(){Hide()}
            }
        }
    }

    return (
        <div style={styles} className="custom-select-profile">
            <div onClick={() => Hide()} id={placeHolderId} className="custom-select-profile_placeholder">
                <p id={textId}>{defaultValue}</p>
                {CheckItems()}
            </div>
            <ul hidden id={id}>
                {items.map(item => {
                    return <li onClick={() => ChangePlaceholder(item)} key={li_id++}>{item}</li>
                })}
            </ul>
        </div>
    );
}