# 🔍 Visual Anomaly Intelligence

A full-stack deep learning application for **pixel-level anomaly detection and localization** in images using semantic segmentation.

Built with a **U-Net–based deep learning model**, deployed via **FastAPI**, and visualized through a **React + Tailwind** interactive frontend with explainability controls.

---

## ✨ Key Features

- 🧠 Deep Learning–based anomaly **segmentation**
- 🎯 Pixel-level **defect localization**
- 📊 Severity scoring with decision labels (OK / WARNING / REJECT)
- 🎚 Explainability via mask overlay & opacity control
- 🌌 Interactive starry background (space-mesh effect)
- 🔄 Reset workflow & built-in user guide
- ⚡ Real-time inference using FastAPI

---

## 🏗 Tech Stack

### Backend
- Python
- TensorFlow
- OpenCV
- FastAPI
- U-Net (Encoder–Decoder architecture)

### Frontend
- React (Vite)
- Tailwind CSS
- HTML5 Canvas (interactive background)

---

## 🧪 How It Works

1. User uploads an image
2. The backend model analyzes **normal vs anomalous patterns**
3. A segmentation mask highlights suspicious regions
4. A severity score quantifies anomaly intensity
5. Results are visualized interactively in the UI

---

## 📸 Demo Preview

### Landing Interface
![Landing](screenshots/home.png)

### Anomaly Detection & Localization
![Mask Overlay](screenshots/mask_overlay.png)

### Built-in User Guide
![User Guide](screenshots/user_guide.png)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/visual-anomaly-localization.git
cd visual-anomaly-localization
## 📚 Documentation

- [Model Architecture](docs/MODEL.md)
- [API Specification](docs/API.md)
- [Explainability](docs/EXPLAINABILITY.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
