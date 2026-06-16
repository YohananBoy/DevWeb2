<?php
declare(strict_types=1);
require_once '../model/funcoes.php';
require_once '../model/funcoesBD.php';
require_once '../../util/funcoes.php';

$id = (int) $_GET['id'];


try {
    /**@var callable $remover */
    $remover($id);
} catch (PDOException $e) {
    responderJSON(["erro" => "Erro ao remover aluno {$e->getMessage()}"], 400);
}
responderJSON(null, 204);
