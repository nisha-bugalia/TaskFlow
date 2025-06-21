from flask import Flask, request, jsonify, send_file
import cv2
import numpy as np
from PIL import Image
import os
from datetime import datetime
import io  # Missing import added here

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'  # Folder to store uploaded/cropped files
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # If folder doesn't exist, create it


@app.route('/upload', methods=['POST'])
def upload_image():
    # Check if 'image' file is in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']

    # Convert image into OpenCV-compatible format
    image = Image.open(file.stream).convert('RGB')
    open_cv_image = np.array(image)
    img = open_cv_image[:, :, ::-1].copy()  # Convert RGB to BGR

    # Load OpenCV face detection model
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml')

    # Detect face(s)
    faces = face_cascade.detectMultiScale(img, scaleFactor=1.1, minNeighbors=5)

    if len(faces) == 0:
        return jsonify({'error': 'No face Detected'}), 400

    # Crop the first detected face and send it back as image/jpeg
    for (x, y, w, h) in faces:
     extra = 50

     x1 = max(x - extra, 0)
     y1 = max(y - extra * 2, 0)
     x2 = min(x + w + extra, img.shape[1])
     y2 = min(y + h + extra, img.shape[0])
 
     print("Face Coordinates:", x, y, w, h)
     print("Cropping with:", x1, y1, x2, y2)

     cropped = img[y1:y2, x1:x2]

    # Optional Resize for control
     cropped = cv2.resize(cropped, (400, 400))

     _, buffer = cv2.imencode('.jpg', cropped)
     return send_file(
         io.BytesIO(buffer.tobytes()),
         mimetype='image/jpeg'
     )

    # If something unexpected happens
    return jsonify({'error': 'Unexpected error'}), 500


if __name__ == '__main__':
    app.run(port=5050)
