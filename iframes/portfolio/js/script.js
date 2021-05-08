/**
*	@Author: Shifat Khan
*	@Version: 1.1
*/
app = {};
var notfilled = true;
function init()
{
	app.header = document.getElementById("header");
	app.navbar = document.getElementById("navbar");
	app.headimg = document.getElementById("headimg");
	app.skill = document.getElementById("skills");
	formatDisplay();
	
	app.msgNo = 0;
    app.request = createRequestObject();
    app.nameInput = document.getElementById("userform");
    app.chat = document.getElementById("fullchat");
    app.btnClick = document.getElementById("submitbtn");
    app.enterName = document.getElementById("userinput");
    app.writeMessage = document.getElementById("messagebox");
	
	addEvent(window, "scroll", initParallax);
	addEvent(app.btnClick, 'click', startChat);
    addEvent(app.enterName, 'change', startChat);
    addEvent(app.writeMessage, 'keypress', enterPress);
}

function initParallax()
{
	if(window.pageYOffset > app.header.offsetHeight)
	{
		app.navbar.style.position = "fixed";
		app.navbar.style.top = "0";
	}
	else
	{
		app.navbar.style.position = "absolute";
		app.navbar.style.top = "0";
	}
	//app.headimg.style.top = -(window.pageYOffset/8)+"px";

	if((window.pageYOffset > (app.skill.offsetHeight + 1000)) && notfilled)
	{
		toBar();
		notfilled = false;
	}

	var wScroll = $(this).scrollTop();
  	$('#title').css({
    	'transform' : 'translate(0px, '+ wScroll /10 +'%)'
  	});
}

function toBar()
{
	$('progress').each(function() {
    var max = $(this).val();
    $(this).val(0).animate({ value: max }, { duration: 2000, easing: 'easeOutCirc' });
			});
}

function formatDisplay(){
	app.navbarHeight = app.navbar.offsetHeight;
	app.headerHeight = app.header.offsetHeight;

	app.header.style.height = screen.height - app.navbarHeight;
}

$(document).ready(function() {
    $(window).stellar();
});

$(document).ready(
  function() { 

    $("html").niceScroll({
        cursorcolor:"rgba(30,30,30,.5)",
        zindex:999,
        scrollspeed:100,
        mousescrollstep:50,
        cursorborder:"0px solid #fff",
    });

    $("#aboutContent").niceScroll({
        cursorcolor:"rgba(30,30,30,.5)",
        zindex:999,
        scrollspeed:100,
        mousescrollstep:50,
        cursorborder:"0px solid #fff",
    });
  }
);

function startChat()
{
    if(app.enterName.value.length < 1)
    {
        var rng = Math.floor((Math.random() * 100) + 1);
        app.enterName.value = "anonymous"+rng;
    }
    
    app.nameInput.style.visibility = 'hidden';
    app.writeMessage.style.visibility = 'visible';
    app.chat.style.visibility = 'visible';
    
    app.msgNo = 0;
    
    var params = "username="+app.enterName.value+"&msgNo="+app.msgNo+"&msg=none";
    sendRequest(params, false);
    
    setInterval(retrieveMessages, 4000);
}

function sendRequest(params, async)
{
    app.request.open("post", "chatpgm.php", async);
    app.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    app.request.setRequestHeader("Content-length", params.length);
    app.request.setRequestHeader("Connection", "close");    
    app.request.onreadystatechange = processServerData;
    app.request.send(params);
}

function retrieveMessages()
{
    var params = "username="+app.enterName.value+"&msgNo="+app.msgNo+"&msg=none";
    sendRequest(params, true);
}

function createRequestObject()
{
    var request;
    
    if(window.XMLHttpRequest)
        request = new XMLHttpRequest();
    else
        request = new ActiveObject("Microsoft.XMLHTTP");
    
    return request;
}


function sendMessage()
{
    var msg = app.writeMessage.value;
    var params = "username="+app.enterName.value+"&msgNo="+app.msgNo+"&msg="+msg;
    sendRequest(params, true);
}

function processServerData()
{
    var xmldoc, user, number, message;
    
    if(app.request.readyState == 4 && app.request.status == 200)
    {
        var fieldText = app.request.responseText;
    
        if(window.DOMParser)
        {
            parser = new DOMParser();
            xmldoc = parser.parseFromString(fieldText, "text/xml");
        }
        else
        {
            xmldoc = new ActiveXObject("Microsoft.XMLDOM");
            xmldoc.async = false;
            xmldoc.loadXML(fieldText);
        }
        
        var messages = xmldoc.getElementsByTagName("message");
        var lastRecord = xmldoc.getElementsByTagName("chat");
        app.msgNo = lastRecord[0].attributes[0].value;
        
        for(var i = 0; i < messages.length; i++)
        {
            user = messages[i].getElementsByTagName("username")[0].firstChild.textContent;
            number = messages[i].getElementsByTagName("msgNo")[0].firstChild.textContent;
            message = messages[i].getElementsByTagName("msg")[0].firstChild.textContent;
            app.chat.innerHTML += "<p>"+user+": "+message+"</p>";
            app.chat.scrollTop = app.chat.scrollHeight;
        }
    }
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

function enterPress(e)
{
    var evt = e || window.event;
    var key = evt.which || evt.keyCode;
    
    if(key == "13")
    {
        sendMessage();
        app.writeMessage.value = '';   
    }
}

window.onload = init;