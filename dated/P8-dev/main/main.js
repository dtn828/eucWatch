
//main
face[0] = {
  offms: 5000,
  init: function(){
    this.startTime=getTime();
    this.v=P8.batV(1);
    //top
    g.setColor(col("lgray"));
    g.fillRect(0,0,158,50); //date
    g.fillRect(162,0,239,50);//batt
    if (face.pagePrev!=2){g.fillRect(0,55,100,150);}
    
    this.wupd=1;
    this.bt=-1;
    this.nCall=-1;
    this.nIm=-1;
    this.nInfo=-1;
    this.hour=-1;
    this.min=-1;
    this.sec=-1;
    this.mem=-1;
	this.ring=-1;
    this.run=true;
	this.batt=-1;
    //print("exit init",getTime()-this.startTime);

  },
  show : function(){
    if (!this.run) return;
 	this.time();
	//bt status on date
    if (notify.ring){
   	  if (this.ring!=notify.ring){
	  this.bt=-1;
	  g.setColor(col("raf3"));
      g.fillRect(0,0,158,50); //date
      g.setColor(col("white"));
	  g.setFont("Vector",22);
	  g.drawString("MUTE",68,15);
	  //mute
	  g.drawImage( require("heatshrink").decompress(atob("kEgwMAn/gA4N/+ADB/4DC8FwAbvh+HnjHh8HjAYPABYNhAYVxAY0wIYU4H4U4EYUcnkP/0Oj0f/8Ph///8Hw/4g8D4IDBgIfBg8AD4IDBvgDCj+AAYIbCgEB//+FoM//gA==")),15,9);
	  
	  }
    }else if (set.bt != this.bt){
	  this.bt=set.bt;
	  this.ring=0;
      var colbt=colo.bck1;
      if (this.bt==3)  colbt=colo.bck3;
//      else if (this.bt==4)  colbt=col("blue");
      else if (this.bt==4)  colbt=143;
      else if (this.bt==2)  colbt=colo.btnSt;
      g.setColor(colbt);
	  g.fillRect(0,0,158,50); //date
      g.setColor(colo.txt1);
      g.setFont("Vector",35);
	  if (this.bt==0&&!set.def.cli&&!set.def.atc&&!set.def.hid&&!set.def.gb) {
	    g.drawString(this.d[2]+" "+this.d[0].toUpperCase(), (81-(g.stringWidth(this.d[2]+" "+this.d[0].toUpperCase()))/2) ,9); //date
	    
	  }else {
        g.setFont("Vector",32);
	    g.drawString(this.d[2]+" "+this.d[0].toUpperCase(), (90-(g.stringWidth(this.d[2]+" "+this.d[0].toUpperCase()))/2) ,10); //date
		
	    g.setColor(colbt);
		g.fillRect(0,0,15,50); //date
		var colbtf=col("white");
//        if (set.bt==0) colbtf=col("black");
        if (set.bt==0) colbtf=0;
        g.setColor(colbtf);
		g.setColor(0);g.drawImage(E.toArrayBuffer(atob("CxQBBgDgFgJgR4jZMawfAcA4D4NYybEYIwTAsBwDAA==")),3,13);
		
	  }  
     //print("exit bt",getTime()-this.startTime);

    }
    //batt status
    if (notify.ring){
	  if (this.ring!=notify.ring){
	    g.setColor(col("olive"));
	    g.fillRect(162,0,239,50);//batt
        g.setColor(col("white"));
g.drawImage(require("heatshrink").decompress(atob("kEgwMAn/gA4N/+ADB/4DC8FwAbvh+HnjHh8HjAYPABYNhAYVxAY0wIYU4H4U4EYUcnkP/0Oj0f/8Ph///8Hw/4g8D4IDBgIfBg8AD4IDBvgDCj+AAYIbCgEB//+FoM//gA==")),183,9);
	    
	  }
    }else if (notify.New&&(this.nCall!=notify.nCall||this.nInfo!=notify.nInfo||this.nIm!=notify.nIm)){
      this.batt=set.ondc;
	  if (notify.nCall)  {
        this.colf=col("white");this.colb=col("red");this.str=notify.nCall;this.bs="nCall";
        this.img =  require("heatshrink").decompress(atob("kEgwMAn/gA4N/+ADB/4DC8FwAbvh+HnjHh8HjAYPABYNhAYVxAY0wIYU4H4U4EYUcnkP/0Oj0f/8Ph///8Hw/4g8D4IDBgIfBg8AD4IDBvgDCj+AAYIbCgEB//+FoM//gA=="));
	  }else if (notify.nIm)  {
		this.colf=col("white");this.colb=col("raf");this.str=notify.nIm;this.bs="nIm";
        this.img = require("heatshrink").decompress(atob("jEYwIPMv///wCFj///EP//w4f/4fw/8P/F+j/+jATBwP/BoICBAA4mIHZAA="));
	  }else if (notify.nInfo)  {
		this.colf=col("white");this.colb=col("olive");this.str=notify.nInfo;this.bs="nInfo";
        this.img = require("heatshrink").decompress(atob("jEYwIHEv0AgP/wEH//gh//+Ef8/4j/D/E/4/8n///l///+v/nAQPDARM/4YXBAQIgCEwQsCGQQ4CHwQACA=="));
	  }else { this.batt=-1; this.bs=0;}
	  g.setColor(this.colb);
	  g.fillRect(162,0,239,50);//batt
      g.setColor(this.colf);
	  g.drawImage(this.img,170,12);
	  this.img=-1;
	  if (this.str>9) {
		g.setFont("7x11Numeric7Seg",3);
		g.drawString("9",200,9);
       g.setFont("Vector",25);
        g.drawString("+",225,14);
	  }else{
		g.setFont("7x11Numeric7Seg",3);
		g.drawString(this.str,210,9);
      }
      
    }else if (this.batt!=set.ondc ){
      this.batt=set.ondc;
      this.v=P8.batV(1);
      if (this.batt==1) g.setColor(colo.btnSt);
      else if (this.v<=20) g.setColor(col("red"));
      else g.setColor(col("olive"));
      g.fillRect(162,0,239,50);//batt
      g.setColor(colo.txt1);
      if (this.v<0) {g.setFont("Vector",21);g.drawString("EMPTY",240-(g.stringWidth("EMPTY")),14); 
	  }else if (this.v<100) {g.setFont("Vector",32);g.drawString(this.v,210-(g.stringWidth(this.v)),10);
		g.drawImage(require("heatshrink").decompress(atob("jEYwIEBngCDg//4EGgFgggCZgv/ASUEAQQaBHYPgJYQ=")),212,12);
        //g.drawImage(this.image("batteryMed"),212,12);
	  }else  {g.setFont("Vector",28);g.drawString("FULL",238-(g.stringWidth("FULL")),12); } 
      
      //print("end",getTime()-this.startTime);
    }
    this.widg();
    //loop
    this.tid=setTimeout(function(t){
    t.tid=-1;
    t.show();
    },1000,this);
  },
  widg:function(){
    //push-(wip)   
	if (notify.ring){
	if (this.ring!=notify.ring){
	  this.ring=notify.ring;g.setColor(col("black"));g.clearRect(0,151,239,239);g.setColor(col("white"));
      g.setFont("Vector",26);
      g.drawString((notify.in.name.length>16)?notify.in.name.substr(0,13)+"...":notify.in.name,122-(g.stringWidth((notify.in.name.length>16)?notify.in.name.substr(0,13)+"...":notify.in.name))/2,168); //Name
	  g.drawString((notify.in.number.length>16)?notify.in.number.substr(0,13)+"...":notify.in.number,122-(g.stringWidth((notify.in.number.length>16)?notify.in.number.substr(0,13)+"...":notify.in.number))/2,210); //Number
	  
	}
	}else if (this.nCall!=notify.nCall||this.nInfo!=notify.nInfo||this.nIm!=notify.nIm) {
      this.nInfo=notify.nInfo;this.nCall=notify.nCall;this.nIm=notify.nIm;this.New=notify.New;
      if (notify.nCall||notify.nIm||notify.nInfo){
		g.setColor(col("black"));
		g.clearRect(0,151,239,239);		  
        if (this.nCall)  {this.msg=JSON.parse(notify.call[0]);this.cf=col("red");}
	    else if (this.nIm)  {this.msg=JSON.parse(notify.im[0]);this.cf=col("lblue");}
        else if (this.nInfo)  {this.msg=JSON.parse(notify.info[0]);this.cf=col("raf2");}
	    g.setColor(col("white"));//
	    g.setFont("Vector",27);
	    g.drawString((this.msg.title.length>16)?this.msg.title.substr(0,13)+"...":this.msg.title,122-(g.stringWidth((this.msg.title.length>16)?this.msg.title.substr(0,13)+"...":this.msg.title))/2,168); //info
	    g.drawString((this.msg.body.length>16)?this.msg.body.substr(0,13)+"...":this.msg.body,122-(g.stringWidth((this.msg.body.length>16)?this.msg.body.substr(0,13)+"...":this.msg.body))/2,210); //info
		this.msg=-1;
	    
      }else if (this.wupd&&notify.weather&&!this.New){
		//this.widp=1;
		this.wupd=0;  	
		g.setColor(col("black"));
		g.clearRect(0,151,239,239);
		g.setColor(col("white"));//
		g.setFont("Vector",25);
		g.drawString(notify.weather.txt,119-(g.stringWidth(notify.weather.txt))/2,165); //info
		//temp
		g.drawImage(E.toArrayBuffer(atob("EyCBAADgAH8AH/AH3wDg4BwcA4GAcDAOBgHAwDuYB3MA7mAdzAO5gHcwHucHnPHjjzj45j+Pz/n5/z8/5+f8/H8dx8c8AOPAeD9+Af+AD4A=")),20,200);
        g.drawString(Math.round(notify.weather.temp-273),60,205);
        //hum   
		g.drawImage(E.toArrayBuffer(atob("HSCBAAAAAAAAEAAAAcAAAB8AAAD4AAAP4AAA94AABxwAAHjwAAODgAA4DgADwHgAHAHAAcAHAB4APADgAOAOGAOAYQQMBwhAcDhUA4HAIBwOAoDgcCCHAYAgMA4AA4BwABwBwAHAB4AcAB4DwAB//AAA/4AAAEAA")),145,200);
		g.drawString(notify.weather.hum,190,205); //info
		
		this.img=-1;
	  }else {
//		g.setColor(col("raf2"));
		g.setColor(col("black"));
		g.fillRect(0,151,239,239);
		
	  }
    }
  },
  time:function(){
  //minutes
        //print("pre time get ",getTime()-this.startTime);

  this.d=(Date()).toString().split(' ');
  this.t=(this.d[4]).toString().split(':');
  this.s=(this.t[2]).toString().split('');
            //print("post time get ",getTime()-this.startTime);

  if (this.t[1]!=this.min ){
    this.min=this.t[1];
    g.setFont("Vector",66);
	this.fmin=colo.txt1;
    this.fsec=col("black");
	if (global.alrm) {
    if (alrm.buzz!=-1) {this.bmin=col("gray");this.fmin=col("yellow");this.fsec=col("gray");this.bsec=col("yellow");}
    else if (alrm[1].tmr!==-1||alrm[2].tmr!==-1||alrm[3].tmr!==-1) {this.bmin=colo.btnEn;this.bsec=colo.btnEn;}
    else  {this.bmin=col("raf2");this.fsec=col("dgray1");this.bsec=col("raf2");}
	}else {this.bmin=col("raf2");this.fsec=col("dgray1");this.bsec=col("raf2");}
	g.setColor(this.bmin);
    g.fillRect(105,55,210,150);
	g.setColor(this.fmin);
    g.drawString(this.t[1],120,72);
    
  }
   //seconds
  g.setColor(this.bsec);
  g.fillRect(210,55,240,150);
  g.setColor(this.fsec);//
  g.setFont("Vector",35);
  g.drawString(this.s[0],218,70); //seconds
  g.drawString(this.s[1],218,108); //seconds
   
  //hours
  if (this.t[0]!=this.hour){
    this.hour=this.t[0];
    g.setColor(colo.bck1);
    g.fillRect(0,55,100,150);
    g.setColor(colo.txt);
    g.setFont("Vector",66);
    g.drawString(this.t[0],15,72); //hours
  
  }
	  
  },
  tid:-1,
  run:false,
  clear : function(){
    g.setColor(col("black"));
    g.clear();
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(){
    P8.sleep();
    this.clear();
  }
};
//
face[1] = {
  offms:1000,
  init: function(){
  return true;
  },
  show : function(){
	if (Boolean(require("Storage").read("euc"))) {face.go("euc",0);}
	else if (Boolean(require("Storage").read("alarm"))) {face.go("alarm",0);}  
	return true;
  },
  clear: function(){
  return true;
  },
  off: function(){
    P8.sleep();
  }
};	

//touch
touchHandler[0]=function(e,x,y){
    var p=D16;
    if (e==5){
	  if (x<158 && y<50){//date
		if (notify.ring){
			digitalPulse(p,1,[30,50,30]);
			set.gbSend({t:"call",n:"ignore"});notify.ring=0;
		}else  digitalPulse(p,1,40);
	  }else if (x>105 && (55<y&&y<150)){ 
	     digitalPulse(D16,1,[30,50,30]);
		if (Boolean(require("Storage").read("alarm"))) {face.go("alarm",0);return;}
	//hid music controls
      }else if (x>158 && y<50){//batt
		if (notify.ring){
			digitalPulse(D16,1,[30,50,30]);
			set.gbSend({t:"call",n:"accept"});notify.ring=0;
		}else if (face[0].bs){
			notify[face[0].bs]=0;
			if (!notify.nInfo&&!notify.nCall&&!notify.nIm) {face[0].batt=-1;face[0].bs=0;notify.New=0;}
			digitalPulse(D16,1,[30,50,30]);
		}else if (set.hidM){
			digitalPulse(D16,1,[30,50,30]);
			if (Boolean(require("Storage").read("hid"))) {face.go("hid",0);return;}
		}else digitalPulse(D16,1,40);
	  }else if (y>151&&face[0].bs){ 
		if (Boolean(require("Storage").read("notify"))) {
          digitalPulse(D16,1,[30,50,30]);	
          face.go("notify",5,face[0].bs.substr(1).toLowerCase());return;
		}else digitalPulse(D16,1,40);
	  }else digitalPulse(D16,1,40);
    }else if  (e==1){
		face.go("main",-1);return;
    }else if  (e==2){
		if (y>160&&x<50) {
        if (g.bri.lv!==7) {this.bri=g.bri.lv;g.bri.set(7);}
        else g.bri.set(this.bri);
		digitalPulse(D16,1,[30,50,30]);
     }else if (y>190) {
		if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
	  } else digitalPulse(D16,1,40);
    }else if  (e==3){
		if (Boolean(require("Storage").read("euc"))) {face.go("euc",0);return;}
		else if (Boolean(require("Storage").read("alarm"))) {face.go("alarm",0);return;}
    }else if  (e==4){
		if (Boolean(require("Storage").read("notify"))) {face.go("notify",0);return;}
    }else if  (e==12){
	if (150<y&&y<200){ 	
		digitalPulse(D16,1,180);
		notify.New=0;notify.nInfo=0;notify.nCall=0;notify.nIm=0;notify.nMail=0;
	}else if (x>162 && y>200){ 
      digitalPulse(D16,1,40);
	//alarms
     }else if (x>105 && (55<y&&y<150)&&global.alrm){ 
	   if (alrm.buzz!=-1) {
		alrm.stop(alrm.now); digitalPulse(D16,1,[80,40,80]);
	   }else {
        digitalPulse(D16,1,[30,50,30]);
		if (global.alrm){face.go("alarm",0);return;}
	   }	  
     }else digitalPulse(D16,1,40);
    }
   this.timeout();
};
