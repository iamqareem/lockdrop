---
id: lpi-020-100-02
title: "LPIC-2 · 020-100 — Research and explain how hybrid cryptography is implemented in…",
slug: lpi-020-100-02-lpic-2-020-100-research-and-explain-how-hybrid-cryptography-
source: "LPI Learning Material — LPIC-2 (Exam 020-100)",
sourceSection: "1. Research and explain how hybrid cryptography is implemented in secure web browsing, 3. Root CA Check, 3. Explain the concept of the chain of trust in PKI. Why is the chain of trust important for, 1. Research the role of Extended Validation (EV) certificates in web security and explain how they, 2"
track: linux-engineer,
tier: free
tags: [linux, lpic-2, certification, security]
summary: "In HTTPS, hybrid cryptography is implemented by using asymmetric encryption, typically RSA, Covers 12 sections: Research and explain how hybrid cryptography is implemented in secure web browsing, Root CA Check, Explain the concept o.",
---
# LPIC-2 · 020-100 — Research and explain how hybrid cryptography is implemented in…

## 1. Research and explain how hybrid cryptography is implemented in secure web browsing
through the HTTPS protocol.
In HTTPS, hybrid cryptography is implemented by using asymmetric encryption, typically RSA,
to securely exchange a symmetric session key between the client and server. This session key is
then used to encrypt all subsequent data transmission using symmetric encryption, such as
AES. The use of asymmetric encryption ensures that the session key is exchanged securely even
over an untrusted network, while symmetric encryption provides fast and efficient data
encryption for the actual communication. This combination offers both security and
performance, making it ideal for secure web browsing.
2. Investigate the concept of quantum computing and how it poses a threat to current
cryptographic systems, especially asymmetric encryption like RSA.
Quantum computing, with its potential to perform complex calculations exponentially faster
than classical computers, poses a significant threat to current cryptographic systems,
particularly asymmetric encryption methods like RSA and ECC. In particular, RSA relies on the
difficulty of factoring large prime numbers, a problem that quantum computers could solve
efficiently using Shor’s algorithm. This would make it possible for quantum computers to break
RSA encryption, rendering it insecure.
To address these challenges, researchers are developing quantum-resistant algorithms
designed to withstand attacks from quantum computers. Quantum-resistant algorithms are
crucial to ensure that future encryption methods remain secure, even as quantum computing
advances. These algorithms will help safeguard sensitive communications, financial
transactions, and government data against the potential threat of quantum decryption
capabilities.

Lesson 2

### 022.1 Cryptography and Public Key
Infrastructure

2 of 2

Building on cryptographic principles, a Public Key Infrastructure (PKI) is fundamental for secure
communications and identity verification in the digital world. PKI establishes a framework for the
use of public and private keys in encryption, ensuring that entities involved in communication can
trust one another.
At the core of PKI are digital certificates, which link a public key to an entity, such as a person or
organization, and are managed by Certificate Authorities (CAs). These certificates play a crucial
role in encrypting data and validating identities, making PKI indispensable for secure web
browsing, email communication, and other online activities. Trusted Root Certificate Authorities
(Root CAs) form the top tier of this trust model, establishing the chain of trust that extends to enduser certificates.
This structured relationship ensures that users and systems can rely on the authenticity of the
digital certificates they encounter. Understanding how PKI and CAs function is essential for
comprehending the secure exchange of information and the role of digital certificates in
maintaining the integrity and security of online communications.

Public Key Infrastructure (PKI)
Public Key Infrastructure (PKI) is pivotal in establishing trust and securing digital communications.
At its core, PKI provides a structured framework for managing digital certificates and publicprivate key pairs, which are essential for verifying identities and securing data exchanges over
the internet. When two entities, such as a user and a website, need to communicate securely, PKI
ensures that each party can be confident of the other’s identity and the integrity of the data being
shared.
PKI allows secure communication through the management of public and private key pairs.
Entities such as websites, servers, or individuals are issued a digital certificate that links their
identity to a public key.
Digital certificates serve as an electronic “passport” for an entity — whether it’s a person, device,
or service. This certificate is issued by a trusted third party known as a Certificate Authority (CA).
Before issuing a certificate, the CA performs a thorough verification process to confirm the
legitimacy of the entity’s identity. This process prevents malicious actors from falsely claiming to
be someone else. Once the certificate is issued, it can be used to encrypt data with the entity’s
public key. Only the corresponding private key, which is securely held by the entity, can decrypt
this data, ensuring that sensitive information remains confidential and accessible only to the
intended recipient.

CAs and Trusted Root CAs
At the heart of PKI are Certificate Authorities and Trusted Root Certificate Authorities, which form
the backbone of the chain of trust that underpins the security of digital certificates used in web
browsing, secure email, and other applications.
CAs play a critical role in PKI by issuing, validating, and managing digital certificates. Once issued,
the certificate can be trusted by other users or systems that rely on the CA’s authority.
Root CAs form the top of the trust hierarchy in PKI. Root CAs issue certificates to intermediate CAs,
creating a chain of trust that extends to the end-user certificates. Root certificates are pre-installed
in operating systems and web browsers, providing the foundation for all certificates issued in the
hierarchy.
This chain of trust is essential, creating a hierarchical relationship between Root CAs,
intermediate CAs, and the entities they issue certificates to. Each certificate in the chain is
validated by the one above it, ultimately leading back to a trusted Root CA. This hierarchical
model ensures that users and systems can trust the certificates they encounter in digital

interactions.

Example of the Chain of Trust
Here is an example of a chain of trust involving a Root CA, an intermediate CA, and end-entity
certificates.

Root CA Certificate
The Root CA is the topmost authority in the chain and is trusted by all systems. It is self-signed,
meaning that it certifies its own identity.
- Root CA Name: "GlobalTrust Root CA"
- Subject: "CN=GlobalTrust Root CA, O=GlobalTrust Inc., C=US"
- Issuer: "CN=GlobalTrust Root CA, O=GlobalTrust Inc., C=US" (Self-signed)
- Public Key: Contains the public key of GlobalTrust Root CA
- Validity Period: 20 years (e.g., 2020-2040)
- Signature: Self-signed using the Root CA's private key

The Root CA certificate is pre-installed in most operating systems and browsers, establishing it as a
trusted authority.

Intermediate CA Certificate
The intermediate CA is issued a certificate by the Root CA. This CA acts as a bridge between the
Root CA and end-entities, enabling better security management and distribution of trust.
- Intermediate CA Name: "GlobalTrust Intermediate CA 1"
- Subject: "CN=GlobalTrust Intermediate CA 1, O=GlobalTrust Inc., C=US"
- Issuer: "CN=GlobalTrust Root CA, O=GlobalTrust Inc., C=US" (Signed by Root CA)
- Public Key: Contains the public key of GlobalTrust Intermediate CA 1
- Validity Period: 10 years (e.g., 2022-2032)
- Signature: Signed using the Root CA's private key

The intermediate CA issues certificates to end-entities, such as websites or applications, after
validating their identity.

End-Entity Certificate (Website or Application)
The end-entity certificate is issued to a website or application by the intermediate CA. It is what

the end-user sees when they connect to a secure website.
- End-Entity Name: "example.com"
- Subject: "CN=example.com, O=Example Inc., C=US"
- Issuer: "CN=GlobalTrust Intermediate CA 1, O=GlobalTrust Inc., C=US" (Signed by
Intermediate CA)
- Public Key: Contains the public key of example.com
- Validity Period: 1 year (e.g., 2023-2024)
- Signature: Signed using the Intermediate CA's private key

In this example, each certificate in the chain is verified by the one above it, ultimately leading
back to a trusted Root CA, which ensures the integrity and security of the digital communication
(Visual representation of the chain of trust).

Figure 2. Visual representation of the chain of trust

When a user visits the website example.com, their browser receives this certificate. The browser
then checks the validity of the certificate by following the chain of trust:
1. End-Entity Certificate Check
The browser verifies that the certificate of example.com is signed by GlobalTrust
Intermediate CA 1.
2. Intermediate CA Certificate Check
The browser checks that the certificate of GlobalTrust Intermediate CA 1 is signed by the
GlobalTrust Root CA.

## 3. Root CA Check
The browser verifies that the Root CA is a trusted authority pre-installed in its trust store.
If all certificates in the chain are valid and properly signed, the browser establishes a secure
connection with example.com, and the user can safely interact with the website.

