from PIL import Image
import os

image_path = r"C:/Users/91700/.gemini/antigravity/brain/72b15131-a4ee-4eaa-8607-0bb847b2c55b/uploaded_image_1766652963824.png"
pdf_path = r"C:/Users/91700/OneDrive/Documents/PORTFOLIO/public/assets/Resume_Final_2025.pdf"

try:
    if os.path.exists(image_path):
        image = Image.open(image_path)
        if image.mode == "RGBA":
            image = image.convert("RGB")
        image.save(pdf_path, "PDF", resolution=100.0)
        print(f"Successfully converted to {pdf_path}")
    else:
        print(f"Error: Image not found at {image_path}")
except Exception as e:
    print(f"An error occurred: {e}")
