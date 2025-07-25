import os
from time import sleep

import requests


def ping_url(url, delay, max_trials) -> bool:
    trial = 1
    while trial <= max_trials:
        response = requests.get(url)
        if response.ok:
            return True
        sleep(delay)
    return False


def run():
    url = os.environ["INPUT_URL"]
    max_trials = int(os.environ.get("INPUT_MAX_TRIALS"), 10)
    delay = int(os.environ.get("INPUT_DELAY"), 5)
    ping_successful = ping_url(url, max_trials, delay)
    if not ping_successful:
        raise Exception(f"The url {url} could not be pinged successfully.")

if __name__ == "__main__":
    run()
