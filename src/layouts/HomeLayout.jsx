import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import SearchAppBar from "../pages/SearchBar";
import StickyFooter from "../components/common/Footer";

export default function HomeLayout() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
        <SearchAppBar />
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
      <Grid item xs={12}>
        <StickyFooter />
      </Grid>
    </Grid>
  );
}