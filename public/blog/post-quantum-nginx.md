# Post-Quantum-Cryptography (PQC)

Recently I became slightly obsessed with post quantum cryptography. I see it as an IT apocolypse - an impending doom of sorts, but none of my peers seem interested. Qunatum computers represent data using Qubits. A quibit is a combination of 0 and 1 simultaneously. This abililty to exist as a combination of states allows quantum computers to perform large calculations. This notion is powerful as it moves data representation beyond the classical binary world and into another realm. One of the main problems with current quantum computing methods is that data in this superposition state is unstable. This instability means 'errors'.

# Decoherence
 This is the loss of the "quantum-ness" of a qubit. Qubits are incredibly fragile. The slightest disturbance from their environment—a tiny change in temperature, a stray magnetic field, or even vibrations—can cause them to collapse out of their superposition into a classical 0 or 1. This collapse is the source of quantum errors.

# Error Prevention 
These are the methods used to isolate the qubits from the environment to reduce decoherence. Ion-cooling is one example of this. Keeping trapped ions in an ultra-high vacuum and cooling them with lasers to near absolute zero creates an extremely stable and quiet environment, making errors less likely to happen in the first place.

# Error Correction
This is the active process of fixing the errors that still occur despite prevention efforts. Quantum error correction is very complex because you can't just copy a qubit to check for errors (measuring it would destroy the superposition). Instead, it involves using multiple physical qubits to encode a single, more robust "logical qubit," allowing errors to be detected and fixed without disturbing the underlying data.

In 2024 google performed a quantum experiment with their 'Willow' chip, where they were able to perform a calculation that  would take classical computers a lot longer to perform, in just a matter of minutes. This was a major milestone.

`Willow performed a standard benchmark computation in under five minutes that would take one of today’s fastest supercomputers 10 septillion (that is, 1025) years — a number that vastly exceeds the age of the Universe.`

So things are moving fast. The reality is that neither you nor me would have any real world use out of a quantum computer. 
Current computing offers us enough speed to perform most real world tasks. So who cares about quantum computers, right? True, the fields of mathematics and science mostly stand to benefit from quantum computing. 

Personally the interest in quantum computing is not about the quantum computers themselves, but how they will challenge current security protocols. Having vastly superior computing power gives rogue actors the ablity to break current security standards, opening up the whole internet to attack. Quantum computers will break standard 2048-bit RSA public key, the backbone of modern internet security, in a matter of hours. In stark contrast, the most powerful classical supercomputers would require an estimated 300 trillion years to accomplish the same feat, rendering today's encryption obsolete in a post-quantum world.

Public key cryptography uses RSA to encrypt data. All modern RSA cryptography is based on factorization of prime numbers. Shor's algorithm is a quantum algorithm that can factorize large numbers in polynomial time, rendering RSA vulnerable to quantum attacks. [Read more here](https://www.classiq.io/insights/shors-algorithm-explained)

## Who are the NIST?

In 2024 the NIST ( National Institute of Standards and Technology ) selected 7 post-quantum algorithms to be standardized.

"NIST develops cybersecurity standards, guidelines, best practices, and other resources to meet the needs of U.S. industry, federal agencies and the broader public."

An original offshoot of the US military, they are now responsible for standardization of new cryptography primitives. Of the various algorithms selected is the much anticipated CRYSTALS-KYBER. A module-lattice based algorithm that can be used for KEX or Key-Exchange. 

At the moment much of the libraries using these new algorithms are in their infancy. Open Quantum Safe (OQS) is an example of one github repo that provides a set of tools for implementing post-quantum cryptography in an openSSL distribution.

## How does CRYSTALS-KYBER work?

Imagine you and a friend, Alice, want to agree on a secret number, but you can only communicate by shouting across a crowded, noisy room.

The core mathematical idea behind Kyber is called Learning With Errors (LWE). It's like trying to solve a math problem where all the clues have been deliberately smudged a little bit. For an eavesdropper, those smudges make it impossible to figure out the secret. For you, who knows where the smudges are, it's easy.

