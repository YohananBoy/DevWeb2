<?php
declare(strict_types=1);
require_once '../model/funcoes.php';
require_once '../model/funcoesBD.php';
require_once '../../util/funcoes.php';

$id = (int) $_GET['id'];

$aluno = null;
$pdo = getPDO();
try {
    /**@var callable $obterPeloId */
    $aluno = $obterPeloId($id);
} catch (PDOException $e) {
    responderJSON(["erro"=>"Erro ao obter aluno"], 400);
}

responderJSON($aluno, 200);
