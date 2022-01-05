/*
定义一系列的函数事件
*/
var hnt = (function(){
    var hnt = {};

    //存储动画的数组
	var movie = new Array();
	//动画的顺序
	var order = 0;
    //3个底座的数组
	hnt.A = new Array();
	hnt.B = new Array();
	hnt.C = new Array();
	//3个底座的名字
	hnt.A.name = 'A';
	hnt.B.name = 'B';
	hnt.C.name = 'C';
	//三个底座的顺序号
	hnt.A.val = 1;
	hnt.B.val = 2;
	hnt.C.val = 3;
	//底座的top值
	hnt.defTop = 0;
	//盘子的高度
	hnt.height = 0;

    //已经开始动画
	hnt.isStart = false;
	//动画完成
	hnt.complete = false;

    //默认属性
    hnt.options = {
        speed:400,     //移动速度
		highlight:true,//移动过程是否变色
		color:'red',   //移动过程中变色
		xjg:250 	   //横向间隔 250px
    };

    //创造盘子
    hnt.createBlock = function(position){
        //创造一个div（盘子）加入到id为block的div中
        $('<div>').addClass('block')
				.addClass('bl'+position.order)
				.css({
				    top:position.top,
				    left:position.left,
				    height:position.height,
				    width:position.width
				})
				.appendTo($('#block'));
        //将盘子加入到初始的A塔中
        hnt.A.push('.bl' + position.order);
    };

    //初始化
    hnt.init = function(num){
        //清空所有内容
        $('#block').empty();
        hnt.A.length = 0;
        hnt.B.length = 0;
        hnt.C.length = 0;
        movie.length = 0;
        order = 0;
        hnt.isStart = false;

        //定义起始坐标
        var start = {top : 180, left : 60 };
        hnt.defTop = start.top;
        hnt.height = (start.top / num) > 40 ? 40 : (start.top / num); 

        //盘子的宽度
        var _width = (180 - 50) / (2 * num);

        //开始创建
        for (var i = 0; i < num ; i++)
        {
            hnt.createBlock({
                order : num - i,//编号
                top : start.top - (i+1) * hnt.height,
                left : start.left + i*_width,
                height : hnt.height,
                width : 180 - 2 * i * _width
            });
        }
    };

    //获取当前数组(柱子)的高度
    hnt.getArrCurTop = function(arr){
        if (arr.length == 0)
        {
            return hnt.defTop;
        }
        else
        {
            return hnt.defTop - arr.length * hnt.height;
        }
    };

    //获取下一个数组(柱子的高度)
    hnt.getArrNextTop = function(arr){
        return hnt.defTop - (arr.length+1) * hnt.height;
    }

    //盘子如何移动，将移动步骤保存到movie中，移动步骤即盘子top,left值的变化
    hnt.movie = function(_from, _to, options){
        var opt = $.extend(hnt.options,options);
				
        //获取当前的高度
        var _ftop = hnt.getArrCurTop(_from);
        //取出要移动的盘子
        var _felem = _from.pop();
        
        //获取目标位置高度
        var _ttop = hnt.getArrNextTop(_to);
        //上面获取高度后，就可以将对象_felem放进去了
        _to.push(_felem);
        
        //计算两者间距
        var _jg = Math.abs(_from.val - _to.val);
        //通过_fx来表示方向
        var _fx = (_from.val - _to.val) > 0 ? -1 : 1;
        //间距1为相邻，间距2为隔一个..隔一个的时候，需要考虑中间的高度，中间的必然是Hnt.B
        if(_jg == 1){
            //直接比较两者高度..
            if(_ftop == _ttop){
                //横着移动过去就OK
                movie.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left: _fx * opt.xjg},
                    options:opt
                });
            }
            else if(_ftop<_ttop){
                //横移
                movie.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left: _fx * opt.xjg},
                    options:opt,
                });
                //下落
                movie.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{top:_ttop},
                    options:opt
                });
            }
            else{
                //向上移动
                movie.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{top:_ttop},
                    options:opt,
                });
                //横移
                movie.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left: _fx * opt.xjg},
                    options:opt
                });
            }
        }
        else{
            //next - 因为要从B上面经过...
            var _btop = hnt.getArrNextTop(hnt.B);
            //获取最高值
            var _min = Math.min.call({},_btop,_ftop,_ttop);
            if(_min == _btop){
                if(_min<_ftop){
                    //向上移动
                    movie.push({
                        elem:_felem,
                        from:_from.name,
                        to:_to.name,
                        end:{top:_min},
                        options:opt,
                    });
                }
                //横移
                movie.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left: _fx * opt.xjg*2},
                    options:opt
                });
                if(_min<_ttop){
                    //下落
                    movie.push({
                        elem:_felem,
                        from:_from.name,
                        to:_to.name,
                        end:{top:_ttop},
                        options:opt,
                    });
                }
            }
            else if(_min == _ftop){
                //横移
                movie.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left: _fx * opt.xjg * 2},
                    options:opt
                });
                if(_min<_ttop){
                    //下落
                    movie.push({
                        elem:_felem,
                        from:_from.name,
                        to:_to.name,
                        end:{top:_ttop},
                        options:opt,
                    });
                }
            }
            else if(_min == _ttop){
                if(_min<_ftop){
                    //向上移动
                    movie.push({
                        elem:_felem,
                        from:_from.name,
                        to:_to.name,
                        end:{top:_min},
                        options:opt,
                    });
                }
                //横移
                movie.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left: _fx * opt.xjg*2},
                    options:opt
                });
            }
        } 
    };

    //盘子的移动动画
    hnt.movie.move = function(param, order){
        if("top" in param.end){
            $(param.elem).animate({top:param.end.top},param.options.speed);
        }
        else{
            $(param.elem).animate({left:'+='+param.end.left+'px'},param.options.speed);
        }
    };

    //播放动画
    function play(){
        if(!hnt.isStart){
            alert('终止运行');
            return;
        }
        if(order < movie.length){
            var time = movie[order].options.speed;
            hnt.movie.move(movie[order], order);
            order++;
            setTimeout(play, time < 300 ? 300 :time);
        }
        else{
            setTimeout(function(){
                hnt.complete = true;
                alert('移动完成!');
            },1000);
        }
    }

    //执行播放动画
    hnt.movie.play = function(){
        if(movie.length > 0 && order == 0){
            //执行动画
            play();
        }
    };

    //汉诺塔算法
    hnt.move = function(n, a, b, c){
        if(n>=1){
            hnt.move(n-1, a, c, b);
            hnt.movie(a, c, {});
            hnt.move(n-1, b, a, c);
        }
    }

    //开始
    hnt.start = function(n){
        hnt.move(n, hnt.A, hnt.B, hnt.C);
    };

    //返回该对象
    return hnt;
})();


//文档就绪后加载下列事件
$(function(){
    //初始化
    $('#init').click(function(){
        hnt.init($('#num').val());
    });

    //开始演示
    $('#start').click(function(){
        if(!hnt.isStart){
            hnt.isStart = true;
            //设置速度
            hnt.options.speed = $('#speed').val();
            hnt.start($('#num').val());		
            hnt.movie.play();
        }
    });
});