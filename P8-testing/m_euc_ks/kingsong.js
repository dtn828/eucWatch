//kingsong euc module 
//m_euc
//euc.con(euc.mac[euc.go]);
//euc.wri("lightsOn")
//euc.ch.writeValue([0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A]) 

if (!global.euc){
//vars
global.euc= {
  spd: ["0","0"], 
  spdC:0,
  spdT:0,
  amp: "0", 
  ampC: 0, 
  batt: "0", 
  batC: 0, 
  temp: "0", 
  tmpC: 0, 
  trpC: 0, 
  trpN: "0.0", 
  trpL: "0.0", 
  trpT: "0.0", 
  trpR: "0.0",
  aver:"0.0",
  rdmd:0,
  time:"0",
  lock: -1,
  alrm: 0,
  conn: "OFF",
  aLck: 0,
  far: 83,
  near: 65,
  busy:0,
  make:"ks",
  model:0,
  chrg:0
};
//alerts
euc.alert = {
  spd: 23,
  temp: 60,
  batt: 20,
  ampH: 18,
  ampL: -6,
  on: false,
};
euc.tmp = {
  spd: ["0","0"], 
  amp: "0", 
  temp: "0", 
  count:0,
  batt: "0", 
  trpN: "0",
  cmd: false,
  reconnect:-1,
  rssi:"",
};
euc.cmd=function(no){
	switch (no) {
	  case "pass":return [0xAA,0x55,0x31,0x32,0x33,0x34,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x44,0x14,0x5A,0x5A]; 
      case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
	  case "model":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x63,0x14,0x5A,0x5A]; 
	  case "info1":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A]; 
	  case "info2":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x54,0x14,0x5A,0x5A]; 
      case "lightsOn":euc.lght=1;return [0xAA,0x55,0x12,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
      case "lightsOff":euc.lght=0;return [0xAA,0x55,0x13,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
	  case "lightsAuto":euc.lght=4;return [0xAA,0x55,0x14,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];
      case "rideSoft":return [0xAA,0x55,0x02,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
      case "rideMed":return [0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
      case "rideHard":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];  
	  case "lock":euc.lock=1;return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x5d,0x14,0x5A,0x5A]; 
	  case "unlock":euc.lock=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x37,0x37,0x33,0x35,0x32,0x35,0x5d,0x14,0x5A,0x5A];	  
    }
};
}

