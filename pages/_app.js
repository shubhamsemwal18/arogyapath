import { Provider } from 'react-redux';
import Store from '../store';
import '../css/globals.css'
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.css'
import { ToastProvider } from 'react-toast-notifications';

function App({ Component, pageProps }) {

  return <>
  
  <Script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
crossorigin="anonymous"/>

  <Provider store={Store}>
  <ToastProvider autoDismiss={true} autoDismissTimeout="4000" placement = "bottom-right">
    <Component {...pageProps} />
  </ToastProvider>
  </Provider>
  </>;
}

export default App
