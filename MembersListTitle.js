import React from "react";
import styles from "./MembersListTitleStyles.css"
import Heading from "../Heading/Heading";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function MembersListTitle(props){
    var eventId = window.location.href.slice(window.location.href.indexOf("/members-list") - 36, window.location.href.indexOf("/members-list"))
    var eventName = props.eventName

    return (
        <div style={styles} className="event-title">
            {eventName == undefined ? <Loader isMiniLoader={true}/> : <Heading title={eventName}></Heading>}
            <div className="title-lists">
                <Link to={"/" + eventId + "/projects-list"}>
                    <div className="members_project-list">
                        <p>Список проектов</p>
                    </div>
                </Link>
                <Link to={"/" + eventId + "/members-list"}>
                    <div className="members_members-list">
                        <p>Список участников</p>
                    </div> 
                </Link>
            </div>
        </div>
    );
}