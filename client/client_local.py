from datetime import datetime
import requests
import random
import time
import threading

last_temperature = 19.5
last_humidity = 30.0


def get_temperature(last_temperature: float):
    plus_or_minus = random.randint(0, 1)
    dif = random.random() / 4

    if (plus_or_minus == 0):
        last_temperature = last_temperature + dif
    if (plus_or_minus == 1):
        last_temperature = last_temperature - dif

    return round(last_temperature, 2)


def get_humidity(last_humidity: float):
    plus_or_minus = random.randint(0, 1)
    dif = random.random()

    if (plus_or_minus == 0):
        last_humidity = last_humidity + dif
    if (plus_or_minus == 1):
        last_humidity = last_humidity - dif

    return round(last_humidity, 2)


def read_data_and_send_to_server():
    # Setup new Timer so that 1s loop can be maintained
    threading.Timer(10, read_data_and_send_to_server).start()

    currentDateTime = datetime.now()
    print("Reading sensor values:", currentDateTime)

    # Create data object
    data = {
        "timestamp": currentDateTime,
        "temperature": get_temperature(last_temperature),
        "humidity": get_humidity(last_humidity),
    }

    # Send data to backend
    res = requests.post("http://nginx/api/data", data)

    # Show result or error
    try:
        print(res.json())
    except:
        print(f"Error with server response:\n{res.content}")


read_data_and_send_to_server()
