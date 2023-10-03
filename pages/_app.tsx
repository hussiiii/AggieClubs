//_app.tsx: this is the 'starting point' of the app, i think like main() function in programming but for apps

// make sure that all the Tailwind classes are available across all pages of the app
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />; //render the current component (page) with any prop it may have (argument) 
}

export default MyApp;