X.509 Certificates
X.509 certificates are the standard digital certificate format used in Public Key Infrastructure (PKI)
and are essential for verifying the identity of entities in secure communications. Often referred to
as “digital passports,” these certificates establish a reliable association between an entity’s identity
and its public key through certification by a trusted Certificate Authority (CA).
Each X.509 certificate contains fields that detail the entity’s public key, the name of the issuing CA,
and specific identity information, such as the entity’s domain name or organization name. This
standardized format ensures that X.509 certificates provide a consistent and trusted method for
authenticating entities across a wide range of digital applications.
Understanding the role of X.509 certificates is essential because they are used to facilitate secure
connections in many applications, including HTTPS for secure web browsing, SSL/TLS for data
encryption, and digital signatures for verifying the authenticity and integrity of electronic
documents.
The certificate contains a digital signature generated by the CA using its private key, which binds
the public key to the entity’s identity. This digital signature can be verified by anyone using the
CA’s public key, ensuring that the certificate has not been tampered with and that it indeed
originates from the trusted CA.

Structure of X.509 Certificates
An X.509 certificate contains several fields that provide detailed information about the entity and
the certificate itself. These include the subject, which identifies the entity the certificate is issued
to, and the issuer, which identifies the CA that issued the certificate. The certificate also contains
the public key associated with the entity, as well as the digital signature of the CA, which verifies
the authenticity of the certificate.
The certificate also includes a validity period, indicating the time frame during which the
certificate is considered valid. After this period, the certificate must be renewed or replaced to
maintain secure communication. In addition to these fields, X.509 certificates can include
extensions that specify the intended use of the certificate, such as for server authentication or
email encryption.

Requesting and Issuing X.509 Certificates
The process of obtaining an X.509 certificate begins with the generation of a Certificate Signing
Request (CSR). The CSR is a file that contains the entity’s public key along with identifying
information such as the entity’s domain name, organization, and location. This information helps
to uniquely identify the entity requesting the certificate. The CSR is then submitted to a CA for
validation.
The CA plays a critical role in verifying the legitimacy of the information provided in the CSR. This
validation process may vary in rigor depending on the type of certificate being requested. For
example, a Domain Validated (DV) certificate requires the CA to verify that the entity controls the
specified domain, typically through a simple email or DNS verification process. For more stringent
certificates, like Organization Validated (OV) or Extended Validation (EV) certificates, the CA
performs additional checks, such as verifying the organization’s legal existence and physical
location.
After the CA successfully verifies the entity’s details, it issues the X.509 certificate by digitally
signing it with the CA’s private key. This digital signature ensures the authenticity and integrity of
the certificate, so that it can be trusted by any entity that recognizes the CA as a trusted authority.
The issued certificate is then sent back to the requesting entity, where it can be installed on a
server or device.
Once installed, the X.509 certificate is used to establish secure communications by enabling
SSL/TLS encryption. When a client (e.g., a web browser) connects to the server, the server presents
the certificate. The client then verifies the certificate’s authenticity by checking the CA’s signature
against its list of trusted root certificates. If the verification is successful, an encrypted
communication channel is established, ensuring that all data exchanged between the client and
server remains confidential and protected from interception.

X.509 Certificates in SSL/TLS
X.509 certificates play a central role in the SSL/TLS protocol, which is used to secure
communications between clients and servers over the internet. Here’s a step-by-step example of
generating a Certificate Signing Request (CSR) for a domain, using OpenSSL, a widely-used
cryptographic library.
When a user connects to a secure website, the server presents its X.509 certificate to the user’s
browser as part of the SSL/TLS handshake. The browser then verifies the certificate’s authenticity
by checking the chain of trust back to a trusted root CA. If the certificate is valid and trusted, the
browser proceeds with the SSL/TLS handshake, establishing an encrypted connection between the
user and the server.

X.509 certificates are also used in other applications, such as email encryption and digital
signatures, to verify the identity of the sender and ensure the integrity of the message.

Let’s Encrypt
There are dozens of CAs around the world, most of which offer paid certificate issuance services.
Well-known CAs include Let’s Encrypt, which provides free, automated SSL/TLS certificates and
promotes the widespread adoption of HTTPS.
Let’s Encrypt has transformed the process of obtaining and managing X.509 certificates by
offering free, automated SSL/TLS certificates. This initiative promotes the widespread adoption of
HTTPS, making the internet more secure by lowering the barriers to encryption.
Before Let’s Encrypt, obtaining SSL/TLS certificates was often a costly and technically complex
process. Let’s Encrypt simplifies this by automating the certificate issuance and renewal process,
allowing websites to secure their communications easily and at no cost.
Let’s Encrypt has played a significant role in increasing the adoption of HTTPS, improving security
and privacy across the web. However, it is important to note that Let’s Encrypt issues Domain
Validated (DV) certificates, which verify domain ownership but do not provide the same level of
assurance as Organization Validated (OV) or Extended Validation (EV) certificates.
Let’s Encrypt certificates are valid for only 90 days. This short validity period ensures that
certificates are regularly updated, reducing the risk of misuse in the event of compromise.
Because of the short lifetime of Let’s Encrypt certificates, automatic renewal is crucial to
maintaining security.

1. Describe how Public Key Infrastructure (PKI) establishes trust in digital communications.

2. What is the role of X.509 certificates in the SSL/TLS protocols?

## 3. Explain the concept of the chain of trust in PKI. Why is the chain of trust important for
establishing secure communications, and how does it ensure that digital certificates can be
trusted? n+

## 1. Research the role of Extended Validation (EV) certificates in web security and explain how they
differ from Domain Validated (DV) and Organization Validated (OV) certificates.

## 2. Generate a CSR for the domain www.example.com using OpenSSL. Provide the command you
would use and explain each part of the command.

This lesson explores Public Key Infrastructure (PKI), delving into the roles of Certificate
Authorities (CAs), X.509 certificates, and the chain of trust that underpins secure digital
communications. In addition, it discusses the advent of Let’s Encrypt and its impact on the
widespread adoption of HTTPS.

## 1. Describe how Public Key Infrastructure (PKI) establishes trust in digital communications.
PKI establishes trust through a chain of trust involving Certificate Authorities (CAs). CAs issue
digital certificates that link an entity’s public key to its verified identity. Root CAs, trusted by
browsers and operating systems, anchor the chain of trust, validating certificates issued by
intermediate CAs. This hierarchical structure ensures secure communications by verifying the
authenticity of digital certificates.
2. What is the role of X.509 certificates in the SSL/TLS protocols?
X.509 certificates are used in the SSL/TLS protocols to authenticate the identity of servers and
establish secure communication. During the SSL/TLS handshake, the server presents its X.509
certificate to the client, which verifies the certificate’s authenticity through the chain of trust. If
the certificate is valid, the handshake proceeds, and an encrypted connection is established.
3. Explain the concept of the chain of trust in PKI. Why is the chain of trust important for
establishing secure communications, and how does it ensure that digital certificates can be
trusted?
The chain of trust in PKI refers to the hierarchical relationship between the Root Certificate
Authority (Root CA), intermediate Certificate Authorities (CAs), and the end-entity certificates.
The Root CA, at the top of the hierarchy, is inherently trusted by operating systems and
browsers. It issues certificates to intermediate CAs, which in turn issue certificates to end
entities such as websites ane servers. This structure ensures that each certificate can be
validated by the one above it, ultimately linking back to the trusted Root CA.
The chain of trust is crucial for secure communications because it allows users and systems to
verify the authenticity of digital certificates. If the chain is broken or a certificate is
compromised, the system flags the communication as insecure, protecting users from potential

## 1. Research the role of Extended Validation (EV) certificates in web security and explain how they
differ from Domain Validated (DV) and Organization Validated (OV) certificates.
Extended Validation (EV) certificates provide the highest level of assurance among digital
certificates. Unlike Domain Validated (DV) and Organization Validated (OV) certificates, which
mainly verify domain control and basic organization details, EV certificates involve rigorous
vetting processes. Certificate Authorities (CAs) must verify the legal existence, physical location,
and operational status of the requesting entity before issuing an EV certificate. While DV
certificates are easier to obtain and sufficient for basic encryption needs, EV certificates focus
on providing additional layers of identity verification, enhancing user trust during sensitive
transactions like online banking or shopping.
2. Generate a CSR for the domain www.example.com using OpenSSL. Provide the command you
would use and explain each part of the command.
To generate a CSR for www.example.com using OpenSSL, you would use the following
command:
openssl req -new -key private.key -out example.csr

