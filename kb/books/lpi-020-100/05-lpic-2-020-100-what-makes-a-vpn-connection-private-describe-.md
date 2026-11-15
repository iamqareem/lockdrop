---
id: lpi-020-100-05
title: "LPIC-2 · 020-100 — What makes a VPN connection private?, Describe how Tor enhances…",
slug: lpi-020-100-05-lpic-2-020-100-what-makes-a-vpn-connection-private-describe-
source: "LPI Learning Material — LPIC-2 (Exam 020-100)",
sourceSection: "2. What makes a VPN connection private?, 1. Describe how Tor enhances user anonymity on the internet. Explain the process by which Tor, 2. What are the primary differences between Bitcoin and Monero in terms of anonymity? Discuss, 1. Describe how Tor enhances user anonymity on the internet. Explain"
track: linux-engineer,
tier: free
tags: [linux, lpic-2, certification, security]
summary: "Include details on their typical use cases, strengths, and weaknesses. Covers 19 sections: What makes a VPN connection private?, Describe how Tor enhances user anonymity on the internet. Explain the process by w.",
---
# LPIC-2 · 020-100 — What makes a VPN connection private?, Describe how Tor enhances…

## 2. What makes a VPN connection private?

1. Explain the differences between the following VPN protocols: IPsec, OpenVPN, and WireGuard.
Include details on their typical use cases, strengths, and weaknesses.

2. Imagine you are tasked with configuring a remote access VPN for a company’s employees.
What steps would you take to ensure a secure and effective setup? Include at least three
security measures you would implement.

This lesson provides an overview of Virtual Private Networks (VPNs), explaining their role in
creating secure, encrypted connections over public networks. It begins by discussing the
fundamentals of VPN technology, including tunneling and encryption protocols like IPsec,
OpenVPN, and WireGuard, and differentiates between public VPNs used for personal privacy and
organization-specific VPNs designed for secure remote access and site-to-site connectivity. The
text also addresses the limitations and risks associated with VPNs, offering guidance on selecting
reputable providers and highlighting the importance of combining VPNs with other encryption
methods to ensure comprehensive data protection.
Additionally, the lesson explores concepts of online anonymity and recognition, detailing how
identifiers such as IP addresses can compromise user privacy. It discusses various tools and
techniques, including the use of proxy servers, anonymity networks, and privacy-focused
practices, to help users achieve greater anonymity.

1. What are the key facts about the two types of site-to-site VPNs?
When a private connection exists between two remote corporate LANs, a site-to-site VPN is said
to exist. When the two remote LANs are branches of the same organization, it is an intranetbased site-to-site VPN. When the two remote LANs each belong to two different collaborating
parties, it is an extranet-based site-to-site VPN.
2. What makes a VPN connection private?
A private channel is first set up between two remote parties that wish to communicate. Any
data sent over the private channel is encapsulated and encrypted. This results in a private VPN
connection. Anyone attempting to sniff over the private channel will not be able to glean useful

1. Explain the differences between the following VPN protocols: IPsec, OpenVPN, and WireGuard.
Include details on their typical use cases, strengths, and weaknesses.
IPsec is a suite of protocols designed to secure IP communications by authenticating and
encrypting each IP packet. It operates at the network layer, making it suitable for both site-tosite and remote access VPNs. Its strengths include robust security features and compatibility
with most network devices. However, it can be complex to configure and may have
performance issues due to its heavy encryption overhead.
OpenVPN is an open-source VPN protocol that uses SSL/TLS for encryption, making it highly
configurable and secure. It supports both TCP and UDP transport protocols, allowing for
flexibility in different network environments. OpenVPN is widely used for remote access VPNs
due to its strong security features and ability to bypass firewalls. Its primary weakness is that it
requires client software and can be slower than other protocols due to its extensive encryption.
WireGuard is a relatively new, lightweight VPN protocol that aims to be faster and simpler than
IPsec and OpenVPN. It uses state-of-the-art cryptography and is designed to have a minimal
codebase, reducing the potential for security vulnerabilities. WireGuard’s strengths include
high performance and ease of configuration. However, it is still in the process of being
integrated into some systems, and its support for dynamic IP address changes can be limited
compared to more mature protocols.
2. Imagine you are tasked with configuring a remote access VPN for a company’s employees.
What steps would you take to ensure a secure and effective setup? Include at least three
security measures you would implement.
Select a secure and reliable VPN protocol, such as OpenVPN or IPsec, for the VPN setup. This
ensures that all data transmitted between employees and the company’s network is encrypted
and protected from eavesdropping.
Require employees to use multi-factor authentication (MFA) when connecting to the VPN. This
adds an additional layer of security beyond just usernames and passwords, making it more
difficult for unauthorized users to gain access.
Configure the VPN to enforce access control policies based on user roles and device
compliance. For example, allow access to sensitive resources only to users who have passed
device checks, such as having up-to-date antivirus software and the latest security patches
installed. This helps prevent unauthorized access and limits the potential impact of
compromised accounts or devices.

Lesson 2

### 024.3 Network Encryption and Anonymity

2 of 2

In an era where digital privacy and anonymity are increasingly under threat, technologies such as
Tor, cryptocurrencies, and the darknet have emerged as crucial tools for those seeking to protect
their online activities. Tor, or The Onion Router, is a network designed to provide anonymity by
routing internet traffic through multiple servers, obscuring users' identities and making it difficult
to trace their activities. This technology has become crucial for privacy advocates, journalists, and
individuals living under repressive regimes who need to access information freely and
communicate securely.
The concept of anonymity extends beyond simple browsing habits to more complex systems such
as the darknet, a hidden part of the internet that is accessible only through specialized software
like Tor. The darknet hosts a variety of content, from legitimate privacy-focused forums and
whistleblower platforms to illicit marketplaces. While often portrayed negatively in the media, it
is also a critical space for those who require a high level of confidentiality and anonymity for their
activities.
Cryptocurrencies, particularly Bitcoin and other blockchain-based assets, have introduced a new
dimension to the conversation about anonymity. Although transactions on most blockchains are

transparent and traceable, the use of pseudonymous addresses provides a layer of anonymity that
traditional financial systems do not offer. However, this perceived anonymity can be deceptive, as
advanced analytical techniques are increasingly able to de-anonymize blockchain transactions.
Understanding the nuances of these technologies and their limitations is essential for anyone
interested in navigating the complexities of digital anonymity and privacy.

Tor
Tor, short for The Onion Router, is a decentralized network designed to enhance online privacy
and anonymity. It allows users to browse the internet without revealing their IP address or
personal information to third parties. Tor achieves this by routing internet traffic through a series
of volunteer-operated servers, or nodes, each applying its own layer of encryption.
This process is similar to the layers of an onion, which is where the name “onion router” comes
from. As traffic passes through multiple nodes, the original source and destination of the data
become obscured, making it difficult for anyone, including government agencies or hackers, to
trace activity back to user.
Tor was initially developed in the mid-1990s by the United States Naval Research Laboratory to
protect U.S. intelligence communications online. The goal was to create a system that allowed
users to browse the internet anonymously without revealing their location or identity. In 2002,
Tor’s source code was released under a free license, and it became a publicly available tool for
anyone seeking enhanced privacy and security on the internet.
The project gained further momentum in 2004 when the Electronic Frontier Foundation (EFF)
began supporting its development. Since then, Tor has evolved into a vital resource for journalists,
activists, and privacy-conscious individuals worldwide. It enables users to bypass censorship,
protect their online identity, and access information freely, making it an essential tool in the fight
for digital privacy and freedom of expression.
Tor is used for various purposes, from protecting user privacy against surveillance and tracking to
bypassing censorship and accessing information in regions with restricted internet access.
However, because of its strong anonymity features, Tor is sometimes associated with illegal
activities. Despite this, it is widely used by journalists, activists, and individuals seeking to protect
their privacy in oppressive environments. Tor is accessible through the Tor Browser, a modified
version of Mozilla Firefox, which makes it easy for users to connect to the Tor network and
browse the internet securely (Tor Browser).

Figure 37. Tor Browser

Hidden Services and .onion Domains
In addition to providing anonymity for browsing the internet, Tor supports hidden services. These
allow websites and servers to operate anonymously within the Tor network, making both the user
and the server difficult to trace. These services use “.onion” domains, which are not accessible
through regular web browsers or search engines. Instead, they can be accessed only through the
Tor Browser or similar software configured to connect to the Tor network.
A .onion domain is a special type of web address that ends in .onion and represents a hidden
service within the Tor network. These domains are generated using cryptographic algorithms,
ensuring that both the server and the users remain anonymous. Hidden services are used for
various legitimate purposes, such as secure communication platforms, whistleblower sites, and
anonymous forums, where privacy and confidentiality are paramount. For instance, media
organizations like The New York Times and whistleblowing platforms like SecureDrop use .onion
addresses to allow anonymous communication with sources.
These .onion domains are generated through a cryptographic process that creates a unique pair of
public and private keys. The public key is used to form the .onion address, while the private key
remains secured on the server, guaranteeing that only the designated server with the correct
private key can host that specific .onion service.
When a user attempts to access a .onion site, their request is routed through several Tor nodes
that act as proxy servers, which obscures the user’s identity and location from the service. This
multi-layered routing ensures that the user’s IP address remains hidden from the site,
maintaining their privacy. Additionally, the communication between the user and the .onion
service is end-to-end encrypted, which means that data is securely transmitted from the user’s

