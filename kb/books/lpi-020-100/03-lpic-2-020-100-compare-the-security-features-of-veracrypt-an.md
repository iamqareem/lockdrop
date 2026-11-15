---
id: lpi-020-100-03
title: "LPIC-2 · 020-100 — Compare the security features of VeraCrypt and BitLocker. What…"
slug: lpi-020-100-03-lpic-2-020-100-compare-the-security-features-of-veracrypt-an
source: "LPI Learning Material — LPIC-2 (Exam 020-100)"
sourceSection: "4. Compare the security features of VeraCrypt and BitLocker. What are the key differences in how, 1. BitLocker offers encryption for Windows users, but not all users may want to depend on a, 2. Explain how cloud storage providers, such as Google Drive and Dropbox, implement, 1. Explain the main diff"
track: linux-engineer
tier: free
tags: [linux, lpic-2, certification, security]
summary: "Cryptomator. Covers 23 sections: Compare the security features of VeraCrypt and BitLocker. What are the key differences in how, BitLocker offers encrypti."
---
# LPIC-2 · 020-100 — Compare the security features of VeraCrypt and BitLocker. What…

## 4. Compare the security features of VeraCrypt and BitLocker. What are the key differences in how
they handle full-disk encryption, and in what scenarios would you prefer one over the other?

## 1. BitLocker offers encryption for Windows users, but not all users may want to depend on a
proprietary solution. Research open source alternatives to BitLocker, such as LUKS and
eCryptfs, commonly used in Linux systems. Compare these tools in terms of encryption
strength, ease of use, and key recovery mechanisms. Which would you recommend for a user
seeking a flexible and transparent encryption solution, and why?

## 2. Explain how cloud storage providers, such as Google Drive and Dropbox, implement
encryption for files stored in the cloud. Compare this with the encryption provided by
Cryptomator. What are the advantages of using Cryptomator alongside these services?

This lesson highlights the importance of protecting data at rest, emphasizing file and storage
device encryption to ensure data confidentiality and security. It delves into the essential concepts
of encryption, covering file encryption, storage device encryption, and full-disk encryption (FDE).
The lesson explains how these methods convert readable data into unreadable formats that can be
accessed only by authorized users with the proper decryption keys. This protection applies to both
local devices and cloud storage, ensuring data security in case of theft or loss.
The lesson also explores VeraCrypt, a tool for creating encrypted containers and full-disk
encryption, alongside Cryptomator, which secures files stored in cloud services. Finally, BitLocker
is discussed, highlighting features such as full-disk encryption and integration with TPM for
secure key storage.

## 1. Explain the main difference between file encryption and full-disk encryption (FDE).
File encryption secures individual files, ensuring that only authorized users with the correct
decryption key or password can access them. Full-disk encryption (FDE), on the other hand,
encrypts the entire storage device, including the operating system, making all data on the
device inaccessible without authentication. FDE protects everything on the device, while file
encryption targets specific files.
2. What is the role of a Trusted Platform Module (TPM) in BitLocker encryption?
In BitLocker encryption, the Trusted Platform Module (TPM) is a hardware-based security
component that stores encryption keys in a secure environment. It enhances security by
ensuring that encryption keys are isolated from the operating system, and it can automatically
unlock encrypted drives during boot-up as long as the system’s integrity has not been
compromised.
3. How does Cryptomator ensure that files stored in cloud services remain secure?
Cryptomator encrypts files locally before they are uploaded to cloud storage services. It creates
an encrypted vault where files are stored securely, and once these files are uploaded, they
appear as encrypted blobs in the cloud storage. This ensures that even if the cloud service is
compromised, unauthorized users cannot read the encrypted files.
4. Compare the security features of VeraCrypt and BitLocker. What are the key differences in how
they handle full-disk encryption, and in what scenarios would you prefer one over the other?
VeraCrypt is an open source tool that offers cross-platform full-disk encryption and allows
users to create encrypted containers. It provides more customization options and transparency
because it is open source. BitLocker, on the other hand, is integrated with Windows and offers
seamless management with the Trusted Platform Module (TPM), which adds hardware-based
security. BitLocker is generally preferred for enterprise environments due to its ease of
integration and management through Active Directory, while VeraCrypt may be preferred for
users who want open source software with broader platform support.

## 1. BitLocker offers encryption for Windows users, but not all users may want to depend on a
proprietary solution. Research open-source alternatives to BitLocker, such as LUKS and
eCryptfs, commonly used in Linux systems. Compare these tools in terms of encryption
strength, ease of use, and key recovery mechanisms. Which would you recommend for a user
seeking a flexible and transparent encryption solution, and why?
LUKS (Linux Unified Key Setup) and eCryptfs both offer strong encryption. LUKS, the standard
for Linux, provides robust encryption and supports multiple keys per partition. eCryptfs is
more user-friendly but may not be as versatile for disk-wide encryption. Based on research,
LUKS would be the recommended tool for its flexibility and compatibility with various Linux
distributions, as well as its ability to encrypt entire drives.
2. Explain how cloud storage providers, such as Google Drive and Dropbox, implement
encryption for files stored in the cloud. Compare this with the encryption provided by
Cryptomator. What are the advantages of using Cryptomator alongside these services?
Cloud storage providers such as Google Drive and Dropbox typically offer server-side
encryption, where data is encrypted at rest and in transit using keys managed by the provider.
However, they still hold control over the encryption keys, meaning they could potentially
access your files or share them if required by law. Cryptomator, in contrast, provides clientside encryption, meaning the user encrypts files locally before they are uploaded. Only the user
has the decryption keys, offering more privacy and security. The advantage of using
Cryptomator with these services is that it ensures that data remains unreadable even if the
cloud provider is compromised or has to share data with third parties.

## Topic 023: Device and Storage Security

### 023.1 Hardware Security
Security Essentials version 1.0, Exam 020, Objective 023.1
- Understanding of the major components of a computer
- Understanding of the smart devices and the Internet of Things (IoT)
- Understanding of the security implications of physical access to a computer
- Understanding of USB devices devices types, connections, and security aspects
- Understanding of Bluetooth devices types, connections, and security aspects
- Understanding of RFID devices types, connections, and security aspects
- Awareness of Trusted Computing
- Processors, memory, storage, network adapters
- Tablets, smartphones, smart tvs, routers, printers smart home, alarm, IoT devices (e.g. light
bulbs, thermostats, TVs)
- USB
- Bluetooth
- RFID

### 023.1 Hardware Security

Cybersecurity is no longer limited to software vulnerabilities or network breaches. Hardware
security plays a critical role in ensuring the overall protection of computer systems. A
foundational knowledge of hardware security is crucial for identifying and mitigating risks that
can compromise the integrity and confidentiality of computer systems.

Major Components of a Computer
Understanding the major components of a computer is fundamental to grasping how security
vulnerabilities can emerge at the hardware level. Every computer system is composed of several
key elements that work together to perform tasks and manage data, and each of these components
presents its own security challenges.
At the heart of any computer is the processor (Central Processing Unit, or CPU), which is
responsible for executing instructions and performing calculations. As the brain of the system, the
CPU’s performance and security are crucial. Vulnerabilities in a processor can lead to exploits
such as side-channel attacks, where attackers may gain access to sensitive data by monitoring the
behavior of the CPU during its operations.

The memory of a computer, primarily referred to as Random Access Memory (RAM), is another
critical component. RAM temporarily stores data and instructions that the CPU needs to access
quickly. However, since RAM is volatile and loses its data when the power is turned off, it can
become a target for attacks such as cold boot attacks, where an attacker might attempt to retrieve
sensitive data after a system shutdown.
Storage devices, such as hard drives and solid-state drives (SSD), are responsible for the permanent
retention of data. They store everything from the operating system and applications to personal
files and sensitive information. Unlike RAM, storage retains its data even after a system is
powered off, which makes it a prime target for attacks. Encryption of storage devices and secure
erasure practices are essential to protect data from unauthorized access, especially in cases of
theft or loss.
Finally, network adapters enable the computer to connect to local networks and the internet,
facilitating data transmission between devices. These adapters are pivotal for communication, but
they also open up numerous security vulnerabilities, such as potential exposure to man-in-themiddle attacks, packet sniffing, or unauthorized access through poorly secured networks.

