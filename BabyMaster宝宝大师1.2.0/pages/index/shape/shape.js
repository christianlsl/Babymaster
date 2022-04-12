Page({
  data:{
    pen:5,
    color:"#f1404b"
  },
  isClear:false,

  onLoad(){
    this.ctx=wx.createCanvasContext('myCanvas',this);
  },
  touchStart(e){
    this.x1=e.changedTouches[0].x;
    this.y1=e.changedTouches[0].y;
    if(this.isClear){
      this.ctx.setStrokeStyle('#FFFFFF');
      this.ctx.setLineCap('round');
      this.ctx.setLineJoin('round');
      this.ctx.setLineWidth(20);
      this.ctx.beginPath();
    }else{
      this.ctx.setStrokeStyle(this.data.color);
      this.ctx.setLineWidth(this.data.pen);
      this.ctx.setLineCap('round');
      this.ctx.beginPath();
    }
  },

  touchMove(e){
    var x2=e.changedTouches[0].x;
    var y2=e.changedTouches[0].y;
    if(this.isClear){
      this.ctx.save();
    this.ctx.moveTo(this.x1,this.y1);
    this.ctx.lineTo(x2,y2);
    this.ctx.stroke();
    this.x1=x2;
    this.y1=y2;
    }else{
    this.ctx.moveTo(this.x1,this.y1);
    this.ctx.lineTo(x2,y2);
    this.ctx.stroke();
    this.x1=x2;
    this.y1=y2
    }
    this.ctx.draw(true);
  },
   touchEnd(){},

   penSelect(e){
     this.setData({
       pen:parseInt(e.currentTarget.dataset.param)
     })
     this.isClear=false;
   },

   colorSelect(e){
     console.log(e.currentTarget);
     this.setData({
       color:e.currentTarget.dataset.param
     });
     this.isClear=false;
   },

   clear(){
     this.isClear=true;
   },

   clearAll(){
     this.setData({
       pen:5,
       color:'#000000'
     })
     this.ctx.draw();
   }
})