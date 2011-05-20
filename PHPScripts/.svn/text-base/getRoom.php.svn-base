<?php
	$roomID = $_POST[output];
	$con = mysql_connect("alacritas","ocdevs","j0eL+K1n");

	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	  }
	mysql_select_db("ocdevs", $con);

	//Get the room template ID
	$getTemplate = "SELECT Room_Template_ID FROM Room
					WHERE Room_ID='$roomID'";
	$result1 = mysql_query($getTemplate,$con) or die(mysql_error());
	$room = mysql_fetch_array($result1);	
	$roomTemplateID = $room['Room_Template_ID'][0];
	
	//Get the rooms dimensions
	$getDimension = "SELECT * FROM Room_Template
					WHERE Room_Template_ID='{$roomTemplateID}'";					
	$result2 = mysql_query($getDimension,$con) or die(mysql_error());
	$roomTemplate = mysql_fetch_array($result2);		

	//Get the doors associated with the room
	$getDoors =  "SELECT * FROM Doors
				 WHERE Room_ID='$roomID'
				ORDER BY Wall;";
				
	$result3 = mysql_query($getDoors,$con) or die(mysql_error());

	//echo the results - length, width, wall.no, position, door_to, wallno, position, door_to...

	echo $roomTemplate['Length'];
	echo " ".$roomTemplate['Breadth'];
	while($doors = mysql_fetch_array($result3))
	{
		echo " ".$doors['Wall'];
		echo " ".$doors['Position'];
		echo " ".$doors['Room_To'];
	}
				

  mysql_close($con);
?> 