req -new initiates the creation of a new CSR.
-key private.key specifies the private key file to be used for generating the CSR. You must
have previously created this private key.
-out example.csr indicates the name of the CSR file that will be created.
After running the command, you will be prompted to enter information such as the domain
name, organization, and location, which will be included in the CSR. This file can then be
submitted to a Certificate Authority to request an X.509 certificate.

### 022.2 Web Encryption
Security Essentials version 1.0, Exam 020, Objective 022.2
- Understanding of the major differences between plain text protocols and transport
encryption
- Understanding of the concepts of HTTPS
- Understanding of important fields in X.509 certificates for the use with HTTPS
- Understanding of how X.509 certificates are associated with a specific web site
- Understanding of the validity checks web browsers perform on X.509 certificates
- Determining whether or not a website is encrypted, including common browser messages
- HTTPS, TLS, SSL
- X.509 certificate fields: subject, Validity, subjectAltName

### 022.2 Web Encryption

Web encryption plays a vital role in securing data exchanged between websites and their visitors,
ensuring privacy and protection against unauthorized access. The primary protocol used for this
purpose is Hypertext Transfer Protocol Secure (HTTPS). HTTPS not only encrypts the data but also
verifies the identity of web servers using digital certificates. This dual functionality allows visitors
to confidently interact with legitimate websites.
It is important to understand how HTTPS operates, the role of Certificate Authorities (CAs) in
server verification, and how browser warnings are used to alert visitors to potential security risks.
By mastering these concepts, individuals can ensure safe and secure web interactions.
This lesson explores the core principles behind HTTPS, focusing on server verification, encryption,
and the significance of digital certificates. It also covers common security-related browser error
messages, such as expired or untrusted certificates, providing insight into how these warnings
help protect visitors from threats such as man-in-the-middle attacks.

Major Differences Between Plain Text Protocols and Transport
Encryption
In web communications, it is crucial to distinguish between plain text protocols and transport
encryption. Plain text protocols send data in a readable format, meaning information can be easily
intercepted and viewed by malicious actors. HTTP (Hypertext Transfer Protocol) is a plain text
protocol, where all data is transmitted without any form of encryption, leaving it vulnerable to
eavesdropping and tampering.
HTTP defines how web clients (e.g., browsers) communicate with web servers. As an applicationlayer protocol, HTTP is independent of the underlying transport-layer or session-layer protocols
(HTTP as part of the internet stack). However, in its original form, HTTP transmits data as plain
text, encapsulated in transport segments (such as TCP) without encryption, making it susceptible
to interception.

Figure 3. HTTP as part of the internet stack

Transport encryption offers a solution by encoding data during transmission, converting it into an
unreadable format. Even if the data is intercepted, it cannot be decoded without the correct
decryption keys. This approach ensures the confidentiality and integrity of data, preventing
unauthorized access and modification. Transport Layer Security (TLS) is the most widely used
protocol for transport encryption, providing the foundation for the secure version of HTTP,
known as HTTPS.

TLS
As the internet evolved to handle sensitive and commercial transactions, a need arose for a
protocol to protect this data. Secure Sockets Layer (SSL), introduced in the 1990s, served this
purpose but has since been replaced by its successor, Transport Layer Security (TLS). TLS remains
the standard for securing communication between clients and servers over insecure channels.
TLS is comprised of several key elements, including encryption protocols, digital certificates for

server identity verification, and two primary TLS protocols: the TLS handshake protocol and the
TLS record protocol. These components work together to provide a secure connection between
client and server (TLS protocols as part of the internet stack.).

Figure 4. TLS protocols as part of the internet stack.

The TLS handshake protocol is responsible for the initial authentication between the client and
server, during which they exchange cryptographic keys and agree on an encryption algorithm.
The TLS handshake ensures that the connection is secure before any application data is
exchanged. Successful authentication requires the server to present a digital certificate signed by
a trusted Certificate Authority (CA), confirming its identity.
TLS also includes the TLS record protocol, which encapsulates higher-level protocols and provides
privacy and data integrity. Privacy is achieved through symmetric encryption, while data integrity
is ensured by incorporating a Message Authentication Code (MAC) to detect tampering during
transmission. This dual-layered approach guarantees that communications remain private and
secure.

Concepts behind HTTPS
HTTPS, or Hypertext Transfer Protocol Secure, is simply HTTP running over TLS (HTTPS as part of
the internet stack). The purpose of HTTPS is to safeguard data transmitted between a visitor’s
browser and a web server by encrypting it and verifying the server’s identity.

Figure 5. HTTPS as part of the internet stack

When a visitor requests access to a website using HTTPS, the server presents an X.509 digital
certificate to the browser. This certificate, issued by a trusted Certificate Authority (CA),
authenticates the server’s identity. Once verified, the browser establishes a secure connection
using symmetric encryption, often facilitated by key exchange methods such as Diffie-Hellman or
Elliptic Curve Diffie-Hellman (ECDH).
The primary advantage of HTTPS is that it provides confidentiality, integrity, and authentication
for web communications. Data transmitted via HTTPS is protected from interception or
tampering, and the server’s identity is verified to prevent visitors from unknowingly interacting
with malicious websites.
Modern browsers offer visual indicators, such as a padlock icon in the address bar, to signal that a
website is using HTTPS. However, if the certificate is expired, improperly configured, or
untrusted, browsers may display warning messages to inform visitors of potential security risks.
These warnings help prevent attacks such as man-in-the-middle interceptions by alerting visitors
when the connection may be compromised.
The shift from HTTP to HTTPS has been driven by the increasing demand for privacy and security
on the web. Most browsers and search engines now prioritize HTTPS-enabled websites, reflecting
the importance of secure communication in today’s digital landscape.
The default port for HTTPS communication is TCP 443, while HTTP uses TCP 80. The difference in
port numbers allows servers to distinguish between secure and insecure traffic. When a browser
requests a webpage via HTTPS, the initial connection involves the TLS handshake, during which
the server’s identity is authenticated and encryption keys are exchanged.
Once the TLS handshake is complete, the browser sends the first HTTP request, and all subsequent
data exchanges are encrypted, ensuring that sensitive information, such as login credentials or
payment details, remains secure throughout the session.

Many websites are configured to automatically redirect visitors from HTTP to HTTPS to enforce
secure connections. For example, if a visitor requests http://www.example.com, the server may
redirect them to https://www.example.com, ensuring that the communication is encrypted and
secure.

Important Fields in X.509 Certificates for Use with HTTPS
HTTPS server authentication relies on digital certificates, specifically X.509 certificates, to verify
the identity of the server. When a visitor enters a URL, the browser retrieves the server’s digital
certificate, which contains the public key and identity information. This certificate is signed by a
trusted Certificate Authority (CA), ensuring that the server is legitimate.
X.509 certificates, also known as SSL or TLS certificates, bind a public key to the server’s identity,
referred to as the Subject of the certificate. The CA’s digital signature confirms the validity of this
binding, which is stored in the signatureValue field of the certificate.
The X.509 standard defines the structure of digital certificates. Version 3 (X.509v3) introduced the
ability to add extensions to certificates, allowing the inclusion of additional information, such as
alternate names for the server.

How X.509 Certificates are Associated with a Specific Web Site
The Subject Alternative Name (SAN) extension enables a certificate to associate multiple identities,
such as DNS names or IP addresses, with the same server. This flexibility is crucial for servers that
operate under multiple domain names or IP addresses, as it allows one certificate to cover all
relevant identities.
The process of verifying a certificate involves checking the Subject or Subject Alternative
Name against the server’s identity. If a match is found, the certificate is considered valid.
Wildcards, such as *.example.com, can also be used to match multiple subdomains, providing
greater flexibility in certificate management.
Certificates are issued by Intermediate CAs, which are part of a chain of trust that leads back to a
trusted Root CA. The browser verifies the chain of trust by matching the Issuer field of each
certificate with the Subject of the next certificate in the chain, ultimately reaching a trusted Root
CA.
Certificates have a defined validity period, which indicates the time frame during which the
certificate is valid. If a certificate becomes compromised before its expiration, the CA can revoke it
and publish its serial number in a Certificate Revocation List (CRL). Browsers use CRLs to verify
the certificate’s status and ensure it hasn’t been revoked.

