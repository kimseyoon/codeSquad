
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

/* list의 텍스트의 길이가 짧은순서가 위에서 부터 아래로 정렬*/
// 선택정렬 구현
function orderList(list){
	var list_li = list.querySelectorAll("li");
	var tempArr = [];
	list_li.forEach(function(value, index){
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
	list_li.forEach(function(value, index){
		value.innerHTML = tempArr[index];
	})
}

function add(todo){
	var list_ele = document.querySelector(".basket ol");
	list_ele.insertAdjacentHTML("beforeend","<li>"+todo+"</li>");
	orderList(list_ele);
}

function remove(number){
	var list_ele = document.querySelector(".basket ol");
	var list_li = list_ele.querySelectorAll("li");
	var msg = document.querySelector("div.message");

	if(list_li.length < number || 0 > number ){
		msg.innerHTML = "일치하는 번호가 없습니다. 다시 입력해 주세요.";
		msg.style.color = "red";
		setTimeout(function(){
			msg.innerHTML = "";
			msg.style.color = "black";
		},3000);
		return;
	}
	list_ele.removeChild(list_li[number-1]);
}

function executeItemNode(actionType, todoORnumber){
	if(actionType === "add"){
		add(todoORnumber);
	}else if(actionType === "remove"){
		remove(todoORnumber);
	}
}

var controller = document.querySelector(".controller");

controller.addEventListener("click", function(event){
	var btn = event.target;
	if(btn.tagName !== "BUTTON") return;
	var actionType = btn.className;
	var inputValue = btn.previousElementSibling.value;
	executeItemNode(actionType, inputValue);
});


/* 
 * 3번문제는 여기에 자세히 설명을 넣으시면 됩니다.
 *  이벤트란 어떤 사건을 의미한다. 브라우저에서의 사건이란 사용자가 클릭했을 '때' 와 같은 것을 의미한다.
 *  이벤트 target이란 이벤트의 대상이되는(버튼같은) 되는 것을 의미한다.
 *  이벤트 type 이란 이벤트가 발생하는 종류, onclick
    이벤트 핸들러란 이벤트가 발생했을때 동작하는 코드
    1. .controller 클래스를 가진 노드를 controller 변수에 넣어둔다.
    2. controller 객체의 addEventListener 메소드를 사용하여 click 이라는 이벤트가 발생하면 2번째 인자의 함수가 실행된다.
    3. 2번째 인자의 함수에서 event라는 객체를 인자로 받는다. event.target은 이벤트가 발생한 객체를 가르킨다.
    4. 이벤트가 발생한 객체의 태그이름이 BUTTON이 아니라면 종료
    5. 이벤트가 발생한 객체의 이전 태그의 value값과 객체의 클래스 이름을 받아 doSometing함수의 인자에 넣는다
 */
/*
var controller = document.querySelector(".controller");

controller.addEventListener("click", function(evt) {
  var btn = evt.target;
  if(btn.tagName !== "BUTTON") return;
  var inputValue = btn.previousElementSibling.value;
  var actionType = btn.className;
  doSomething(actionType, inputValue);
});

*/