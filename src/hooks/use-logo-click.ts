import { useNavigate } from 'react-router-dom';

const useLogoClick = (accessToken: string | null): (() => void) => {
  const navigate = useNavigate();
  return () => navigate(accessToken ? '/dashboard' : '/');
};

export default useLogoClick;
