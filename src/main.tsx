import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import he_IL from "antd/locale/he_IL";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={he_IL}
      theme={{
        token: {
          fontSize: 16,
          colorPrimary: "#0973e7",
          colorInfo: "#0973e7",
          colorSuccess: "#00a88b",
          colorError: "#ff3b30",
          fontFamily: "Assistant Variable",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
