import "./mainComponent.css";


const MainComponent = (props) =>{
    /*TODO: Fare in modo che in base al meteo (o se è giorno o notte) cambi il colore dello sfondo seguendo quello del mockop */
    return(
    <div id="mainComponent" className={props.bkColor}>
           <div></div> 
       </div> 
    )
}

export default MainComponent;