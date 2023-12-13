export default function Die(prop){
    
    const styles ={ 
        backgroundColor:prop.isHeld ? "#59E391" : "white" }
    return(
    
        <div 
        className="die__face" 
        onClick={prop.holdDice}
         style = {styles}>
            
        <h2 className="die-num">
             {prop.value}</h2>
        </div>
      
       
     
    )
    }