//author:htc
//version:1.0
//datetime:20180511
//description:封装分页代码
(($,window,document)=>{
	function pageHtc(el,options){
		this.el = el;
		this.options = {
			liWidth:options.liWidth||0,//页码宽度
			// pageCount:options.pageCount||0,//总页数
			pageIndex:options.pageIndex||0,//页码下标
			pageDataCount:options.pageDataCount||0,//数据总数
			pagePreCount:options.pagePreCount||0,//每页数据个数
			isPageTurn:options.isPageTurn==true,//是否开启跳转
			callback:options.callback||function(){

			}
		};
		this.init();
	}

	pageHtc.prototype={
		constuctor:pageHtc,
		init:function(){
			this.createDom();
			this.bindEle();
		},
		createDom:function(){
			var that = this,
				liWidth = that.options.liWidth,
				speend= 500,
				ulDom = '',
				lisHtml = '',
				isPreHtml = '',
				isTurnHtml = '',
				contentHtml='',
				count = returnPageCount();

				for(let i=0;i<count;i++){
					i==0?ulDom+='<li class="selectedLi" style="width:'+that.options.liWidth+'px">'+(i+1)+'</li>':ulDom+='<li style="width:'+that.options.liWidth+'px">'+(i+1)+'</li>';
				};

				if(count>5){
					lisHtml='<div id="ulDom" style="width:'+((liWidth*5)+4)+'px;max-width:'+((liWidth+1)*5-1)+'px;min-width:'+liWidth+'px;">';
				}else{
					lisHtml='<div id="ulDom" style="width:'+((liWidth+1)*count-1)+'px;max-width:'+((liWidth+1)*5-1)+'px;min-width:'+liWidth+'px;">';
				}

				that.options.isPageTurn==true?isTurnHtml = '<div id="turnPage">'+
							'<input id="goNum" type="number" style="width: 50px;height: 35px;">'+
							'<button id="goPage" style="height: 40px;">Go</button>'+
						'</div>':isTurnHtml='';

				contentHtml = '<div id="pageHtc">'+
						'<div id="homePage">'+
							'首页'+
						'</div>'+
						'<div id="backPage">'+
							'上一页'+
						'</div>'+
						lisHtml+
							'<div id="ulDiv" style="width:'+((that.options.liWidth+1)*count)+'px">'+
								'<ul id="ulLI">'+
									ulDom+
								'</ul>'+
							'</div>'+
						'</div>'+
						'<div id="nextPage">'+
							'下一页'+
						'</div>'+
						'<div id="bottomPage">'+
							'尾页'+
						'</div>'+
						isTurnHtml+
						'<div>'+
							'第<span id="changePage">'+that.options.pageIndex+'</span>页/共'+returnPageCount()+'页'+
						'</div>'+
						'<div>'+
							'数据总数：<span><b>'+that.options.pageDataCount+'</b></span>'+
						'</div>'+
					'</div>';

				that.el.html(contentHtml);

				function returnPageCount(){
					var count = 0;
					if(that.options.pageDataCount%that.options.pagePreCount!=0){
						count = Math.ceil(that.options.pageDataCount/that.options.pagePreCount);
					}else{
						count = that.options.pageDataCount/that.options.pagePreCount;
					}
					return count;
				}
		},
		bindEle:function(){
			var that = this,
				left = 0,
				index = that.options.pageIndex-1,
				ulDiv = $("#ulDiv"),
				ulLi = $("#ulLI"),
				lis = ulLi.children(),
				length = lis.length,
				homePage = $("#homePage"),
				bottomPage = $("#bottomPage"),
				nextPage = $("#nextPage"),
				backPage = $("#backPage"),
				goPage = $("#goPage");

				homePage.on('click',()=>{
					ulDiv.animate({"left":"0px"}, 500);
					index = 0;
					currentPage(index);
				})
				bottomPage.on('click',()=>{
					ulDiv.animate({"left":-((length-5)*(that.options.liWidth+1))+"px"}, 500);
					index = lis.length-1;
					currentPage(index);
				})
				nextPage.on('click',()=>{
					left = ulDiv.position().left;
					index++;
					if(index>lis.length-1){index=lis.length-1}
					currentPage(index);

					if(index>2&&index<length-2)
						if(left<-((length-3)*that.options.liWidth)){left=((length-3)*that.options.liWidth)}else{
							ulDiv.animate({"left":(left-(that.options.liWidth+1))+"px"}, 500)
						}

				})
				backPage.on('click',()=>{
					left = ulDiv.position().left;
					index--;
					if(index<0){index=0}
					currentPage(index);

					if(index<length-3&&index>1)
						if(left>=0){left=0}else{
							ulDiv.animate({"left":(left+(that.options.liWidth+1))+"px"}, 500)
						}

				})

				lis.on('click',function(){
					left = ulDiv.position().left;
					index = $(this).index();
					currentPage(index);
					
					handleLi(index);
				})

				goPage.on('click',function(){
					var idx =parseInt($("#goNum").val());
					
					currentPage(idx-1);
					handleLi(idx-1);
				})

				function currentPage(index){
					$("#changePage").html(index+1);
					lis.eq(index).addClass('selectedLi').siblings().removeClass('selectedLi');
				}

				function handleLi(index){
					if(index>=2&&index<=length-2)
						if(left<-((length-2)*that.options.liWidth)){
							left=-((length-2)*that.options.liWidth)
						}else if(index==length-2){
							ulDiv.animate({"left":-((that.options.liWidth+1)*(index-3))+"px"}, 500)
						}else{
							ulDiv.animate({"left":-((that.options.liWidth+1)*(index-2))+"px"}, 500)
						}
				}

			currentPage(that.options.pageIndex-1);
			handleLi(that.options.pageIndex-1);

		}
	}

	$.fn.PageHtc = function(options){
		return new pageHtc($(this),options);
	}
})(jQuery,window,document)