var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = ["--74916-5", "2---6-3-9", "-----7-1-", "-586----4", "--3----9-", "--62--187", "9-4-7---2", "67-83----", "81--45---"];

var solution = ["387491625", "241568379", "569327418", "758619234", "123784596", "496253187", "934176852", "675832941", "812945763"];

window.onload = function () {
  setGame();
};

function setGame() {
  ///CREATE DIGITS 1-9

  //<div id=digits>
  //<div id='1' class='number'>1</div>
  //</div>
  for (let i = 1; i <= 9; i++) {
    //this creates a <div></div> tag using js
    let number = document.createElement("div");
    //gives an id
    number.id = i;
    //writes an inner text, according to the i
    number.innerText = i;
    //on each click we are going to call the selectNumber function
    number.addEventListener("click", selectNumber);
    // adds the existing class 'number'
    number.classList.add("number");
    //add all this to the digits div.
    //get the div 'digits' and insert child 'number'
    document.getElementById("digits").appendChild(number);
  }

  //CREATE BOARD 9x9
  //r: row
  for (let r = 0; r < 9; r++) {
    //c: column
    for (let c = 0; c < 9; c++) {
      //declare
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      //prefill the numbers if they are not a dash-

      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      //add the horizontal lines each 3 rows
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      //add the vertical each 3 cols
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }

      //function//
      tile.addEventListener("click", selectTile);
      //function//
      tile.classList.add("tile");
      //insert tile
      document.getElementById("board").append(tile);
    }
  }
}

//functionality for the game

function selectNumber() {
  // if the number was already selected, remove the number-selected onclick and update to the new number
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  //initialize number
  //this refers to the div itself
  numSelected = this;
  numSelected.classList.add("number-selected");
}

//when I select the tile I want to see the number I have previously selected
function selectTile() {
  //if there is a selectedNumber
  if (numSelected) {
    //condition to avoid replacing an innerText number by a new selectedNumber
    //if it has a number in it...
    if (this.innerText != "") {
      return; //exit the function and do nothing else
    }

    //COMPARE WITH THE SOLUTION
    // 1. get the coordinates
    // splits and gets two individual numbers "0-1"  ['0','1']
    let coords = this.id.split("-");
    let r = parseInt(coords[0]); //row is the 0 element
    let c = parseInt(coords[1]); //column is the 1 element

    if (solution[r][c] == numSelected.id) {
      // add the selected number.id inside this as an innterText
      this.innerText = numSelected.id;
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors; //update to the new 'errors' value.
    }
  }
}
