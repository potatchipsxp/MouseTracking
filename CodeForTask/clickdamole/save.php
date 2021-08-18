<?php
	session_start();
?>

<?php
	$data = $_POST['jsonString'];
	error_log('saving', 0);
	// error_log(print_r($_SESSION['fname'],true));
	// $f = $_SESSION['fname'];
	$f = $_SESSION['fname'];
	error_log(print_r($_SESSION['fname'],true));
	error_log('sessionabove', 0);
	error_log(print_r($f,true));
	error_log('fabove', 0);
	error_log(print_r($_POST['fname'],true));
	error_log('postabove', 0);
	error_log(print_r($_GET['fname'],true));
	error_log('getabove', 0);
	//error_log(print_r($f,true));
	$myfile = fopen($f, "a") or die ("fuckedonsaved");
	fwrite($myfile, "\n".$data);
	fclose($myfile);
?>