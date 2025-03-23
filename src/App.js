import { useState } from "react";
import "./App.css";
import CardComponent from "./components/card/CardComponent";
import MainComponent from "./components/main/Main-component";
import NavbarComponet from "./components/navbarComponent/NavbarComponent";

function App() {
const [BKC,setBKC] = useState("sunny");
const [isScrollingDown, setIsScrollingDown] = useState(false);

const handleSetBKColor = (value) => {
	setBKC(value);
}

const handleSetIsScrolling = (value) =>{
	setIsScrollingDown(value);
}


	return (
		<>
			<NavbarComponet/>
			<CardComponent setBKColor={handleSetBKColor} handleScrolling={handleSetIsScrolling} isScrolling={isScrollingDown}/>	
			<MainComponent bkColor={BKC} isScrolling={isScrollingDown}/>
		</>	
	) 
}

export default App;
