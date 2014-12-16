
/* JavaScript content from js/main.js in folder common */

function wlCommonInit(){
	initMap();
	loadFeeds();
}
function initMap(){
	$("#myMap").height($(window).height()-400);
	var map= new BMap.Map("myMap");
	var point=new BMap.Point(116.384, 39.925);
	map.centerAndZoom(point,14);
	map.addControl(new BMap.ZoomControl());
	var marker1 = new BMap.Marker(new BMap.Point(116.384, 39.925));  //创建标注
	map.addOverlay(marker1);                 // 将标注添加到地图中
	//创建信息窗口
	var infoWindow1 = new BMap.InfoWindow("普通标注");
	marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
}
//此函数实现图片轮播
$(document).ready(function(){
	  var index=0;
	  var $_picw=$(".pic").outerWidth();
	  var $_picn=$(".pic").length;
	  $(".pic-show").css("width",$_picw*$_picn);
	  if($_picn>1){
	    for(var i=1;i<=$_picn;i++){
	      var $_span="<span>"+i+"</span>";
	      $($_span).appendTo(".pic-num");
	    }
	    $(".pic-num span").eq(0).addClass("on");
	  }
	  setInterval(function(){
	    show(index);
	    index++;
	    if(index==$_picn){index=0}
	  },3000);
	  function show(index){
	    var $_picL=-index*$_picw;
	    $(".pic-show").animate({"left":$_picL},500);
	    $(".pic-num span").removeClass("on").eq(index).addClass("on");
	  }
	})
//往数据库中提交Message函数，也就是发布消息。
function submitMessage(){
	
	var fullname=$("#fullname").val();
	var email=$("#email").val();
	var data=$("#data").val();
	
	if(fullname==''||email==''||data=='') 
		alert("您的信息不完整，请补充完整，让正能量满满滴！");
	else
	{
		var invocationData = {
				adapter: "SQLAdapter",
				procedure: "InsertFeed",
				parameters: [fullname,data,email]
		};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess: function (){loadFeedsPage();}, 
			onFailure: loadFeedsFAIL
		});	
	}
}

//$("#ReloadLink").bind("click", function(){
//	loadFeeds();
//});

//**************************************
// loadFeedsPage
//**************************************
function loadFeedsPage() {
	WL.App.overrideBackButton (function(){WL.App.close();});
	
	$.mobile.changePage("index.html", {prefetch:"true"});	
	location.reload();
}

function loadMessagePage() {

	$.mobile.changePage("message.html", {prefetch:"true"});
}

function loadActivityPage() {
	
	var invocationData = {
			adapter: "SQLAdapter",
			procedure: "getActivities",
			parameters: []
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: loadActivitiesOK, 
		onFailure: loadFeedsFAIL
	});	
}
function loadActivitiesOK(result)
{
	activities = result.invocationResult.resultSet;
		$(document).on('pageinit',$('#activity'), function(event) {
	    
	    $("#ActivityList").empty();
		// Create the list items
		//alert(feeds.length);
		for (var i=0; i<activities.length; i++){
			var dataItem = activities[i];
			var listItem;
			if(i%2==0)
				listItem = $("<li style='background-color:#dc615b;' class='FeedItem' id='" + i + "'><h3>" + dataItem.userId + "</h3><p style='white-space: normal;'>"+ dataItem.content+"</p></li>");
			
			else
			    listItem = $("<li style='background-color:#c99e9c;' class='FeedItem' id='" + i + "'><h3>" + dataItem.userId + "</h3><p style='white-space: normal;'>"+ dataItem.content+"</p></li>");
		
			    $("#ActivityList").append(listItem);
		}

			
		$("#ActivityList").listview('refresh');
		$.mobile.loading('hide');
	});
		$.mobile.changePage("activity.html", {prefetch:"true"});
}
//**************************************
// loadAboutPage
//**************************************
function loadAboutPage() {
	$.mobile.changePage("about.html", {prefetch:"true"});
}

//$(document).on( "pageload", function( event ) { 
//	$(".translate").each(function(index, element) {
//		  element = $(element);
//		  var elementId = element.attr("id");
//		  element.text(Messages[elementId]);
//		});
//});

//**************************************
// Load feeds
//**************************************
function loadFeeds(){	
	$.mobile.loading('show');
	
	WL.App.overrideBackButton (function(){WL.App.close();});
	var invocationData = {
			adapter: "SQLAdapter",
			procedure: "getFeeds",
			parameters: []
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: loadFeedsOK, 
		onFailure: loadFeedsFAIL
	});
}

function loadFeedsOK(result){
	
	feeds = result.invocationResult.resultSet;
	$("#FeedsList").empty();
	// Create the list items
	//alert(feeds.length);
	for (var i=0; i<feeds.length; i++){
		var dataItem = feeds[i];
		var listItem;
		if(i%4==0)
			listItem = $("<li  style='background-color:#dc615b;' class='FeedItem' id='" + i + "'><h3>" + dataItem.userId + "</h3><p style='white-space: normal;'>"+ dataItem.content+"</p><p>"+dataItem.email+"</p><p>"+dataItem.messageDate+"</p></li>");
		else if(i%4==1)
			listItem = $("<li  style='background-color:#e2b4b4;' class='FeedItem' id='" + i + "'><h3>" + dataItem.userId + "</h3><p style='white-space: normal;'>"+ dataItem.content+"</p><p>"+dataItem.email+"</p><p>"+dataItem.messageDate+"</p></li>");
		else if(i%4==2)
			listItem = $("<li  style='background-color:#aa8888;' class='FeedItem' id='" + i + "'><h3>" + dataItem.userId + "</h3><p style='white-space: normal;'>"+ dataItem.content+"</p><p>"+dataItem.email+"</p><p>"+dataItem.messageDate+"</p></li>");

		else
			listItem = $("<li  style='background-color:#885858;' class='FeedItem' id='" + i + "'><h3>" + dataItem.userId + "</h3><p style='white-space: normal;'>"+ dataItem.content+"</p><p>"+dataItem.email+"</p><p>"+dataItem.messageDate+"</p></li>");

		$("#FeedsList").append(listItem);
	}
	// Attach a 'click' event handler to each item in the list
//	$(".FeedItem").bind("click", function(){
//		
//		displayFeed($(this).attr("id"));
//		
//	});
		
	$("#FeedsList").listview('refresh');
	$.mobile.loading('hide');
}

function loadFeedsFAIL(data){
	alert("fail");	
}

//**************************************
// 显示具体消息
//**************************************
function displayFeed(FeedId){
	alert(FeedId);
	WL.App.resetBackButton();
	var item = feeds[FeedId];
	
	$(document).on('pageinit',$('#FeedContentPage'), function(event) {
	    $("#FeedContent").html(item.content);
	    // Resize images to max width of 260px
//	    $("#FeedContent").find("img").each(function(){
//	    	if ($(this).attr("src").indexOf("jpg")>=0){
//	    		$(this).width(260);
//	    	}
//	    });
	    // add target='_blank' attribute to all the links
	 //   $("#FeedContent a").attr("target","_blank");
	});
	$.mobile.changePage("FeedContentPage.html", {prefetch:"true"});
}

/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}