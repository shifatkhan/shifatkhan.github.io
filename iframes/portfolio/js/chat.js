var app = {};

function init()
{
    app.msgNo = 0;
    app.request = createRequestObject();
    app.nameInput = document.getElementById("userform");
    app.chat = document.getElementById("fullchat");
    app.btnClick = document.getElementById("submitbtn");
    app.enterName = document.getElementById("userinput");
    app.writeMessage = document.getElementById("messagebox");
    
    addEvent(app.btnClick, 'click', startChat);
    addEvent(app.enterName, 'change', startChat);
    addEvent(app.writeMessage, 'keypress', enterPress);
}

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


function addEvent(obj, type, fn)
{
	if(obj.addEventListener)
		obj.addEventListener(type, fn, false);
	else if(obj.attachEvent)
		obj.attachEvent("on"+type, fn);
}

function removeEvent(obj, type, fn)
{
	if(obj.removeEventListener)
		obj.removeEventListener(type, fn, false);
	else if(obj.detachEvent)
		obj.detachEvent("on"+type, fn);
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