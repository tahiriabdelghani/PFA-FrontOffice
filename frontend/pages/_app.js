import '../styles/globals.css'
import { wrapper, store } from '../store/store'
import { Provider } from 'react-redux'
import NavBar from '../components/navbar/NavBar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
