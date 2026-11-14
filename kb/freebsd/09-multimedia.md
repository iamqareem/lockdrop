---
id: freebsd-09
title: "Multimedia"
slug: freebsd-09-multimedia
source: "FreeBSD Handbook"
sourceSection: "Chapter 9 — Multimedia"
topic: "II"
tags: [freebsd, unix, audio, video, multimedia]
summary: "Sound and video on FreeBSD: sound cards, mixers, audio and video players, conferencing and image scanners."
---
# Chapter 9. Multimedia

## 9.1. Synopsis

The multimedia chapter provides an overview of multimedia support on FreeBSD. Multimedia applications and technologies have become an integral part of modern computing, and FreeBSD provides robust and reliable support for a wide range of multimedia hardware and software. This chapter covers various multimedia components such as audio, video, and image processing. It also discusses various media formats and codecs, as well as tools and applications for multimedia creation and playback. Additionally, the chapter covers multimedia system configuration, troubleshooting, and optimization. Whether you are a multimedia enthusiast or a professional content creator, FreeBSD offers a robust platform for multimedia work. This chapter aims to help get the most out of FreeBSD’s multimedia capabilities, providing useful information and practical examples to help get started.

## 9.2. Setting Up the Sound Card

By default, FreeBSD will automatically detect the sound card used by the system. FreeBSD supports a wide variety of sound cards. The list of supported sound cards can be consulted in sound(4).

> It is only necessary to load the sound card module if FreeBSD has not detected it correctly.

Where it is not known which sound card the system has, or which module to use, the snd_driver metadriver can be loaded by executing the following command:

```
# kldload snd_driver
```

Alternatively, to load the driver as a module at boot time, place the following line in /boot/loader.conf:

```
snd_driver_load="YES"
```

### 9.2.1. Testing Sound

To confirm the sound card is detected the following command can be executed:

```
% dmesg | grep pcm
```

The output should be similar to the following:

```
pcm0: <Conexant CX20561 (Hermosa) (Analog 2.0+HP/2.0)> at nid 26,22 and 24 on hdaa0
pcm1: <Conexant CX20561 (Hermosa) (Internal Analog Mic)> at nid 29 on hdaa0
```

The status of the sound card may also be checked using this command:

```
# cat /dev/sndstat
```

The output should be similar to the following:

```
Installed devices:
pcm0: <Conexant CX20561 (Hermosa) (Analog 2.0+HP/2.0)> (play/rec) default
pcm1: <Conexant CX20561 (Hermosa) (Internal Analog Mic)> (rec)
```

If no pcm devices are listed, double-check that the correct device driver was loaded. If all goes well, the sound card should now work in FreeBSD. beep(1) can be used to produce some noise, confirming that the sound card is working:

```
% beep
```

### 9.2.2. Mixer

FreeBSD has different utilities to set and display sound card mixer values built on the FreeBSD Sound System: Table 16. Supported mixer packages

```
Name
License
Package
Toolkit
mixer(8)
BSD-2
Included in base
CLI
system
dsbmixer
BSD-2
audio/dsbmixer
KDE Plasma audio
GPL 2.0
audio/plasma5-plasma- Qt
widget
mixertui
```

Qt

```
pa
BSD-2
```

audio/mixertui

TUI

### 9.2.3. Graphics Card Sound

Graphics cards often come with their own integrated sound devices, and it may be unclear which is being used as the default device. To confirm, run dmesg and look for the pcm entries to identify how the system is enumerating the outputs. Execute the following command:

```
% dmesg | grep pcm
```

The output looks something like this:

```
pcm0: <HDA NVIDIA (Unknown) PCM #0 DisplayPort> at cad 0 nid 1 on hdac0
pcm1: <HDA NVIDIA (Unknown) PCM #0 DisplayPort> at cad 1 nid 1 on hdac0
pcm2: <HDA NVIDIA (Unknown) PCM #0 DisplayPort> at cad 2 nid 1 on hdac0
pcm3: <HDA NVIDIA (Unknown) PCM #0 DisplayPort> at cad 3 nid 1 on hdac0
```

