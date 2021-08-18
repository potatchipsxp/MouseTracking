<?php
	session_start();
?>

<?php
	$data = $_POST['checkFunData'];
	error_log('checkingfun', 0);
	error_log(print_r($_POST['fname'],true));
	error_log('FNAME', 0);
	//error_log(print_r($_GET['getFilename'],true));
	error_log(print_r($_SESSION['fname'],true));

	$f = $_SESSION['fname'];
	//$f = $_GET['getFilename'];

	error_log(print_r($f,true));
	$myfile = fopen($f, "a") or die("fuckedoncheckfun");
	fwrite($myfile, "\n".$data);
	fclose($myfile);
?>
