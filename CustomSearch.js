import React from "react";
import styles from "./CustomSearchStyles.css"

export default function CustomSearch(props){
    var func = props.changeFunc

    function CheckChange(){
        var value = document.getElementById("custom-search-input").value
        func(value)
    }

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

    return (
        <div style={styles} className="custom-search">
            <img src="../img/search.svg" alt=""></img>
            <input id="custom-search-input" onFocus={() => FocusColor("custom-search")} onBlur={() => BlurColor("custom-search")} onChange={() => CheckChange()} type={"search"} placeholder={props.defaultValue}></input>
        </div>
    );
}