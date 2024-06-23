//Begode settings
//touch
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);face.go("dashBegodeP2",0);return;});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);	
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
		UI.ele.ind(2,3,1);
		UI.ele.title(this.page.toUpperCase(),3,0);
		UIc.start(1,1);
		this.run=1;
		UI.btn.c2l("main","_2x2",1,"RIDE",(euc.dash.opt.ride.mode==0)?"SOFT":(euc.dash.opt.ride.mode==1)?"MED":"HARD",15,4);
		UI.btn.c2l("main","_2x2",2,"ON","CONN.",15,(euc.dash.auto.onC.HL||euc.dash.auto.onC.led||euc.dash.auto.onC.beep)?4:1);
		UI.btn.c2l("main","_2x2",3,"","",15,1);
		UI.btn.c2l("main","_2x2",4,"ON","DISC.",15,(euc.dash.auto.onD.HL||euc.dash.auto.onD.led||euc.dash.auto.onD.beep)?4:1);	
		UIc.end();
		this.run=1;
		//
		UIc.main._2x2=(i)=>{
			if (i==1){
				buzzer.nav(buzzer.buzz.ok);
				let tmp=euc.dash.opt.ride.mode+1;
				if(tmp>2) tmp=0;
				euc.dash.opt.ride.mode=tmp;
				euc.wri("RideMode", tmp, true);
				euc.dash.opt.ride.mode=tmp;
				UI.btn.c2l("main","_2x2",1,"RIDE",(euc.dash.opt.ride.mode==0)?"SOFT":(euc.dash.opt.ride.mode==1)?"MED":"HARD",15,4);
				//if (ew.def.info) UI.btn.ntfy(1,2,0,"_bar",6,euc.dash.opt.lght.HL?"ON":"OFF","",15,0);w.gfx.flip();
			}else if (i==2){
				buzzer.nav(buzzer.buzz.ok);
				face.go("dashBegodeOnC",0);
				return;
		  }
		  else if (i==3){
				buzzer.nav(buzzer.buzz.ok);		
				//UI.btn.c2l("main","_2x2",3,euc.dash.opt.tpms?euc.dash.opt.tpms:"TPMS",(euc.dash.opt.tpms)?(tpms.euc[euc.dash.opt.tpms]&&tpms.euc[euc.dash.opt.tpms].psi)?Math.round(tpms.euc[euc.dash.opt.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",15,(euc.dash.opt.tpms&&tpms.euc[euc.dash.opt.tpms]&&tpms.euc[euc.dash.opt.tpms].time&&(getTime()|0)-tpms.euc[euc.dash.opt.tpms].time<1800)?(tpms.euc[euc.dash.opt.tpms].alrm)?7:4:1);
				//if (ew.def.info) UI.btn.ntfy(1,2,0,"_bar",6,euc.dash.auto.onC.lift?euc.dash.auto.onC.lift==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);w.gfx.flip();
			}else if (i==4){
				buzzer.nav(buzzer.buzz.ok);	
				face.go("dashBegodeOnD",0);
				return;		  }
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
		UI.btn.c2l("bar","_2x2",3,euc.dash.opt.tpms?euc.dash.opt.tpms:"TPMS",(euc.dash.opt.tpms)?(tpms.euc[euc.dash.opt.tpms]&&tpms.euc[euc.dash.opt.tpms].psi)?Math.round(tpms.euc[euc.dash.opt.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",15,(euc.dash.opt.tpms&&tpms.euc[euc.dash.opt.tpms]&&tpms.euc[euc.dash.opt.tpms].time&&(getTime()|0)-tpms.euc[euc.dash.opt.tpms].time<1800)?(tpms.euc[euc.dash.opt.tpms].alrm)?7:4:1);
		UI.btn.c2l("bar","_2x2",4,"HORN","",15,4);	
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