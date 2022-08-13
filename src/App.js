import { SWRConfig } from 'swr';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import SnackBar from './components/SnackBar';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
// context api
import GlobalState from './sections/context/GlobalState';
// API Imports
import api from './services/ApiConfig';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <GlobalState>
      <ThemeConfig>
        <SWRConfig
          value={{
            refreshInterval: 3000,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fetcher: (endpoint) => api.get(endpoint).then((res) => res.data)
          }}
        >
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Router />
          <SnackBar />
        </SWRConfig>
      </ThemeConfig>
    </GlobalState>
  );
}
