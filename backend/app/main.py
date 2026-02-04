from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
import numpy as np
import cv2
import base64

from model import load_model
from utils.preprocess import preprocess_image
from utils.postprocess import postprocess_mask, severity_score

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = load_model()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()

    img = preprocess_image(image_bytes)
    pred = model.predict(img)[0]

    mask = postprocess_mask(pred)
    score, decision = severity_score(mask)

    # Convert mask to PNG
    mask_img = (mask * 255).astype("uint8")
    from fastapi.responses import Response

    _, buffer = cv2.imencode(".png", mask_img)

    return {
    "severity_score": round(score * 100, 2),
    "decision": decision,
    "mask_png": base64.b64encode(buffer).decode("utf-8")
    }