//미션 3
var ele = document.querySelector("ul")
var newEle = document.createElement("LI")
var newText = document.createTextNode("신상")
newEle.append(newText)
ele.append(newEle)
ele.removeChild(ele.lastChild)
/*
1. ul노드를 ele저장
2. li태그를 newEle 저장
3. li태그안에 들어갈 textNode를 newEle에 저장
4. li태그에 append하여 text 저장
5. 만들어진 li 태그를 ele에 append 하여 저장
6. 다시 추가된 마지막 태그를 삭제
*/
//미션4
 
var ele = document.querySelector("ul")
var newEle = document.createElement("LI")
var newText = document.createTextNode("가운데추가")
newEle.append(newText)
ele.insertBefore(newEle, ele.childNodes[5])
/*
1. ul노드를 ele저장
2. li태그를 newEle 저장
3. li태그안에 들어갈 textNode를 newEle에 저장
4. li태그에 append하여 text 저장
5. 만들어진 li 태그를 ele에 5번째 노드 이전에 저장
*/
 
//미션5
var ele = document.querySelector("ul")
var apple = ele.childNodes[1]
var clone = apple.cloneNode(true)
ele.removeChild(ele.childNodes[1])
ele.insertBefore(clone, ele.childNodes[9])
/*
1. ul노드를 ele저장
2. ele 첫번재 노드 apple복사
3. apple clone에 복사
4. 첫번재 노드 삭제
5. apple과 strawberry 사이에 복사된노드 추가
*/
 
//미션6
var ele = document.querySelector("ul")
var red = document.querySelectorAll(".red")
for(var i=0; i<red.length;i++){
  ele.removeChild(red[i]);
}
/*
1. ul노드를 ele저장
2. red 클래스를 가진 노드를 배열에 저장
3. red배열을 순회하면서 ele의 red 클래스를 가진 엘레멘트 제거
*/
 
//미션7
var sec = document.querySelectorAll("section")
var h2Tit = document.querySelectorAll("h2");
 
for(var i=0; i<sec.length;i++){
  if(sec[i].querySelector(".blue") !== null){
    sec[i].removeChild(h2Tit[i])
  }
}
/*
1. section의 모든 노드를 sec저장
2. h2의 모든 노드를 h2tit저장
3. sec의 모든 노드를 순회하면서 .blue클래스를 가지는 자식이 있는지 확인 한 후 있음면 h2tit 배열에 해당하는 노드 제거
*/
 
// innerHtm을 이용하여 마지막 노드 추가
var ele = document.querySelector("ul")
var apple = ele.childNodes[1].innerHTML
var newEle = document.createElement("LI")
newEle.append(apple)
ele.append(newEle)
/*
innerHtml은 해당 노드안에 있는 값을 가져온다.
*/
 
//insertAdjacentHTML
var ele = document.querySelector("ul")
ele.insertAdjacentHTML("beforeend", "<li>너무 쉬운 inset</li>")
/*
insertAdjacentHTML을 이용하면 다음과 같은 인자에 따라 원하는 위치에 2번재 인자값을 삽입해준다.
'beforebegin' element 앞에
'afterbegin' element 안에 가장 첫번째 child
'beforeend' element 안에 가장 마지막 child
'afterend' element 뒤에
*/