HTTPS servers are often configured to automatically redirect HTTP traffic to HTTPS. Suppose that
the web client in this situation, such as if an internet browser sends a request to the following URI,
specifying HTTP:
http://www.example.com/~carol/home.html

The HTTPS server would redirect the client to a URI specifying HTTPS, such as:
https://www.example.com/~carol/home.html

Validity Checks that Web Browsers Perform on X.509 Certificates
When a web browser connects to a website using HTTPS, it performs several essential validity
checks on the website’s X.509 certificate to ensure that the connection is secure and trustworthy.
These checks verify the authenticity of the certificate, confirm the identity of the website, and
protect visitors from potential security threats such as man-in-the-middle attacks. The browser
conducts a series of steps to evaluate the certificate’s validity.
The format of public key certificates is defined by the X.509 standard, which was first published in
1988. The X.509 version 3 (v3) certificate format, which was developed in 1996, extends the format
by adding provision for additional Extensions fields (X.509 v3 certificate).

Figure 6. X.509 v3 certificate

The public key certificate’s Subject field identifies the HTTPS server associated with the public
key stored in the Subject Public Key Info field. The Extensions field can convey such data
as additional subject identification information.
The Subject Alternative Name extension to the X. 509 specification allows additional identities to
be bound to the subject of the certificate. Subject Alternative Name options can include a DNS
hostname, an IP address, and more.
The subject name may be carried in the Subject field, in the Subject Alternative Name extension,
or in both. If a SAN extension of type DNS Name is present, it is used as the server’s identifier.
Otherwise, the most specific Common Name field in the Subject field of the certificate is used as
the identity.
If more than one identity of a specific type is present in the certificate — e.g., more than one DNS
Name field — a match in any field of the set is considered acceptable. Names can contain the *
(asterisk) wildcard character to match any single domain name component or component
fragment. Thus, if the URI is https://www.example.com/~carol/home.html and the server’s
certificate contains *.basket.com, abcd.com, and *.example.com as DNS Name options, there is
an acceptable match: The *.example.com name matches www.example.com. That wildcard name
would not match basket.carol.example.com because the latter domain name contains an extra
component.
Similarly, c*.com matches carol.com because the asterisk can match a fragment of a component,
but does not match basket.com.
If the URI’s host field includes an IP address, such as https://8.8.8.8, rather than a hostname,
the client verifies the IP Address field of the Subject Alternative Name extension. The IP
Address field must be present in the certificate and must exactly match the IP address in the URI.
Next, the browser checks the certificate’s chain of trust. It verifies that the certificate has been
issued and signed by a trusted Certificate Authority (CA). This involves tracing the certificate’s
chain from the website’s certificate through intermediate certificates up to a trusted root CA,
which is included in the browser’s pre-installed root certificate store. If any certificate in this
chain is not valid or is issued by an untrusted CA, the browser flags the connection as insecure,
warning the visitor.
Another critical check involves the certificate’s validity period. Every X.509 certificate specifies a
timeframe within which it is valid, defined by the notBefore and notAfter fields. The browser
checks the current date and time against this validity period. If the certificate has expired or is not
yet valid, the browser alerts the visitor, suggesting that the connection may not be safe. This
process ensures that certificates are renewed regularly to maintain secure communication.

Additionally, browsers perform checks to determine whether the certificate has been revoked by
the CA. This is done through methods like querying a Certificate Revocation List (CRL) or using the
Online Certificate Status Protocol (OCSP). If the certificate has been revoked due to reasons such as
a compromised key or mis-issuance, the browser warns the visitor that the certificate is no longer
trustworthy and that the connection may be insecure.
The browser also validates the certificate’s digital signature to confirm that it has not been
tampered with since it was issued. This involves verifying the cryptographic signature of the
issuing CA. If the signature fails to verify, it suggests that the certificate may have been altered or
forged, leading the browser to block the connection to ensure the visitor’s safety.
Finally, browsers review any key usage or extension fields within the certificate. These fields
specify the intended purposes of the certificate, such as server authentication or code signing. The
browser ensures that the certificate is being used in line with these defined purposes. If the
certificate is being used for a purpose outside the allowed scope, the browser issues a warning to
the visitor.
These checks collectively ensure the security of web communications by validating the
authenticity, integrity, and proper use of X.509 certificates. If any of these checks fail, the browser
displays a security warning or error message, advising the visitor to proceed with caution or to
avoid the website entirely. This rigorous validation process plays a critical role in maintaining the
trustworthiness of online interactions and helps prevent malicious entities from impersonating
legitimate websites.

Determining Whether a Website is Encrypted
Determining whether a website is encrypted is a crucial step in ensuring secure communication
between a visitor’s browser and the website’s server. Encrypted websites use HTTPS, which
provides encryption through the TLS protocol, ensuring that data exchanged between the visitor
and the site remains private and protected from eavesdropping or tampering.
To determine whether a website is encrypted, visitors can rely on a few visual cues provided by
web browsers. The most common indicator is the padlock icon that appears in the browser’s
address bar to the left of the URL. If the website is using HTTPS, the padlock will appear closed or
locked, signaling that the connection is secure. In some browsers, clicking on the padlock icon will
display more detailed information about the website’s encryption, such as the type of encryption
being used and the issuing CA.
In addition to the padlock, the URL itself is another indicator of whether a site is encrypted. Secure
websites begin with https://, while unencrypted sites use http://. The presence of https://
indicates that the connection is protected by TLS encryption. Some browsers may also highlight

this by changing the color of the address bar when a secure connection is established.
When a website does not use encryption, modern browsers often display a warning message to
inform visitors of the potential risks. For example, when a visitor tries to access a site using plain
HTTP (without encryption), the browser may show a message such as “Not Secure” in the address
bar. In some cases, browsers may display a more prominent warning, alerting the visitor that the
“connection is not private” and advising them to avoid entering sensitive information such as
passwords or credit card numbers. Browsers such as Google Chrome, Mozilla Firefox, and
Microsoft Edge have been increasingly stringent in flagging unencrypted websites, especially on
pages where visitors are asked to submit personal information.
If a website’s HTTPS configuration is invalid or incorrectly set up, browsers provide additional
warning messages. For example, if a site has an “expired,” “misconfigured,” or “untrusted”
certificate, the browser may present a full-page warning message with a description of the issue.
Messages like “Your connection is not private” or “Potential Security Risk Ahead” indicate that the
certificate is expired, revoked, or signed by an untrusted CA. These warnings usually recommend
that visitors return to safety by not proceeding to the site, though they often provide an option to
proceed at the visitor’s own risk.
Determining whether a website is encrypted involves checking for visual indicators such as the
padlock icon and https:// in the URL. Browsers also display clear warnings when a site is not
secure, ensuring that visitors are informed of potential risks associated with unencrypted or
misconfigured connections. Understanding these browser messages is essential for safe browsing
and avoiding exposure to security threats.

1. What characteristics belong to the HTTP protocol and which to the HTTPS protocol?
Characteristic

HTTP

HTTPS

Web data is encapsulated
directly by a transport layer
protocol, usually TCP.
Attackers are able to
eavesdrop on the
communication.
Encrypted data is transmitted
Port 80 is the default TCP port.
Port 443 is the default TCP
port.
Plain text data is transmitted
Web data is encapsulated by
the TLS protocol.
Web data can be modified by a
“man in the middle.”
The identity of the web server
is verified.
The protocol provides data
integrity.
2. In which of the following cases would a web server’s identity be considered valid or invalid?

https://www.example1.com *.penguin.com ,
/penguin.html
www.example.com
https://hotlinux.org

www.xyz.com , hot*.com

https://www.securityesse *.security.com ,
nt.com
security*.org
https://www.certsun.com/ ohlala.com , cert*.com
https://www.justaparadig www.carol.com ,
m.com/
www.justaparadigm.com
https://www.128.263.5.98 www.carol.com ,
/
128.263.6.98
https://251.32.75.42/

www.abc.com , 251.32.75.42

1. How does an HTTPS client verify the X.509 certificate issuer’s identity?

2. What information is contained in the following fields of a web server’s X.509v3 certificate?
Issuer
Validity
Subject
Extensions
SignatureValue
3. Describe a situation that can cause a X.509 certificate to become invalid prior to the expiration
of its validity period.

