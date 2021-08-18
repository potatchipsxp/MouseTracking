<?php
	session_start();
	error_log('inphpuno', 0);

?>

<?php
	error_log('inphphpdos', 0);
	$data = $_POST['dataString'];
	$f = $_POST['fname'];
	$_SESSION['fname'] = $_POST['fname'];
	error_log(print_r($f,true));
	error_log('workbitch', 0);
	$myfile = fopen($f, "a") or die("didnt fucking work");
	fwrite($myfile, "\n".$data);
	fclose($myfile);
	return json_encode($f)
?>
