/**
*	@Author: Shifat Khan
*	@Version: 1.1
*/
app = {};

function init()
{
	console.log("Int init");
	
	initVars();

	//Represents which background image is being displayed at the moment.
	app.bgIndex = 1;

	addEvent(app.startBtn, "click", startGame);
}

function initVars()
{
	//Adding the tiles' face images source into a String array.
	app.tileImg = ["images/face1.jpg", "images/face2.jpg", "images/face3.jpg", "images/face4.jpg",
		"images/face5.jpg", "images/face6.jpg", "images/face7.jpg", "images/face8.jpg", 
	 	"images/face1.jpg", "images/face2.jpg", "images/face3.jpg", "images/face4.jpg",
	 	"images/face5.jpg", "images/face6.jpg", "images/face7.jpg", "images/face8.jpg"];

	 //Adding the cover images' source into a string array
	app.coverImg = ["images/covers/a.png", "images/covers/b.png", "images/covers/c.png", 
	 	"images/covers/d.png", "images/covers/e.png", "images/covers/f.png", "images/covers/g.png", 
	 	"images/covers/h.png", "images/covers/i.png", "images/covers/j.png", "images/covers/k.png", 
	 	"images/covers/l.png", "images/covers/m.png", "images/covers/n.png", "images/covers/o.png", 
	 	"images/covers/p.png", ];

	 //Adding the image tags of all the covers into an array
	app.coverImgArr = getElementsByClass("cover");

	//Adding the background images' source into an array
	app.bgImg = ["images/boardBg/bg1.jpg", "images/boardBg/bg2.jpg", "images/boardBg/bg3.jpg", 
	 	"images/boardBg/bg4.jpg", "images/boardBg/bg5.jpg", ];
	
	app.startBtn = document.getElementById("startBtn");
	app.endBtn = document.getElementById("endBtn");
	
	//Start button isn't disabled at first, but End button is.
	app.startBtn.disabled = false;
	app.endBtn.disabled = true;
	addEvent(app.endBtn, "click", endGame);

	app.tileEnabled = [];
	for(var i = 0; i < 16; i++)
	{
		app.tileEnabled.push(true);
	}

	//Counts if it is the first or second click.
	app.numClick = 1;
	//The first tile clicked.
	app.firstTile = new Image();
	//Second tile clicked.
	app.secondTile = new Image();
	//First cover clicked (used to find the first tile)
	app.firstCover = new Image();
	//Second cover clicked (used to find the second tile)
	app.secondCover = new Image();

	//Counts how many tile pairs the user has found
	app.pairsFound = 0;
}

/**
*	Calls all the appropriate methods in order to prepare the game.
*/
function startGame()
{
	console.log("startGame()");

	addEvent(window, "keypress", keyPressed);

	for(var i = 0; i < app.coverImgArr.length; i++)
		app.coverImgArr[i].style.visibility = 'visible';

	initBgImg();
	initTileImg();
	initCoverImg();

	app.startBtn.disabled = true;
	app.endBtn.disabled = false;

	for(var i = 0; i < app.coverImgArr.length; i++){
		addEvent(app.coverImgArr[i], "click", tileClick);
	}
}

