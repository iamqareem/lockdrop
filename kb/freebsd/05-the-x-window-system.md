---
id: freebsd-05
track: bsd-internals
title: "The X Window System"
slug: freebsd-05-the-x-window-system
source: "FreeBSD Handbook"
sourceSection: "Chapter 5 — The X Window System"
topic: "I"
tags: [freebsd, unix, x11, xorg, graphics]
summary: "A working graphical FreeBSD: install Xorg, pick the right driver for your GPU, skip the xorg.conf myth, and get from startx to a desktop environment or XDM login."
---
# Chapter 5. The X Window System

> **TL;DR** · *for anyone whose FreeBSD boots to a login prompt and wants pixels.*
> - Install the `xorg` meta-package, add your user to the `video` group, and let auto-detection do its job — no `xorg.conf` unless something actually fails.
> - The driver table decodes every GPU family: Intel and AMD take `drm-kmod`, NVIDIA takes the proprietary driver, VESA/SCFB cover the rest.
> - Ends with TrueType fonts and graphical logins through XDM.

> **2026 note:** this chapter is about Xorg, which remains the well-trodden path on FreeBSD. Wayland has since grown into its own chapter — the next one — and is the direction of travel for most desktop environments. Read both before choosing; the GPU driver setup here applies to Wayland too.

## 5.2. Installing Xorg

On FreeBSD, Xorg can be installed as a package or port. The binary meta package can be installed quickly but with fewer options for customization:

```
# pkg install xorg
```

Either of these installations results in the complete Xorg system being installed. The current user must be a member of the video group. To add a user to video group, execute the following command:

```
# pw groupmod video -m username
```

A smaller version of the X system suitable for experienced users is available in x11/xorg-minimal. Most of the documents, libraries, and applications will not be installed. Some applications require these additional components to function. Video cards, monitors, and input devices are automatically detected and do not require any manual configuration. Do not create xorg.conf or run a -configure step unless automatic configuration fails.

## 5.3. Graphic card drivers

The following table shows the different graphics cards supported by FreeBSD, which package should be installed and its corresponding module. Table 7. Graphic card packages

```
Brand
Type
Package
Module
Intel®
Open Source
drm-kmod
i915kms
AMD®
Open Source
drm-kmod
amdgpu and radeonkms
NVIDIA®
Proprietary
nvidia-driver
nvidia or nvidiamodeset
VESA
Open Source
xf86-video-vesa
vesa
SCFB
Open Source
xf86-video-scfb
scfb
VirtualBox®
Open Source
virtualbox-ose-
VirtualBox® OSE
additions
additions include the
vboxvideo driver.
VMware®
Open Source
xf86-video-vmware
vmwgfx
```

The following command can be used to identify which graphics card is installed in the system:

```
% pciconf -lv|grep -B4 VGA
```

The output should be similar to the following:

vgapci0@pci0:0:2:0:

```
class=0x030000 rev=0x07 hdr=0x00 vendor=0x8086 device=0x2a42
subvendor=0x17aa subdevice=0x20e4
vendor
= 'Intel Corporation'
device
= 'Mobile 4 Series Chipset Integrated Graphics Controller'
class
= display
subclass
= VGA
```

If the graphics card is not supported by Intel®, AMD® or NVIDIA® drivers, then VESA or SCFB modules should be used. VESA module must be used when booting in BIOS mode and SCFB module must be used when booting in UEFI mode. This command can be used to check the booting mode:

```
% sysctl machdep.bootmethod
```

The output should be similar to the following:

machdep.bootmethod: BIOS

### 5.3.1. Intel®

Intel® Graphics refers to the class of graphics chips that are integrated on the same die as an Intel® CPU. Wikipedia offers a good overview of the variations and names used for generations of Intel HD Graphics. The graphics/drm-kmod package indirectly provides a range of kernel modules for use with Intel® Graphics cards. The Intel® driver can be installed by executing the following command:

```
# pkg install drm-kmod
```

