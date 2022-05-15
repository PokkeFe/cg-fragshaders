#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float width;
uniform float height;
uniform sampler2D image;
uniform float time;
uniform vec2 canvas_resolution;
uniform float scale_multiplier;

out vec4 FragColor;

float circle_radius = 0.45;

void main() {
    vec2 resolution = canvas_resolution;
    vec2 pixel_pos = texcoord * resolution;

        
    float scale = canvas_resolution.y / canvas_resolution.x / scale_multiplier; // 0.075

    float rel_x = mod(pixel_pos.x * scale, 1.0);
    float rel_y = mod(pixel_pos.y * scale, 1.0);

    vec2 rel = vec2(rel_x, rel_y);

    // vec2 rel = pixel_pos * scale;

    // Get circles
    float dist = distance(vec2(rel.x, rel.y), vec2(0.5));
    dist = step(circle_radius, dist);
    float visible = 1.0 - dist;

    // Get pixel offset from center of circle
    float off_x = (rel.x - 0.5) * 2.0;
    float off_y = (rel.y - 0.5) * 2.0;
    vec2 offset = vec2(off_x, off_y) * (1.0 / scale * 0.5);

    // Get new pixel position from offset
    vec2 new_pixel_pos = (pixel_pos - offset); // vec2(0 -> w/h)

    // Transform back to UV space
    vec2 new_texcoord = new_pixel_pos / resolution; // vec2(0 -> 1)

    // Get image value at that position
    vec4 tex = texture(image, new_texcoord);

    FragColor = vec4(offset, 0.0, 1.0);

    // FragColor = vec4(mod(new_pixel_pos,1.0), 0.0, 1.0);

    // FragColor = vec4((new_pixel_pos / resolution), 0.0, 1.0);

    // Closer to final
    FragColor = vec4(vec3(visible) * tex.xyz, 1);

}
