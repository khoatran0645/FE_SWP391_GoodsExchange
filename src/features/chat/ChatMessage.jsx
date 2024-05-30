// src/ChatMessage.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const ChatMessage = ({ message, isSender }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSender ? 'row-reverse' : 'row',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Avatar sx={{ bgcolor: isSender ? 'primary.main' : 'secondary.main' }}>
        {message?.sender}
      </Avatar>
      <Box sx={{ mx: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          align={isSender ? 'right' : 'left'}
        >
          {message?.sender}
        </Typography>
        <Box
          sx={{
            p: 1,
            bgcolor: isSender ? 'primary.light' : 'grey.200',
            borderRadius: 2,
          }}
        >
          <Typography variant="body1">{message?.text}</Typography>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          align={isSender ? 'right' : 'left'}
          display="block"
        >
          {message?.timestamp}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