Then add the module to /etc/rc.conf file, executing the following command:

```
# sysrc kld_list+=i915kms
```

### 5.3.2. AMD®

The graphics/drm-kmod package indirectly provides a range of kernel modules for use with AMD® Graphics cards. The modules amdgpu and radeonkms can be used depending the generation of the hardware. The FreeBSD project maintains an AMD graphics support matrix to determine which driver must be used. AMD® driver can be installed by executing the following command:

```
# pkg install drm-kmod
```

For post-HD7000 or Tahiti graphic cards add the module to /etc/rc.conf file, executing the following command:

```
# sysrc kld_list+=amdgpu
```

For older graphic cards (pre-HD7000 or pre-Tahiti) add the module to /etc/rc.conf file, executing the following command:

```
# sysrc kld_list+=radeonkms
```

### 5.3.3. NVIDIA®

FreeBSD supports different versions of the proprietary NVIDIA® driver. Users of newer graphics cards should install the x11/nvidia-driver package. Those with older cards will have to check below which version supports them. Table 8. Supported versions of NVIDIA® drivers

```
Package
Supported hardware
x11/nvidia-driver-304
supported hardware
x11/nvidia-driver-340
supported hardware
x11/nvidia-driver-390
supported hardware
x11/nvidia-driver-470
supported hardware
x11/nvidia-driver
```

supported hardware Version 304 of the NVIDIA® graphics driver (nvidia-driver-304) does not support xorg-server 1.20 or later.

The latest NVIDIA® driver can be installed by running the following command:

```
# pkg install nvidia-driver
```

Then add the module to /etc/rc.conf file, executing the following command:

```
# sysrc kld_list+=nvidia-modeset
```

The nvidia driver must be used if the packages x11/nvidia-driver-304 or x11/nvidia-driver-340 have been installed.

```
# sysrc kld_list+=nvidia
```

## 5.4. Xorg Configuration

Xorg supports most common video cards, keyboards, and pointing devices.

Video cards, monitors, and input devices are automatically detected and do not require any manual configuration. Do not create xorg.conf or run a Xorg -configure step unless automatic configuration fails.

### 5.4.1. Configuration Files

Xorg looks in several directories for configuration files. /usr/local/etc/X11/ is the recommended directory for these files on FreeBSD. Using this directory helps keep application files separate from operating system files.

### 5.4.2. Single or Multiple Files

It is easier to use multiple files that each configure a specific setting than the traditional single xorg.conf. These files are stored in the /usr/local/etc/X11/xorg.conf.d/ subdirectory.

The traditional single xorg.conf still works, but is neither as clear nor as flexible as multiple files in the /usr/local/etc/X11/xorg.conf.d/ subdirectory.

### 5.4.3. Video Cards

The driver for the graphics card can be specified in the /usr/local/etc/X11/xorg.conf.d/ directory. To configure the Intel® driver in a configuration file: Example 14. Select Intel® Video Driver in a File

```
/usr/local/etc/X11/xorg.conf.d/20-intel.conf
Section "Device"
Identifier "Card0"
Driver
"intel"
EndSection
```

To configure the AMD® driver in a configuration file: Example 15. Select AMD® Video Driver in a File

```
/usr/local/etc/X11/xorg.conf.d/20-radeon.conf
Section "Device"
Identifier "Card0"
Driver
"radeon"
EndSection
```

To configure the NVIDIA® driver in a configuration file: Example 16. Select NVIDIA® Video Driver in a File

```
/usr/local/etc/X11/xorg.conf.d/20-nvidia.conf
Section "Device"
Identifier "Card0"
Driver
"nvidia"
EndSection
```

x11/nvidia-xconfig can also be used to perform basic control over configuration options available in the NVIDIA driver.

To configure the VESA driver in a configuration file: Example 17. Select VESA Video Driver in a File

```
/usr/local/etc/X11/xorg.conf.d/20-vesa.conf
Section "Device"
Identifier "Card0"
Driver
"vesa"
EndSection
```

