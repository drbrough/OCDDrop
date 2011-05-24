using UnityEngine;
using System.Collections;

public class Click2Move : MonoBehaviour 
{

    public Transform mover; //the object being moved
    public float SnapTo = 0.5f; //how close we get before snapping to the desination
    private Vector3 destination = Vector3.zero; //where we want to move

	// Use this for initialization
	void Start ()
    {
        destination = mover.position; //set the destination to the objects position when the script is run the first time
	}
	
	// Update is called once per frame
    void Update()
    {
        //when left mouse button is pressed
        if (Input.GetMouseButtonDown(0))
        {
            Ray ray = (Camera.main.ScreenPointToRay(Input.mousePosition)); //create the ray
            RaycastHit hit; //create the var that will hold the information of where the ray hit
            
            if (Physics.Raycast(ray, out hit)) //did we hit something?
			{
                if (hit.transform.CompareTag("floor")) //did we hit the floor? David Brough: "changed to checking the tag of the target hit rather than the object name"
				{
					destination = hit.point; //set the destinatin to the vector3 where the floor was contacted
					
					destination.y = 1.0f;//lock the vertical movement
				}
			}
        }

        // move the object toward the destination
        if (Vector3.Distance(mover.position, destination) < SnapTo) //are we within snap range?
            mover.position = destination; //snap to destination
        else 
            mover.position = Vector3.MoveTowards(mover.transform.position, destination, Time.deltaTime * 5); //move toward destination
	}
}