var HW = 3;
function baozouShow(){//核武
	if(HW>0){
		var djbj = new Hilo.Sprite({
			frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-7", document.getElementById("bz1"), 56, 56, true),
			x: -10,
			y: 0,
			scaleX:8,
			scaleY:8,
			interval: 2,
			timeBased: false,
			loop: false,
		}).addTo(stage);
		containerDJ.removeAllChildren();
		djbj.setFrameCallback(7,function(){
			this.removeFromParent();
		});
		HW--;
	}
}
function reset() { //重启游戏
	//	djList = new Array();//敌机序列removeFromParent()
	//	clearInterval(timeOutDJ);
	//	clearInterval(timeOutZD);
	//	stage.removeFromParent();
	//	container.removeAllChildren();
	//	containerDJ.removeAllChildren();
	//	container.removeFromParent();
	//	containerDJ.removeFromParent();
	//	containerEle.innerHTML = "";
	//	title.innerHTML = "0";
	//	Hilo.Tween.removeAll();
	////	Hilo.Tween = null;
	//	stage = null;//绘制舞台
	//	ticker = null;//绘制时间轴
	//	containerDJ = null;//敌方舞台
	//	container = null;//飞机舞台
	//	DF = 0;//当前得分
	location.reload(false);
	//	init();/
}

function init() {
	//绘制舞台
	stage = new Hilo.Stage({
		renderType: 'canvas',
		container: containerEle,
		width: winWidth,
		height: winHeight,
		scaleX: window.screen.availWidth / winWidth,
		scaleY: window.screen.availHeight / winHeight,
	});
	stage.enableDOMEvent([Hilo.event.POINTER_START, Hilo.event.POINTER_MOVE, Hilo.event.POINTER_END]);
	//start stage ticker
	ticker = new Hilo.Ticker(20);
	ticker.addTick(stage);
	ticker.addTick(Hilo.Tween); //添加缓动
	ticker.start();
	//地图舞台
	var containerMAP = new Hilo.Container({
		x: 0,
		y: 0,
		width: winWidth,
		height: winHeight
	}).addTo(stage);
	//敌方舞台
	containerDJ = new Hilo.Container({
		x: 0,
		y: 0,
		width: winWidth,
		height: winHeight
	}).addTo(stage);
	//飞机舞台
	container = new Hilo.Container({
		x: winWidth / 2,
		y: winHeight - 180,
		width: 20,
		height: 80,
//				background:'red'
	}).addTo(stage);

	//子弹舞台
	containerZD = new Hilo.Container({
		x: 0,
		y: 0,
		width: 20,
		height: 80,
//				background:'red'	
	}).addTo(container);
	switch(ZJtype){
		case 1:
			new Hilo.Sprite({   //凤凰
				frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-10", document.getElementById("fj-1"), 171, 196, true),
				x: -75,
				y: -35,
				interval: 2,
				timeBased: false,
				loop: true,
			}).addTo(container);
			mapShow(containerMAP, './image/img_bg_level_5.jpg',15000);
			break;
		case 2:
				new Hilo.Bitmap({  //飞机静态图片
					image: './image/feji.png',
					rect: [0, 182, 90, 90],
					x: -35,
					y: -10,
				}).addTo(container);
				new Hilo.Sprite({  //	飞机火焰动态图
						frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-1", document.getElementById("hy"), 32, 80, true),
						x: 24,
						y: 138,
						interval: 2,
						timeBased: false,
						loop: true,
						scaleX:0.8,
						rotation: 180
					}).addTo(container);
					mapShow(containerMAP, './image/img_bg_level_4.jpg',15000);
					break;
	}
//	var bmp = new Hilo.Bitmap({
//          image:'./image/img_plane_enemy.png',
//          rect: [188,340,180,132],
////          boundsArea:[{x:40,y:20},{x:110,y:80}],
//          x:300,
//          y: 300,
////          rotation:180,
//          scaleX:0.5,
//          scaleY:0.5,
//      }).addTo(stage);
//      bmp.on("click",function(){
////      	alert(123);
//			zdBZ_zhup(30,5000,100);
//      },false);	

//		添加动态view到舞台
//		var fish = new Hilo.Sprite({
//	//		frames: atlas.getSprite('fish'),
//			frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-10", document.getElementById("fj-1"), 171, 196, true),
//			x: -75,
//			y: -35,
//			interval: 2,
//			timeBased: false,
//			loop: true,
////			rotation: 180
//		}).addTo(container);
//	var bmp = new Hilo.Bitmap({
//      image: './image/zd.png',
//      rect: [816,629,30,30],
//			x: 100,
//			y: 300,
//      scaleX:0.6,
//  	scaleY:0.6,
//	}).addTo(stage);



	//实现view的拖拽
	Hilo.copy(container, Hilo.drag);
	container.startDrag([0, 0, winWidth - container.width, winHeight - container.height-50]);
};