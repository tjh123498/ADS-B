export const getBackend = () =>
    process.env.REACT_APP_BACKEND_HOST ?? "127.0.0.1:8000";
