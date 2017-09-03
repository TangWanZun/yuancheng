	var DF = 0;//当前得分
	var containerEle =  document.getElementById("game-container");//画布
	var title = document.getElementById("title")//计分板
	var winHeight = 720;//游戏页面高度
	var winWidth = 400;//游戏页面宽度
	var djList = new Array();//敌机序列
	var zdList = new Array();//子弹序列
	var  djzdList = new Array();//敌机子弹序列
	var stage = null;//绘制舞台
	var ticker = null;//绘制时间轴
	var containerDJ = null;//敌方舞台
	var container = null;//飞机舞台
	var timeOutDJ =new Array();//敌机计时器
	var timeOutZD = null;//子弹计时器
	var FJHP = 50;//飞机HP
	var FJHPdom = document.getElementById("HP");//飞机hp
	var ZJtype = 1;
	function clearTimeOutDJ(){
		for(var i = 0;i<timeOutDJ.length;i++){
			clearInterval(timeOutDJ[i]);
		}
	}
	function HPShow(){//血条
		document.getElementById("hp-in").style.width = " calc( 100% * ( "+FJHP+" / 50 ) ) ";
	}
	function defenShow(){//分数
		document.querySelector("#defen").innerHTML="获得分数<br/>"+DF;
		document.querySelector(".defen").classList.add("defen-show");
	}
	var GKindex = 0;
	var GKarray = [1000,2500,5000,9000,15000,30000,50000,60000,80000,90000];
	function onFSup(){
		document.getElementById("title").innerHTML = DF;
		for(var i = GKarray.length ;i>=0;i--){
			if(GKarray[i]<=DF){break;}
		}
		if(i==GKindex){
			GKindex++;
			switch(i){
				case 0:   //1000
					djShow_zlj(3500);break;
				case 1: //2500
					djShow_dlj(8000);break;
				case 2://5000
					zdShow_fup(3,250);
					djShow_dd(1500);break;
				case 3://9000
					if(ZJtype==1){
						zdUP_zhup();
					}else if(ZJtype==2){
						zdUP_jiguang();
					}
					djShow_xhj(1000);
					djShow_zlj(3500);break;
				case 4://15000
					djShow_dd(1500);
					djShow_dlj(8000);
					zdShow_fup(3,250);break;
				case 5://30000
					if(ZJtype==1){
						zdUP_zhup();
					}else if(ZJtype==2){
						zdUP_jiguang();
					}
					zdShow_fup(3,250);
					djShow_xhj(1000);djShow_zlj(3500);djShow_dlj(8000);djShow_dd(1500);break;
				case 6: //50000
					clearTimeOutDJ();createBOSS(stage,[572,0,452,333],3000,10000,BOSS_sanjiao);break;
				case 7: //60000
					djShow_xhj(1000);djShow_zlj(3500);djShow_dlj(8000);djShow_dd(1500);djShow_xhj(1000);
					djShow_xhj(2000);djShow_zlj(4000);djShow_dlj(9000);djShow_dd(2000);djShow_dd(2000);
					zdShow_fup(3,250);zdShow_fup(3,250);break;
				case 8://80000
					if(ZJtype==1){
						zdUP_zhup();
					}else if(ZJtype==2){
						zdUP_jiguang();
					}
					clearTimeOutDJ();createBOSS(stage,[526,590,497,355],4000,10000,BOSS_daodan);break;
				case 9://90000
					
				default:GK = false;
			}
		}
	}
	
