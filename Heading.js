import React from "react";
import styles from "./HeadingStyles.css"

export default function Heading(props){
    return (
        <div style={styles} className="heading">
            <p>{props.title}</p>
        </div>
    );
}