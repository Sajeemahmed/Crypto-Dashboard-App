import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Box, 
  Avatar,
  Typography,
  TableSortLabel,
  Chip
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Coin } from '../../types/crypto';
import { formatCurrency, formatLargeNumber } from '../../utils/formatters';
import { motion } from 'framer-motion';

interface CoinTableProps {
  coins: Coin[];
}

type SortKey = 'market_cap_rank' | 'current_price' | 'price_change_percentage_24h' | 'market_cap';
type SortDirection = 'asc' | 'desc';

const CoinTable: React.FC<CoinTableProps> = ({ coins }) => {
  const [sortConfig, setSortConfig] = React.useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: 'market_cap_rank',
    direction: 'asc',
  });

  const sortedCoins = React.useMemo(() => {
    const sortableCoins = [...coins];
    sortableCoins.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableCoins;
  }, [coins, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
          bgcolor: 'background.paper',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="cryptocurrency table">
          <TableHead sx={{ bgcolor: 'backgroundSecondary.main' }}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'market_cap_rank'}
                  direction={sortConfig.key === 'market_cap_rank' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('market_cap_rank')}
                >
                  #
                </TableSortLabel>
              </TableCell>
              <TableCell>Coin</TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortConfig.key === 'current_price'}
                  direction={sortConfig.key === 'current_price' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('current_price')}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortConfig.key === 'price_change_percentage_24h'}
                  direction={sortConfig.key === 'price_change_percentage_24h' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('price_change_percentage_24h')}
                >
                  24h Change
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortConfig.key === 'market_cap'}
                  direction={sortConfig.key === 'market_cap' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('market_cap')}
                >
                  Market Cap
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCoins.map((coin) => {
              const priceChange = coin.price_change_percentage_24h;
              const isPositive = priceChange >= 0;
              
              return (
                <TableRow
                  key={coin.id}
                  sx={{ 
                    '&:hover': { 
                      bgcolor: 'backgroundSecondary.light',
                      transition: 'background-color 0.2s'
                    },
                    cursor: 'pointer',
                  }}
                  component={motion.tr}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.1 }}
                >
                  <TableCell>{coin.market_cap_rank}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar 
                        src={coin.image} 
                        alt={coin.name}
                        sx={{ width: 24, height: 24 }}
                      />
                      <Typography fontWeight={500}>{coin.name}</Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ textTransform: 'uppercase' }}
                      >
                        {coin.symbol}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(coin.current_price)}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {isPositive ? (
                        <ArrowDropUpIcon sx={{ color: 'success.main' }} />
                      ) : (
                        <ArrowDropDownIcon sx={{ color: 'error.main' }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: isPositive ? 'success.main' : 'error.main',
                          fontWeight: 500
                        }}
                      >
                        {priceChange.toFixed(2)}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    ${formatLargeNumber(coin.market_cap)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default CoinTable;