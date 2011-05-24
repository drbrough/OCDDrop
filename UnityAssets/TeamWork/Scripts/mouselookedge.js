

//Variables--------------------------------------------------------------------------------------------------------------------------------------------------------


// What are we going to rotate

var PanAxisX : boolean = false;

var PanAxisY : boolean = false;

var PanAxisXandY : boolean = false;

 

// What is Our Sensitivity

var SensitivityX : float = 5F;

var SensitivityY : float = 5F;

//What is our maximum/minimum rotation for X

var minimumX : float = -360F;

var maximumX : float = 360F;

 

//what is our maximum/minimum rotation for Y

var minimumY : float = -60F;

var maximumY : float = 60F;



// edges for camera rotation
var panEdgeX : float = .10F ;
var panEdgeY : float = .10F ;

 

//////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Functions------------------------------------------------------------------------------------------------------------------------------------------------------

/*
function OnGUI () {

//var edge =   
GUI.Box (Rect(0,0,Screen.width*panEdgeX, Screen.height),"");
GUI.Box (Rect(0,0,Screen.width , Screen.height*panEdgeY),"");
GUI.Box (Rect(Screen.width-(Screen.width*panEdgeX) ,0,Screen.width*panEdgeX, Screen.height),"");
GUI.Box (Rect(0,Screen.height*panEdgeY * 9,Screen.width, Screen.height*panEdgeY),"");
}
*/
//Set rotaion on start/ freeze Rigidbody+++++++++++++++++++++++++++++++++++

function Start()

{

if(rigidbody)

rigidbody.freezeRotation = true;

originalRotation = transform.localRotation;

}

 

//Do the math to calculate Rotation for X and/or Y+++++++++++++++++++++++++

function Update ()

{

if(PanAxisXandY)

{



//test for edges
var mousex = Input.mousePosition.x ;
var mousey = Input.mousePosition.y ;
if (  mousex < Screen.width*panEdgeX)
	{
		transform.Rotate(0, -10 *Time.deltaTime*SensitivityX,0,Space.World);
	}
if (  mousex > Screen.width*(panEdgeX * 9))
	{
		transform.Rotate(0, 10 *Time.deltaTime*SensitivityX,0,Space.World);
	}
if (  mousey < Screen.height*panEdgeY )
	{
		if (mousex > Screen.width*panEdgeX)
		{
			if ( mousex < Screen.width-panEdgeX )
			{
				transform.Rotate(10 *Time.deltaTime*SensitivityY,0,0,Space.Self);
			}
		}	
	}
if (  mousey > Screen.height*(panEdgeY * 9))
	{
	if (mousex > Screen.width*panEdgeX)
		{
			if ( mousex < Screen.width*(panEdgeX * 9))
			{
				transform.Rotate(-10 *Time.deltaTime*SensitivityY,0,0,Space.Self);
			}
		}	
		
	}

}

else if(PanAxisX)

{



var mousexx = Input.mousePosition.x ;

if (  mousexx < Screen.width*panEdgeX)
	{
		transform.Rotate(0, -10 *Time.deltaTime*SensitivityX,0,Space.World);
	}
if (  mousexx > Screen.width*(panEdgeX * 9))
	{
		transform.Rotate(0, 10 *Time.deltaTime*SensitivityX,0,Space.World);
	}

}

else if (PanAxisY)

{


var mousexy = Input.mousePosition.x ;
var mouseyy = Input.mousePosition.y ;
if (  mouseyy < Screen.height*panEdgeY )
	{
		if (mousexy > Screen.width*panEdgeX)
		{
			if ( mousexy < Screen.width*(panEdgeX * 9))
			{
				transform.Rotate(10 *Time.deltaTime*SensitivityY,0,0,Space.Self);
			}
		}	
	}
if (  mouseyy > Screen.height*(panEdgeY * 9))
	{
	if (mousexy > Screen.width*panEdgeX)
		{
			if ( mousexy < Screen.width*(panEdgeX * 9))
			{
				transform.Rotate(-10 *Time.deltaTime*SensitivityY,0,0,Space.Self);
			}
		}	
		
	}

}

}

 

 

//Make The clamp for above+++++++++++++++++++++++++++++++++++++++++++++++

function ClampAngle(angle : float, min : float, max : float)

{

if(angle < -360F)

angle += 360F;

if(angle > 360F)

angle -= 360F;

return Mathf.Clamp(angle, min, max);

}