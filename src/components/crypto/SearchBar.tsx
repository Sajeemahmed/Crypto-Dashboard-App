import React from 'react';
import { 
  TextField, 
  InputAdornment, 
  Paper, 
  Box 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ width: '100%', mb: 3 }}>
        <Paper 
          elevation={3}
          sx={{ 
            p: 0.5,
            borderRadius: 2,
            background: (theme) => theme.palette.backgroundSecondary.main,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 1.5,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
              }
            }}
          />
        </Paper>
      </Box>
    </motion.div>
  );
};

export default SearchBar;