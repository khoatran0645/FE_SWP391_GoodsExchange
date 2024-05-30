import React, { useState } from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

// Mock function to render stars (you should replace this with your actual implementation)
const renderStars = (rating) => {
  return (
    <Typography variant="body1">
      {'⭐'.repeat(rating)}
    </Typography>
  );
};

const Profile = ({ location }) => {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="15vh"
      sx={{ backgroundColor: "#ffffff" }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}>
            {location.state.nameOfPoster.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4" marginX={0.5} marginY={1}>
            {location.state.nameOfPoster.charAt(0).toUpperCase() + location.state.nameOfPoster.slice(1)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          {renderStars(location.state.rating)}
        </Box>
        {!showPhoneNumber ? (
          <Button
            onClick={() => setShowPhoneNumber(true)}
            sx={{
              backgroundColor: "#00ff00",
              color: "#0000ff",
              borderRadius: 2.5,
              marginTop: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Show phone number
          </Button>
        ) : (
          <Typography sx={{ textAlign: "center", marginTop: 1 }}>
            {location.state.phoneOfPoster}
          </Typography>
        )}
        <Button
          sx={{
            marginTop: 1.5,
          }}
        >
          Chat with seller
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
