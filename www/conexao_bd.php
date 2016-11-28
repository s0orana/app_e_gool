<?php
//header("Access-Control-Allow-Origin: *");
//header("Content-Type:application/html;charset=UTF-8");

//conexão
$servidor = 'localhost';
$usuario = 'root';
$senha = 'Soran44a';
$banco = 'EhGoooL';

$db = new mysqli($servidor, $usuario, $senha, $banco);
if ($db->connect_error) {
die("Connection failed: " . $db->connect_error);
}else{
echo "";
}
//recuperação de dados
if($_POST['acao'] == 'cadastro'){

$nome = $_POST["cadastro_nome"];
$email = $_POST["cadastro_email"];
$senha = $_POST["cadastro_senha"];

$sql = "insert into tecnico values(NUll,'".$nome."','".$email."','".$senha."')";
$db->query($sql);
$db->close();

}


if($_POST['acao'] == 'login'){
	$email_login = $_POST["email_login_campo"];
    	$senha_login = $_POST["senha_login_campo"];
	$registros = $db->query("select * from tecnico where email = '".$email_login."' and senha = '".$senha_login."'");


	if($registros->num_rows>0){
		$json_obj = json_encode($registros, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
		echo $json_obj;
}else{
			echo "NULL";
			exit;
		}	

      
	$db->close();	

}



