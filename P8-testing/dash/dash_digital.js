//dash digital
//faces-main face
face[0] = {
	offms: 10000, //15 sec timeout
	g:w.gfx,
	spd:[],
	init: function(){
		this.spdBar=240/((euc.dash.maker=="Ninebot")?25:(euc.dash.maker=="NinebotZ")?45:(euc.dash.maker=="Inmotion")?55:euc.dash.spdT);
		if ( euc.day[0] < Date().getHours() && Date().getHours() < euc.day[1] ) euc.night=0; else euc.night=1;
		this.g.clear();
		this.spdC=new Uint16Array([0,4095,4080,3840]);
		this.ampC=new Uint16Array([1365,4095,4080,3840]);
		this.tmpC=new Uint16Array([1365,1365,4080,3840]);
		this.batC=new Uint16Array([col("raf"),col("raf"),1365,3840]);
		this.g.setColor(1,col("gray"));
		this.g.fillRect(0,0,119,50); //temp
		this.g.fillRect(122,0,239,50); //batt      
		this.g.setColor(0,0);
		this.g.setFontVector(30);
		this.g.drawString("TEMP", 5,12); //temp
		this.g.drawString("BATT", 150,12); //temp
		this.g.flip();
		this.bar();
		this.mileage();
		this.spd=-1;
		this.amp=-1;
		this.temp=-1;
		this.batt=-1;
		this.volt=-1;
		this.alrm=-1;
		this.max=-1;
		//this.trpL=-1;
		this.conn="OFF";
		this.lock=2;
		this.run=true;
	},
	show : function(o){
		"ram"
		if (!this.run) return;
		//connected  
		if (euc.state=="READY") {
			//speed 1
			if (euc.dash.spd!=this.spd){
				this.spd=euc.dash.spd;
				this.g.setColor(0,0);
				this.g.fillRect(40,54,200,170);
				this.g.setColor(1,4095);
				this.g.setFontVector(130);
				this.g.drawString((!set.def.dashSpd)?euc.dash.spd|0:Math.round(euc.dash.spd/1.6),129-(this.g.stringWidth((!set.def.dashSpd)?euc.dash.spd|0:Math.round(euc.dash.spd/1.6))/2),57); 
				this.spd=euc.dash.spd;
				this.g.flip();
				if (euc.dash.spd==0) { 
					this.g.flip();
					this.bar();
					this.g.setColor(0,0);
				}else{
					this.g.setColor(0,(euc.dash.spdC==3)?col("yellow"):col("dgray"));
					this.g.clearRect(0,176,239,197); //mileage
					this.g.setColor(1,(euc.dash.spdC==0)?col("white"):this.spdC[euc.dash.spdC]);
					this.g.fillRect(0,181,euc.dash.spd*this.spdBar,191); //mileage
					this.g.flip();
					this.g.setColor(0,0);
				}
			}
			//alarm
			if (euc.dash.alrm!=this.alrm) {
				this.alrm=euc.dash.alrm;
				this.g.setFontVector(35);
				this.g.setColor(0,(euc.dash.alrm)?col("red"):col("dgray"));
				this.g.fillRect(0,55,40,110); //buzzer
				this.g.setColor(1,(euc.dash.alrm)?col("white"):col("black"));
				this.g.drawString("B", 9,68); //temp
				this.g.flip();
				this.g.setColor(0,col("dgray"));
				this.g.fillRect(0,115,40,171); //torque
				this.g.setColor(1,0);
				this.g.drawString("T", 9,130); //temp
				this.g.flip();
			}
			//Maxspeed
			if (euc.dash.spdM!=this.max) {
				this.max=euc.dash.spdM;
				this.g.setColor(0,col("dgray"));
				this.g.fillRect(200,53,239,112); 
				this.g.setColor(1,col("white"));
				this.g.setFontVector(12);
				this.g.drawString("TOP", 208,59); //temp
				this.g.setFont("7x11Numeric7Seg",2);
				this.g.drawString(Math.round(euc.dash.spdM), 222-(this.g.stringWidth(Math.round(euc.dash.spdM))/2),80); 
				this.g.flip();
			}
			//amp
			if (this.amp!=euc.dash.amp|0) {
			this.amp=euc.dash.amp|0;
				this.g.setColor(0,this.ampC[euc.dash.ampC]);
				this.g.fillRect(200,115,239,173); 
				this.g.setColor(1,(euc.dash.ampC==1||euc.dash.ampC==2)?0:col("white"));
				this.g.setFont("7x11Numeric7Seg",2);
				this.g.drawString(euc.dash.amp, 222-(this.g.stringWidth(euc.dash.amp)/2),133); 
				this.g.flip();
			}			
			//temp-amp
			if (!set.def.dashDTmp){
				if (this.temp!=euc.dash.tmp) {
					this.temp=euc.dash.tmp;
					this.g.setColor(1,this.tmpC[euc.dash.tmpC]);
					this.g.fillRect(0,0,119,50);       
					this.g.setColor(0,(euc.dash.tmpC!=3&&euc.dash.tmpC!=0)?0:col("white"));
//					this.g.setFont("7x11Numeric7Seg",3.6);
					this.g.setFontVector(45);
					this.g.drawString(euc.dash.tmp, 5,5); //temp
					let size=this.g.stringWidth(euc.dash.tmp)+3;
					this.g.setFontVector(13);
					this.g.drawString("o",size,6); 
					this.g.setFontVector(16);
					this.g.drawString("C",size+8,10); 
					this.g.flip();
				}
			}else if (euc.new){
					this.ampL=ampL[0];
					this.g.setColor(1,col("dgray"));
					this.g.fillRect(0,0,119,50);       
					this.g.setColor(0,(1<euc.dash.ampC)?col("yellow"):col("white"));
					let i;
					for (i = 0; i < ampL.length; i++) {
						this.g.fillRect(118-(i*8),(0<=ampL[i])?50-(ampL[i]*1.2):1,118-(i*8)-3,(0<=ampL[i])?50:1-(ampL[i]*2));
						//this.g.fillRect(i*10,(0<=ampL[i])?50-(ampL[i]*1.2):1,(i*10)+5,(0<=ampL[i])?50:1-(ampL[i]*2));
					}
					this.g.flip();
			} 
			//Battery
			if (!set.def.dashDBat || set.def.dashDBat==1){
				if (euc.dash.volt!=this.volt) {
					this.volt=euc.dash.volt;
					this.g.setColor(0,this.batC[euc.dash.batC]);
					this.g.fillRect(122,0,239,50);
					this.g.setColor(1,col("white"));
					this.g.setFontVector(35);
					this.g.drawString(euc.dash.volt,242-(this.g.stringWidth(euc.dash.volt)),1);
					this.g.setFontVector(13);
					this.g.drawString("VOLTS",191,36); //fixed bat
					this.g.flip();
				}
			}else if (set.def.dashDBat==2) {
				if (euc.dash.bat!=this.batt) {
					this.batt=euc.dash.bat;
					this.g.setColor(0,this.batC[euc.dash.batC]);
					this.g.fillRect(122,0,239,50);
					this.g.setColor(1,col("white"));
					this.g.setFontVector(50);
					//this.g.setFont("7x11Numeric7Seg",4.5);
					this.g.drawString(euc.dash.bat,220-(this.g.stringWidth(euc.dash.bat)),3);
					this.g.setFontVector(20);
					this.g.drawString("%",224,8); //fixed bat
					this.g.flip();
				}
			}else if (set.def.dashDBat==3&&euc.new) {
					this.g.setColor(1,(euc.dash.batC==3)?col("red"):col("raf"));
					this.g.fillRect(122,0,239,50);       
					this.g.setColor(0,col("white"));
					this.g.setFontVector(20);
					this.g.drawString(euc.dash.volt,123,1); 
					this.g.drawString(euc.dash.bat,239-(this.g.stringWidth(euc.dash.bat)),1); 
					let i;
					for (i = 0; i < batL.length; i++) {
						this.g.fillRect(238-(i*6),50-(batL[i]/4),238-(i*6)-1,50);
					}
					this.g.flip();
			}					
			//Mileage
			if (euc.dash.trpL!=this.trpL) {
				this.trpL=euc.dash.trpL;
				this.mileage();
			}     
		//off
		} else if (euc.state=="OFF")  {
			face.go("dashOff",0);
			return;
		//rest
		} else  {
			if (euc.state!=this.conn) {
				this.conn=euc.state;
				this.g.setColor(0,0);
				this.g.fillRect(0,54,239,170);
				this.g.setColor(1,col("white"));     
				this.g.setFont("Vector",40);
				this.g.drawString(euc.state,(125-(this.g.stringWidth(euc.state))/2),85);
				this.g.flip();
				this.g.setColor(1,col("lblue"));
				this.g.fillRect(0,0,119,50);
				this.g.fillRect(122,0,239,50);
				this.g.setColor(0,col("black"));
				this.g.setFontVector(35);
				this.g.setFontVector(30);
				this.g.drawString("TEMP", 5,12); //temp
				this.g.drawString("BATT", 150,12); //temp
				this.g.flip();
				if (euc.state=="WAIT"||euc.state=="RETRY"){	
					this.alrm=-1;this.spd=-1;this.amp=-1;
					this.temp=-1;this.batt=-1;this.trpL=-1;
					this.volt=-1;this.max=-1;
					this.conn="OFF";this.lock=2;this.run=true;
				}
			}
		}
		euc.new=0;
		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},80,this);
	},
	mileage: function(){
		this.trpL=euc.dash.trpL;
		this.g.setColor(0,0);
		this.g.fillRect(0,203,239,239);
		this.g.setColor(1,col("lblue"));
		this.g.setFont("7x11Numeric7Seg",3);
		if (euc.dash.maker=="Ninebot") {
			this.g.drawString(euc.dash.trpL,0,205); 
			this.g.drawString(euc.dash.trpT|0,(240-(this.g.stringWidth(euc.dash.trpT|0)))/2,205); 
			this.g.drawString(euc.dash.trpR,240-(this.g.stringWidth(euc.dash.trpR)+1),205); 
		}else {
			this.g.drawString((!set.def.dashSpd)?euc.dash.trpL:(euc.dash.trpL/1.6).toFixed(1),0,205); 
			this.g.drawString((!set.def.dashSpd)?euc.dash.trpT:(euc.dash.trpT/1.6).toFixed(1),240-(this.g.stringWidth(euc.dash.trpT)+1),205); 
		}
		this.g.flip();
	},
	bar: function(){
		this.g.setColor(1,col("dgray"));
		this.g.fillRect(0,176,239,197); //mileage
		this.g.setColor(0,col("white"));
		this.g.setFont("7x11Numeric7Seg",4);
		this.g.setFontVector(16); //mileage
		if (euc.dash.maker=="Ninebot") {
			this.g.drawString("TRIP",1,180); 
			this.g.drawString("TOT",101,180); 
			this.g.drawString("LEFT",197,180); 
		} else {
			this.g.drawString("TRIP",1,180); 
			if (!set.def.dashSpd) 
				this.g.drawString("KPH",105,180);
			else 
				this.g.drawString("MPH",105,180);
			this.g.drawString("TOTAL",180,180); 
		}
		this.g.flip();
	},
	tid:-1,
	run:false,
	clear : function(){
		//if (face.appCurr!="dash_digital" || face.pageCurr!=0) this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);
		this.tid=-1;
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	} 
};
//loop face
face[1] = {
	offms:1000,
	init: function(){
		return true;
	},
	show : function(){
		if (euc.state=="OFF") face.go("main",0); else {face.pageCurr=0;face.go(set.dash[set.def.dash],-1);}
		return true;
	},
	clear: function(){
		return true;
	},
};	