hdac1: HDA Codec #2: Realtek ALC889 pcm4: <HDA Realtek ALC889 PCM #0 Analog> at cad 2 nid 1 on hdac1 pcm5: <HDA Realtek ALC889 PCM #1 Analog> at cad 2 nid 1 on hdac1 pcm6: <HDA Realtek ALC889 PCM #2 Digital> at cad 2 nid 1 on hdac1 pcm7: <HDA Realtek ALC889 PCM #3 Digital> at cad 2 nid 1 on hdac1 The graphics card (NVIDIA®) has been enumerated before the sound card (Realtek®), with the sound card appearing as pcm4. The system can be configured to use the sound card as the default device by executing the following command:

```
# sysctl hw.snd.default_unit=4
```

To make this change permanent add the next line to /etc/sysctl.conf:

```
hw.snd.default_unit=4
```

### 9.2.4. Automatically Switching to Headphones

Some systems may struggle with switching between audio outputs, but fortunately FreeBSD allows automatic switchover to be configured in device.hints. Identify how the system is enumerating the audio outputs by executing the following command:

```
% dmesg | grep pcm
```

The output looks something like this:

pcm0: <Realtek ALC892 Analog> at nid 23 and 26 on hdaa0 pcm1: <Realtek ALC892 Right Analog Headphones> at nid 22 on hdaa0 Add the following lines to /boot/device.hints:

```
hint.hdac.0.cad0.nid22.config="as=1 seq=15 device=Headphones"
hint.hdac.0.cad0.nid26.config="as=2 seq=0 device=speakers"
```

> Keep in mind that these values are for the example indicated above. They may vary depending on the system.

### 9.2.5. Troubleshooting Sound

Some common error messages and their solutions: Table 17. Common Error Messages

```
Error
Solution
xxx: can’t open /dev/dsp!
```

Type fstat | grep dsp to check if another application is holding the device open. Noteworthy troublemakers are esound and KDE’s sound support.

Programs using audio/pulseaudio might need to restart the audio/pulseaudio daemon for the changes in hw.snd.default_unit to take effect. Alternatively, audio/pulseaudio settings can be changed on the fly. pacmd(1) opens a command line connection to the audio/pulseaudio daemon:

```
# pacmd
```

Welcome to PulseAudio 14.2! Use "help" for usage information. >>> The following command changes the default sink to card number 4 as in the previous example:

set-default-sink 4 Do not use the exit command to exit the command line interface. That will kill the audio/pulseaudio daemon. Use Ctrl + D instead.

## 9.3. Audio players

This section introduces some of the software available from the FreeBSD Ports Collection which can be used for audio playback. Table 18. Audio players packages

```
Name
License
Package
Toolkit
Elisa
LGPL 3.0
audio/elisa
Qt
GNOME Music
GPL 2.0
audio/gnome-music
GTK+
Audacious
BSD-2
multimedia/audacious
Qt
MOC (music on
GPL 2.0
audio/moc
TUI
console)
```

### 9.3.1. Elisa

Elisa is a music player developed by the KDE community that strives to be simple and nice to use.

To install Elisa, execute:

```
# pkg install elisa
```

### 9.3.2. GNOME Music

GNOME Music is the new GNOME music playing application. It aims to combine an elegant and immersive browsing experience with simple and straightforward controls. To install GNOME Music, execute:

```
# pkg install gnome-music
```

### 9.3.3. Audacious

Audacious is an open source audio player. A descendant of XMMS, it plays your music how you want it, without stealing away your computer’s resources from other tasks. To install Audacious, execute:

```
# pkg install audacious-qt6 audacious-plugins-qt6
```

> Audacious supports OSS natively, but must be configured in the settings on the Audio tab.

### 9.3.4. MOC (music on console)

MOC (music on console) is a console audio player designed to be powerful and easy to use. MOC plays smoothly, regardless of system or I/O load, because it handles the output buffer in a separate thread. It does not cause gaps between files, because the next file to be played is precached while playing the current file. To install MOC (music on console), execute:

```
# pkg install moc
```

## 9.4. Video players

This section introduces some of the software available from the FreeBSD Ports Collection which can be used for video playback. Table 19. Video players packages Name

```
License
Package
Toolkit
MPlayer
GPL 2.0
multimedia/mplayer
CLI
SMPlayer
GPL 2.0
multimedia/smplayer
Qt
VLC media player
GPL 2.0
multimedia/vlc
Qt
Kodi (XBMC)
GPL 2.0
multimedia/kodi
X11
```

