import React, {useState, useEffect} from "react";
import styles from "./ProjectsListTitleStyles.css"
import Heading from "../Heading/Heading";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function ProjectsListTitle(){
    var [eventName, setEventName] = useState("")
    var eventId = window.location.href.slice(window.location.href.indexOf("/projects-list") - 36, window.location.href.indexOf("/projects-list"))
    
    useEffect(() => {
        GetEventName()
    })

    function GetEventName(){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true
        xhr.open("GET", "http://localhost:5001/catalogs/getEventName?eventId=" + eventId)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send()
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                setEventName(JSON.parse('"' + xhr.responseText + '"'))
            }
        }
    }

    return (
        <div style={styles} className="event-title">
            {eventName == "" ? <Loader isMiniLoader={true}/> : <Heading title={eventName}></Heading>}
            
        </div>
    );
}