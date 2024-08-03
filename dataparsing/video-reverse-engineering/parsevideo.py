from PIL import Image
import numpy as np
import cv2
import pytesseract
import pandas as pd

# Path to the Tesseract OCR executable
pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract'  # Update this path based on your installation

def extract_text_from_video(video_path, region, output_csv):
    # Open the video file
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error opening video file: {video_path}")
        return
    
    # Initialize the list to store the extracted text and corresponding frame times
    data = []

    # Get the frame rate of the video
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    frame_number = -1
    frame_increment = 10

    while cap.isOpened():
        frame_number += 1
        ret, frame = cap.read()
        
        if not ret:
            break
        
        # We skip a bunch of frames because we don't need that accurate of a frame rate.
        if frame_number % frame_increment != 0:
            continue

        # Extract the region of interest (ROI)
        x, y, w, h = region
        roi = frame[y:y+h, x:x+w]  # Crop the frame to the defined region

        # image = Image.fromarray(roi)
        # image.save(f"./{frame_number}.png")

        # Convert the ROI to grayscale
        gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)

        # Use Tesseract to extract text from the grayscale ROI
        text = pytesseract.image_to_string(gray, config="--psm 7 outputbase digits")
        print(text)

        # Calculate the timestamp of the current frame
        timestamp = frame_number / fps

        # Append the extracted text and timestamp to the data list
        data.append([timestamp, text.strip()])

        print(f"{frame_number=}", flush=True)

        # if frame_number > 200:
        #     break

    # Release the video capture object
    cap.release()

    # Create a DataFrame from the extracted data
    df = pd.DataFrame(data, columns=['Timestamp', 'Text'])

    # Save the DataFrame to a CSV file
    df.to_csv(output_csv, index=False)

    print(f"Text extracted and saved to {output_csv}")

# Example usage
video_path = './dataparsing/video-reverse-engineering/featherweight-video-cropped.mp4'
# Altitude:
# region = (600, 570, 500, 70)  # Define the region (x, y, width, height) based on your requirement
# Latitude
# region = (500, 330, 1400, 70)
# Longitude
region = (520, 450, 400, 70)
# Nead to do one for the altitude and one for the time, then I can merge them.
output_csv = './longitude.csv'
extract_text_from_video(video_path, region, output_csv)
