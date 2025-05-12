import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Button,
  Divider,
  IconButton,
  Link
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LinkIcon from '@mui/icons-material/Link';
import { Coin } from '../../types/crypto';
import { formatCurrency, formatLargeNumber } from '../../utils/formatters';
import PriceChart from '../charts/PriceChart';

interface CoinDetailsModalProps {
  coin: Coin | null;
  onClose: () => void;
  coins: Coin[];
}

const CoinDetailsModal: React.FC<CoinDetailsModalProps> = ({ 
  coin, 
  onClose, 
  coins 
}) => {
  if (!coin) return null;

  const priceChange = coin.price_change_percentage_24h;
  const isPositive = priceChange >= 0;

  const renderStatRow = (label: string, value: string | number, color?: string) => (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      py: 1
    }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography 
        variant="body2" 
        fontWeight={500} 
        color={color}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Dialog 
      open={!!coin} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={coin.image} 
            alt={coin.name}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h6">{coin.name}</Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ textTransform: 'uppercase' }}
            >
              {coin.symbol}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* Price and Change Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {formatCurrency(coin.current_price)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            <Typography variant="body2" color="text.secondary">
              24h Change
            </Typography>
          </Box>
        </Box>

        {/* Price Chart */}
        <Box sx={{ mb: 3 }}>
          <PriceChart
            coins={coins}
            selectedCoinId={coin.id}
            onSelectCoin={() => {}}
            height={300}
          />
        </Box>

        {/* Coin Statistics */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Market Statistics
          </Typography>
          
          {renderStatRow('Market Cap', `$${formatLargeNumber(coin.market_cap)}`)}
          <Divider />
          
          {renderStatRow('24h Trading Volume', `$${formatLargeNumber(coin.total_volume)}`)}
          <Divider />
          
          {renderStatRow('Circulating Supply', 
            `${formatLargeNumber(coin.circulating_supply)} ${coin.symbol.toUpperCase()}`)}
          <Divider />
          
          {renderStatRow('All-Time High', 
            formatCurrency(coin.ath), 
            'primary.main'
          )}
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 3
          }}>
            <Link 
              href={`https://www.coingecko.com/en/coins/${coin.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outlined" 
                startIcon={<LinkIcon />}
              >
                View on CoinGecko
              </Button>
            </Link>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CoinDetailsModal;
