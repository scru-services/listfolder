var tempFiles;
var handleFiles;
var resultContainer = $('.result-container div[contenteditable]');

var isFileReaderSupported = function() {
  return 'FormData' in window && 'FileReader' in window;
};

var isInputDirSupported = function() {
    var tmpInput = document.createElement('input');
    if ('webkitdirectory' in tmpInput
        || 'mozdirectory' in tmpInput
        || 'odirectory' in tmpInput
        || 'msdirectory' in tmpInput
        || 'directory' in tmpInput) return true;

    return false;
}

var isDragSupported = function() {
	var div = document.createElement('div');
   return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div));
}

var dropZone = $('.dropzone');
var dropForm = $('.dropform');

if (!isFileReaderSupported()) {
	console.log('filereader not supported');
}

if (!isInputDirSupported()) {
	console.log('inputdir not supported');
}

if (!isDragSupported()) {
	console.log('dragging not supported');
}

var printDirectory = function(data, target) {

	for (var item in data) {

		if (item != 'timestamp') {

			var directory = data[item];
			var directoryName = item;
			target.prepend('<span class="directory-title">Directory List of ' + item + ':</span></br>');
			resultContainer.prepend('<span>Legend:</span></br><ul><li>circle: file</li><li class="directory">square: directory</li></ul></br>');

		} else {

			target.prepend('<span class="timestamp">Scan Time:</span></br>' + data[item] + '</br></br>');

		}

	}

	function printDir(dirName, dir) {

		if (path == dirName + '/') {

			if ($('ul[data-path="' + path + '"]').length == 0) {

				target.append('<ul data-directory="' + dirName + '" data-path="' + path + '"></ul>')
				targetUl = $('ul[data-path="' + path + '"]');

			}

		} else {

			if ($('ul[data-path="' + path + '"]').length == 0) {

				targetUl.append('<li class="directory"><span class="directory-name">' + dirName + '</span><ul data-directory="' + dirName + '" data-path="' + path + '"></ul></li>')
				targetUl = $('ul[data-path="' + path + '"]');

			}

		}

		for (var item in dir) {

			if ($.type(dir[item]) == 'object') {

				path += item + '/';

				printDir(item, dir[item]);

				path = path.substring(path.length - item.length - 1, -1);
				targetUl = $('ul[data-path="' + path + '"]');

			} else {

				targetUl.append('<li class="file">' + item + '</li>');
				// console.log(item + ' in ' + path);

			}

		}

	}

	var path = directoryName + '/';
	printDir(directoryName, directory);

}

var createDirectoryArray = function(paths) {

	// get timestamp
	var timestamp = new Date();

	// if paths exist
	if (paths) {

		// sort paths alphabetically
		paths.sort();

		// get root directory name (first part of file-path)
		var directoryName = paths[0].split('/');
		directoryName = directoryName[0];

		// create directory tree as array
		var dirTree = {};
		dirTree[directoryName] = {};
		dirTree.timestamp = timestamp;
		var set = dirTree;

		var location = [directoryName];
		var lastLocation = location;

		for (var x = 0; x < paths.length; x++) {

			var pathString = paths[x];
			var dirArray = pathString.split('/');
			location = dirArray;

			// returns last item in array and delets it
			var fileName = dirArray.pop();

			for (var y = 0; y < location.length; y++) {

				key = location[y].toString();

				if (!set[key]) {
					set[key] = {};
				}

				set = set[key];
				// console.log(set);

			}

			set[fileName] = fileName;

			set = dirTree;
			lastLocation = location;

		}

		return dirTree;

	} else {

		console.log('no file-paths found');
		return false;

	}

}

if (isFileReaderSupported() && isInputDirSupported() && isDragSupported()) {

	dropForm.addClass('has-advanced-upload');

	$('#file').on('change', function(event) {

		var files = event.target.files;

		// display folder name in dropzone
		var directoryName = files[0].webkitRelativePath;
		directoryName = directoryName.split('/');
		directoryName = directoryName[0];

		dropForm.addClass('has-directory');
		dropForm.find('.selected-folder .folder-name').text(directoryName.substring(0, $(this).width() / 20) + '…');

		// collect file paths in pathArray and sort the paths
		var pathArray = new Array();

		for (var i = 0; i < files.length; i++) {
			pathArray.push(files[i].webkitRelativePath);
		}

		var dirTree = createDirectoryArray(pathArray);
		resultContainer.text('');
		console.log(dirTree);
		printDirectory(dirTree, resultContainer);

		if (resultContainer.text != '') {
			resultContainer.parent().attr('data-visibility', 'visible');
		} else {
			resultContainer.parent().attr('data-visibility', 'hidden');
			dropForm.removeClass('has-directory');
		}

	});

} else {
	$('body').addClass('not-supported');
	//$.getScript('//cdn.jsdelivr.net/caniuse-embed/1.1.0/caniuse-embed.min.js');
}

resultContainer.on( "focusout", function() {
	if ($(this).text() == '') {
		$(this).parent().attr('data-visibility', 'hidden');
		dropForm.removeClass('has-directory');
	}
});


//(function($) {
//}(jQuery));
