$(document).ready(function(){
	var kk = setInterval(
	   function(){
		   var xRam = Math.floor(Math.random()*50+3);
		   var yRam = Math.floor(Math.random()*50+5);
		   var xPx = "";
		   var yPx = "";
		   var lefNow = parseInt( $(".pig")[0].style.left.replace("px",""));
		   var topNow = parseInt( $(".pig")[0].style.top.replace("px",""));
		   
		   
		   
		  
		   if(lefNow<100 ){
			   xPx="250px"
		   }else if(xRam%2 == 0){
			   xPx = "+=" + xRam + "px";
		   }else{
			   xPx = "-=" + xRam + "px";
		   }
		   if(topNow<100 ){
		   	   yPx="250px"
		   }else if( yRam%2 ==0){
			   yPx = "+=" + yRam + "px";
				
		   }else{
			   yPx = "-=" + yRam + "px";
		   }
		   $(".pig").animate({
			   left:xPx,
			   top:yPx
		   });
	   },100);
	   $(".pig").click(function(){
		   clearInterval(kk);
		   alert("我被点中了！！！");
		   $(".pig").stop();
	   })
});