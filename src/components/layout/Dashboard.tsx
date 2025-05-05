import React, { useState } from 'react';

import { 
  Container, 
  Typography, 
  Box, 
  useMediaQuery, 
  useTheme,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import useCryptoData from '../../hooks/useCryptoData';
import Header from './Header';

import CoinTable from '../crypto/CoinTable';
import CoinCard from '../crypto/CoinCard';
import SearchBar from '../crypto/SearchBar';
import PriceChart from '../charts/PriceChart';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorAlert from '../ui/ErrorAlert';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { coins, loading, error, refetch } = useCryptoData();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [selectedCoin, setSelectedCoin] = useState<string>('bitcoin');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'list' | 'grid',
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Header onRefresh={refetch} />
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {/* Dashboard Header */}
        <Box sx={{ mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              component="h1" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Cryptocurrency Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Track real-time prices and market data for top cryptocurrencies
            </Typography>
          </motion.div>
        </Box>
        
        {/* Search and View Toggle */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 3, mx: -1 }}>
          <Box sx={{ width: { xs: '100%', sm: '66.67%', md: '75%' }, p: 1 }}>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '33.33%', md: '25%' }, p: 1, display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label="view mode"
              size="small"
              sx={{ 
                bgcolor: 'backgroundSecondary.main',
                borderRadius: 1,
              }}
            >
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        
        {/* Main Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorAlert message={error} onRetry={refetch} />
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
            {/* Chart Section */}
            <Box sx={{ width: { xs: '100%', lg: '66.67%' }, p: 1.5 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <PriceChart 
                  coins={filteredCoins} 
                  selectedCoin={selectedCoin}
                  onSelectCoin={setSelectedCoin}
                />
              </motion.div>
            </Box>
            
            {/* Stats Highlights */}
            <Box sx={{ width: { xs: '100%', lg: '33.33%' }, p: 1.5 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
                {[0, 1, 2].map((index) => {
                  if (!filteredCoins[index]) return null;
                  return (
                    <Box sx={{ width: { xs: '100%', sm: '33.33%', lg: '100%' }, p: 1 }} key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                      >
                        <CoinCard coin={filteredCoins[index]} />
                      </motion.div>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            
            {/* Coins List or Grid */}
            <Box sx={{ width: '100%', p: 1.5 }}>
              <Typography variant="h5" component="h2" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
                Top Cryptocurrencies
              </Typography>
              
              {filteredCoins.length === 0 ? (
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 8, 
                  bgcolor: 'backgroundSecondary.main',
                  borderRadius: 2,
                }}>
                  <Typography variant="h6">
                    No cryptocurrencies found matching "{searchTerm}"
                  </Typography>
                  <Button 
                    variant="outlined" 
                    sx={{ mt: 2 }}
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>
                </Box>
              ) : view === 'list' ? (
                <CoinTable coins={filteredCoins} />
              ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
                  {filteredCoins.map((coin) => (
                    <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, p: 1 }} key={coin.id}>
                      <CoinCard coin={coin} />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Container>
      
  
    </Box>
  );
};

export default Dashboard;