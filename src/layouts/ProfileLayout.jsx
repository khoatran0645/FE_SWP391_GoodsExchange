import { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import NavBar from "../features/common/NavBar";
import useStore from "../app/store";

export default function ProfileLayout() {
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(true);
  const getProfileOtherById = useStore((state) => state.getProfileOtherById);
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      getProfileOtherById(params.id);
      setIsOwner(false);
    }
  }, []);
  // console.log("false", false);

  return (
    <>
      <NavBar />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          lg={2}
          sm={12}
          sx={{
            backgroundColor: "#f4f4f4",
            display: "flex",
            flexDirection: "column",
            padding: 2,
            height: "100vh",
            boxShadow: 3,
            borderRight: "1px solid #ddd",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: 3,
              textAlign: "center",
              color: "#333",
              fontFamily: "fantasy",
            }}
          >
            PROFILE PANEL
          </Typography>

          <Button
            variant="outlined"
            onClick={() => {
              isOwner
                ? navigate("/profile")
                : navigate("/profile/" + params.id);
            }}
            sx={{
              marginBottom: 3,
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Profile Information
          </Button>

          {isOwner && (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate("/profile/request-trade")}
                sx={{
                  marginBottom: 3,
                  color: "#333",
                  borderColor: "#333",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "#333",
                  },
                  width: "100%",
                  borderRadius: "4px",
                  padding: "10px",
                  textTransform: "none",
                }}
              >
                Request
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/profile/receive-trade")}
                sx={{
                  marginBottom: 3,
                  color: "#333",
                  borderColor: "#333",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "#333",
                  },
                  width: "100%",
                  borderRadius: "4px",
                  padding: "10px",
                  textTransform: "none",
                }}
              >
                Receive
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/profile/transaction-cancelled")}
                sx={{
                  marginBottom: 3,
                  color: "#333",
                  borderColor: "#333",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "#333",
                  },
                  width: "100%",
                  borderRadius: "4px",
                  padding: "10px",

                  textTransform: "none",
                }}
              >
                Transaction Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/profile/transaction-complete")}
                sx={{
                  marginBottom: 3,
                  color: "#333",
                  borderColor: "#333",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "#333",
                  },
                  width: "100%",
                  borderRadius: "4px",
                  padding: "10px",

                  textTransform: "none",
                }}
              >
                Transaction Complete
              </Button>
            </>
          )}

          <Button
            variant="outlined"
            onClick={() => {
              isOwner
                ? navigate("/profile/inventory-trade")
                : navigate(`/profile/${params.id}/inventory-trade`);
            }}
            sx={{
              marginBottom: 3,
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",

              textTransform: "none",
            }}
          >
            Inventory
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              isOwner
                ? navigate("/profile/rating")
                : navigate(`/profile/${params.id}/rating`);
            }}
            sx={{
              marginBottom: 3,
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Rating
          </Button>
        </Grid>
        <Grid item lg={10} sm={12} sx={{ padding: 2 }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
