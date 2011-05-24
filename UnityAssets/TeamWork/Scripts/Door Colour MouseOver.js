private var originalColor; //Declairing the origional colour
var highlightMultiply = 1.50; //Increasing the colour variable.

function OnMouseOver() { 
    var dist = Vector3.Distance(GameObject.FindWithTag("Player").transform.position, transform.position);//Find the distance from the Total Door object as a location and set this as dist
    if(dist < 3.2){//If Dist is less than 3.2, highlight the door by increasing the radience.
        renderer.material.color.g = originalColor.g*highlightMultiply;
        renderer.material.color.b = originalColor.b*highlightMultiply; 
        renderer.material.color.r = originalColor.r*highlightMultiply;
    }
}

function OnMouseExit() {//if mouse over is no longer selected then change back to the origional colour.
    renderer.material.color = originalColor;
    
}