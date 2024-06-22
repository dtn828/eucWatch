//Begode settings On connect

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
        let val=["NA","ON","OFF","STOBE"];
		UI.btn.c2l("main","_2x2",1,"HL",val[euc.dash.auto.onD.HL],15,euc.dash.auto.onD.HL?4:1);
		UI.btn.c2l("main","_2x2",2,"LED",euc.dash.auto.onD.led?euc.dash.auto.onD.led-1+"":"NA",15,euc.dash.auto.onD.led?4:1);
		UI.btn.c2l("main","_2x2",3,"BEEP",euc.dash.auto.onD.beep?"ON":"NA",15,euc.dash.auto.onD.beep?4:1);
		UI.btn.c2l("main","_2x2",4,"","",15,1);	
		UIc.end();
		this.run=1;
		//
		UIc.main._2x2=(i)=>{
			if (i==1){
				buzzer.nav(buzzer.buzz.ok);
                euc.dash.auto.onD.HL++;  if (3<euc.dash.auto.onD.HL) euc.dash.auto.onD.HL=0;
                let val=["NA","ON","OFF","STOBE"];
                UI.btn.c2l("main","_2x2",1,"HL",val[euc.dash.auto.onD.HL],15,euc.dash.auto.onD.HL?4:1);

			}else if (i==2){
				buzzer.nav(buzzer.buzz.ok);
                euc.dash.auto.onD.led++; if (10<euc.dash.auto.onD.led) euc.dash.auto.onD.led=0;
				UI.btn.c2l("main","_2x2",2,"LED",euc.dash.auto.onD.led?euc.dash.auto.onD.led-1+"":"NA",15,euc.dash.auto.onD.led?4:1);
				return;
		  }
		  else if (i==3){
				buzzer.nav(buzzer.buzz.ok);	
                euc.dash.auto.onD.beep=1-euc.dash.auto.onD.beep;
                UI.btn.c2l("main","_2x2",3,"BEEP",euc.dash.auto.onD.beep?"ON":"NA",15,euc.dash.auto.onD.beep?4:1);
                return;
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