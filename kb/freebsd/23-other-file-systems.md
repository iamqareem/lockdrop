---
id: freebsd-23
title: "Other File Systems"
slug: freebsd-23-other-file-systems
source: "FreeBSD Handbook"
sourceSection: "Chapter 23 — Other File Systems"
topic: "III"
tags: [freebsd, unix, filesystems, ext2, fusefs]
summary: "Non-native file systems on FreeBSD: ext2/ext3/ext4, FAT, NTFS, CD9660, FUSE and how to mount them."
---
# Chapter 23. Other File Systems

## 23.1. Synopsis

File systems are a fundamental component of any operating system. They enable users to store, manage, and access data, making storage devices like hard drives, flash drives, and USB storage devices practical for everyday use. Different operating systems use different file systems natively. FreeBSD has traditionally used the Unix File System (UFS), with the modernized UFS2 as its primary native file system. FreeBSD also uses the Z File System (ZFS), known for its advanced features, robustness, and reliability. See The Z File System (ZFS) for more details. In addition to its native file systems, FreeBSD supports a broad range of file systems from other operating systems. Support for these file systems varies, some require loading kernel modules, while others need additional userland tools. Before reading this chapter, you should:

- Be familiar with UNIX® concepts and FreeBSD basics.
- Feel comfortable installing software in FreeBSD.
- Have some understanding of disks, storage devices, and FreeBSD’s naming conventions for devices.

  After reading this chapter, you will:

- Understand the differences between native and supported file systems.
- Know which file systems are supported by FreeBSD and the level of support available.
- Learn how to enable, configure, access, and work with non-native file systems.

## 23.2. Linux® File Systems

FreeBSD provides built-in support for several Linux® file systems. This section demonstrates how to load support for and how to mount the supported Linux® file systems.

### 23.2.1. Extended File System (EXT)

Kernel support for Extended File System (EXT) file systems has been available since FreeBSD 2.2. The ext2fs(5) driver allows the FreeBSD kernel to both read and write to ext2, ext3, and ext4 file systems.

Journalling and encryption are not supported yet.

To access an ext file system, mount the ext volume by specifying its FreeBSD partition name and an existing mount point. This example mounts /dev/ada1s1 on /mnt:

```
# mount -t ext2fs /dev/ada1s1 /mnt
```

## 23.3. Windows® File Systems

FreeBSD supports FAT, exFAT, and NTFS file systems, enabling access to Windows-formatted storage.

### 23.3.1. FAT File System

The FAT file system is a simple and robust file system. Although it lacks the performance, reliability, and scalability of modern alternatives, its availability on many different operating systems makes it a common choice for data exchange between devices. To access a FAT file system, mount the FAT volume by specifying its FreeBSD partition name and an existing mount point. This example mounts /dev/ada0s1 on /mnt:

```
# mount -t msdosfs /dev/ada0s1 /mnt
```

### 23.3.2. exFAT File System

exFAT (Extended File Allocation Table) is a lightweight file system optimized for flash storage devices, such as USB drives and SD cards. It supports large file sizes and is widely used across various platforms, making it ideal for external storage. To use exFAT on FreeBSD, install the filesystems/exfat package, load the FUSE kernel module, and mount the file system as shown below: Install the exFAT package:

```
# pkg install exfat
```

Before using a FUSE file system, load the fusefs(5) kernel module:

```
# kldload fusefs
```

Use sysrc(8) to load the module at startup:

```
# sysrc kld_list+=fusefs
```

Mount the exFAT volumne by specifying its FreeBSD partition name and an existing mount point. This example mounts /dev/ada0s1 on /mnt:

```
# mount.exfat /dev/ada0s1 /mnt
```

### 23.3.3. NTFS File System

NTFS is a robust file system developed by Microsoft® and commonly used in Windows operating systems. FreeBSD provides full read and write support for NTFS through the filesystems/ntfs package, making it easy to access and modify NTFS-formatted storage devices. To use NTFS on FreeBSD, install the filesystems/ntfs package, load the FUSE kernel module, and mount the file system as shown below: Install the NTFS package:

```
# pkg install ntfs
```

Before using a FUSE file system, load the fusefs(5) kernel module:

```
# kldload fusefs
```

Use sysrc(8) to load the module at startup:

```
# sysrc kld_list+=fusefs
```

Mount the NTFS volumne by specifying its FreeBSD partition name and an existing mount point. This example mounts /dev/ada0s1 on /mnt:

```
# ntfs-3g /dev/ada0s1 /mnt
```

## 23.4. MacOS® File Systems

FreeBSD provides support for MacOS® file systems, including HFS/HFS+, allowing access to storage devices formatted for Apple® systems.

### 23.4.1. HFS/HFS+ File System

HFS/HFS+ was the primary file system for MacOS prior to APFS, commonly used on older Mac devices and external drives. FreeBSD provides read-only support for HFS/HFS+ through the filesystems/hfsfuse package. To use HFS/HFS+ on FreeBSD, install the filesystems/hfsfuse package, load the FUSE kernel module, and mount the file system as shown below: Install the HFS/HFS+ package:

```
# pkg install fusefs-hfsfuse
```

Before using a FUSE file system, load the fusefs(5) kernel module:

```
# kldload fusefs
```

Use sysrc(8) to load the module at startup:

```
# sysrc kld_list+=fusefs
```

Mount the HFS/HFS+ volumne by specifying its FreeBSD partition name and an existing mount point. This example mounts /dev/ada0s1 on /mnt:

```
# hfsfuse /dev/ada0s1 /mnt
```
