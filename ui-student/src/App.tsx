import { ApolloProvider } from '@apollo/client/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { apolloClient } from './lib/apollo-client';
import { theme } from './theme';

import RootLayout from './pages/_layout';
import Home from './pages/index';
import Login from './pages/login';
import NotFound from './pages/not-found';
import StyleGuide from './pages/style-guide';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='style-guide' element={<StyleGuide />} />
            <Route path='login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ApolloProvider>
  );
}
