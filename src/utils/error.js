export const getErrorText = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400: return 'Sorry, your account information is incorrect';
      default: return null;
    }
  }
  return null;
};

export const getFirstErrorDescr = (error) => {
  if (error?.errorDescr?.length > 0)
    return error.errorDescr[0];

  return 'Something went wrong. Please try again later.';
};
