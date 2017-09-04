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
	location.reload(false);
}
function feijiload(){
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
	//创建一个加载队列
	var queue = new Hilo.LoadQueue();
	
	//设置负载队列的最大连接，默认值是2。
	queue.maxConnections = 1;
	
	//添加源
	queue.add([{
			id: 'img_plane_enemy',
			noCache: true,
			src: 'image/img_plane_enemy.png'
		},
		{
			id: 'feji',
			noCache: true,
			src: 'image/feji.png'
		},
		{
			id: 'img_bg_level_4',
			noCache: true,
			src: 'image/img_bg_level_4.jpg'
		},
		{
			id: 'img_bg_level_5',
			noCache: true,
			src: 'image/img_bg_level_5.jpg'
		},
		{
			id: 'img_bullet',
			noCache: true,
			src: 'image/img_bullet.png'
		},
		{
			id: 'img_item',
			noCache: true,
			src: 'img_item.png'
		},
		{
			id: 'img_plane_boss',
			noCache: true,
			src: 'image/img_plane_boss.png'
		},
		{
			id: 'img_plane_enemy',
			noCache: true,
			src: 'image/img_plane_enemy.png'
		},
		{
			id: 'ui_loading_Background',
			noCache: true,
			src: 'image/ui_loading_Background.jpg'
		},
		{
			id: 'zd',
			noCache: true,
			src: 'image/zd.png'
		},
		{
			id: 'zubao',
			noCache: true,
			src: 'image/zubao.png'
		},
		{
			id: 'ui_purple_basemap',
			noCache: true,
			src: 'image/ui_purple_basemap.png'
		},
		{
			id: 'zd1',
			noCache: true,
			src: 'image/zd1.png'
		},
		{
			id: 'zhanji_1',
			noCache: true,
			src: 'image/zhanji_1.png'
		},
		{
			id: 'zhanji_2',
			noCache: true,
			src: 'image/zhanji_2.png'
		}
	
	]);
	
	
	//负载的事件处理程序
	queue.on('load', function(e) {
		console.log('load:', e.detail.src, queue.getLoaded(), queue.getTotal());
	}).on('complete', function(e) {
		console.log('complete');
	
		//如果图像加载，则创建位图。
		var bmp = new Hilo.Bitmap({
			image: queue.getContent('fish'),
			rect: [0, 0, 174, 126],
			x: 75,
			y: 50
		}).addTo(stage);
	}).on('error', function(e) {
		console.log('error:', e.detail.src);
	});
	
	//启动负载队列
	queue.start();
}
function init() {
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