
import { ContextProvider } from "./context/Context";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Header />
        <Main />
      </ContextProvider>
    </div>
  );
}

export default App;
