<?php
declare(strict_types=1);
require_once '../../util/funcoesUtil.php';
$alunos = [];

$pdo = getPDO();
try {
    $sql = "SELECT id, nome, nota1, nota2, media, grau FROM aluno";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $alunos = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    responderJSON(["erro" => "Erro ao listar alunos"], 400);
}

responderJSON($alunos, 200);