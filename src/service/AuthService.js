export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    if (data) {
      localStorage.setItem('JWT_TOKEN', JSON.stringify(data.jwtToken));
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('orgId', JSON.stringify(data.orgId));
    } else {
      localStorage.removeItem('JWT_TOKEN');
      localStorage.removeItem('user');
    }

    next();
  }
};

export const logoutUser = () => {
  if (localStorage.getItem('JWT_TOKEN')) localStorage.removeItem('JWT_TOKEN');
  if (localStorage.getItem('user')) localStorage.removeItem('user');
  if (localStorage.getItem('orgId')) localStorage.removeItem('orgId');
};

export const isAuthenticated = () => {
  return typeof !window === undefined
    ? false
    : localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : false;
};

export const getUser = () => {
  return typeof window === undefined
    ? false
    : localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : false;
};
