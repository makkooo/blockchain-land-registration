import '../styles/globals.css'

/**
 * React App.
 * 
 * @param   {Component} Component React Component
 * @param   {Props}     pageProps React props
 * @returns App         Returns React App  
 */
function MyApp({Component, pageProps}) {

  const Layout = Component.Layout

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
