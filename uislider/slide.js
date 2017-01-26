/*parsInt("33px"). -> 33만나온다...*/

/*

문제점
1. 클릭을 계속 했을때 left값이 이상하다. 다돌고 나서 눌러야한다
해결책
- left값이 기준 값에 도달 되지않는다면 이벤트 이후 위치값을 변경하는 함수를 막으면 된다.
클릭 이벤트는 막을 수 없음


1. 자동 이동
hover하면 못움직이게

2. 인디케이터

3. ajax연동

*/

function UiSlider(obj){
	this.uiSlider = document.querySelector(obj.id),
	this.slideList = this.uiSlider.querySelector("#slider_list"),
	this.sliderWidth = this.getCss(this.uiSlider, "width"),

	this.arrSlide = [],
	this.autoInterval = 0,

	this.DURATION = obj.duration,

	this.setListArr("#slider_list a");
	this.assignPosition(this.arrSlide);
	this.autoSlide(obj.autoSlide, obj.direction ,this);
	this.clickEvent(this.uiSlider);

	if(obj.autoSlide === "auto"){
		this.mouseoverEvent(this.uiSlider);
		this.mouseoutEvent(this.uiSlider, obj.direction);
	}

	//시작할때 함수를 이렇게나 많이 사용해야하나요?
}


UiSlider.prototype.autoSlide = function(auto, direction, objThis){
	if(auto !== "auto"){
		return;
	}

	if(direction === "next"){
		this.autoInterval = setInterval(function(){objThis.moveNextSlide()}, objThis.DURATION);
	}
	else if(direction === "prev"){
		this.autoInterval = setInterval(function(){objThis.movePrevSlide()}, objThis.DURATION);
	}
	// 뭐지? function(){}이걸 안해주면 안되네? 이유가 뭘까...
}


UiSlider.prototype.setListArr = function(element){
	this.arrSlide = this.uiSlider.querySelectorAll(element);
}


UiSlider.prototype.getCss = function(element, style){
	var str = window.getComputedStyle(element).getPropertyValue(style);
	return this.changeStringToNumber(str);
}


UiSlider.prototype.setCss = function(element, styleObj){
	for(var styleName in styleObj){
		element.style[styleName] = styleObj[styleName];
	}
}


UiSlider.prototype.changeStringToNumber = function(str){
	return parseInt(str.replace(/(\d+)px/, "$1" ));
	//return parseInt(str.replace(/translateX\((\d+)px.+/, "$1" ));
}


UiSlider.prototype.assignPosition = function(arr){
	/*배열에 들어간 각각의 슬라이드의 left 값 주기*/
	var positionLeft = 0;
	
	for(var i = 0; i < arr.length ; i++ ){
		this.setCss(arr[i], {left : positionLeft + "px"})
		positionLeft += this.sliderWidth;
	}
}


UiSlider.prototype.mouseoverEvent = function(element){
	var thisEle = this;
	element.addEventListener("mouseover", function(event){
		clearInterval(thisEle.autoInterval);
	})
}


UiSlider.prototype.mouseoutEvent = function(element, direction){
	var thisEle = this;
	element.addEventListener("mouseout", function(event){
		if(direction === "next"){
			thisEle.autoInterval = setInterval(function(){thisEle.moveNextSlide()}, thisEle.DURATION);
		}
		else if(direction === "prev"){
			thisEle.autoInterval = setInterval(function(){thisEle.movePrevSlide()}, thisEle.DURATION);	
		}
	})
}


UiSlider.prototype.clickEvent = function(element){
	/*슬라이드 이벤트핸들러 추가하기*/
	var thisEle = this;
	element.addEventListener("click", function(event){
		var target = event.target;

		if(thisEle.arrSlide.length < 2){
			return;
		}
		if(thisEle.reachStandard()){	
			return;
		}
		if(target.id === "nextBtn"){
			thisEle.moveNextSlide();
		}
		else if(target.id === "prevBtn"){
			thisEle.movePrevSlide();
		}
	})
}

// arrSlide의 모든 요소들이 목표 left값에 도달해야
UiSlider.prototype.reachStandard = function(){
	var left = 0;
	for(var i = 0; i<this.arrSlide.length; i++){
		left = this.getCss(this.arrSlide[i], "left");
		if(left%this.sliderWidth !== 0){
			return true;
		}
	}
}


UiSlider.prototype.moveNextSlide = function(){
	/*
	전부 a태그의 left 값을 width값만 큼 빼준다.
	-width 인값은 맨뒤에 복사해서 넣어둔다.
	*/

	this.setListArr("#slider_list a");
	var beforeWidth = 0;

	if(this.getCss(this.arrSlide[0], "left") === -this.sliderWidth){
		this.slideList.appendChild(this.arrSlide[0]);
		this.setCss(this.arrSlide[0], {
			left : (this.sliderWidth * (this.arrSlide.length-1)) + "px"
		});
	}

	for(var i = 0; i < this.arrSlide.length; i++){
		beforeWidth = this.getCss(this.arrSlide[i], "left");
		this.setCss(this.arrSlide[i], {
			left : (beforeWidth - this.sliderWidth) + "px"
		});
	}
}


UiSlider.prototype.movePrevSlide = function(){
	this.setListArr("#slider_list a");
	var beforeWidth = 0;

	if(this.getCss(this.arrSlide[0], "left") === 0){
		this.prependChild(this.slideList, this.arrSlide[this.arrSlide.length-1]);
		this.setCss(this.arrSlide[this.arrSlide.length-1], {
			left : -this.sliderWidth + "px"
		});
	}

	for(var i=0; i< this.arrSlide.length; i++){
		beforeWidth = this.getCss(this.arrSlide[i], "left");
		this.setCss(this.arrSlide[i], {
			left : (beforeWidth + this.sliderWidth) + "px"	
		});
	}
}


UiSlider.prototype.prependChild = function(parent, newFirstChild){
	parent.insertBefore(newFirstChild, parent.firstChild);
}