Smart Devices and the Internet of Things (IoT)
Understanding smart devices and the Internet of Things (IoT) is critical for recognizing the
potential security risks posed by the rapid proliferation of interconnected devices. Unlike
traditional computers, IoT devices often blend into everyday environments, from homes and
offices to public spaces, creating new vulnerabilities that can be exploited if the devices are not
properly secured.
Smart devices, such as tablets, smartphones, and smart TVs, are at the forefront of personal and
professional digital interaction. These devices have evolved into powerful tools capable of
running complex applications, storing sensitive data, and connecting to a variety of networks.
However, their widespread use also makes them prime targets for cyberattacks.
The expansion of IoT has also introduced a range of smart home devices, such as thermostats,
light bulbs, cameras, and voice assistants. While these devices offer convenience and automation,
they also present unique security challenges. Most IoT devices are designed to be “plug and play,”
meaning they are simple to install but often lack strong built-in security protocols. For instance,
many IoT devices are shipped with default usernames and passwords, which users may neglect to
change, leaving the devices vulnerable to attacks such as botnets or unauthorized control. Devices
such as routers, which serve as gateways between IoT systems and the internet, need to be
properly configured with strong passwords, encryption, and network segmentation to prevent
unauthorized access.

In the case of smart TVs, printers, and routers, the risks extend beyond just device hijacking.
Regular patching, disabling unused features, and monitoring for abnormal activity can help
mitigate these risks.

Security Implications of Physical Access to a Computer
When considering cybersecurity, it is essential to recognize that physical access to a computer can
significantly undermine even the most robust digital defenses. A system that is physically
accessible to unauthorized individuals is vulnerable to a variety of direct attacks, many of which
bypass traditional software-based security measures.
One of the most direct risks associated with physical access is the ability to tamper with hardware
components. An attacker with physical access can manipulate key hardware elements, such as
replacing or modifying the system’s hard drive, adding malicious devices like keyloggers, or
installing unauthorized hardware to intercept communications or data transfers.
Another critical risk arises from physical access to the system’s data. Even if data is encrypted, an
attacker who gains physical access to a device can potentially extract or copy storage media to
attempt decryption later.
Physical access can also lead to an attacker booting the system from external media, such as a USB
drive or CD. By doing this, the attacker may bypass the system’s operating system and security
mechanisms entirely, gaining access to files, passwords, and other sensitive information without
having to crack the system’s existing login credentials. This type of attack highlights the
importance of configuring BIOS (Basic Input/Output System) or UEFI (Unified Extensible Firmware
Interface) settings to disable booting from external devices and to ensure that such settings are
password-protected. Additionally, configuring a password in the boot manager, such as GRUB,
adds an extra layer of security, making it harder for an attacker to bypass the operating system
security controls.

USB
Understanding Universal Serial Bus (USB) devices — their types, connections, and security
aspects — is essential, due to their ubiquity in modern computing. USB devices are used for a wide
range of purposes, from storage to peripheral connectivity, making them a common part of
everyday interactions with computers and networks. However, their convenience also introduces
security risks that must be managed carefully.
USB devices come in several types, including USB-A, USB-B, and USB-C, each designed for different
use cases. USB-A is the most common type, found in most computers for connecting peripherals
such as keyboards, mice, and storage devices. USB-B is often used for larger devices, like printers

or external hard drives, and USB-C is a newer standard, known for its smaller, reversible design
and faster data transfer speeds.
In addition to the physical connectors, there are different USB versions that serve distinct
purposes. USB 2.0, 3.0, and 3.1, for example, vary in terms of data transfer speeds, with USB 3.1
offering significantly faster performance than USB 2.0. Faster data transfer can benefit
performance, but it also means that malicious data can be transferred more quickly, posing a
security risk.
From a security aspect, USB devices are prone to a number of attacks and vulnerabilities. One of
the most common threats is the use of malicious USB devices. Attackers can use USB drives loaded
with malware to compromise systems when the device is plugged into a computer. These attacks
can occur through techniques like auto-executing malicious files or exploiting vulnerabilities in
the operating system’s handling of USB connections.
USB devices are also often used for data exfiltration, where sensitive data is copied onto a USB
drive and removed from a secured environment. This type of attack can be perpetrated by
malicious insiders or external attackers who gain physical access to the system. Implementing
USB port controls or disabling ports entirely is a common practice to prevent unauthorized
devices from being connected.
To mitigate the security risks associated with USB devices, it’s crucial to implement several best
practices. Encrypting data on USB drives is essential, especially when handling sensitive
information. Additionally, the use of trusted devices only, ensuring that all USB devices come from
reliable sources, helps to reduce the likelihood of malicious attacks. Finally, organizations should
enforce policies that limit the use of USB devices in high-security environments and educate
employees about the potential dangers of connecting unknown devices.

Bluetooth
Bluetooth technology supports multiple types of devices across different industries. The most
common types of Bluetooth devices include personal gadgets like smartphones, tablets, wireless
earbuds, and smartwatches. These devices communicate with each other over short distances,
making Bluetooth an essential technology for creating wireless ecosystems in both personal and
professional settings. In addition to consumer electronics, Bluetooth is also used in medical
devices, automotive systems, and industrial equipment, where reliable wireless communication is
essential. Understanding the types of Bluetooth devices and their applications is important for
recognizing the security implications that come with them.
Bluetooth devices operate using different connections, primarily classified into Bluetooth Classic
and Bluetooth Low Energy (BLE). Bluetooth Classic is used for devices requiring continuous, high-

speed connections, such as streaming audio to wireless speakers or transferring large files
between phones and computers. BLE, on the other hand, is optimized for devices that need
intermittent communication with low power consumption, making it ideal for IoT devices, fitness
trackers, and smart home gadgets. Each connection type comes with its own set of security
challenges. For instance, Bluetooth Classic may be more vulnerable to eavesdropping during data
transfer, while BLE devices, due to their lighter weight, may lack advanced security mechanisms.
From a security aspect, Bluetooth devices are prone to various attacks. One of the most common
threats is bluejacking, where an attacker sends unsolicited messages or files to a Bluetoothenabled device within range. While this may seem harmless, it can lead to phishing attacks or the
spreading of malicious links. Another risk is bluesnarfing, a more serious attack where an attacker
gains unauthorized access to a device’s data, such as contacts, messages, or other sensitive
information, without the user’s consent.
A more severe attack is Bluetooth device impersonation, a variant of the man-in-the-middle attack.
In this scenario, an attacker intercepts the communication between two Bluetooth devices,
pretending to be one of the parties. This allows the attacker to access, manipulate, or steal data
being transmitted between the devices. Given Bluetooth’s range of approximately ten meters,
these attacks typically occur in close proximity, making them a significant threat in public spaces
like airports, cafes, and offices.
Another major vulnerability in Bluetooth connections is related to pairing. When devices are
paired, they exchange security keys to establish a secure connection. However, if the pairing
process is not properly protected, attackers can intercept or manipulate these keys, gaining
unauthorized access to the devices. Public pairing, where devices are paired in open or unsecured
environments, is particularly vulnerable to this type of attack. Ensuring the use of secure pairing
methods, such as passkey authentication, can mitigate this risk.
To protect against these risks, it’s important to follow best practices for securing Bluetooth
devices. First and foremost, disabling Bluetooth when it is not in use is an effective way to prevent
unauthorized access.
For organizations, monitoring Bluetooth activity on corporate devices is a necessary step in
preventing unauthorized access to sensitive data. By restricting the use of Bluetooth in secure
environments and deploying tools that monitor wireless communications, businesses can
minimize the potential risks associated with Bluetooth devices. Similarly, educating employees
about the importance of securing their personal Bluetooth devices in public spaces helps reduce
exposure to attacks.

