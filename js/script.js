// <<<<<<<<<<<<<<   IMPORTANDO O DOM     >>>>>>>>>>>>>>

let minutes = document.querySelector("#minutes")
let seconds = document.querySelector("#seconds")
const start = document.querySelector("#start")
const reset = document.querySelector("#reset")
const coffeeContainer = document.querySelector(".coffee-container")
const coffeeLogo = document.querySelector("#coffee")
const coffeeBlack = document.querySelector(".coffee-black")
let inputMin = document.querySelector("#input-minutes")
const textDate = document.querySelector(".date")

// <<<<<<<<<<<<<<   VARIAVEIS     >>>>>>>>>>>>>>

let min = 10
let sec = 0
let timer = null
let running = false
let data = new Date()
let dia = String(data.getDate()).padStart(2,0)
let mes = String(data.getMonth() + 1).padStart(2,0)
let ano = data.getFullYear()

// <<<<<<<<<<<<<<   MANIPULANDO TEXTOS     >>>>>>>>>>>>>>

minutes.innerText = min
seconds.innerText = sec
textDate.innerText = `${dia}/${mes}/${ano}`

// <<<<<<<<<<<<<<   EVENT LISTENERS     >>>>>>>>>>>>>>
// -------EVENTO TECLA ENTER
inputMin.addEventListener("keydown", (event)=>{
    if(event.key === "Enter" && inputMin.value != ""){
      
        min = inputMin.value
        minutes.innerText = min
        inputMin.value = ""
        running = false
        zero()

        if(min != 0){
        coffeeContainer.style.animationDuration = (min * 60 - 1) + "s"
        coffeeLogo.style.animationDelay = (min * 60 - 1) + "s"
        zero()
        }
    }
})

// -------EVENTO BOTÃO START / STOP

start.addEventListener("click",()=>{
    
    flip()
    if(running){
// -------CLICANDO START

        start.innerText = "Parar Contagem Regressiva"
        start.style.backgroundColor = "#baba10"

        coffeeContainer.style.animationName = "fade"
        coffeeContainer.style.animationPlayState = "running"
        coffeeLogo.style.animationPlayState = "running"
        
        inputMin.style.display = "none"
        
        timer = setInterval(startWatch,1000)

    }else if(!running && (min != 0 || sec != 0)){
        // -------CLICANDO STOP
        start.innerText = "Continuar Contagem Regressiva"
        start.style.backgroundColor = "green"
        
        coffeeContainer.style.animationPlayState = "paused"
        coffeeLogo.style.animationPlayState = "paused"
        
        clearInterval(timer)
    }
})

//--------EVENTO RESET

reset.addEventListener("click", ()=>{
    document.location.reload()
})
// <<<<<<<<<<<<<<   EVENT LISTENERS     >>>>>>>>>>>>>>
//--------FUNÇÃO PARAR O TIMER

function stopTimer(){
    running = false
    clearInterval(timer)
}

//--------FUNÇÃO TROCAR O RUNNING

function flip(){
    if(min != 0 || sec != 0){
        running = running? false : true
    }
}

//--------FUNÇÃO ZERO A ESQUERDA

function zero(){
    if(sec >= 0 && sec < 10){
        seconds.innerText = "0" + sec
    }
    if(min >= 0 && min < 10){
        minutes.innerText = "0" + min
    }
}

//--------FUNÇÃO COMEÇAR O TIMER

function startWatch(){    
    if(sec >= -1 && sec <= 60){
        seconds.innerText = --sec
    }
    zero()
    
    if(sec == -1 ){
        sec = 59
        seconds.innerText = sec
        minutes.innerText = --min
        zero()
    }
    
    if(sec == 0 && min == 0){
        
        coffeeBlack.style.display = "none"
        
        flip()
        stopTimer()
     }        
}
zero()







