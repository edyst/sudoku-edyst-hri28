document.getElementById("validate_btn").addEventListener("click",()=>finalResult());

function finalResult(){
  let sudoku = validateGame();
  if(sudoku){
    return alert("The solution is correct!");
  }
  else{
    return alert("Incorrect solution, please try again");
  }
}

function validateGame()
{
  var arr = Array(9).fill(0).map(() => Array(9));      
  const ip = document.querySelectorAll("input");
  var index=0;
  for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
          arr[i][j] = ip[index++].value;
      }
  }

for(var i = 0; i < 9; i++){                             
    var rsum = 0;

    for(var j = 0; j < 9; j++){
      rsum += parseInt(arr[i][j]);
    }
    if(rsum !== 45) {
      return false;
    }
  }

for(var j = 0; j < 9; j++){                           
    var csum = 0;
    for(var i = 0; i < 9; i++){
      csum += parseInt(arr[i][j]);
    }
    if(csum !== 45){
      return false;
    }
  }
  var rindex= 0;                                            
  while(rindex < 9){
    var square1 = 0, square2 = 0, square3 = 0;

    for (var i = rindex; i < rindex + 3; i++){
      for (var j = 0; j < 3; j++) {
        square1+= parseInt(arr[i][j]);
      }
    }

    for (var i = rindex; i < rindex + 3; i++){
      for (var j = 3; j < 6; j++) {
        square2+= parseInt(arr[i][j]);
      }
    }
    for (var i = rindex; i < rindex + 3; i++){
      for (var j = 6; j < 9; j++) {
        square3+= parseInt(arr[i][j]);
      }  
    }
      rindex += 3;
      if(square1 !== 45 || square2 !== 45 || square3 !== 45){
        return false;
        }
    }
  return true;
}

function highlightBorder(c){
  cells = c.parentElement.parentElement.getElementsByTagName('td');
  for (var i in cells) {
     var cell = cells.item(i);
     cell.style.borderColor = (cell != c) ? "" : "cornflowerblue";
  }
}

const highlightSudoku = () => {
  const td = document.querySelectorAll("td");
  for(var k = 0; k < 81; k++) {
    const item = td[k];
    item.querySelector("input").onfocus = () => {
      let row_index = parseInt(item.id / 10);
      let col_index = parseInt(item.id % 10);    

      for (var i = 0; i< 81; i++) {
        var input = td[i].querySelector("input");
          if(parseInt(td[i].id / 10) == row_index){
            input.classList.add("change_background");
            input.classList.remove("disabled");
          } 
          else if(parseInt(td[i].id % 10) == col_index){
            input.classList.add("change_background");
            input.classList.remove("disabled");
          } 
          else{
            input.classList.remove("change_background");
            if(input.disabled){
              input.classList.add("disabled");
            }
          }        
      }

  const square = document.querySelectorAll(`.${item.classList[0]}`);
    for(let j = 0; j < square.length; j++){
      const sq_cell = square[j].querySelector("input");
        sq_cell.classList.add("change_background");
        input.classList.remove("disabled");
      }
    }
  }
}


const duplicateInstances = (item) => {
  const data = document.querySelectorAll('td');
  for(let i = 0; i < data.length; i++) 
  {
    const td_input = data[i].querySelector("input");
    const row_input = parseInt(data[i].id / 10);
    const col_input = parseInt(data[i].id % 10);
    
    if(item.querySelector("input").value && td_input.value == item.querySelector("input").value && data[i].id !== item.id) 
    {
      td_input.classList.add("instance");
      if(row_input == parseInt(item.id / 10) || col_input == parseInt(item.id % 10) || item.classList[1] == data[i].classList[1])
       {
        item.querySelector("input").classList.add("dupes");
        // item.querySelector("input").value = null;
      } 
    } 
    else if(!item.querySelector("input").value && item.id !== data[i].id){
      item.querySelector("input").classList.remove("dupes");
      td_input.classList.remove("instance");
    } 
    else{
      td_input.classList.remove("instance");
    }
  }
}


const highlightInstance = () => {
  var td_data = document.querySelectorAll("td");
  td_data.forEach(item =>{
    item.querySelector("input").oninput = () => {
      duplicateInstances(item);
      let inp = document.querySelectorAll("input");
  inp.forEach(item =>{
    if(item.value && (!item.disabled)){
      item.classList.add("changebg");
    }
    else{
      item.classList.remove("changebg");
    }
  })
    }
  })
}
highlightInstance();
highlightSudoku();