RFID
Understanding Radio Frequency Identification (RFID) devices — their types, connections, and
security aspects — is essential, because RFID technology is widely used in industries such as retail,
healthcare, logistics, and access control. RFID devices facilitate the wireless transfer of data
between a tag and a reader, using radio waves to identify and track objects or individuals. While
RFID offers many advantages in terms of efficiency and automation, it also introduces security
risks that must be addressed.
RFID devices can be classified into three primary types: passive, active, and semi-passive. Passive
RFID tags do not have an internal power source; they rely on the energy transmitted by the RFID
reader to power up and send back their data. This type of RFID is commonly used in inventory
management, retail tracking, and access control. Active RFID tags have an internal battery and
can transmit signals over longer distances. These are often used where real-time tracking of highvalue assets or vehicles is required, such as in logistics or warehouse operations. Semi-passive
RFID tags also have a battery, but use it only to power internal circuits; they still rely on the RFID
reader for communication. This type is used when a more reliable read is needed, especially in
environments with a lot of interference.
Connections between RFID devices are established wirelessly. The RFID reader emits radio waves,
which activate the tag within its range. The tag then sends data back to the reader, which
processes it and transmits it to a computer system for interpretation. Depending on the frequency
used, RFID connections can range from a few centimeters to several meters. The most common
frequency ranges include low frequency (LF), high frequency (HF), and ultra-high frequency (UHF).
LF is typically used for short-range, low-data applications like animal tracking, while HF is used in
proximity cards and NFC-enabled devices. UHF is the most common type for industrial and
logistical applications due to its longer range and ability to transmit larger amounts of data.
When considering the security aspects of RFID devices, several potential vulnerabilities arise. One
of the most well-known risks is eavesdropping. Because RFID communications occur wirelessly,
an attacker with a suitable receiver can intercept the signals transmitted between the tag and the
reader, allowing them to capture sensitive information such as credit card numbers or personal
identification data. This is particularly concerning in applications such as contactless payment
systems, where unauthorized access to financial information can result in fraud.
Another common security threat is cloning. In a cloning attack, an attacker duplicates an RFID
tag’s data and creates a new tag with the same information. This cloned tag can then be used to
gain unauthorized access to restricted areas or systems, particularly in environments where RFID
is used for access control.
RFID skimming is another attack method, where an attacker reads data from a tag without the

owner’s knowledge or consent. Skimming devices are often small and portable, allowing attackers
to read RFID tags in crowded spaces, such as public transportation or shopping centers, without
being detected. This risk is especially significant for RFID-enabled credit cards and identification
documents, which can be exploited for identity theft or financial fraud.
To mitigate these risks, several security measures should be employed. One of the most important
steps is to encrypt the data transmitted between RFID tags and readers. This ensures that even if
the data is intercepted, it cannot be easily read or used by an attacker.
Another effective security measure is the use of RFID shields or Faraday cages to block RFID
signals when the tags are not in use. These shields are often used in wallets or cardholders to
protect RFID-enabled credit cards or identification documents from being skimmed.
Lastly, it is critical to regularly update and monitor RFID systems. Just like any other technology,
RFID devices and readers should be kept up to date with the latest security patches. Monitoring
RFID activity, especially in sensitive environments like warehouses, healthcare facilities, and
secure buildings, helps to detect unusual behavior or unauthorized access attempts in real time.

Trusted Computing
Trusted Computing is a set of technologies and standards that enhance the security of computer
systems by ensuring that they operate in a reliable and predictable manner. The core idea behind
Trusted Computing is to create a computing environment where users can have confidence that
their devices are secure from tampering, unauthorized access, and malware. The main technology
enabling this is the Trusted Platform Module (TPM), a specialized hardware component integrated
into modern devices, which plays a critical role in securing the system at its foundation.
One of the most important functions of Trusted Computing is secure boot. Secure boot ensures that
the system starts using only software that is verified and trusted. During the boot process, each
component, from the firmware to the operating system, is checked against a cryptographic
signature. If any part of the software has been tampered with or replaced with malicious code, the
system will refuse to boot.
Trusted Computing also enables remote attestation, which allows a device to prove to a remote
party that it is in a trusted state. For example, in a cloud computing scenario, a remote server can
use attestation to confirm that a client device or virtual machine is running a trusted version of
software before granting access to sensitive resources.
In addition to protecting system integrity and ensuring secure boot processes, Trusted Computing
plays a crucial role in securing sensitive data through data encryption. The TPM can generate and
manage encryption keys, ensuring that the keys never leave the secure hardware environment.

Trusted Computing is a powerful approach to securing modern computing systems, providing
mechanisms to ensure that devices and software are trustworthy and free from tampering.

## 1. Explain potential security vulnerabilities of the processor, memory (RAM), storage devices, and
network adapters. For each component, provide a real-world example of a security threat and
suggest a strategy or solution to mitigate the risk.

## 2. Describe three common security risks associated with IoT devices. Additionally, explain two
best practices to mitigate these risks. Finally, discuss how Trusted Computing and the Trusted
Platform Module (TPM) can enhance the security of IoT devices.

## 1. Research how different operating systems, such as Windows, Linux, and macOS, implement
secure boot mechanisms.

2. Research a real-world example of an IoT botnet attack, such as the Mirai botnet.

This lesson highlights key aspects of hardware and device security, focusing on the major
components of computers, smart devices, IoT, USB, Bluetooth, RFID, and Trusted Computing. Each
of these technologies presents unique security challenges, from processor vulnerabilities and
unauthorized storage accesses to the risks associated with smart and IoT devices, which are often
poorly secured. Additionally, USB and Bluetooth devices are susceptible to malware injections,
unauthorized data transfers, and man-in-the-middle attacks, while RFID systems face risks such as
cloning and skimming. Trusted Computing, through the use of technologies such as the Trusted
Platform Module (TPM), helps ensure system integrity, secure boot processes, and protect data.

## 1. Explain potential security vulnerabilities of the processor, memory (RAM), storage devices, and
network adapters. For each component, provide a real-world example of a security threat and
suggest a strategy or solution to mitigate the risk.
Processors are vulnerable to side-channel attacks, where an attacker can extract sensitive data
by analyzing the processor’s behavior. These attacks can be mitigated by applying hardware
patches and updating system firmware. Memory (RAM) faces risks like cold boot attacks, where
data is retrieved after shutdown. This can be mitigated by using memory encryption and
clearing RAM upon shutdown. Storage devices, such as hard drives and SSDs, are susceptible to
data theft, particularly when data is not encrypted. Full-disk encryption and secure erasure
practices are key to protecting storage data. Network adapters can be exploited in man-in-themiddle attacks or through packet sniffing, where data transmitted over networks is
intercepted. Encrypting communications and enabling firewalls are effective methods of
preventing these types of attacks.
2. Describe three common security risks associated with IoT devices. Additionally, explain two
best practices to mitigate these risks. Finally, discuss how Trusted Computing and the Trusted
Platform Module (TPM) can enhance the security of IoT devices.
IoT devices face security risks, including unauthorized access due to the preservation of default
credentials, botnet attacks that use compromised devices in large-scale DDoS attacks, and data
privacy breaches caused by insecure data transmissions. To mitigate these risks, it’s important
to change default usernames and passwords on IoT devices and regularly update their
firmware to patch vulnerabilities. Trusted Computing, particularly through the use of the
Trusted Platform Module (TPM), helps secure IoT devices by ensuring they boot only trusted
software and by securely storing cryptographic keys, thus protecting sensitive data and
enabling secure remote attestation.

## 1. Research how different operating systems, such as Windows, Linux, and macOS, implement
secure boot mechanisms.
Secure boot mechanisms vary across operating systems, but generally rely on hardware
components like TPM or UEFI to verify the integrity of the boot process. In Windows, Secure
Boot uses UEFI to ensure that only trusted software is loaded during startup, employing the
TPM to store cryptographic keys for authentication. This approach is particularly effective in
enterprise environments, protecting against unauthorized boot loaders and rootkits. Linux
distributions, such as Ubuntu, also support Secure Boot using UEFI, although the
implementation can differ depending on the distribution. Linux users may need to manually
configure Secure Boot settings for compatibility with certain drivers or custom kernels. macOS
uses a similar approach with its Secure Boot feature, which is tightly integrated with Apple’s T2
security chip. This ensures that only trusted Apple-signed software can be loaded at startup,
providing a robust layer of security against tampering or malware.
2. Research a real-world example of an IoT botnet attack, such as the Mirai botnet.
The Mirai botnet is a well-known example of an IoT-based cyberattack. It compromised
thousands of IoT devices, such as cameras and routers, by exploiting weak or default
passwords. Mirai scanned for vulnerable devices across the internet, infected them, and
formed a botnet capable of launching massive distributed denial-of-service (DDoS) attacks. The
botnet disrupted major websites and services, including Dyn, a DNS provider, affecting such
major platforms as Twitter, Netflix, and Reddit.

