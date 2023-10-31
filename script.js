const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});
var timeout;
function first_page_animatio() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y : "-150",
        opacity : 0,
        duration: 2,
        delay:-1,
        ease : Expo.easeInOut
    })
    .to(".boundingele", {
        y : "-3",
        duration: 1,
        delay:-1,
        ease: Expo.easeInOut,
        stagger : 0.2
    })
    .from("#homefooter", {
        y : "150",
        opacity : 0,
        duration: 2,
        delay:-1,
        ease : Expo.easeInOut
    })
}
function circle_skewing() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mouseover", function (dets) {
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
        xprev = dets.clientX;
        yprev = dets.clientY;
        circle_mouse_follower(xscale, yscale);
        timeout=setTimeout(() => {
            document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);

    })
}
circle_skewing();
function circle_mouse_follower(xscale, yscale) {
    window.addEventListener('mousemove', function (dets) {
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
    
}
circle_mouse_follower();
first_page_animatio();
document.querySelectorAll(".ele").forEach(function (ele) {
    var rotate = 0;
    var diffrot = 0;
  
    ele.addEventListener("mouseleave", function (dets) {
      gsap.to(ele.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    ele.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - ele.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(ele.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });
