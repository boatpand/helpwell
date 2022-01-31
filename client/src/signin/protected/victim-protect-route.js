import React from "react";
import { Route, Redirect } from 'react-router-dom';
import victimAuth from "./victim-auth";

export const VictimRoute = ({component:Component , ...rest}) => {
    return(
        <Route {...rest} 
        render={props => {
            // console.log(victimAuth.isVictim())
            if(victimAuth.isVictim()){
                // console.log('aaa')
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