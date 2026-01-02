![Quantum Computing](/screenshots/quantum.jpeg)

# Post-Quantum-Cryptography (PQC)

Recently I became slightly obsessed with post quantum cryptography. I see it as an IT apocalypse - an impending doom of sorts, but none of my peers seem interested. Quantum computers represent data using Qubits. A qubit is a combination of 0 and 1 simultaneously. This ability to exist in both states allows quantum computers to perform large calculations. This notion is powerful as it moves data representation beyond the classical binary world and into another realm, the quantum realm I guess. One of the main problems with current quantum computing methods is that data in this superposition state is unstable. This instability means 'errors'.

# Decoherence
 This is the loss of the "quantum-ness" of a qubit. Qubits are incredibly fragile. The slightest disturbance from their environment—a tiny change in temperature, a stray magnetic field, or even vibrations—can cause them to collapse out of their superposition into a classical 0 or 1. This collapse is the source of quantum errors.

# Error Prevention 
These are the methods used to isolate the qubits from the environment to reduce decoherence. Ion-cooling is one example of this. Keeping trapped ions in an ultra-high vacuum and cooling them with lasers to near absolute zero creates an extremely stable and quiet environment, making errors less likely to happen in the first place.

# Error Correction
This is the active process of fixing the errors that still occur despite prevention efforts. Quantum error correction is very complex because you can't just copy a qubit to check for errors (measuring it would destroy the superposition). Instead, it involves using multiple physical qubits to encode a single, more robust "logical qubit," allowing errors to be detected and fixed without disturbing the underlying data.

In 2024 google performed a quantum experiment with their 'Willow' chip, where they were able to perform a calculation that  would take classical computers a lot longer to perform, in just a matter of minutes. This was a major milestone.

`Willow performed a standard benchmark computation in under five minutes that would take one of today’s fastest supercomputers 10 septillion (that is, 1025) years — a number that vastly exceeds the age of the Universe.`

So things are moving fast. The reality is that neither you nor me would have any real world use of a quantum computer. 
Current computing offers us enough speed to perform most real world tasks. So who cares about quantum computers, right? True, the fields of mathematics and science mostly stand to benefit from quantum computing. 

Personally the interest in quantum computing is not about the quantum computers themselves, but how they will challenge current security protocols. Having vastly superior computing power gives rogue actors the ability to break current security standards, opening up the whole internet to attack. Quantum computers will break standard 2048-bit RSA public key, the backbone of modern internet security, in a matter of hours. In stark contrast, the most powerful classical supercomputers would require an estimated 300 trillion years to accomplish the same feat, rendering today's encryption obsolete in a post-quantum world.

Public key cryptography uses RSA to encrypt data. All modern RSA cryptography is based on factorization of prime numbers. Shor's algorithm is a quantum algorithm that can factorize large numbers in polynomial time, rendering RSA vulnerable to quantum attacks. [Read more here](https://www.classiq.io/insights/shors-algorithm-explained)

## Who are the NIST?

In 2024 the NIST ( National Institute of Standards and Technology ) selected 7 post-quantum algorithms to be standardized.

"NIST develops cybersecurity standards, guidelines, best practices, and other resources to meet the needs of U.S. industry, federal agencies and the broader public."

An original offshoot of the US military, they are now responsible for standardization of new cryptography primitives. Of the various algorithms selected is the much anticipated CRYSTALS-KYBER. A module-lattice based algorithm that can be used for KEX or Key-Exchange. 

At the moment much of the libraries using these new algorithms are in their infancy. Open Quantum Safe (OQS) is one example repo that provides a set of tools for implementing post-quantum cryptography in an openSSL distribution. Its a good place to start experimenting if interested.



## Getting Started
So where to begin if one wishes to implement post-quantum cryptography? TLS (Transport Security Layer) came to mind. To be fair developers who are not working with infrastructure rarely need to know about TLS, yet it is fundamental to how data flows in the internet. Knowing very little about TLS myself, I saw it as one of the core areas affected by this paradigm shift and a great place to start. So I thought I would try to build an nginx webserver with CRYSTALS KYBER or ML-KEM TLS encryption and see how far I could get.

[Here](/blog/tls-nginx) is the blog post.