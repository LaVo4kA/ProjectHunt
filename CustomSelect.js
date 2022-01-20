import React from "react";
import styles from "./CustomSelectStyles.css";



export default function CustomSelect(props){
    var tabIndex = Math.floor(Math.random() * 100)
    var defaultValue = props.defaultValue
    var changeFunc = props.changeFunc
    var id = props.id
    var textId = id + "-text"
    var placeHolderId = id + "-placeholder"
    var items = props.items

    function Hide(){
        let e = document.getElementById(id);
        e.hidden = !e.hidden
    }
    
    function ChangePlaceholder(role){
        let e = document.getElementById(textId);
        e.innerText = role;
        e.setAttribute("style", "color: #040D14;")
        if(changeFunc !== undefined)
        {
            changeFunc(role)
        }
    }
    
    function SetDefaultPlaceholder(key, defaultValue){
        if(key === "Backspace"){
            let list = document.getElementById(id);
            if (!list.hidden){
                let e = document.getElementById(textId);
                e.innerText = defaultValue;
                e.setAttribute("style", "color: rgba(0, 0, 0, 0.6);")
            }  

            if(changeFunc !== undefined)
            {
                changeFunc('') 
            }
        }
    }
    
    /*document.addEventListener("mouseup", function(){
        var e = document.getElementById(id)
        if(e !== null && !e.hidden)
        {
            e.hidden = true;
            var t = document.getElementById(placeHolderId)
            t.setAttribute("style", "border: 1px solid rgba(0, 0, 0, 0.2);")
        }
    })*/

    function FocusColor(className){
        console.log("сработал фокус")
        var e = document.getElementsByClassName(className)[0]
        e.style.border = "1px solid #9F87FF"
        e.style.boxShadow = "0px 0px 0px 3px rgba(159, 135, 255, 0.2)"

    }

    function BlurColor(className){
        var e = document.getElementsByClassName(className)[0]
        e.style.border = "1px solid rgba(0, 0, 0, 0.2)"
        e.style.boxShadow = ""
    }
    
    var li_id = 1
    return (
        <div style={styles} className="custom-select">
            <div tabIndex={tabIndex} onKeyDown={(event) => SetDefaultPlaceholder(event.key, defaultValue)} onBlur={() => {BlurColor("custom-select_placeholder" + id);  Hide()}} onFocus={() => {FocusColor("custom-select_placeholder" + id); Hide()}} id={placeHolderId} className={"custom-select_placeholder" + id}>
                <p id={textId}>{defaultValue}</p>
                <img src="../img/arrow-down.svg" alt=""/>
            </div>
            <ul hidden id={id}>
                {items.map(item => {
                    return <li onMouseDown={() => ChangePlaceholder(item)} key={li_id++}>{item}</li>
                })}
            </ul>
        </div>
    );
}