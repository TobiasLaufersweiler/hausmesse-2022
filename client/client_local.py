from datetime import datetime
import requests
import time
import threading

def get_temperature():
    return 23.4

def get_humidity():
    return 64.2


def read_data_and_send_to_server():
    # Setup new Timer so that 1s loop can be maintained
    threading.Timer(1, read_data_and_send_to_server).start()

    currentDateTime = datetime.now()
    print("Reading sensor values:", currentDateTime)

    # Create data object
    data = {
        "timestamp": currentDateTime,
        "temperature": get_temperature(),
        "humidity": get_humidity(),
    }

    # Send data to backend
    res = requests.post("http://localhost/api/data", data)

    # Show result or error
    try:
        print(res.json())
    except:
        print(f"Error with server response:\n{res.content}")

read_data_and_send_to_server()