<?php
header("Content-Type: application/json");
require_once "conexion.php";

$datos = json_decode(file_get_contents("php://input"), true);
$usuario = $datos["usuario"] ?? "";
$password = $datos["password"] ?? "";

if (empty($usuario) || empty($password)) {
    echo json_encode(["exito" => false, "mensaje" => "Debe ingresar usuario y contraseña."]);
    exit;
}

$sql = "SELECT e.*, d.Nom_Dtpo FROM empleados e 
        JOIN departamentos d ON e.ID_Dpto = d.ID_Dptos 
        WHERE e.Usuario = ? AND e.Contrasena = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$usuario, $password]);
$empleado = $stmt->fetch();

if ($empleado) {
    $esSoporte = ($empleado["Nom_Dtpo"] === "Soporte");
    echo json_encode([
        "exito" => true,
        "mensaje" => "Bienvenido/a {$empleado['Nom_E']}. Acceso concedido.",
        "nombreCompleto" => $empleado["Nom_E"],
        "departamento" => $empleado["Nom_Dtpo"],
        "dni" => $empleado["DNI_E"],
        "tel" => $empleado["Tel_E"],
        "mail" => $empleado["Mail_E"],
        "IdDpto" => $empleado["ID_Dpto"],
        "esSoporte" => $esSoporte
    ]);
} else {
    echo json_encode(["exito" => false, "mensaje" => "Credenciales incorrectas."]);
}
?>
