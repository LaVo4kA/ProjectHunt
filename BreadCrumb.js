import React from "react";
import { Link } from "react-router-dom";
import styles from "./BreadCrumbStyles.css"

export default function BreadCrumb(props){
    var linkPath = props.link
    var title = props.title
    return (
        <div style={styles} className="breadCrumb">
            <Link to={linkPath}> 
                <div>
                    <img src="../img/arrow-back.svg" alt=""/>
                    <p>{title}</p>
                </div>
            </Link>
            
        </div>
    );
}