//handler - enaon 2021
//UI
eval(require('Storage').read('UI'));
//notify
eval(require('Storage').read('handler_notify'));
//set
eval(require('Storage').read('handler_setter'));
//conn
eval(require('Storage').read('handler_conn'));
//face
eval(require('Storage').read('handler_face'));
//charge 
eval(require('Storage').read('handler_charge'));
//touch controller
touchHandler= {
	go:function(e,x,y){
		touchHandler[face.pageCurr](e,x,y);
	},
};
//button
eval(require('Storage').read('handler_button'));
//var i2c=I2C1;
var i2c=new I2C();
i2c.setup({scl:ew.pin.i2c.SCL, sda:ew.pin.i2c.SDA, bitrate:100000});
if (set.def.touchtype=="816"){ //816
	eval(require('Storage').read('handler_touch_816'));
}else{
	eval(require('Storage').read('handler_touch_716'));
}
//acc
eval(require('Storage').read('handler_accel_SC7A20'));