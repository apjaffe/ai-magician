import requests
import pyaudio
import wave
import time
from pydub import AudioSegment
from pydub.playback import play
 
def playsound(filename):
    print(f"playing {filename}")
    song = AudioSegment.from_wav(filename)
    play(song)
    print('done')

url = "http://35.229.19.246:9000"

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
    
playsound('audio/intro.wav')
input("Press enter to continue.")
playsound('audio/pick_card.wav')
while True:
    card = val_get()
    print(card)
    time.sleep(2)
    if card!="null":
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