/**
*	Looks at which key was pressed, calls appropriate method with appropriate cover image.
*/
function keyPressed(e)
{
	console.log("keyPressed()");
	var key = e.keyCode ? e.keyCode : e.which;

	if ((key == "97" || key == "65") &&  app.tileEnabled[0])
	{ 
		console.log("A KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[0]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[0]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "98" || key == "66") &&  app.tileEnabled[1]) 
	{
		console.log("B KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[1]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[1]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "99" || key == "67") &&  app.tileEnabled[2]) 
	{
		console.log("C KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[2]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[2]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "100" || key == "68") &&  app.tileEnabled[3]) 
	{
		console.log("D KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[3]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[3]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "101" || key == "69") &&  app.tileEnabled[4]) 
	{
		console.log("E KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[4]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[4]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "102" || key == "70") &&  app.tileEnabled[5]) 
	{
		console.log("F KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[5]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[5]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "103" || key == "71") &&  app.tileEnabled[6]) 
	{
		console.log("G KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[6]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[6]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "104" || key == "72") &&  app.tileEnabled[7]) 
	{
		console.log("H KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[7]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[7]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "105" || key == "73") &&  app.tileEnabled[8]) 
	{
		console.log("I KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[8]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[8]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "106" || key == "74") &&  app.tileEnabled[9]) 
	{
		console.log("J KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[9]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[9]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "107" || key == "75") &&  app.tileEnabled[10]) 
	{
		console.log("K KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[10]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[10]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "108" || key == "76") &&  app.tileEnabled[11]) 
	{
		console.log("L KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[11]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[11]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "109" || key == "77") &&  app.tileEnabled[12]) 
	{
		console.log("M KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[12]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[12]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "110" || key == "78") &&  app.tileEnabled[13]) 
	{
		console.log("N KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[13]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[13]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "111" || key == "79") &&  app.tileEnabled[14]) 
	{
		console.log("O KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[14]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[14]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
	else if ((key == "112" || key == "80") &&  app.tileEnabled[15]) 
	{
		console.log("P KEY PRESSED");
		if(app.numClick == 1)
		{
			firstClick(app.coverImgArr[15]);
			console.log("	cover clicked: "+app.firstCover.id);
		}
		else
		{
			secondClick(app.coverImgArr[15]);
			console.log("	cover clicked: "+app.secondCover.id);
		}
	}
}

/**
*	Checks which type of event was fired.
*
function flipTileEvent(e)
{
	if(e.type == "click")
	{
		tileClick(e);
	}
	else
	{
		keyPressed(e);
	}
}*/

/**
*	When a tile is clicked, check the face of it.
*/
function tileClick(e)
{
	console.log("tileClick()");
	console.log("	numClick: " + app.numClick);

	var event = e || window.event;

	//Get the cover clicked.
	var coverClicked = event.target || event.srcElement;

	if(app.numClick == 1)
	{
		firstClick(coverClicked);
		console.log("	cover clicked: "+app.firstCover.id);
	}
	else
	{
		secondClick(coverClicked);
		console.log("	cover clicked: "+app.secondCover.id);
	}
}

/**
*	Sets up the first cover clicked.
*/
function firstClick(coverClicked)
{
	app.firstCover = coverClicked;

	app.firstCover.style.visibility = 'hidden';

	app.firstCover.disabled = true;

	var n = app.firstCover.parentNode.id.substring(1);

	//Gets the section since there are no img tag in the html (it is later created on runtime).
	var parent = document.getElementById("t"+n);
	//Gets the img tag based on the img tag created on runtime.
	app.firstTile = parent.getElementsByTagName('img')[0];

	console.log("	t id: " + parent.id);

	app.numClick++;

	var num = parseInt(n);
	console.log(num);
	app.tileEnabled[num-1] = false;
}

/**
*
*/
function secondClick(coverClicked)
{
	for(var i = 0; i < app.coverImgArr.length; i++){
		removeEvent(app.coverImgArr[i], "click", tileClick);
	}

	app.secondCover = coverClicked;

	app.secondCover.style.visibility = 'hidden';

	app.secondCover.disabled = true;

	var n = app.secondCover.parentNode.id.substring(1);
	var num = parseInt(n);
	app.tileEnabled[num-1] = true;


	//Gets the section since there are no img tag in the html (it is later created on runtime).
	var parent = document.getElementById("t"+n);
	//Gets the img tag based on the img tag created on runtime.
	app.secondTile = parent.getElementsByTagName('img')[0];

	console.log("	t id: " + parent.id);

	app.numClick = 1;

	if(checkIfMatchFound())
	{
		console.log("Match found!");
		app.pairsFound++;
		setTimeout(matchFound, 1300);
	}
	else
	{
		console.log("Match NOT found!");

		var n2 = app.firstCover.parentNode.id.substring(1);
		var num2 = parseInt(n2);
		console.log(num2);
		app.tileEnabled[num2-1] = true;

		
		console.log(num);
		app.tileEnabled[num-1] = true;
		setTimeout(noMatchFound, 1300);
	}

	if(app.pairsFound == 8)
	{
		gameCompleted();
	}
}

/**
*	Checks if the two tiles matches.
*	@return: boolean
*/
function checkIfMatchFound()
{
	if(app.firstTile.src == app.secondTile.src)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/**
*	Removes the pair of tiles from the board.
*/
function matchFound()
{
	
	app.firstTile.style.visibility = 'hidden';
	app.secondTile.style.visibility = 'hidden';

	for(var i = 0; i < app.coverImgArr.length; i++){
		addEvent(app.coverImgArr[i], "click", tileClick);
	}
}

/**
*	Restores the unmatched tiles to their initial states.
*/
function noMatchFound()
{
	app.firstCover.disabled = false;
	app.secondCover.disabled = false;

	app.firstCover.style.visibility = 'visible';
	app.secondCover.style.visibility = 'visible';

	for(var i = 0; i < app.coverImgArr.length; i++){
		addEvent(app.coverImgArr[i], "click", tileClick);
	}
}

/**
*	
*/
function gameCompleted()
{
	alert("Game complete!");

	app.firstTile.style.visibility = 'hidden';
	app.secondTile.style.visibility = 'hidden';
	
	app.pairsFound = 0;

	app.startBtn.disabled = false;
	app.endBtn.disabled = true;

	removeTiles();

	removeEvent(window, "keypress", keyPressed);

	initVars();
}

function removeTiles() 
{
	var tempTile;
	for(var i = 0; i < app.tileImgArr.length; i++)
	{
		tempTile = app.tileImgArr[i];
		tempTile.parentNode.removeChild(tempTile);
	}
}

/**
*	Populates the gameboard with the tile images.
*/
function initTileImg()
{
	console.log("initTileImg()");

	app.tileImg = shuffle(app.tileImg);

	app.tileImgArr = [];
  	for(var i = 0; i < 16; i++)
  	{
  		var img = new Image();
  		img.src = app.tileImg[i];
  		app.tileImgArr.push(img);
  	}

	var temp;
	
	for(var i = 0; i < 16; i++){
		temp = i + 1;
		tile = document.getElementById('t'+temp);
		tile.appendChild(app.tileImgArr[i]);
	}
}

/**
*	Populates the tiles' cover images.
*/
function initCoverImg()
{
	console.log("initCoverImg()");

	for(var i = 0; i < app.coverImgArr.length; i++){
		app.coverImgArr[i].src = app.coverImg[i];
	}
}

/**
*	Changes the background image depending on the index.
*/
function initBgImg()
{
	console.log("initBgImg()");

	var backgroundImage = document.getElementById("complete");

	if(app.bgIndex == 1)
	{
		backgroundImage.src = app.bgImg[0];
	}
	else if(app.bgIndex == 2)
	{
		backgroundImage.src = app.bgImg[1];
	}
	else if(app.bgIndex == 3)
	{
		backgroundImage.src = app.bgImg[2];
	}
	else if(app.bgIndex == 4)
	{
		backgroundImage.src = app.bgImg[3];
	}
	else
	{
		backgroundImage.src = app.bgImg[4];
		app.bgIndex = 0;
	}

	app.bgIndex++;
}

/**
*	Ends the game by restoring the gameboard to its initial state.
*/
function endGame()
{
	for(var i = 0; i < 16; i++)
	{
		app.coverImgArr[i].style.visibility = 'hidden';
		//app.tileImgArr[i].style.visibility = 'hidden';
	}

	app.pairsFound = 0;

	app.startBtn.disabled = false;
	app.endBtn.disabled = true;

	removeTiles();
	
	initVars();
}

/**
*	Shuffles a given array (in this case, the tileImg array).
*/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function addEvent(obj, type, fn){
	if(obj.addEventListener){
		obj.addEventListener(type, fn, false);
	}
	else if(obj.attachEvent){
		obj.attachEvent("on"+type, fn);
	}
}

function removeEvent(obj, type, fn)
{
	if(obj.removeEventListener){
		obj.removeEventListener(type, fn, false);
	}
	else if (obj.detachEvent){
		obj.detachEvent("on"+type, fn);
	}
}

function cacheImage()
{
	//Preloads image;
	var picture = new Image();
	var ImagesArray = app.tileImg.concat(app.coverImgArr);
	
	for(var x = 0; x < ImagesArray.length; x++)
	{
		picture.src = ImagesArray[x];
	}
}


function getElementsByClass(cn){
	var allElements = document.getElementsByTagName("*");
	var classArray = [];
	for ( var i=0; i<allElements.length; i++)
	{
		if (allElements[i].className == cn){ 
			classArray.push(allElements[i]);
		}
	}
	return classArray;
}

window.onload = init;