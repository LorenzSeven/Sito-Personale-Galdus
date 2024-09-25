<?php
$titles1 = [
    "testo1" => "Titolo uno",
    "testo2" => "Titolo due",
    "testo3" => "Titolo tre",
    "testo4" => "Titolo quattro"
];

$titles2 = [
    "testo1" => "Sottotitolo uno",
    "testo2" => "Sottotitolo due",
    "testo3" => "Sottotitolo tre",
    "testo4" => "Sottotitolo quattro"
];

$titles = [
    "titoli_1" => $titles1,
    "titoli_2" => $titles2
];

echo json_encode($titles);

?>