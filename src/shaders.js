let vsSource =
    [
        'precision mediump float;',
        'attribute vec3 vertPositions;',
        'attribute vec3 vertColor;',
        'attribute vec3 a_normal;',
        'attribute vec2 aTextureCoord;',
        'varying vec3 fragColor;',
        'varying vec3 v_normal;',
        '',
        'uniform vec3 uColors;',
        'uniform mat4 mWorld;',
        'uniform mat4 mView;',
        'uniform mat4 mProj;',
        'uniform vec3 u_lightWorldPosition;',
        'varying vec3 v_surfaceToLight;',
        'varying highp vec2 vTextureCoords;',
        '',
        'void main()',
        '{',
        '   fragColor = uColors;',
        '   vec3 surfaceWorldPosition = (mWorld * vec4(vertPositions, 1.0)).xyz;',
        '   v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;',
        '   v_normal = mat3(mWorld) * a_normal;',
        '   vTextureCoords = aTextureCoord;',
        '   gl_Position = mProj * mView * mWorld * vec4(vertPositions, 1.0);',
        '}',
    ].join('\n');

let fsSource =
    [
        'precision mediump float;',
        '',
        'varying vec3 fragColor;',
        'varying vec3 v_normal;',
        'varying vec3 v_surfaceToLight;',
        'varying vec2 vTextureCoords;',
        'uniform float coefOfColor;',
        'uniform sampler2D uSampler;',
        'uniform sampler2D uSampler2;',
        'void main()',
        '{',
        'vec3 normal = normalize(v_normal);',
        'vec3 surfaceToLightDirection = normalize(v_surfaceToLight);',
        'float light = dot(normal, surfaceToLightDirection);',
        'vec4 color0 = texture2D(uSampler, vTextureCoords);',
        'vec4 color1 = texture2D(uSampler2, vTextureCoords);',
        'vec4 color2 = vec4(fragColor, 1.0) ;',
        'gl_FragColor = color0  * ( color1 * (1.0 - coefOfColor)  + color2 * coefOfColor);',
        'gl_FragColor.rgb *= light;',
        '',
        '}',
    ].join('\n');