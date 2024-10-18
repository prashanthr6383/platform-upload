import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { defineCustomElements } from "@trimble-oss/modus-web-components/loader";
import Form from "./Form/form";

function App() {
  useEffect(() => {
    defineCustomElements();
  }, []);

  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
