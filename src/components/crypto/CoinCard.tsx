import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar,
  Chip
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Coin } from '../../types/crypto';
import { formatCurrency, formatLargeNumber } from '../../utils/formatters';
import { motion } from 'framer-motion';

interface CoinCardProps {
  coin: Coin;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const priceChange = coin.price_change_percentage_24h;
  const isPositive = priceChange >= 0;

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 1.5
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                src={coin.image} 
                alt={coin.name}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="h6" component="div">
                {coin.name}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ textTransform: 'uppercase' }}
              >
                {coin.symbol}
              </Typography>
            </Box>
            <Chip 
              label={`#${coin.market_cap_rank}`}
              size="small"
              variant="outlined"
              sx={{ 
                borderRadius: 1,
                fontSize: '0.7rem', 
                height: 20,
                backgroundColor: 'rgba(109, 90, 205, 0.1)',
                borderColor: 'rgba(109, 90, 205, 0.2)',
              }}
            />
          </Box>

          <Typography variant="h5" component="div" sx={{ mb: 1, fontWeight: 600 }}>
            {formatCurrency(coin.current_price)}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 1.5
          }}>
            <Chip
              icon={isPositive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              label={`${priceChange.toFixed(2)}%`}
              size="small"
              color={isPositive ? "success" : "error"}
              sx={{ 
                fontWeight: 500,
                '& .MuiChip-icon': {
                  marginLeft: '4px',
                }
              }}
            />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ ml: 1 }}
            >
              24h Change
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Market Cap
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                ${formatLargeNumber(coin.market_cap)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                24h Volume
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                ${formatLargeNumber(coin.total_volume)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CoinCard;