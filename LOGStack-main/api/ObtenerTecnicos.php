<?php
header("Content-Type: application/json");
require_once "conexion.php";

try {
    $stmt = $pdo->query("SELECT DNI_E, Nom_E FROM empleados");
    $empleados = $stmt->fetchAll();
    
    echo json_encode($empleados);
} catch (Exception $e) {
    echo json_encode(["exito" => false, "mensaje" => "Error al obtener técnicos: " . $e->getMessage()]);
}
?>