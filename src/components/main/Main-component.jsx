import "./mainComponent.css";


const MainComponent = ({bkColor, isScrolling}) =>{
    /*TODO: Fare in modo che in base al meteo (o se è giorno o notte) cambi il colore dello sfondo seguendo quello del mockop */
    return(
            <div id="mainComponent" className={`${bkColor} ${isScrolling ? "isScrolling" : "isNotScrolling"}`} >
                <div id="ContainerBackground">
                </div> 
            </div> 
    )
}

export default MainComponent;