This lesson explores the importance of web encryption, focusing on how HTTPS secures
communication between visitors and websites by encrypting data and verifying server identity
using digital certificates. HTTPS, running over the Transport Layer Security (TLS) protocol, plays a
vital role in ensuring the confidentiality and integrity of web communications. The lesson
explains the differences between plain text protocols like HTTP, which expose data to
eavesdropping, and transport encryption, which secures data during transmission.
The lesson further delves into the workings of HTTPS, emphasizing the role of X.509 certificates in
authenticating web servers. It outlines the verification process where web browsers validate the
certificate’s trustworthiness, including checks for domain name matching, certificate chain of
trust, validity period, revocation status, and proper usage based on key extensions. Additionally,
visitors learn how browsers warn about potential security risks when certificates are expired,
untrusted, or misconfigured. These warnings play a significant role in protecting visitors from
man-in-the-middle attacks and other threats.

1. What characteristics belong to the HTTP protocol and which to the HTTPS protocol?
Characteristic

HTTP

Web data is encapsulated
directly by a transport layer
protocol, usually TCP.

Attackers are able to
eavesdrop on the
communication.

HTTPS

Encrypted data is transmitted

Port 80 is the default TCP port. X
Port 443 is the default TCP
port.

Plain text data is transmitted

Web data is encapsulated by
the TLS protocol.

Web data can be modified by a X
“man in the middle.”
The identity of the web server
is verified.

The protocol provides data
integrity.

2. In which of the following cases would a web server’s identity be considered valid or invalid?

https://www.example1.com *.penguin.com ,
/penguin.html
www.example.com

https://hotlinux.org

www.xyz.com , hot*.com

https://www.securityesse *.security.com ,
nt.com
security*.org

https://www.certsun.com/ ohlala.com , cert*.com

Valid

https:///www.justaparadi www.carol.com ,
gm.com/
www.justaparadigm.com

Valid

https://www.128.263.5.98 www.carol.com ,
/
128.263.6.98

https://251.32.75.42/

www.abc.com , 251.32.75.42 Valid

## 1. How does an HTTPS client verify the X.509 certificate issuer’s identity?
HTTPS clients process the fields listing the issuer distinguished name and the subject
distinguished name, to perform name chaining for certification path validation. Name chaining
is performed by matching the issuer distinguished name in one certificate with the subject
name in another certificate. Lastly, the issuer distinguished name in the root certificate must
have a match in the client’s root store.
2. What information is contained in the following fields of a web server’s X.509v3 certificate?
Issuer

CA’s common name and other info about the
CA

Validity

Dates specifying the certificate’s valid lifetime

Subject

Subject’s common name and other
information about the subject

Extensions

Subject’s DNS name, IP address, and other
extended data

SignatureValue

CA’s signature

## 3. Describe a situation that can cause a X.509 certificate to become invalid prior to the expiration
of its validity period.
A compromise or suspected compromise of the corresponding private key.

### 022.3 Email Encryption
Security Essentials version 1.0, Exam 020, Objective 022.3
- Understanding of email encryption and email signatures
- Understanding of OpenPGP
- Understanding of S/MIME
- Understanding of the role of OpenPGP key servers
- Understanding of the role of certificates for S/MIME
- Understanding of how PGP keys and S/MIME certificates are associated with an email
address
- Using Mozilla Thunderbird to send and receive encrypted email using OpenPGP and S/MIME
- GnuPGP, GPG keys, key servers
- S/MIME and S/MIME certificates

### 022.3 Email Encryption

In today’s digital landscape, email remains a critical communication tool, but it is also vulnerable
to interception and unauthorized access. To safeguard sensitive information exchanged via email,
encryption technologies such as OpenPGP and S/MIME provide confidentiality, integrity, and
authenticity. Understanding these two encryption standards is essential for anyone involved in
secure communications.
Open Pretty Good Privacy (OpenPGP) and Secure/Multipurpose Internet Mail Extensions (S/MIME)
are two widely adopted protocols for encrypting and digitally signing email messages. OpenPGP
relies on a decentralized trust model, allowing users to generate and manage their own
encryption keys, whereas S/MIME operates with a centralized trust model, using digital
certificates issued by trusted Certificate Authorities (CAs). Both standards offer encryption to
protect the content of an email message from being read by unintended recipients, as well as
digital signatures to verify the sender’s identity and ensure the message has not been tampered
with.
We will explore Mozilla Thunderbird, a cross-platform email client, that is known for supporting
and integrating both OpenPGP and S/MIME, enabling end-to-end encryption. Configuration

typically involves setting up OpenPGP and S/MIME, generating public and private key pairs,
importing X.509 certificates, and managing the secure sending and receiving of encrypted
messages.

Email Encryption and Digital Signatures
To encrypt email, systems use public key or asymmetric cryptography. In contrast to symmetric
cryptography, which relies on the same key for both encryption and decryption, public key
cryptography provides each user with a key pair consisting of a public key and a private key.
As the names imply, the public key is shared openly and is accessible by anyone wishing to engage
in encrypted email communication. The private key, however, remains confidential and is never
shared or transmitted by the user.
The encryption process functions as follows: The sender uses the recipient’s public key to encrypt
the plain text message, resulting in a ciphertext that is unreadable without the corresponding
private key. Only the recipient, who holds the private key, can decrypt the ciphertext and access
the original plain text.
Public key cryptography is employed in a variety of applications, such as secure web browsing via
HTTPS (Hypertext Transfer Protocol Secure), secure email with S/MIME or PGP, and digital
signatures, which ensure the authenticity and integrity of digital documents.
Two widely used algorithms in public key cryptography are RSA and DSA. RSA is named after its
creators (Ron Rivest, Adi Shamir, and Leonard Adleman), while DSA stands for Digital Signature
Algorithm. A more recent development is elliptic curve cryptography, which includes the Elliptic
Curve Digital Signature Algorithm (ECDSA).

OpenPGP
As you can learn from the OpenPGP website, this technology was originally derived from the PGP
software created by Phil Zimmermann. Today, OpenPGP is the most widely used email encryption
standard. To show how it works, we will be using GNU Privacy Guard (GnuPG or GPG for short), a
free OpenPGP implementation for encrypting and digitally signing your data and communication.
GPG is published under the terms of the GNU General Public License.
GPG can use both symmetric-key and asymmetric-key cryptography. Out of all the algorithms
supported, AES is perhaps the best-known for symmetric encryption, whereas RSA and ECDSA are
used by GPG most often for asymmetric encryption.
Let’s start by opening a terminal and symmetrically encrypting a file containing a message in

plain text:
$ echo "Hello world" > message_file.txt
$ gpg --symmetric message_file.txt

You will be prompted for a passphrase twice and the encrypted file message_file.txt.gpg will
be generated. If you try to read the text now, you will get some jibberish like the following:
$ cat message_file.txt.gpg
???_?#?[??Qw?h:0???V?)??z/LBzL>?ϧQ$?֫?#U.srm[?.3?O??V?p!\@!J?w?|??90?,R??

To unencrypt it, just use the --decrypt option and provide the passphrase when prompted:
$ gpg --decrypt message_file.txt.gpg
gpg: AES256.CFB encrypted data
gpg: encrypted with 1 passphrase
Hello world

You can also sign and encrypt the message in one command (as long as you have created a private
key previously):
$ gpg --sign --symmetric message_file.txt

You can go up one level and use GPG in a more sophisticated way by asymmetrically encrypting a
message for a particular recipient. For that, you will have to create a key pair. Although we will
learn how to easily generate a key pair using Mozilla Thunderbird later in the lesson, it is
interesting to note that you can also use gpg on the command line to do so:
$ gpg --full-generate-key
gpg (GnuPG) 2.2.27; Copyright (C) 2021 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
gpg: directory '/home/carol/.gnupg' created
gpg: keybox '/home/carol/.gnupg/pubring.kbx' created
Please select what kind of key you want:
(1) RSA and RSA (default)
(2) DSA and Elgamal
(3) DSA (sign only)

(4) RSA (sign only)
(14) Existing key from card
Your selection?
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072)
Requested keysize is 3072 bits
Please specify how long the key should be valid.
0 = key does not expire
<n>

= key expires in n days

