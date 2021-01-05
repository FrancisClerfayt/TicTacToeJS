let cells = document.querySelectorAll('#board td a');
let i = 0;
for(let cell of cells){
  cell.setAttribute('data-cell-number', i)
  i++;
  cell.addEventListener('click', addToken);
}

let message = document.getElementById('message');

let games = 0, turns = 0, Xwins = 0, Owins = 0;
let tokenX = '<span class="fas fa-times fa-3x"></span>';
let tokenO = '<span class="far fa-circle fa-3x"></span>';
let tracker = new Array(9);
for (let j = 0; j < tracker.length; j++){
  tracker[j] = '';
}

let reset = document.getElementById('reset');
reset.addEventListener('click', resetGame);

function addToken(e){
  e.preventDefault();
  let token;
  if(games % 2 == 0){
    if(turns % 2 == 0){
      token = tokenX;
    } else {
      token = tokenO;
    }
  } else {
    if(turns % 2 == 0){
      token = tokenO;
    } else {
      token = tokenX;
    }
  }
  if(token == tokenX){
    tracker[e.target.getAttribute('data-cell-number')] = 'X';
  } else {
    tracker[e.target.getAttribute('data-cell-number')] = 'O';
  }
  e.target.innerHTML = token;
  console.log(tracker);
  turns++;
  isFinished();
}

function isFinished(){
  if(tracker[0] == tracker[1] && tracker[0] == tracker[2] && tracker[0] != ''){
    endGame(tracker[0]);
  } else if(tracker[3] == tracker[4] && tracker[3] == tracker[5] && tracker[3] != ''){
    endGame(tracker[3]);
  } else if(tracker[6] == tracker[7] && tracker[6] == tracker[8] && tracker[6] != ''){
    endGame(tracker[6]);
  } else if(tracker[0] == tracker[3] && tracker[0] == tracker[6] && tracker[0] != ''){
    endGame(tracker[0]);
  } else if(tracker[1] == tracker[4] && tracker[1] == tracker[7] && tracker[1] != ''){
    endGame(tracker[1]);
  } else if(tracker[2] == tracker[5] && tracker[2] == tracker[8] && tracker[2] != ''){
    endGame(tracker[2]);
  } else if(tracker[0] == tracker[4] && tracker[0] == tracker[8] && tracker[0] != ''){
    endGame(tracker[0]);
  } else if(tracker[2] == tracker[4] && tracker[2] == tracker[6] && tracker[2] != ''){
    endGame(tracker[2]);
  } else {
    let continu = false;
    for (let j = 0; j < tracker.length; j++){
      if(tracker[j] === ''){
        continu = true;
      }
    }
    if (!continu){
      endGame('$');
    }
  }
}

function endGame(token){
  if (token === 'X'){
    message.textContent = 'Victoire des X';
    Xwins++;
    document.getElementById('player_x_point').textContent = Xwins;
  } else if(token === 'O'){
    message.textContent = 'Victoire des O';
    Owins++;
    document.getElementById('player_o_point').textContent = Owins;
  } else if(token === '$'){
    message.textContent = 'Match Nul';
  }
  games++;
  document.getElementById('games_number').textContent = games;
}

function resetGame(e){
  e.preventDefault();
  for(let cell of cells){
    while(cell.firstChild){
      cell.removeChild(cell.firstChild);
    }
  }
  for (let j = 0; j < tracker.length; j++){
    tracker[j] = '';
  }
  message.textContent = '';
}