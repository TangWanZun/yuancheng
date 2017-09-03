function zdShow(zdtype,sta,GJ,L){
	 timeOutZD=window.setInterval(zdtype+"(container.x,container.y,container.width,container.height,"+sta+","+GJ+")",L);
}
var ZPDJ = 1;//主炮或者激光等级
var FPDJ = 1;
var ZHP_GJ = 10;//主炮初始伤害
var ZHP_L = 350;
var JG_GJ = 2;//激光初始伤害
function zdShow_zhup(GJ,L){//主炮
	ZJtype = 1;
	GJ = GJ || ZHP_GJ;
	L = L || ZHP_L;
	switch(ZPDJ){
		case 1:
			timeOutZD_zhupao=window.setInterval("createZD_zhup([12,5,28, 164],container.x,container.y,container.width,container.height,containerDJ,"+GJ+",6)",L);break;
		case 2:
			ZHP_GJ = 40;
			timeOutZD_zhupao=window.setInterval("createZD_zhup([69,5,79,230],container.x,container.y,container.width,container.height,containerDJ,"+ZHP_GJ+",19)",L);break;
		case 3:
			ZHP_L = 250;
			timeOutZD_zhupao=window.setInterval("createZD_zhup([188,5,98,283],container.x,container.y,container.width,container.height,containerDJ,"+ZHP_GJ+",24)",L);break;
		case 4:
//			ZHP_L = 200;
			ZHP_GJ = 50;
			timeOutZD_zhupao=window.setInterval("createZD_zhup([300,0,252,285],container.x,container.y,container.width,container.height,containerDJ,"+ZHP_GJ+",63)",L);break;
	}
}
function zdBZ_zhup(GJ,L,zL){//主炮暴走
	clearInterval(timeOutZD_zhupao);
	timeOutZD_zhupao=window.setInterval("createZD_zhup([300,0,252,285],container.x,container.y,container.width,container.height,containerDJ,"+ZHP_GJ*3+",63)",zL);
	setTimeout(function(){
		clearInterval(timeOutZD_zhupao);
		zdShow_zhup(ZHP_GJ);
	},L);
}
function zdUP_zhup(){//主炮升级
	clearInterval(timeOutZD_zhupao);
	ZPDJ++;
	zdShow_zhup();
}
function zdUP_jiguang(){//激光升级
	ZPDJ++;
	zdShow_jiguang();
}
function zdShow_fup(GJ,L){//副炮
	switch(FPDJ){
		case 1:
			FPDJ++;
			 window.setInterval("createZD_fup(container.x,container.y,container.width,container.height,containerDJ,"+GJ+",117,winWidth-50)",L);break;
		case 2:
			FPDJ++;
			 window.setInterval("createZD_fup(container.x,container.y,container.width,container.height,containerDJ,"+GJ+",217,winWidth+50)",L);break;
		case 3:
			FPDJ++;
			 window.setInterval("createZD_fup(container.x,container.y,container.width,container.height,containerDJ,"+GJ+",317,winWidth+150)",L);break;
		case 4:
			FPDJ++;
			window.setInterval("createZD_fup(container.x,container.y,container.width,container.height,containerDJ,"+GJ+",417,winWidth+250)",L);break;
		case 5:
			FPDJ++;
			window.setInterval("createZD_fup(container.x,container.y,container.width,container.height,containerDJ,"+GJ+",517,winWidth+350)",L);break;
	}
}
function zdShow_zhongp(GJ,L){//激光暴走
	var view =  createZD_zhongp(container.x,container.y,container.width,container.height,container,GJ);
	setTimeout(function(){
		view[0].removeFromParent();
		view[1].removeFromParent();
	},L);
}
var JG_T;
function zdShow_jiguang(GJ){//激光
	ZJtype = 2;
	GJ = GJ || JG_GJ;
	if(JG_T){
		JG_T[0].removeFromParent();
		JG_T[1].removeFromParent();
		JG_T[2].removeFromParent();
	}
	switch(ZPDJ){
		case 1:
			JG_T=createZD_jiguang("0-0","jg-1",14,186,container,GJ,null,18,30);break;
		case 2:
			JG_GJ = 4;
			JG_T=createZD_jiguang("0-3","jg-2",40,847,container,JG_GJ,40,31,30);break;
		case 3:
			JG_GJ = 6;
			JG_T=createZD_jiguang("0-6","jg-3",46,309,container,JG_GJ,null,33,50);break;
		case 4:
			JG_GJ =8;
			JG_T=createZD_jiguang("0-6","zd1",137,309,container,JG_GJ,null,82.5,65);break;
	}
}
/*
 [245,0,43, 173]:1等级
 [177,14,48,220]:2等级
 [351,301,50,180]:3
 * */
