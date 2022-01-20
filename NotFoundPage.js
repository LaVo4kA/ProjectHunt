import React from "react";
import styles from "./NotFoundPageStyles.css"
import { Link } from "react-router-dom";

export default function NotFoundPage(){
    return (
        <div style={styles} className="not-found-page">
            <Link to={"/now-events"}><img src= "../img/projectHunt-login.svg"></img></Link>
            <p className="not-found-page-text">404 Not Found :(</p>
        </div>
    );
}