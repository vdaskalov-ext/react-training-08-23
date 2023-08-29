import sha256 from 'crypto-js/sha256';
import { environment } from 'src/environments/environment';
import { useNavigate } from 'react-router-dom';

type RegisterHookReturnType = (
  email: string,
  password: string
) => Promise<void>;
export const useRegister = (): RegisterHookReturnType => {
  const navigate = useNavigate();
  return (email: string, password: string) => {
    return fetch(`${environment.API_URL}/register`, {
      method: 'POST',
      headers: {
        authorization: generateAuthHeader(email, password),
      },
    })
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const generateAuthHeader = (email: string, password: string) =>
  `Basic ${email}:${sha256(password)}`;

const deepLinkKey = 'deep-link';
export const storeDeepLink = (link: string) => {
  localStorage.setItem(deepLinkKey, link);
};

export const getDeepLink = () => {
  const deepLink = localStorage.getItem(deepLinkKey);
  localStorage.removeItem(deepLinkKey);
  return deepLink;
};
