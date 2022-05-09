#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {
    vec4 tex = texture(image, texcoord);
    float L = (0.299 * tex.x) + (0.587 * tex.y) + (0.114 * tex.z);
    FragColor = vec4(L, L, L, 1.0);
}
