#define pi 3.141592653589793238462643383279  
uniform mediump float u_pixels_per_cycle; 
void main() {   
  gl_FragColor = vec4(1.0, 1.0, 1.0,1.0) * sin( (400.0 - gl_FragCoord.x)/u_pixels_per_cycle*2.0*pi); 
  gl_FragColor[3]=1.0; 
  }
