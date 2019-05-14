/*
*   此JS库为满足个人开发以及一些兴趣爱好而写的插件库
*   作者: xuYang
*   开始时间:4/25/2019
*/ 

( function () {

    let 
        X = {
            Slide : Slide,              //  幻灯片||轮播图插件
            getStyle : getStyle,        //  返回一个dom的style属性值
            startMove : startMove,      //  运动函数
            type : type,                //  返回一个值的数据类型
            ev : addEvent,              //  兼容的添加事件函数 参数为(dom元素，事件类型，处理函数)
            $ : $,                      //  简化了console.log,控制台输出函数
        };

        //幻灯片||轮播图插件 
        //允许传入两个参数： 
        //第一个是将哪个区域变成轮播图的dom
        //第二个是一个数组，其中包含了许多以对象形式存储的数据，包括图片地址，点击跳转地址等    
        //ImgArr里的对象属性中必须包括imgUrl 和 link
        function Slide ( dom, ImgArr ) {    
            if( ImgArr.length === 0 ) {
                return
            };
            

            //定义变量
            let ImgDiv = document.createElement('div');     //图片区域
            let IndexDiv = document.createElement('div');   //可点击索引区域
            let len = ImgArr.length;                        //传入数组的长度
            let curIndex = 0;                               //当前显示的索引
            let lastIndex = 0;                              //上一次显示的索引
            let timer = null;                               //完成变化的计时器
            let autoTimer = null;                           //自动变化计时器
            let autoRate = 3000;                            //自动变化间隔
            let oW = dom.offsetWidth;                       //dom的宽度


            for( let i = 0; i < len; i++ ){
                if( ! (ImgArr[i].imgUrl && ImgArr[i].link) ) {
                    throw new Error( "Slide函数中第二个参数中没有imgUrl或者link属性" );
                }
            }
            

            //初始化dom区域
            dom.innerHTML = "";
            dom.appendChild(ImgDiv);
            dom.appendChild(IndexDiv);
            //配置初始dom的必须样式
            initDom(); 
            //初始化图片区域
            initImgDiv();
            //初始化可点击索引区域
            initIndexDiv();
            //第一次默认执行一次show
            show( curIndex );
            //自动播放
            autoChange();

            //鼠标移入不会自动播放
            dom.addEventListener("mouseenter", function () {
                clearTimeout( autoTimer );
                autoTimer = null;
            } );

            dom.addEventListener("mouseleave", function(){
                autoChange();
            } );



            //配置初始dom的必须样式
            function initDom () {
                let demo = window.getComputedStyle(dom, null);
                dom.style.overflow = "hidden";
                if( demo.position === "static" ){
                    dom.style.position = "relactive";
                }
                
            }


            //初始化图片区域函数
            function initImgDiv () {        
                ImgDiv.style.width = 100 * len + "%";
                ImgDiv.style.height = "100%";
                ImgDiv.style.marginLeft = "0";
                for( let i = 0; i < len; i++ ){
                    let img = document.createElement("div");
                    img.style.width = oW + "px";
                    img.style.height = "100%";
                    img.style.display = "inline-block";
                    img.style.backgroundImage = "url(" + ImgArr[i].imgUrl + ")";
                    img.style.backgroundRepeat= "no-repeat";
                    img.style.backgroundSize = "100% 100%";
                    img.style.cursor = "pointer";
                    img.style.marginLeft = "0";
                    img.addEventListener("click", function () {
                        if( ImgArr[i].link ) {
                            location.href = ImgArr[i].link;
                        }
                    } )
                    ImgDiv.appendChild(img);
                }
            };

            //初始化可点击索引区域函数
            function initIndexDiv () {
                IndexDiv.style.textAlign = "center";
                IndexDiv.style.position = "absolute";
                IndexDiv.style.left = "50%";
                IndexDiv.style.transform = "translate(-50%)";
                IndexDiv.style.bottom = "30px";
                for( let i = 0; i < len; i++ ) {
                    let oDiv = document.createElement('div');
                    oDiv.style.width = "16px";
                    oDiv.style.height= "16px";
                    oDiv.style.display = "inline-block";
                    oDiv.style.background = "lightgray"
                    oDiv.style.cursor = "pointer";
                    oDiv.style.borderRadius = "50%";
                    oDiv.style.margin = "0 8px";
                    oDiv.addEventListener("click", function () {
                        show( i );
                    } );
                    
                    IndexDiv.appendChild(oDiv);
                }
            };


            //显示第几张图片和第几个索引函数
            function show ( index ) {
                curIndex = index;
                for( let i = 0; i < len; i++ ){
                    const temporary = IndexDiv.children[i];
                    if( i === curIndex ) {
                        temporary.style.backgroundColor = "#be926f";
                    }else{
                        temporary.style.backgroundColor = "lightgray";
                    }
                }
                X.startMove(ImgDiv, {marginLeft: -curIndex * oW}, function () {
                })
            }

            //自动播放函数
            function autoChange (){
                if( autoTimer ){
                    return;
                }
                autoTimer = setInterval(function () {
                    if ( curIndex === len - 1 ) {
                        show(0);
                    }
                    else {
                        show(curIndex + 1);
                    }
                }, autoRate)
            }

            
            
        };
        /* *********************************************************************************** */


        //传入一个dom元素和他的style属性，返回他style属性的值
        function getStyle( elem, prop ){
            if( window.getComputedStyle ){
                return window.getComputedStyle( elem, null )[prop];
            }else{
                return elem.currentStyle[prop];
            }
        };


         /* *********************************************************************************** */
        //多物体多值链式缓冲运动
        function startMove( obj, json, fn ){
            clearInterval( obj.timer );
            var ispped,iCur;
            obj.timer = setInterval(function(){
                var bStop = true;
                for(var attr in json){
                    if(attr == 'opacity'){
                        iCur = parseFloat( X.getStyle(obj, attr) ) * 100;
                    }else{
                        iCur = parseInt( X.getStyle(obj, attr) );                     
                    }
                    ispped = (json[attr] - iCur) / 7;
                    ispped = ispped > 0 ? Math.ceil(ispped) : Math.floor(ispped);
                    if(attr == 'opacity'){
                        obj.style.opacity = (iCur + ispped) / 100;
                    }else{
                        obj.style[attr] = iCur + ispped + 'px';
                    }
                    if(iCur != json[attr]){
                        bStop = false;                      
                    }
                    if(bStop){
                        clearInterval(obj.timer);                 
                        typeof fn == 'function' ? fn() : '';
                    }
                }
            }, 30)
        };

        /* *********************************************************************************** */

        //用来返回一个值的数据类型
        function type(Target) {
            var myTypeof = {
                "[object Boolean]" : "boolean - object",
                "[object Array]" : 'array',
                "[object String]" : "string - object",
                "[object Object]" : 'object',
                "[object Number]" : "number - object"
            }
            if(Target === null){
                return 'null';
            }
            if(typeof(Target) == 'object'){
                var str = Object.prototype.toString.call(Target);
                return myTypeof[str];
            }else {
                return typeof(Target);
            }
        };

        /* ************************************************************************************ */

        //兼容的添加事件函数
        //依次传入dom元素，事件类型，处理函数
        function addEvent(elem, type, handle){
            if(elem.addEventListener){
                elem.addEventListener(type, handle, false);
            }else if(elem.attachEvent){
                elem.attachEvent('on' + type , function(){
                    handle.call(elem);
                });
            }else{
                elem['on' + type] = handle;
            }
        };

        /* ************************************************************************************ */          

        function $ ( str ) {
            console.log( str );
        };

        /* ************************************************************************************ */          

        if( window.X !== undefined ){
            throw new Error( "X变量已经被声明,并挂在了window上" );
        }else{
            window.X = X;
        };

} ) ()