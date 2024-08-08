import { StatusBar } from 'expo-status-bar'
import { PaperProvider } from 'react-native-paper'
import { theme } from './config/theme'
import { Navigation } from './components/Navigation'

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </>
  )
}
