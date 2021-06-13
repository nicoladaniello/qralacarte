import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "firebaseui/dist/firebaseui.css";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import store from "../store";
import "../styles/global.scss";

config.autoAddCss = false;

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout title="QRalacarte | Create your digital menu">
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
