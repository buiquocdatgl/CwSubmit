import React, { useContext } from "react";
import  AuthTab  from "./AuthTab";
import { NavigationContainer } from "@react-navigation/native";
import  MainTab  from "./MainTab";
import { AuthenticationContext } from "../../service/context";

const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);
    console.log("show",isAuthenticated);
    return (
        <NavigationContainer>
           {isAuthenticated ? <MainTab /> : <AuthTab />}
        </NavigationContainer>
    );
};

export default Navigation