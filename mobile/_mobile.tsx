import React from "react";
import { AppProps } from "next/app";
import { UserProvider } from "./context/UserContext"; // Đảm bảo đường dẫn này chính xác

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
