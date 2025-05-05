import React from 'react';
import { 
  Alert, 
  AlertTitle, 
  Button, 
  Box 
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onRetry }) => {
  return (
    <Box sx={{ width: '100%', mt: 3, mb: 3 }}>
      <Alert 
        severity="error" 
        variant="filled"
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(255, 77, 106, 0.2)'
        }}
      >
        <AlertTitle>Error</AlertTitle>
        {message}
        {onRetry && (
          <Button
            color="inherit"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            sx={{ mt: 1 }}
          >
            Retry
          </Button>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;