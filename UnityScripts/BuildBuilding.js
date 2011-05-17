/*
 * BuildBuilding.js
 *
 * David Brough
 * OCDevs
 * 20/4/2011
 */

//get a handle on the object factory
var factory;

//function to set the factory
function setFactory(fabricator)
{
	factory = fabricator;
}

//wall directions and fixed adjustments
private var toWall = [new Vector3(0, 0, 1.0), new Vector3(1.0, 0, 0), new Vector3(0, 0, -1.0), new Vector3(-1.0, 0, 0)];
private var nudge = [new Vector3(0, 0, 0.5), new Vector3(0.5, 0, 0), new Vector3(0, 0, -0.5), new Vector3(-0.5, 0, 0)];

//track the rooms already in place
private var seenIt = new Array();

/*
 * First divide the parameter into useful constitutant parts and then uses those parts to create the room
 * @ param: String consisting of roomDepth : float, roomWidth : float, roomID : long, roomHubX : float, roomHubZ : float, from : int, roomDoors : Array
 */
function buildRoom (roomDetailsIn : String)
{
	//variables for detailing the room
	var roomDepth : float;
	var roomWidth : float;
	var roomHubX : float;
	var roomHubZ : float;
	
	var roomID : long;
	
	var from : int;
	
	var allDoors : String;
	
	var roomDoors = new Array(4);
	var roomDetails : Array = roomDetailsIn.Split(" "[0]);
	var doorsDivByDir : Array;
	var doorsOfWall : Array;
	var finallyDoor : Array;
	var thisDoorDetails : Array;
	
	var distToWall : Vector3;
	var roomHub : Vector3 = transform.position;
	var roomAxis: Quaternion = transform.rotation;
	
	//assign the pertinent details to the variables
	roomDepth = float.Parse(roomDetails[0]);
	roomWidth = float.Parse(roomDetails[1]);
	roomID = long.Parse(roomDetails[2]);
	roomHubX = float.Parse(roomDetails[3]);
	roomHubZ = float.Parse(roomDetails[4]);
	from = int.Parse(roomDetails[5]);
	allDoors = roomDetails[6];
	
	//add door division here
	doorsDivByDir = allDoors.Split(":"[0]);
	
	var orient = 0;
	for(dir in doorsDivByDir)
	{
		if(dir.length > 0)
		{
			roomDoors[orient] = new Array();
			
			doorsOfWall = dir.Split(";"[0]);
			
			for(thisDoor in doorsOfWall)
			{
				if(thisDoor.length > 0)
				{
					thisDoorDetails = thisDoor.Split(","[0]);
					
					roomDoors[orient].push(new Array(float.Parse(thisDoorDetails[0]), long.Parse(thisDoorDetails[1])));
				}
			}
			
			++orient;
		}
	}
	
	
	//calculate the position of the room in reference to the Avatar
	roomHub += Vector3(roomHubX, 0, roomHubZ);
	
	//update the room tracker so as not to go in circles
	seenIt.push(roomID);
	
	//instantiate the floor
	addFloor(roomID, roomWidth, roomDepth, roomHub, roomAxis);

	//instantiate the ceiling and light
	addCeiling(roomID, roomWidth, roomDepth, roomHub, roomAxis);
	
	//add the furnature *external call required here
	
	//boolean to determine if we have just come through a door to get to the next room
	var beenThere : boolean;
	
	//add the walls doors and any rooms the doors lead to
	for(var way = 0; way < 4; ++way)
	{
		//add the wall
		if (way % 2 != 0)
		{
			distToWall = toWall[way] * (roomDepth / 2) + nudge[way];
			addWall(roomDoors[way], roomWidth, distToWall, roomHub, roomAxis, way, roomID);
		}
		else
		{
			distToWall = toWall[way] * (roomWidth / 2)+ nudge[way];			
			addWall(roomDoors[way], roomDepth, distToWall, roomHub, roomAxis, way, roomID);
		}
	}
}


//creates the floor for the room
function addFloor(roomID : long, roomWidth : float, roomDepth : float, roomCenter : Vector3, roomRotation : Quaternion)
{
	var floorHandle : GameObject;
	
	floorHandle = Instantiate(factory.getItem("floor"), roomCenter + Vector3(0, -2, 0), roomRotation);
	floorHandle.transform.localScale += Vector3(roomDepth, 0.1, roomWidth);
	floorHandle.name = "floorOf" + roomID;
}


