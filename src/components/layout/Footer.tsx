import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto', 
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Crypto Dashboard - Data provided by CoinGecko API
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Made with ❤️ using React, TypeScript and Material UI
      </Typography>
    </Box>
  );
};

export default Footer;