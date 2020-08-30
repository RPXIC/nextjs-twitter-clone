import { AppLayout } from "components"

const App = ({ Component, pageProps }) => {
  return (
    <>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}

export default App
