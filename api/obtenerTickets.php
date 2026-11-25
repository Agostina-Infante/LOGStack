<?php
header("Content-Type: application/json");
require_once "conexion.php";

try {
    $sql = "SELECT 
                t.ID_T AS id,
                t.Tipo_Prob AS tipo,
                t.Descripcion AS titulo,
                t.Descripcion AS descripcion,
                t.Nvl_Urgencia AS urgencia,
                e.Nom_E AS solicitante,
                COALESCE(
                    (SELECT emp.Nom_E 
                     FROM modifica m 
                     JOIN empleados emp ON m.DNI_E = emp.DNI_E 
                     WHERE m.ID_T = t.ID_T 
                     ORDER BY m.Fecha_Modifica DESC, m.Hora_modifica DESC 
                     LIMIT 1),
                    'Sin asignar'
                ) AS asignado,
                CONCAT('Detalle ID_P: ', t.ID_P) AS detalle,
                0 AS estancado,
                t.Fecha_Creacion,
                COALESCE(
                    (SELECT m.Estado 
                     FROM modifica m 
                     WHERE m.ID_T = t.ID_T 
                     ORDER BY m.Fecha_Modifica DESC, m.Hora_modifica DESC 
                     LIMIT 1),
                    'Pendiente'
                ) AS estado
            FROM ticket t
            JOIN empleados e ON t.DNI_E = e.DNI_E";

    $stmt = $pdo->query($sql);
    $tickets = $stmt->fetchAll();

    echo json_encode($tickets, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(["exito" => false, "mensaje" => "Error al obtener los tickets: " . $e->getMessage()]);
}
?>