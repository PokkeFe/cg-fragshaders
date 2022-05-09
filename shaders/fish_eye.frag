#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {
    vec2 barrel_texcoord = (texcoord * 2.0) - 1.0;

    float theta = atan(barrel_texcoord.y, barrel_texcoord.x);
    float radius = pow(length(barrel_texcoord), 1.5);

    barrel_texcoord = vec2(radius * cos(theta), radius * sin(theta));
    barrel_texcoord = 0.5 * (barrel_texcoord + 1.0);
    
    FragColor = texture(image, barrel_texcoord);
}