device to the hosting server without the risk of interception or tampering by third parties.
To visit a .onion site, users must use a browser configured for the Tor network, such as the Tor
Browser. Regular web browsers cannot resolve .onion addresses, as these domains are not part of
the conventional DNS system. This specialized access provides a secure and anonymous method to
host and visit content, making .onion sites an essential tool for privacy-focused services, secure
communication, and information sharing in restrictive environments.

Navigating .onion Sites Safely
Searching on the Onion network is different from traditional internet browsing because .onion
sites are not indexed by standard search engines like Google. Instead, specific search engines are
designed to help find content hosted on .onion sites within the Tor network. One of the most
popular search engines for the Onion network is DuckDuckGo, which has an Onion version that
respects user privacy and does not track users. It also supports indexing of .onion sites.
Another option is Ahmia, a search engine that indexes .onion sites and focuses on providing
access to legitimate and safe content while filtering out potentially harmful material. It is a
reliable resource for finding content on the Tor network. Additionally, Torch is one of the oldest
search engines for the Onion network and has a large index of .onion sites. Despite its simple
interface, it is effective in locating a wide range of content on the Tor network.
To use these search engines, you must access them through the Tor Browser, which enables
anonymous browsing on the Tor network. It is important to exercise caution when using any
search engine on the Onion network, as you may come across illegal or malicious content. Always
be vigilant and ensure that you are accessing trustworthy and legitimate resources.

Practical Considerations and Risks
While Tor provides a high level of anonymity, it is not completely foolproof. Users should be
aware of the potential risks associated with using Tor, such as malicious exit nodes, which can
monitor unencrypted traffic leaving the Tor network. Additionally, activities that reveal personal
information, such as logging to personal accounts or downloading files, can compromise
anonymity even when using Tor. To maximize privacy, users should combine Tor with other
privacy-focused tools, such as end-to-end encrypted messaging and secure browsing practices.
Overall, Tor is a powerful tool for those who need to protect their privacy and access information
freely, but it should be used with a clear understanding of its capabilities and limitations.

The Darknet
The darknet refers to a part of the internet that is intentionally hidden and requires specific
software, configuration, or authorization to access. Unlike the surface web, which is indexed by
traditional search engines like Google and accessible through standard browsers, the darknet
operates within encrypted networks such as Tor, I2P, and Freenet. These networks provide
anonymity for both users and website operators, making the darknet a space where privacy and
freedom of speech are preserved but also where illicit activities can occur.
The darknet is often associated with illegal marketplaces and criminal activities due to its
anonymity features. It hosts platforms where users can buy and sell illegal goods and services,
such as drugs, counterfeit documents, and stolen data, using cryptocurrencies like Bitcoin and
Monero. However, the darknet is not solely a hub for illegal activities. It is also a vital resource for
journalists, activists, and whistleblowers operating in oppressive regimes or under conditions
where open communication could lead to severe consequences. Secure communication platforms,
anonymous forums, and whistleblowing sites like SecureDrop are all part of the darknet,
providing safe spaces for those in need of confidentiality.
Accessing the darknet typically involves using specialized software like the Tor Browser. Once
connected, users can navigate to .onion sites or other hidden services that are not accessible via
standard web browsers. Despite the perception of the darknet as a dangerous place, it is also a
tool for protecting digital privacy and enabling free expression in environments where these
rights are restricted. As with any tool, the darknet’s value and potential for harm depend on how
it is used, and responsible navigation is essential for anyone venturing into this hidden part of the
internet.

Cryptocurrencies — Understanding Blockchain
Cryptocurrencies, such as Bitcoin and Monero, have gained popularity for their potential to offer a
degree of financial privacy and anonymity not typically available in traditional banking systems.
These digital currencies operate on decentralized networks using blockchain technology, which
serves as a foundational structure for recording and verifying transactions without the need for a
central authority like a bank or government. The blockchain is essentially a distributed ledger that
is shared and maintained by a network of nodes (computers) that participate in the network. Each
node contains a copy of the entire blockchain, and new transactions are validated through a
consensus mechanism, such as Proof of Work (PoW) or Proof of Stake (PoS). This process ensures
that all nodes agree on the state of the blockchain, making it resistant to fraud and manipulation.
When a user initiates a transaction, it is grouped with other transactions into a block. This block is
then broadcast to the network, where nodes work to validate it according to the rules of the

blockchain protocol. For example, in Bitcoin, this process involves solving a complex
mathematical puzzle — a process known as mining. Once the block is validated, it is added to the
chain of previously validated blocks, creating a permanent and unalterable record of that
transaction. This chain of blocks, or blockchain, forms a comprehensive and chronological history
of all transactions that have ever occurred on the network.
While the blockchain’s transparency allows anyone to view the entire transaction history, it does
not necessarily link these transactions to real-world identities. Instead, users are represented by
unique alphanumeric addresses, known as public keys. These public keys are generated using
cryptographic algorithms and serve as pseudonymous identifiers. For example, instead of
showing “Carol Doe sent 1 Bitcoin to Dave Smith,” the blockchain will record that a specific
address (e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa) sent 1 Bitcoin to another address. This
creates a layer of pseudonymity, as the addresses do not directly reveal the identities of the
individuals behind them.
However, the degree of anonymity varies significantly depending on the design of the blockchain.
In cryptocurrencies like Bitcoin, all transactions are publicly visible, meaning anyone can trace
the flow of funds from one address to another. If an individual’s identity is linked to a particular
address through information leaks, use on a known exchange, or accidental disclosure, it becomes
possible to trace their entire transaction history. This is why Bitcoin is considered pseudonymous
rather than anonymous.
In contrast, privacy-focused cryptocurrencies like Monero and Zcash implement additional
features to obscure transaction details. Monero, for example, uses ring signatures and ring
confidential transactions (RingCT) to mix the sender’s transaction with multiple others, making it
virtually impossible to determine the origin or destination of funds. It also uses stealth addresses,
which generate a unique, one-time address for each transaction. This means that even if someone
knows a Monero address, they cannot see all incoming transactions to that address on the
blockchain.
Zcash, on the other hand, provides users with the option to choose between transparent and
shielded transactions. Shielded transactions use a sophisticated cryptographic technique called zkSNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge). This allows the
network to verify that a transaction is valid without revealing any details about the sender,
recipient, or transaction amount. This offers a high level of privacy but requires more
computational resources, which can degrade scalability and efficiency.
Moreover, the perceived anonymity of cryptocurrencies can be undermined by the use of
centralized services such as exchanges, which often require identity verification through Know
Your Customer (KYC) processes. Once a user’s identity is linked to an address through an
exchange, their transaction history can be traced and analyzed. This has led to the development of

advanced blockchain analysis tools that can identify patterns, trace fund movements, and even
de-anonymize users under certain conditions.
To combat this, users who prioritize privacy often employ additional measures, such as using
privacy coins, mixing services (tumblers), or privacy-enhancing wallets that obfuscate transaction
paths. For example, mixing services combine multiple transactions from different users, making it
difficult to trace the origin of any single transaction. However, these services have come under
scrutiny from regulators, as they can be used to launder illicit funds.
While blockchain technology provides a transparent and secure way to record transactions, the
level of privacy and anonymity it offers varies greatly depending on the design of the blockchain
and the measures taken by users to protect their identities. Understanding these nuances is
crucial for anyone looking to engage with cryptocurrencies, whether for privacy, security, or
financial purposes.

## 1. Describe how Tor enhances user anonymity on the internet. Explain the process by which Tor
obscures a user’s identity and the historical context of its development.

## 2. What are the primary differences between Bitcoin and Monero in terms of anonymity? Discuss
the techniques each cryptocurrency uses to protect user privacy.

3. What role does the darknet play in the context of anonymity, and how can it be accessed?
Explain both its positive and negative aspects.

1. Investigate the various methods used by law enforcement agencies to de-anonymize Tor users.
Identify at least two specific techniques or technologies employed in such investigations and
provide case studies where these methods were successfully used to uncover the identity of
individuals using Tor. Analyze the effectiveness of these methods and their impact on the
perceived anonymity provided by the Tor network.

This lesson explores the interplay between digital privacy, anonymity, and the technologies that
support these concepts, such as Tor, the darknet, and cryptocurrencies. Tor, or The Onion Router,
is a network that provides anonymity by routing internet traffic through multiple servers, making
it difficult to trace user activities. The darknet, a hidden part of the internet accessible only
through specialized software like Tor, serves as a haven for both legitimate privacy-focused
activities and illicit markets, reflecting the dual nature of these anonymity technologies.
Cryptocurrencies, while often perceived as anonymous, operate on blockchain technology, where
transactions are recorded on a public ledger. This transparency can undermine anonymity,
especially with cryptocurrencies like Bitcoin, which are pseudonymous rather than fully
anonymous. Advanced analytics can sometimes link transactions to real-world identities. In
contrast, privacy-focused cryptocurrencies like Monero and Zcash offer enhanced anonymity
features to obscure user identities and transaction details. Despite these capabilities, maintaining
full anonymity with cryptocurrencies remains challenging due to regulatory scrutiny and the
evolving landscape of blockchain analysis.