To configure the SCFB driver in a configuration file: Example 18. Select SCFB Video Driver in a File

```
/usr/local/etc/X11/xorg.conf.d/20-scfb.conf
Section "Device"
Identifier "Card0"
Driver
"scfb"
EndSection
```

To configure multiple video cards, the BusID can be added. A list of video card bus IDs can be displayed by executing:

```
% pciconf -lv | grep -B3 display
```

The output should be similar to the following:

vgapci0@pci0:0:2:0:

```
class=0x030000 rev=0x07 hdr=0x00 vendor=0x8086 device=0x2a42
subvendor=0x17aa subdevice=0x20e4
vendor
= 'Intel Corporation'
device
= 'Mobile 4 Series Chipset Integrated Graphics Controller'
class
= display
-vgapci1@pci0:0:2:1:
class=0x038000 rev=0x07 hdr=0x00 vendor=0x8086 device=0x2a43
subvendor=0x17aa subdevice=0x20e4
vendor
= 'Intel Corporation'
device
= 'Mobile 4 Series Chipset Integrated Graphics Controller'
class
= display
```

Example 19. Select Intel® Video Driver and NVIDIA® Video Driver in a File

```
/usr/local/etc/X11/xorg.conf.d/20-drivers.conf
Section "Device"
Identifier "Card0"
Driver
"intel"
BusID
"pci0:0:2:0"
EndSection
Section "Device"
Identifier "Card0"
Driver
"nvidia"
BusID
"pci0:0:2:1"
EndSection
```

### 5.4.4. Monitors

Almost all monitors support the Extended Display Identification Data standard (EDID). Xorg uses EDID to communicate with the monitor and detect the supported resolutions and refresh rates. Then it selects the most appropriate combination of settings to use with that monitor. Other resolutions supported by the monitor can be chosen by setting the desired resolution in configuration files, or after the X server has been started with xrandr(1).

#### 5.4.4.1. Using RandR (Resize and Rotate)

Run xrandr(1) without any parameters to see a list of video outputs and detected monitor modes:

```
% xrandr
```

The output should be similar to the following:

Screen 0: minimum 320 x 200, current 2560 x 960, maximum 8192 x 8192 LVDS-1 connected 1280x800+0+0 (normal left inverted right x axis y axis) 261mm x 163mm 1280x800 59.99*+ 59.81 59.91 50.00 1280x720 59.86 59.74 1024x768 60.00 1024x576 59.90 59.82 960x540 59.63 59.82 800x600 60.32 56.25 864x486 59.92 59.57 640x480 59.94 720x405 59.51 58.99 640x360 59.84 59.32 VGA-1 connected primary 1280x960+1280+0 (normal left inverted right x axis y axis) 410mm x 257mm 1280x1024 75.02 60.02 1440x900 74.98 60.07 1280x960 60.00* 1280x800 74.93 59.81 1152x864 75.00 1024x768 75.03 70.07 60.00 832x624 74.55 800x600 72.19 75.00 60.32 56.25 640x480 75.00 72.81 66.67 59.94 720x400 70.08 HDMI-1 disconnected (normal left inverted right x axis y axis) DP-1 disconnected (normal left inverted right x axis y axis) HDMI-2 disconnected (normal left inverted right x axis y axis) DP-2 disconnected (normal left inverted right x axis y axis) DP-3 disconnected (normal left inverted right x axis y axis) This shows that the VGA-1 output is being used to display a screen resolution of 1280x960 pixels at a refresh rate of about 60 Hz. The LVDS-1 is being used as a secondary monitor to display a screen resolution of 1280x800 pixels at a refresh rate of about 60 Hz. Monitors are not attached to the HDMI1, HDMI-2, DP-1, DP-2 and DP-3 connectors. Any of the other display modes can be selected with xrandr(1). For example, to switch to 1280x1024 at 60 Hz:

```
% xrandr --output LVDS-1 --mode 1280x720 --rate 60
```

#### 5.4.4.2. Using the Xorg configuration file

