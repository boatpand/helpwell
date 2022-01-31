import React from "react";
import { Route, Redirect } from 'react-router-dom';
import adminAuth from "./admin-auth";

export const AdminRoute = ({component:Component , ...rest}) => {
    return(
        <Route {...rest} 
        render={props => {
            if(adminAuth.isAdmin()){
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