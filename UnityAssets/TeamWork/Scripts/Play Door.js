
function Update ()
{
	GameObject.FindWithTag("TotalDoor").animation.Play("TriggerAnimation");//This should activate the Total Door object and then play the movement activation if the collider is triggered.
}