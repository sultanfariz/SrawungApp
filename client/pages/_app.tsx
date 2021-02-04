import { AppProps } from 'next/app';
import '../assets/app.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
