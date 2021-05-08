item = {};



function init()
{
	alert("In Init");
	item.tileImg = ["images/face1.jpg", "images/face2.jpg", "images/face3.jpg", "images/face4.jpg",
		"images/face5.jpg", "images/face6.jpg", "images/face7.jpg", "images/face8.jpg", 
	 	"images/face1.jpg", "images/face2.jpg", "images/face3.jpg", "images/face4.jpg",
	 	"images/face5.jpg", "images/face6.jpg", "images/face7.jpg", "images/face8.jpg"];
	item.coverImg = getElementsByClass("cover");
	item.botLayerGallery = ["images/boardBg/bg1.jpg", "images/boardBg/bg2.jpg", "images/boardBg/bg3.jpg", 
		"images/boardBg/bg4.jpg", "images/boardBg/bg5.jpg", ];
	item.botLayerImg = document.getElementById("congrat");
	item.startBtn = document.getElementById("startButton");
	item.quitBtn = document.getElementById("quitButton");
	item.firstImage = new Image(); //Temporary variable to hold the first image picked by user
	item.secondImage = new Image();
	item.botLayerCtr = 0;
	item.tilesFlipped = 0; //num of tiles currently flipped
	item.pairsFlipped = 0; //Num of pairs flipped.
	item.gameStarted = true;
	//Game starts as soon as user clicks on "start"
	addEvent(item.startBtn, "click", startGame);
	
}

function loadBoard()
{
	//Shuffle array containing midlayer pictures then set them in the midlayer
	item.tileImg = shuffle(item.tileImg);
	addImage();
	
	
	//Setup events for tiles.
	for(var i = 0; i < item.coverImg.length; i++){
		addEvent(item.coverImg[i], "click", flipTile);
	}
}

function startGame()
{
	alert("startGame()");
	loadBoard();
	

	//Sets counter at zero
	item.pairsFlipped = 0;
	
	//When game starts, set opacity of board
	document.getElementById("puzzleBox").style.opacity = 1;
	
	//Disable click of start game until user wins or clicks on quit
	removeEvent(item.startBtn, "click", startGame);
	item.startBtn.style.opacity = 0.8;
	
	//Enable quit game
	addEvent(item.quitBtn, "click", quitGame);
	item.quitBtn.style.opacity = 1;
}

function quitGame()
{
	//Remove cover images
	removeAllTiles()
	
	//Update bottom layer image
	if(item.botLayerCtr == 5){
		item.botLayerCtr = 0;
	}
	else{
		item.botLayerCtr++;
	}
	
	//Disable quitGame button
	removeEvent(item.quitBtn, "click", quitGame);
	item.quitBtn.style.opacity = 0.8;

	//enable click of start game
	addEvent(item.startBtn, "click", startGame);
	item.startBtn.style.opacity = 1;
}

function addImage()
{
	var img; 
	var tile;
	var ctr;
	
	for(var i = 0; i < 16; i++){
		ctr = i + 1;
		img = document.createElement("img");
		img.src = item.tileImg[i];
		tile = document.getElementById('p'+ctr);
		tile.appendChild(img);
	}
}

function removeAllTiles()
{
	//var img;
	var tile;
	var pic;
	var ctr;
	
	for(var i = 0; i < 16; i++){
		ctr = i + 1;
		pic = document.getElementById("p" + ctr);
		pic.removeChild(pic.firstChild);
		tile = document.getElementById("t" + ctr);
		tile.style.display = 'none';
	}
}



function flipTile(e)
{
	var evt = e || window.event;
	var target = evt.target || evt.srcElement;
	//Check if a card has already been flipped
	if(item.tilesFlipped == 0){
		item.firstImage = getMidlayerImg(target);
		item.firstCover = target; //Stores the cover image in a temporary variable
	}
	else if (item.tilesFlipped == 1){
		item.secondImage = getMidlayerImg(target);
		item.secondCover = target;
	}
	//increment number of tiles flipped
	item.tilesFlipped++;
	
	//disable the event for the flipped card.
	removeEvent(target, "click", flipTile);
	
	//alert("num of tiles flipped: " + item.tilesFlipped);
	//remove the top layer picture
	target.style.display = 'none';
	
	//If user has flipped second tile, check if the img in corresponding tile in midlayer are the same.
	if(item.tilesFlipped == 2){
		checkImg();
	}
	
	//When all pairs have been flipped
	if(item.pairsFlipped == 8)
	{
		alert("All images flipped: Congratulations!");
	}
}

/*
Takes the id of the parent section of the cover clicked. Since all Ids are numerical, this method
extracts the number and picks the midlayer section whose Id corresponds with the toplayer section.
Then it finds the child element of the midlayer section, which is an image, and returns its source.
*/
function getMidlayerImg(target)
{
	//Takes the numerical value of the id of toplayer section i.e section id="t1", idOfMidLayerImg id = "p1"
	var idOfMidLayerImg = "p" + target.parentNode.id.substring(1);;
	//Takes parent element which is a section.
	var parentElemMidlayerImg = document.getElementById(""+idOfMidLayerImg);
	var midLayerImg = parentElemMidlayerImg.getElementsByTagName('img')[0];
	
	return midLayerImg;
}

//To do later: key press
function registerKey(e)
{
	var evt = e || window.event;
	var charCode = evt.which || evt.keyCode;
	var tile = document.getElementById(""+charCode);
	tile.style.display = 'none';
}

/*
If two tiles have been flipped, check if the midlayer images are identical. If they are not, 
re-add the flipTile function back to the two tiles and put back the covers. If they are the same,
remove the 
*/
function checkImg()
{
	if (item.firstImage.src == item.secondImage.src){
		item.pairsFlipped++;
		//alert("Same images! Num of pairs flipped: " + item.pairsFlipped);
		//remove midlayer images
		setTimeout (function () {
			item.firstImage.src = "";
			item.secondImage.src = "";
		}, 800);
		
		
	}
	else{
		//testing
		//alert("NOT the same images!");
		//add covers backset
		setTimeout (function () {
			item.firstCover.style.display = 'initial';
			item.secondCover.style.display = 'initial';
		}, 800);
		
		//add events flip tile back
		addEvent(item.firstCover, "click", flipTile);
		addEvent(item.secondCover, "click", flipTile);
	}
	
	
	
	//reset number of flipped tile back to 0
	item.tilesFlipped = 0;
}

function displayWinningScreen(){
	
	//enable click of start game
	addEvent(item.startBtn, "click", startGame);
	item.startBtn.style.opacity = 1;
	
}



//***************************************Events function********************************

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
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
	var ImagesArray = item.tileImg.concat(item.coverImg);
	
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