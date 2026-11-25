<?php
header("Content-Type: application/json");
date_default_timezone_set("America/Argentina/Buenos_Aires");
require_once "conexion.php";

$datos = json_decode(file_get_contents("php://input"), true);

if (empty($datos["id"])) {
    echo json_encode(["exito" => false, "mensaje" => "Falta el ID del ticket."]);
    exit;
}

$idTicketReal = preg_replace('/[^0-9]/', '', $datos["id"]);

try {
    $sqlTicket = "UPDATE ticket SET Nvl_Urgencia = ? WHERE ID_T = ?";
    $stmtTicket = $pdo->prepare($sqlTicket);
    $stmtTicket->execute([$datos["urgencia"], $idTicketReal]);

$dniParaGuardar = $datos["dniTecnico"];
if (!empty($datos["asignado"])) {
    $stmtTec = $pdo->prepare("SELECT DNI_E FROM empleados WHERE Nom_E = ?");
    $stmtTec->execute([$datos["asignado"]]);
    $tecnico = $stmtTec->fetch();
    if ($tecnico) {
        $dniParaGuardar = $tecnico["DNI_E"];
    }
}
    $sqlModifica = "INSERT INTO modifica (Fecha_Modifica, Hora_modifica, Estado, DNI_E, ID_T) VALUES (CURDATE(), CURTIME(), ?, ?, ?)";
    $stmtModifica = $pdo->prepare($sqlModifica);
    $stmtModifica->execute([$datos["estado"], $dniParaGuardar, $idTicketReal]);

    echo json_encode(["exito" => true, "mensaje" => "Ticket #{$idTicketReal} actualizado en MySQL."]);
} catch (Exception $e) {
    echo json_encode(["exito" => false, "mensaje" => "Error al gestionar el ticket: " . $e->getMessage()]);
}
?>