## 1. Describe how Tor enhances user anonymity on the internet. Explain the process by which Tor
obscures a user’s identity and the historical context of its development.
Tor enhances user anonymity by routing internet traffic through a network of volunteeroperated servers, each applying a layer of encryption, which is similar to the layers of an
onion. As traffic passes through multiple nodes, the original source and destination of the data
become obscured, making it extremely difficult for anyone to trace the user’s activities back to
them. Tor was initially developed in the mid-1990s by the United States Naval Research
Laboratory to protect U.S. intelligence communications. In 2002, its source code was released
under a free license, and it became a publicly available tool for anyone seeking enhanced
privacy and security on the internet. It has since evolved into a critical resource for journalists,
activists, and privacy-conscious individuals.
2. What are the primary differences between Bitcoin and Monero in terms of anonymity? Discuss
the techniques each cryptocurrency uses to protect user privacy.
The primary difference between Bitcoin and Monero in terms of anonymity is that Bitcoin is
pseudonymous while Monero is designed to provide true anonymity. Bitcoin records all
transactions on a public ledger, and although users are represented by alphanumeric
addresses, it is possible with enough data and analysis to trace these addresses back to
individuals. Monero, on the other hand, uses advanced privacy techniques such as ring
signatures, stealth addresses, and confidential transactions to hide both the sender and
recipient information, as well as the transaction amount. This makes it much harder to trace
Monero transactions and link them to specific individuals, providing a higher level of privacy
than Bitcoin.
3. What role does the darknet play in the context of anonymity, and how can it be accessed?
Explain both its positive and negative aspects.
The darknet serves as a part of the internet that provides enhanced anonymity by requiring
specific software, such as the Tor Browser, to access its content. It allows users to navigate
hidden services and .onion sites that are not indexed by conventional search engines and
cannot be accessed through standard browsers. The darknet can be a vital resource for
journalists, activists, and whistleblowers seeking to communicate securely and access
information without fear of surveillance or censorship. However, it is also associated with
illegal activities, as its anonymity features are exploited for operating illicit marketplaces and
distributing illegal content. Thus, while the darknet is an essential tool for protecting digital
privacy and enabling free expression in restrictive environments, it also presents significant
ethical and legal challenges.

1. Investigate the various methods used by law enforcement agencies to de-anonymize Tor users.
Identify at least two specific techniques or technologies employed in such investigations and
provide case studies where these methods were successfully used to uncover the identity of
individuals using Tor. Analyze the effectiveness of these methods and their impact on the
perceived anonymity provided by the Tor network.
One common technique used by law enforcement to de-anonymize Tor users is traffic analysis.
This involves monitoring the traffic entering and exiting the Tor network and identifying
patterns that can be matched to specific users. In the case of the “Silk Road” takedown, law
enforcement agencies monitored traffic patterns and combined them with other investigative
techniques to identify Ross Ulbricht, the site’s operator, as “Dread Pirate Roberts.” This case
demonstrated that while Tor provides a significant level of anonymity, it can be compromised
when combined with other data sources and surveillance techniques.
Another technique involves the use of malicious Tor exit nodes. These are nodes operated by
law enforcement or other entities that intercept and log traffic passing through them. For
example, in 2014, Operation “Onymous,” a joint operation by the FBI and Europol, resulted in
the seizure of several darknet markets. It is suspected that the operation involved the use of
malicious exit nodes to capture unencrypted traffic and identify the administrators and users
of these sites. This method highlighted a key vulnerability in the Tor network, where
unencrypted data leaving the Tor network can be intercepted and used to identify users.

Security Essentials (Version 1.0) |

## Topic 025: Identity and Privacy

### 025.1 Identity and Authentication
Security Essentials version 1.0, Exam 020, Objective 025.1
- Understanding of the concepts of digital identities.
- Understanding of the concepts of authentication, authorization, and accounting
- Understanding of the characteristics of secure password (e.g. length, special characters,
change frequencies, complexity)
- Using a password manager
- Understanding of the concepts of security questions and account recovery tools
- Understanding of the concepts of multi-factor authentication (MFA), including common
factors
- Understanding of the concepts of single sign-on (SSO) and social media logins
- Understanding of the role of email accounts for IT security
- Understanding of how passwords are stored in online services
- Understanding of common attacks against passwords
- Monitoring personal accounts for password leaks (e.g. search engine alerts for usernames
and password leak checkers)
- Understanding of the security aspects of online banking and credit cards

- Online and offline password managers
- keepass2
- Single sign-on (SSO)
- Two-factor authentication (2FA) and multi-factor authentication (MFA)
- One-time passwords (OTP), time-based one-time passwords (TOTP)
- Authenticator applications
- Password hashing and salting
- Brute force attacks, directory attacks, rainbow table attacks

## 025. Identity and Privacy

### 025.1 Identity and Authentication

The question of identity boils down to, “Who are you?” If you drop in on a friend’s party, the
friend can recognize you by your face. But if you come to a conference, the staff might want to
check an ID (which probably has a photo of your face) before letting you in. So even in everyday
life, identity is not always a simple matter.
Authentication is a way of determining identity. At the conference, the staff authenticate you
through the ID with your picture. When you pick up your laundry from a cleaner, you don’t need
to prove your identity — but you had better bring the receipt that lists the laundry. That’s another
form of authentication.
This lesson covers digital identity, which is the way computer programs and online services
identify you in order to grant you access. We’ll look at related topics such as password
management, multi-factor authentication, and single sign-on. We tell you how to maximize your
secure use of these technologies, so that attackers find it hard to steal your identity.

Concepts in Identity and Authentication
Over the centuries, many forms of authentication have been developed. In speakeasies (the illegal
outlets for alcohol that existed in the U.S. during the Prohibition era), people would authenticate
themselves by saying a password known to the staff (famously, “Joe sent me”) and thus gain
entrance. Passwords — or more generally, secret keys — are now central to computer
authentication.
Security experts divide types of authentication into a few categories: “something you know” (a
password), “something you have” (an ID, an ATM card), and “something you are” (a fingerprint, a
retinal scan).
Identity and authentication are critical to computerized interactions. We need to identify
ourselves and be authenticated by schools, businesses, banks, retailers, government offices, social
media accounts, and more.
Making a mistake in authentication can have grievous consequences. People have lost their life
savings through identity fraud, or through scams caused by attackers who falsely identified
themselves as trusted institutions.

Steps in Identification: Authentication, Authorization, and
Accounting
When you use a service, your identity is used in the following basic ways.
Authentication, as we have seen, just validates that Julie is Julie, and not George or Ahmed.
Authorization uses the authenticated identity to determine whether you have the right to gain
access to some resource. For instance, you might be authorized to read and write files on your
computer, but not to change its security settings.
Accounting (also known as logging) keeps a record of what you’ve done, so that an administrator
can check for suspicious things that happened in the past. For instance, if data seems to have been
stolen, the administrator might be interested to know that one of the staff was recorded to have
logged into the system at 3:00 AM. That login could well have been a malicious intruder who stole
the staff person’s credentials.

Password Security
Passwords are central to identity and security in computing. Although there’s a lot of talk about
alternatives to passwords, these alternatives are still based on the same concept of “something

you know” and require the choice of a text string that’s hard to guess.
When physical IDs and biometrics are in use, they are generally used together with a password or
other secure key of some kind.

