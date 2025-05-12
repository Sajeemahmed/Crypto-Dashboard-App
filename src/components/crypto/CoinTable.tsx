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
  useMediaQuery,
  useTheme,
  Collapse,
  IconButton,
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Coin } from '../../types/crypto';
import { formatCurrency, formatLargeNumber } from '../../utils/formatters';
import { motion } from 'framer-motion';

interface CoinTableProps {
  coins: Coin[];
  onSelectCoin?: (coinId: string) => void;
}

type SortKey = 'market_cap_rank' | 'current_price' | 'price_change_percentage_24h' | 'market_cap';
type SortDirection = 'asc' | 'desc';

const CoinTable: React.FC<CoinTableProps> = ({ coins, onSelectCoin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [sortConfig, setSortConfig] = React.useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: 'market_cap_rank',
    direction: 'asc',
  });
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null);

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

  const handleRowExpand = (coinId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedRow(expandedRow === coinId ? null : coinId);
  };

  const renderTableHeader = () => (
    <TableHead>
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
        <TableCell>Name</TableCell>
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
            24h %
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
  );

  const renderRow = (coin: Coin) => {
    const priceChange = coin.price_change_percentage_24h;
    const isPositive = priceChange >= 0;

    return (
      <TableRow
        key={coin.id}
        sx={{ '&:hover': { bgcolor: 'backgroundSecondary.light' }, cursor: 'pointer' }}
        component={motion.tr}
        whileHover={{ scale: 1.01 }}
        onClick={() => onSelectCoin?.(coin.id)}
      >
        <TableCell>{coin.market_cap_rank}</TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={coin.image} alt={coin.name} sx={{ width: 24, height: 24 }} />
            <Typography fontWeight={500}>{coin.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{coin.symbol}</Typography>
          </Box>
        </TableCell>
        <TableCell align="right">{formatCurrency(coin.current_price)}</TableCell>
        <TableCell align="right">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {isPositive ? <ArrowDropUpIcon sx={{ color: 'success.main' }} /> : <ArrowDropDownIcon sx={{ color: 'error.main' }} />}
            <Typography variant="body2" sx={{ color: isPositive ? 'success.main' : 'error.main', fontWeight: 500 }}>{priceChange.toFixed(2)}%</Typography>
          </Box>
        </TableCell>
        <TableCell align="right">${formatLargeNumber(coin.market_cap)}</TableCell>
      </TableRow>
    );
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        {renderTableHeader()}
        <TableBody>
          {sortedCoins.map((coin) => renderRow(coin))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoinTable;
