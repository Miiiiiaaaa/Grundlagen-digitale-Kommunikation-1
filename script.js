
document.addEventListener('DOMContentLoaded', function () {
  // Helper function to play audio and wait for it to finish
  function playAudioAndWait(audioId) {
    return new Promise((resolve) => {
      const audio = document.getElementById(audioId);
      if (!audio) {
        resolve(); // if audio doesn't exist, resolve immediately
        return;
      }
      audio.currentTime = 0; // reset to start
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            const onEnded = () => {
              audio.removeEventListener('ended', onEnded);
              resolve();
            };
            audio.addEventListener('ended', onEnded);
          })
          .catch(() => resolve()); // if play fails, resolve anyway
      } else {
        // fallback for older browsers
        audio.onended = () => resolve();
      }
    });
  }

  // Info1 interactions: hover shows txt2
const info1El = document.getElementById("info1");
const txt2El = document.getElementById("txt2");

if (info1El && txt2El) {
  info1El.addEventListener("mouseenter", () => {
    txt2El.classList.add("visible");
  });

  info1El.addEventListener("mouseleave", () => {
    txt2El.classList.remove("visible");
  });
}


  // home button functionality - works on all pages
  const homeBtnF = document.getElementById('homebtn');
  if (homeBtnF) {
    homeBtnF.addEventListener('click', async function () {
      await playAudioAndWait("homebtnsfx");
      // Check if we're in a subsite folder
      const homeUrl = window.location.pathname.includes('/subsites/') ? '../index.html' : 'index.html';
      window.location.href = homeUrl;
    });
  }

  const menu = document.querySelector('.mp3menu');
  if (!menu) return;
  const links = menu.querySelectorAll('a');
  if (!links.length) return;

  let currentIndex = 0;

  // Set initial active state
  links[currentIndex].classList.add('active');

  // Function to handle selection (Enter or click)
  function selectLink(index) {
    // Remove clicked class from all links
    links.forEach(link => link.classList.remove('clicked'));
    // Add clicked class to selected link
    links[index].classList.add('clicked');
  }

  // Function to update active state
  function setActive(index) {
    links[currentIndex].classList.remove('active');
    currentIndex = index;
    links[currentIndex].classList.add('active');
  }

  // Click handler
  links.forEach((link, index) => {
    link.addEventListener('click', async function (e) {
      e.preventDefault();
      setActive(index);
      selectLink(index);
      // Play sound and wait for it to finish, then navigate
      await playAudioAndWait("menuenter");
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;
      }
    });
  });

  // Mouseover handler - sync active state to hovered link
  links.forEach((link, index) => {
    link.addEventListener('mouseover', function () {
      setActive(index);
      document.getElementById("menuhover").play();
    });
  });

  // Arrow key navigation
  // Arrow key navigation (MP3-style scrolling)
