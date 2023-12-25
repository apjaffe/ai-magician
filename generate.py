#!/usr/bin/env python3
import os
sentence = "Now it's time to see some {num} magic performed by a {suit} magician."
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

sentences = {
    "intro": "Welcome, welcome, and be prepare to be amazed by a world first -- an artifical intelligence magician. The first thing I need is a volunteer.",
    "pick_card": "Great, now if you could just swipe through that virtual deck and pick out a card please!",
    "excellent": "Excellent choice. Of course, don't show it to me or my assistant, Alan. Make sure the whole audience can see it please!",
    "mind_read": "First, I will read your mind. Please stand still! And focus on the card, not on your lunch.",
    "assistant": "And now, I will hand the final part off to my assistant."
}

for key, sentence in sentences.items():
    tts(sentence, key)



