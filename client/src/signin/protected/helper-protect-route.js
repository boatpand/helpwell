import React from "react";
import { Route, Redirect } from 'react-router-dom';
import helperAuth from "./helper-auth";

export const HelperRoute = ({component:Component , ...rest}) => {
    return(
        <Route {...rest} 
        render={props => {
            if(helperAuth.isHelper()){
                return <Component {...props} />;
            }
            else{
                return <Redirect to={
                    {pathname:"/", state:{from:props.location}}}/>
            }
            }
        }/>
    )
}