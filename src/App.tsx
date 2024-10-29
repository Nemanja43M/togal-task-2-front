import "./App.css";
import ImageUploader from "./components/ImageUploader";
import { Sidebar } from "./components/SideBar";
import { StyledBackground } from "./components/style/styled";

function App() {
  return (
    <StyledBackground>
      <Sidebar />
      <ImageUploader />
    </StyledBackground>
  );
}

export default App;
