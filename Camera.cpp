#include "Camera.hpp"

namespace gps {

    // Camera constructor
    Camera::Camera(glm::vec3 cameraPosition, glm::vec3 cameraTarget, glm::vec3 cameraUp) : cameraUpDirection(glm::normalize(cameraUp)) {
        this->cameraPosition = cameraPosition;
        this->cameraFrontDirection = glm::normalize(cameraTarget - cameraPosition);
        this->cameraRightDirection = glm::normalize(glm::cross(this->cameraFrontDirection, this->cameraUpDirection));
    }

    // Return the view matrix, using the glm::lookAt() function
    glm::mat4 Camera::getViewMatrix() {
        return glm::lookAt(cameraPosition, cameraPosition + cameraFrontDirection, cameraUpDirection);
    }

    // Update the camera internal parameters following a camera move event
    void Camera::move(MOVE_DIRECTION direction, float speed) {
        switch (direction) {
        case gps::MOVE_FORWARD:
            cameraPosition += speed * cameraFrontDirection;
            break;
        case gps::MOVE_BACKWARD:
            cameraPosition -= speed * cameraFrontDirection;
            break;
        case gps::MOVE_LEFT:
            cameraPosition -= speed * cameraRightDirection;
            break;
        case gps::MOVE_RIGHT:
            cameraPosition += speed * cameraRightDirection;
            break;
        }
    }

    // Update the camera internal parameters following a camera rotate event
    void Camera::rotate(float pitch, float yaw) {
        pitch = glm::clamp(pitch, -89.0f, 89.0f); // Clamping the pitch

        glm::vec3 front;
        front.x = cos(glm::radians(yaw)) * cos(glm::radians(pitch));
        front.y = sin(glm::radians(pitch));
        front.z = sin(glm::radians(yaw)) * cos(glm::radians(pitch));

        cameraFrontDirection = glm::normalize(front);
        // Recalculate the Right vector as cross product of front and world up vector
        cameraRightDirection = glm::normalize(glm::cross(cameraFrontDirection, glm::vec3(0.0f, 1.0f, 0.0f)));
        // Recalculate the Up vector
        cameraUpDirection = glm::normalize(glm::cross(cameraRightDirection, cameraFrontDirection));
    }

    void Camera::getCameraPosition() {
        printf("%f, %f, %f\n", cameraPosition.x, cameraPosition.y, cameraPosition.z);
    }

}