euc.con=function(mac){
var euc_al;
var euc_al_s;
var euc_al_a;
var euc_al_t;
var euc_al_b;

if ( global["\xFF"].BLE_GATTS!="undefined") {
	if (set.def.cli) print("ble allready connected"); 
	if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
}
//start connection  
NRF.connect(mac,{minInterval:7.5, maxInterval:7.5})
.then(function(g) {
   return g.getPrimaryService(0xffe0);
}).then(function(s) {
  return s.getCharacteristic(0xffe1);
}).then(function(c) {
  c.on('characteristicvaluechanged', function(event) {
    this.KSdata = event.target.value.buffer;
    if (euc.busy) return;
    if (this.KSdata[16]==169) {
		this.alert=0;
        euc.spd=((((this.KSdata[4] & 0xFF) + (this.KSdata[5] << 8))/100)+"").split("."); 
		if (euc.spd[0]>45)  {
			euc.spdC=col("red");this.alert=1;
		}else if (euc.spd[0]>35) {
			euc.spdC=col("yellow");this.alert=1;
		}else if (euc.spd[0]>25) {
			euc.spdC=col("white");this.alert=1;			
		}
        //amp
		this.cur=((this.KSdata[10] & 0xFF) + (this.KSdata[11] << 8));
        if (this.cur > 32767) this.cur = this.cur - 65536;
        euc.amp=(this.cur/100).toFixed(2);
		//charging
		if (euc.spd[0]===0&&euc.amp<0) {
		}
		//
		else if (euc.amp>30)  {
			euc.ampC=col("red");this.alert=1;
			euc.spdC=col("red");		
		}else if (euc.amp>23) {
			euc.ampC=col("yellow");this.alert=1;
			if (euc.spdC!=col("red")) euc.ampC=col("yellow");
		}else if (euc.amp>15)  {
			euc.ampC=col("white");
			if (euc.spdC==col("black")) euc.spdC=col("white");
		}else if (euc.amp<-10)  {
			euc.ampC=col("red");this.alert=1;
			euc.spdC=col("red");
		}else if (euc.amp<-5)  {
			euc.ampC=col("yellow");this.alert=1;
			if (euc.spdC!=col("red")) euc.spdC=col("yellow");
		}else if (euc.amp<0)  {
			euc.ampC=col("white");this.alert=1;
			if (euc.spdC==col("black")) euc.spdC=col("white");
		}else {euc.ampC=col("dgray");}
		
		//volt
        euc.volt=(((this.KSdata[2] & 0xFF) + (this.KSdata[3] << 8))/100)+"";
        euc.batt=(((euc.volt/20)*100-330)*1.1111)|0;
		if (euc.batt<20)  {
			euc.batC=col("red");this.alert=1;
			euc.spdC=col("red");
		}else if (euc.batt<60) {
			euc.batC=col("yellow");this.alert=1;
		} else euc.batC=col("black");
        //temp
		euc.temp=(((this.KSdata[12] & 0xFF) + (this.KSdata[13] << 8))/100)+"";
		if (euc.temp>65)  {
			euc.tmpC=col("red");this.alert=1;
			euc.spdC=col("red");
		}else if (euc.temp>55) {
			euc.tmpC=col("yellow");this.alert=1;
		} else euc.tmpC=col("black");
		//trip
        euc.trpT=(((this.KSdata[6] << 16) + (this.KSdata[7] << 24) + this.KSdata[8] + (this.KSdata[9] << 8))/1000).toFixed(1);
		//mode                                    
        euc.rmode=this.KSdata[14];
		if (!this.alert)  euc.spdC=col("black");
    }else if  (this.KSdata[16]==185){
        euc.trpL=(((this.KSdata[2] << 16) + (this.KSdata[3] << 24) + this.KSdata[4] + (this.KSdata[5] << 8)) / 1000.0).toFixed(1);
		euc.time=(((this.KSdata[6] & 0xFF) + (this.KSdata[7] << 8)) / 60.0).toFixed(0);
        euc.spdT=(((this.KSdata[8] & 0xFF) + (this.KSdata[9] << 8)) / 100.0).toFixed(1);
    }else if (euc.conn=="OFF"){
      euc.busy=1;
	  if (set.def.cli) console.log("EUCstartOff");
	  euc.lock=1;
      digitalPulse(D16,1,120);
	  c.writeValue(euc.cmd("lightsAuto"));
      if (euc.tmp.reconnect) {clearTimeout(euc.tmp.reconnect); euc.tmp.reconnect=0;}
	  euc.tmp.reconnect=setTimeout(() => {c.writeValue(euc.cmd("lock")).then(function() {
		euc.tmp.reconnect=0;global["\xFF"].BLE_GATTS.disconnect();});
	  }, 200);
    return;
	}
  });
return  c;
}).then(function(c) {
//on disconnect
  euc.ch=c;
  global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
    if (set.def.cli) console.log("EUC Disconnected :",reason);
	if (euc.tmp.reconnect) {clearTimeout(euc.tmp.reconnect); euc.tmp.reconnect=0;}
    if (euc.conn!="OFF") {  
	 if (set.def.cli) console.log("EUC restarting");
     euc.conn="WAIT";
     euc.tmp.reconnect=setTimeout(() => {  euc.con(euc.mac[euc.go]); }, 500);
      return;
    }else {
	  if (set.def.cli) console.log("Destroy euc (reason):",reason);
	  global["\xFF"].bleHdl=[];
	  global.BluetoothDevice=undefined;
	  global.BluetoothRemoteGATTServer=undefined;
	  global.BluetoothRemoteGATTService=undefined;
	  global.BluetoothRemoteGATTCharacteristic=undefined;
	  global.Promise=undefined;
	  global.Error=undefined;
      NRF.setTxPower(set.def.rfTX);
    }
  });
//connected ****************************
  console.log("EUC connected"); 
  digitalPulse(D16,1,[90,40,150,40,90]);
  euc.busy=1;
  setTimeout(function(){c.writeValue(euc.cmd("serial"));euc.conn="READY";},200);
  setTimeout(function(){c.writeValue(euc.cmd("pass"));},500);
  setTimeout(function(){c.writeValue(euc.cmd("unlock"));euc.lock=0;euc.busy=0;},800);
  setTimeout(function(){c.startNotifications();},1500);
//reconect
}).catch(function(err)  {
  if (set.def.cli) console.log("EUC error", err);
  if (euc.tmp.reconnect) {clearTimeout(euc.tmp.reconnect); euc.tmp.reconnect=0;}
//  global.error.push("EUC :"+err);
  if (euc.conn!="OFF") {
    if (set.def.cli) console.log("not off");
    if ( err==="Connection Timeout"  )  {
	  if (set.def.cli) console.log("retrying :timeout");
	  euc.conn="LOST";
	  if (euc.lock==1) digitalPulse(D16,1,250);
	  else digitalPulse(D16,1,[250,200,250,200,250]);
	  euc.tmp.reconnect=setTimeout(() => {
		euc.tmp.reconnect=0;
	    euc.con(set.def.euc); 
	  }, 5000);
	}else if ( err==="Disconnected"|| err==="Not connected")  {
      if (set.def.cli) console.log("retrying :",err);
      euc.conn="FAR";
	  //if (euc.lock==1) digitalPulse(D16,1,40);
	  //else digitalPulse(D16,1,[100,150,100]);
      euc.tmp.reconnect=setTimeout(() => {
		euc.tmp.reconnect=0;
	    euc.con(set.def.euc); 
      }, 500);
    }
  } else {
  	  if (set.def.cli) console.log("Destroy euc (reason-1):",reason);
	  global["\xFF"].bleHdl=[];
      global.BluetoothDevice=undefined;
	  global.BluetoothRemoteGATTServer=undefined;
	  global.BluetoothRemoteGATTService=undefined;
	  global.BluetoothRemoteGATTCharacteristic=undefined;
	  global.Promise=undefined;
	  global.Error=undefined;
      NRF.setTxPower(set.def.rfTX);
  }
});
};

