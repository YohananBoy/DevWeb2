<?php
declare(strict_types=1);
require_once 'imcFunc.php';
header("Content-Type:application/json;charset=UTF-8");
$info = file_get_contents('php://input');
$dados = json_decode($info, true);

if( !$dados)
    responder(400, [ "erro" => "Problemas de conversão com JSON."]);

if( ! isset($dados['nome'], $dados['peso'], $dados['altura']) )
    responder(400, [ "erro" => "Nem todos os valores vieram."]);

if( $dados['nome'] === "")
    responder(400, [ "erro" => "O nome precisa ser preenchido."]);

if( ! ( is_numeric($dados['peso']) && is_numeric($dados['altura']) ) )
    responder(400, [ "erro" => "Peso e altura precisam conter valores numéricos."]);

$peso = (float) $dados['peso'];
$altura = (float) $dados['altura'];

if( $peso < 10 || $peso > 300 || $altura < 0.30 || $altura > 2.50)
    responder(400, [ "erro" => "Valores inseridos não suportados."]);

$nome = $dados['nome'];
$imc = obterImc($altura, $peso);
$classificacao = obterClassificacao($imc);

$dados["imc"] = $imc;
$dados["classificacao"] = $classificacao;

responder(200, $dados);