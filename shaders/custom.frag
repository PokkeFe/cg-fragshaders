#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float width;
uniform float height;
uniform sampler2D image;

out vec4 FragColor;

const float blur_strength = 0.005;

void main() {

    vec4 out_tex = texture(image, texcoord);

    out_tex += texture(image, vec2(texcoord.x, texcoord.y + blur_strength));
    out_tex += texture(image, vec2(texcoord.x, texcoord.y - blur_strength));
    
    out_tex += texture(image, vec2(texcoord.x + blur_strength, texcoord.y));
    out_tex += texture(image, vec2(texcoord.x - blur_strength, texcoord.y));

    out_tex += texture(image, vec2(texcoord.x + blur_strength, texcoord.y + blur_strength));
    out_tex += texture(image, vec2(texcoord.x + blur_strength, texcoord.y - blur_strength));
    out_tex += texture(image, vec2(texcoord.x - blur_strength, texcoord.y + blur_strength));
    out_tex += texture(image, vec2(texcoord.x - blur_strength, texcoord.y - blur_strength));

    out_tex /= 9.0;

    out_tex.a = 1.0;
    
    FragColor = out_tex;
}
