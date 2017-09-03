function djShow_xhj(L){
	timeOutDJ.push(setInterval("createDJ(containerDJ,[160, 476, 107, 75],10,100,4000)",L));
}
function djShow_zlj(L){
	timeOutDJ.push(setInterval("createDJ(containerDJ,[0, 230, 192, 133],50,300,5000)",L));
}
function djShow_dd(L){
	timeOutDJ.push(setInterval("createDJ(containerDJ,[203, 550, 74, 146],30,200,2000,container.x+10,container.y+10,false,true)",L));
}
function djShow_dlj(L){
	timeOutDJ.push(setInterval("createDJ(containerDJ,[0, 0, 262, 198],100,500,8000,null,null,true)",L));
}
function djShow_zlanj(L){
	timeOutDJ.push(setInterval("createDJ(containerDJ,[188,340,180,132],300,1000,2000,null,300,true)",L));
}
/*
 参数
 [160, 476, 107, 75]:小黄机；
 [0, 230, 192, 133]:中绿机;
 [203, 550, 74, 146]:导弹
 [188,340,180,132]:中蓝机器
 * */
function createDJ(Instage,rec,HP,FS,T,TX,TY,zd,bz){
	T = T || 3000;
	HP = HP || 10;
	FS = FS || 100;
	TY = TY||1000;
	bz = bz || false;
	zd = zd || false;
	var sand = Math.random()*winWidth;
  	var bmp = new Hilo.Bitmap({
            image: './image/img_plane_enemy.png',
            rect: rec,
            x:sand-50,
            y: -100,
            scaleX:0.6,
            scaleY:0.6,
            onUpdate:function(){
            	if(zd&&(TW.time%500<5)){
					createDJZD(stage,[816,629,30,30],bmp.x+70,bmp.y+bmp.height/2,(container.x-bmp.x-20)*5,(container.y-bmp.y)*5+20,7000,5);	
            	}
            	if(bmp.hitTestObject(container,true)){//碰撞测试
					FJHP -= bmp.hp;
					Hilo.Tween.remove(TW);
            		bmp.removeFromParent();
            		removerDJ(bmp);
					if(FJHP<=0){
						FJHP=0;
						FJHPdom.innerHTML = 0;
						HPShow();
						ticker.pause();
						defenShow();
					}else{
						HPShow();
						FJHPdom.innerHTML = FJHP;
					}
        		};
            }
        }).addTo(Instage);
        bmp.hp = HP;
        bmp.fs = FS;
        djList.push(bmp);
//      if(zd){djzdList.push(bmp);}
        TX = TX||bmp.x;
       var TW = Hilo.Tween.to(bmp, {
		    y:TY,
		    x:TX
		}, {
		    duration:T,
		    ease:Hilo.Ease.Quad.EaseIn,
		    onComplete:function(){
		    	for(var i = 0;i<djList.length;i++){
		    		if(djList[i]===bmp){
		    			djList.splice(i,1);
		    			if(bz){
		    				removerDJ(bmp);
		    			}
		    		}
		    	}
//				删除当前对象
				djzdList.shift();
				bmp.removeFromParent();
		    }
		});
}            
/*
  [526,590,497,355]:导弹BOSS;
  [572,0,452,333]:三角形boss
 * */
function createBOSS(Instage,rec,HP,FS,Fun){
	HP = HP || 10;
	FS = FS || 100;
	var zd  = false;
	var h;
  	var bmp = new Hilo.Bitmap({
            image:'./image/img_plane_boss.png',
            rect: rec,
            x:350,
            y: -200,
            scaleX:0.6,
            scaleY:0.6,
			rotation: 180,
            onUpdate:function(){
            	if(bmp.hitTestObject(container,true)){//碰撞测试
            		FJHP=0;
					FJHPdom.innerHTML = 0;
					HPShow();
					ticker.pause();
					defenShow();
        		};
				if(zd){
					Fun(bmp,h);
				}
            }
        }).addTo(Instage);
        bmp.hp = HP;
        bmp.fs = FS;
        bmp.boos = true;
        djList.push(bmp);
//      if(zd){djzdList.push(bmp);}
//      TX = TX||bmp.x;
       Hilo.Tween.to(bmp, {
		    y:250,
		    x:bmp.x
		}, {
		    duration:3000,
		    onComplete:function(){
		    Hilo.Tween.to(bmp, {
				    y:210,
				    x:bmp.width/2-25
				}, {
					delay:500,
					duration:1000,
					onComplete:function(){
					h = Hilo.Tween.to(bmp, {
						    y:210,
						    x:winWidth+80
						}, {
							delay:500,
							duration:3000,
							loop:true,
							reverse:true,
							onStart: function(){
								zd = true;
							}
						});
					 }
				});
		    }
		});
}
/*
 BOSS
 * */
