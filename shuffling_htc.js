//author：htc
//datetime:2018-05-10
//version:1.0
//description:封装轮播代码
(function($,window,document){
	function Shuffling(el,imagesArr,options){
		this.el = el;
		this.imagesArr = imagesArr;
		this.options = {
			imageWidth:options.imageWidth||0,//轮播图片的宽度
			imageHeight:options.imageHeight||0,//轮播图片的高度
			moveSpeend:options.moveSpeend||0,//点击切换时的移动速度
			isChange:options.isChange==true,//是否显示左右切换按钮（默认为true）
			isAotu:options.isAotu==true,//是否开启自动轮播（默认为true）
			aotuSpeend:options.aotuSpeend||0,//自动轮播的速度
			callback:options.callback||function(){//回调函数

			}
		};
		this.init();
	}

	Shuffling.prototype={
		constuctor:Shuffling,
		init:function(){
			this.createDom();
			this.clickDom();
			this.aotuChange();
		},
		createDom:function(){//创建主体轮播部分dom
			var that = this;
				shufflingHtml = '',
				imagesHtml = '',
				pointHtml = '',
				leftHtml = '',
				rightHtml ='',
				width=that.options.imageWidth,
				height = that.options.imageHeight;

				for(var i=0;i<that.imagesArr.length;i++){
					imagesHtml+='<li style="width:'+width+'px;height:'+height+'px"><img src="'+that.imagesArr[i]+'" style="width:'+width+'px;height:'+height+'px"/></li>'
					i==0?pointHtml+='<li class="selectedLi"></li>':pointHtml+='<li></li>';
				}
				that.options.isChange==true?leftHtml='<div class="left_htc" style="top:'+((height-60)/2)+'px"><</div>':leftHtml='';
				that.options.isChange==true?rightHtml='<div class="ringht_htc" style="top:'+((height-60)/2)+'px">></div>':rightHtml='';

				shufflingHtml='<div id="shuffling_htc" style="width:'+width+'px;height:'+height+'px">'+
					leftHtml+
					'<div id="imgsDiv" style="width:'+(width*that.imagesArr.length)+'px;height:'+height+'px">'+
						'<ul class="imagesUl">'+
							imagesHtml+
						'</ul>'+
					'</div>'+
					'<ul class="point_htc">'+
						pointHtml+
					'</ul>'+
					rightHtml+
				'</div>';

				that.el.html(shufflingHtml);
		},
		clickDom:function(){
			var that = this,
				width=that.options.imageWidth,
				speend=that.options.moveSpeend,
				index = 0,
				pointLi = $(".point_htc").children('li'),
				turnLeft = $(".left_htc"),
				turnRight = $('.ringht_htc'),
				imgsDiv = $("#imgsDiv")

				//点击圆点切换图片
				pointLi.on('click',function(){
					index = $(this).index();
					$(this).addClass('selectedLi').siblings().removeClass('selectedLi');
					changeImages(index);
				})

				//上一张
				turnLeft.on('click',function(){
					index--;
					if(index<0){index=that.imagesArr.length-1}
					imgsDiv.animate({"left":-(width*index)}, speend)
					pointLi.eq(index).addClass('selectedLi').siblings().removeClass('selectedLi');
				})

				//下一张
				turnRight.on('click',function(){
					index++;
					if(index==that.imagesArr.length){index=0}
					imgsDiv.animate({"left":-(width*index)}, speend)
					pointLi.eq(index).addClass('selectedLi').siblings().removeClass('selectedLi');
				})

				function changeImages(index){
					imgsDiv.animate({"left":-(width*index)}, speend)
				}
		},
		aotuChange:function(){//自动轮播
			var that = this,
				index = 0,
				interval = ''
				shuffling_htc = $("#shuffling_htc");

			if(that.options.isAotu){
				intervals();

				shuffling_htc.mouseover(function(){
					clearInterval(interval);
				});

				shuffling_htc.mouseout(function(){
					intervals();
				});

				function intervals(){
					interval = setInterval(()=>{
						index++;
						if(index==that.imagesArr.length){index=0};
						$("#imgsDiv").animate({"left":-(that.options.imageWidth*index)},that.options.moveSpeend)
						$(".point_htc li").eq(index).addClass('selectedLi').siblings().removeClass('selectedLi');
					},that.options.aotuSpeend)
				}
			}
		}
	}

	$.fn.ShufflingHtc = function(imagesArr,options){
		return new Shuffling($(this),imagesArr,options);
	}

})(jQuery,window,document)