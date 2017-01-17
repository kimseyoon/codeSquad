
/*
 * 1. executeItemNode 함수를 완성하세요
 * 이 함수의 actionType 매개변수는 'add' 또는 'remove'를 받습니다.  add를 받으면 추가하고, remove를 받으면 일을 삭제합니다.
 * todoORNumber 는 add일때는 새로운 일을 문자열로 받고, remove일때는 숫자를 받습니다.
 * 할일 목록은 할일의 문자열 길이 순으로 정렬됩니다. 목록이 추가될때마다 바로 정렬되야 합니다.(가장 긴 할일 내용이 뒤로 가야함)
 * 삭제하려는 경우 num과 일치하는 item번호가 없다면 'message' 영역에서 적당한 메시지를 붉은색으로 표시됐다 3초뒤 사라집니다.
 * 추가하려는 경우 이미 같은일이 있다면 message영역에서 적당한 메시지를 붉은색으로 표시했다 3초뒤 사라집니다.
 * 함수를 여러개로 나눠도 상관없습니다.
 * 참고로 1번을 풀기 위해서는 string조작과 setTimeout이라는 것을 공부해야 할 수도 있습니다.
 *
 * 2. 좀더 사용하기 쉬운 웹화면이 되도록, css에 다양한 스타일을 적용하면서 꾸며봅니다.
 *
 * 3. 아래 event 관련 코드를 학습해보고, 어떤 코드를 의미하는지 최대한 자세히 주석으로 설명을 넣어보세요.
 */

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

function add(todo){
  var list = getElement("section.basket ol");
  var listLi = getElementAll("section.basket ol li");
  var strArr = [];
  for(var i=0; i < listLi.length ; i++){
    strArr[i] = listLi[i].innerHTML;
  }
  if(strArr.indexOf(todo) !== -1){
    return showMessage("이미 할일이 등록되었습니다.")
  }
  list.insertAdjacentHTML("beforeend","<li>"+todo+"</li>");
  listLi = getElementAll("section.basket ol li");
  orderList(listLi);
}

function remove(number){
  var list = getElement("section.basket ol");
  var listLi = getElementAll("section.basket ol li");
  var regNumber = /^[0-9]*$/;
  if(!regNumber.test(number)){
    return showMessage("숫자로만 입력해주세요.");
  }
  if(listLi.length < number || 0 >= number){
    return showMessage("1부터 "+listLi.length+"까지의 숫자만 입력가능합니다.");
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
    return showMessage("값을 입력하세요");
  }
  if(actionType === "add"){
    add(todoORnumber);

  }else if(actionType === "remove"){
    remove(todoORnumber);
  }
}

var controller = document.querySelector(".controller");
controller.addEventListener("click", function(evt) {
  var btn = evt.target;
  if(btn.tagName !== "BUTTON") return;
  var inputValue = btn.previousElementSibling.value;
  var actionType = btn.className;
  executeItemNode(actionType, inputValue);
});
