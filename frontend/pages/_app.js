import '@/styles/globals.css'; // Global styles
import Header from '../components/Header'; // Header component
import { wrapper } from '@/app/store'; // Redux wrapper from store configuration

// Main App component
function App({ Component, ...rest }) {
  // Destructure store and props using the wrapper
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <div className="container">
      <Header /> {/* Header component */}
      <Component {...props.pageProps} /> {/* Main page content */}
    </div>
  );
}

// Export the app wrapped with Redux
export default wrapper.withRedux(App);
