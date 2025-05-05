import { useState, useEffect } from 'react';
import axios from 'axios';
import { Coin } from '../types/crypto';

interface UseCryptoDataReturn {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useCryptoData = (): UseCryptoDataReturn => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<Coin[]>(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false,
            price_change_percentage: '24h',
          },
        }
      );
      
      setCoins(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch cryptocurrency data. Please try again later.');
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh every 60 seconds
    const intervalId = setInterval(fetchData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return { coins, loading, error, refetch: fetchData };
};

export default useCryptoData;