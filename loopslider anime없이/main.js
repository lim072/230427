let ul = document.querySelector("ul");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let lis = ul.querySelectorAll("li");
let len = lis.length;
let enableClick = true;


init();

next.addEventListener("click", (e)=>{
    e.preventDefault();

    if (enableClick) {
        
        enableClick = false;
        nextSlide();
    }

    
})

prev.addEventListener("click", (e)=>{
    e.preventDefault();

    if (enableClick) {
       
        enableClick = false;
        prevSlide();
    }
})



function init(){
    ul.style.left = "-100%";
    ul.prepend(ul.lastElementChild);

    //초기 화면이 1번 슬라이드가 올 수 있도록 처음에 맨뒤슬라이드를 
    // prepend로 떼어 내어 앞에 붙인다

    ul.style.width = `${100 * len}%`;

    lis.forEach((el) => {
    el.style.width = `${100 / len}%`
})
}

function nextSlide(){
    const duration = 1000;
    //지정한 지속시간(슬라이드가 이동하는 시간) 고정한 것
    const initialValue = parseInt(ul.style.left) || 0;
    // 현재 패널(li)의 위치를 초기화값으로 지정해서 넣되,정수값으로 반환한것
    //디폴트값으로는 0을 넣음
    // console.log(initialValue) -100
    const targetValue = -200; //우리가 목표하는 위치값 -100 -=>> -200
    const unit = '%';
    const startTime = performance.now();
    //초기 페이지 로딩부터 함수가 실행되는 시간을 의미
    // console.log(startTime);

    function animate(time){
        // console.log(time)
        //requestAnimationFrame이 메소드가 호출되면서 반환하는 시간값으로
        //최종 종료된 시점의 시간이 time입니다
        const timeElapsed = time - startTime;
        console.log(timeElapsed);
        //timeElapsed 는 진짜 함수가 실행되는 시간, 전체시간 - 함수가 실행되는 시점의 시간
        const progress = timeElapsed / duration;
        //정한 시간을 분모로해서 함수가 진행되는 시간이 분자가 되는
        //진행상황을 0< 1 사이의 값으로 반환하는 내용입니다
        //따라서 progress는 0과 1사이의 값이 될것입니다
        const currentValue = initialValue + ((targetValue - initialValue) * progress);
        ul.style.left = `${currentValue}${unit}`;
        // -200으로 가도록 하는 코드로 수학적 공식과 디폴트 값이 적용된 내용입니다

        if(progress < 1){ //progress의 값을 기준으로 1보다 작으면 해당 animate를 계속 호출하고
                         // => 종료지점까지 진행시키고 그과정들도 볼수있도록 (transition이 적용되는것처럼)
            requestAnimationFrame(animate);
        }else{  //최종 1이 되었을때 기본로직처럼 초기화하는 코드
            ul.style.left = "-100%";
            ul.append(ul.firstElementChild);
            //다시 되돌려서 animate함수(콜백함수)를 사용할 수 있도록 하는 되돌리는 코드
            if(typeof callback === "function") callback();
        }

        
    }
    requestAnimationFrame(animate); //처음 animate를 시작하는 호출
    enableClick = true;
   
    
}


function prevSlide(){
    const duration = 1000;
    const initialValue = parseInt(ul.style.left) || 0;
    const targetValue = 0;
    const unit = '%';
    const startTime = performance.now();
    //초기 페이지 로딩부터 함수가 실행되는 시간을 의미합니다
    

    function animate(time){
      
        const timeElapsed = time - startTime;
        console.log(timeElapsed);
        const progress = timeElapsed / duration;

        const currentValue = initialValue + ((targetValue - initialValue) * progress);
        ul.style.left = `${currentValue}${unit}`;

        if(progress < 1){
            requestAnimationFrame(animate);
        }else{
            ul.style.left = "-100%";
            ul.prepend(ul.lastElementChild);
            if(typeof callback === 'function') callback();
        }

        
    }
    requestAnimationFrame(animate);
    enableClick = true;
   
 
}

console.log(1);
requestAnimationFrame(()=>{
    console.log(2);
})

console.log(1)