### 023.2 Application Security
Security Essentials version 1.0, Exam 020, Objective 023.2
- Understanding of common types of software
- Understanding of various sources for applications and ways to securely procure and install
software
- Understanding of updates for firmware, operating systems, and applications
- Understanding of sources for mobile applications
- Understanding of common security vulnerabilities in software
- Understanding of the concepts of local protective software
- Firmware, operating systems, applications
- App stores
- Local packet filters, endpoint firewalls, application layer firewalls
- Buffer overflows, SQL injections

### 023.2 Application Security

Software security is critical to maintaining the integrity of systems and data. It begins with
ensuring the secure installation of software by sourcing applications from trusted providers and
preventing the introduction of malicious code during the installation process. Whether on a
desktop, server, or mobile platforms, adhering to best practices for software procurement is
essential to avoid unauthorized access or malware. Additionally, managing software updates is
crucial, because regular updates and patches address vulnerabilities that could be exploited if left
unpatched.
Another key aspect is protecting software from unintended network connections. This involves
using tools such as firewalls, packet filters, and endpoint protection to ensure that software
communicates only with authorized networks and entities. By securing installations, ensuring
timely updates, and managing network connections, organizations can effectively minimize risks
and maintain software integrity.

Common Types of Software and Their Updates
In the field of computing and cybersecurity, it is essential to understand the key categories of

software that form the backbone of digital systems. These categories include firmware, operating
systems, and applications. Each type serves a distinct role in ensuring the functionality, usability,
and security of a device or system.
Firmware is low-level software embedded directly into hardware devices. It serves as the
interface between the hardware components and higher-level software, ensuring that the
system’s hardware functions correctly. Firmware is typically stored in non-volatile memory and is
essential for booting the system and managing hardware components such as the motherboard,
hard drives, and network interfaces.
Firmware updates are particularly important because a vulnerability in firmware can
compromise the entire device, as it controls the communication between hardware and higherlevel software. These updates are often released by hardware manufacturers to address security
issues, improve compatibility with other hardware components, or support new features. Since
firmware is integral to a device’s operation, keeping it updated ensures the continued integrity
and security of the system.
An operating system (OS) is the core software that manages a computer’s hardware and software
resources. Examples include Windows, macOS, and Linux, which provide a user interface and
enable applications to run on the system. The OS is responsible for managing memory, processing
power, file systems, and peripheral devices. Security in operating systems is crucial, as they act as
the first line of defense against unauthorized access and malware.
Updates to the OS frequently include security patches to fix known vulnerabilities, such as those
related to network protocols, memory management, or access control. By ensuring that the OS is
up to date, users reduce the risk of their systems being exploited by malware or other attacks. It’s
also important to monitor the lifecycle of an operating system, as older systems may stop
receiving critical security updates, leaving them vulnerable to attacks.
Applications are software programs designed to perform specific tasks for the user, ranging from
productivity tools like word processors to web browsers and entertainment platforms.
Applications depend on the operating system to function and offer a wide variety of
functionalities. Due to their widespread use, applications are a common target for cyberattacks.
Application updates focus on fixing bugs, improving usability, and patching vulnerabilities in the
software that users interact with most directly. These updates can prevent security risks, such as
injection attacks, buffer overflows, or unauthorized access to sensitive data. Keeping applications
up to date reduces the likelihood of these vulnerabilities being exploited.

Securely Procure and Install Software
In the digital age, software applications are obtained from a wide range of sources, making it
crucial to understand where and how to securely procure and install software. The diversity of
sources, from official app stores to third-party websites, can introduce significant security risks if
not handled properly. Knowing how to verify the legitimacy of a software source and ensuring
secure installation practices are essential to prevent malware infections, data breaches, and
unauthorized access.
App stores are one of the most common and trusted sources for software applications, especially
for mobile devices. Platforms such as the Apple App Store, Google Play Store, and Microsoft Store
offer users access to a large collection of applications that have undergone some level of security
vetting by the platform provider. These stores often employ mechanisms to check for malicious
code, ensuring that apps meet certain security standards before they are made available to the
public. However, while app stores provide a more secure environment for software procurement,
they are not foolproof. There have been instances where malicious applications slip through the
vetting process, making it essential for users to check app ratings, reviews, and permissions
before downloading.
For desktop and enterprise environments, software can be procured from vendor websites, thirdparty distributors, or package management systems. When downloading from official vendor
websites, it’s important to verify that the source is legitimate, often by checking HTTPS certificates
and the digital signatures of the software packages. Using trusted package managers, such as APT
for Linux systems or Microsoft’s Windows Package Manager, can also ensure that applications are
securely sourced from trusted repositories.
To securely install software, users must follow best practices such as avoiding untrusted or
unknown sources, verifying the integrity of the software through hashes or digital signatures, and
keeping their systems and security software up to date. These steps help ensure that malicious
software is not inadvertently installed, preventing the potential compromise of a system.

Sources for Mobile Applications
Mobile applications have become an integral part of our daily lives, from communication tools to
productivity apps and entertainment platforms. However, the widespread use of mobile apps also
introduces significant security concerns. To ensure that the applications being installed on mobile
devices are safe and trustworthy, it is crucial to understand the various sources for mobile
applications and the associated security risks.
The most common and secure sources for mobile apps are official app stores, such as the Apple
App Store and Google Play Store. These platforms serve as centralized repositories where

developers can distribute their apps, and both stores have rigorous vetting processes to minimize
the distribution of malicious software. Apple, in particular, maintains strict control over the App
Store, requiring all apps to go through a review process that checks for compliance with security
standards and privacy guidelines. Similarly, Google Play Store scans apps for malware and other
security threats using automated systems like Google Play Protect. While these app stores are
generally safe, no system is infallible, and users should always review app ratings, permissions,
and the developer’s credibility before downloading.
In addition to official app stores, mobile applications can be sourced from third-party app stores
or websites. These alternative platforms may offer apps not available on official stores, but they
pose significantly higher security risks. Apps from third-party sources are often not subject to the
same level of scrutiny as those on official platforms, increasing the likelihood of downloading
malicious or compromised applications. Users who choose to download from these sources should
be aware of the potential dangers and take extra precautions, such as scanning apps with
antivirus software and verifying the legitimacy of the source.
Another way mobile applications are distributed is through enterprise app stores. These are
private app stores typically used within organizations to distribute custom applications developed
for internal use. While enterprise app stores can provide secure access to business-specific
applications, they require careful management to ensure that the apps are securely developed,
tested, and distributed. Employees should also be educated about how to securely download and
install these apps, to avoid accidental compromises.

Common Security Vulnerabilities in Software
Software vulnerabilities are flaws or weaknesses in code that attackers can exploit to compromise
the security of a system. Two of the most common and dangerous vulnerabilities are buffer
overflows and SQL injections. These vulnerabilities have been widely exploited and can lead to
severe consequences, including unauthorized access, data breaches, and system crashes.
A buffer overflow occurs when a program writes more data to a buffer — a temporary data
storage area — than that area can hold. When this happens, the excess data can overwrite
adjacent memory, potentially altering the execution flow of the program. Attackers exploit buffer
overflows to inject malicious code, gain control over a system, or cause a program to crash. This
vulnerability is often the result of improper input validation or the lack of boundary checks in the
code. To mitigate buffer overflow vulnerabilities, developers should use secure coding practices,
such as bounds checking and input validation, and implement modern security features like stack
canaries and Address Space Layout Randomization (ASLR).
SQL injection is another common security vulnerability that occurs in applications that interact
with databases. In this type of attack, an attacker injects malicious SQL code into an input field,

