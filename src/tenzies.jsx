import React from "react"
import Die from  "./die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function Tenzies(){
const [diceNum , setDiceNum] = React.useState(allNewDice())
const [tenzies , setTenzies] = React.useState(false)
const  [seconds , setSeconds] = React.useState(0)
 const [minute , setMinute ] = React.useState(0)
 const  [trackCount , setTrackCount]= React.useState(false)

 
React.useEffect(function(){
   const allHeld = diceNum.every(die =>die.isHeld)
   const firstValue = diceNum[0].value
   const allSameValue = diceNum.every(die => die.value === firstValue)
if(allHeld && allSameValue){
    setTenzies(true)
 
}
},  [diceNum])






React.useEffect(
    function() {
   const interval = setInterval(()=>{
    setMinute(minute +1)
    
   },60000)
   if (tenzies) {
    setMinute(minute === 0)   
   }
   return()=> {
    if (!tenzies) {
        console.log(minute)
        clearInterval(interval)  
    }
   }
    },[minute,tenzies])

    React.useEffect(
       function() {
       const interval = setInterval(()=>{
        setSeconds(seconds +1)
        setTrackCount(true)
       },1000)
       if (tenzies) {
        setSeconds(seconds === 0)   
       }
       return()=> clearInterval(interval)
        },[seconds,tenzies])
 

        React.useEffect(function() {
            if (seconds > 60 && trackCount) {
                setTrackCount(true)
                setSeconds(seconds === 0)  
            }
            
        },[seconds])



const diceValue = diceNum.map(die =>  <Die 
    value ={die.value} 
    key = {die.id}
id = {die.id}
    isHeld = {die.isHeld}
     holdDice={() => holdDice(die.id)} />  
    //  take note hold state above
)

function generateNewDie(){
    return{value:Math.ceil(Math.random()* 6),
        isHeld:false,
        id:nanoid()}
}

     function allNewDice(){ 
 const diceArray = []
 for (let i = 0; i < 10; i++) {
    diceArray.push(generateNewDie())
 }
 return diceArray
    }


 function rollDice(){ 
    if(!tenzies){ 
        setDiceNum(prevState => prevState.map(die => {
            return (die.isHeld ? 
              die :
               generateNewDie())
          }))
    }else{ 
setTenzies(false)
setDiceNum(allNewDice())
 }
 }

 function holdDice(id){
  return setDiceNum(prevDice => prevDice.map(dice =>{
    return dice.id === id ? 
    {...dice, isHeld: !dice.isHeld} :
    dice
  }))
 
 }

  
    return(
        <main className="tenzies__main">
       {tenzies && <Confetti />}
            <h1 className="title">Tenzies </h1>
            <div className="timer">
              <span>Time</span> { minute}m:{seconds}s
            </div>
<div className="container">
{ diceValue}
</div>
<button 
className="roll__dice"
 onClick={rollDice}>
     {!tenzies ? "Roll" : "New game"}</button>
        </main>
    )
}