### 9.4.1. MPlayer

MPlayer is a multimedia player and encoder suite which runs on many platforms and works on the command line. It plays a terrific number of different file formats and codecs including popular DivX, XviD, H.264 streams as well as DVD and SVCDs along with many popular audio codecs. To install MPlayer, execute:

```
# pkg install mplayer
```

For examples of how MPlayer works see mplayer(1).

### 9.4.2. SMPlayer

SMPlayer intends to be a complete front-end for MPlayer, from basic features like playing videos, DVDs, and VCDs to more advanced features like support for MPlayer filters and more. To install SMPlayer, execute:

```
# pkg install smplayer
```

### 9.4.3. VLC media player

VLC media player is a highly portable multimedia player for various audio and video formats (MPEG-1, MPEG-2, MPEG-4, DivX, mp3, ogg, and more) as well as DVD’s, VCD’s, and various streaming protocols. It can also be used as a server to stream in unicast or multicast in IPv4 or IPv6 on a high-bandwidth network. VLC also has the ability to transcode media on-the-fly for streaming or saving to disk. To install VLC, execute:

```
# pkg install vlc
```

### 9.4.4. Kodi (XBMC)

Kodi (formerly known as XBMC) is a free and open source cross-platform media-player and entertainment hub. It allows users to play and view most videos, music, podcasts, and other digital media files from local and network storage media and the internet.

To install Kodi, execute:

```
# pkg install kodi
```

## 9.5. Conferencing and Meetings

A FreeBSD desktop environment can be used to join video conferences. This section will explain how to configure the webcam and which videoconferencing applications are supported on FreeBSD.

### 9.5.1. Setting Up the Webcam

To allow FreeBSD access to the webcam and perform its configuration it is necessary to install certain utilities:

- multimedia/webcamd is a daemon that enables the use of hundreds of different USB based webcam and DVB USB devices.
- multimedia/pwcview is an application that can be used to view the video stream of the webcam. To install the required utilities, execute:

```
# pkg install webcamd pwcview
```

Enable the webcamd(8) service in /etc/rc.conf to start it at system boot:

```
# sysrc webcamd_enable=YES
```

The user must belong to the webcamd group. To add the user to webcamd group execute the following command:

```
# pw groupmod webcamd -m username
```

Since multimedia/webcamd needs the cuse(3) module this module must be loaded by executing the following command:

```
# kldload cuse
```

To load cuse(3) at system boot, execute the command:

```
# sysrc kld_list+=cuse
```

Once the utilities have been installed the list of available webcams can be shown with webcamd(8):

```
# webcamd -l
```

The output should be similar to the following:

```
webcamd [-d ugen0.2] -N SunplusIT-Inc-HP-TrueVision-HD-Camera -S unknown -M 0 ①
webcamd [-d ugen1.3] -N Realtek-802-11n-WLAN-Adapter -S 00e04c000001 -M 0
① Available webcam
```

Configure the available webcam executing the following command:

```
# sysrc webcamd_0_flags="-d ugen0.2" ①
```

Note here that if this is a plug-and-play USB webcam, changing the USB port to

> which it is connected will change the output from webcamd -l, and the entry in rc.conf might need to be updated. For laptops that use USB integrated webcams, this should not be an issue.

The webcamd(8) service must be started by executing the following command:

```
# service webcamd start
```

The output should be similar to the following:

```
Starting webcamd.
webcamd 1616 - - Attached to ugen0.2[0]
```

multimedia/pwcview can be used to check the proper functioning of the webcam. The following command can be used to execute multimedia/pwcview:

```
% pwcview -f 30 -s vga
```

Then multimedia/pwcview will display the webcam:

### 9.5.2. Meetings software status

FreeBSD currently supports the following tools used to carry out videoconferences. Table 20. Meeting software

```
Name
Firefox status
Chromium status
Website
Microsoft Teams
Does not work
Works
https://teams.live.com
Google Meet
Does not work
Works
https://meet.google.com
/
Zoom
Works
Works
https://zoom.us
Jitsi
Does not work
Works
https://meet.jit.si/
BigBlueButton
Does not work
Works
https://bigbluebutton.or
g/
```

## 9.6. Image Scanners

In FreeBSD, access to image scanners is provided by SANE (Scanner Access Now Easy), which is available in the FreeBSD Ports Collection.

