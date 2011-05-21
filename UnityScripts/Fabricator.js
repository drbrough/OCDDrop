/*
 * Fabricator.js
 *
 * David Brough
 * OCDevs
 * 11/05/2011
 *
 * A place to store the prefabs for all of the level and return then upon request
 */
 
//required prefabs for room construction
var ceiling : GameObject;
var door : GameObject;
var dull : GameObject;
var floor : GameObject;
var roomLight : GameObject;
var wall : GameObject;
var daBox : GameObject;

function getItem(ident)
{
	var handle : GameObject;
	
	switch(ident)
	{
		case "ceiling":
			handle = ceiling;
			break;
		
		case "DaBox":
			handle = daBox;
			break;
			
		case "door":
			handle = door;
			break;
			
		case "floor":
			handle = floor;
			break;
		
		case "roomLight":
			handle = roomLight;
			break;
			
		case "wall":
			handle = wall;
			break;

		default:
			handle = dull;
			break;
	}
	
	return handle;
}
