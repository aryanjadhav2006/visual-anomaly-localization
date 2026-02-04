import tensorflow as tf
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(
    BASE_DIR,
    "..",
    "..",
    "models",
    "unet_anomaly_segmentation.h5"
)

def load_model():
    model = tf.keras.models.load_model(
        MODEL_PATH,
        compile=False
    )
    return model