function createZD_zhup(re,X,Y,wid,hid,stage,GJ,Z){//主炮
	//创建子弹
	GJ= GJ||10;
	var bmp = new Hilo.Bitmap({
//      image: './image/zd.png',
        image: './image/zubao.png',
        rect:re,
	    x:X+wid/2-Z,
	    y: Y-65, 
        scaleX:0.5,
    	scaleY:0.5,
	}).addTo(stage);
	bmp.onUpdate = function(){
		for(var i = 0;i<djList.length;i++){
			if(bmp.hitTestObject(djList[i],true)){
				var hp=parseInt(djList[i].hp)-GJ;
//				console.log(djList[i]);
				bmp.removeFromParent();
				 //	添加动态子弹爆炸
				var zdbj = new Hilo.Sprite({
					frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-7", document.getElementById("bz1"), 56, 56, true),
					x: bmp.x,
					y: bmp.y,
					scaleX:0.5,
    				scaleY:0.5,
					interval: 1,
					timeBased: false,
					loop: false,
				}).addTo(stage);
				zdbj.setFrameCallback(7,function(){
					this.removeFromParent();
				});
				if(hp<=0){
					DF+=parseInt(djList[i].fs);
					removerDJ(djList[i]);
					djList[i].removeFromParent();
					djList.splice(i,1);
					onFSup();
				}else{
					djList[i].hp = hp;
				}
			};
		}
	}

    Hilo.Tween.to(bmp, {
	    y:-200
	}, {
	    duration:500,
//	    delay:500,
	    ease:Hilo.Ease.Quad.EaseIn,
	    onComplete:function(){
//				删除当前对象
			bmp.removeFromParent();
	    }
	});

}
function createZD_fup(X,Y,wid,hid,stage,GJ,bmpLX,bmpRX){//副炮
	//创建子弹
	GJ= GJ||5;
	var bmpL = new Hilo.Bitmap({
        image: './image/zd.png',
        rect: [600,565,44, 140],
	    x:X+wid/2-38,
	    y: Y+20, 	
        scaleX:0.5,
    	scaleY:0.5,
	}).addTo(stage);
	var bmpR = new Hilo.Bitmap({
        image: './image/zd.png',
        rect: [640,765,44, 140],
	    x:X+wid/2+18,
	    y: Y+33, 	
        scaleX:0.5,
    	scaleY:0.5,
	}).addTo(stage);
	var fun=function(){
		for(var i = 0;i<djList.length;i++){
			if(this.hitTestObject(djList[i],true)){
				var hp=parseInt(djList[i].hp)-GJ;
//				console.log(djList[i]);
				this.removeFromParent();
				 //	添加动态子弹爆炸
				var zdbj = new Hilo.Sprite({
					frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-7", document.getElementById("bz1"), 56, 56, true),
					x: this.x,
					y: this.y,
					scaleX:0.5,
    				scaleY:0.5,
					interval: 1,
					timeBased: false,
					loop: false,
				}).addTo(stage);
				zdbj.setFrameCallback(7,function(){
					this.removeFromParent();
				});
				if(hp<=0){
					DF+=parseInt(djList[i].fs);
					removerDJ(djList[i]);
					djList[i].removeFromParent();
					djList.splice(i,1);
					onFSup();
				}else{
					djList[i].hp = hp;
				}
			};
		}
	}
	bmpL.onUpdate =fun;
	bmpR.onUpdate =fun;
//	console.log(bmpL.x);
    Hilo.Tween.to(bmpL, {
	    y:bmpL.y-640,
//	    x:0
	    x:bmpL.x-bmpLX
	}, {
	    duration:1000,
//	    delay:500,
	    ease:Hilo.Ease.Quad.EaseIn,
	    onComplete:function(){
//				删除当前对象
			bmpL.removeFromParent();
			bmpR.removeFromParent();
	    }
	});
//	console.log();
	Hilo.Tween.to(bmpR, {
	    y:bmpL.y-640,
	    x:bmpRX
	}, {
	    duration:1000,
//	    delay:500,
	    ease:Hilo.Ease.Quad.EaseIn,
	    onComplete:function(){
//				删除当前对象
			bmpL.removeFromParent();
	    }
	});

}
function createZD_zhongp(X,Y,wid,hid,stage,GJ){//激光暴走
	//创建子弹
	var bmp = new Hilo.Sprite({
		frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-6", document.getElementById("zd1"), 137, 309, true),
		interval:1,
		timeBased: false,
		loop: true,
		width:100,
		height:winHeight,
	    x:wid/2-53,
	    y:-winHeight+hid-20	,
	}).addTo(stage);

	var fish = new Hilo.Bitmap({
	    image: './image/feji.png',
	    rect: [0, 182,90, 90],
		x: -35,
		y: -10,
	}).addTo(stage);
	bmp.onUpdate = function(){
		for(var i = 0;i<djList.length;i++){
			if(bmp.hitTestObject(djList[i],true)){
				var hp=parseInt(djList[i].hp)-GJ;
				if(hp<=0){
					DF+=parseInt(djList[i].fs);
					removerDJ(djList[i]);
					djList[i].removeFromParent();
					djList.splice(i,1);
					onFSup();
				}else{
					djList[i].hp = hp;
				}
			};
		}
	}
	return [bmp,fish];
}
function createZD_jiguang(Z,id,W,H,stage,GJ,wid,X,Y){//激光武器
	//创建子弹
	GJ= GJ||2;
	var bmp = new Hilo.Sprite({
	//		frames: atlas.getSprite('fish'),
			frames: Hilo.TextureAtlas.createSpriteFrames("swim", Z, document.getElementById(id), W, H, true),
			interval:1,
			timeBased: false,
			loop: true,
			width:wid,
		    x:X,
		    y:Y,
			rotation: 180
	}).addTo(stage);

	var fish = new Hilo.Bitmap({
	    image: './image/feji.png',
	    rect: [0, 182,90, 90],
		x: -35,
		y: -10,
	}).addTo(stage);
		//		飞机火焰动态图
	var fish2 = new Hilo.Sprite({
//		frames: atlas.getSprite('fish'),
		frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-1", document.getElementById("hy"), 32, 80, true),
		x: 24,
		y: 138,
		interval: 2,
		timeBased: false,
		loop: true,
		scaleX:0.8,
//          scaleY:0.8,
		rotation: 180
	}).addTo(stage);
	bmp.onUpdate = function(){
		bmp.height=winHeight;
		for(var i = 0;i<djList.length;i++){
			if(bmp.hitTestObject(djList[i],true)){
//				console.log(winHeight - djList[i].y);
//				bmp.height = winHeight - djList[i].y-djList[i].height;
				var hp=parseInt(djList[i].hp)-GJ;
				if(hp<=0){
					DF+=parseInt(djList[i].fs);
					removerDJ(djList[i]);
					djList[i].removeFromParent();
					djList.splice(i,1);
					onFSup();
				}else{
					djList[i].hp = hp;
				}
			};
		}
	}
	return [bmp,fish,fish2];
}
