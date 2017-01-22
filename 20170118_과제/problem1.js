/* 함수에 변경되는 데이터값을 넣어두면안된다. 그래서 이렇게 데이터를 전역객체로 묶어서 어디서든 사용할수있게

이벤트위임 -> 델리게이션 리스트 처럼 내부 엘리먼트가 동적으로 추가 삭제 될때 사용한다.  closset match메소드확인

*/
var ERROR_MSG = {
	"TODO" : {
		"EXIST_TODO" : "이미 등록한 일 입니다.",
		"ONLY_NUMBER" : "숫자만 입력해주세요.",
		"LIST_NO_NUMBER" : "리스트에 해당 숫자가 없습니다.",
		"INPUT_EMPTY" : "입력창에 값이 없습니다."
	}
}

function getElement(element){
  return document.querySelector(element);
}


function getElementAll(element){
  return document.querySelectorAll(element);
}


function orderList(listLi){
	var tempArr = [];
	listLi.forEach(function(value, index){
		tempArr[index] = value.innerHTML
	})
	tempArr.forEach(function(value, index){
		var temp_this = "";
		var temp_next = "";
		for(var i = index + 1 ; i < tempArr.length ; i++ ){
			if(tempArr[index].length > tempArr[i].length){
				temp_this = tempArr[index];
				temp_next = tempArr[i];
				tempArr[index] = temp_next;
				tempArr[i] = temp_this;
			}
			else{
				continue;
			}
		}
	})
	listLi.forEach(function(value, index){
		value.innerHTML = tempArr[index];
	})
}


function existTodo(strArr, todo){
	if(strArr.indexOf(todo) !== -1){
		return true;
	}
}


function addTodoList(todo){
	var list = getElement("section.basket ol");
	var listLi = getElementAll("section.basket ol li");
	var strArr = [];
	for(var i=0; i < listLi.length ; i++){
  	strArr[i] = listLi[i].innerHTML;
	}

	if(existTodo(strArr, todo)){
  	return showMessage(ERROR_MSG.TODO.EXIST_TODO);
	}

	list.insertAdjacentHTML("beforeend","<li>"+todo+"<button>X</button></li>");
	listLi = getElementAll("section.basket ol li");
	orderList(listLi);
}


function removeTodoList(number){
  var list = getElement("section.basket ol");
  var listLi = getElementAll("section.basket ol li");
  var regNumber = /^[0-9]*$/;
  if(!regNumber.test(number)){
    return showMessage(ERROR_MSG.TODO.ONLY_NUMBER);
  }
  if(listLi.length < number || 0 >= number){
    return showMessage(ERROR_MSG.TODO.LIST_NO_NUMBER);
  }
  list.removeChild(listLi[number-1]);
}


function showMessage(text){
  var message = getElement(".message");
  message.innerHTML = text;
  message.style.color = "red";
  setTimeout(function(){
    message.innerHTML = "";
  },3000);
}


function executeItemNode(actionType, todoORnumber){
  if(todoORnumber === ""){
    return showMessage(ERROR_MSG.TODO.INPUT_EMPTY);
  }
  if(actionType === "add"){
    addTodoList(todoORnumber);
  }
  else if(actionType === "remove"){
    removeTodoList(todoORnumber);
  }
}

// 엑스버튼 누를 시 해당 LI 삭제하기
var basketOl = document.querySelector(".basket ol");
basketOl.addEventListener("click", function(event){
  var evtTarget = event.target;
  var olTarget = evtTarget.parentNode;
  console.log(olTarget);
  if(event.target.tagName !== "BUTTON"){return;}
  else{olTarget.parentNode.removeChild(olTarget);}
})


var controller = document.querySelector(".controller");
controller.addEventListener("click", function(evt) {
  var btn = evt.target;
  if(btn.tagName !== "BUTTON") return;
  var inputValue = btn.previousElementSibling.value;
  var actionType = btn.className;
  executeItemNode(actionType, inputValue);
});