The Setup: Clock Math ⏰
First, forget normal arithmetic. Kyber uses modular arithmetic, which is just "clock math."

Imagine a clock with 3329 hours on it (Kyber uses a specific number, 3329, as its "clock size"). If you go past 3328, you just loop back to 0. For example, on this clock, 3320 + 15 is 6 (you go forward 15 hours from 3320, which wraps around past 0).

All the math in Kyber happens on this special clock. This keeps the numbers from getting too big and is crucial for how the "errors" work.

Step 1: Alice Creates Her Keys
Alice needs to create a public key (which she can shout across the room for everyone to hear) and a private key (which she keeps secret).

The Secret (Private Key): Alice secretly thinks of a few small numbers, like s = (2, -1). This is her private key. The numbers are "small," meaning they are close to 0.

The Public Information: She also generates a grid of random numbers that everyone can know about. Let's call this grid A.
A = [[1988, 3141], [149, 219]]

Making the Public Key: Alice calculates her public key by multiplying her secret s with the public grid A and then adding a little bit of noise. This "noise" is just another set of small secret numbers, let's say e = (1, 1).

The calculation is t = A * s + e.

Without going deep into the matrix math, her calculation looks something like:
(Public Grid * Her Secret) + A Little Noise = Her Public Key

This public key t is what she shouts across the room. An eavesdropper, Eve, hears t and knows the public grid A, but because of the "noise" (e), she finds it impossible to work backward to figure out Alice's secret s. It's like trying to find the exact coordinates of a friend's house when you have a GPS signal that's off by a few feet.

Step 2: You Create the Shared Secret
Now you want to send Alice a secret message (which will become your shared secret key).

Your Own Secret: You also think of a few small, secret numbers, let's call them r = (1, -2).

Use Alice's Public Key: You use Alice's public key (t) and the public grid (A) to create two new pieces of information.

You calculate u = A * r + (some new noise).

You calculate v = t * r + (some more new noise).

The "Lockbox": The number u acts like a "lockbox" that you shout across the room.

The "Fuzzy" Secret: The number v is a "fuzzy" version of the final secret. It's close to the real secret, but not quite right because of all the noise that's been added along the way. You shout this across the room too.

Eve hears both u and v, but she can't make sense of them.

Step 3: Alice Unlocks the Secret
Alice has heard your "lockbox" u and your "fuzzy" secret v. Now she uses her original private key s to figure out the exact secret.

Unlocking the Box: She takes your "lockbox" u and multiplies it by her secret s: u * s.

Removing the Fuzz: She then subtracts this result from the "fuzzy" secret v you sent her: v - (u * s).

Because of the special way the math works out, this calculation cancels out all the noise and errors. The small smudges effectively get wiped away, leaving her with a clean, precise number.

This final, clean number is the shared secret. You were also able to calculate this same number on your end. Now, both of you have the exact same secret number, and Eve, who was listening the whole time, is left with a pile of fuzzy, noisy numbers that are impossible for her to solve.

Why is it Secure?
The security of Kyber rests on one simple fact: it is incredibly difficult to find the original secret `s` just by knowing the public key `t` and the public grid A. The added "noise" `e` makes it a computationally impossible "Learning With Errors" problem. A normal computer would take billions of years to guess the answer, and even a quantum computer doesn't get a significant speed-up, which is why it's considered quantum-safe.


## Getting Started
So where to beging if one wishes to implement post-quantum cryptography? TLS (Transport Security Layer) came to mind. To be fair developers who are not working with infrustructure rarely need to know about TLS, yet it is fundamental to how data flows in the internet. Knowing very little about TLS myself, I saw it as one of the core areas affected by this paradigm shif and a great place to startt. So I thought I would try to build an nginx webserver with CRYSTALS KYBER or ML-KEM TLS encryption and see how far I could get.

Here is the [blog post](/blog/tls-nginx).