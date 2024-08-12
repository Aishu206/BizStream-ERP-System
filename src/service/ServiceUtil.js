export const getJwtToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user.jwtToken;
};

export const getOrgId = () => {
  return JSON.parse(localStorage.getItem('orgId'));
};

export const getEmailIdFromLocal = () => {
  return localStorage.getItem('EMAIL_ID') || null;
};

export const setEmailIdToLocal = (data) => {
  if (typeof window !== undefined) {
    if (data) {
      localStorage.setItem('EMAIL_ID', data);
    } else {
      localStorage.removeItem('EMAIL_ID');
    }
  }
};
export const removeEmailIdToLocal = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem('EMAIL_ID');
  }
};

export const setTypeToLocal = (type) => {
  if (typeof window !== undefined) {
    if (type) localStorage.setItem('TYPE', type);
  }
};

export const removeTypeFromLocal = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem('TYPE');
  }
};

export const getTypeFromLocal = () => {
  return localStorage.getItem('TYPE') || null;
};
