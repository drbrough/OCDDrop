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

//function to add the rooms to the building
function getRoom(roomID, doorX, doorZ, facing)
{
	var roomWidth;	//float: to be extracted from results set
	var roomLength;	//float: to be extracted from results set
	var roomX;		//float: to be calculated later
	var roomZ;		//float: to be calculated later
	var doorPos;	//float: to be extracted from doors[(facing+2)%4]
	
	var doors = new Array(4);//to be extracted from results set
	
	var roomDetails = new String("");	
	var doorString = new String("");
	//currently just a placeholder to put a box into the middle of the room at the default rotation
	var furnishingString = new String("");
	
	var constructor = GetUnity();
	var tempDoor;
	var useLess;
	
	//get the room details via PHP script call to the DB and populate the variables
	var ajax = new XMLHttpRequest();
	var params = "output="+roomID;
	
	for (var i=0; i<doors.length; i++)
	{
		doors[i]=new Array();
	}
	
	ajax.onreadystatechange=function()
	{
		if ((ajax.readyState==4 && ajax.status==200))
		{
			
			var room = (ajax.responseText).split(" ");//split the response string into words in an array
			
			//1st word is the length, 2nd word is breadth/width, 3rd is wall no. 4th is position, 5th is room_to, 6th is again wall no. and so on...
			roomLength = parseFloat(room[0]);
			roomWidth = parseFloat(room[1]);
			
			for (i=2; i < room.length-1; i+=3)
			{
				tempDoor = new Array(parseFloat(room[i+1]),Number(room[i+2]));
				useLess = doors[Number(room[i])].push(tempDoor);							
			}
			
			//populate other variables
			
			//the room of origin has a facing -1 handed into it so no positional information needs to be calculated for it
			if(facing > -1)
			{
				doorPos = doors[(facing+2)%4][0][0];
				
				//+ offset from center
				roomX = doorX + roomLength / 2 * toWallX[facing] + toWallX[facing] / 2 +
							toWallX[(facing + 1) % 4] * doorPos + toWallX[(facing + 3) % 4] * (roomLength / 2);
				//+ offset from center
				roomZ = doorZ + roomWidth / 2 * toWallZ[facing] + toWallZ[facing] / 2 +
							toWallZ[(facing + 1) % 4] * doorPos + toWallZ[(facing + 3) % 4] * (roomWidth / 2);
			}
			else
			{
				doorPos = 0.0;
				roomX = 0.0;
				roomZ = 0.0;
			}
			
			for (i=0; i<doors.length; i++)
			{
				
				for (j=0; j<doors[i].length;j++)
				{
					doorString += doors[i][j].join() + ";";
				}
				doorString += ":";
			}
			
			if(roomID == 0)
			{
				furnishingString = ";";
			}
			else
			{
				furnishingString = "DaBox,0,0,0;";
			}
			
			roomDetails += roomLength;
			roomDetails += (" " + roomWidth);
			roomDetails += (" " + roomID);
			roomDetails += (" " + roomX);
			roomDetails += (" " + roomZ);
			roomDetails += (" " + facing);
		
			roomDetails += (" " + doorString);
			roomDetails += (" " + furnishingString);
			
			//make the call now that we have all of the variables
			constructor.SendMessage("Avatar", "buildRoom", roomDetails);
			counter++;
		}
	}
	
	ajax.open("POST", "../PHPScripts/getRoom.php", true);
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.setRequestHeader("Content-length", params.length);
	ajax.setRequestHeader("Connection", "close");
	ajax.send(params);			
}


//debugging output function
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