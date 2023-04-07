const userchance = document.querySelector("[userchance]");
const boxes = document.querySelectorAll(".box");
const newgame = document.querySelector(".btn");
let currentPlayer;
let gameGrid;


const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function init_game(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
            box.innerHTML="";
            boxes[index].style.pointerEvents = "all";
            box.classList = `box box${index+1}`;
    });
    newgame.classList.remove("active");
    userchance.innerHTML = `Currrent Player - ${currentPlayer}`;
}
init_game();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
        
    }else{
        currentPlayer="X"
        
    }
    userchance.innerHTML = `Current Player ${currentPlayer}`
}

function checkWin(){
    let answer = "";
    winningPositions.forEach((position) =>{
        if((gameGrid[position[0]]!== "" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")&& 
        (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[2]]===gameGrid[position[1]])){
           if(gameGrid[position[0]]==="X"){
            answer = "X";
           } 
           else{
                answer = "O";
           }
           boxes.forEach((box)=>{
            box.style.pointerEvents="none";
           })
           boxes[position[0]].classList.add("win");
           boxes[position[1]].classList.add("win");
           boxes[position[2]].classList.add("win");
        }
    });
    if(answer!==""){
        userchance.innerHTML=`Winner is -- ${answer} 🎉🎉`;
        newgame.classList.add("active");
        return;


    }
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !==""){
            fillCount++;
        }
    });
    if(fillCount===9){
        userchance.innerHTML="Game Tied...";
        newgame.classList.add("active");
    }
    

}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkWin();
    }
}
boxes.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});
newgame.addEventListener("click",init_game());