The monitor configuration can also be set in a configuration file. To set a screen resolution of 1024x768 in a configuration file: Example 20. Set Screen Resolution in a File

```
/usr/local/etc/X11/xorg.conf.d/10-monitor.conf
Section "Screen"
Identifier "Screen0"
Device
"Card0"
SubSection "Display"
Modes
"1024x768"
EndSubSection
EndSection
```

### 5.4.5. Input Devices

Xorg supports the vast majority of input devices via x11/libinput.

Some desktop environments (such as KDE Plasma) provide a graphical UI for setting these parameters. Check if this is the case before resorting to manual configuration editing.

For example, to configure the keyboard layout: Example 21. Setting a Keyboard Layout

```
/usr/local/etc/X11/xorg.conf.d/00-keyboard.conf
Section "InputClass"
Identifier "Keyboard1"
MatchIsKeyboard "on"
Option "XkbLayout" "es, fr"
Option "XkbModel" "pc104"
Option "XkbVariant" ",qwerty"
Option "XkbOptions" "grp:win_space_toggle"
EndSection
```

## 5.5. Using Fonts in Xorg

The default fonts that ship with Xorg are less than ideal for typical desktop publishing applications. Large presentation fonts show up jagged and unprofessional looking, and small fonts are almost completely unintelligible. However, there are several free, high quality Type1 (PostScript®) fonts available which can be readily used with Xorg.

### 5.5.1. Type1 Fonts

The URW font collection (x11-fonts/urwfonts) includes high quality versions of standard type1 fonts (Times Roman™, Helvetica™, Palatino™ and others). The Freefonts collection (x11-fonts/freefonts) includes many more fonts, but most of them are intended for use in graphics software such as the Gimp, and are not complete enough to serve as screen fonts. In addition, Xorg can be configured to use TrueType® fonts with a minimum of effort. For more details on this, see the X(7) manual page or TrueType® Fonts. To install the above Type1 font collections from binary packages, run the following commands:

```
# pkg install urwfonts
```

And likewise with the freefont or other collections. To have the X server detect these fonts, add an appropriate line to the X server configuration file (/usr/local/etc/X11/xorg.conf.d/90-fonts.conf), which reads:

```
Section "Files"
FontPath "/usr/local/share/fonts/urwfonts/"
```

EndSection Alternatively, at the command line in the X session run:

```
% xset fp+ /usr/local/share/fonts/urwfonts
% xset fp rehash
```

This will work but will be lost when the X session is closed, unless it is added to the startup file (~/.xinitrc for a normal startx session, or ~/.xsession when logging in through a graphical login manager like XDM). A third way is to use the new /usr/local/etc/fonts/local.conf as demonstrated in Anti-Aliased Fonts.

### 5.5.2. TrueType® Fonts

Xorg has built in support for rendering TrueType® fonts. There are two different modules that can enable this functionality. The freetype module is used in this example because it is more consistent with the other font rendering back-ends. To enable the freetype module just add the following line to the "Module" section of /usr/local/etc/X11/xorg.conf.d/90-fonts.conf.

Load

"freetype"

Now make a directory for the TrueType® fonts (for example, /usr/local/share/fonts/TrueType) and copy all of the TrueType® fonts into this directory. Keep in mind that TrueType® fonts cannot be directly taken from an Apple® Mac®; they must be in UNIX®/MS-DOS®/Windows® format for use by Xorg. Once the files have been copied into this directory, use mkfontscale to create a fonts.dir, so that the X font renderer knows that these new files have been installed. mkfontscale can be installed as a package:

```
# pkg install mkfontscale
```

Then create an index of X font files in a directory:

```
# cd /usr/local/share/fonts/TrueType
# mkfontscale
```

Now add the TrueType® directory to the font path. This is just the same as described in Type1 Fonts:

```
% xset fp+ /usr/local/share/fonts/TrueType
% xset fp rehash
```

or add a FontPath line to xorg.conf.

