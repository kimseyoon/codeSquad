/*
Tab메뉴 제작 순서

1. html마크업을 한다.
2. css 스타일을 입힌다.

3. tab 생성자를 만들어 사용할 변수를 선언하고 탭메뉴를 실행하기 위한 함수를 사용한다.
4. tabCont안에 들어갈 내용을 ajax를 통해 가져와 그에 걸맞는 html태그를 적용한뒤 뿌려준다.
5. initEvent함수를 만들어 tabMenu 를 클릭할 경우 그에 맞는  tabCont를 보여주도록 한다.
   5-1. tabMenu를 클릭하면 자신포함 형제 엘리멘트 클래스 초기화.
   5-2. e.target을 통해 선택되어진 엘리멘트만 select 클래스 추가
   5-3. 선택된 tabMenu의 href속성값에 해당 tabCont아이디값이 저장되어있다. 그값을 이용해 보여줘야할 tabCont를
        선택한 후 화면에 뿌려준다.

문제점
1. 페이지를 리프레쉬 하면 ajax의 데이터를 받아오는 부분이 느리게 표현된다.


prototype 방식 클래스 특징 
1. 여러개의 객체가 생성자의 prototype에 있는 메소드를 공유하기 떄문에 메모리를 적게쓴다.
2. 외부에서 동일한 이름의 변수, 함수를 사용하여도 겹치지 않는다.
*/

function Tab(tabId, arrUrl){
	this.TAB_MENU_CLASS = ".tabMenu",
	this.TAB_CONT_CLASS = ".tabCont",
	this.SELECT_CLASS = "select",

	this.tab = document.querySelector(tabId),
	this.tabMenu = this.tab.querySelector(this.TAB_MENU_CLASS),
	this.tabCont = this.tab.querySelector(this.TAB_CONT_CLASS),
	this.tabMenuArr = this.tabMenu.parentNode.querySelectorAll("a"),
	this.tabContArr = this.tabCont.parentNode.querySelectorAll("section"),

	this.href = null,
	this.selectMenu = null,
	this.selectCont = null,

	this.initTabCont(arrUrl);
	this.initEvent(this.tabMenu, this.tabCont);
}


Tab.prototype.initTabCont = function(arrUrl){
	for(var i = 0 ; i < this.tabContArr.length; i++){
		this.ajaxCall(arrUrl[i], this.tabContArr[i]);
	}
}


Tab.prototype.ajaxCall = function(url, tabCont){
	var oReq = new XMLHttpRequest;
	oReq.addEventListener("load", function(){
		var obj = JSON.parse(this.responseText);
		tabCont.insertAdjacentHTML("beforeend",
			"<p class='tit'>"+obj.title+"</p><p>"+obj.body+"</p>"
		);
	})
	oReq.open("GET", url)
	oReq.send();
}


Tab.prototype.initEvent = function(tabMenu, tabCont){
	var thisObj = this;
	tabMenu.addEventListener("click", function(e){
		e.preventDefault();  //a태그의 url 이동기능 막기
		thisObj.selectMenu = e.target;
		thisObj.href = thisObj.selectMenu.getAttribute("href");
		thisObj.selectCont = tabCont.querySelector(thisObj.href);

		thisObj.toggleClass();
	})
}


Tab.prototype.toggleClass = function(){
	this.removeAllClass(this.tabMenuArr);
	this.addSelectClass(this.selectMenu);
	this.removeAllClass(this.tabContArr);
	this.addSelectClass(this.selectCont);
}


Tab.prototype.removeAllClass = function(arr){
	for(var i = 0; i < arr.length ; i ++){
		arr[i].classList.remove(this.SELECT_CLASS);
	}
}


Tab.prototype.addSelectClass = function(ele){
	ele.classList.add(this.SELECT_CLASS);
}


//=================================================================================

/*
리터럴 방식
1. 객체마다 메소드를 각각 가지고 있기 때문에 메모리 낭비
*/


/*
var tab = {
	tab : null,
	tabMenu : null,
	tabCont : null,
	selectMenu : null,
	tabMenuArr : [],
	tabContArr : [],
	href : null,
	selectCont : null,
	arrUrl : [],

	SELECT_CLASS : "select",


	init : function(tabId, arrUrl){
		this.tab = document.querySelector(tabId);
		this.tabMenu = this.tab.querySelector(".tabMenu");
		this.tabCont = this.tab.querySelector(".tabCont");
		this.tabContArr = this.tabCont.parentNode.querySelectorAll("section");

		this.initTabCont(arrUrl);
		this.initEvent(this.tabMenu, this.tabCont);
	},

	initTabCont : function(arrUrl){
		for(var i = 0 ; i < this.tabContArr.length; i++){
			this.ajaxCall(arrUrl[i], this.tabContArr[i]);
		}
	},

	initEvent : function(tabMenu, tabCont){
		var thisObj = this;
		tabMenu.addEventListener("click", function(e){
			e.preventDefault();  //a태그의 url 이동기능 막기
			thisObj.selectMenu = e.target;
			thisObj.tabMenuArr = thisObj.selectMenu.parentNode.querySelectorAll("a");
			thisObj.href = thisObj.selectMenu.getAttribute("href");
			thisObj.selectCont = tabCont.querySelector(thisObj.href);
			thisObj.toggleClass(thisObj);
		})
	},

	toggleClass : function(obj){
		obj.removeAllClass(obj.tabMenuArr);
		obj.addSelectClass(obj.selectMenu);
		obj.removeAllClass(obj.tabContArr);
		obj.addSelectClass(obj.selectCont);
	},


	removeAllClass : function(arr){
		for(var i = 0; i < arr.length ; i ++){
			arr[i].classList.remove(this.SELECT_CLASS);
		}
	},


	addSelectClass : function(ele){
		ele.classList.add(this.SELECT_CLASS);
	},


	ajaxCall : function(url, tabCont){
		var oReq = new XMLHttpRequest;
		oReq.addEventListener("load", function(){
			var obj = JSON.parse(this.responseText);
			tabCont.insertAdjacentHTML("beforeend",
				"<p class='tit'>"+obj.title+"</p><p>"+obj.body+"</p>"
				);
		})
		oReq.open("GET", url)
		oReq.send();
	}
}

*/