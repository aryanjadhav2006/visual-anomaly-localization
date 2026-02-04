import cv2
import numpy as np

def postprocess_mask(pred_mask, threshold=0.5):
    mask = (pred_mask > threshold).astype("uint8")
    mask = mask.squeeze()

    kernel = np.ones((5,5), np.uint8)
    clean = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

    return clean

def severity_score(mask):
    anomaly_pixels = np.sum(mask)
    total_pixels = mask.shape[0] * mask.shape[1]
    ratio = anomaly_pixels / total_pixels

    if ratio < 0.01:
        decision = "OK"
    elif ratio < 0.05:
        decision = "WARNING"
    else:
        decision = "REJECT"

    return ratio, decision
