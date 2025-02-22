import "./mainComponent.css";


const MainComponent = () =>{
    /*TODO: Fare in modo che in base al meteo (o se è giorno o notte) cambi il colore dello sfondo seguendo quello del mockop */
    let bkColor = "sunny"
    return(
    <div id="mainComponent" className={bkColor}>
           <div></div> 
       </div> 
    )
}

export default MainComponent;