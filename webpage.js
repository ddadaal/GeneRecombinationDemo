function apply() {
	tableClear();
	display(document.getElementById("gene1").value, document.getElementById("gene2").value);
};

function displayPossibility(gene) {
	var s = getPossibility(gene).reduce_a_fraction();
    var infoDOM = document.getElementById("info");
	highlight(gene);
	
	var info = (s[0] == 0)
		? "要搜索的基因是：{0} <br/> 不存在。".format(gene)
		: "要搜索的基因是：{0} <br/> 概率为：<br/> {1}/{2}".format(gene, s[0], s[1]);
	infoDOM.innerHTML = info;
}
function executeExample() {
	document.getElementById("gene1").value = "AABbcc";
	document.getElementById("gene2").value = "AaBbCC";
	apply();
}
function search() {
	var gene = document.getElementById("search");
	displayPossibility(gene.value);
}

function highlight(gene) {
	var storage = window.localStorage;
	
	var last_highlighted = document.getElementsByName(storage["last_highlighted"]);
	for(var i=0;i<last_highlighted.length;i++) {
		var parent = last_highlighted[i].parentNode;
		parent.style.backgroundColor="";
	}
	
	var matched = document.getElementsByName(gene);
	for(var i=0;i<matched.length;i++) {
		var parent = matched[i].parentNode;
		parent.style.backgroundColor="#DCDCDC";
	}
	storage["last_highlighted"] = gene;
}

function tableClear(){
	var storage = window.localStorage;
	storage["gene"] = "";

	var resultTable = document.getElementById("result_table");
	resultTable.innerHTML="";

	var uniques = document.getElementById("distinguished");
	uniques.innerHTML = "";
}