euc.wri= function(n) {
  euc.ch.writeValue(euc.cmd(n));
  return;
};

euc.tgl=function(){ 
  if (euc.conn!="OFF" ) {
    digitalPulse(D16,1,[90,60,90]);  
	if (euc.tmp.reconnect ||  euc.conn=="WAIT" || euc.conn=="ON") {
    clearTimeout(euc.tmp.reconnect); euc.tmp.reconnect=0;
    }
	if (!set.def.acc) acc.off();
    euc.conn="OFF";
	face.go(set.dash[set.def.dash],0);
  }else {
    NRF.setTxPower(4);
    digitalPulse(D16,1,100); 
	if (set.def.dashSlot==1)set.def.euc=(require("Storage").readJSON("setting.json",1)||{}).dash_slot1_mac;
	else if (set.def.dashSlot==2)euc.mac=(require("Storage").readJSON("setting.json",1)||{}).dash_slot2_mac;
	else if (set.def.dashSlot==3)euc.mac=(require("Storage").readJSON("setting.json",1)||{}).dash_slot3_mac;
	else if (set.def.dashSlot==4)euc.mac=(require("Storage").readJSON("setting.json",1)||{}).dash_slot4_mac;
	if(!set.def.euc) {
		face.go('dashScan',0);
	}else {
		if (euc.conn == "OFF") euc.tmp.count=22; else euc.tmp.count=0;  //unlock
		euc.conn="ON";
		if (!set.def.acc) acc.on();
		euc.mac(euc.con); 
		face.go(set.dash[set.def.dash],0);
	}
  } 
};