function display(gene1, gene2) {
	var gemates1 = getGemates(gene1);
	var gemates2 = getGemates(gene2);

	saveGenes(gemates1, gemates2);
	gemates1 = gemates1.distinct();
	gemates2 = gemates2.distinct();
	
	var tableDOM = document.getElementById("result_table");

	//table print
	var firstRow = "<tr><td>";
	for (var gemate1Index = 0; gemate1Index < gemates1.length; gemate1Index++) {
		firstRow += "<td id=" + gemate1Index + ">" + gemates1[gemate1Index] + "</td>";
	};
	firstRow += "</tr>";
	tableDOM.innerHTML = firstRow;

	var finishText = "";
	var formatForTable = function (content) {
		return "<td><a name=\'{0}\' href=\"javascript:handleSearch(\'{0}\');\">{0}</a></td>".format(content);
	};
	for (var index = 0; index < gemates2.length; index++) {
		finishText += "<tr><td>" + gemates2[index] + "</td>";
		for (var count = 0; count < gemates1.length; count++) {
			var gene = recombine(gemates1[count], gemates2[index]);
			finishText += formatForTable(gene);
		};
		finishText += "</tr>";
	};
	tableDOM.innerHTML += finishText;

	var dis = document.getElementById("distinguished");
	var unique = getDistinguishedGenes();
	unique.forEach(function (element) {
		var amark = "<a href=\"javascript:handleSearch(\'{0}\');\">{0}</a> ".format(element);
		dis.innerHTML += amark;
	}, this);
}

function getDistinguishedGenes() {
	var storage = window.localStorage;
	var genes = storage["gene"].split(',');
	return genes.distinct();
}

function saveGenes(gemates1, gemates2) {
	var genes = [];
	for (var i = 0; i < gemates1.length; i++) {
		for (var j = 0; j < gemates2.length; j++) {
			genes.push(recombine(gemates1[i], gemates2[j]));
		};
	};

	var storage = window.localStorage;
	storage["gene"] = genes;
}

function getPossibility(gene) {
	var storage = window.localStorage;
	var genes = storage["gene"].split(',');
	var total = genes.length;
	var matched = 0;
	genes.forEach(function(element){if (gene ==element) matched++;},this);
	return [matched, total];
}

function recombine(gemate1, gemate2) {
	var gene = "";
	for (var index = 0; index < gemate1.length; index++) {
		if (gemate2[index].isUpper() && (!gemate1[index].isUpper())) {
			gene += gemate2[index] + gemate1[index];
		}
		else {
			gene += gemate1[index] + gemate2[index];
		}
	};
	return gene;
}

function getGemates(gene) {
	var length = gene.length;
	var alleles = [];
	for (var i = 0; i <= length - 2; i += 2) {
		alleles.push(gene.substring(i, i + 2));
	};
	var gemates = [];
	searchGemates(0, alleles, function (result) { gemates.push(result); }, "");

	return gemates;
}


function searchGemates(index, alleles, addmethod, lastresult) {
	if (index == alleles.length)
		addmethod(lastresult);
	else {
		var allele = alleles[index];
		for (var i = 0; i < 2; i++) {
			lastresult += allele[i];
			searchGemates(index + 1, alleles, addmethod, lastresult);
			lastresult = lastresult.substring(0, lastresult.length - 1);
		};
	}
}