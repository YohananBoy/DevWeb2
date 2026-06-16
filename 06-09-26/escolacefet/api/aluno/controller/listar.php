<?php
declare(strict_types=1);
require_once '../model/funcoes.php';
require_once '../model/funcoesBD.php';
require_once '../../util/funcoes.php';
$alunos = [];

try {
    /**@var callable $listar */
    $alunos = $listar();
} catch(PDOException $e) {
    responderJSON(["erro" => "Erro ao listar alunos"], 400);
}

responderJSON($alunos, 200);