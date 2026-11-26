<?php
header("Content-Type: application/json");
require_once "conexion.php";

try {
    $stmt = $pdo->query("SELECT ID_P, Nom_P FROM proyectos");
    $proyectos = $stmt->fetchAll();
    
    echo json_encode($proyectos);
} catch (Exception $e) {
    echo json_encode(["exito" => false, "mensaje" => "Error al obtener proyectos: " . $e->getMessage()]);
}
?>