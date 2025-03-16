import { useState } from "react";
import "./App.css";
import CardComponent from "./components/card/CardComponent";
import MainComponent from "./components/main/Main-component";
import NavbarComponet from "./components/navbarComponent/NavbarComponent";

function App() {
const [BKC,setBKC] = useState("sunny");

const handleSetBKColor = (value) => {
	setBKC(value);
}


	return (
		<>
			<NavbarComponet/>
			<CardComponent setBKColor={handleSetBKColor}/>	
			<MainComponent bkColor={BKC}/>
		</>	
	) 
}

export default App;
