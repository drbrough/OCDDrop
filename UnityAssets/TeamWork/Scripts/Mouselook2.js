

//Variables--------------------------------------------------------------------------------------------------------------------------------------------------------

// What are we going to rotate

var RotationAxisX : boolean = false;

var RotationAxisY : boolean = false;

var RotationAxisXandY : boolean = false;

 

// What is Our Sensitivity

var SensitivityX : float = 5F;

var SensitivityY : float = 5F;

//What is our maximum/minimum rotation for X

var minimumX : float = -360F;

var maximumX : float = 360F;

 

//what is our maximum/minimum rotation for Y

var minimumY : float = -60F;

var maximumY : float = 60F;

 

// Our Input

var XInput : float = 0F;

var YInput : float = 0F;

var XInputOld : float = 0F;

var YInputOld : float = 0F;

 

//Our Average Input

var averageXInput : float = 0F;

var averageYInput : float = 0F;

 

//Our Rotation Value

var rotationX : float = 0F;

var rotationY : float = 0F;

 

//Our original Rotaition

var originalRotation : Quaternion;

 

//////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Functions------------------------------------------------------------------------------------------------------------------------------------------------------

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

if(RotationAxisXandY)

{

//befor we start what are the new old inputs

XInputOld = XInput;

YInputOld = YInput;

//What is the mouse inputing

XInput = Input.GetAxis("Mouse X") * SensitivityX;

YInput = Input.GetAxis("Mouse Y") * SensitivityY;

//The Average Input for turning

averageXInput = XInput + XInputOld;

averageYInput = YInput + YInputOld;

averageXInput *= 0.5F;

averageYInput *= 0.5F;

//Finding how mutch we are rotaing

rotationX += averageXInput;

rotationY += averageYInput;

//Making Sure we dont get wound up

rotationX = ClampAngle(rotationX, minimumX, maximumX);

rotationY = ClampAngle(rotationY, minimumY, maximumY);

//Final character Rotate Values

var xQuaternion1 = Quaternion.AngleAxis (rotationX, Vector3.up);

var yQuaternion1 = Quaternion.AngleAxis (rotationY, Vector3.left);

//take the final values and make the character rotate

transform.localRotation = originalRotation * xQuaternion1 * yQuaternion1;

}

else if(RotationAxisX)

{

//before we start new old inputs

XInputOld = XInput;

//Read new Inputs

XInput = Input.GetAxis("Mouse X") * SensitivityX;

//The average X Inputs

averageXInput = XInput + XInputOld;

averageXInput *= 0.5F;

//How Mutch To rotate

rotationX += averageXInput;

//clamp the rotation

rotationX = ClampAngle(rotationX, minimumX, maximumX);

//Final rotation values

var xQuaternion2 = Quaternion.AngleAxis ( rotationX, Vector3.up);

//take the final values and make the character rotate

transform.localRotation = originalRotation * xQuaternion2;

}

else

{

//before we start new old inputs

YInputOld = YInput;

//Read new Inputs

YInput = Input.GetAxis("Mouse Y") * SensitivityY;

//The average X Inputs

averageYInput = YInput + YInputOld;

averageYInput *= 0.5F;

//How Mutch To rotate

rotationY += averageYInput;

//clamp the rotation

rotationY = ClampAngle(rotationY, minimumY, maximumY);

//Final rotation values

var yQuaternion3 = Quaternion.AngleAxis (rotationY, Vector3.left);

//take the final values and make the character rotate

transform.localRotation = originalRotation * yQuaternion3;

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