<?php
if(isset($_FILES['file']) && !empty($_FILES['file'])){
/*
	$dir = 'files/';
	move_uploaded_file($_FILES["file"]["tmp_name"],　$dir.urlencode($_FILES["file"]["name"]));
*/
	echo '{"no" : "'.$_POST['no'].'", "status" : "success"}';
}
?>
