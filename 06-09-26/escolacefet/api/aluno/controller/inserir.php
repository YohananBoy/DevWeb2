<?php
declare(strict_types=1);
require_once '../model/funcoesAluno.php';
require_once '../../util/funcoesUtil.php';

$info = file_get_contents('php://input');
$aluno = json_decode($info, true);

$nota1 = (float) $aluno['nota1'];
$nota2 = (float) $aluno['nota2'];
$media = obterMedia($nota1, $nota2);
$grau = obterGrau($media);
$aluno['media'] = $media;
$aluno ['grau'] = $grau;
$pdo = getPDO();
try {
    $sql = "INSERT INTO aluno (nome, nota1, nota2, media, grau)
    VALUES (:NOME, :NOTA1, :NOTA2, :MEDIA, :GRAU)";
    $stmt = $pdo->prepare($sql);

    $stmt->bindValue(':NOME', $aluno['nome'], PDO::PARAM_STR);
    $stmt->bindValue(':NOTA1', $aluno['nota1'], PDO::PARAM_STR);
    $stmt->bindValue(':NOTA2', $aluno['nota2'], PDO::PARAM_STR);
    $stmt->bindValue(':MEDIA', $aluno['media'], PDO::PARAM_STR);
    $stmt->bindValue(':GRAU', $aluno['grau'], PDO::PARAM_STR);

    $stmt->execute();
} catch(PDOException $e) {
    $codErro = $e->errorInfo[1];
    if($codErro == 1062)
        responderJSON(["erro" => "Erro de violação de primary key para aluno"], 400);
    elseif($codErro == 1265)
        responderJSON(["erro" => "Erro de violação de um campo enum para aluno"], 400);
    elseif($codErro == 4025)
        responderJSON(["erro" => "Erro de violação de regra(s) check para aluno"], 400);
    else
        responderJSON(["erro" => "Erro ao inserir aluno"], 400);
}
responderJSON($aluno, 201);