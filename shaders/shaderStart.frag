#version 410 core

in vec3 fNormal;
in vec4 fPosEye;
in vec2 fTexCoords;
in vec4 fragPosLightSpace;
in vec3 fPosition;

out vec4 fColor;

//lighting
uniform	vec3 lightDir;
uniform	vec3 lightColor;
uniform vec3 lampLightDir2;
uniform vec3 lampLightColor;
uniform float fogDensity;

//texture
uniform sampler2D diffuseTexture;
uniform sampler2D specularTexture;
uniform sampler2D shadowMap;

vec3 ambient;
float ambientStrength = 0.2f;
vec3 diffuse;
vec3 specular;
float specularStrength = 0.5f;
float shininess = 32.0f;
float specCoeff = 0.4f;

float constant = 1.0f;
float linear = 0.07f;
float quadratic = 0.017;

vec3 ambientLamp2 = vec3 (0.0f);
vec3 specLamp2 = vec3(0.0f);
vec3 diffLamp2 = vec3(0.0f);

void computeLamp()
{		
	
	vec3 cameraPosEye = vec3(0.0f);//in eye coordinates, the viewer is situated at the origin
	
	//transform normal
	vec3 normalEye = normalize(fNormal);	
	
	//compute light direction
	vec3 lightDirN = normalize(lampLightDir2-fPosition);
	
	//compute view direction 
	vec3 viewDirN = normalize(cameraPosEye - fPosEye.xyz);
		
	float distance = length(lampLightDir2 - fPosition);
	float att = 1.0f / (constant + linear * distance + quadratic *(distance * distance));

	ambientLamp2 += att* ambientStrength * lampLightColor;
	specLamp2 += att * specularStrength * specCoeff * lampLightColor;
	diffLamp2 += att * max(dot(normalEye, lightDirN), 0.0f) * lampLightColor;
}

void computeLightComponents()
{		
	vec3 cameraPosEye = vec3(0.0f);//in eye coordinates, the viewer is situated at the origin
	
	//transform normal
	vec3 normalEye = normalize(fNormal);	
	
	//compute light direction
	vec3 lightDirN = normalize(lightDir);
	
	//compute view direction 
	vec3 viewDirN = normalize(cameraPosEye - fPosEye.xyz);
		
	//compute ambient light
	ambient = ambientStrength * lightColor;
	
	//compute diffuse light
	diffuse = max(dot(normalEye, lightDirN), 0.0f) * lightColor;
	
	//compute specular light
	vec3 reflection = reflect(-lightDirN, normalEye);
	float specCoeff = pow(max(dot(viewDirN, reflection), 0.0f), shininess);
	specular = specularStrength * specCoeff * lightColor;
}

float computeShadow(){

	vec3 normalizedCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
	normalizedCoords = normalizedCoords * 0.5f + 0.5f;

	float closestDepth = texture( shadowMap , normalizedCoords.xy ).r;
	float currentDepth = normalizedCoords.z;
	float bias=0.005f;
	float shadow = currentDepth - bias > closestDepth ? 1.0f : 0.0f;
	if(normalizedCoords.z > 1.0f){
		return 0.0f;
	}

	return shadow;
	
}
float computeFog(){
	float fragmentDistance = length(fPosition);
	float fogFactor = exp(-pow(fragmentDistance * fogDensity, 2));
	return clamp(fogFactor, 0.0f, 1.0f);
	
}
void main() 
{

	float fogFactor = computeFog();
	computeLightComponents();

	vec3 baseColor = vec3(0.9f, 0.35f, 0.0f);//orange
	
	ambient *= texture(diffuseTexture, fTexCoords).rgb;
	diffuse *= texture(diffuseTexture, fTexCoords).rgb;
	specular *= texture(specularTexture, fTexCoords).rgb;

	ambientLamp2 *= texture(diffuseTexture, fTexCoords).rgb;
	diffLamp2 *= texture(diffuseTexture, fTexCoords).rgb;
	specLamp2 *= texture(specularTexture, fTexCoords).rgb;

	computeLamp();
	float shadow = computeShadow();
	vec3 color = min((ambient + ( 1.0f - shadow ) * diffuse) + ( 1.0f - shadow ) * specular, 1.0f);
	vec3 lampLightColor1 = min((ambientLamp2 + diffLamp2) + specLamp2, 1.0f);

	vec3 finalColor = color + lampLightColor1;
    	vec4 fogColor = vec4(0.5f, 0.5f, 0.5f, 1.0f);
	fColor = vec4(finalColor, 1.0f);
	fColor = fogColor * (1-fogFactor) + vec4(finalColor, 1.0f) * fogFactor;
}
