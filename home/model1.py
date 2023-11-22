# import tensorflow as tf
# from tensorflow.keras import layers
#
# # Set the path to your dataset folders
# train_data_dir      = "C:/Users/MALHAR/Desktop/Python/facerecognition/img"
# validation_data_dir = "C:/Users/MALHAR/Desktop/Python/facerecognition/vali"
#
# # Set the number of classes (letters)
# num_classes = 5
#
# # Set the input image size
# image_size = (224, 224)
#
# # Set the batch size
# batch_size = 32
#
# # Data augmentation and normalization for training
# train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
#     rescale=1./255,
#     shear_range=0.2,
#     zoom_range=0.2,
#     horizontal_flip=True
# )
#
# # Data normalization for validation
# validation_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)
#
# # Load and prepare the training data
# train_generator = train_datagen.flow_from_directory(
#     train_data_dir,
#     target_size=image_size,
#     batch_size=batch_size,
#     class_mode='categorical'
# )
#
# # Load and prepare the validation data
# validation_generator = validation_datagen.flow_from_directory(
#     validation_data_dir,
#     target_size=image_size,
#     batch_size=batch_size,
#     class_mode='categorical'
# )
#
# # Build the deep learning model
# model = tf.keras.Sequential([
#     layers.Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)),
#     layers.MaxPooling2D((2, 2)),
#     layers.Conv2D(64, (3, 3), activation='relu'),
#     layers.MaxPooling2D((2, 2)),
#     layers.Conv2D(128, (3, 3), activation='relu'),
#     layers.MaxPooling2D((2, 2)),
#     layers.Flatten(),
#     layers.Dense(128, activation='relu'),
#     layers.Dense(num_classes, activation='softmax')
# ])
#
# # Compile the model
# model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
#
# # Train the model
# model.fit(
#     train_generator,
#     steps_per_epoch=train_generator.samples // batch_size,
#     epochs=10,
#     validation_data=validation_generator,
#     validation_steps=validation_generator.samples // batch_size
# )
#
# # Save the trained model
# model.save('model.h5')

import tensorflow as tf
from tensorflow.keras import layers

# Set the path to your dataset folders
train_data_dir = "D:/Desktop/Python/facerecognition/train"
test_data_dir = "D:/Desktop/Python/facerecognition/test"

# Set the number of classes (letters)
num_classes = 26

# Set the input image size
image_size = (224, 224)

# Set the batch size
batch_size = 35

# Data augmentation and normalization for training
train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

# Data normalization for testing
test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)

# Load and prepare the training data
train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical'
)

# Load and prepare the testing data
test_generator = test_datagen.flow_from_directory(
    test_data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical'
)

# Build the deep learning model
# model = tf.keras.Sequential([
#     layers.Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)),
#     layers.MaxPooling2D((2, 2)),
#     layers.Conv2D(64, (3, 3), activation='relu'),
#     layers.MaxPooling2D((2, 2)),
#     layers.Conv2D(128, (3, 3), activation='relu'),
#     layers.MaxPooling2D((2, 2)),
#     layers.Flatten(),
#     layers.Dense(128, activation='relu'),
#     layers.Dense(num_classes, activation='softmax')
# ])

model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), input_shape=(image_size[0], image_size[1], 3)),
    tf.keras.layers.Activation('relu'),
    tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
    tf.keras.layers.Conv2D(32, (3, 3)),
    tf.keras.layers.Activation('relu'),
    tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
    tf.keras.layers.Conv2D(32, (3, 3)),
    tf.keras.layers.Activation('relu'),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(num_classes),
    tf.keras.layers.Activation('softmax')
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // batch_size,
    epochs=30,
    validation_data=test_generator,
    validation_steps=test_generator.samples // batch_size
)

scores = model.evaluate(test_generator)
print("%s: %.2f%%" % ("Evaluate Test Accuracy", scores[1]*100))

# Save the trained model
model.save('model.h5')
