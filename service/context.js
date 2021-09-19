import React, { useState, createContext, useEffect } from "react";
import firebase from "../firebase/fire";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(user);

    }, [user])

    firebase.auth().onAuthStateChanged((usr) => {
        if (usr) {
            setUser(usr);
        }
    });

    const signIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((u) => {
            setUser(u);
        })
            .catch((e) => alert(e));
    }

    const signUp = (email, password, confirmPassword) => {
        if (password !== confirmPassword) {
            setError("Error: Passwords do not match");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password).then((u) => {
            setUser(u);
        })
            .catch((e) =>setError(e.message));

    }

    const logout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null);
                setError(null);
            });
    };

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                error,
                signIn,
                signUp,
                logout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}