// 'use strict'
// 
// const events = require('events');
// // 创建eventEmitter对象
// var eventEmitter = new events.EventEmitter();
// // 声明事件
// eventEmitter.on('xxxxxxxxxxxxxxxff', function() {
// 	console.info(new Date().toLocaleString());
// });
// console.info("2秒后出发事件");
// setTimeout(function() {
// 	// 触发事件
// 	eventEmitter.emit('xxxxxxxxxxxxxxxff');
// }, 2000);

//课堂练习:写一个计时器,每2秒的触发某事件,这个事件的响应式,打印当前事件的字符串,打印五次以后,触发另一个事件,变成打印当前事件字符串的毫秒数,又打印五次后,恢复成打印事件字符串.打印五次以后，输出“停止输出”，并关掉计时器
'use strict'
const events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('TheDateOf', function() {
	console.info(new Date().toLocaleString());
});
eventEmitter.on('millisecond', function() {
	console.info(new Date().getTime());
});
var counter01 = 0;
var timer = setInterval(function() {
	counter01 ++;
	if( counter01 <= 5){
		eventEmitter.emit('TheDateOf');
	}else if( counter01 >5 && counter01<=10){
		eventEmitter.emit('millisecond');
	}else if(counter01 > 10 && counter01<=15){
		eventEmitter.emit('TheDateOf');
	}else if( counter01 >15){
		console.info("停止输出");
		clearInterval(timer);
	}
	
}, 2000);
