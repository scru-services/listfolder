<?php

	$project_id = 6; // same for all languages
	$project_lang =  'en';

	$project_name = $projects[$project_id][$project_lang]['title']; // case sensitive for <title> and <h1> tag
	$project_dir = 'projects/'.$projects[$project_id][$project_lang]['slug'].'/';

	$project_subdomain = get_subdomain($projects[$project_id][$project_lang]['slug']);

	$project_desc_title = 'List folder contents like a charm'; // goes into a <h2> element
	$project_desc = 'Drop any folder into the list folder contents service to display a list of all files and subfolders.'; // goes into a <p> element, no html

	$project_referrals = [1,2,3,4,5];

	// keywords for this project
	$project_keywords = array(
		'list-directory',
		'list-folder',
		'directory',
		'folder',
		'structure',
		'tree',
		'directory-tree',
		array(
			'key' => 'webkitdirectory',
			'url' => 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory',
		),
		array(
			'key' => 'webkitrelativepath',
			'url' => 'https://developer.mozilla.org/en-US/docs/Web/API/File/webkitRelativePath',
		),
		array(
			'key' => 'filelist',
			'url' => 'https://developer.mozilla.org/de/docs/Web/API/FileList',
		),
	);

	// scripts for this project, the order matters
	$project_scripts = array(
		'js/vendors/jquery.min.js',			// jquery root dir
		'js/magic.min.js', 							// javascript project dir
	);

?>