document.addEventListener('keydown', function (e) {
  const listBorder = document.getElementById("listborder");

  if (e.key === 'ArrowDown') {
    e.preventDefault();

    const nextIndex = (currentIndex + 1) % links.length;
    setActive(nextIndex);
    ensureMenuItemVisible(listBorder, links[currentIndex]);

    document.getElementById("menuhover").currentTime = 0;
    document.getElementById("menuhover").play();

  } else if (e.key === 'ArrowUp') {
    e.preventDefault();

    const prevIndex = (currentIndex - 1 + links.length) % links.length;
    setActive(prevIndex);
    ensureMenuItemVisible(listBorder, links[currentIndex]);

    document.getElementById("menuhover").currentTime = 0;
    document.getElementById("menuhover").play();

  } else if (e.key === 'Enter') {
    e.preventDefault();

    selectLink(currentIndex);
    const menuenterAudio = document.getElementById("menuenter");
    if (menuenterAudio) menuenterAudio.play();

    const href = links[currentIndex].getAttribute('href');
    if (href && href !== '#') {
      setTimeout(() => window.location.href = href, 500);
    }
  }
});


  window.addEventListener("load", function(){
    if (!sessionStorage.getItem("startupPlayed")) {
        document.getElementById("startupmp3").play();
        sessionStorage.setItem("startupPlayed", "true");
    }
});
  
  // Sound toggle button
  const soundBtn = document.getElementById('soundoff');
  const audios = Array.from(document.querySelectorAll('audio'));
  if (soundBtn) {
    // initialize aria and state
    soundBtn.setAttribute('role', 'button');
    soundBtn.setAttribute('aria-pressed', 'false');
    let muted = false;
    soundBtn.addEventListener('click', function () {
      muted = !muted;
      audios.forEach(a => a.muted = muted);
      soundBtn.classList.toggle('muted', muted);
      soundBtn.setAttribute('aria-pressed', String(muted));
    });
  }


  // Hide #ok1 and #note1 when #ok1 is clicked
  const okBtn = document.getElementById('ok1');
  const noteEl = document.getElementById('note1');
  const oksfx = document.getElementById('oksfx');
  if (okBtn && noteEl) {
    let hiding = false;
    okBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (oksfx) oksfx.play();
      if (hiding) return;
      hiding = true;
      // add fade-out class to start CSS transition
      okBtn.classList.add('fade-out');
      noteEl.classList.add('fade-out');

      // after opacity transition ends, set hidden = true
      const done = (ev) => {
        if (ev.propertyName !== 'opacity') return;
        okBtn.hidden = true;
        noteEl.hidden = true;
        // cleanup listeners and classes
        okBtn.classList.remove('fade-out');
        noteEl.classList.remove('fade-out');
        okBtn.removeEventListener('transitionend', done);
        noteEl.removeEventListener('transitionend', done);
      };

      okBtn.addEventListener('transitionend', done);
      noteEl.addEventListener('transitionend', done);
      // fallback in case transitionend doesn't fire
      setTimeout(() => {
        if (!okBtn.hidden) {
          okBtn.hidden = true;
          noteEl.hidden = true;
          hiding = false;
        }

      }, 600);
    });
  }

  // Hide #ok2 and #note2 when #ok2 is clicked
  const okBtn2 = document.getElementById('ok2');
  const noteEl2 = document.getElementById('note2');
  const oksfx2 = document.getElementById('oksfx');
  if (okBtn2 && noteEl2) {
    let hiding2 = false;
    okBtn2.addEventListener('click', function (e) {
      e.preventDefault();
      if (oksfx2) oksfx2.play();
      if (hiding2) return;
      hiding2 = true;
      // add fade-out class to start CSS transition
      okBtn2.classList.add('fade-out');
      noteEl2.classList.add('fade-out');

      // after opacity transition ends, set hidden = true
      const done2 = (ev) => {
        if (ev.propertyName !== 'opacity') return;
        okBtn2.hidden = true;
        noteEl2.hidden = true;
        // cleanup listeners and classes
        okBtn2.classList.remove('fade-out');
        noteEl2.classList.remove('fade-out');
        okBtn2.removeEventListener('transitionend', done2);
        noteEl2.removeEventListener('transitionend', done2);
      };

      okBtn2.addEventListener('transitionend', done2);
      noteEl2.addEventListener('transitionend', done2);
      // fallback in case transitionend doesn't fire
      setTimeout(() => {
        if (!okBtn2.hidden) {
          okBtn2.hidden = true;
          noteEl2.hidden = true;
          hiding2 = false;
        }
      }, 600);
    });
  }

  // Show #ok1 and #note1 again when #questionm is clicked
  const questionmBtn = document.getElementById('questionm');
  if (questionmBtn && okBtn && noteEl) {
    questionmBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (oksfx2) oksfx2.play();
      // Remove hidden attribute to show elements
      okBtn.hidden = false;
      noteEl.hidden = false;
      // Trigger fade-in by removing fade-out class (if it exists)
      okBtn.classList.remove('fade-out');
      noteEl.classList.remove('fade-out');
    });
  }


// --- MP3-style scroll helper ---
function ensureMenuItemVisible(container, item) {
  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;

  const itemTop = item.offsetTop;
  const itemBottom = itemTop + item.offsetHeight;

  // Scroll DOWN only if needed
  if (itemBottom > containerBottom) {
    container.scrollTo({
      top: itemBottom - container.clientHeight,
      behavior: "smooth"
    });
  }

  // Scroll UP only if needed
  if (itemTop < containerTop) {
    container.scrollTo({
      top: itemTop,
      behavior: "smooth"
    });
  }
}

//disable picture-in-picture for all videos
document.querySelectorAll("video").forEach(video => {
  video.disablePictureInPicture = true;

  // Extra safety: block PiP requests
  video.addEventListener("enterpictureinpicture", (e) => {
    e.preventDefault();
  });});
  });

