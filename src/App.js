import { ContextProvider } from "./context/Context";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

function App() {
    return (
        <div className="App">
            <ContextProvider>
                <Header />
                <Main />
                <Footer />
            </ContextProvider>
        </div>
    );
}

export default App;
