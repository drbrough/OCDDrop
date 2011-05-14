/*
 * Fetcher.js
 *
 * David Brough
 * Jay Agrawal
 * of OCDevs Project Group
 * 24/4/2011
 */
 
//set the unity object handle
var constructor;//getting a handle on the unity Object
function getGame(theGame)
{
	constructor = unityObject.getObjectById("unityPlayer");
	
	alert("got game");
}
 
//directional orienting based on the facing input
var toWallX = [0.0, 1.0, 0.0, -1.0];
var toWallZ = [1.0, 0.0, -1.0, 0.0];

var counter = 0;

function getRoom(roomID, doorX, doorZ, facing)
{
	var doors = new Array(4);//to be extracted from results set
	var roomWidth;	//float: to be extracted from results set
	var roomLength;	//float: to be extracted from results set
	var roomX;		//float: to be calculated later
	var roomZ;		//float: to be calculated later
	var doorPos;	//float: to be extracted from doors[(facing+2)%4]
	
	//get the room details via PHP script call to the DB and populate the variables
	
	var ajax = new XMLHttpRequest();
	var params = "output="+roomID;
	
	ajax.onreadystatechange=function()						//NOT TESTED BUT SHOULD WORK
	{
		if (ajax.readyState==4 && ajax.status==200)
		{
			
			var room = (ajax.responseText).split(" ");		//split the response string into words in an array
			
			//1st word is the length, 2nd word is breadth/width, 3rd is wall no. 4th is position, 5th is room_to, 6th is again wall no. and so on...
			roomLength = Number(room[0]);	
			roomWidth = Number(room[1]);
			
			for (var i=2; i<room.length-1; i+=3)
			{
				doors[Number(room[i])]=[[Number(room[i+1]),Number(room[i+2])]];					
			}	
document.getElementById("myDiv").innerHTML="check 1:: length = "+roomLength+" Width = "+roomWidth+" Doors[] = "+doors[0]+" " + doors[1]+" " + doors[2]+" " + doors[3];	
			//populate other variables
			if(doors[(facing+2)%4] != null)
			{
				doorPos = doors[(facing+2)%4][0][0];
			}
			else
			{
				doorPos = 0;
			}
			
			//calculate the center of the new room in relation the Avatar's origional position
			roomX = doorX + roomWidth / 2 * toWallX[facing] + toWallX[facing] / 2 +
							toWallX[(facing + 1) % 4] * doorPos + toWallX[(facing + 3) % 4] * roomWidth / 2;//+ offset from center
							
			roomZ = doorZ + roomLength / 2 * toWallZ[facing] + toWallZ[facing] / 2 +
							toWallZ[(facing + 1) % 4] * doorPos + toWallZ[(facing + 3) % 4] * roomLength / 2;//+ offset from center
document.getElementById("myDiv4").innerHTML="counter for getRoom: "+counter;			
document.getElementById("myDiv3").innerHTML="check 2:: Z: "+roomZ+ "X: " +roomX + " roomID: " + roomID;
			
			//make the call now that we have all of the variables
			
			constructor.SendMessage("Avatar", "Know", "");
			constructor.SendMessage("Avatar", "BuildRoom", roomWidth/*, roomLength, roomID, doors, facing, roomX, roomZ*/);
			counter++;
			//constructor.buildRoom(roomWidth, roomLength, roomID, doors, facing, roomX, roomZ);
		}
	}
	
document.getElementById("myDiv2").innerHTML="check 3:: working";
	
	ajax.open("POST","../PHPScripts/getRoom.php",true);
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.setRequestHeader("Content-length", params.length);
	ajax.setRequestHeader("Connection", "close");
	ajax.send(params);			

}
function callFromKnow(string)
{
	alert(string);
}
var ding = 0;
function getFurniture(furnitureID)
{
	document.getElementById("myDiv1").innerHTML="count off: "+ding + " Pass out: " + furnitureID;
	ding++;
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