Choosing a Good Password
Few internet users maintain good password security. We’ll look at the guidelines for password
security in this section, and then turn later to tools that can help.
When you sign up for an online account, you are generally given some guidelines for choosing a
good password, such as a minimum (and sometimes maximum) length, and a rule to vary the text
by including capital letters, digits, and punctuation (sometimes a limited list of characters to
choose from).
Complexity is important, but length is even more important. This is because attackers often guess
passwords just by trying random combinations of characters, a method called a brute force attack.
Thus, if you have a complex but short password such as H*z-6d, a brute force attack might
happen to try that combination of six characters as part of its random attempts to log in.
If you want to choose a long password that you can type easily, start by forming a string of
random words that you can remember. For instance, you could start with “scarf lunch wingnut
rhino pretty” and then mix in special characters to make the password
scarf\lunch5wingnut(rhino,pretty.
If you succeed in choosing a difficult password, can it still by guessed by an intruder? There is
always a small chance. Someone might see you entering the password and guess some of the
characters. Malware might get on your computer and monitor your keystrokes. A site that you log
into might store the password in an insecure manner and be hacked.
Therefore, choose a different password for every site where you log in. Attackers tend to try a
combination of user name and password on lots of popular internet services in a process called
credential stuffing. This often works because so many people use the same password for multiple
sites. If you use unique passwords, an attacker who gets the password for your social media site
might disrupt your social media, but at least they won’t get into your bank account.
It’s a good idea to change your passwords every year or so. Some sites require you to change the
password frequently. Don’t try to play tricks such as alternating between two passwords: Use a
new one every time. Certainly change the password if you’ve heard that your service was the
victim of a breach.
Never share a password. There is no reason for an employer, a system administrator, or some

random person calling you and claiming to represent your bank to know your password.
Passwords should never be sent over unencrypted channels such as email or mobile texting. As
we’ve seen, passwords never need to be shared at all.

Security Questions and Account Recovery Tools
In addition to a password, services often ask you personal questions such as “Where were you
born?” and store the answers. They sometimes use these security questions to add extra checks
when you enter your user name and password. If you get locked out and forgot your password,
look for a link such as “Forgot your password?” on the services' login screen. That link takes you
to a page with the security questions you previously answered.
After you answer the questions accurately, the service usually requires another step for additional
security: It mails a special link for one-time use to your email address. You have to log in using
that link within a specified amount of time. There you can reset your password. This extra step
ensures that, even if a malicious intruder manages to get your security questions right, the
intruder can’t break into the service unless they also have access to your email.
The problem with security questions is that someone might guess the answers. It probably isn’t
hard for an attacker to figure out where you were born. Even a more obscure fact, such as “What
was the model of your first car?” might be known by someone.
So it’s best to invent answers to the security questions and keep track of your fake answers.

Password Managers
We have outlined some detailed rules for password management. Fortunately, there are tools
available to assist with this process.
Many people keep a paper list of passwords, and in some circumstances that’s a reasonable way to
maintain them. If you are working from home and nobody goes in your office, a paper list might
be safe. (However, a thief might find it.)
And if you have a paper list, you still have to type in each password, which is cumbersome and
error-prone. Many sites shut you out after a few login attempts, in order to thwart brute force
attacks. So a paper list is never ideal.
A plain-text list on your computer is even less secure, because malware might install a tool that
finds the list.
For best security, therefore, use a password manager. This program can run either on your

personal computer (desktop, laptop, or mobile device) or in the cloud. Start by entering into the
password manager any relevant login information for each service or program you use: your
email address or user name, your password, and answers to security questions.
A password manager encrypts your login information so that an intruder can’t use it if the data
file is stolen. If a password manager runs in the cloud, it also uses encryption when transmitting
your data between your computer and the server in the cloud.
You need remember only one password, called the master password, to let you into the password
manager. You can then instruct the password manager to log you into all the programs and
services you have stored there. Changing passwords is also simple.
There are trade-offs between using a offline password manager on your computer and using a
cloud-based password manager. You can’t use the local password manager when you want to log
into a family member’s or friend’s computer in case your system goes down or you’re visiting
someone. The cloud password manager is available everywhere, and is clearly helpful when
you’re on the move.
Offline password managers store password data locally on a user’s device, providing a higher
level of security because the data is not stored in the cloud and is not vulnerable to online attacks.
This type of manager is ideal for users who prioritize security over convenience and do not need
access to their passwords across multiple devices. Offline managers, such as KeePass2, offer
robust security features, including local encryption and the ability to manage passwords without
an internet connection. The main drawback is that users are responsible for backing up their data
and may find it less convenient to synchronize passwords across devices manually.
Online password managers store encrypted password data in the cloud, allowing users to access
their passwords from any device connected to the internet. This synchronization feature is
particularly useful for users who need access to their passwords across multiple devices, such as
smartphones, tablets, and computers. Popular examples include LastPass, 1Password, and
Dashlane. However, storing passwords in the cloud introduces some security risks, as the data
could potentially be accessed if the service is compromised or the cloud password manager might
go down itself, or you might lose internet access. The business might also raise its prices, go out of
business, or abandon you in other ways.
Some web browsers also have password managers. These are convenient so long as you are doing
all your work on the same browser, but the password manager on one browser isn’t accessible
from another browser.
KeePass 2 is a popular, free password manager that runs on all popular operating systems. The
web site offers downloads for a wide range of systems — Windows, macOS, GNU/Linux, popular
mobile devices — and distributes its open source code under the GNU General Public License.

Figure 38. Keepass2 main screen

Single sign-on
Single sign-on (SSO) allows you to log in to one service and then use other services without having
to log into them individually. For instance, suppose you keep Facebook open on your computer all
the time. When you visit some other service, you might see a dialog box pop up that allows you to
log in using your Facebook account. Google is another popular service that is often used for single
sign-on.
Complicated data exchanges are going on behind the scenes to enable single sign-on. The basic
idea is that, after you click on the icon presented by the second service, it sends a message to
Facebook and gets back a token (a random, encrypted message) authenticating you.
When you want to use single sign-on, the service you want to use might not be running in the
same browser. You might be logged out of Facebook, for instance, or have left it running in a
different browser. In such case, the second service causes Facebook to open a dialog box and ask
you to log in to Facebook. In this case, it takes just as much trouble to use single sign-on the first
time as to log in using a different account, but further uses of single sign-on will be easy because
Facebook keeps running.
As with an online password manager, depending on a service for single sign-on has a risk: If you
lose access to your account or the service closes down, you lose access to all the other services that
queried it for your login information.
Furthermore, when a new service asks another one for access, the new service might ask for a lot

of data on you that isn’t required for logging in: location and date of birth, for instance. If you’re
asked to approve the transfer of data from one service to another, think carefully about whether
you want the new service to have that data.

Multi-Factor Authentication
More and more, internet users are being prompted to enter a string of digits sent to their phone,
or perform some other task, before logging in to a service. The services require two or more ways
of identifying you, known as multi-factor authentication (MFA), to address the risks of passwords.
The scenario described earlier, where you reset your password by having a link sent to your email
address, is another form of MFA. These procedures prevent you from being impersonated by
someone from across the world, or even in the next office.
All forms of MFA require extra effort on the part of the user (because you’re dealing with two or
more ways of identifying yourself), but they’re worth the trouble because they cut out many
common attacks. Almost every computer user has a cell phone now, so it’s reasonable to use it for
MFA. Many services can send the code to your email instead, so you can use the code from your
desktop or laptop too.
Most MFA calls for a password and one other factor, and therefore can be called two-factor
authentication (2FA).
Many other forms of MFA have been in use for some time. An ATM card, combined with a fourdigit pin, is a simple and effective way for your bank to identify you wherever you go in the world.
Many ATMs also contain cameras so that, in case of a fraudulent withdrawal, an adminstrator can
see who did it.
There are special devices that attach to work computers and let you authenticate yourself by
holding up a badge with a strip like the one on an ATM.
One-time passwords were developed long before digital computing. People who wanted to verify
themselves over a telephone or radio would carry a “one-time pad,” each sheet bearing a random
code. One person would say the code, the other would validate it, and then each would tear off the
sheet.
In computing, you can run a program or device that generates a one-time password, and use it to
authenticate yourself.
A related kind of authentication is a time-based one-time password (TOTP). This service generates a
random code every 30 seconds or so. When you want to log into your workplace or other service,
you can press a button in the service to generate a code, and enter that code when the service
you’re logging into prompts for it. The server simultaneously generates the same code from the

service. When the codes match, you can log in.
Many mobile devices now let you log in with a fingerprint. The fingerprint readers on these
devices are only partly accurate, and fingerprints are not completely unique either. So it’s best to
use the fingerprint with a password or other form of authentication.
Although MFA can be tiresome, it is recommend that you use it for every program and service you
access. After all, you probably log in to services only a few times each day. By installing an
authenticator app, you can set up the use of MFA for your services and halt many kinds of attacks.

Protecting Passwords at Online Services
We’ve discussed how you should manage your passwords securely. But what about the server? It
has to recognize your password. But if it contains a database of users and passwords, it’s highly
vulnerable to malicious intrusion.
The two main ways to protect your password are hashing and salting. These techniques have been
known for many decades, and all servers should use them.
Hashing means running the characters of your password through some simple mathematical
function, often consisting of additions, multiplications, and divisions. A good hash produces a
fixed-length string of random characters. Because information is lost during the hashing, no one
can reconstruct the original password from the hash.
When you log in and submit the password, the server hashes it and makes sure the result matches
what’s in its database.
Determined and well-funded attackers have found a way to attack hashes: They create a huge
database of strings and their associated hashes (which assumes they can determine what hash
function is in use). This database is called a rainbow table. If the attacker breaks into a server and
obtains the hashes, they look up each hash in the rainbow table and try the various strings that
match.
Therefore, hashing should be supplemented by salting. This means adding a short unique
string — called a salt or nonce — to the user’s password. Then the combination of password and
salt is hashed.

Email Accounts and IT Security
Email accounts are often the gateway to our digital identities, serving as a central hub for
managing access to various online services, including social media, e-commerce, banking, and
even work-related platforms. Because of this, securing email accounts is one of the most critical

aspects of IT security. A compromised email account can lead to a cascade of security breaches, as
attackers can use it to reset passwords and gain unauthorized access to other connected services.
To safeguard email accounts, it is essential to implement strong security measures. One of the
most effective strategies is to use multi-factor authentication.
Regular monitoring of your email account activity is also an important practice. Look out for any
unusual login attempts or changes in settings, such as forwarding rules that you did not set up.
These could be indicators that someone is trying to gain unauthorized access to your account.

Monitoring Personal Accounts
Monitoring personal accounts for password leaks is an essential practice in maintaining digital
security and protecting your online identity. Password leaks occur when hackers gain
unauthorized access to databases containing user credentials, which can then be exposed or sold
on the dark web.
To mitigate the risks associated with password leaks, it is crucial to be proactive in monitoring
your accounts for signs of compromise. One effective method is to set up search engine alerts for
your usernames or email addresses.
Additionally, password leak checkers are an invaluable tool for identifying compromised
credentials. Websites and services such as Have I Been Pwned and Google’s Password Checkup can
scan your email address or password against databases of known breaches to determine whether
your information has been leaked.
If you receive an alert that your password has been compromised, it is important to act quickly.
Change your password immediately on the affected site and any other site where you may have
used the same password.
Modern web browsers such as Google Chrome, Firefox and Safari have integrated security
features that alert users if their passwords have been compromised in a data breach. These
browsers can detect when saved passwords are no longer secure and notify users about which
accounts are affected, prompting them to take action to protect their information.
When you use a browser’s built-in password manager, it securely stores your login credentials for
various websites. If any of these stored passwords match a known data breach, the browser will
issue a security alert.

Security Aspects of Online Banking and Credit Cards
Online banking and the use of credit cards offer convenience and accessibility for users to manage
their finances from anywhere. However, this convenience comes with significant security risks, as
these services are prime targets for cybercriminals looking to steal personal information and
financial assets.
One of the foundations for online banking security is the use of secure connections, typically
indicated by a URL that begins with https:// and a padlock icon in the browser’s address bar.
Always ensure that you are on the bank’s legitimate website before entering any personal
information. Phishing attacks, where fraudulent websites mimic legitimate ones, are a common
threat. Another critical security aspect is multi-factor authentication (MFA), which most banks
now require or offer as an option.
Avoid using public or shared computers, as they may be infected with malware that can capture
your keystrokes or steal your login credentials. Similarly, public Wi-Fi networks are often
insecure and can be used by attackers to intercept your data. If you must use public Wi-Fi,
consider using a Virtual Private Network (VPN) to encrypt your connection and protect your

1. Why is it important for a password to be long?

## 2. What should you do if someone calls from Microsoft and asks for your password so they can fix
a security problem on your Windows system?

## 3. What are some advantages of using a password manager?

## 1. In hospitals, clinicians typically roam from one floor to another and have to log in frequently to
check on patients and enter their notes. What form of authentication might be good for a
hospital to use?

## 2. Some professionals delegate social media postings to a service that publishes the postings at
planned times. Do you have to give your password to that service and allow the service to have
complete access to your account?

This lesson covers ways to prove your identity so you can get secure access to resources over the
internet. The lesson discusses how to protect passwords that should be used both by you, the user,
and by the server you’re logging into. Different types of multi-factor authentication are
introduced, along with password managers and single sign-on.

## 1. Why is it important for a password to be long?
Long passwords (20 characters, or ideally even longer) are the most resistent to brute force
2. What should you do if someone calls from Microsoft and asks for your password so they can fix
a security problem on your Windows system?
Hang up. Scammers claiming to be Microsoft are common. But anyone who asks for your
password is a scammer, and it might be helpful to call the company that they claim to represent
and warn the company that someone is targetting their clients in a scam.
3. What are some advantages of using a password manager?
Your passwords are stored in a secure, encrypted manner so that you don’t have to write them
down in plain text. You need to remember just your master password. You can create long,
complex passwords without having to try to type them in.

## 1. In hospitals, clinicians typically roam from one floor to another and have to log in frequently to
check on patients and enter their notes. What form of authentication might be good for a
hospital to use?
Badge readers are a good solution in such a setting. Each clinician carries a badge with a strip
containing their identifying information. Each nurse’s station has a computer with a badge
reader. To gain access to electronic records, each doctor or nurse holds their badge up before
the badge reader, and possibly also enters a password for two-factor authentication. If they
leave without logging out, the account is logged out automatically after some idle time.
2. Some professionals delegate social media postings to a service that publishes the postings at
planned times. Do you have to give your password to that service and allow the service to have
complete access to your account?
No. These services have very limited access to your account. The service uses the social media’s
application programming interface (API) to publish your postings. The service has its own API
password, so you can revoke access whenever you want. The operations allowed to the service
can also be limited.

Security Essentials (Version 1.0) | 025.2 Information Confidentiality and Secure Communication

### 025.2 Information Confidentiality and Secure Communication
Security Essentials version 1.0, Exam 020, Objective 025.2
- Understanding the implications and risks of data leaks and intercepted communication
- Understanding of phishing and social engineering and scamming
- Understanding the concepts of email spam filters
- Securely handling of received email attachments
- Sharing information securely and responsibly using email cloud shares and messaging
services
- Using encrypted instant messaging
- Phishing and social engineering
- Identity theft
- Scamming and scareware
- Email spam, email spam filtering
- Non-disclosure agreements (NDA)
- Information classification

## 025. Identity and Privacy

### 025.2 Information Confidentiality and Secure
Communication

In today’s interconnected world, where sensitive data is frequently shared online, it is important
to know how to maintain the confidentiality of digital communication. This includes safeguarding
personal and professional information and recognizing threats like phishing and social
engineering, which exploit human psychology to gain access to sensitive data. Identifying these
attempts is key to preventing unauthorized access. Data leaks and intercepted communications
can lead to financial loss, reputational damage, and legal issues. This lesson covers the impact of
data leaks, the importance of non-disclosure agreements (NDAs), and the role of information
classification in protecting confidential data.

Data Leaks and Intercepted Communication
A data leak occurs when sensitive information is exposed, either accidentally or through
malicious intent. This can happen due to inadequate security measures, human error, or
deliberate attacks by cybercriminals. The consequences of a data leak can be devastating. For
businesses, leaked proprietary information can result in lost competitive advantage, intellectual
property theft, and financial penalties. For individuals, the exposure of personal data, such as

Security Essentials (Version 1.0) | 025.2 Information Confidentiality and Secure Communication

social security numbers or credit card information, can lead to identity theft and fraud.
Additionally, companies may face legal consequences if they fail to comply with data protection
regulations, such as the General Data Protection Regulation (GDPR) in Europe or the California
Consumer Privacy Act (CCPA) in the United States. Fines and sanctions for non-compliance can be
substantial, further compounding the impact of a data breach.
Intercepted communications pose a similar threat. If sensitive information is transmitted over
unsecured channels, it can be intercepted by unauthorized parties. This is particularly dangerous
in business settings, where confidential discussions about strategies, financial plans, or product
development could be exploited by competitors or malicious actors.

Phishing and Social Engineering
Phishing and social engineering are deceptive tactics used by cybercriminals to manipulate
individuals into divulging confidential information or performing actions that compromise
security. These attacks often exploit human psychology rather than technical vulnerabilities,
making them difficult to detect and defend against. Phishing typically involves fraudulent email,
text messages, or websites designed to appear legitimate, tricking victims into revealing sensitive
information such as usernames, passwords, or credit card details. For example, an email message
might appear to come from a trusted source, like a bank or online service, asking the recipient to
click on a link to update their account information. Once the victim enters their credentials on the
fake site, the attacker captures this data and uses it for malicious purposes.
Social engineering, on the other hand, encompasses a broader range of tactics beyond phishing. It
involves manipulating individuals into breaking normal security procedures, often by posing as
someone trustworthy or in a position of authority. A common example is a phone call from an
attacker pretending to be from the IT department, requesting the target to provide login
credentials to “resolve a technical issue.”

Identity Theft
Identity theft occurs when an attacker gains unauthorized access to someone’s personal
information and uses it to impersonate the victim, often to commit fraud or other crimes. This can
include stealing personal data such as Social Security numbers, credit card information, or online
account credentials. Once they have this information, attackers can open new credit accounts,
make unauthorized purchases, or even gain access to medical and government services in the
victim’s name.
Phishing and social engineering are often the initial steps in identity theft, as these techniques are
used to gather the personal information needed to impersonate the victim.

Preventing identity theft requires a combination of vigilance and proactive security measures.
Individuals should use strong, unique passwords for each of their accounts and enable multifactor authentication whenever possible. Regularly monitoring bank statements, credit reports,
and account activity can also help detect unauthorized transactions or changes at an early stage.

Scamming and Scareware
Scamming and scareware are malicious tactics used by cybercriminals to deceive individuals and
exploit their fears, often leading to financial loss or compromised personal information. These
types of attacks rely on manipulation and fear rather than technical hacking methods, making
them difficult to identify and avoid.
Scamming refers to a wide range of fraudulent schemes designed to trick individuals into giving
away money, personal information, or access to sensitive accounts. Scammers often pose as
legitimate organizations, such as banks, government agencies, or well-known companies, to gain
the victim’s trust. One common example is the “tech support scam,” where the scammer contacts
the victim claiming that their computer has been infected with a virus. The scammer then offers
to fix the issue for a fee or asks the victim to download software that gives the scammer remote
access to their device. Once they have access, they may steal sensitive information or demand
payment for services that were never needed.
Scareware, on the other hand, is a specific type of malware that preys on fear to manipulate
victims into taking certain actions. It typically manifests as pop-up messages or alerts on a user’s
computer or smartphone, falsely warning that the device has been infected with a virus or that
their data is at risk. The scareware message may appear to come from a legitimate antivirus
company or security service and urge the user to download software or purchase a “full version”
of a product to fix the non-existent problem. In reality, downloading the suggested software can
lead to the installation of actual malware, spyware, or ransomware, further compromising the
user’s device and personal information.
To protect against these types of attacks, it is important to remain skeptical of unsolicited offers,
warnings, and requests for payment or personal information.

Non-Disclosure Agreements (NDAs)
Non-disclosure agreements (NDAs) are legal contracts that protect confidential information shared
between parties. They are commonly used in business settings to prevent the unauthorized
disclosure of sensitive data, such as trade secrets, business plans, or proprietary technology. An
NDA typically outlines the scope of the confidential information, the obligations of the parties
involved, and the consequences of breaching the agreement.

Security Essentials (Version 1.0) | 025.2 Information Confidentiality and Secure Communication

NDAs play a crucial role in maintaining the confidentiality of information when collaborating
with third parties, such as contractors, consultants, or potential business partners. By signing an
NDA, these parties agree not to disclose or misuse the information provided to them during the
course of the business relationship. This legal protection helps ensure that sensitive data remains
secure and is not used to the detriment of the company.
However, it is important to recognize that NDAs are not foolproof. While they provide a legal
framework for protecting information, they do not prevent all potential leaks or misuse. Ensuring
compliance with an NDA requires vigilance and regular monitoring, as well as a strong internal
culture of confidentiality and data security.

Information Classification
The use of NDAs is intrinsically linked to information classification. A thorough classification
process helps determine which information is critical enough to warrant protection under an
NDA. For example, highly confidential information, such as proprietary business strategies or
trade secrets, should always be governed by strict NDAs to prevent misuse or accidental exposure.
Information classification is a systematic process of categorizing data based on its level of
sensitivity and the potential impact of its unauthorized disclosure. This process helps
organizations identify and protect their most critical information assets by applying appropriate
security controls. Common classification levels include public, internal, confidential, and highly
confidential.
Public information is data that can be freely shared without any risk to the organization, such as
marketing materials or press releases. Internal information is intended for use within the
organization but does not pose significant risk if disclosed. Confidential information, however,
could cause harm if exposed; such information includes employee records, financial statements,
and customer details. Highly confidential information is the most sensitive, and its disclosure
could have severe consequences, such as trade secrets or critical business strategies.
Classifying information correctly is essential for implementing effective security measures. For
example, highly confidential information should be stored in secure, access-controlled
environments and transmitted only through encrypted channels. Employees should receive
training on how to handle and protect data based on its classification level, ensuring that sensitive
information is not inadvertently exposed.
In addition to protecting data within the organization, information classification is vital for
compliance with legal and regulatory requirements. Many regulations mandate specific
protections for certain types of data, such as personal information or financial records. Proper
classification helps organizations meet these requirements and avoid potential penalties for non-

compliance.

Securing Email Communication
Email spam refers to unsolicited, often irrelevant or inappropriate messages sent to a large
number of recipients. These messages typically contain advertisements, phishing attempts, or
malicious content such as links to malware. Spam not only clutters inboxes but also poses
significant security risks, as it is frequently used as a vector for cyberattacks.
Email spam filtering detects and blocks unwanted or potentially harmful email before it reaches
the recipient’s inbox. Spam filters use a variety of techniques to identify spam, including
analyzing the content of the email, checking the sender’s reputation, and using machine learning
algorithms to detect patterns commonly associated with spam. These filters can operate at
multiple levels, including the email server, client software, and third-party services.
Blacklist and whitelist filtering is another method, where emails from known spam sources or
domains are blocked based on their reputation, while trusted senders bypass the filters.
Spam filters are crucial in protecting users from phishing attempts, malware, and other emailbased threats. By preventing potentially dangerous messages from reaching the inbox, they
reduce the risk of users clicking on malicious links, downloading infected attachments, or falling
victim to social engineering attacks.
However, spam filters are not perfect. Sometimes, legitimate emails may be incorrectly classified
as spam, a problem known as false positives. Conversely, some spam messages may evade
detection and reach the inbox, known as false negatives. To minimize these issues, users can
regularly review their spam folder for legitimate messages and adjust their spam filter settings
accordingly.
Email attachments are a common way to share documents, images, and other files, but they also
pose significant security risks if not handled properly. Malicious attachments are a common
method used by cybercriminals to distribute malware, ransomware, and other harmful software.
One of the most important rules when dealing with email attachments is to exercise caution,
especially if the email is unexpected or from an unknown sender. Even if the email appears to
come from a familiar source, it is essential to verify the legitimacy of the message before opening
any attachments.
Always avoid opening attachments with suspicious file types. Common file formats used in
malicious attachments include .exe (executable files), .vbs (Visual Basic Script files), .js
(JavaScript files), and .bat (batch files). These file types can run potentially dangerous code on
your system.

Security Essentials (Version 1.0) | 025.2 Information Confidentiality and Secure Communication

Another critical practice is to keep your antivirus software and email security tools updated.
Modern antivirus programs are equipped to scan email attachments for known threats and alert
you if they detect any malicious activity.

Sharing Information Securely
Sharing information through email, cloud storage, and messaging services has become a routine
part of personal and professional communication. However, the convenience of these platforms
also comes with security risks, especially when handling sensitive or confidential data.
When sharing information via email, it is important to use encryption to protect the content of
your messages. Standard email transmissions are not inherently secure, and without encryption,
they can be intercepted and read by unauthorized parties. Using services that offer built-in
encryption, such as Gmail with its confidential mode, and third-party tools like PGP (Pretty Good
Privacy) to encrypt email content, can help protect sensitive information from being exposed.
Additionally, avoid sharing confidential information, such as passwords or financial details,
directly in the body of an email message. Instead, consider using secure file-sharing methods or
encrypted attachments.
Cloud storage services, such as Google Drive, Dropbox, or Microsoft OneDrive, are popular for
sharing and collaborating on documents and files. When using these services, ensure that access
permissions are set appropriately to prevent unauthorized access.
Messaging services like WhatsApp, Signal, and Telegram are frequently used for quick
communication and file sharing. Many of these platforms offer end-to-end encryption, which
ensures that only the sender and recipient can read the messages. However, it is important to
verify that encryption is enabled, as some services may offer it as an optional feature. For highly
sensitive data, it may be more appropriate to use secure email or encrypted cloud storage instead
of messaging apps.
Always verify the identity of recipients before sharing sensitive information. Cybercriminals often
use social engineering tactics to impersonate trusted contacts and trick individuals into sharing
confidential data.
Encrypted instant messaging has become a vital tool for secure and private communication in
both personal and professional contexts. Unlike traditional messaging services, which may
transmit messages in plain text, encrypted messaging ensures that the content of your
conversations is protected from unauthorized access, even if intercepted during transmission.
End-to-end encryption (E2EE) is the cornerstone of secure instant messaging. It ensures that only
the sender and the intended recipient can read the contents of a message. Even the service

provider cannot access or decrypt the messages, as the encryption keys are stored only on the
devices involved in the conversation.
In addition to E2EE, some messaging apps offer features like disappearing messages and screen
security to enhance privacy. Disappearing messages automatically delete themselves after a
specified period, reducing the risk of sensitive information being stored on your device or the
recipient’s device indefinitely.
It is also important to keep your encrypted messaging apps updated to protect against
vulnerabilities and exploits that could undermine their security. Developers regularly release
updates to fix security flaws and improve encryption protocols, so keeping your apps current is
essential for maintaining the highest level of protection.
Finally, be mindful of the metadata that encrypted messaging apps can still collect, such as
information about when and with whom you communicate. While some apps such as Signal
minimize metadata collection, others may retain more information. For the highest level of
privacy, choose apps that are transparent about their data collection policies and prioritize user
security.
By using encrypted instant messaging services responsibly and understanding their security
features, you can ensure that your private conversations remain confidential and secure from
eavesdroppers and malicious actors.

Security Essentials (Version 1.0) | 025.2 Information Confidentiality and Secure Communication

## 1. Explain how non-disclosure agreements (NDAs) help protect sensitive information in business
settings. What are some limitations of NDAs?

## 2. What is the relationship between phishing, social engineering, and identity theft, and how can
individuals protect themselves from these threats?

## 3. Why is information classification important for data protection, and what are the common
classification levels?

1. Research a recent high-profile data leak or breach involving a well-known organization.
Describe how the leak occurred, what sensitive information was exposed, and the impact it had
on the company and its customers. Discuss what measures the organization implemented postbreach to improve its security and prevent future incidents.

## 2. Investigate the effectiveness of different information classification models used by
organizations, such as the U.S. government’s classification system (e.g., Confidential, Secret, Top
Secret) or commercial models (e.g., Public, Internal, Confidential, Highly Confidential).
Compare how these models help manage data security and compliance with legal standards.
Discuss the advantages and potential drawbacks of each model in different organizational
contexts.

Security Essentials (Version 1.0) | 025.2 Information Confidentiality and Secure Communication

This lesson covers various aspects of digital security, emphasizing the importance of protecting
confidential information and recognizing threats such as phishing and social engineering. It
explains how data leaks and intercepted communications can lead to financial loss, reputational
damage, and legal consequences, and highlights the role of non-disclosure agreements (NDAs) in
safeguarding sensitive information. The discussion also extends to identity theft, detailing how
attackers use stolen personal data to impersonate victims, and the tactics employed in scams and
scareware attacks that manipulate victims through fear and deception. The importance of
information classification in applying appropriate security measures and ensuring compliance
with regulations is also stressed, illustrating how organizations can protect their critical assets
effectively.

## 1. Explain how non-disclosure agreements (NDAs) help protect sensitive information in business
settings. What are some limitations of NDAs?
NDAs protect sensitive information by legally binding the parties involved to keep the shared
data confidential and not to disclose or misuse it. They outline the scope of the confidential
information, the obligations of the parties, and the consequences of breaching the agreement.
This legal framework helps ensure that sensitive data, such as trade secrets or business plans,
is not shared with unauthorized individuals or used against the company’s interests. However,
NDAs have limitations, as they cannot prevent accidental or intentional breaches by
individuals who have access to the information. Compliance requires vigilance, monitoring,
and a strong internal culture of data security.
2. What is the relationship between phishing, social engineering, and identity theft, and how can
individuals protect themselves from these threats?
Phishing and social engineering are tactics used by attackers to manipulate individuals into
revealing personal information, which can then be used for identity theft. Phishing typically
involves fraudulent email or text messages that appear to be from legitimate sources, tricking
victims into providing sensitive information like usernames and passwords. Social engineering
encompasses a broader range of tactics, such as impersonation or pretexting, to deceive
individuals into breaking security protocols. To protect themselves, individuals should be
cautious about unsolicited requests for information, avoid clicking on suspicious links, use
strong, unique passwords, enable multi-factor authentication, and regularly monitor their
accounts for suspicious activity.
3. Why is information classification important for data protection, and what are the common
classification levels?
Information classification is essential for data protection because it helps organizations
identify and apply the appropriate security measures to different types of data based on their
sensitivity. By categorizing information into levels such as public, internal, confidential, and
highly confidential, organizations can control access and ensure that sensitive data is handled
securely. For example, highly confidential information, such as trade secrets or critical
business strategies, should be stored in secure, access-controlled environments and transmitted
through encrypted channels. Proper classification also helps organizations comply with legal
and regulatory requirements, reducing the risk of data breaches and non-compliance penalties.

Security Essentials (Version 1.0) | 025.2 Information Confidentiality and Secure Communication

1. Research a recent high-profile data leak or breach involving a well-known organization.
Describe how the leak occurred, what sensitive information was exposed, and the impact it had
on the company and its customers. Discuss what measures the organization implemented postbreach to improve its security and prevent future incidents.
One example is the Facebook data breach in 2018, where the personal information of
approximately 87 million users was improperly shared with the political consulting firm
Cambridge Analytica. The breach occurred due to lax data-sharing policies, where a third-party
app collected user data and then shared it without consent. The exposed data included users'
personal details, likes, and even private messages. The impact on Facebook was severe, leading
to legal scrutiny, a significant drop in stock value, and loss of user trust. In response, Facebook
implemented stricter data-sharing policies, improved its data privacy practices, and introduced
more transparency into the ways that third-party apps access user information.
2. Investigate the effectiveness of different information classification models used by
organizations, such as the U.S. government’s classification system (e.g., Confidential, Secret, Top
Secret) or commercial models (e.g., Public, Internal, Confidential, Highly Confidential).
Compare how these models help manage data security and compliance with legal standards.
Discuss the advantages and potential drawbacks of each model in different organizational
contexts.
The U.S. government’s classification system is designed to protect national security information
by categorizing it as Confidential, Secret, or Top Secret based on the potential damage its
unauthorized disclosure could cause. This model is highly structured and effective in managing
sensitive government data, but can be complex to implement and maintain. Commercial
models, such as Public, Internal, Confidential, and Highly Confidential, are more flexible and
easier to apply across various industries. They help businesses protect sensitive information
and comply with regulations like GDPR or CCPA. However, if not properly managed, these
models can lead to inconsistencies in data handling and insufficient protection of critical
assets.

### 025.3 Privacy Protection
Security Essentials version 1.0, Exam 020, Objective 025.3
- Understanding of the importance of personal information
- Understanding of how personal information can be used for a malicious purpose
- Understanding of the concepts of information gathering, profiling, and user tracking
- Managing profile privacy settings on social media platforms and online services
- Understanding of the risk of publishing personal information
- Understanding of the rights regarding personal information (e.g. GDPR)
- Stalking and cybermobbing
- HTTP cookies, browser fingerprinting, user tracking
- Script blockers and ad blockers in web browsers
- Profiles in online services and social media
- Contacts and privacy settings in social media

## 025. Identity and Privacy

### 025.3 Privacy Protection

The vast amount of data shared across online services and social media platforms makes it easier
for cybercriminals to exploit vulnerabilities and access sensitive information. Many people
unknowingly share personal details that can be used against them, such as their location, contact
information, or even financial data. This exposure can lead to serious consequences, including
identity theft, financial loss, and unauthorized access to personal and professional accounts.
Maintaining the confidentiality of personal information requires being proactive in managing
how and where your data is shared. This involves configuring privacy settings on social media
accounts and other online services to limit what is visible to others.
Equally important is being aware of how information is gathered, profiled, and tracked online.
Techniques like HTTP cookies, browser fingerprinting, and user tracking are commonly used by
websites and advertisers to build detailed profiles of users. Recognizing these tracking methods
and knowing how to mitigate them — by using privacy-focused browsers, disabling third-party
cookies, or employing tracking protection tools — can help maintain your anonymity and protect
your personal information.

This lesson will guide you through the essential steps for managing your privacy settings
effectively, understanding the risks associated with personal data exposure, and navigating the
complexities of online information gathering and user tracking.

The Importance of Personal Information
Personal information encompasses any data that can be used to identify or learn more about an
individual. This includes names, addresses, phone numbers, email addresses, social security
numbers, financial details, and even online behaviors such as browsing history and social media
activity. While sharing some personal information is necessary to use online services or engage in
everyday activities, understanding its significance and the potential consequences of its misuse is
crucial for maintaining privacy and security.
Personal information is valuable not only to individuals but also to businesses, governments, and
cybercriminals. Companies use personal data for marketing purposes, tailoring advertisements,
and improving user experiences. However, this data can also be collected, shared, or sold without
the individual’s consent, leading to privacy concerns. Governments use personal information for
administrative and security purposes, but it can also be misused for surveillance or to control and
manipulate populations. Cybercriminals, on the other hand, see personal information as a
lucrative target for committing fraud, identity theft, and other malicious activities. This can lead
to financial losses, damaged credit ratings, and a long, stressful process of reclaiming one’s
identity and securing affected accounts. Beyond financial harm, personal information can be
exploited for stalking, cyberbullying, and harassment, putting individuals at risk both online and
in their personal lives.
Another aspect is the potential risks associated with data breaches and leaks. Data breaches occur
when sensitive information is exposed due to security flaws or cyberattacks. Such incidents can
lead to the unauthorized access of personal details, resulting in identity theft, financial fraud, and
other serious consequences. Keeping software and systems updated, using strong and unique
passwords, and enabling multi-factor authentication are some of the practices that can help
mitigate the risk of data breaches.
To protect personal information, it is essential to understand how it is collected, stored, and used
by different entities. When signing up for online services, individuals should review privacy
policies and be mindful of what data they are agreeing to share.

The Risk of Publishing Personal Information
One of the primary risks associated with publishing personal information is identity theft.
Cybercriminals can use details like your name, date of birth, or address to impersonate you,

gaining access to your financial accounts, credit, or even government services. With enough
information, they can apply for credit cards or loans and make fraudulent purchases in your
name, leading to financial loss and a damaged credit score. The consequences of identity theft can
be long-lasting, requiring significant time and effort to resolve and restore your financial
standing.
In addition to financial fraud, personal information shared online can make you vulnerable to
phishing attacks. Phishers often use personal details to craft convincing emails or messages that
appear to be from legitimate sources, such as your bank, employer, or a government agency.
These messages typically aim to trick you into providing more sensitive information, such as
passwords or account numbers, or to download malicious software onto your devices. The more
information attackers have, the easier it is to create a convincing scam that could lead to serious
security breaches.
Personal information can also be exploited for stalking and harassment, both online and in real
life. Sharing your location, travel plans, or even your daily routines can expose you to unwanted
attention or make you an easy target for those with malicious intentions. Cyberstalkers may use
this information to track your movements, intimidate you, or spread misinformation about you.
This can escalate into real-world confrontations, putting your physical safety at risk. Even
seemingly innocuous information, such as the names of your family members or the schools you
attended, can be used to build a profile of you that stalkers and harassers can exploit.
Malicious individuals can use information from social media to engage in cyberbullying (or
cybermobbing), causing severe impacts on the mental and emotional health of their victims.
Cyberbullying refers to repeated and intentional attacks, such as insults, humiliation, and threats,
carried out through digital platforms like social networks and messaging apps, often using fake
profiles to hide the perpetrator’s identity.
There are platforms, often found on the dark web, that aggregate stolen personal data and sell it
to cybercriminals. These platforms, known as “data brokers” or “underground marketplaces,”
compile information from data breaches, phishing attacks, and other illicit activities, creating
extensive databases that include everything from email addresses and passwords to social
security numbers, credit card details, and even medical records. Cybercriminals can purchase
these datasets to commit identity theft, financial fraud, or other malicious activities.
Furthermore, once personal information is published online, it is challenging to remove or control
its spread. Even if you delete a post or account, copies of your information can persist on other
websites, in search engine caches, or on someone else’s device.
To mitigate these risks, it is essential to think carefully before publishing personal information
online. Limit the amount of personal data shared on social media platforms, and use privacy

settings to control who can see your posts and profile details.

Rights Regarding Personal Information — GDPR
With the increasing use of digital platforms for personal and professional activities, the protection
of personal information has become a critical issue globally. Various laws and regulations have
been enacted to give individuals greater control over their personal data and to ensure that
organizations handle this data responsibly. One of the most comprehensive and influential of
these regulations is the General Data Protection Regulation (GDPR) in the European Union, which
sets a high standard for data privacy and security. Understanding your rights regarding personal
information under regulations like the GDPR is essential for protecting your privacy and ensuring
that your data is handled appropriately.
The GDPR, which came into effect in May 2018, is designed to protect the personal data of EU
citizens and residents by regulating how organizations collect, store, and process such
information. It applies to any organization, regardless of location, that processes the personal data
of individuals in the EU. This means that even companies based outside the EU must comply with
the GDPR if they handle the data of EU residents.
One of the fundamental rights under the GDPR is the right to be informed. This means that
individuals have the right to know what personal data is being collected, how it is being used, who
it is shared with, and how long it will be retained. Organizations are required to provide clear and
transparent information about their data processing activities, typically through privacy policies
or notices.
Another key right is the right of access, which allows individuals to request a copy of their
personal data held by an organization. This enables people to see what information is being stored
and verify that it is accurate and being processed in accordance with the law. In addition to
access, individuals also have the right to rectification, which allows them to request corrections to
inaccurate or incomplete data.
The GDPR also provides the right to erasure, commonly known as the “right to be forgotten.” This
allows individuals to request the deletion of their personal data in certain circumstances, such as
when the data is no longer necessary for the purpose it was collected, or if they withdraw their
consent. However, this right is not absolute and can be subject to limitations, such as when the
data is needed for legal obligations or public interest purposes.
The right to restrict processing allows individuals to limit how their data is used. For example, if a
person disputes the accuracy of their data, they can request that its use be restricted until the
issue is resolved. Similarly, the right to object enables individuals to object to the processing of
their personal data for specific purposes, such as direct marketing or profiling.

Another significant aspect of the GDPR is the right to data portability. This right allows individuals
to obtain their personal data in a structured, commonly used, and machine-readable format and
to transfer it to another organization. This can be particularly useful when switching service
providers or consolidating data from different platforms.
Beyond these rights, the GDPR also requires organizations to implement appropriate security
measures to protect personal data and to report data breaches to the relevant authorities and
affected individuals within 72 hours of discovery. This ensures a high level of accountability and
responsiveness in the event of a data security incident.
While the GDPR is specific to the European Union, its influence has led to the adoption of similar
data protection regulations around the world. For example, the California Consumer Privacy Act
(CCPA) provides similar rights to residents of California, including the right to know what
personal data is being collected and the right to request its deletion. Other jurisdictions are
following suit with their own data protection laws, reflecting a global trend toward stronger data
privacy rights.
Understanding your rights under these regulations is crucial for maintaining control over your
personal information. If you feel that your data rights have been violated, you have the right to
lodge a complaint with the relevant data protection authority in your country.

Information Gathering, Profiling, and User Tracking
Information gathering, profiling, and user tracking are used by websites, advertisers, and
sometimes malicious entities to collect and analyze data about users' online activities. These
techniques help build detailed profiles that can be used for various purposes, such as personalized
advertising, enhancing user experiences, or, in some cases, manipulating behavior and invading
privacy.
HTTP cookies are one of the most common tools for tracking user activity. Cookies are small text
files stored on a user’s device by websites they visit. They can remember login details, track items
in a shopping cart, or store user preferences. Although cookies are essential for enabling certain
services, such as remembering a user’s language settings or login status, they also pose privacy
concerns. Third-party cookies, set by domains other than the one the user is visiting, are often
used by advertisers to track users across different websites, creating a comprehensive view of
their browsing habits and preferences. This data can then be used to serve targeted
advertisements or even be sold to other entities for further analysis.
Browser fingerprinting is a more sophisticated tracking technique that collects various data points
about a user’s browser and device configuration. Information such as screen resolution, installed
fonts, browser plugins, and operating system details can be combined to create a unique

identifier, or “fingerprint,” for each user. Unlike cookies, which can be deleted or blocked,
fingerprints are more challenging to evade because they do not rely on stored data on the user’s
device. This method allows trackers to identify and follow users across different websites without
needing explicit consent, raising significant privacy concerns.
User tracking encompasses a broad range of ways to monitor and analyze online behavior.
Beyond cookies and fingerprinting, user tracking can include techniques such as tracking pixels,
which are tiny, invisible images embedded in web pages or email messages. When a user loads a
page or opens an email message containing a tracking pixel, it sends information back to the
tracker, such as the user’s IP address, the device type, and the exact time the content was viewed.
This data can be used to monitor user engagement, track conversions for marketing campaigns, or
compile data for further profiling.
The information gathered through these tracking methods can be used to create detailed profiles
of individual users, including their interests, their habits, and even their social and economic
status. These profiles are valuable for advertisers seeking to deliver highly targeted ads, but they
also raise ethical and privacy issues. For example, such detailed profiles can be used to influence
user behavior, limit access to content, or even discriminate based on perceived characteristics.
Understanding these concepts is crucial for individuals who want to protect their privacy online.
Users can take steps such as clearing cookies regularly, using privacy-focused browsers or
extensions that block trackers, and employing virtual private networks (VPNs) to mask their
online activities.
Overall, while information gathering, profiling, and user tracking can enhance online experiences
and services, they also pose significant risks to personal privacy.

Managing Profile Privacy Settings
Maintaining privacy on social media platforms and online services is essential for protecting
personal information from unwanted access. Managing profile privacy settings effectively helps
control who can see your personal details, posts, and activities, reducing the risk of misuse by
malicious actors or even unwanted contact from strangers.
Each platform typically offers a range of settings that allow users to determine what information
is visible to the public, to friends, or to selected contacts only. For instance, on Facebook, you can
choose to make your posts visible only to friends or even to a custom list of people, while on
LinkedIn, you can control who sees your connections or profile updates. Regularly reviewing and
updating these settings is crucial, as platforms often update their privacy policies and settings,
sometimes defaulting to more public options without clear notification to users.

Profiles in Online Services and Social Media
Profiles in online services and social media act as digital representations of users, containing
personal information such as names, photos, contact details, and interests. These profiles can be
used to connect with others, share content, and participate in various online activities. However,
they can also become sources of information for cybercriminals looking to steal identities or
perform targeted attacks. Users should be mindful of the details they share in their profiles and
consider the potential implications if this information were to fall into the wrong hands. For
example, sharing too much personal information, such as your workplace or daily routine, can
make you vulnerable to phishing attacks or even real-world threats. It’s wise to limit the amount
of personal data visible on your profile and ensure that sensitive information, like your home
address or phone number, is kept private.
Managing contacts and privacy settings is a fundamental part of securing your social media
experience. Platforms like Facebook, Instagram, and LinkedIn allow users to categorize their
contacts into different groups, such as friends, family, and acquaintances, and to customize
privacy settings for each group. This means you can share certain posts with close friends while
keeping them hidden from professional contacts or the general public. Additionally, many
platforms allow you to block or mute contacts who may be harassing or spamming you. Being
selective about who you accept as contacts and reviewing your privacy settings regularly can help
prevent unauthorized access to your personal information and ensure a safer, more enjoyable
social media experience.
Script blockers and ad blockers are tools that help protect your privacy and improve your
browsing experience by preventing the browser from loading unwanted content from websites.
Script blockers, such as NoScript or uMatrix, allow users to control which scripts are allowed to
run on the sites they visit. This can prevent the execution of malicious scripts, which could
otherwise track your activity, steal your data, or inject malware into your system. By disabling
unnecessary scripts, users can also enhance their security and reduce page load times.
Ad blockers, like AdBlock Plus or uBlock Origin, prevent advertisements from being displayed on
web pages. While ads are primarily used for marketing, they can also be sources of tracking and
data collection. Many ads contain trackers that monitor user behavior across multiple sites,
creating detailed profiles of browsing habits. Blocking these ads not only reduces visual clutter
and speeds up browsing but also minimizes the amount of data collected about you. Furthermore,
ad blockers can prevent you from being exposed to malicious ads (malvertising) that can lead to
visiting harmful websites or downloading malware onto your device.
The previously mentioned script blockers and ad blockers are available as extensions for the
Google Chrome, Firefox, and Opera browsers, and their source code is also available on the public
GitHub code repository.

## 1. Describe how managing privacy settings on social media platforms can help protect your
personal information from unauthorized access. Include specific examples of settings you
would use on platforms like Facebook or LinkedIn and explain their importance in
maintaining privacy.

2. Explain how script blockers and ad blockers can enhance your online privacy and security.
Discuss the difference between the two types of tools and provide examples of how each can be
used effectively while browsing the internet.

1. Research and compare the privacy settings available on two different social media platforms.
Identify at least three key differences in how each platform allows users to manage their
personal information and control who can view their content. Explain how these differences
might affect your decision about what type of personal information to share on each platform.

Understanding the importance of confidentiality is essential for safeguarding personal data from
unauthorized access and misuse. This involves not only being vigilant about how personal
information is shared but also effectively managing privacy settings across various online services
and social media platforms. Many people unknowingly expose sensitive information through
their digital activities, making them vulnerable to threats such as identity theft, phishing attacks,
and social engineering. By learning how to navigate privacy settings and recognizing common
security threats, individuals can take proactive steps to protect their personal data and maintain
control over their digital identity.
