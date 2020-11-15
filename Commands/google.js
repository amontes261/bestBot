
function googleSwitch(msgSplitUpper, errFile, message){
    errFile.missingNewFeature(message); // temporary until works
	return; //temporary until works
    var textToSearch = '';
    for (var i = 1; i < msgSplitUpper.length; i++){
        textToSearch += msgSplitUpper[i];
        if (i != msgSplitUpper.length - 1)
            textToSearch += ' ';
    }

    google.resultsPerPage = 50;
    var nextCounter = 0;
    google(textToSearch, function (err, res){
        if (err) console.error(err)
        
        for (var i = 0; i < res.links.length; i++) {
            var link = res.links[i];
            console.log (res.links);
            console.log(link.title + ' - ' + link.href)
            console.log(link.description + "\n")
        }
        
        if (nextCounter < 4) {
            nextCounter += 1
            if (res.next) res.next()
        }
    })
}


// ============= //
// MODULE EXPORT //
// ============= //

module.exports = { googleSwitch };