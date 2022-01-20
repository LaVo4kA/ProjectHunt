import React from "react";
import styles from "./CardListStyles.css"

export default function KeyTechnologiesList(props) {
    var labels = props.labels == undefined ? [] : props.labels
    var id = 0
    return (
        <div className="card-list">
            <p>{props.label}</p>
            <ul style={styles}>
                {labels.map(label =>{
                    return <li key={id++}>{label}</li>
                })}
            </ul>
        </div>
    );
}