## CRYSTALS - Cryptographic Suite for Algebraic Lattices

Imagine you and a friend, Alice, want to agree on a secret number, but you can only communicate by shouting across a crowded, noisy room.

The core mathematical idea behind Kyber is called Learning With Errors (LWE). It's like trying to solve a math problem where all the clues have been deliberately smudged a little bit. For an eavesdropper, those smudges make it impossible to figure out the secret. For you, who knows where the smudges are, it's easy.

The Setup: Clock Math ⏰
First, forget normal arithmetic. Kyber uses modular arithmetic, which is just "clock math."

Imagine a clock with 3329 hours on it (Kyber uses a specific number, 3329, as its "clock size"). If you go past 3328, you just loop back to 0. For example, on this clock, 3320 + 15 is 6 (you go forward 15 hours from 3320, which wraps around past 0).

All the math in Kyber happens on this special clock. This keeps the numbers from getting too big and is crucial for how the "errors" work.

## Visual Overview of CRYSTALS-KYBER Key Exchange

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        CRYSTALS-KYBER Key Exchange                             │
└─────────────────────────────────────────────────────────────────────────────────┘

    ALICE                    PUBLIC CHANNEL                    BOB
   ┌─────┐                  (Eve listening)                  ┌─────┐
   │  A  │                       👂 Eve                      │  B  │
   └─────┘                                                   └─────┘
      │                                                         │
   ┌──▼──┐                                                   ┌──▼──┐
   │ s,e │ ◄── Private: secret key s, noise e                │ r,e'│ ◄── Private: secret r, noise e'
   └─────┘                                                   └─────┘
      │                                                         │
   ┌──▼──┐                                                      │
   │  t  │ ◄── Public Key: t = A*s + e                        │
   └─────┘                                                      │
      │                                                         │
      ├─────────────────► t, A ─────────────────────────────────┤
      │                  (Public Info)                          │
      │                                                      ┌──▼──┐
      │                                                      │ u,v │ ◄── u = A*r + e₁
      │                                                      └─────┘     v = t*r + e₂ + message
      │                                                        │
      ├◄────────────────── u, v ◄──────────────────────────────┤
      │                 (Ciphertext)                           │
   ┌──▼──┐                                                     │
   │shared│ ◄── Decrypt: v - u*s = message                     │
   │secret│                                                 ┌──▼──┐
   └─────┘                                                  │shared│ ◄── Same secret derived
                                                            │secret│
                                                            └─────┘

Eve's Problem: Knows A, t, u, v but cannot find s or r due to LWE noise!
```

### Step 1: Alice Creates Her Keys

Alice needs to create a public key (which she can shout across the room for everyone to hear) and a private key (which she keeps secret).

The Secret (Private Key): Alice secretly thinks of a few small numbers, like s = (2, -1). This is her private key. The numbers are "small," meaning they are close to 0.

The Public Information: She also generates a grid of random numbers that everyone can know about. Let's call this grid A.
A = [[1988, 3141], [149, 219]]

Making the Public Key: Alice calculates her public key by multiplying her secret s with the public grid A and then adding a little bit of noise. This "noise" is just another set of small secret numbers, let's say e = (1, 1).

The calculation is t = A * s + e.

Without going deep into the matrix math, her calculation looks something like:
(Public Grid * Her Secret) + A Little Noise = Her Public Key

This public key '***t***' is what she shouts across the room. An eavesdropper, Eve, hears '**t**' and knows the public grid '**A**', but because of the "noise" ('**e**'), she finds it impossible to work backward to figure out Alice's secret '**s**'. It's like trying to find the exact coordinates of a friend's house when you have a GPS signal that's off by a few feet.

### Step 2: You Create the Shared Secret

Now you want to send Alice a secret message (which will become your shared secret key).

Your Own Secret: You also think of a few small, secret numbers, let's call them r = (1, -2).

Use Alice's Public Key: You use Alice's public key (t) and the public grid (A) to create two new pieces of information.

You calculate u = A * r + (some new noise).

You calculate v = t * r + (some more new noise).

The "Lockbox": The number '**u**' acts like a "lockbox" that you shout across the room.

The "Fuzzy" Secret: The number v is a "fuzzy" version of the final secret. It's close to the real secret, but not quite right because of all the noise that's been added along the way. You shout this across the room too.

Eve hears both u and v, but she can't make sense of them.

### Step 3: Alice Unlocks the Secret

Alice has heard your "lockbox" u and your "fuzzy" secret v. Now she uses her original private key s to figure out the exact secret.

Unlocking the Box: She takes your "lockbox" u and multiplies it by her secret s: u * s.

Removing the Fuzz: She then subtracts this result from the "fuzzy" secret v you sent her: v - (u * s).

Because of the special way the math works out, this calculation cancels out all the noise and errors. The small smudges effectively get wiped away, leaving her with a clean, precise number.

This final, clean number is the shared secret. You were also able to calculate this same number on your end. Now, both of you have the exact same secret number, and Eve, who was listening the whole time, is left with a pile of fuzzy, noisy numbers that are impossible for her to solve.

Why is it Secure?
The security of Kyber rests on one simple fact: it is incredibly difficult to find the original secret `s` just by knowing the public key `t` and the public grid A. The added "noise" `e` makes it a computationally impossible "Learning With Errors" problem. A normal computer would take billions of years to guess the answer, and even a quantum computer doesn't get a significant speed-up, which is why it's considered quantum-safe.

I implemented KEM (Key Encapsulation Mechanism) using CRYSTALS-KYBER in the nginx server post. [Read more](/blog/tls-nginx).