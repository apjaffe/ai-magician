#!/usr/bin/env python3
import os
sentence = "Get ready to see some {num} magic performed by a {suit} magician."
words_number = [
    "amazing",
    "breathtaking",
    "captivating",
    "dramatic",
    "exciting",
    "fabulous",
    "great",
    "high-quality",
    "incredible",
    "jawdropping",
    "knife-sharp",
    "next level",
    "magnificent",
]
words_suit = [
    "superior",
    "compelling",
    "hifalutin",
    "deft"
]
suits = ["spades","clubs","hearts","diamonds"];

def tts(text, filename):
    os.system(f"tts --text '{text}' --out_path 'audio/{filename}.wav'")

for num in range(13):
    for suit in range(4):
        tts(sentence.format(num=words_number[num], suit=words_suit[suit]), f"card_{num+1}_{suits[suit]}")





