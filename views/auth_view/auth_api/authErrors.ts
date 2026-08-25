export interface AuthErrorContent {
  title: string;
  message: string;
}

const DEFAULT_ERROR: AuthErrorContent = {
  title: "Something went wrong",
  message: "Please try again in a moment.",
};

export function getAuthErrorContent(error: any): AuthErrorContent {
  const status = error?.response?.status;
  const serverMessage: string | undefined =
    error?.response?.data?.message ?? error?.response?.data?.error;
  const serverMessageObj: AuthErrorContent | undefined =
    error?.response?.data?.message ?? error?.response?.data?.error;
  console.log(error?.response?.data);

  if (serverMessageObj) {
    return {
      title: serverMessageObj.title,
      message: serverMessageObj.message,
    };
  }

  if (status === 401) {
    return {
      title: "Invalid Credentials",
      message:
        serverMessage ??
        "The email or password you entered is incorrect. Please check and try again.",
    };
  }

  if (status === 409) {
    return {
      title: "Email Already in Use",
      message:
        serverMessage ??
        "An account with this email already exists. Try signing in instead.",
    };
  }

  if (!error?.response) {
    return {
      title: "Connection Error",
      message:
        "Couldn't reach the server. Check your internet connection and try again.",
    };
  }

  return serverMessage
    ? { title: "Something went wrong", message: serverMessage }
    : DEFAULT_ERROR;
}
