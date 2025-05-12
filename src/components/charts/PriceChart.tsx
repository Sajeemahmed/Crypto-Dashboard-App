import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  ButtonGroup,
  Button
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Coin } from '../../types/crypto';
import { formatCurrency } from '../../utils/formatters';

interface PriceChartProps {
  coins: Coin[];
  selectedCoinId?: string;
  onSelectCoin: (coinId: string) => void;
  height?: number; // ✅ added height as optional
}


const PriceChart: React.FC<PriceChartProps> = ({
  coins,
  selectedCoinId = 'bitcoin',
  onSelectCoin
}) => {
  const theme = useTheme();
  const selectedCoinData = coins.find(coin => coin.id === selectedCoinId);

  if (!selectedCoinData) {
    return <Typography sx={{ p: 2 }}>No data available for the selected coin.</Typography>;
  }

  // Generate fake chart data
  const generateMockChartData = () => {
    const basePrice = selectedCoinData.current_price;
    const priceChange = selectedCoinData.price_change_24h || 0;
    const direction = priceChange >= 0 ? 1 : -1;
    const volatility = Math.abs(priceChange) / basePrice * 0.5;
    const now = new Date();
    const data = [];

    for (let i = 24; i >= 0; i--) {
      const time = new Date(now);
      time.setHours(now.getHours() - i);
      const randomFactor = ((Math.random() - 0.5) * volatility * basePrice);
      const trendFactor = direction * (1 - (i / 24)) * Math.abs(priceChange);
      const price = basePrice - priceChange + trendFactor + randomFactor;
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: price,
      });
    }

    return data;
  };

  const chartData = generateMockChartData();
  const topCoins = coins.slice(0, 5);

  const getLineColor = () => {
    return selectedCoinData.price_change_percentage_24h >= 0
      ? theme.palette.success.main
      : theme.palette.error.main;
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Price Chart (24h)</Typography>
          <Typography variant="subtitle1" fontWeight={500}>
            {selectedCoinData.name}: {formatCurrency(selectedCoinData.current_price)}
          </Typography>
        </Box>

        <ButtonGroup
          variant="outlined"
          size="small"
          sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
        >
          {topCoins.map((coin) => (
            <Button
              key={coin.id}
              onClick={() => onSelectCoin(coin.id)}
              variant={selectedCoinId === coin.id ? 'contained' : 'outlined'}
            >
              {coin.name}
            </Button>
          ))}
        </ButtonGroup>

        <Box sx={{ flexGrow: 1, width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
              <XAxis dataKey="time" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
              <YAxis
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                domain={['auto', 'auto']}
                tickFormatter={(value) =>
                  `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                }
              />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                  "Price",
                ]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={getLineColor()}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: getLineColor(),
                  strokeWidth: 1,
                  fill: getLineColor(),
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
