import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "firebaseui/dist/firebaseui.css";
import { AuthProvider } from "../components/auth/useAuth";
import "../styles/global.scss";

config.autoAddCss = false;

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