### 9.6.1. Checking the Scanner

Before attempting any configuration it is important to check the scanner is supported by SANE. With the scanner connected, run the following command to get all connected USB devices:

```
# usbconfig list
```

The output should be similar to the following:

ugen4.2: <LITE-ON Technology USB NetVista Full Width Keyboard.> at usbus4, cfg=0

```
md=HOST spd=LOW (1.5Mbps) pwr=ON (70mA)
```

ugen4.3: <Logitech USB Optical Mouse> at usbus4, cfg=0 md=HOST spd=LOW (1.5Mbps)

```
pwr=ON (100mA)
```

ugen3.2: <HP Deskjet 1050 J410 series> at usbus3, cfg=0 md=HOST spd=HIGH (480Mbps)

```
pwr=ON (2mA)
```

Run the following command to obtain the idVendor and the idProduct:

```
# usbconfig -d 3.2 dump_device_desc
```

> Note here that the scanner is a plug-and-play device, and changing the USB port to which it is connected will change the output from usbconfig list.

The output should be similar to the following:

ugen3.2: <HP Deskjet 1050 J410 series> at usbus3, cfg=0 md=HOST spd=HIGH (480Mbps)

```
pwr=ON (2mA)
bLength = 0x0012
bDescriptorType = 0x0001
bcdUSB = 0x0200
bDeviceClass = 0x0000 <Probed by interface class>
bDeviceSubClass = 0x0000
bDeviceProtocol = 0x0000
bMaxPacketSize0 = 0x0040
idVendor = 0x03f0
idProduct = 0x8911
bcdDevice = 0x0100
iManufacturer = 0x0001 <HP>
iProduct = 0x0002 <Deskjet 1050 J410 series>
bNumConfigurations = 0x0001
```

Once the idVendor and the idProduct have been obtained, it is necessary to check in the list of supported devices of SANE if the scanner is supported by filtering by the idProduct.

### 9.6.2. SANE Configuration

SANE provides the access to the scanner via backends. To be able to scan with FreeBSD the graphics/sane-backends package must be installed by running the following command:

```
# pkg install sane-backends
```

Some USB scanners require firmware to be loaded. Like the HP scanner used in the example above, which needs the package print/hplip installed.

After installing the necessary packages devd(8) must be configured to allow FreeBSD access to the scanner. Add the saned.conf file to /usr/local/etc/devd/saned.conf with the following content:

```
notify 100 {
match "system" "USB";
match "subsystem" "INTERFACE";
match "type" "ATTACH";
match "cdev" "ugen[0-9].[0-9]";
match "vendor" "0x03f0"; ①
match "product" "0x8911"; ②
action "chown -L cups:saned /dev/\$cdev && chmod -L 660 /dev/\$cdev";
};
```

① vendor: Is the idVendor obtained previously by running the usbconfig -d 3.2 dump_device_desc command. ② product: Is the idProduct obtained previously by running the usbconfig -d 3.2 dump_device_desc command. After that devd(8) must be restarted by running the following command:

```
# service devd restart
```

The SANE backends include scanimage(1) which can be used to list the devices and perform an image acquisition. Execute scanimage(1) with -L argument to list the scanner devices:

```
# scanimage -L
```

The output should be similar to the following:

device `hpaio:/usb/Deskjet_1050_J410_series?serial=XXXXXXXXXXXXXX' is a Hewlett- Packard Deskjet_1050_J410_series all-in-one If scanimage(1) is not able to identify the scanner, this message will appear:

No scanners were identified. If you were expecting something different, check that the scanner is plugged in, turned on and detected by the sane-find-scanner tool (if appropriate). Please read the documentation which came with this software (README, FAQ, manpages). Once scanimage(1) sees the scanner, the configuration is complete and the scanner is now ready to use. To activate the service and have it run at boot execute the following command:

```
# sysrc saned_enable=YES
```

While scanimage(1) can be used to perform an image acquisition from the command line, it is often preferable to use a graphical interface to perform image scanning. Table 21. Graphical scanner programs

```
Name
License
Package
skanlite
GPL 2.0
graphics/skanlite
GNOME Simple Scan
GPL 3.0
graphics/simple-scan
XSANE
GPL 2.0
graphics/xsane
```
