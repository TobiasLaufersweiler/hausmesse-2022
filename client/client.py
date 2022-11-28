from datetime import datetime
# import RPi.GPIO as GPIO
import requests
import time
import threading

# GPIO.setmode(GPIO.BOARD)

def thread_function():
    currentDateTime = datetime.now()
    print("Reading sensor values:", currentDateTime)

    data = {
        "timestamp": currentDateTime,
        "humidity": 64.2,
        "temperature": 23,
    }

    res = requests.get("http://localhost/api/data", data)
    try:
        print(res.json())
    except:
        print("error parsing json")

while True:
    newThread = threading.Thread(target=thread_function)
    newThread.start()
    time.sleep(0.997)