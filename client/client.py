from datetime import datetime
import dht11
import RPi.GPIO as GPIO
import requests
import time
import threading

# Initialize GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()

# Read data using pin 14
dht11Instance = dht11.DHT11(pin = 14)

def get_temperature(dht11Result):
    return dht11Result.temperature

def get_humidity(dht11Result):
    return dht11Result.humidity


def read_data_and_send_to_server():
    currentDateTime = datetime.now()
    print("Reading sensor values:", currentDateTime)

    # Read data from DHT11 sensor
    dht11Result = dht11Instance.read()

    if dht11Result.is_valid():
        # Create data object
        data = {
            "timestamp": currentDateTime,
            "temperature": get_temperature(dht11Result),
            "humidity": get_humidity(dht11Result),
        }

        # Send data to backend
        res = requests.post("http://localhost/api/data", data)

        # Show result or error
        try:
            print(res.json())
        except:
            print(f"Error with server response:\n{res.content}")
    else:
        print("Error reading sensor data")

# Setup new Timer so that 1s loop can be maintained
timer = threading.Timer(1, read_data_and_send_to_server)
timer.start()