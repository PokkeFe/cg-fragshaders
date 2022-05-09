#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float time;
uniform sampler2D image;

out vec4 FragColor;

void main() {
    vec2 modif_texcoord = (texcoord * 2.0) - 1.0;

    float radius = length(modif_texcoord);

    vec2 texcoord_offset = modif_texcoord;
    texcoord_offset *= (sin(radius * 30.0 - time * 5.0) + 0.5);
    texcoord_offset /= 60.0;

    FragColor = texture(image, texcoord + texcoord_offset);
}
