function apply() {
	tableClear();
	display(document.getElementById("gene1").value, document.getElementById("gene2").value);
};

function handleSearch(input){
	if (!document.getElementById("multichoose").checked)
		tableInitialize();
	if (input.indexOf(",")>-1)
		input.split(",").forEach(function(element){displayPossibility(element.trim())},this);
	else{
		displayPossibility(input);
	}

}

function displayPossibility(gene){
	var possibility = getPossibility(gene).reduce_a_fraction();
    var infoDOM = document.getElementById("info");
	highlight(gene);
	var row = "<tr><td>{0}</td><td>{1}</td></tr>".format(
		gene,
		possibility[0]==0 ?"0" :"{0}/{1}".format(possibility[0],possibility[1]));
	infoDOM.innerHTML +=  row;
}

function executeExample() {
	document.getElementById("gene1").value = "AABbcc";
	document.getElementById("gene2").value = "AaBbCC";
	apply();
}
function search() {
	var gene = document.getElementById("search");
	handleSearch(gene.value);
}

function highlight(gene) {
	var matched = document.getElementsByName(gene);
	for(var i=0;i<matched.length;i++) {
		var parent = matched[i].parentNode;
		parent.style.backgroundColor="#DCDCDC";
	}
}

function tableInitialize(){
	var possibilityChart = document.getElementById("info");
	possibilityChart.innerHTML = "<tr><td>基因</td><td>概率</td></tr>";
	
	var rows = document.getElementById("result_table").rows;
	for (var i=0;i<rows.length;i++){
		for (var j=0;j<rows[i].cells.length;j++){
			rows[i].cells[j].style.backgroundColor = "";
		}
	}
}

function tableClear(){
	var storage = window.localStorage;
	storage["gene"] = "";

	var resultTable = document.getElementById("result_table");
	resultTable.innerHTML="";

	var uniques = document.getElementById("distinguished");
	uniques.innerHTML = "";
}
