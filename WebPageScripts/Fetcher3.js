/*
 * Fetcher.js
 *
 * David Brough
 * Jay Agrawal
 * of OCDevs Project Group
 * 24/4/2011
 */
 

//directional orienting based on the facing input
var toWallX = [0.0, 1.0, 0.0, -1.0];
var toWallZ = [1.0, 0.0, -1.0, 0.0];

var counter = 0;
document.getElementById("myDiv").innerHTML="asdf";
function getRoom(roomID, doorX, doorZ, facing)
{
	var doors = new Array(4);//to be extracted from results set
	var roomWidth;	//float: to be extracted from results set
	var roomLength;	//float: to be extracted from results set
	var roomX;		//float: to be calculated later
	var roomZ;		//float: to be calculated later
	var doorPos;	//float: to be extracted from doors[(facing+2)%4]
	var roomDetails = new String("");	
	var doorString = new String("");
	var constructor = GetUnity();
	//get the room details via PHP script call to the DB and populate the variables
	document.getElementById("myDiv2").innerHTML="asdf";
	var ajax = new XMLHttpRequest();
	var params = "output="+roomID;
	
	for (var w=0; w<4; w++)
	{
		doors[w]=new Array();
	}
	
	ajax.onreadystatechange=function()						//NOT TESTED BUT SHOULD WORK
	{
		if ((ajax.readyState==4 && ajax.status==200))
		{
			

			
			constructor.SendMessage("Avatar", "buildRoom", ajax.responseText);
			document.getElementById("myDiv").innerHTML=ajax.responseText;
			counter++;
		}
	}
	
	ajax.open("POST","../PHPScripts/getRoom.php",true);
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.setRequestHeader("Content-length", params.length);
	ajax.setRequestHeader("Connection", "close");
	ajax.send(params);			

}

function called(string)
{
	alert(string);
}

/*function getTreatment(treatmentID : long)
{
	var constructor = unityObject.getObjectById("UnityContent");
	var roomWidth : float;
	var roomLength : float;
	var roomID : float;
	var doors : Array;
	
	//get the room details via PHP script call to the DB and then populate the variables from the results
	
	constructor.sendMessage("Avatar", "buildRoom", roomWidth, roomLength, roomID, doors, -1, 0, 0);
}*/