//touch-main
touchHandler[0]=function(e,x,y){
	switch (e) {
	case 5: //tap event	
		if (160<x&&y<55){//battery percentage/voltage
			if (set.def.dashDBat==undefined || 2 < set.def.dashDBat) set.def.dashDBat=0;
			set.def.dashDBat++;
			face[0].batt=-1;face[0].volt=-1;
			digitalPulse(D16,1,[30,50,30]);
		}else if (x<160&&y<55){//battery percentage/voltage
			if (set.def.dashDTmp==undefined) set.def.dashDTmp=0;
 			face[0].temp=-1;face[0].amp=-1;
			set.def.dashDTmp=1-set.def.dashDTmp;
			digitalPulse(D16,1,[30,50,30]);
		}else
			digitalPulse(D16,1,40);
		this.timeout();
		break;
    case 1: //slide down event
		if (set.def.dash+1>=set.dash.length) 
			set.def.dash=0; 
		else 
			set.def.dash++;
		face.go(set.dash[set.def.dash],0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {
			face.go("settings",0);
			return;
		}
		this.timeout();
		break;
    case 3: //slide left event
		(euc.state=="READY")?face.go('dash'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0):(euc.state=="OFF")?face.go("dashGarage",0):digitalPulse(D16,1,40);
		return;
    case 4: //slide right event (back action)
		face.go("main",0);
		return;
    case 12: //touch and hold(long press) event
		if (55<y<200) {
			if (set.def.dashSpd==undefined) set.def.dashSpd=0;
			set.def.dashSpd=1-set.def.dashSpd;
			digitalPulse(D16,1,[30,50,30]);
			face[0].bar();
			face[0].trpL=-1;
		} else digitalPulse(D16,1,40);
		this.timeout();
		break;
    }
};