<n>w = key expires in n weeks
<n>m = key expires in n months
<n>y = key expires in n years
Key is valid for? (0)
Key does not expire at all
Is this correct? (y/N) y
You need a user ID to identify your key; the software constructs the user ID
from the Real Name, Comment and Email Address in this form:
"Heinrich Heine (Der Dichter) <heinrichh@duesseldorf.de>"
Real name: Carol Doe
E-mail address: carol.doe@example.com
Comment: Generating keys is fun!
You selected this USER-ID:
"Carol Doe (Generating keys is fun!) <carol.doe@example.com>"
Change (N)ame, (C)omment, (E)-mail or (O)kay/(Q)uit? O
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilise the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: /home/carol/.gnupg/trustdb.gpg: trustdb created
gpg: key 683714AD69979321 marked as ultimately trusted
gpg: directory '/home/carol/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/home/carol/.gnupg/openpgprevocs.d/FFA136F2E1B69CAA35DE55CE683714AD69979321.rev'
public and secret key created and signed.
pub

rsa3072 2023-05-03 [SC]
FFA136F2E1B69CAA35DE55CE683714AD69979321

uid
sub

Carol Doe (Generating keys is fun!) <carol.doe@example.com>
rsa3072 2023-05-03 [E]

Done! Your key pair is now ready. Other, quicker options for creating a key pair are --quick
-generate-key and --generate-key.

Perhaps the most important gpg option is --help, because it gives you all the
options and information needed.

Asymmetric encryption entails encrypting the message using your private key together with the
recipient’s public key, so that the message can be decrypted only with the recipient’s private key.
To do this, you will need the recipient’s public key. You can have it shared with you or, more
often, search for it on public key servers. This topic takes us directly to our next section.

The Role of OpenPGP Key Servers
The primary function of OpenPGP key servers is to store public keys and make them available for
anyone who wishes to communicate securely with the key owner. When a user wants to send an
encrypted email message or verify a digital signature, they can search for the recipient’s public
key on a key server, ensuring that the encryption process can proceed without the need for
manual key exchange.
Key servers store and serve cryptographic public keys, and are used to exchange public keys. The
standard procedure is as follows (we will assume two users named Carol and John):
1. Carol creates a key pair (public and private) using GPG.
2. Carol keeps the private key.
3. Carol exports (uploads) her public key to a public key server so that John can use it.
4. John imports (dowloads) Carol’s public key into his keyring.
Now John can asymmetrically sign a message that can be decrypted only with Carol’s private key.

The public key is usually included in a cryptographic certificate file containing not
only the key but also information about its owner.

S/MIME
Supported by the vast majority of email clients (such as Apple Mail, Microsoft Outlook, and
Mozilla Thunderbird), S/MIME is a standard protocol for securing and authenticating email
messages using public key cryptography: encryption and digital signatures. Thus, S/MIME ensures
the confidentiality, integrity, and authenticity of email.
The following terms are often confused, so it is important to have a clear idea of what each means:

Confidentiality
The message must be decrypted and read only by the intended recipient. This is achieved
through encryption.
Integrity
The message must reach its destination exactly as it was written (unmodified). This is achieved
through digital signatures.
Authenticity
The identities of sender and recipient must be verified. This is achieved by digitally signing and
verifying email messages using the sender’s private key and the recipient’s public key,
respectively.
S/MIME provides end-to-end security for email communication. The sender encrypts the email
message using the recipient’s public key so that it can be decrypted only using the recipient’s
private key. This is extremely important, as it guarantees that the message can be read only by the
intended recipient and is not altered in transit by unauthorized parties.
Additionally, S/MIME provides digital signatures, which allow senders to digitally sign their
messages using their private keys and recipients to verify that the message came from the alleged
sender. This is done in the following way: The sender creates a digital signature by encrypting a
hash of the message using their private key. The recipient can then verify the signature by
decrypting the hash with the sender’s public key and comparing it with the hash they have
computed themselves.

A hash function takes in some input data or message and applies a set of
algorithms to it in order to generate a unique fixed-length output: a sequence of
characters or bits known as a message digest, a hash code, or simply a hash. This
resulting hash is then typically used to validate the integrity of the input data. One
of the advantages of hashing is that it allows data to be compared quickly and
efficiently without having to compare the entire contents of the data.

The Role of Certificates for S/MIME
To use S/MIME, both the sender and the recipient must have an S/MIME-capable email client and a
digital certificate issued by a trusted Certificate Authority. Apart from the owner’s public key, the
certificate contains other important identifying information and is used to prove the owner’s
identity as well as the authenticity of the public key.
Some CAs provide free S/MIME digital certificates for a period of one year. You can also generate
your own self-signed certificate with OpenSSL.

How PGP Keys and S/MIME Certificates are Associated with an
Email Address
As already mentioned, both PGP and S/MIME are used for email encryption and digital signatures.
However, they differ in the way that they associate keys or certificates with an email address.
PGP requires the user to generate a pair of PGP keys and associate the public key with their email
address in the email client. This is normally done by sharing the public key on a key server. Other
users can then search for the public key associated with the user’s email address on the key server
and use it to send encrypted messages to the user.
On the other hand, S/MIME uses certificates to associate the public key with an email address. The
digital certificate is issued by a trusted CA, which verifies the identity of the user and the
authenticity of the public key. The user must have the digital certificate installed in their email
client. The certificate contains the user’s public key as well as other identifying information,
including the email address. Other users can then verify the user’s digital signature and encrypt
messages to the user using the public key associated with their email address.

Using Mozilla Thunderbird to Send and Receive Encrypted Email
Mozilla Thunderbird is a multiplatform, free and open source email client that performs end-toend email encryption and integrates both OpenPGP and S/MIME as well as built-in key
management functionality. The following subsections demonstrate how to configure Thunderbird
to asymmetrically encrypt and decrypt email.
The directions assume that Thunderbird is installed on your system and that an email account is
already set up.

Configuring OpenPGP and Generating a Key Pair
Once your account is created, go to your “Inbox” tab and click the gear wheel icon (“Settings”) in
the bottom left corner. Then, from the “Settings” tab, click “Account Settings” and finally “End-ToEnd Encryption.” You will find the screen shown in End-To-End Encryption screen.

Figure 7. End-To-End Encryption screen

Currently, no keys are available for your account (or S/MIME personal certificates, for that
matter), so you should click the “Add key…” button. Now you can choose between importing an
existing OpenPGP key for your email address or creating a new OpenPGP key from scratch. We
will go for the second option (Creating a new PGP key pair).

Figure 8. Creating a new PGP key pair

Next you must do some configuration, such as selecting the expiration time of your key, the key
type, and the key size (Configuring your key pair).

Figure 9. Configuring your key pair

Finally, you are told about the time necessary for key generation and asked to confirm the
operation (Confirming the creation of the key pair).

Figure 10. Confirming the creation of the key pair

The key pair should now be successfully created (Key pair successfully generated).

Figure 11. Key pair successfully generated

Now you can click “OpenPGP Key Manager” to configure a number of things, such as a keyserver
to use to search for public keys of your potential recipients (Key manager interface).

Figure 12. Key manager interface

Configuring S/MIME and Importing a Certificate
Now we’ll turn to S/MIME. We start by obtaining and importing a valid X.509 certificate to digitally
sign and encrypt mail with S/MIME. To keep the process simple, you can get a free certificate from
a trusted CA. (Generating your own self-signed certificate lies outside the scope of this lesson.)
Once you do that, click “Manage S/MIME Certificates”, search for your certificate on your local
drive, and import it. If you are asked for a password, provide it as shown in Providing a password
when importing a certificate.

Figure 13. Providing a password when importing a certificate

Then select your certificate (Selecting an S/MIME certificate).

Figure 14. Selecting an S/MIME certificate

Next you will be asked for a second certificate that will be used by other people when sending
your encrypted messages. You can choose the same certificate (Selecting a second certificate).

Figure 15. Selecting a second certificate

Finally, you can verify that your certificate is selected for both digital signing and encryption
(Certificates are ready for use).

Figure 16. Certificates are ready for use

Now that you have configured both OpenPGP and S/MIME, you can go to the bottom of the page
and choose your preferred encryption technology: OpenPGP, S/MIME, or automatic selection
based on available keys or certificates (Preferred encryption technology).

Figure 17. Preferred encryption technology

Sending and Receiving Encrypted Email With OpenPGP
If you try to send a message to someone whose public key you have, Thunderbird lets you know
that email encryption is available, and you can proceed to use it. Encryption is possible when you
possess the recipient’s public key shows the message that appears at the bottom of the email
message. The interface is quite user-friendly.

Figure 18. Encryption is possible when you possess the recipient’s public key

