concat 사용법
===========
<pre>
arr1.concat(arr2, arr3...)
 - concat은 2개의 배열을 이어주는 메소드이다. 여러개의 배열을 이어주고 싶다면 인자에 순서대로 넣어두면 된다. 
 ex)
var arr1 = ["a", "b", "c"];
var arr2 = [1, 2, 3];
console.log(arr1.concat(arr2));
"a", "b", "c" 1, 2, 3 출력
arr1 배열 뒤에 arr2배열을 이어준다.
</pre>

join 사용법
==========
<pre>
arr1.join("배열사이에 들어가고 넣고 싶은 단어")
- join은 해당 배열의 원소값들을 스트링값으로 만들어서 반환해준다. 만약 원소값들 사이에 특정 단어를 넣어 주고싶다면 인자에 넣어두면 된다.
ex)
var arr1 = ["a", "b", "c"];
var ex = arr1.join(" and ");
console.log(ex);
a and b and c 출력
</pre>






