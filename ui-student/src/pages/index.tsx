import { Box, Paper, Typography } from '@mui/material';
import { useAuth } from '../auth/useAuth';

export default function HomeRoute() {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant='h3' component='h1' gutterBottom>
        Home
      </Typography>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant='body1' gutterBottom>
          Welcome to the Senior Project base application.
        </Typography>
        {user && (
          <Typography variant='body2' color='text.secondary'>
            Signed in as {String(user.username ?? user.firstName ?? 'user')}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