function BOSS_daodan(bmp,h){
	 if(h.time%150<=5){
		createDJ(containerDJ,[203, 550, 74, 146],30,200,2000,container.x,container.y+40,false,true);
	}
	 if(h.time%250<=30){
 		var zx = bmp.x-bmp.width/2;
		var zy = bmp.y-bmp.height/2;
 		createDJZD(stage,[746,0,32,158],zx-28,zy,(container.x-zx)*3,(container.y-zy)*3+20,3000,5);	
 		createDJZD(stage,[746,0,32,158],zx+168,zy,(container.x-zx)*3,(container.y-zy)*3+20,3000,5);	
	}
}
function BOSS_sanjiao(bmp,h){
	if(h.time%150<=5){
	 	createDJ(containerDJ,[160, 476, 107, 75],10,100,4000)
	}
	if(h.time%20==0){
 		var zx = bmp.x-bmp.width/2;
		var zy = bmp.y-bmp.height/2;
 		createDJZD(stage,[49,868,26,156],zx+50,zy,null,winHeight+20,3000,5);	
 		createDJZD(stage,[49,868,26,156],zx+125,zy,null,winHeight+20,3000,5);	
	}
	if(h.time%50==0){
 		var zx = bmp.x-bmp.width/2;
		var zy = bmp.y-bmp.height/2;
 		createDJZD(stage,[536,10,32,163],zx-40,zy-50,null,winHeight+20,1500,15);	
 		createDJZD(stage,[536,10,32,163],zx+205,zy-50,null,winHeight+20,1500,15);	
	}
}
/*
     [816,629,30,30]：红色
 * */
function createDJZD(stage,rec,Fx,Fy,TX,TY,T,sh){//敌机子弹
	T = T || 3000;
	TY = TY||1000;
  	var bmp = new Hilo.Bitmap({
            image: './image/zd.png',
            rect: rec,
            x:Fx,
            y:Fy,
            scaleX:0.6,
            scaleY:0.6,
            onUpdate:function(){
            	if(bmp.hitTestObject(container,true)){//碰撞测试
					FJHP -= bmp.hp;
					Hilo.Tween.remove(TW);
            		bmp.removeFromParent();
            		removerDJ(bmp);
					if(FJHP<=0){
						FJHP=0;
						FJHPdom.innerHTML = 0;
						HPShow();
						ticker.pause();
						defenShow();
					}else{
						HPShow();
						FJHPdom.innerHTML = FJHP;
					}
        		};
            }
        }).addTo(stage);
        bmp.hp = sh;
        TX = TX||bmp.x;
       var TW = Hilo.Tween.to(bmp, {
		    y:TY,
		    x:TX
		}, {
		    duration:T,
		    ease:Hilo.Ease.Quad.EaseIn,
		    onComplete:function(){
//				删除当前对象
				bmp.removeFromParent();
		    }
		});
}
function DJZDHD(Tween,index){
	var sm=Tween.duration/index;
	
}
function removerDJ(obj,X,Y){	//	添加动态敌机爆炸
	X = X || 1;
	Y = Y || 1;
	var xx = obj.x+obj.width/2-56;
	var yy = obj.y+obj.height/2-28;
	if(obj.boos){
		X = 4;
		Y = 4;
		xx = obj.x-obj.width/2;
		yy = obj.y-obj.height/2;
	}
	var djbj = new Hilo.Sprite({
		frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-7", document.getElementById("bz1"), 56, 56, true),
		x: xx,
		y: yy,
		scaleX:X,
		scaleY:Y,
		interval: 2,
		timeBased: false,
		loop: false,
	}).addTo(stage);
	djbj.setFrameCallback(7,function(){
		this.removeFromParent();
	});
}
