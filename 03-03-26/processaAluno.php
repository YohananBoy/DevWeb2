<?php
declare(strict_types=1);
require_once "alunoFunc.php";
header("Content-Type: text/html; charset=utf-8");
$aluno = [];
$aluno = $_POST;

if($aluno === [])
    resolverErros(400, "Array aluno está vazia");

if(!isset($aluno["nome"], $aluno["nota1"], $aluno["nota2"]))
    resolverErros(400, "Campos ausentes");


if($aluno["nome"] === "")
    resolverErros(400, "Campo nome vazio");

if(!is_numeric($aluno["nota1"]) || !is_numeric($aluno["nota2"]))
    resolverErros(400, "Nota precisa ser um número");

$nota1 = (float) $aluno["nota1"];
$nota2 = (float) $aluno["nota2"];

if($nota1 < 0 || $nota1 > 10 || $nota2 < 0 || $nota2 > 10)
    resolverErros(400, "Nota precisa estar entre 0 e 10");

$media = calculaMedia($nota1, $nota2);
$grau = "";
calculaGrau($media, $grau);

$aluno["media"] = $media;
$aluno["grau"] = $grau;
?>
<html>
    <body>
        <h3>Dados do aluno:</h3>
        <?php echo  "Nome: {$aluno['nome']}<br/>
                    Média: {$aluno['media']}<br/>
                    Grau: {$aluno['grau']}";
        ?>
</body>
<html>