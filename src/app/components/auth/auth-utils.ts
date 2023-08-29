import sha256 from 'crypto-js/sha256';
import { environment } from 'src/environments/environment';
import { useNavigate } from 'react-router-dom';

export const useLogin = (
  loggedIn: () => void
): ((email: string, password: string) => Promise<void>) => {
  const navigate = useNavigate();
  return (email: string, password: string) =>
    fetch(`${environment.API_URL}/login`, {
      method: 'POST',
      headers: { authorization: generateAuthHeader(email, password) },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          storeToken(response.token);
          loggedIn();
          const deepLink = getDeepLink();
          if (deepLink) {
            return navigate(deepLink);
          }
          navigate('/home');
        }
      })
      .catch((error) => {
        console.log(error);
      });
};

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

// Auth token retrieveal

const AUTH_TOKEN_KEY = 'authToken';
export const storeToken = (token: string) =>
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
export const getToken = () => window.localStorage.getItem(AUTH_TOKEN_KEY);

const deepLinkKey = 'deep-link';
export const storeDeepLink = (link: string) => {
  localStorage.setItem(deepLinkKey, link);
};

export const getDeepLink = () => {
  const deepLink = localStorage.getItem(deepLinkKey);
  localStorage.removeItem(deepLinkKey);
  return deepLink;
};
