(() => {
    const canvas = document.getElementById('shader-canvas-ANIMATION_5');

    function syncSize() {
        const width = canvas.clientWidth || 1280;
        const height = canvas.clientHeight || 720;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
    }

    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vertexShader = `attribute vec2 a_position;
 varying vec2 v_texCoord;
 void main() {
   v_texCoord = a_position * 0.5 + 0.5;
   gl_Position = vec4(a_position, 0.0, 1.0);
 }`;
    const fragmentShader = `precision highp float;
 varying vec2 v_texCoord;
 uniform float u_time;
 uniform vec2 u_resolution;

 void main() {
     vec2 uv = v_texCoord;
     float flow = sin(uv.x * 3.0 + u_time * 0.5) * 0.1;
     uv.y += flow;
     vec3 color1 = vec3(0.06, 0.01, 0.01);
     vec3 color2 = vec3(0.04, 0.04, 0.04);
     vec3 saffron = vec3(0.96, 0.77, 0.19);
     float noise = sin(uv.x * 10.0 + u_time) * cos(uv.y * 10.0 - u_time);
     float mask = smoothstep(0.4, 0.6, noise * 0.5 + 0.5);
     vec3 finalColor = mix(color1, color2, uv.y);
     finalColor = mix(finalColor, saffron, mask * 0.03);
     gl_FragColor = vec4(finalColor, 1.0);
 }`;

    function createShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexShader));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragmentShader));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, 'u_time');
    const resolutionUniform = gl.getUniformLocation(program, 'u_resolution');
    const mouseUniform = gl.getUniformLocation(program, 'u_mouse');
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    window.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        if (rect.width && rect.height) {
            mouse.x = ((event.clientX - rect.left) / rect.width) * canvas.width;
            mouse.y = (1 - (event.clientY - rect.top) / rect.height) * canvas.height;
        }
    });

    function render(time) {
        if (typeof ResizeObserver === 'undefined') syncSize();
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (timeUniform) gl.uniform1f(timeUniform, time * 0.001);
        if (resolutionUniform) gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
        if (mouseUniform) gl.uniform2f(mouseUniform, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
    }

    render(0);
})();