//creates the ceiling and interior light for the room
function addCeiling(roomID : long, roomWidth : float, roomDepth : float, roomCenter : Vector3, roomRotation : Quaternion)
{
	var ceilingHandle : GameObject;

	if(!Debug.isDebugBuild)
	{
		ceilingHandle = Instantiate(factory.getItem("ceiling"), roomCenter + Vector3(0, 2, 0), roomRotation);
		ceilingHandle.transform.localScale += Vector3(roomDepth, 0.1, roomWidth);	
		ceilingHandle.name = "ceilingOf" + roomID;
		
		ceilingHandle = Instantiate(factory.getItem("roomLight"), roomCenter, roomRotation);
		ceilingHandle.name = "lightFor" + roomID;
	}
}


/*
 * addWall
 * creates the walls of the room detecting if there is a door in the wall,
 * if there is this function will recalculate the centers of the walls either side of the doorway and recursivley call itself for each half
 *
 * @param doorLoc : Array - an array of doors remaining to be added to the wall ordered by position lowest to heighest
 * @param roomWidth : float - 
 * @param toThisWall : Vector3 - 
 * @param wallCenter : Vector3 - 
 * @param roomRotation : Quaternion - 
 * @param facing : int
 */
var wallNum = 0;
function addWall(doors : Array, roomWidth : float, toThisWall : Vector3 , wallCenter : Vector3,
							roomRotation : Quaternion, facing : int, roomID : long)
{
	//distance from the right hand side of the wall when facing the center of the room to the center of the wall portion
	var doorPos : float;
	var wallHandle : GameObject;

	//establish if there is a door in the wall and that the door is within acceptable parameters
	if (doors.length > 0)
	{
		var doorLoc = doors.shift();
		
		if (doorLoc[0] > 0 && doorLoc[0] < roomWidth)
		{

			//there is a door in the wall it needs to be subdivied to give it space
			var leftWallWidth : float;
			var rightWallWidth : float;		
			
			var leftWallCenter : Vector3;
			var rightWallCenter : Vector3;
			
			//have we seen the room on the other side before?
			var hasBeen : boolean = false;
			var glimpsed : boolean = false;
			
			var roomsBefore  = seenIt.toString();
			
			if(roomsBefore.IndexOf("" + doorLoc[1]) != -1)
			{
				hasBeen = true;
				
				if(roomsBefore.IndexOf("" + doorLoc[1]) > roomsBefore.IndexOf("" + roomID))
				{
					glimpsed = true;
				}
			}
			
			//calculate the door position relative to the center of the room
			doorPos = doorLoc[0] / 2 + 0.5;
			doorMod = doorLoc[0] - roomWidth / 2;
			
			//add the door and get and add the room on the other side if we have not done so yet
			if(!hasBeen || glimpsed)
			{
				//find the position of the door
				var doorCenter = wallCenter + toThisWall + toWall[(facing + 1) % 4] * doorMod;
				
				//add the door
				addDoor(doorCenter, roomRotation, facing);
				
				//external call to addRoom if the room on the other side has not been glimpsed
				if(!glimpsed)
				{
					Application.ExternalCall("getRoom", doorLoc[1], doorCenter.x, doorCenter.z, facing);
				}
			}
			
			//calculate the center and width of the left wall and then add the wall
			leftWallCenter = wallCenter + (toWall[(facing + 1) % 4] * doorPos);
			leftWallWidth = roomWidth - doorLoc[0] - 1;
			
			//place the left side of the wall
			addWall(doors, leftWallWidth, toThisWall, leftWallCenter, roomRotation, facing, roomID);
			
			//calculate the center and width of the right wall
			rightWallCenter = wallCenter + (toWall[(facing + 1) % 4] * (doorPos - roomWidth / 2 - 1));
			rightWallWidth = roomWidth - (roomWidth - doorLoc[0]) - 1;
			
			//place the right side of the wall
			addWall(doors, rightWallWidth, toThisWall, rightWallCenter, roomRotation, facing, roomID);
		}
	}
	else
	{
		//just put a solid wall there and update the number of walls
		wallHandle = Instantiate(factory.getItem("wall"), wallCenter + toThisWall, roomRotation);
		wallHandle.transform.localScale += Vector3(roomWidth - 1, 0, 0);
		wallHandle.transform.LookAt(wallCenter);
		wallHandle.name = "wallNumber" + wallNum;
		
		//update the wall count
		++wallNum;
	}
}


//indexation of the door
var doorNum = 0;
//add the door in the position and with the rotation required
function addDoor(location : Vector3, doorRot : Quaternion, facing : int)
{
	var doorHandle;
	
	//place the door
	doorHandle = Instantiate(factory.getItem("door"), location, doorRot);
	doorHandle.name = "doorNumber" + doorNum;
	
	//rotate the door to match the wall if needed
	if(facing == 1 || facing == 3)
	{
		doorHandle.transform.Rotate(Vector3.up, 90.0, Space.World);
	}
	
	//update the door count
	++doorNum;
}