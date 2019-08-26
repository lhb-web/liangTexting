var student01 = {
	name: "li",
	grade: "大三",
	id: "16060301",
	"class": "计算机科学与技术一班",
	"house": "17#104",
	total: 80,
	pm : function(){
		
	}
}
var student02 = {
	name: "liang",
	grade: "大三",
	id: "16060302",
	"class": "计算机科学与技术一班",
	"house": "17#104",
	total: 90,
	pm : function(){
		
	}
}
var student03 = {
	name: "zhang",
	grade: "大三",
	id: "16060303",
	"class": "计算机科学与技术一班",
	"house": "17#105",
	total: 88,
	pm : function(){
		
	}
}
var arrayTemp = [student01, student02, student03];
var x = [];
for (var i = 0; i < arrayTemp.length; i++) {
	x.push(arrayTemp[i].total);

}
x.sort(function(a, b) {
	return b - a
});

function select(sname) {
	for (var j = 0; j < arrayTemp.length; j++) {
		if (sname == arrayTemp[j].name) {
			var k = arrayTemp[j].total;
		}
	}
	for (var l = 0; l < x.length; l++) {
		if (k == x[l]) {
			console.info(sname + "是第" + (l + 1) + "名");
			break;
		}
	}
}





var x1 = arrayTemp[0].total;
var x2 = arrayTemp[0].name;
var x3 = arrayTemp[0].id;

for (var i = 1; i < arrayTemp.length; i++) {
	if (x1 < arrayTemp[i].total) {
		x1 = arrayTemp[i].total;
		x2 = arrayTemp[i].name;
		x3 = arrayTemp[i].id;
	}
}
console.info(x1, x2, x3);



var person = {
	"name": "liang",
	"age": 20,
	"brothers": [1, 2, 3],
	"father": {
		"name": "liang-father"
	},
	getfather: function() {
		return this.father
	},
	getBigBrother: function() {
		//取这个人的所有兄弟
		var tempArray = this.brothers;
		// 找出最大的那一个
		var tempBrother = 0;
		for (var i = 0; i < tempArray.length; i++) {
			if (tempArray[i] > tempBrother) {
				tempBrother = tempArray[i];
			}
		}
		return tempBrother;
	}
};
console.info("最大的兄弟是:" + person.getBigBrother());
