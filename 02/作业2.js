// var course = document.getElementsByClassName("btbg1")[0];
// console.log(course);
// course.onmouseover = test;
// function test(e)
// {
//     console.log(e);
// }

function getTop(e)
{
    var offset = e.offsetTop;
    if(e.offsetParent != null) 
    {
        offset += getTop(e.offsetParent);
    }
    return offset;
}

function getLeft(e)
{
    var offset = e.offsetLeft;
    if (e.offsetParent != null)
    {
        offset += getLeft(e.offsetParent);
    }
    return offset;
}

function mOver(obj)
{
    let b = document.getElementById("message");
    let time = document.getElementById("time");
    let atime = document.getElementById("atime");
    let address = document.getElementById("address");
    let teacher = document.getElementById("teacher");
    if (b.offsetParent != null)
    {
        var top = getTop(obj) + obj.offsetHeight - b.offsetParent.offsetTop ;
        var left = getLeft(obj) + obj.offsetWidth - b.offsetParent.offsetLeft;
    }
    else
    {
        var top = getTop(obj) + obj.offsetHeight ;
        var left = getLeft(obj) + obj.offsetWidth;
    }
    // console.log(typeof(top));
    console.log(typeof(b.style.top));
    console.log(b.style.top);

    // console.log(top);
    // console.log(left);

    if (obj.innerHTML == "windows")
    {
        time.value = "1~19 week";
        atime.innerHTML = "1.1; 3.4";
        address.innerHTML = "n217";
        teacher.innerHTML = "zao";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "Python")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "4.1";
        address.innerHTML = "n211";
        teacher.innerHTML = "zhang";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "web")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "2.1; 4.3";
        address.innerHTML = "n108";
        teacher.innerHTML = "Tu";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "编译原理")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "2.1 double; 4.4";
        address.innerHTML = "n108";
        teacher.innerHTML = "yang";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "习思想")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "4.2";
        address.innerHTML = "n201";
        teacher.innerHTML = "Lu";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "软件工程")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "1.2";
        address.innerHTML = "n108";
        teacher.innerHTML = "Miss.Li";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "项目管理")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "2.2";
        address.innerHTML = "n108";
        teacher.innerHTML = "Miss.Li";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "设计模式")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "2.4";
        address.innerHTML = "n520";
        teacher.innerHTML = "yang Li";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "现代汽车基础")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "4.5";
        address.innerHTML = "8103";
        teacher.innerHTML = "Wu";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "操作系统")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "3.2; 5.1";
        address.innerHTML = "n211";
        teacher.innerHTML = "Older Li";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
    else if (obj.innerHTML == "人工智能")
    {
        time.innerHTML = "1~19 week";
        atime.innerHTML = "3.1";
        address.innerHTML = "n113";
        teacher.innerHTML = "Dai";
        b.style.top = top.toString() + "px";
        b.style.left = left.toString() + "px";
        b.style.display = "block";
    }
}

function mOut()
{
    let b = document.getElementById("message");
    b.style.display = "none";
}