Now Gimp, LibreOffice, and all of the other X applications should now recognize the installed TrueType® fonts. Extremely small fonts (as with text in a high resolution display on a web page) and extremely large fonts (within LibreOffice) will look much better now.

### 5.5.3. Anti-Aliased Fonts

All fonts in Xorg that are found in /usr/local/share/fonts/ and ~/.fonts/ are automatically made available for anti-aliasing to Xft-aware applications. Most recent applications are Xft-aware, including KDE, GNOME, and Firefox. To control which fonts are anti-aliased, or to configure anti-aliasing properties, create (or edit, if it already exists) the file /usr/local/etc/fonts/local.conf. Several advanced features of the Xft font system can be tuned using this file; this section describes only some simple possibilities. For more details, please see fonts-conf(5). This file must be in XML format. Pay careful attention to case, and make sure all tags are properly closed. The file begins with the usual XML header followed by a DOCTYPE definition, and then the <fontconfig> tag:

```
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
```

As previously stated, all fonts in /usr/local/share/fonts/ as well as ~/.fonts/ are already made available to Xft-aware applications. To add another directory outside of these two directory trees, add a line like this to /usr/local/etc/fonts/local.conf:

<dir>/path/to/my/fonts</dir> After adding new fonts, and especially new font directories, rebuild the font caches:

```
# fc-cache -f
```

Anti-aliasing makes borders slightly fuzzy, which makes very small text more readable and removes "staircases" from large text, but can cause eyestrain if applied to normal text. To exclude font sizes smaller than 14 point from anti-aliasing, include these lines:

```
<match target="font">
<test name="size" compare="less">
<double>14</double>
</test>
<edit name="antialias" mode="assign">
<bool>false</bool>
</edit>
</match>
<match target="font">
<test name="pixelsize" compare="less" qual="any">
<double>14</double>
</test>
<edit mode="assign" name="antialias">
<bool>false</bool>
</edit>
</match>
```

Spacing for some monospaced fonts might also be inappropriate with anti-aliasing. This seems to be an issue with KDE, in particular. One possible fix is to force the spacing for such fonts to be 100. Add these lines:

```
<match target="pattern" name="family">
<test qual="any" name="family">
<string>fixed</string>
</test>
<edit name="family" mode="assign">
<string>mono</string>
</edit>
</match>
<match target="pattern" name="family">
<test qual="any" name="family">
<string>console</string>
</test>
<edit name="family" mode="assign">
<string>mono</string>
</edit>
</match>
```

(this aliases the other common names for fixed fonts as "mono"), and then add:

```
<match target="pattern" name="family">
<test qual="any" name="family">
<string>mono</string>
</test>
<edit name="spacing" mode="assign">
<int>100</int>
</edit>
</match>
```

Certain fonts, such as Helvetica, may have a problem when anti-aliased. Usually this manifests itself as a font that seems cut in half vertically. At worst, it may cause applications to crash. To avoid this, consider adding the following to local.conf:

```
<match target="pattern" name="family">
<test qual="any" name="family">
<string>Helvetica</string>
</test>
<edit name="family" mode="assign">
<string>sans-serif</string>
</edit>
</match>
```

After editing local.conf, make certain to end the file with the </fontconfig> tag. Not doing this will cause changes to be ignored. Users can add personalized settings by creating their own ~/.config/fontconfig/fonts.conf. This file uses the same XML format described above. One last point: with an LCD screen, sub-pixel sampling may be desired. This basically treats the (horizontally separated) red, green and blue components separately to improve the horizontal resolution; the results can be dramatic. To enable this, add the line somewhere in local.conf:

```
<match target="font">
<test qual="all" name="rgba">
<const>unknown</const>
</test>
<edit name="rgba" mode="assign">
<const>rgb</const>
</edit>
</match>
```

> Depending on the sort of display, rgb may need to be changed to bgr, vrgb or vbgr: experiment and see which works best.

For more information about how to install and configure fonts on FreeBSD, please read the article Fonts and FreeBSD.
