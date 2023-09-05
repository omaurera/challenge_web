import { Grid } from '@mui/material';
import React from 'react';
import { Header } from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PermissionsList } from './views/PermissionsList';
import { PermisionActions } from './views/PermisionActions';

function App() {
  return (
    <Grid>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PermissionsList />} />
          <Route path='/action' element={<PermisionActions />} />
        </Routes>
      </BrowserRouter>
    </Grid>
  );
}

export default App;