manipulating the application’s query to the database. If the input is not properly sanitized, the
attacker can gain unauthorized access to the database, retrieve or alter sensitive data, or even
execute administrative operations. SQL injection attacks are a result of improper input validation
and insufficient use of prepared statements or parameterized queries. To defend against SQL
injection, developers should always sanitize user input, use parameterized queries, and avoid
constructing SQL statements with direct user input.

Local Protective Software
Local protective software plays a vital role in safeguarding systems from a wide array of security
threats by controlling incoming and outgoing network traffic and filtering malicious activity. This
protection is typically provided through tools such as local packet filters, endpoint firewalls, and
application layer firewalls, each of which offers different levels of security tailored to the specific
needs of a system.
Local packet filters operate at the network layer, inspecting individual packets of data being
transmitted to or from a system. These filters decide whether to allow or block packets based on
predefined rules, such as IP addresses, port numbers, or protocols. Packet filtering is a
fundamental part of firewall functionality and helps prevent unauthorized access by stopping
malicious packets before they can reach their destination. While effective at basic traffic control,
packet filters may lack the ability to detect more sophisticated attacks that occur at higher layers
of communication.
Endpoint firewalls are designed to protect individual devices, such as laptops or desktop
computers, by acting as a barrier between the device and the network. Endpoint firewalls provide
more comprehensive protection than basic packet filters, as they monitor all traffic entering and
leaving the device, blocking malicious activity and preventing unauthorized access. They can also
enforce security policies, such as blocking certain applications from accessing the network or
preventing external devices from connecting.
In the context of local protective software, the functions of a local packet filter and an endpoint
firewall are commonly implemented together, providing a comprehensive layer of protection by
filtering network traffic and enforcing security policies directly on individual devices.
Both Windows and macOS come with integrated firewalls that provide both packet filtering and
an endpoint firewall as part of their overall security capabilities. This dual functionality ensures
that unauthorized access and malicious activities are effectively blocked, offering a robust
defense.
For instance, Windows Defender Firewall monitors and controls traffic at the network layer,
enforcing security policies at the device level to prevent applications from performing actions that

violate those policies.
Similarly, macOS features a built-in firewall that combines packet filtering with endpoint firewall
capabilities, allowing users to set rules that regulate inbound and outbound traffic. macOS also
provides advanced options like logging and stealth mode, which helps prevent the system from
being detected on a network, further enhancing security at the device level. These features give
users greater control over how their devices interact with the network, ensuring comprehensive
protection.
Widely used in Linux systems, iptables functions as a packet filtering tool that allows users to
define rules for managing incoming and outgoing network traffic. Operating at the network layer,
it enables users to block or allow traffic based on criteria such as IP addresses, port numbers, and
protocols. iptables is highly customizable, providing advanced options for managing network
security, but it requires a solid understanding of networking concepts for proper configuration.
In addition, SELinux (Security-Enhanced Linux) plays a critical role in endpoint protection within
Linux environments. Although not a traditional firewall, SELinux enforces mandatory access
controls (MAC) that limit the actions processes can perform. This adds an extra layer of security by
controlling how applications interact with the system. By strictly managing permissions, SELinux
helps prevent unauthorized processes from compromising the system, making it a valuable
complement to firewalls and other security tools in ensuring system integrity.
Application layer firewalls work at a higher level than packet filters or endpoint firewalls,
inspecting traffic related to specific applications or services. These firewalls monitor the data
exchanged at the application layer, which is where crucial protocols such as HTTP, FTP, or SMTP
operate. Application layer firewalls provide deeper inspection and control, allowing
administrators to block traffic based on the type of application or the content of the data being
transmitted. This makes them highly effective against attacks that target vulnerabilities in
applications, such as cross-site scripting (XSS), SQL injection, and buffer overflow.
An example of an application layer firewall is ModSecurity, which is an open source web
application firewall (WAF) that protects against web-based threats like SQL injection and crosssite scripting. Another example is F5 BIG-IP, which includes advanced capabilities for managing
application-level traffic and ensuring that sensitive applications are protected from targeted
Many cloud service providers offer cloud-based application firewalls to protect the applications
hosted on their platforms.
For example, AWS offers the AWS Web Application Firewall (AWS WAF), which provides
protection against common web exploits by allowing users to define custom rules to block specific
types of traffic. Google Cloud provides a similar service through its Cloud Armor, which helps

mitigate application vulnerabilities and ensures protection against DDoS and application-layer
attacks. Similarly, Microsoft Azure offers Azure Web Application Firewall (Azure WAF), providing
centralized protection for applications hosted on its cloud platform by filtering out malicious
traffic before it reaches the application. These cloud-based firewalls are highly scalable, easy to
integrate, and offer comprehensive protection for web applications in cloud environments.

1. What is the importance of secure software installation?

2. Why is regular software updating crucial for security?

## 3. How does managing network connections protect the software from threats?

1. What happens during a buffer overflow?

2. How do attackers exploit SQL injection vulnerabilities?

## 3. How does an endpoint firewall differ from a packet filter?

This lesson outlines essential practices for maintaining software security, focusing on secure
installation, regular updates, and managing network connections. It highlights the importance of
obtaining software from trusted sources to prevent malware, and ensuring that all software,
including firmware, operating systems, and applications, is kept up to date to patch
vulnerabilities. Additionally, the lesson explains how common software vulnerabilities like buffer
overflows and SQL injections can be exploited by attackers and how secure coding practices and
input validation can mitigate these risks.
The lesson also examines local protective software, differentiating between local packet filters,
endpoint firewalls, and application layer firewalls, each offering various levels of protection.
Examples like iptables, Windows Defender Firewall, and ModSecurity demonstrate how these
tools safeguard systems by filtering network traffic and preventing application-specific attacks.
The role of cloud-based firewalls, such as those provided by AWS, Google Cloud, and Microsoft
Azure, is also discussed as essential for protecting cloud-hosted applications from advanced

## 1. What is the importance of secure software installation?
Ensuring that software is installed from trusted sources helps prevent the introduction of
malicious code. This process ensures that the software being installed is legitimate and free
from security threats, reducing the risk of unauthorized access or malware infections.
2. Why is regular software updating crucial for security?
Software updates and patches are vital because they address vulnerabilities that attackers
could exploit. Regular updates ensure that any security flaws are fixed, helping to protect
systems from known threats.
3. How does managing network connections protect the software from threats?
Firewalls, packet filters, and endpoint protection ensure that software can communicate only
with authorized networks. This prevents unauthorized access and protects software from being
compromised by unintended connections, such as malicious inbound traffic.

## 1. What happens during a buffer overflow?
A buffer overflow occurs when more data is written to a buffer than it can hold, leading to
adjacent memory being overwritten. This can allow attackers to inject malicious code or crash
the system. To prevent this, developers should use secure coding practices like input validation
and boundary checks, and employ security features like stack canaries and ASLR.
2. How do attackers exploit SQL injection vulnerabilities?
SQL injection occurs when attackers insert malicious SQL code into a web application’s input
fields, manipulating the database to gain unauthorized access to sensitive data or perform
destructive operations. This can be mitigated by sanitizing user inputs and using
parameterized queries, which prevent direct manipulation of SQL statements.
3. How does an endpoint firewall differ from a packet filter?
An endpoint firewall differs from a packet filter in that it provides more comprehensive
protection for individual devices. While a packet filter just inspects and filters data packets
based on predefined network layer rules (e.g., IP addresses, ports, or protocols), an endpoint
firewall goes further by monitoring and controlling all inbound and outbound traffic specific to
the device. Endpoint firewalls can enforce more complex security policies, such as blocking
unauthorized applications, preventing external devices from connecting, and controlling what
data certain programs can access. This deeper level of traffic inspection and policy
enforcement makes endpoint firewalls more effective for securing individual systems,
compared to the more basic traffic control of packet filters. Examples of endpoint firewalls
include Windows Defender Firewall and macOS’s built-in firewall.

### 023.3 Malware
Security Essentials version 1.0, Exam 020, Objective 023.3
- Understanding of common types of malware
- Understanding of the concepts of rootkit and remote access
- Understanding of virus and malware scanners
- Awareness of the risk of malware used for spying, data exfiltration, and address books
copies
- Viruses, ransomware, trojan malware, adware, cryptominers
- Backdoors and remote access
- File copying, keylogging, camera, microphone hijacking

