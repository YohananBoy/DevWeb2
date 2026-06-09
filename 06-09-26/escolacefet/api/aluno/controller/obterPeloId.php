<?php

declare(strict_types=1);
require_once '../model/funcoesAluno.php';
require_once '../../util/funcoesUtil.php';

$id = (int) $_GET['id'];

$aluno = null;
$pdo = getPDO();
try {
    $sql = "SELECT id, nome, nota1, nota2, media, grau FROM aluno WHERE id = :ID";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":ID", $id, PDO::PARAM_INT);
    $stmt->execute();
    $aluno = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    responderJSON(["erro"=>"Erro ao obter aluno"], 400);
}

responderJSON($aluno, 200);
