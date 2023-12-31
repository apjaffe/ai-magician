import requests
import pyaudio
import wave
import time
from pydub import AudioSegment
from pydub.playback import play
 
def playsound(filename):
    print(f"playing {filename}")
    if filename.endswith(".wav"):
        song = AudioSegment.from_wav(filename)
    else:
        song = AudioSegment.from_mp3(filename)
    play(song)
    print('done')

#url = "http://35.229.19.246:9000"
url = "https://msgr.tellbudgetbot.com:9000"

def val_get():
    return requests.get(url + "/get").text

def val_set(val):
    requests.get(url + "/set_secret_value/"+val)

"""
def playsound(filename):
    print(f'play {filename}')
    # Set chunk size of 1024 samples per data frame
    chunk = 1024  

    # Open the sound file 
    wf = wave.open(filename, 'rb')

    # Create an interface to PortAudio
    p = pyaudio.PyAudio()

    # Open a .Stream object to write the WAV file to
    # 'output = True' indicates that the sound will be played rather than recorded
    stream = p.open(format = p.get_format_from_width(wf.getsampwidth()),
                    channels = wf.getnchannels(),
                    rate = wf.getframerate(),
                    output = True)

    # Read data in chunks
    data = wf.readframes(chunk)

    # Play the sound by writing the audio data to the stream
    while data != '':
        stream.write(data)
        data = wf.readframes(chunk)

    # Close and terminate the stream
    stream.close()
    p.terminate()
    print('done playing')
"""
 
#requests.get("
print('previous value:' + val_get())
val_set("null")

while val_get() != "null":
    time.sleep(1)

playsound('audio/mysterious-celesta-114064.wav')
playsound('audio/intro.wav')
while val_get() != "participant":
    time.sleep(1)

print("found participant")
time.sleep(4)

playsound('audio/pick_card.wav')
while True:
    card = val_get()
    time.sleep(1)
    if card not in ("null", "participant"):
        time.sleep(4)
        break
print(card)
suit, number = card.split("_")
card_audio = f"audio/card_{number}_{suit}.wav"
playsound('audio/excellent.wav')
playsound(card_audio)
playsound('audio/mind_read.wav')
playsound('audio/stall.wav')
playsound('audio/assistant.wav')
playsound('audio/let-the-mystery-unfold-122118.wav')