### 023.3 Malware

The term malware is a blend that combines syllables from the words mal-icious and soft-ware. It
encompasses a wide range of software types ultimately aimed at compromising a computer
system or network: viruses, trojan horses, ransomware, adware, etc. Most — if not all — of these
types include subtypes too. Also, attacks often get most destructive when they contain various
combinations of these malware types.
The reasons behind malware are diverse and varied — including pranks and activism, but also
espionage, cyber theft, and other serious crimes. In any case, the vast majority of malware is
designed to make money unethically and illegally. Malware can enter your computer or network
through a variety of means: file downloads, email messages with suspicious attachments or links,
or visiting an infected website — to name just a few.
The present lesson discusses the underlying principles of the different types of malware (their
modus operandi), the extent of their potential harm, and how to protect your machines against
them.

Common Types of Malware
The following subsections present some of the most common types of malware.

Viruses
Both biological and computer-based viruses alike need a host to cause harm. Thus, a computer
virus is a piece of malicious executable code that gets installed on your computer and has the
ability to propagate itself. Often, the propagation is carried out by sending the initial malicious
email containing the virus to all the contacts in the victim’s address book. To wreak havoc, though,
the virus needs human intervention. So it’s when the unsuspecting user runs the infected host file
that the virus replicates itself by modifying programs or spreads to other computers, potentially
infecting an entire network.
The level of harm caused by viruses can be quite devastating, since they are normally designed to
do such nasty practices as overflowing a network with traffic, corrupting programs, or deleting
files (or even your hard drive).

Unlike viruses, worms need neither an infected host file nor human intervention to
propagate themselves. They can be defined as a standalone kind of virus.

Ransomware
As its name shows, this type of malware consists of holding the user information as a prisoner for
ransom. Normally, the piece of malware works by restricting the users' access to certain files (or
parts of the computer) until a ransom is paid. Unlike with viruses, cybercriminals in a
ransomware attack are clear to the victim and explain what happened as well as the steps to
follow to recover the lost information.
Ransomware often uses public-key cryptography and a symmetric key to encrypt the
compromised files. These files then become inaccessible by their legitimate owners; the files can
be deciphered only with the attacker’s private key. The victim receives a message with
instructions on how to pay the ransom. Thus, the attackers will allegedly deliver the private key to
the user only when they pay the ransom. As with viruses, ransomware can quickly escalate and
bring down entire organizations by spreading across networks and targeting file and database
servers.

To safeguard their identity, ransomware cybercriminals normally ask for the
payment in the form of virtual currency (e.g., Bitcoin).

Cryptominers / Cryptojacking
Malicious cryptominers are designed to take surreptitious advantage of idle CPU (or GPU) activity.
Because they run in the background, they can be difficult to detect. Thus, the malicious piece of
software secretly installs on your device (or web browser) and starts mining cryptocurrencies.
Although the mining takes place unnoticed by the victims, they usually report increased fan
activity or other signs of intense processor work such as overheating or reduced performance.

Rootkits and Remote Access
Rootkits refer to a variety of malware intended to provide cybercriminals with remote access and
control while remaining unnoticed by the victim. Rootkits normally come with a set of tools for
stealing passwords as well as banking or personal information. Hence the term: root (attackers get
root access) and kit (they use a toolkit).
Different types of rootkits are designed to attack different parts of the computer: kernel,
applications, firmware, boot system (bootkits), or even RAM.

Spyware
Spyware is a general term for any type of malware designed to monitor your computer activity
and — more often than not — also steal personal or confidential information: your credentials,
payment information, navigation history, and so on. Typical types of spyware include adware,
keylogging, and camera and microphone hijacking.
Adware
Normally occurring within a web browser, adware is a type of malware contrived to bombard
your screen with advertisements. Most evolved adware spies on your online behaviour to target
you with specific ads. To trick you into installing it on your machine, adware can disguise itself as
legitimate software — however, it can also be installed through a web browser vulnerability.
Once installed on your system, adware is typically recognized by signs such as the following: New
toolbars appear on your browser, website links take you to the wrong website, your web browser
is slower, your web browser’s homepage changes, etc.
Keylogging
The term keylogging is self-explanatory. Thus, a keylogger is a type of malware that logs
keystrokes into a file; the file is then sent to a third party over the internet. Obviously,
cybercriminals can seriously harm the victim by intercepting vulnerable information such as
passwords, PIN codes, or bank account numbers.

The whole point of keyloggers is to go unnoticed to the victim’s eyes so as to avoid being detected
before the harm is done.

Keyloggers can be hardware-based as well as software-based. Likewise, they can be
used as a legitimate monitoring tool.

Camera and Microphone Hijacking
This kind of hijacking malware is designed to gain unauthorized access to your microphones and
cameras (both built-in and external). Thus, your image and conversations can be recorded
without your consent. This may lead to numerous malicious goals and have very nasty
consequences: Sensitive data is intercepted through audio recordings, videos are recorded and
sold to suspicious websites, etc.

Trojan Horses
According to Homer’s Odyssey or Virgil’s Aeneid, the Greeks won the Trojan War thanks to
cunning and deception: Instead of tearing down the city walls of Troy, they came up with the idea
of a giant wooden horse that they left at the city gates. The gullible Trojans brought the horse in
and — to their surprise — discovered that the Greek soldiers had been hidden inside the whole
time. Following the analogy of this Greek mythology, a Trojan horse (or, simply, a trojan) is a piece
of malware that travels undetected under the cover of legitimate software or content, such as
video or audio files (or any other type of content for that matter). In fact, rather than malware,
trojans can be defined as a multipurpose propagation strategy for any type of malware that
cybercriminals may want to use (viruses, worms, ransomware, etc.).

Common Methods Used by Cybercriminals to Wreak Havoc
The following subsections present a couple of methods used by cybercriminals to carry out or
deploy some — if not all — of the malware types that we have just described in the previous
sections.

Backdoors
We can define a backdoor as a way of accessing a computer system that bypasses the legal,
preestablished protocol designed for it (much in the same way as people sometimes use real
backdoors to avoid being seen entering buildings in the real world). In other words: The system is
accessed by an intruder who avoids any security measures. But are backdoors created
intentionally or simply by chance? Well, both; let us have a look.
In the first place, bear in mind that software generally — especially software that implies remote

access — has vulnerabilities, so cybercriminals work really hard to detect the so-called zero-day
vulnerabilites. As their name suggests, these vulnerabilities are spotted the same day the software
is released and are really dangerous because there are no current patches or solutions yet to
counteract the potential harm. Thus, a port, for example, could be inadvertently left unprotected
and — if discovered — provide a backdoor to intruders.
Secondly, the cybercriminals might try to create a backdoor themselves. To do so, they could
resort to social engineering, for instance, and try to convince the victim to install an apparently
useful piece of software that will contain the malware that can establish the backdoor (creating a
tunnel between their computer and the victim’s, for example).
Last, but not least, manufacturers and developers themselves can create and place backdoors on
their products for a variety of reasons (one of them being guaranteeing access to the system at any
time!).
Amongst the most common nasty things that backdoors can be used for, we can name the
following:
- Delivery of malware: trojans, keyloggers, etc.
- Spying, i.e. stealing sensitive information which can lead to identity theft or the performance of
fraudulent transactions, etc.
- Hijacking servers
- Defacing websites

Website defacement (or web defacement) can be defined as an attack against a
website in which the cybercriminals replace part of its content with their own (e.g.,
the homepage is replaced by a message that says “This Site Has Been Hacked”).

Data Exfiltration
Data exfiltration refers to any unauthorized transfer of data from an information system. One of
the most common forms of data exfiltration involves cracking the DNS resolver. In such a
scenario, the steps are as follows:
1. A phishing attack is carried out: An email message is sent containing a piece of malware
embedded in a document.
2. The victim opens the email message. The malicious code is executed and a command and
control channel is created via the DNS resolver.
3. The malware starts to propagate itself until it finds some confidential data to exfiltrate. The
data is then sent to an external server.

DNS stands for Domain Name System and plays a very important role on the
internet, as it is in charge of translating hostnames into IP addresses.

