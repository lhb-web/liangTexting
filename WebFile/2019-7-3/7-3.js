var array002 = ["joun-pro", "smith-ex", "prter-new", "ady-pro", "jimy-new"];
var x = [];
for (var i = 0; i < array002.length; i++) {
	if (array002[i].indexOf("new") >= 0) {
		x.push(array002[i]);
	}
};
console.info(x);
