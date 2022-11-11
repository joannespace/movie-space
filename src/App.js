import "./App.css";
import { AuthProvider } from "./contexts/AuthProvider";
import { DataProvider } from "./contexts/DataProvider";
import ThemeProvider from "./contexts/ThemProvider";
import Router from "./routes/Router";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
