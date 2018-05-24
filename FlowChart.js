(function($,window,document){
	function FlowChart(el,jsonData,option){
		this.el = el;
		this.jsonData = jsonData;
		this.option = {
			callback:option.callback||function(){}
		};
		this.init();
	}

	FlowChart.prototype = {
		constuctor:FlowChart,
			init:function(){//初始化
				this.createDom();
				this.funcs();
			},
			createDom:function(){
				var dom = this,
					contentHtml = '<div id="app">';

					for(var i=0;i<dom.jsonData.length;i++){
						contentHtml += '<div class="modelDiv container-fluid">'+
							'<div class="top">'+
								'<div class="title">'+dom.jsonData[i].title+'</div>'+
								'<div class="operations">'+
									'<span>停用</span>'+
									'<span>编辑</span>'+
									'<span>删除</span>'+
								'</div>'+
							'</div>'+
							'<div class="content container-fluid">'+
								'<ul>';
							for(var j=0;j<dom.jsonData[i].procArr.length;j++){
								if(j<dom.jsonData[i].procArr.length-1){
									if(dom.jsonData[i].procArr[j].type==0){//完成
										contentHtml+='<li class="contentLi">'+
											'<div class="waiCircle">'+
												'<div class="neiCircle finish"></div>'+
											'</div>'+
											'<p class="process finishP">'+dom.jsonData[i].procArr[j].proc_name+'</p>'+
										'</li>'+
										'<li class="lineLi">'+
											'<svg width="100%" height="100%" style="position: absolute;top: 27%;left: -10px;">'+
												'<polygon points="0,10 8,10 12,5 8,0 0,0 4,5 0,10" style="fill:#11B390;stroke:#11B390;stroke-width:1"/>'+
											'</svg>'+
											'<div class="lines">'+
												'<div class="line1"></div>'+
											'</div>'+
											'<svg width="100%" height="100%" style="position: absolute;top: 27%;left: 118px;">'+
												'<polygon points="0,10 12,5 0,0 0,10" style="fill:#11B390;stroke:#11B390;stroke-width:1"/>'+
											'</svg>'+
										'</li>';
									}
									if(dom.jsonData[i].procArr[j].type==1){//进行中
										contentHtml+='<li class="contentLi">'+
											'<div class="waiCircle">'+
												'<div class="neiCircle underway"></div>'+
											'</div>'+
											'<p class="process underwayP">'+dom.jsonData[i].procArr[j].proc_name+'</p>'+
										'</li>'+
										'<li class="lineLi">'+
											'<svg width="100%" height="100%" style="position: absolute;top: 27%;left: -10px;">'+
												'<polygon points="0,10 8,10 12,5 8,0 0,0 4,5 0,10" style="fill:#F8949C;stroke:#F8949C;stroke-width:1"/>'+
											'</svg>'+
											'<div class="lines">'+
												'<div class="line2"></div>'+
												'<div class="line3"></div>'+
											'</div>'+
											'<svg width="100%" height="100%" style="position: absolute;top: 27%;left: 118px;">'+
												'<polygon points="0,10 12,5 0,0 0,10" style="fill:#DCDCDD;stroke:#DCDCDD;stroke-width:1"/>'+
											'</svg>'+
										'</li>';
									}
									if(dom.jsonData[i].procArr[j].type==2){//未完成
										contentHtml+='<li class="contentLi">'+
											'<div class="waiCircle">'+
												'<div class="neiCircle undone"></div>'+
											'</div>'+
											'<p class="process undoneP">'+dom.jsonData[i].procArr[j].proc_name+'</p>'+
										'</li>'+
										'<li class="lineLi">'+
											'<svg width="100%" height="100%" style="position: absolute;top: 27%;left: -10px;">'+
												'<polygon points="0,10 8,10 12,5 8,0 0,0 4,5 0,10" style="fill:#DCDCDD;stroke:#DCDCDD;stroke-width:1"/>'+
											'</svg>'+
											'<div class="lines">'+
												'<div class="line4"></div>'+
											'</div>'+
											'<svg width="100%" height="100%" style="position: absolute;top: 27%;left: 118px;">'+
												'<polygon points="0,10 12,5 0,0 0,10" style="fill:#DCDCDD;stroke:#DCDCDD;stroke-width:1"/>'+
											'</svg>'+
										'</li>';
									}
								}else if(j==dom.jsonData[i].procArr.length-1){
									contentHtml+='<li class="contentLi">'+
										'<div class="waiCircle">'+
											'<div class="neiCircle undone"></div>'+
										'</div>'+
										'<p class="process undoneP">验收</p>'+
									'</li>';
								}
							}
							contentHtml+='</ul></div>';
							contentHtml+='</div>';
					}

					dom.el.html(contentHtml);
			},
			funcs:function(){

			}
	}

	$.fn.FlowChart_HTC = function(jsonData,option){
			return new FlowChart($(this),jsonData,option);
	}
})(jQuery,window,document)