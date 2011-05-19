
function Start ()
{
	//Ensure that the Avatar is in the correct position to allow level creation
	transform.position = Vector3(0, 0, 0);
	
	//Application.ExternalCall("getVar");
	//Application.ExternalCall("callBack");
	var constructor  =  GetComponent(BuildBuilding);
	
	constructor.setFactory(GetComponent(Fabricator));
	
	//var test =  "10 8 0 0 0 -1 :;:;:;:;";//"10 8 0 0 0 -1 :7.0,3;:3.0,2;:2.0,1;:5.0,5;";
	//				10 8 0 0 0 -1 :7.0,3;:3.0,2;:2.0,1;:5.0,5;
		
	//roomDepth : float, roomWidth : float, roomID : long, roomHubX : float, roomHubZ : float, from : int, roomDoors : Array
	//constructor.buildRoom(test);
	
	//echo("Pingo!! was his name O!");
	//transform.position += Vector3(0, 10, 0);
	//transform.LookAt(Vector3(0,0,0));	
	Application.ExternalCall("getRoom", 0, 0, 0, -1);	

	
}

function echo(peat)
{
	Application.ExternalCall("feedback", peat);
}