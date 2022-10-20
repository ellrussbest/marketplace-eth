import "@styles/globals.css";

// function Noop({ children }) {
//   return <>{children}</>;
// }

function MyApp({ Component, pageProps }) {
  // if Component.Layout is undefined, assign Noop component
  // const Layout = Component.Layout ?? Noop;

  // return (
  //   <Layout>
  //     <Component {...pageProps} />
  //   </Layout>
  // );
  return <Component {...pageProps} />;
}

export default MyApp;
