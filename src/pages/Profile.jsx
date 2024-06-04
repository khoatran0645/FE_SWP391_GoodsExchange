import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NewPosts = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Link to="/posts" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h2" align="center">
            New Posts
          </Typography>
        </Link>
      </Grid>
      {/* Add more Grid items here for posts */}
    </Grid>
  );
};

export default NewPosts;