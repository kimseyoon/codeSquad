# codeSquad
코드스쿼드 수업

~~~~~~~~~~~~~~~~~~~~~~~~~~
<div class="out">
  <div class="middle">
    <div class="inner"></div>
  </div>
</div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var out = document.querySelector(".out");
out.addEventListener("click",function(e){
  var event = e.target;
  console.log("out");
})

var middle = document.querySelector(".middle");
middle.addEventListener("click",function(e){
  var event = e.target;
  console.log("middle");
})


var inner = document.querySelector(".inner");
inner.addEventListener("click",function(e){
  var event = e.target;
  if(event.className === "inner"){
    console.log('in');
  }
})

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

=============
* out을 누르면 out이벤트만 발생
* middle을 누르면 middle out 발생
* in을 누르면 in middle out 발생

이벤트를 발생시킨 객체가 가장 먼저 실행되고 그 이후 다음의 이벤트가 순서대로 발생한다.
중첩이 많이 된 객체는 여러번 이벤트가 발생한다.
