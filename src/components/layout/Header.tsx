import React, { useContext } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Tooltip, 
  useMediaQuery, 
  useTheme,
  Avatar
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ThemeContext } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRefresh }) => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        backdropFilter: 'blur(10px)',
        background: 'rgba(18, 18, 18, 0.8)',
      }}
    >
      <Toolbar>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Avatar
            src="/api/placeholder/48/48"
            alt="Crypto Dashboard"
            sx={{ 
              mr: 1.5,
              background: 'linear-gradient(45deg, #6d5acd 30%, #44ddbf 90%)',
              fontWeight: 'bold',
              width: 36,
              height: 36,
            }}
          >
            C
          </Avatar>
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            component="div" 
            sx={{ 
              flexGrow: 1,
              background: 'linear-gradient(45deg, #6d5acd 30%, #44ddbf 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            Crypto Dashboard
          </Typography>
        </motion.div>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Refresh data">
            <IconButton 
              onClick={onRefresh}
              aria-label="refresh data"
              color="primary"
              sx={{ mr: 1 }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              aria-label="toggle theme"
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
