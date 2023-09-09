import { Grid } from '@mui/material';
import { Header } from './components/Header';
import { PermissionsList } from './views/PermissionsList';

function App() {
  return (
    <Grid>
      <Header />
      <PermissionsList />
    </Grid>
  );
}

export default App;
