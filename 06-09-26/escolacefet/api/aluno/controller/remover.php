<?php

declare(strict_types=1);
require_once '../../util/funcoesUtil.php';

$id = (int) $_GET['id'];

$pdo = getPDO();

try {
    $sql = "DELETE FROM aluno WHERE id = :ID";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':ID', $id, PDO::PARAM_INT);
    $stmt->execute();
} catch (PDOException $e) {
    responderJSON(["erro" => "Erro ao remover aluno {$e->getMessage()}"], 400);
}
responderJSON(null, 204);
