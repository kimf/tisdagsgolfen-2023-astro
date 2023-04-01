import { AuthProvider } from '../contexts/AuthProvider';
import { AppProvider } from '../contexts/AppProvider';
import Link from './ActiveSession/Link';

const ActiveSession = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Link />
      </AppProvider>
    </AuthProvider>
  );
};

export default ActiveSession;
