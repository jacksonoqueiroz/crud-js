<?php 

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "celke";

try {
	$conn = new PDO("mysql:host=$host;dbname=" . $dbname, $user, $pass);

	//echo "Conexão realizado com sucesso!";

} catch (PDOException $err) {
	echo "Erro: Ao conectar com o banco de dados! Erro gerado:" . $err->getMessage();
}