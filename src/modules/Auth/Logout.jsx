import React from "react";
import { AuthConsumer } from "./AuthProvider";

export const Logout = () => (
    <AuthConsumer>
        {({ logout }) => {
            logout();
            return <span></span>;
        }}
    </AuthConsumer>
);