//variables
let randSequence=[]
let userSequence=[]
let maxSeqItems=1   //this is where game begins, gets incremented in levelUp function
let maxArrItems=4   //will increment this at heigher levels to introduce more colors/circles
let currentLevel=1
let currentScore=0
let points=5
const lights=document.querySelector(".lights")
const lightsArr=document.querySelectorAll(".lights div")
const light1=document.querySelector(".light1")
const light2=document.querySelector(".light2")
const light3=document.querySelector(".light3")
const light4=document.querySelector(".light4")
let light5=''
const colorOrder=[light1,light2,light3,light4]
const level=document.querySelector('.level')
const buttons=document.querySelector(".user-buttons")
const buttonsArr=document.querySelectorAll(".user-buttons p")
let gameCountdown=4
const clock=document.querySelector(".clock")
const confirm=document.querySelector(".confirm")
let score=document.querySelector(".score")
const gamePage=document.querySelector(".game-page")
const entryPage=document.querySelector(".entry-page")
const modeButton=document.querySelector(".mode")
let mode="summer"

//TIMER





//functions
const addDivs=()=>{
   const addLight=document.createElement('div')
   const addButton=document.createElement('p')
   addLight.setAttribute("class","light5")
   addButton.setAttribute("class","button5 zoom")
   addButton.setAttribute("id","5")
   addButton.innerText="."
   lights.append(addLight)
   buttons.append(addButton)
   light5=document.querySelector(".light5")
   colorOrder.push(light5)
}

 
const flashOff=(seq)=>{
  for(let i=0;i<(seq.length-1);i++){
     if((seq[i]).style.animation!=''){
     seq[i].style.animation=''}
   else {
  }
}
}
const setBlink=(seq)=>{

//   for(let i=0;i<seq.length;i++){
//     if((seq[i]).style.animation!=''){
//     seq[i].style.animation=''}
//   else {
//  }
// }
  //have a class that applies visual queues to circle that mimics a flash
    // for(let i=0;i<seq.length;i++){
    //   setTimeout(flashOn(seq),1000)
    // 
  //   for(let i=0;i<seq.length;i++){
      
  //     setTimeout(function(test){
  //       seq[i].style.animation="blink 3s"
  //   },i*1000)
  //       seq[i].style.animation=""

    for(let i=0;i<seq.length;i++){
      // if (seq[i].style.animation!=""){
      //   seq[i].style.animation=""
      // }
      setTimeout(function(){
        seq[i].style.animation=""},i*900);
      setTimeout(function(){
          seq[i].style.animation="blink 0.5s"
        },i*1000)
    }
  
  };



    //this kind of works?
    // for(let i=0;i<seq.length;i++){
    
    //   setTimeout(function(){
    //   setTimeout(function(){
    //   seq[i].style.animation="blink 2s"
    // },i*1000)
    //   seq[i].style.animation=""},i*900)}
      
    // };
     
//maps color sequence to array of numbers
const mapSequence=(numSeq)=>{
  let colorSequence=numSeq.map((number)=>{
    return colorOrder[number-1]
    return colorSequence;
  })
  console.log(colorSequence)
  setBlink(colorSequence)
  
}

  //generate number between 1 and number of Seq items in current level
 const generateSequence=(max)=>{
    let randNumber=0;
    for(i=1;i<=max;i++){
      randNumber=Math.floor(Math.random()*maxArrItems)+1
      randSequence.push(randNumber)
  }
  console.log(randSequence)
  mapSequence(randSequence)
 }


const incrementScore=()=>{
   currentScore+=10;
   score.innerText=`SCORE: ${currentScore}`
  // if (currentLevel>=7) {
  //   points=10;
  //   currentScore+=points
  // } else {
  //   currentScore+=points
  }
  



 const levelUp=()=>{
  maxSeqItems++;
  console.log(maxSeqItems)
  randSequence=[]
  userSequence=[]
  setTimeout(function(){
    document.querySelector(".over").innerText="";
  } , 2000)
  setTimeout(function(){
    generateSequence(maxSeqItems);
  },2500)
  if (currentLevel==7){
    maxArrItems++;
    addDivs()
    maxSeqItems-=3;
    
  }
  flashOff(colorOrder)
}

//handle user choices, check against random array 

 const compareSequences=(userArr,randArr)=>{
  setTimeout(function(){confirm.innerText=""},500)
  for(let i=0;i<userArr.length;i++){
    if (userArr[i] != randArr[i]) {
      document.querySelector(".over").classList.add("next")
      document.querySelector(".Y").classList.replace("YNOFF","YNON")
      document.querySelector(".N").classList.replace("YNOFF","YNON")
      document.querySelector(".over").innerText="GAME OVER \n PLAY AGAIN?"
    }
  } 
  if ((userArr[i] == randArr[i]) && userArr.length==randArr.length){
     if(currentLevel===6){
      currentLevel++;
      document.querySelector(".over").classList.add("next")
      document.querySelector(".over").innerText=`LEVEL ${currentLevel}`
      document.querySelector(".over").innerText=`NEW COLOR ADDED`
      levelUp()
     } else {
      currentLevel++;
      document.querySelector(".over").classList.add("next")
      document.querySelector(".over").innerText=`LEVEL ${currentLevel}`
      level.innerText=`LEVEL ${currentLevel}`
      levelUp()
     }
  }
    
  
}
 



//

const toggleMode=()=>{
  if (mode==="fall"){
  for(let i=0;i<lightsArr.length;i++){
    lightsArr[i].classList.replace(`light${i+1}fall`,`light${i+1}`)
  }
  for(let i=0;i<buttonsArr.length;i++){
    buttonsArr[i].classList.replace(`button${i+1}fall`,`button${i+1}`)
  }
  gamePage.classList.replace("game-page-fall","game-page-summer")
  mode="summer"
  } else if (mode==="summer"){
    for(let i=0;i<lightsArr.length;i++){
      lightsArr[i].classList.replace(`light${i+1}`,`light${i+1}fall`)
    }
    for(let i=0;i<buttonsArr.length;i++){
      buttonsArr[i].classList.replace(`button${i+1}`,`button${i+1}fall`)
    }
    gamePage.classList.replace("game-page-summer","game-page-fall")
    mode="fall"
  }
}



//event listeners

const modeListener=()=>{
  modeButton.addEventListener("click",toggleMode)
  //document.querySelector(".mode-entry").addEventListener("click",toggleMode)
}


const buttonListener=()=>{
  buttons.addEventListener('click',function(e){
   let tempSequence=userSequence.push(parseInt(e.target.id))
   console.log(e)
   confirm.innerText=`GREAT`
   incrementScore()
   tempSequence=userSequence
   console.log(userSequence)
   compareSequences(userSequence,randSequence)
  })
   
}
 


const goEventListener = ()=>{
  level.addEventListener('click',function(){
    generateSequence(maxSeqItems)
  })
}

//TIMERS


const countdown = () => {
  if(gameCountdown>1){
    gameCountdown--;
      clock.classList.add("next")
      clock.innerText = `BEGIN IN ${gameCountdown}`}
      else {
        clearInterval(leadInTimer)
        clock.classList.remove("next")
        clock.innerText=''
      }
}
const leadInTimer=()=>{ setInterval(countdown, 1000)}
const goAhead=(arg1)=>{setTimeout(generateSequence,4300,maxSeqItems)}


//EXECUTE

modeListener()
leadInTimer()
goAhead()
goEventListener()
buttonListener()


