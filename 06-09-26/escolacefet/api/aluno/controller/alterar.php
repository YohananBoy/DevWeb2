<?php
declare(strict_types=1);
require_once '../model/funcoes.php';
require_once '../model/funcoesBD.php';
require_once '../../util/funcoes.php';

$info = file_get_contents('php://input');
$aluno = json_decode($info, true);

$nota1 = (float) $aluno['nota1'];
$nota2 = (float) $aluno['nota2'];
$media = obterMedia($nota1, $nota2);
$grau = obterGrau($media);
$aluno['media'] = $media;
$aluno ['grau'] = $grau;
try {
    /**@var callable $alterar */
    $alterar($aluno);
} catch(PDOException $e) {
    $codErro = $e->errorInfo[1];
    if($codErro == 1062)
        responderJSON(["erro" => "Erro de violação de primary key para aluno"], 400);
    elseif($codErro == 1265)
        responderJSON(["erro" => "Erro de violação de um campo enum para aluno"], 400);
    elseif($codErro == 4025)
        responderJSON(["erro" => "Erro de violação de regra(s) check para aluno"], 400);
    else
        responderJSON(["erro" => "Erro ao alterar aluno"], 400);
}
responderJSON($aluno, 200);