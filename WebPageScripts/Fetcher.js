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
	var tempDoor;
	var useLess;
	//get the room details via PHP script call to the DB and populate the variables
	document.getElementById("myDiv2").innerHTML="asdf";
	var ajax = new XMLHttpRequest();
	var params = "output="+roomID;
	
	for (var i=0; i<doors.length; i++)
	{
		doors[i]=new Array();
	}
	
	ajax.onreadystatechange=function()						//NOT TESTED BUT SHOULD WORK
	{
		if ((ajax.readyState==4 && ajax.status==200))
		{
			
			var room = (ajax.responseText).split(" ");		//split the response string into words in an array
			
			//1st word is the length, 2nd word is breadth/width, 3rd is wall no. 4th is position, 5th is room_to, 6th is again wall no. and so on...
			
			roomLength = room[0];	
			roomWidth = room[1];
			
			for (i=2; i<room.length-1; i+=3)
			{
				tempDoor = new Array(Number(room[i+1]),Number(room[i+2]));
				useLess = doors[Number(room[i])].push(tempDoor);							
			}
			
			//populate other variables
			if(facing > -1)
			{
				doorPos = doors[(facing+2)%4][0][0];
				
				roomX = doorX + roomWidth / 2 * toWallX[facing] + toWallX[facing] / 2 +
							toWallX[(facing + 1) % 4] * doorPos + toWallX[(facing + 3) % 4] * roomWidth / 2;//+ offset from center
							
				roomZ = doorZ + roomLength / 2 * toWallZ[facing] + toWallZ[facing] / 2 +
							toWallZ[(facing + 1) % 4] * doorPos + toWallZ[(facing + 3) % 4] * roomLength / 2;//+ offset from center
			}
			else
			{
				doorPos = 0;
				roomX = 0;
				roomZ = 0;
			}
			
			for (i=0; i<doors.length; i++)
			{
				
				for (j=0; j<doors[i].length;j++)
				{
					doorString += doors[i][j].join() + ";";
				}
				doorString += ":";
			}
			//calculate the center of the new room in relation the Avatar's origional position
			
			roomDetails += roomLength;
			roomDetails += (" " + roomWidth);
			roomDetails += (" " + roomID);
			roomDetails += (" " + roomX);
			roomDetails += (" " + roomZ);
			roomDetails += (" " + facing);
		
			roomDetails += (" " + doorString);
			
			//make the call now that we have all of the variables
			
			constructor.SendMessage("Avatar", "buildRoom", roomDetails);
			document.getElementById("myDiv").innerHTML=roomDetails;
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