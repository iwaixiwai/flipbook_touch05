let gif;
let png;
let title;
let frameSlider;
let sound; // サウンドオブジェクトを格納する変数
let index = 0;
let index_old;
let maxFrame;
let uX, uY;
let uX_min, uX_max;
let snd = [];
let bar_y;
let flip_flag = 0;
let shift_x, shift_y;
let touch_onoff = 0;
let count = 0;
let end_count = 0;
let title_fade = 255;
let title_onoff = 0;

// Load the image.
function preload() {

  title = loadImage("flipbook_title02b.png");
  png = loadImage("flipbook_shadow01.png");
  gif = loadImage("階段を降りる人アニメ正方形.gif");
//  snd[0] = loadSound('flipbook01_short.wav');
//  snd[1] = loadSound('flipbook02_short.wav');
//  snd[2] = loadSound('flipbook03_short.wav');
}

function setup() 
{
  snd[0] = document.createElement("audio");
  snd[1] = document.createElement("audio");
  snd[2] = document.createElement("audio");

  snd[0].src = "flipbook01_short.wav";
  snd[1].src = 'flipbook02_short.wav';
  snd[2].src = 'flipbook03_short.wav';
  
  //スクロールを固定
  
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  if(windowWidth < windowHeight)
  {
    ww = windowWidth;
    wh = windowWidth*1.2;
    shift_x = 0;
    shift_y = (windowHeight - wh)/2;
  }
  else
  {
    ww = windowHeight*0.8333;
    wh = windowHeight;
    shift_x = (windowWidth - ww)/2;
    shift_y = 0;
  }
    
  createCanvas(windowWidth, windowHeight);
  bar_y = wh*0.86;

  // Get the index of the last frame.
  maxFrame = gif.numFrames() - 1;

  title_onoff = 2;
  count = 12; 

}

function draw() 
{
  background(255);
  tint(255, 255);  // 透明度

  translate(shift_x,shift_y);

  // タッチがある場合はタッチ座標を使用し、ない場合はマウス座標を使用

     if (touches.length > 0) {
        uX = touches[0].x;
        uY = touches[0].y;
      } else {
        uX = mouseX;
        uY = mouseY;
      }

  uX_min = ww*0.1+shift_x;
  uX_max = ww*0.9+shift_x;
  
  if(uX>=uX_min && uX<=uX_max)
  {
    index = (int)(map(uX, uX_min, uX_max, 0, maxFrame));
  }

  if(uX<uX_min)
  {
    index = 0;
  }
  
  if(uX>uX_max)
  {
    index = maxFrame;
  }
  
  if(index != index_old)
  {
//    myAudio[0].play();
//    snd[index%3].stop();
//    snd[index%3].pause();
    snd[index%3].play();
    flip_flag = 1;
    
    if(title_onoff == 0)
    {
      title_onoff = 1;
      count = 0;
    }
    if(count > 12)
    {
      title_onoff = 2;
      count = 200;
    }
  }
  
  // Set the GIF's frame.
  gif.setFrame(index);
  
  // Display the image.
  image(gif, 0, 0, ww,ww);

  if(flip_flag == 1)
  {
    // Display the image.
    image(png, 0, 0, ww,ww);
    flip_flag = 0;
  }
  
  // さわるバーを描く
  fill(255,200,200);
  noStroke();
  rect(ww*0.1, bar_y, ww*0.8, ww*0.1);
  ellipse(ww*0.1, bar_y+ww*0.05, ww*0.1, ww*0.1);
  ellipse(ww*0.9, bar_y+ww*0.05, ww*0.1, ww*0.1);
  
  fill(255);
  //文字の設定
  textAlign(CENTER);
  textSize(ww*0.07);

  //カウント表示
  text(index+1, ww/2, bar_y+ww*0.075);

  index_old = index;
  
  if(count >= 0 && count < 12)
  {
    title_fade = 255 - count * 25;
    if(title_fade < 0) title_fade = 0;
    tint(255, title_fade);  // 透明度
    image(title, 0, 0, ww,ww);
  }
  
  if(title_onoff == 1)
  {
    count++;
    if(count > 12)
    {
      title_onoff = 2;
      count = 200;
    }
  }
  
  if(!touch_onoff && title_onoff == 2)
  {
    count--;
    if(count < 0)
    {
      count = 0;
      title_onoff = 0;
    }
  }
}

// On mouse click
function mousePressed() 
{
//    snd[0].play();
          uX = mouseX;
        uY = mouseY;
  touch_onoff = true;
  if(title_onoff == 0)
  {
    title_onoff = 1;
    count = 0;
  }
}


function mouseReleased() 
{
  touch_onoff = false;
}

function touchStarted() 
{
  touch_onoff = true;
  if(title_onoff == 0)
  {
    title_onoff = 1;
    count = 0;
  }
}

function touchEnded() 
{
  touch_onoff = false;
}
