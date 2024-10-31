import "./App.css";
import ImageUploader from "./components/ImageUploader";
import { StyledBackground } from "./components/style/styled";

function App() {
  return (
    <StyledBackground>
      <ImageUploader />
    </StyledBackground>
  );
}

export default App;
