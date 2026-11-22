<?php
header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);
$usuario = $datos["usuario"];
$password = $datos["password"];

if (empty($usuario) || empty($password)) { /*el if valida que no estén vacíos (empty=vacío)*/
    echo json_encode([
        "exito" => false,
        "mensaje" => "Debe ingresar usuario y contraseña."
    ]);
    exit;
}

// SIMULACIÓN DE BASE DE DATOS (hasta tener la base de datos en mYSQL)
if ($usuario === "pepito" && $password === "1234") {
    $mensaje = "Bienvenido/a $usuario. Acceso concedido.";
    echo json_encode([
        "exito" => true,
        "mensaje" => $mensaje,
        "nombreCompleto" => "Pepito Flores",
        "departamento" => "Desarrollo"
    ]);
}