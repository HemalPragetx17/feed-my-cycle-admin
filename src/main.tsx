import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
// Apps
import { CustomerServiceI18nProvider } from './admin/i18n/CustomerServicei18n';
import './admin/assets/sass/style.react.scss';
import 'react-toastify/dist/ReactToastify.css';
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './admin/assets/css/style.rtl.css'
 **/
import './admin/assets/sass/style.scss';
import { AppRoutes } from './app/routing/AppRoutes';
import { AuthProvider } from './app/modules/auth';
import { ToastContainer } from 'react-toastify';
// setupAxios(axios)
const queryClient = new QueryClient();
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <CustomerServiceI18nProvider>
        <AuthProvider>
          <ToastContainer />
          <AppRoutes />
        </AuthProvider>
      </CustomerServiceI18nProvider>
    </QueryClientProvider>
  );
}
