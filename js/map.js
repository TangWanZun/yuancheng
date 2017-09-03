function mapShow(stage,image,L){
	new Hilo.Bitmap({
		image:image,
		x: 0,
		y: 0,
		width:winWidth,
		height:winHeight
	}).addTo(stage);
	new Hilo.Bitmap({
		image:image,
		x: 0,
		y: -winHeight,
		width:winWidth,
		height:winHeight
	}).addTo(stage);
	Hilo.Tween.to(stage, {
	    y:winHeight
	}, {
	    duration:L,
	    ease:Hilo.Ease.Linear.EaseNone,
	    loop:true,
	});
}
