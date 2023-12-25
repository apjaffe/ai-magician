#!/usr/bin/env python3
import os
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
    os.system(f'tts --text "{text}" --out_path "audio/{filename}.wav"')


sentences = {
    #"intro": "Welcome, welcome, and be prepare to be amazed by a world first. An artificial intelligence magician. The first thing I need is a volunteer.",
    #"pick_card": "Great, now if you could just swipe through that virtual deck and pick out a card please!",
    #"excellent": "Excellent choice. Of course, do not show it to me or my assistant Alan. Make sure the whole audience can see it please!",
    #"mind_read": "First, I will read your mind. Please stand still! And focus on the card, not on your lunch. Ah okay, now it's coming through better. Well done, human.",
    #"stall": "I really hope this trick works this time. Otherwise they might have to rename me to artificial stupidity instead of artificial intelligence.",
    "assistant": "Okay now that I did the hard mind reading part, I'll let me assistant finish up the easy part. Usually humans mess everything up."
}

for key, sent in sentences.items():
    tts(sent, key)

sentence = "Now it's time to see some {num} magic performed by a {suit} magician."
for num in range(13):
    for suit in range(4):
        tts(sentence.format(num=words_number[num], suit=words_suit[suit]), f"card_{num+1}_{suits[suit]}")



