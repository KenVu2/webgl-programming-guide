/*
\author Zachary Wartell
\brief

Copyright 2015, Zachary Wartell, University of North Carolina at Charlotte.  All rights reserved.
zwartell@uncc.ed
*/
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '}\n';

/* 
\author Zachary Wartell
\brief 

\todo better GLSL way to get pi 
\todo add option to perform anaytic integrate of the sin function over the expanse of the current fragment.   Simple
case is using box filter.  Perhaps write separate shader for educational purposes... 
*/
var FSHADER_SOURCE =
  '#define pi 3.141592653589793238462643383279 \n' +
  'uniform mediump float u_pixels_per_cycle;\n' +
  'void main() {\n' +  
  '    gl_FragColor = vec4(1.0, 1.0, 1.0,1.0) * sin( (400.0 - gl_FragCoord.x)/u_pixels_per_cycle*2.0*pi);\n' +
  '    gl_FragColor[3]=1.0;' +
  '}\n';


// pixels per cycle of sin function 
var pixels_per_cycle = 400;

//  GLSL uniform for above
var u_pixels_per_cycle;

// gl context
var gl;

// n vertices...   \todo get rid of this global variable.... :)
var n;

// max value of slider
const SLIDER_MAX = 400.0;

/* 
\author Zachary Wartell
\brief handle slider change
*/
var sliderchange = function (event, ui) 
   {
   if (ui.value > SLIDER_MAX/2)
   {
      pixels_per_cycle = (ui.value-SLIDER_MAX/2)*400.0/(SLIDER_MAX/2);
   }
   else
   {
      pixels_per_cycle = (ui.value)/(SLIDER_MAX/2);
   }  
   
   document.getElementById("pixels_per_cycle").innerHTML = String(pixels_per_cycle);
   document.getElementById("cycles_per_pixels").innerHTML = String(1.0/pixels_per_cycle);
   
   drawScene(gl);
   }

/* 
\author Zachary Wartell
\brief draw the scene  
*/
function drawScene(gl)
{
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the rectangle
  gl.uniform1f(u_pixels_per_cycle,pixels_per_cycle);
  gl.drawArrays(gl.TRIANGLES, 0, n);  
}
   


/*
\author Zachary Wartell
\brief main function 
*/
function main() 
{
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

    
  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the GLSL storage location 
  u_pixels_per_cycle = gl.getUniformLocation(gl.program, 'u_pixels_per_cycle');
  if (!u_pixels_per_cycle) {
    console.log('Failed to get the storage location of u_pixels_per_cycle');
    return;
  }

  // initialize slider GUI element 
  $( "#slider" ).on( "slidechange", sliderchange );
  $( "#slider" ).slider({ min:0, max: SLIDER_MAX, value: SLIDER_MAX/2+1, step: 1});
  
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.5, 0.75, 1.0, 1);

  // Write the positions of vertices to a vertex shader
  n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // set HTML labels
   document.getElementById("pixels_per_cycle").innerHTML = String(pixels_per_cycle);
   document.getElementById("cycles_per_pixels").innerHTML = String(1.0/pixels_per_cycle);
   
   // draw initial scene
   drawScene(gl);
}



/*
\author Zachary Wartell
\brief create quad... 
*/
function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    //0, 0.5,   -0.5, -0.5,   0.5, -0.5
    -1.0, -0.5,  1.0, 0.5, -1.0, 0.5,
     1.0, -0.5,  1.0, 0.5, -1.0,-0.5,  
  ]);
  var n = 6; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}
