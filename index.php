<?php

		// include the domain information from the root dir
		require '../../inc/browscap.php';
		require '../../inc/domain.php';
		require '../../inc/projects.php';

		// include the project_data from the project dir
		// check this data if you setup a new project
		require 'inc/project_data.php';

		// include the header from the root dir
		require '../../inc/header.php';

?>

	<!-- scru-service start -->

	<div class="not-supported-message">
		<h4 class="label-title">Oh snap!</h4>
		<p>Your Browser does not support this service</b>. Check out a list of compitable Browsers <a target="_blank" href="https://caniuse.com/#feat=input-file-directory">here</a>.</p>
	</div>

	<div class="dropzone">
		<h4>Select a Folder</h4>
		<form class="dropform" method="post" action="" enctype="multipart/form-data">
			<input type="file" name="files[]" id="file" webkitdirectory mozdirectory odirectory msdirectory directory multiple />
			<label for="file"><strong>Choose a folder</strong><span class="dragndrop"> or drag it here</span>.</label>
			<div class="selected-folder">
				<?php require '../../inc/components/icn-folder.php'; ?><span class="folder-name">placeholder</span>
			</div>
			<button class="button" type="submit">Upload</button>
		</form>
	</div>

	<div class="result-container" data-visibility="hidden">
		<h4>Folder Contents:</h4>
		<div class="result small align-left" contenteditable="true" onclick="document.execCommand('selectAll',false,null)">

		</div>
	</div>

	<!-- scru-service end -->

<?php

	// include the domain information from the root dir
	require '../../inc/footer.php';

?>
