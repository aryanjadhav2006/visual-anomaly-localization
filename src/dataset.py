import os
import cv2
import tensorflow as tf
import numpy as np

IMG_SIZE = 256

def load_image(path):
    img = cv2.imread(path.decode())
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = img / 255.0
    return img.astype(np.float32)

def load_mask(path):
    mask = cv2.imread(path.decode(), cv2.IMREAD_GRAYSCALE)
    mask = cv2.resize(mask, (IMG_SIZE, IMG_SIZE))
    mask = mask / 255.0
    mask = np.expand_dims(mask, axis=-1)
    return mask.astype(np.float32)

def tf_load_image(img_path):
    img = tf.numpy_function(load_image, [img_path], tf.float32)
    img.set_shape([IMG_SIZE, IMG_SIZE, 3])
    return img

def tf_load_mask(mask_path):
    mask = tf.numpy_function(load_mask, [mask_path], tf.float32)
    mask.set_shape([IMG_SIZE, IMG_SIZE, 1])
    return mask

def create_dataset(image_paths, mask_paths, batch_size=4, shuffle=True):
    img_ds = tf.data.Dataset.from_tensor_slices(image_paths)
    mask_ds = tf.data.Dataset.from_tensor_slices(mask_paths)

    ds = tf.data.Dataset.zip((img_ds, mask_ds))

    ds = ds.map(
        lambda x, y: (tf_load_image(x), tf_load_mask(y)),
        num_parallel_calls=tf.data.AUTOTUNE
    )

    if shuffle:
        ds = ds.shuffle(buffer_size=100)

    ds = ds.batch(batch_size)
    ds = ds.prefetch(tf.data.AUTOTUNE)

    return ds