So if you send a message to yourself with the subject “Testing email encryption” and the body “Hi!
Bye!”, you will be able to open and read it. On the right side of the screen, click the “OpenPGP”
button to get information about the key (Sending and receiving email encrypted by PGP).

Figure 19. Sending and receiving email encrypted by PGP

On the other hand, if you try to send a message to a recipient whose public key you do not have in
your keyring, you will receive a message alerting you that encryption is not possible (Encryption
is not possible unless you have a usable key for the recipient).

Figure 20. Encryption is not possible unless you have a usable key for the recipient

You can import public keys from files or search for them on the keyserver.

Sending and Receiving Encrypted Email With S/MIME
Similarly to what we have seen in the previous section, Thunderbird allows you to send encrypted
email to someone whose certificate you have (Encryption is possible if you have a recipient’s valid
certificate).

Figure 21. Encryption is possible if you have a recipient’s valid certificate

You can send a message to yourself with the subject “Retesting email encryption” and the same
body as before. Again, you will be able to open it, read it and see the S/MIME security information
by clicking on the “S/MIME” button on the right (Sending and receiving email encrypted by
S/MIME).

Figure 22. Sending and receiving email encrypted by S/MIME

If you try to send a message to a recipient whose certificate you do not have, an alert message will
inform you accordingly (End-to-end encryption requires resolving key issues for the recipient).

Figure 23. End-to-end encryption requires resolving key issues for the recipient

1. Public key cryptography is based on a key pair consisting of a public key and a private key.
Indicate to which type of key the following statements correspond:

Public key or private key?

Available to anyone who wants to send
encrypted email
Must not be shared with anyone
Applied to a message in plain text to obtain a
ciphertext
Used to decrypt email
Can be imported into your keyring
2. Indicate to which of the following concepts the following statements correspond: symmetric
cryptography, ciphertext, certificate authority, digital signature, Mozilla Thunderbird, ECDSA,
confidentiality, key pair, GPG, S/MIME.

A public key and its corresponding private key
The same key is used for both encryption and
decryption
A trusted third-party that issues, revokes, and
manages digital certificates
Used to verify the authenticity and integrity of
a digital document
A free implementation of OpenPGP
A cryptographic algorithm for generating and
verifying digital signatures
A message that has been turned unintelligible
A security protocol that guarantees end-to-end
encryption
Guarantees that a message is read only by the
intended recipient

A free and open source multiplatform email
client that supports end-to-end encryption

## 1. Apart from the three use cases named in the last exercise of the previous section, name two
data exchange protocols that use asymmetric cryptography. Explain briefly how they work.

2. What protocols can ensure secure email exchange?

## 3. What protocols can ensure secure web browsing?

This lesson delves into the critical importance of email encryption in today’s digital world,
focusing on two widely-used protocols: OpenPGP and S/MIME. These encryption standards ensure
the confidentiality, integrity, and authenticity of email communications, providing protection
against unauthorized access. OpenPGP operates on a decentralized trust model where users
manage their own encryption keys, while S/MIME utilizes a centralized trust model backed by
digital certificates issued by trusted Certificate Authorities (CAs). Both protocols enable encryption
to prevent unauthorized recipients from reading email content and offer digital signatures to
verify the sender’s identity.
The lesson also discusses the practical configuration of Mozilla Thunderbird, a popular email
client that supports both OpenPGP and S/MIME for end-to-end encryption.

1. Public key cryptography is based on a key pair consisting of a public key and a private key.
Indicate to which type of key the following statements correspond:

Public key or private key?

Available to anyone who wants to send
encrypted email

public key

Must not be shared with anyone

private key

Applied to a message in plain text to obtain a
ciphertext

public key

Used to decrypt email

private key

Can be imported into your keyring

public key

Indicate to which of the following concepts the following statements correspond: symmetric
cryptography, ciphertext, certificate authority, digital signature, Mozilla Thunderbird, ECDSA,
confidentiality, key pair, GPG, S/MIME.
+

A public key and its corresponding private key

key pair

The same key is used for both encryption and
decryption

symmetric cryptography

A trusted third-party that issues, revokes, and
manages digital certificates

certificate authority

Used to verify the authenticity and integrity of a digital signature
digital document
A free implementation of OpenPGP

GPG

A cryptographic algorithm for generating and
verifying digital signatures

ECDSA

A message that has been turned unintelligible

ciphertext

A security protocol that guarantees end-to-end
encryption

S/MIME

Guarantees that a message is read only by the
intended recipient

confidentiality

A free and open-source multiplatform email
client that supports end-to-end encryption

Mozilla Thunderbird

## 1. Apart from the three use cases named in the last exercise of the previous section, name two
data exchange protocols that use asymmetric cryptography. Explain briefly how they work.
Secure File Transfer Protocol (SFTP) and Secure Shell (SSH) secure file transfers between a
client and a server.
A Virtual Private Network (VPN) provides secure and authenticated communication between
remote devices over an insecure network such as the internet.
2. What protocols can ensure secure email exchange?
PGP, S/MIME.
3. What protocols can ensure secure web browsing?
SSL, TLS.

### 022.4 Data Storage Encryption
Security Essentials version 1.0, Exam 020, Objective 022.4
- Understanding of the concepts of data, file, and storage device encryption
- Using VeraCrypt to store data in an encrypted container or an encrypted storage devices
- Understanding the core features of BitLocker
- Using Cryptomator to encrypt files stored in file storage cloud services
- VeraCrypt
- BitLocker
- Cryptomator

### 022.4 Data Storage Encryption

In the realm of cybersecurity, protecting data at rest is as important as securing data in transit.
File encryption and storage device encryption are key practices used to ensure that sensitive
information remains secure, whether stored on local devices or in the cloud. These encryption
methods transform data into unreadable formats, so that the protected data is accessible only by
those who hold the correct decryption keys. This process not only protects data from
unauthorized access in case of theft or loss but also ensures compliance with privacy and security
regulations.
This lesson explores the fundamental concepts of file and storage device encryption, detailing how
data can be securely stored on local devices and in the cloud. It also covers practical methods for
encrypting files and full storage devices, offering a comprehensive understanding of the tools and
techniques necessary to safeguard sensitive information in today’s increasingly interconnected
digital environment.

Data, File, and Storage Device Encryption
Sensitive information, whether it is personal, financial, or business-related, must be protected

against unauthorized access. Data encryption is one of the most reliable methods to ensure this
security, as it converts data into a coded format that can be decrypted only by authorized users
who possess the correct decryption key.
Data encryption involves transforming readable data (plaintext) into an unreadable format
(ciphertext). This ensures that even if data is intercepted or accessed by malicious actors, they
cannot decipher its contents without the decryption key. Encryption can be applied at different
levels, including individual files, entire storage devices, and even cloud storage services.
File encryption specifically refers to encrypting individual files, making them secure even if
transferred between devices or sent over unsecured networks. Tools and software designed for
file encryption ensure that files can be accessed only by individuals who have the correct
encryption key or password. This method is particularly useful for securing sensitive documents
or confidential information that may need to be shared or backed up on external drives or cloud
storage services.
Storage device encryption, on the other hand, involves encrypting entire storage media, such as
hard drives, SSDs, USB flash drives, and external storage devices. In this form of encryption, all
data on the storage device is automatically encrypted as it is written to the drive, and decrypted
when it is read. This method ensures that if the physical device is lost or stolen, the data it
contains remains secure. Storage device encryption is commonly used in laptops, desktops, and
mobile devices to protect against unauthorized access in case of theft or hacking attempts.
Full disk encryption (FDE) is a subset of storage device encryption that encrypts the entire contents
of a storage device, including the operating system. This ensures that all data on the device is
protected without the need for user intervention to encrypt individual files. FDE is commonly
used in corporate environments where the risk of data breaches from lost or stolen laptops is
high. By requiring authentication before the operating system can boot, FDE provides a
comprehensive layer of security.
One of the critical aspects of both file and storage device encryption is the use of strong
encryption algorithms such as Advanced Encryption Standard (AES) to ensure that encrypted data
cannot be easily cracked by attackers. These encryption methods provide high levels of security,
but they are effective only if the encryption keys or passwords are properly managed. Poor key
management practices, such as weak passwords or failure to back up encryption keys, can
undermine the effectiveness of encryption and lead to data loss.
As data storage increasingly moves to the cloud, cloud storage encryption has become an essential
part of data security. Cloud storage providers often offer built-in encryption to protect users' data
during transmission (encryption in transit) and while stored on cloud servers (encryption at rest).
However, some users prefer to encrypt their files themselves before uploading them to the cloud,

