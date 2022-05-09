#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {
    vec4 out_tex = texture(image, texcoord);

    out_tex *= 4.0;
    out_tex = round(out_tex);
    out_tex /= 4.0;

    // Reset alpha value
    out_tex.a = 1.0;

    FragColor = out_tex;
}
