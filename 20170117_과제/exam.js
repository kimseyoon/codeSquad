// 1번문제
function showCancelBtn(){
	var tool = document.getElementById("tool");
	var btnCancel = document.getElementById("btnCancel");
	tool.style.display = "none";
	btnCancel.style.display = "block";
}

function hideCancelBtn(){
	var tool = document.getElementById("tool");
	var btnCancel = document.getElementById("btnCancel");
	tool.style.display = "block";
	btnCancel.style.display = "none";
	
}

function changeCancelBtn(targetClass){
	if(targetClass === "txtBox"){
		showCancelBtn();
	}else if(targetClass === "btnCancel"){
		hideCancelBtn();
	}
}

var writeBox = document.querySelector("section.writeBox");
writeBox.addEventListener("click", function(evt){
	var target = evt.target;
	var targetClass = target.className;
	changeCancelBtn(targetClass);
})

//2번문제

var WARN_ERROR = {
	"MESSAGE" : "20자를 넘겼습니다.",
	"LENGTH" : 20
}

function warnOverTextShow(){
	var writeBox = document.querySelector("section.writeBox");
	var warnText = document.querySelector("p.warnText");

	if(warnText === null){
		writeBox.insertAdjacentHTML("afterend","<p class='warnText'>"+WARN_ERROR.MESSAGE+"</p>");
	}else{
		return;
	}

}


function warnOverTextHide(){
	var writeBox = document.querySelector("section.writeBox");
	var warnText = document.querySelector("p.warnText");

	if(warnText === null){
		return
	}else{
		writeBox.parentNode.removeChild(warnText);
	}
}


var schText = document.querySelector("#schText")
schText.addEventListener("input", function(){
	var schTextValue = document.getElementById("schText").value;
	if(schTextValue.length > WARN_ERROR.LENGTH){
		warnOverTextShow();
	}else{
		warnOverTextHide();
	}
})