document.addEventListener('DOMContentLoaded', function () {
const sprechis = [
  document.getElementById("sprechi011"),
  document.getElementById("sprechi012"),
  document.getElementById("sprechi013")
];

const eyeR = document.getElementById("augeR");
const eyeL = document.getElementById("augeL");

let currentSprechiIndex = 0;

// Show first bubble initially
sprechis[currentSprechiIndex].classList.add("sprechi-active");

function showSprechi(index) {
  sprechis.forEach(el => el.classList.remove("sprechi-active"));
  sprechis[index].classList.add("sprechi-active");
  updateCounter(index); // Add this call to update counter
}

if (eyeR) {
  eyeR.addEventListener("click", () => {
    if (currentSprechiIndex < sprechis.length - 1) {
      currentSprechiIndex++;
      showSprechi(currentSprechiIndex)
      document.getElementById("sprechisfx").play();
    }
  });
}

if (eyeL) {
  eyeL.addEventListener("click", () => {
    if (currentSprechiIndex > 0) {
      currentSprechiIndex--;
      showSprechi(currentSprechiIndex)
      document.getElementById("sprechisfx").play();
    }
  });
}

const pageFlip = document.getElementById("sprechisfx");

function playFlip() {
  if (!pageFlip) return;
  pageFlip.currentTime = 0;
  pageFlip.play();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") eyeR.click();
  if (e.key === "ArrowLeft") eyeL.click();
});

const textCounter = document.querySelector('.textcount');

function updateCounter(index) {
  if (!textCounter) return;
  textCounter.textContent = `${index + 1} / ${sprechis.length}`;
}

// Initialize counter on load
updateCounter(currentSprechiIndex);

  const imgiconsfx = document.getElementById('imgiconsfx');

  // imageicon1 click to scroll to img1below
  const imageicon1Btn = document.querySelector('#imageicon1 img');
  if (imageicon1Btn) {
    imageicon1Btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (imgiconsfx) {
        imgiconsfx.currentTime = 0;
        imgiconsfx.play();
      }
      // Scroll to img1below
      const img1belowEl = document.getElementById('img1below');
      if (img1belowEl) {
        img1belowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // imageicon2 click to scroll to img2below
  const imageicon2Btn = document.querySelector('#imageicon2 img');
  if (imageicon2Btn) {
    imageicon2Btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (imgiconsfx) {
        imgiconsfx.currentTime = 0;
        imgiconsfx.play();
      }
      // Scroll to img2below
      const img2belowEl = document.getElementById('img2below');
      if (img2belowEl) {
        img2belowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // toggle mute when img1below clicked
  const img1belowEl = document.getElementById('img1below');
  if (img1belowEl) {
    img1belowEl.addEventListener('click', function (e) {
      e.preventDefault();
      this.muted = !this.muted;
    });
  }

  // imageicon3 click to scroll to img3below
  const imageicon3Btn = document.querySelector('#imageicon3 img');
  if (imageicon3Btn) {
    imageicon3Btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (imgiconsfx) {
        imgiconsfx.currentTime = 0;
        imgiconsfx.play();
      }
      // Scroll to img3below
      const img3belowEl = document.getElementById('img3below');
      if (img3belowEl) {
        img3belowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // imageicon4 click to scroll to img4below
  const imageicon4Btn = document.querySelector('#imageicon4 img');
  if (imageicon4Btn) {
    imageicon4Btn.addEventListener('click', function (e) {
      e.preventDefault();
       if (imgiconsfx) imgiconsfx.play();
      // Scroll to img4below
      const img4belowEl = document.getElementById('img4below');
      if (img4belowEl) {
        img4belowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // imageicon5 click to scroll to img5below
  const imageicon5Btn = document.querySelector('#imageicon5 img');
  if (imageicon5Btn) {
    imageicon5Btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (imgiconsfx) {
        imgiconsfx.currentTime = 0;
        imgiconsfx.play();
      }
      // Scroll to img5below
      const img5belowEl = document.getElementById('img5below');
      if (img5belowEl) {
        img5belowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // imageicon6 click to scroll to img6below
  const imageicon6Btn = document.querySelector('#imageicon6 img');
  if (imageicon6Btn) {
    imageicon6Btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (imgiconsfx) {
        imgiconsfx.currentTime = 0;
        imgiconsfx.play();
      }
      // Scroll to img6below
      const img6belowEl = document.getElementById('img6below');
      if (img6belowEl) {
        img6belowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // imageicon7 click to scroll to img7below
  const imageicon7Btn = document.querySelector('#imageicon7 img');
  if (imageicon7Btn) {
    imageicon7Btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (imgiconsfx) imgiconsfx.play();
      // Scroll to img7below
      const img7belowEl = document.getElementById('img7below');
      if (img7belowEl) {
        img7belowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // imageicon8 click to scroll to img8below
  const imageicon8Btn = document.querySelector('#imageicon8 img');
  if (imageicon8Btn) {
    imageicon8Btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (imgiconsfx) {
        imgiconsfx.currentTime = 0;
        imgiconsfx.play();
      }
      // Scroll to img8below
      const img8belowEl = document.getElementById('img8below');
      if (img8belowEl) {
        img8belowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // imageicon9 click to scroll to img9below
  const imageicon9Btn = document.querySelector('#imageicon9 img');
  if (imageicon9Btn) {
    imageicon9Btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (imgiconsfx) {
        imgiconsfx.currentTime = 0;
        imgiconsfx.play();
      }
      // Scroll to img9below
      const img9belowEl = document.getElementById('img9below');
      if (img9belowEl) {
        img9belowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // MP3Next toggle for semesterreflexion page
  const mp3nextBtn = document.getElementById('mp3next');
  const fahhhhbgmAudio = document.getElementById('fahhhhbgm');
  const fixstuffVideo = document.getElementById('fixstuff');

  if (mp3nextBtn && fahhhhbgmAudio && fixstuffVideo) {
    mp3nextBtn.addEventListener('click', function () {
      // Toggle mute states
      fahhhhbgmAudio.muted = !fahhhhbgmAudio.muted;
      fixstuffVideo.muted = !fixstuffVideo.muted;
    });
  }

  window.addEventListener("click", startMusicOnce, { once: true });
window.addEventListener("keydown", startMusicOnce, { once: true });

function startMusicOnce() {
  const bgm = document.getElementById("fahhhhbgm");
  if (bgm) {
    bgm.play().catch(() => {});
  }
}
function startMusicOnce() {
  const avatarvid = document.getElementById("avatar");
  if (avatarvid) {
    bgm.play().catch(() => {});
  }
}
});




var colour="random"; // "random" can be replaced with any valid colour ie: "red"...
var sparkles=100;// increase of decrease for number of sparkles falling

var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var tiny=new Array();
var star=new Array();
var starv=new Array();
var starx=new Array();
var stary=new Array();
var tinyx=new Array();
var tinyy=new Array();
var tinyv=new Array();

colours=new Array('#ff0000','#00ff00','#ffffff','#ff00ff','#ffa500','#ffff00','#00ff00','#ffffff','ff00ff')

n = 10;
y = 0;
x = 0;
n6=(document.getElementById&&!document.all);
ns=(document.layers);
ie=(document.all);
d=(ns||ie)?'document.':'document.getElementById("';
a=(ns||n6)?'':'all.';
n6r=(n6)?'")':'';
s=(ns)?'':'.style';

if (ns){
	for (i = 0; i < n; i++)
		document.write('<layer name="dots'+i+'" top=0 left=0 width='+i/2+' height='+i/2+' bgcolor=#ff0000></layer>');
}

if (ie)
	document.write('<div id="con" style="position:absolute;top:0px;left:0px"><div style="position:relative">');

if (ie||n6){
	for (i = 0; i < n; i++)
		document.write('<div id="dots'+i+'" style="position:absolute;top:0px;left:0px;width:'+i/2+'px;height:'+i/2+'px;background:#ff0000;font-size:'+i/2+'"></div>');
}

if (ie)
	document.write('</div></div>');
(ns||n6)?window.captureEvents(Event.MOUSEMOVE):0;

function Mouse(evnt){

	y = (ns||n6)?evnt.pageY+4 - window.pageYOffset:event.y+4;
	x = (ns||n6)?evnt.pageX+1:event.x+1;
}

(ns)?window.onMouseMove=Mouse:document.onmousemove=Mouse;

function animate(){

	o=(ns||n6)?window.pageYOffset:0;

	if (ie)con.style.top=document.body.scrollTop + 'px';

	for (i = 0; i < n; i++){

		var temp1 = eval(d+a+"dots"+i+n6r+s);

		randcolours = colours[Math.floor(Math.random()*colours.length)];

		(ns)?temp1.bgColor = randcolours:temp1.background = randcolours; 

		if (i < n-1){

			var temp2 = eval(d+a+"dots"+(i+1)+n6r+s);
			temp1.top = parseInt(temp2.top) + 'px';
			temp1.left = parseInt(temp2.left) + 'px';

		} 
		else{

			temp1.top = y+o + 'px';
			temp1.left = x + 'px';
		}
	}

	setTimeout("animate()",10);
}

animate();

window.addEventListener("load", function() { if (document.getElementById) {
	var i, rats, rlef, rdow;
	for (var i=0; i<sparkles; i++) {
		var rats=createDiv(3, 3);
		rats.style.visibility="hidden";
		rats.style.zIndex="999";
		document.body.appendChild(tiny[i]=rats);
		starv[i]=0;
		tinyv[i]=0;
		var rats=createDiv(5, 5);
		rats.style.backgroundColor="transparent";
		rats.style.visibility="hidden";
		rats.style.zIndex="999";
		var rlef=createDiv(1, 5);
		var rdow=createDiv(5, 1);
		rats.appendChild(rlef);
		rats.appendChild(rdow);
		rlef.style.top="2px";
		rlef.style.left="0px";
		rdow.style.top="0px";
		rdow.style.left="2px";
		document.body.appendChild(star[i]=rats);
	}
	set_width();
	sparkle();
}});

function sparkle() {
	var c;
	if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
		ox=x;
		oy=y;
		for (c=0; c<sparkles; c++) if (!starv[c]) {
			star[c].style.left=(starx[c]=x)+"px";
			star[c].style.top=(stary[c]=y+1)+"px";
			star[c].style.clip="rect(0px, 5px, 5px, 0px)";
			star[c].childNodes[0].style.backgroundColor=star[c].childNodes[1].style.backgroundColor=(colour=="random")?newColour():colour;
			star[c].style.visibility="visible";
			starv[c]=50;
			break;
		}
	}
	for (c=0; c<sparkles; c++) {
		if (starv[c]) update_star(c);
		if (tinyv[c]) update_tiny(c);
	}
	setTimeout("sparkle()", 40);
}

function update_star(i) {
	if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
	if (starv[i]) {
		stary[i]+=1+Math.random()*3;
		starx[i]+=(i%5-2)/5;
		if (stary[i]<shigh+sdown) {
			star[i].style.top=stary[i]+"px";
			star[i].style.left=starx[i]+"px";
		}
		else {
			star[i].style.visibility="hidden";
			starv[i]=0;
			return;
		}
	}
	else {
		tinyv[i]=50;
		tiny[i].style.top=(tinyy[i]=stary[i])+"px";
		tiny[i].style.left=(tinyx[i]=starx[i])+"px";
		tiny[i].style.width="2px";
		tiny[i].style.height="2px";
		tiny[i].style.backgroundColor=star[i].childNodes[0].style.backgroundColor;
		star[i].style.visibility="hidden";
		tiny[i].style.visibility="visible"
	}
}

function update_tiny(i) {
	if (--tinyv[i]==25) {
		tiny[i].style.width="1px";
		tiny[i].style.height="1px";
	}
	if (tinyv[i]) {
		tinyy[i]+=1+Math.random()*3;
		tinyx[i]+=(i%5-2)/5;
		if (tinyy[i]<shigh+sdown) {
			tiny[i].style.top=tinyy[i]+"px";
			tiny[i].style.left=tinyx[i]+"px";
		}
		else {
			tiny[i].style.visibility="hidden";
			tinyv[i]=0;
			return;
		}
	}
	else tiny[i].style.visibility="hidden";
}

document.onmousemove=mouse;
function mouse(e) {
	if (e) {
		y=e.pageY;
		x=e.pageX;
	}
	else {
		set_scroll();
		y=event.y+sdown;
		x=event.x+sleft;
	}
}

window.onscroll=set_scroll;
function set_scroll() {
	if (typeof(self.pageYOffset)=='number') {
		sdown=self.pageYOffset;
		sleft=self.pageXOffset;
	}
	else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
		sdown=document.body.scrollTop;
		sleft=document.body.scrollLeft;
	}
	else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
		sleft=document.documentElement.scrollLeft;
		sdown=document.documentElement.scrollTop;
	}
	else {
		sdown=0;
		sleft=0;
	}
}

window.onresize=set_width;
function set_width() {
	var sw_min=999999;
	var sh_min=999999;
	if (document.documentElement && document.documentElement.clientWidth) {
		if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
		if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
	}
	if (typeof(self.innerWidth)=='number' && self.innerWidth) {
		if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
		if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
	}
	if (document.body.clientWidth) {
		if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
		if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
	}
	if (sw_min==999999 || sh_min==999999) {
		sw_min=800;
		sh_min=600;
	}
	swide=sw_min;
	shigh=sh_min;
}

function createDiv(height, width) {
	var div=document.createElement("div");
	div.style.position="absolute";
	div.style.height=height+"px";
	div.style.width=width+"px";
	div.style.overflow="hidden";
	return (div);
}

function newColour() {
	var c=new Array();
	c[0]=255;
	c[1]=Math.floor(Math.random()*256);
	c[2]=Math.floor(Math.random()*(256-c[1]/2));
	c.sort(function(){return (0.5 - Math.random());});
	return ("rgb("+c[0]+", "+c[1]+", "+c[2]+")");
};