How Malware Enters a Computer and What to Do to
Protect Against It
As we have already seen, malware can get to your machine in multiple ways: when a user clicks
on links in deceptive email messages or website pop-ups, opens attachments, insertsd a USB drive,
etc. Cryptominers, for instance, can also be delivered simply by visiting a website! In this case, a
piece of malicious JavaScript has been previously embedded on the website so that all visiting
hosts will start cryptomining. Likewise, viruses — and other types of malware — can make copies
of critical files in the system to bypass being detected.
Trojans are normally delivered through some kind of social engineering method. Typically, the
victim receives a phishing email message with an attachment containing the piece of malicious
code. As soon as they click on it, the payload runs.

Social engineering is a catch-all term that refers to illegitimate social practices to
obtain confidential information. Phishing is a type of social engineering technique
where an attacker sends a spoofed email message to the victim to trick them into
revealing confidential or sensitive information. Within phishing, we can find more
specific attacks such as spear phising (targeted to a particular individual) or
whaling (targeted to high-ranking people whitin a company).

There are serveral ways to protect against malware:
- Use antivirus and antimalware software (scanners, etc.).
- Keep all software (antimalware and otherwise) updated at all times.
- Limit data access.
- Run programs in a virtual environment (sandboxing).
- Scan emails and attachments for malware.
- Do not download or install executable files from untrusted sources.
- Watch for signs of phishing email (weird domain names, grammatical errors, typos, etc.).
- Back up devices and important data on a regular basis.
- Strengthen your authentication systems.

The Linux kernel comes with a powerful firewall, iptables, and some distributions

include their own user-friendly front-ends to it (Ubuntu inludes Gufw, for
example). Likewise, nmap (a network scanner) is offered in the repos of all major
GNU/Linux distributions and can be used to protect networks against some types of
malware. There are many other anti-malware solutions available for Linux, but
that is outside the scope of this lesson.

## 1. Consider the following symptoms and indicate to what malware type they most likely belong:
Symptom

Malware type

Your computer is overheating when you are
simply surfing the web.
You notice a new toolbar on your browser that
you have not installed.
An email message that you have not written
gets sent to everyone in your address book.
You cannot access your files because they
have been encrypted.
You find unauthorized photos of yourself on
the web.
2. Indicate whether the following actions are risky practices or protective measures:
Action

Risky practice or protective measure

Limit data access
Install an executable file from an untrusted
source
Click on a pop-up window
Install the latest system updates
Insert a suspicious USB key into your
comptuer
Do backups on a regular basis
Send your credit card information via email
3. In what type of attack do you receive a fraudulent email message that appears to come from
trusted sources (your bank, social media, relatives or acquaintances, a superior in your
company)?

4. What term defines malware that passes itself off as legitimate software (or content)?

5. What type of malware covertly records the keys that you press on your keyboard?

## 1. Suppose your device’s microphone has been hijacked and the cybercriminals intercept some
personal information about you. How could they use this information to gain access to your
online services?

## 2. Signature-based detection is used by antivirus software to identify malware. What do we mean
by the terms virus signature or virus definition?

## 3. Search the web for the following terms and explain their meaning:
a. Two-Factor (or Multifactor) Authentication:

b. Botnet:

In this lesson, you learned about what malware is, the various types of malware, and how they
operate. You also explored the different ways malware can infiltrate your computer and how to
effectively protect your system from malware attacks.

## 1. Consider the following symptoms and indicate to what malware type they most likely belong:
Symptom

Malware type

Your computer is overheating when you are
simply surfing the web.

Cryptomining

You notice a new toolbar on your browser that Adware
you have not installed.
An email message that you have not written
gets sent to everyone in your address book.

Virus

You cannot access your files because they
have been encrypted.

Ransomware

You find unauthorized photos of yourself in
the web.

Camera hijacking

## 2. Indicate whether the following actions are risky practices or protective measures:
Action

Risky practice or protective measure?

Limit data access

Protective measure

Install an executable file from an untrusted
source

Click on a pop-up window

Install the latest system updates

Protective measure

Insert a suspicious USB key into your
comptuer

Do backups on a regular basis

Protective measure

Send your credit card information via email

## 3. In what type of attack do you receive a fraudulent email message that appears to come from
trusted sources (your bank, social media, relatives or acquaintances, a superior in your
company)?
Phishing attack
4. What term defines malware that passes itself off as legitimate software (or content)?

Trojan horses
5. What type of malware covertly records the keys that you press on your keyboard?
Keyloggers

## 1. Suppose your device’s microphone has been hijacked and the cybercriminals intercept some
personal information about you. How could they use this information to gain access to your
online services?
Let us remember that some online services make use of security questions in case you have
forgotten your password. Thus, cybercriminals could log into your service by answering
correctly questions such as what your pet’s name is or what colour your eyes are.
2. Signature-based detection is used by antivirus software to identify malware. What do we mean
by the terms virus signature or virus definition?
The virus signature or virus definition refers to the virus fingerprint, that is to say, the set of
unique data that allows antivirus software to identify it.
3. Search the web for the following terms and explain their meaning:
a. Two-Factor (or Multifactor) Authentication:
Two-Factor Authentication (2FA) or Multifactor Authentication (MFA) are ways of providing
extra layers of security when protecting user accounts.
b. Botnet:
We can define a botnet as a network of infected computers (“bots”) used to perform massive
attacks such as Distributed Denial-of-Service (DDOS), etc.

### 023.4 Data Availability
Security Essentials version 1.0, Exam 020, Objective 023.4
- Understanding of the importance of backups
- Understanding of common backup types and strategies
- Understanding of the security implications of backups
- Creating and securely storing backups
- Understanding of data storage, access, and sharing in cloud services
- Understanding of the security implications of cloud storage and shared access in the cloud
- Awareness of the dependence on Internet connection and the synchronization of data
between cloud services and local storage
- Full, differential and incremental backups
- Backup retention
- File sharing cloud services

### 023.4 Data Availability

In today’s digital world, data is the lifeblood of many activities, whether for personal, academic, or
business purposes. Ensuring the availability of your data is crucial, as data loss can be
catastrophic. This lesson guides you through the essential concepts of data availability, including
backups and cloud storage.

The Importance of Backups
Data loss can occur due to various reasons, such as hardware failures, software glitches, human
errors, or even cyberattacks. Backups are copies of your data that can be used to restore it in case
of loss or damage. Here are some key reasons why backups are essential.
Backups allow you to recover your data quickly and efficiently in case of unexpected events such
as hardware failures, accidents, or cyberattacks. Backups serve as a safety net for your data.
Backups help maintain the integrity of your data, ensuring that it remains intact and uncorrupted.
For business continuity, backups are critical for maintaining operations and preventing

downtime. Losing customer or inventory information could be fatal to a business, so backups are
essential.
It is a necessity for an organization to have a good backup plan. A backup plan should be
developed to determine what data is important to keep as well as how often that important data is
to be copied.

Common Backup Types and Strategies
To effectively implement a backup plan, it’s crucial to consider several backup types and
strategies alongside establishing a consistent schedule based on your data’s criticality and
frequency of change.
A full backup copies all data at a specific point in time. It provides complete data recovery
Typically, the first backup in a system will be a full backup. While this method provides the most
comprehensive recovery option, it is time-consuming and requires significant storage space. Full
backups are typically performed less frequently due to the time and resource demands they
require, but are often used as a baseline for other types of backups.
Incremental backups copy only data that has changed since the last backup, whether it was a full
or incremental backup. This method is efficient in terms of storage and time, as it requires less
space and quicker processing. However, during restoration, you need the last full backup and
every subsequent incremental backup, which can make recovery more complex.
A differential backup saves all changes made since the last full backup, regardless of whether
previous differential backups have been made. This method requires more space than
incremental backups but simplifies the restoration process, as only the last full backup and the
most recent differential backup are needed.
Snapshot backups capture the state of a system at a specific point in time. Unlike traditional filebased backups, snapshots can be taken quickly and offer near-instantaneous recovery by rolling
the system back to a prior state. However, snapshots require more advanced storage systems and
may not offer the same granular recovery options as other methods.

