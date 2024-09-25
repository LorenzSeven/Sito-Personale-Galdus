<?php
	$portfolio=[
		["img" => "1", "name"=>"Threads", "description"=>"Illustration"],
		["img" => "2", "name"=>"Explore", "description"=>"Graphic Design"],
		["img" => "3", "name"=>"Finish", "description"=>"Identity"],
		["img" => "4", "name"=>"Lines", "description"=>"Branding"],
		["img" => "5", "name"=>"Southwest", "description"=>"Website Design"],
		["img" => "6", "name"=>"Window", "description"=>"Photography"]
	];
	
	shuffle($portfolio); //mescola gli elementi in modo casuale
	$sequence=array_slice($portfolio,0, 9); //restituisce i primi tre elementi dell'array $portfolio
	echo json_encode($sequence);
?>