ensuring that only they have access to the encryption keys.
Understanding how and when to apply file and storage device encryption is critical for
maintaining data security in both personal and professional settings. Properly implementing
encryption ensures that sensitive data remains confidential, protected from unauthorized access,
and compliant with privacy regulations.
We will explore the practical application of encryption tools such as VeraCrypt, BitLocker, and
Cryptomator. These tools provide robust solutions for file, storage device, and cloud encryption,
each offering unique features tailored to specific encryption needs.

Using VeraCrypt to Store Data in an Encrypted Container or an
Encrypted Storage Device
VeraCrypt is cross-platform, supporting Windows, macOS, and Linux, which makes it a versatile
solution for individuals and organizations that operate in multiple environments. Data encrypted
on one operating system can be accessed and decrypted on another, provided the correct
decryption credentials are available. This flexibility is essential for maintaining secure data
storage across different platforms and devices.
At the core of VeraCrypt’s functionality is the creation of encrypted containers. An encrypted
container acts like a virtual disk, where data can be stored securely. This container appears as a
single file on the system, but once mounted in VeraCrypt, it behaves like a regular storage volume
where files can be added, edited, and deleted. The key advantage of this method is that the entire
contents of the container are encrypted, making it impossible for unauthorized users to access the
data without the correct decryption key or password.
Before any containers are present, the main VeraCrypt screen looks like Main VeraCrypt screen.

Figure 24. Main VeraCrypt screen

To create an encrypted container in VeraCrypt, begin by selecting a file or partition that will act as
the container (A volume file selected in VeraCrypt).

Figure 25. A volume file selected in VeraCrypt

You are prompted to choose the encryption algorithm. AES is the most commonly recommended
algorithm, thanks to its high level of security (Selecting AES as the VeraCrypt encryption
algorithm).

Figure 26. Selecting AES as the VeraCrypt encryption algorithm

Then specify the size of the volume (VeraCrypt volume size).

Figure 27. VeraCrypt volume size

The last step is to create a strong password (Defining a password in VeraCrypt).

Figure 28. Defining a password in VeraCrypt

Now the container is mounted in VeraCrypt and ready to use (Encrypted volume mounted in
VeraCrypt). It functions like any other storage drive, but all data stored within the container is
automatically encrypted in real-time.

Figure 29. Encrypted volume mounted in VeraCrypt

VeraCrypt also supports full-disk encryption, allowing users to encrypt entire storage devices,
such as external drives, USB flash drives, or even internal hard drives. This ensures that all data
on the device is encrypted, including system files and the operating system itself, if desired. Fulldisk encryption is especially useful for protecting sensitive information in case of theft or loss of
the physical device. When using full-disk encryption, users must enter a password or use a keyfile
at boot time to decrypt the drive and access its contents.
To encrypt a storage device with VeraCrypt, the user selects the drive or partition to encrypt and
chooses an encryption algorithm. Similar to encrypted containers, a strong password or keyfile is
created to ensure the security of the data. Once the encryption process is complete, the entire
device becomes inaccessible without the correct decryption credentials. This method provides a
comprehensive layer of protection for portable drives that might contain sensitive information.

Using Cryptomator to Encrypt Files Stored in File Storage Cloud
Services
Cryptomator is a powerful tool designed specifically to encrypt files before they are uploaded to
cloud storage services. Its simplicity and ease of use make it an ideal solution for protecting
sensitive data in platforms such as Google Drive, Dropbox, and OneDrive. Cryptomator creates an
encrypted “vault” on your local system, where files can be stored securely before being
synchronized with the cloud. The vault ensures that the data is encrypted on your device before it
is uploaded, making it unreadable to unauthorized users even if the cloud storage service is
compromised.
Cryptomator is available on multiple platforms, including Windows, macOS, Linux, and mobile
devices such as iOS and Android. Once installed, you can create an encrypted vault where your
files will be stored. This vault is located in a folder that is synchronized with your chosen cloud
storage service, ensuring that encrypted files are automatically uploaded as part of the normal
sync process.
After installation, launch Cryptomator and create a new encrypted vault by click the “Add” button
(<<022.4.fig7>).

Figure 30. Main Cryptomator screen

After that, select “Create New Vault” and choose a name and storage location for your vault
(Selecting a vault location in Cryptomator). This vault can be placed in a folder that is

synchronized with your cloud storage service (e.g., a folder in your Google Drive or Dropbox
directory).

Figure 31. Selecting a vault location in Cryptomator

Now you need to set a strong password for the vault (Defining a password in Cryptomator). This
password will be required to access the encrypted files.

Figure 32. Defining a password in Cryptomator

Once the vault is created, Cryptomator will prompt you to unlock and mount the vault. When the
vault is unlocked, a virtual drive is created on your system. This virtual drive behaves like a
normal folder, allowing you to move files into and out of it (Cryptomator — unlock and mount the
vault).

Figure 33. Cryptomator — unlock and mount the vault

After mounting the vault, you can begin adding files. Simply drag and drop or copy files into the
vault. As you add files, Cryptomator automatically encrypts them, ensuring that the data stored in
the vault is secure.
These files will appear encrypted within the synchronized cloud storage folder (e.g., Google Drive,
Dropbox, or OneDrive). However, when viewed from the virtual drive, they will appear as their
original, unencrypted versions.
Because the vault is stored in a folder that is synchronized with a cloud storage service, all
encrypted files will be automatically uploaded to the cloud. These files will appear in the cloud
storage as encrypted blobs, making it impossible for unauthorized users to read their contents.
After you are done working with your files, you can lock the vault, which unmounts the virtual
drive and ensures that the encrypted files remain secure. The next time you need to access the
vault, you simply unlock it by entering your password, and the virtual drive will be remounted
with the decrypted files accessible.
Cryptomator offers seamless synchronization with cloud storage services, ensuring that your
encrypted files are securely stored without requiring any additional steps. For example, when you
add or modify a file in the vault, it is immediately encrypted and synched with your cloud service.
This ensures that sensitive data is protected at all times, even during synchronization.
The encryption process used by Cryptomator is robust and designed to ensure both confidentiality

and integrity. Files stored in the vault are encrypted using the AES-256 algorithm, and each file is
individually encrypted, allowing for efficient synchronization and ensuring that only modified
files are re-uploaded to the cloud.
In addition to its encryption features, Cryptomator provides visual cues to help you manage your
vault. The vault appears as a virtual drive on your system, where encrypted files can be easily
accessed, and the locking and unlocking process is simple and intuitive. Furthermore,
Cryptomator is open source, meaning that its code is publicly available for review, adding an
extra layer of transparency and trust in the security of the tool.

Core Features of BitLocker
BitLocker is a full-disk encryption feature built into certain editions of Microsoft Windows,
designed to protect data by encrypting entire volumes on a computer’s hard drive. By employing
strong encryption algorithms, BitLocker ensures that data stored on the device is secure from
unauthorized access, even if the physical storage device is stolen or lost. BitLocker is particularly
useful in environments where the security of data stored on portable devices, such as laptops or
external drives, is critical.
The primary function of BitLocker is to provide full-disk encryption (FDE). BitLocker uses the AES
algorithm with either 128-bit or 256-bit key lengths, offering robust protection against attempts to
bypass security. BitLocker also supports encryption for external drives and removable storage
devices through its BitLocker To Go feature.
One of the key features of BitLocker is its integration with the system’s Trusted Platform Module
(TPM), a hardware-based security component built into many modern computers. The TPM
provides an additional layer of protection by storing encryption keys in a secure environment that
is isolated from the main operating system.
BitLocker offers pre-boot authentication, a feature that enhances security by requiring the user to
enter a PIN or use a USB key with a startup key before the system boots.
As a native feature of Windows, BitLocker is tightly integrated with the operating system,
providing seamless updates and compatibility with other security features such as Windows
Defender and Secure Boot. This integration ensures that BitLocker works smoothly in protecting
data while maintaining overall system stability and usability.

1. Explain the main difference between file encryption and full-disk encryption (FDE).

2. What is the role of a Trusted Platform Module (TPM) in BitLocker encryption?

3. How does Cryptomator ensure that files stored in cloud services remain secure?
