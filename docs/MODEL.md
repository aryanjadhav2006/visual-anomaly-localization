# 🧠 Model Architecture

This project uses a **U-Net based encoder–decoder architecture** for
pixel-level anomaly localization.

## Why U-Net?

- Preserves spatial information via skip connections
- Effective for segmentation with limited data
- Widely used in medical & industrial inspection tasks

## Training Strategy

- Trained primarily on **normal (non-anomalous) images**
- The model learns a representation of normal patterns
- Deviations from learned patterns appear as anomaly regions

## Output

- Binary / grayscale anomaly mask
- Higher intensity pixels indicate stronger anomalies

## Severity Score

Severity is computed as a function of:
- Mask pixel intensity
- Area of anomalous regions

This allows mapping raw predictions to:
- OK
- WARNING
- REJECT