Example Scenarios
Understanding when to use either a differential or incremental backup after a full backup is an
important aspect of a backup plan. To help illustrate the differences between differential and
incremental backups, compare the two following scenarios.

Restoring Data from Full and Incremental Backups
Imagine an IT administrator named Emma who works for a medium-sized e-commerce company.
The company’s database contains critical customer order information, and they perform regular
backups to ensure data availability.
On Sunday night, Emma initiates a full backup of the entire database, capturing all customer
orders and product inventory data.
From Monday to Saturday, incremental backups are scheduled daily. These backups capture only
the data that has changed since the last backup. Each day, the database experiences minor
updates due to new customer orders and product additions.
On Wednesday, a hardware failure occurs, and some data in the database becomes corrupted.
Customer orders made on Wednesday morning are lost.
To restore the lost data, Emma starts by using the most recent full backup, which was taken on
Sunday. This backup contains the baseline data. Next, Emma applies the incremental backups
from Monday, Tuesday, and Wednesday. This process ensures that she brings the database up to
date while minimizing the amount of data transferred and the time required for the restoration.
By restoring from the full backup and applying the incremental backups, Emma successfully
recovers the lost data, ensuring that all customer orders and product information are intact up to
the moment of the hardware failure on Wednesday.
Restoring Data from Full and Differential Backups
Now, consider a different scenario involving the same e-commerce company and IT administrator
Emma, but this time they use a differential backup strategy.
On Sunday night, Emma initiates a full backup of the entire database, capturing all customer
orders and product inventory data.
Throughout the week, Emma schedules differential backups daily. These backups capture all data
changes since the last full backup.
On Wednesday, a database corruption occurs due to a software glitch, leading to data loss.
To restore the lost data, Emma starts by using the most recent full backup taken on Sunday night.
This full backup contains the baseline data. Emma then applies only the latest differential backup
from Wednesday. Since differential backups capture all changes since the last full backup, only
the most recent differential backup is needed.

By restoring from the full backup and applying the most recent differential backup, Emma
successfully recovers the lost data, ensuring that all customer orders and product information are
restored up to the point of the software glitch on Wednesday. This method simplifies the
restoration process because it requires restoring only the full backup and the latest differential
backup, unlike incremental backups that would require applying multiple backups in sequence.

Backup Retention
A good backup retention policy is essential for effective data management and disaster recovery
planning. It defines how long backups are retained and under what conditions they are deleted.
The goal of a well-designed retention policy is to balance data availability, compliance
requirements, storage costs, and operational efficiency. Here are some key components of a good
backup retention policy.
First, the data is classified based on its importance, and usage and retention periods for different
data categories are established (e.g., daily backups may be retained for 7-30 days for operational
recovery, weekly backups may be retained for 4-12 weeks for short-term recovery, and monthly
or yearly backups may be retained for long-term archival purposes).
To ensure compliance with industry-specific regulations (e.g., GDPR, HIPAA) that mandate data
retention periods, legal and compliance teams should be consulted to align retention policies with
legal requirements.
Another consideration is the granularity of backups to be retained. For example, you might retain
hourly backups for the last 24 hours, daily backups for the previous week, and weekly backups for
the previous year.
An organization can also keep multiple versions of backups, especially for critical data, to allow
for point-in-time recovery.
Given the limited life of most backups, automated processes can make it easier to delete backups
once they reach their specified retention periods. This helps avoid manual errors and ensures
compliance.
Offsite storage for long-term backups protects against disasters such as fires, floods, and hardware
failures.
It’s important to periodically test the restoration process for backups with different retention
periods to ensure that data can be recovered successfully.
The backup retention policy should be clearly communicated to all relevant stakeholders,
including IT personnel, data owners, and management.

Stakeholders should also regularly review and adjust the retention policy to align with changing
business needs, compliance requirements, and technological advancements.
Thorough documentation of the backup retention policy should be created and maintained,
including details about retention periods, data classification, and compliance considerations.
Backup policies also need processes for handling exceptions, such as extending retention periods
for specific data due to legal investigations or litigation.
Monitoring and reporting mechanisms can ensure compliance with the policy and alert
administrators of potential issues or violations.
A good backup retention policy should strike a balance between data availability and storage
costs, while adhering to legal and compliance requirements. Regularly reviewes and updates to
the policy ensures that it remains effective in meeting the organization’s evolving needs.

Security Implications of Backups
Backups should be treated with the same level of security as primary data.
Thus, they should be encrypted to protect them from unauthorized access.
Access control ensures that only authorized personnel have access to the backups. Depending on
the organization, it could be helpful to maintain a log of who accesses the backups and when. This
log file could be audited regularly to ensure backup policy compliance.
Additional resilience is created by storing backups in a separate location to protect against
physical disasters like fire or theft. Third-party companies are available to take the physical
backups (usually written to tape) and store them in an offsite location that has restricted access
and is climate-controlled. Such a service can be expensive and is typically employed by large
enterprises. Any data stored offsite should be encrypted as a precaution against data theft.
Cloud-based or offsite backups should follow strict security protocols, including encryption, access
control, and adherence to data protection regulations.
Backup strategies that are resistant to ransomware attacks include using immutable storage or
air-gapped backups to ensure data remains safe in case of an infection.

Creating and Securely Storing Backups
The following practices help create and securely store backups.

Factors to consider in choosing a backup software or service include the number of systems that a
solution can back up and the ease of restoring backups. Some backup solutions provide
_ersioning, which allows you to access and restore previous versions of files or data.
Synchronization helps to maintain a history of changes, enabling you to roll back to a specific
point in time when needed. This is valuable for recovering from accidental deletions or data
corruption.
Regularly scheduled backups ensure that your data is up to date. Monitor the backup solution to
make sure that the schedule is being followed and that resources are available for the backup.
Reliable and secure storage devices or services use external hard drives, network-attached storage
(NAS), or cloud storage for redundancy. Magnetic tape is often used for offsite archival storage.
Backup integrity should be verified to ensure restorability. Set up a schedule where you could test
your backups by using them to restore data and systems in a staging environment.

Data Storage, Access, and Sharing in Cloud Services
Cloud services offer convenient ways to store, access, and share data. Key concepts include the
following.
In this backup model, data is stored on remote servers maintained by cloud service providers. The
price of these services often depends on a variety of factors, such as the amount of storage needed
for backups, the retention time of the backups, and the speed at which data will be transferred
should a backup be utilized to restore a system. Keep in mind that some internet service providers
may charge a fee for large amounts of data that traverse their network.
Cloud services offer granular control over who can access your data. An administrator can
manage these controls using tools available from the cloud provider, typically via a web interface
or a command line utility.
Storage services such as Dropbox, Google Drive, and OneDrive allow you to easily share files with
others. Bear in mind that these services are not necessarily backup solutions, but instead are a
means of providing access to files within an organization. When a user deletes a file, either
intentionally or accidentally, depending on how the other users' client systems are configured
they will likely have the same file deleted from their system. To restore a file that has been
removed in this way, it may be necessary to contact the cloud service provider and ask them to
restore the file. This might also incur an additional cost.

Security Implications of Cloud Storage and Shared Access
It is important to understand that cloud solutions are basically “somebody else’s computers.” With
that in mind, the cloud storage provider should demonstrate a level of trust to the customer,
considering that their systems will be storing copies of the client’s most important data. At the
forefront of this trust are the following considerations.
Administrators should evaluate the security measures provided by the cloud service provider and
use additional encryption if necessary.
Caution is also required when sharing data, to ensure that only authorized individuals have
access. Keep a log of who accesses the backups as well as when the backups were accessed.

Dependence on Internet Connection and Data Synchronization
When dealing with offsite or cloud solutions for backups, keep the following in mind:
Cloud storage depends on an internet connection. Lack of connectivity may affect access to your
data. As stated earlier, some internet service providers may charge a higher fee for extensive use
of bandwidth. Also, bear in mind the security concerns that an internet connection entails.
Synchronization ensures that the data stored in your cloud backup matches the data on your local
systems. It helps maintain data consistency by keeping the backup copy up-to-date with changes
made to the source data. Without proper synchronization, you might have outdated or incomplete
backups, which can be problematic during data recovery.

1. What is the primary purpose of a backup?
