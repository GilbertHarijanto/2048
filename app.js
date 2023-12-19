const allDiv = document.querySelectorAll('.col');
const body = document.querySelector('body');
const container = document.querySelector('#container')
const resetButton = document.querySelector('button');
const grid = [[0,0,0,0] , [0,0,0,0] , [0,0,0,0] , [0,0,0,0]];
const tempGrid = [[0,0,0,0] , [0,0,0,0] , [0,0,0,0] , [0,0,0,0]];

const score = document.querySelector('#val');
const best = document.querySelector('#bestVal');
const gameOver = document.querySelector('#gameOver');
const retryButton = document.querySelector('#retry');
let tempScore = 0 , bestScore = 0;

for(div of allDiv){
    div.innerText = "";
}

gameOver.style.visibility = "hidden";
retryButton.style.visibility = "hidden";

const setColor = (num) => {
    let constant = Math.log2(num);

    let red = 252 - 191*constant/17;
    let green = 185 - 185*constant/17;
    let blue = 178 - 178*constant/17;

    red = Math.floor(red);
    green = Math.floor(green);
    blue = Math.floor(blue);

    return `rgb(${red} , ${green} , ${blue})`;
}

const randomNumberGenerator = () => {
    const upper = 200;
    let rand = Math.floor(Math.random()*upper);
    if(rand%6==0) return 4;
    return 2;
}

const randomPositionGenerator = () => Math.floor(Math.random()*4)

const assignValue = () => {
    let row , col;
    do {
        row = randomPositionGenerator();
        col = randomPositionGenerator();
    } while(grid[row][col] != 0);
    grid[row][col] = randomNumberGenerator();    
}

const display = () => {
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j] != 0){
                allDiv[4*i+j].innerText = `${grid[i][j]}`;
                allDiv[4*i+j].style.backgroundColor = setColor(grid[i][j]);
            }
            else {
                allDiv[4*i+j].innerText = "";
                allDiv[4*i+j].style.backgroundColor = "#461220";
            }
        }
    }
    score.innerText = `${tempScore}`;
}

const startGame = () => {
    assignValue();
    assignValue();
}
startGame();


const mergeLeft = () => {
    for(let i=0; i<4; i++){
        let temp = [];
        for(let j=0; j<4; j++){
            if(grid[i][j] == 0)continue;
            for(let k=j+1; k<4; k++){
                if(grid[i][j] == grid[i][k]){
                    grid[i][j] += grid[i][k];
                    grid[i][k] = 0;
                    tempScore = tempScore + grid[i][j];
                    break;
                }
                else if (grid[i][k]!=0)break;
            }
            temp.push(grid[i][j]);
            grid[i][j] = 0;
        }
        while(temp.length < 4)temp.push(0);
        grid[i] = temp;
    }
}

const mergeUp = () => {
    for(let i=0; i<4; i++){
        let temp = [];
        for(let j=0; j<4; j++){
            if(grid[j][i] == 0)continue;
            for(let k=j+1; k<4; k++){
                if(grid[j][i] == grid[k][i]){
                    grid[j][i] += grid[k][i];
                    grid[k][i] = 0;
                    tempScore+=grid[j][i];
                    break;
                }
                else if (grid[k][i]!=0)break;
            }
            temp.push(grid[j][i]);
            grid[j][i] = 0;
        }
        while(temp.length < 4)temp.push(0);
        for(let j=0;j<4;j++)grid[j][i] = temp[j]; 
    }
}

const mergeRight = () => {
    for(let i=0; i<4; i++){
        let temp = [];
        for(let j=3; j>=0; j--){
            if(grid[i][j] == 0)continue;
            for(let k=j-1; k>=0; k--){
                if(grid[i][j] == grid[i][k]){
                    grid[i][j] += grid[i][k];
                    grid[i][k] = 0;
                    tempScore+=grid[i][j];
                    break;
                }
                else if(grid[i][k]!=0)break;
            }
            temp.push(grid[i][j]);
            grid[i][j] = 0;
        }
        while(temp.length < 4)temp.push(0);
        temp.reverse();
        grid[i] = temp;
    }
}

const mergeDown = () => {
    for(let i=0; i<4; i++){
        let temp = [];
        for(let j=3; j>=0; j--){
            if(grid[j][i] == 0)continue;
            for(let k=j-1; k>=0; k--){
                if(grid[j][i] == grid[k][i]){
                    grid[j][i] += grid[k][i];
                    grid[k][i] = 0;
                    tempScore+=grid[j][i];
                    break;
                }
                else if(grid[k][i]!=0)break;
            }
            temp.push(grid[j][i]);
            grid[j][i] = 0;
        }
        while(temp.length < 4)temp.push(0);
        for(let j=0;j<4;j++)grid[j][i] = temp[3-j]; 
    }
}

const copy = () => {
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++)tempGrid[i][j] = grid[i][j];
    }
}

const isValidMove = (a , b) => {
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(a[i][j] != b[i][j]) return true;
        }
    }
    return false;
}
const isGameOver = () => {
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j] == 0)return false;
            if(j==0)continue;
            if(grid[i][j] == grid[i][j-1])return false;
            if(grid[j][i] == grid[j-1][i])return false;
        }
    }
    return true;
    
}
body.addEventListener('keydown' , (e) => {
    e.preventDefault();
    switch(e.keyCode){
        case 37:
            copy();
            mergeLeft();
            if(isValidMove(tempGrid , grid)) assignValue();
            display();
            break;
        case 38:
            copy();
            mergeUp();
            if(isValidMove(tempGrid , grid)) assignValue();
            display();
            break;
        case 39:
            copy();
            mergeRight();
            if(isValidMove(tempGrid , grid)) assignValue();
            display();
            break;
        case 40:
            copy();
            mergeDown();
            if(isValidMove(tempGrid , grid)) assignValue();
            display();
            break;
        default:
            
    }
    if(isGameOver()){
        container.style.opacity = "50%";
        gameOver.style.visibility = "visible";
        retryButton.style.visibility = "visible";
    }
    
})


const newGame = () => {
    for(let i of allDiv){
        i.innerText = "";
    }
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            grid[i][j] = 0;
            tempGrid[i][j] = 0;
        }
    }
}

resetButton.addEventListener('click' , () => {
    newGame();
    startGame();
    display();
    bestScore = Math.max(bestScore , tempScore);
    tempScore = 0;
    bestVal.innerText = `${bestScore}`;
    container.style.opacity = "100%";
    gameOver.style.visibility = "hidden";
    retryButton.style.visibility = "hidden";
})

retryButton.addEventListener('click' , () => {
    newGame();
    startGame();
    display();
    bestScore = Math.max(bestScore , tempScore);
    tempScore = 0;
    bestVal.innerText = `${bestScore}`;
    container.style.opacity = "100%";
    gameOver.style.visibility = "hidden";
    retryButton.style.visibility = "hidden";
})

display();