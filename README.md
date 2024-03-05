Nechita Florina-Elena
30434
Project Documentation
OpenGL Enhanced City Scene
1. Contents
Contents
Subject Specification

Scenario
● 3.1. Scene and Objects Description
● 3.2. Functionalities
Implementation Details
● 4.1. Functions and Special Algorithms
● 4.1.1. Possible Solutions
● 4.1.2. The Motivation of the Chosen Approach
● 4.2. Graphics Model
● 4.3. Data Structures
● 4.4. Class Hierarchy
Graphical User Interface Presentation / User Manual
Conclusions and Further Developments
References
2. Subject Specification
This project involves developing an interactive 3D city scene using OpenGL and
C++, incorporating advanced graphical features like weather effects, lighting,
shadowing, and object animations. The project showcases the integration of detailed
Blender models into an OpenGL context, offering a real-time exploration of a vibrant,
simulated cityscape.
![Captură de ecran 2024-01-19 125411](https://github.com/florina2002/Graphic-Processing-Project/assets/78110103/75fc62b7-2f01-4686-b1c3-dca16ce35f12)
![secna](https://github.com/florina2002/Graphic-Processing-Project/assets/78110103/2954e0a5-83b3-479b-bc5c-637cbb906b54)
![Captură de ecran 2024-01-19 125504](https://github.com/florina2002/Graphic-Processing-Project/assets/78110103/1519779f-d331-47ec-9d93-4b7120860bd6)


3. Scenario
3.1. Scene and Objects Description
The scene depicts a bustling city, detailed with multi-textured buildings, vehicles, and
urban infrastructure. Modeled in Blender, each object is crafted to maintain realism,
from the architectural structures to the smaller elements like street lights and
benches. Special attention is given to texturing and material properties to enhance
the scene's lifelike appearance.

3.2. Functionalities
● Dynamic Weather Effects: Includes fog, adding layers of immersion.
![Captură de ecran 2024-01-19 125554](https://github.com/florina2002/Graphic-Processing-Project/assets/78110103/db981328-e415-4556-be23-cdb804c527ca)

● Lighting.
● Object Animations: Features moving elements like cars, with smooth
translation animations to mimic real-world motion.
● Camera Animation: An initial automated camera sweep offers a
comprehensive view of the scene, followed by user-controlled navigation.
5. Implementation Details
4.1. Functions and Special Algorithms
4.1.1. Possible Solutions
● Weather Effects: Implemented using OpenGL shaders; fog effects are based
on fragment distance, and snow is simulated using a particle system.
4.1.2. The Motivation of the Chosen Approach
The chosen methods are tailored to demonstrate proficiency in OpenGL's advanced
rendering capabilities while ensuring visual realism and interactive performance.
4.2. Graphics Model
Leverages OpenGL's Phong shading model, augmented with texture and normal
mapping for detailed surfaces. The model is optimized for performance without
compromising on visual fidelity.
4.3. Data Structures
Key structures include:
● Model3D: Manages 3D models imported from Blender.
● Shader: Handles shader program compilation and linking.
● Camera: Controls the perspective and movement within the scene.
4.4. Class Hierarchy
The project adopts an object-oriented approach, with classes dedicated to different
functionalities like rendering, lighting, camera control, and animation management.
6. Graphical User Interface Presentation / User Manual
● WASD: Move the camera through the scene.
● B/N: Control the intensity of fog for atmospheric effects.
● Z/X/C: Toggle between different rendering modes, viewing solid, wireframe
objects, polygonal and smooth surfaces
![Captură de ecran 2024-01-19 130705](https://github.com/florina2002/Graphic-Processing-Project/assets/78110103/850b2e61-6c27-4c78-9f2b-a549d009dd0d)
![Captură de ecran 2024-01-19 130754](https://github.com/florina2002/Graphic-Processing-Project/assets/78110103/23a1788b-1d4d-4e51-950f-bc08cc43b08f)

7. Conclusions and Further Developments
The project successfully demonstrates complex 3D rendering techniques in a
real-time application. Future enhancements could include interactive elements like
traffic lights, pedestrian animations, and advanced weather systems like rain and
wind.
8. References
● “OpenGL 4.0 Shading Language Cookbook” by David Wolff.
● “Computer Graphics with OpenGL” by Hearn and Baker.
● Online resources and forums such as Stack Overflow and the Khronos Group
OpenGL forum.
