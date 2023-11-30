import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";
import MainMenu from "./components/Menu";
import { Footer } from "./components/Footer";
import "./style/Index.css";
import { Page } from "./components/Page";

export function App() {
   return (
      <>
         <MainMenu />
         <Page>
            <BrowserRouter>
               <Router />
            </BrowserRouter>
         </Page>
         <Footer />
      </>
   );
}
