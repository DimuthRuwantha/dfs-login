import React from "react";
import { AuthConsumer } from "./AuthProvider";

export const LogoutCallback = () => (
    <AuthConsumer>
        {({ signoutRedirectCallback }) => {
            signoutRedirectCallback();
            return <span></span>;
        }}
    </AuthConsumer>
);
