import React from "react";
import styles from "./LoaderStyles.css"

export default function Loader(props){
    var classes = ["lds-ring"]
    if(props.isMiniLoader){
        classes.push("mini-loader")
    }
    return (
        <div style={styles}>
            <div className={classes.join(" ")}><div></div><div></div><div></div><div></div></div>
        </div>
    );
}