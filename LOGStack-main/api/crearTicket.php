<?php
header("Content-Type: application/json");
require_once "conexion.php";

$datos = json_decode(file_get_contents("php://input"), true);

if (empty($datos["titulo"])) {
    echo json_encode(["mensaje" => "Error: Debe ingresar un asunto o descripción breve."]);
    exit;
}

$stmtEmp = $pdo->prepare("SELECT DNI_E FROM empleados WHERE Nom_E = ?");
$stmtEmp->execute([$datos["solicitante"]]);
$empleado = $stmtEmp->fetch();
$dniEmpleado = $empleado ? $empleado["DNI_E"] : 1; 

$idP = 1;

$sql = "INSERT INTO ticket (DNI_E, Descripcion, Nvl_Urgencia, Tipo_Prob, Fecha_Creacion, ID_P) VALUES (?, ?, 'Bajo', ?, CURDATE(), ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    $dniEmpleado,
    $datos["descripcion"] ?? $datos["titulo"],
    $datos["tipo"],
    $idP
]);

$idNuevoID = $pdo->lastInsertId();

echo json_encode(["mensaje" => "¡Ticket TK-0{$idNuevoID} registrado con éxito en MySQL!"]);
?>
