
var middle
var cover

var lefChange = 25
var sizeChange = 1.25
var scrollTrigger = 66

var eqMov = getEquation(0, 50, scrollTrigger, lefChange);
var eqSize = getEquation(0, sizeChange, scrollTrigger, 1);


function isElementInViewport (el) {
  var rect = el.getBoundingClientRect();
  var vHeight = window.innerHeight || document.documentElement.clientHeight;
  return (
    rect.bottom >= 0 &&
    rect.top <= vHeight/3
  );
}


window.onresize = function()
{
  middle = (window.innerWidth/2 - cover.offsetWidth/2)/window.innerWidth * 100
  if(window.innerWidth > 1000)
  {
    window.addEventListener('scroll', onScroll);
    onScroll()
  }
  else
    phoneVersion();
}

function checkIndex()
{
  var visible = 0;
  var ids = ['about','skills','education','projects'];
  ids.forEach(function(id){
    if(isElementInViewport($('#'+id)[0])) {
        visible = id;
    }
  })
  
  if (visible) {
    $('.index-element').removeClass('selected');
    $('#' + visible + '_').addClass('selected');
  }
}

function onScroll()
{
  checkIndex()
  positionCover()
  cover.style.transition = "all 0.1s ease"
}

// We check where the cover should go depending on the scroll position

// True if the cover should go to the left
function isCoverDown() {
  return (document.documentElement.scrollTop/window.innerHeight) * 100 > scrollTrigger;
}

// True if the cover should go to the Top
function isCoverTop() {
  return document.documentElement.scrollTop === 0;
}

// Get equation to move the cover-section
function getEquation(x1, y1, x2, y2)
{
  let m = (y2 - y1) / (x2 - x1);
  return [m, y1];
}


function positionCover() {
  let x = (document.documentElement.scrollTop/window.innerHeight) * 100;
  let calcMov = eqMov[0]*x + eqMov[1];
  let calcSize = eqSize[0]*x + eqSize[1];
  
  
  if (isCoverDown())
  {
    cover.style.left = lefChange - getLeft() + "vw"
    index.classList.remove("hidden-index");
    cover.style.scale = 1;
  }  
  else if (isCoverTop())
    cover.style.left = middle + "vw";
  
  else
  {
    index.classList.add("hidden-index");
    cover.style.left = (calcMov - getLeft()) + "vw";
    cover.style.scale =  calcSize;
  }
}

function getLeft() {
  return (((cover.offsetWidth/2)/window.innerWidth)*100);
}


function phoneVersion()
{
  cover.style.scale = sizeChange;
  window.removeEventListener('scroll', onScroll);
  index.classList.add("hidden-index")
  cover.style.left = (window.innerWidth/2 - cover.offsetWidth/2)/window.innerWidth * 100 + "vw";
}


window.onload = function()
{
  cover = document.getElementById("cover-section")
  index = document.getElementById("index")
  middle = (window.innerWidth/2 - cover.offsetWidth/2)/window.innerWidth * 100
  window.addEventListener('scroll', onScroll);
  cover.style.scale = sizeChange;
  cover.style.opacity = "0"

  
  if (window.innerWidth < 1000)
    phoneVersion();

  else
  {
    if (isCoverTop())
    {
      index.classList.add("hidden-index")
      setTimeout (() => {
          cover.style.transition = "all 1s ease"
          cover.style.marginTop = "0vh";
          cover.style.opacity = "1"
      }, 50);
      positionCover();
    }
    else
    {
      cover.style.marginTop = "0vh";
      cover.style.opacity = "1";
      positionCover();
    }
  }
}
