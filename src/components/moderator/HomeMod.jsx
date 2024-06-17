import * as React from "react";
import ModeratorPage from "./ModeratorPage";
import NavBarMo from "./NavBarMo";
import Box from "@mui/material/Box";
export default function HomeMod() {
    return (
        <>
            <NavBarMo />
            <Box>
                <ModeratorPage />
                <Box component="main">
                    <h1>Welcome Moderator Page</h1>
                </Box>
            </Box>
        </>
    );
}
