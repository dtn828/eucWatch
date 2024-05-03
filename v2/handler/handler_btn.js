//button 
E.setFlags({ pretokenise: 1 });
/*
ew.btn=(x)=>{
	let press;
	if (long) {clearTimeout(long); long=0;}
	if (x) { 
		press=true;
		if (long) {clearTimeout(long);}
		long=setTimeout(() => {
			ew.emit("button","long");
			press=false;
		}, process.env.BOARD=="BANGLEJS2"?300:process.env.BOARD=="dsd6"?100:800);
		return;
	}else if (press)  { 
		if (long) {clearTimeout(long);long=0;}
		ew.emit("button","short");
	}
};

*/


function btn1(s) {
	//"ram";
	if (s.state == this.press) return;
	this.press = s.state;
	
	if (face.offid) { clearTimeout(face.offid); face.offid = 0; }
	
	if (this.press) {
		this.presscount ++;
		this.presscount ++;
		if (this.tclick) { clearTimeout(this.tclick); this.tclick = 0; }
		this.tclick = setTimeout(() => {
			this.tclick = 0;
			// Horn
			// Horn
			if (this.presscount === 1 && global.euc && euc.state == "READY" && 2 <= euc.dash.live.spd && euc.dash.opt.horn.en) {
				if (!euc.is.horn && !this.press) {
					euc.wri("hornOn");
					euc.wri("hornOff");
				} else {
					euc.wri(this.press || !euc.is.horn ? "hornOn" : "hornOff");
				}
				if (ew.def.acc) return;
			// Toggle EUC connection	
			} else if (this.presscount === 1 && this.press && global.euc) {
			// Toggle EUC connection	
			} else if (this.presscount === 1 && this.press && global.euc) {
				euc.tgl();
			// Single button press default handling
			// Single button press default handling
			} else if (!this.press && this.presscount === 1) {
				if (face.pageCurr == -1) {
					buzzer.nav(buzzer.buzz.on);
					face.go((global.euc && euc.state != "OFF") ? ew.is.dash[ew.def.dash.face] : face.appCurr, 0);
				} else if (euc.state != "OFF") {
					if (face.appCurr.startsWith("dash_")) {
						acc.isUp = 1;
						if (ew.tid.acc) changeInterval(ew.tid.acc, 500);
						face.go(face.appCurr, -1);
						buzzer.nav(buzzer.buzz.off);
					} else face.go(ew.is.dash[ew.def.dash.face], 0);
				} else {
					if (face.appCurr == "clock") { face.go("clock", -1); buzzer.nav(buzzer.buzz.off); }
					else face.go("clock", 0);
				}
			// Custom button commands
			} else {
				action = this.presscount + (this.press?100:0);
				switch(action){
					case 2: if (global.euc && euc.state == "READY") euc.wri("HLtgl");break;
					case 102: if (global.euc && euc.state == "READY") euc.wri("strobetgl");break;
					case 3: if (ew.def.hid == 1 && ew.is.hidM != "undefined") ew.is.hidM.playpause();break;
					case 103: if (ew.def.hid == 1 && ew.is.hidM != "undefined") ew.is.hidM.next();break;
					case 4: if (global.euc && euc.state == "READY") euc.wri("ledtgl");break;
				}
			} 
			this.press = false;
			this.presscount = 0;
			//if (ew.def.acc) return;
		}, process.env.BOARD == "BANGLEJS2" ? 300 : 500);
	} else {
		if (global.euc && euc.state == "READY" && euc.is.horn && euc.dash.opt.horn.en) { euc.wri("hornOff"); if (ew.def.acc) return; }
	}
}
this.presscount = 0;
ew.tid.btn1 = setWatch(btn1, BTN1, { repeat: true, debounce: 20, edge: 0 });
if (process.env.BOARD == "ROCK") {
	D46.mode("input_pulldown");
	btn2 = btn1.bind();
	ew.tid.btn2 = setWatch(btn2, D46, { repeat: true, debounce: false, edge: 0 });
}
