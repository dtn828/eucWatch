//Begode settings
//touch
tcNext.replaceWith((x,y)=>{
	"ram";
	buzzer.nav(buzzer.buzz.ok);	
	face.go("dashBegodeP3",0);return; 
});
tcBack.replaceWith((x,y)=>{
	"ram";
	buzzer.nav(buzzer.buzz.ok);	
	if (UI.ntid) {/*buzzer.nav(buzzer.buzz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	face.go("dashBegode",0);return; 
});
//
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	page:euc.dash.info.get.makr+" "+euc.dash.info.get.name,
	init: function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		UI.ele.ind(3,3,1);
		UI.ele.title(this.page.toUpperCase(),3,0);
		UIc.start(1,1);
		this.run=1;
		UI.btn.c2l("main","_2x2",1,"WATCH","ALERTS",15,(euc.dash.alrt.spd.hapt.en||euc.dash.alrt.amp.hapt.en||euc.dash.alrt.tmp.hapt.en||euc.dash.alrt.bat.hapt.en)?4:1);
		UI.btn.c2l("main","_2x2",2,"WHEEL","ALERTS",15,(euc.dash.alrt.spd.one.en||euc.dash.alrt.spd.two.en||euc.dash.alrt.spd.tilt.val)?4:1);
		UI.btn.c2l("main","_2x2",3,"BTN1","TEST",15,0);
		UI.btn.c2l("main","_2x2",4,"BTN1","TEST",15,0);
		UIc.end();
		this.run=1;
		//euc.dash.alrt.spd.one.en
		UIc.main._2x2=(i)=>{
			print(i);
			if (i==1){
				buzzer.nav(buzzer.buzz.ok);
				face.go("dashAlerts",0);
			}else if (i==2){
				buzzer.nav(buzzer.buzz.ok);
				face.go("dashBegodeAlerts",0);
			}else if (i==3){
				buzzer.nav(buzzer.buzz.ok);		
			}else if (i==4){
				buzzer.nav(buzzer.buzz.ok);	
			}
		};
	},
	show : function(){
		"ram";
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run)  return;
		this.tid=setTimeout(function(t,o){
		  face[0].tid=0;
		  face[0].show();
		},500);
	},
	bar:function(){
		"ram";
		ew.temp.bar=0;
		UI.ele.title(this.page.toUpperCase(),3,0);
		UI.btn.c2l("main","_2x2",3,"BTN1","TEST",15,0);
		UI.btn.c2l("main","_2x2",4,"BTN1","TEST",15,0);
	},
	tid:-1,
	run:false,
	clear : function(){
		"ram";
		ew.temp.bar=0;if (this.tid) clearTimeout(this.tid);this.tid=0;return true;
	},
	off: function(){
		"ram";
		this.g.off();this.clear();
	}
};
