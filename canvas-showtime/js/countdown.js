
//自适应屏幕的大小
var WINDOW_WIDTH = window.innerWidth;;
var WINDOW_HEIGHT =window.innerHeight;
var MARGIN_LEFT = Math.round(WINDOW_WIDTH /15);
var RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1
var MARGIN_TOP = Math.round(WINDOW_HEIGHT /14);
var balls = [];
const colors = ["#00ffff","#0099CC","#00ff00","#0000ff","#ff4500","#a52a2a","#dc143c","#008b8b","#2f4f4f","#8b008b","#CC0000","#ffd700","#7cfc00","#9acd32"]
window.onload = function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds()
    //定时器
    setInterval(
        function(){
            render( context );//绘点函数
            update();//计时函数
        },
        50
    );
}
//设置的button样式要搬移到button.css中
// function changDom(){
//     But1.style.display="block";
//     But1.style.backgroundColor="#eee";
//     But1.style.width="100px";
//     But1.style.height="35px";
//     But1.style.borderRadius="15px";
//     But1.style.marginLeft="50px"
//     But1.style.marginRight="15px";
//     But1.style.cssFloat="left";
//     But2.style.cssFloat="left";
//     But2.style.font="bold 10pt sans";
//     But2.style.textShadow="2px 2px 1px #888";
//     But2.style.display="block";
//     But2.style.backgroundColor="#eee";
//     But2.style.width="100px";
//     But2.style.height="35px";
//     But2.style.borderRadius="15px";
// }changDom();
var BOOL=0;//0的bool为false判断为顺计时，1位倒计时
But1.onclick=function(){
    BOOL=0;
}
But2.onclick=function(){
    BOOL=1;
}//通过改变BOOL函数来动态改变BOOL值从而实现deom的不同。
//到计时一个小时   
    var endTime=new Date();
    endTime.setTime(endTime.getTime()+3600*1000);
    var curShowTimeSeconds = 0
function getCurrentShowTimeSeconds() {
    if(BOOL){
        //倒计时效果。。。。
        var curTime = new Date();
        var ret = endTime.getTime() - curTime.getTime();
        // console.log(curTime);
        // console.log(endTime);
        ret = Math.round( ret/1000 )
        return ret >= 0 ? ret : 0;//if(ret>=0){return ret;}else{return 0;};
    }else{
        //顺次计时效果
        var curTime = new Date();
        var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
        return ret;
    }
}  
function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
    var curSeconds = curShowTimeSeconds % 60

    if( nextSeconds != curSeconds ){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();

    // console.log( balls.length)
}

function updateBalls(){
//碰撞检测， x，y， g让小球是个抛物线下落
    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.65;//越到最后速度越慢，达到最后停止。
        }
    }
//超出canvas的球清空，不占据内存。优化的代码
    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
            balls[cnt++] = balls[i]

    while( balls.length >cnt ){
        balls.pop();
    }
}
//掉落的小球
function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall )
            }
}
//绘制基点小球
function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )
    var seconds = curShowTimeSeconds % 60

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for( var i = 0 ; i < balls.length ; i ++ ){
        //掉落的球。
        if(BOOL){
            //倒计时掉落的小球stroke绘制
            cxt.strokeStyle=balls[i].color;
            cxt.beginPath();
            cxt.arc( balls[i].x , balls[i].y , RADIUS ,0,2*Math.PI, true );
            cxt.closePath();
            cxt.stroke();
        }else{
            //顺计时时掉落的小球stroke绘制
            cxt.fillStyle=balls[i].color;
            cxt.beginPath();
            cxt.arc( balls[i].x , balls[i].y , RADIUS ,0,2*Math.PI, true );
            cxt.closePath();
            cxt.fill();
        }   
    }
}
function renderDigit( x , y , num , cxt ){

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                if(BOOL){
                    for (var k = 0; k < 5; k++){
                    //绘制五角星
                            cxt.lineTo(Math.cos((18 + k * 72 ) / 180 * Math.PI) *RADIUS  + (x+j*2*(RADIUS+1)+(RADIUS+1)), 
                                       -Math.sin((18 + k * 72) / 180 * Math.PI) * RADIUS + ( y+i*2*(RADIUS+1)+(RADIUS+1) ));
                            cxt.lineTo(Math.cos((54 + k * 72 ) / 180 * Math.PI) * (RADIUS-5) + (x+j*2*(RADIUS+1)+(RADIUS+1)), 
                                       -Math.sin((54 + k * 72) / 180 * Math.PI) * (RADIUS-5) + ( y+i*2*(RADIUS+1)+(RADIUS+1)) );
        }
                    cxt.fillStyle=balls[i].color;
                    cxt.closePath()
                    cxt.fill()
    }else{
                    //绘制圆
                    cxt.strokeStyle = "#fff";
                    cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                    cxt.closePath()
                    cxt.stroke()                 
    }
                        
               
            }
}

