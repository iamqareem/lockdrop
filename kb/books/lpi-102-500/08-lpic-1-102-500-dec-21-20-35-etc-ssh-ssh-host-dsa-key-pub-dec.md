---
id: lpi-102-500-08
title: "LPIC-1 · 102-500 — Dec 21 20:35 /etc/ssh/ssh_host_dsa_key.pub, Dec 21 20:35…",
slug: lpi-102-500-08-lpic-1-102-500-dec-21-20-35-etc-ssh-ssh-host-dsa-key-pub-dec
source: "LPI Learning Material — LPIC-1 (Exam 102-500)",
sourceSection: "605. Dec 21 20:35 /etc/ssh/ssh_host_dsa_key.pub, 505. Dec 21 20:35 /etc/ssh/ssh_host_ecdsa_key, 177. Dec 21 20:35 /etc/ssh/ssh_host_ecdsa_key.pub, 411. Dec 21 20:35 /etc/ssh/ssh_host_ed25519_key, 97. Dec 21 20:35 /etc/ssh/ssh_host_ed25519_key.pub, 397. Dec 21 20:35 /etc/ssh/ssh_host_rsa_key.pub, 1."
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, shells, scripting]
summary: "You can view the fingerprints of the keys by passing ssh-keygen the -l switch. Covers 26 sections: Dec 21 20:35 /etc/ssh/ssh_host_dsa_key.pub, Dec 21 20:35 /etc/ssh/ssh_host_ecdsa_key, Dec 21 20:35 /etc/ssh/ssh_host_ecd.",
---
# LPIC-1 · 102-500 — Dec 21 20:35 /etc/ssh/ssh_host_dsa_key.pub, Dec 21 20:35…

## 605. Dec 21 20:35 /etc/ssh/ssh_host_dsa_key.pub

-rw------- 1 root root

## 505. Dec 21 20:35 /etc/ssh/ssh_host_ecdsa_key

## 177. Dec 21 20:35 /etc/ssh/ssh_host_ecdsa_key.pub

-rw------- 1 root root

## 411. Dec 21 20:35 /etc/ssh/ssh_host_ed25519_key

## 97. Dec 21 20:35 /etc/ssh/ssh_host_ed25519_key.pub

-rw------- 1 root root 1823 Dec 21 20:35 /etc/ssh/ssh_host_rsa_key

## 397. Dec 21 20:35 /etc/ssh/ssh_host_rsa_key.pub

You can view the fingerprints of the keys by passing ssh-keygen the -l switch. You must also
provide the -f to specify the key file path:
halof:~ # ssh-keygen -l -f /etc/ssh/ssh_host_ed25519_key
256 SHA256:8cnPrinC49ZHc+/9Ai5pV+1JfZ4WBRZhd3rDOsc2zlA root@halof (ED25519)
halof:~ # ssh-keygen -l -f /etc/ssh/ssh_host_ed25519_key.pub
256 SHA256:8cnPrinC49ZHc+/9Ai5pV+1JfZ4WBRZhd3rDOsc2zlA root@halof (ED25519)

To view the key fingerprint as well as its random art, just add the -v switch like so:
halof:~ # ssh-keygen -lv -f /etc/ssh/ssh_host_ed25519_key.pub
256 SHA256:8cnPrinC49ZHc+/9Ai5pV+1JfZ4WBRZhd3rDOsc2zlA root@halof (ED25519)
+--[ED25519 256]--+

+oo|

.+o.|

..E.|

+ .

+.o|

541

S +

+ *o|

ooo Oo=|

. . . =o+.==|

= o =oo o=o|

o.o +o+..o.+|

+----[SHA256]-----+

SSH Port Tunnels
OpenSSH features a very powerful forwarding facility whereby traffic on a source port is
tunnelled — and encrypted — through an SSH process which then redirects it to a port on a
destination host. This mechanism is known as port tunnelling or port forwarding and has
important advantages like the following:
- It allows you to bypass firewalls to access ports on remote hosts.
- It allows access from the outside to a host on your private network.
- It provides encryption for all data exchange.
Roughly speaking, we can differentiate between local and remote port tunnelling.

Local Port Tunnel
You define a port locally to forward traffic to the destination host through the SSH process which
sits in between. The SSH process can run on the local host or on a remote server. For instance, if
for some reason you wanted to tunnel a connection to www.gnu.org through SSH using port 8585
on your local machine, you would do something like this:
carol@debian:~$ ssh -L 8585:www.gnu.org:80 debian
carol@debian's password:
Linux debian 4.19.0-9-amd64 #1 SMP Debian 4.19.118-2 (2020-04-29) x86_64
The programs included with the Debian GNU/Linux system are free software;
Last login: Sun Jun 28 13:47:27 2020 from 127.0.0.1

The explanation is as follows: with the -L switch, we specify the local port 8585 to connect to http
port 80 on www.gnu.org using the SSH process running on debian — our localhost. We could
have written ssh -L 8585:www.gnu.org:80 localhost with the same effect. If you now use a
web browser to go to http://localhost:8585, you will be forwarded to www.gnu.org. For
demonstration purposes, we will use lynx (the classic, text-mode web browser):

542

carol@debian:~$ lynx http://localhost:8585
- Back to Savannah Homepage
- Not Logged in
- Login
- New User
- This Page
- Language
- Clean Reload
- Printer Version
- Search
- _

If you wanted to do the exact same thing but connecting through an SSH process running on
halof, you would have proceeded like so:
carol@debian:~$ ssh -L 8585:www.gnu.org:80 -Nf ina@192.168.1.77
carol@debian:~$
carol@debian:~$ lynx http://localhost:8585
- Back to Savannah Homepage
- Not Logged in
- Login
- New User
- This Page
- Language
- Clean Reload
- Printer Version
- Search
- _

It is important that you note three details in the command:
- Thanks to the -N option we did not login to halof but did the port forwarding instead.
- The -f option told SSH to run in the background.
- We specified user ina to do the forwarding: ina@192.168.1.77

543

Remote Port Tunnel
In remote port tunnelling (or reverse port forwarding) the traffic coming on a port on the remote
server is forwarded to the SSH process running on your local host, and from there to the specified
port on the destination server (which may also be your local machine). For example, say you
wanted to let someone from outside your network access the Apache web server running on your
local host through port 8585 of the SSH server running on halof (192.168.1.77). You would
proceed with the following command:
carol@debian:~$ ssh -R 8585:localhost:80 -Nf ina@192.168.1.77
carol@debian:~$

Now anyone who establishes a connection on host halof on port 8585 on the localhost
interface will see Debian’s Apache2 default homepage:
carol@halof:~$ lynx localhost:8585
Apache2 Debian Default
Page: It works (p1 of 3)
Debian Logo Apache2 Debian Default Page
It works!
This is the default welcome page used to test the correct operation of the Apache2 server
after
installation on Debian systems. If you can read this page, it means that the Apache HTTP
installed at this site is working properly. You should replace this file (located at
/var/www/html/index.html) before continuing to operate your HTTP server.

To allow the remote host halof to create a tunnel with all its network interfaces on a specific port,
it is necessary to first ensure that the GatewayPorts yes parameter is configured in the
sshd_config file for mapping to all interfaces to work. By default, the parameter is set to no,
which causes only the localhost interface to be mapped for the tunnel.
carol@debian:~$ ssh -R 0.0.0.0:8585:localhost:80 -Nf ina@192.168.1.77
carol@debian:~$

544

Now, anyone who establishes a connection to halof on port 8585 on any IP address interface will
see Debian’s Apache2 default homepage:
carol@debian:~$ lynx 192.168.1.77:8585
Apache2 Debian Default
Page: It works (p1 of 3)
Debian Logo Apache2 Debian Default Page
It works!

There is a third, more complex type of port forwarding which is outside the scope
of this lesson: dynamic port forwarding. Instead of interacting with a single port,
this type of forwarding uses various TCP communications across a range of ports.

X11 Tunnels
Now that you understand port tunnels, let us round this lesson off by discussing X11 tunnelling
(also known as X11forwarding). Through an X11 tunnel, the X Window System on the remote host
is forwarded to your local machine. For that, you just need to pass ssh the -X option:
carol@debian:~$ ssh -X ina@halof

You can now launch a graphical application such as the firefox web browser with the following
result: the app will be run on the remote server, but its display will be forwarded to your local
host.
If you start a new SSH session with the -x option instead, X11forwarding will be disabled. Try to
start firefox now and you will get an error such as the following:
carol@debian:~$ ssh -x ina@halof
carol@192.168.0.106's password:
ina@halof:~$ firefox
(firefox-esr:1779): Gtk-WARNING **: 18:45:45.603: Locale not supported by C library.
Using the fallback 'C' locale.
Error: no DISPLAY environment variable specified

545

546

The three configuration directives related to local port forwarding, remote port
forwarding and X11 forwarding are AllowTcpForwarding,GatewayPorts and
X11Forwarding, respectively. For more information, type man ssh_config and/or
man sshd_config.

## 1. Logged in as user sonya on your client machine, carry out the following SSH tasks on the
remote server halof:
- Execute the command to list the contents of ~/.ssh as user serena on the remote host; then
return to your local terminal.

- Login as user serena on the remote host.

- Login as user sonya on the remote host.

- Delete all keys belonging to halof from your local ~/.ssh/known_hosts file.

- On your client machine, create an ecdsa key pair of 256 bits.

- On your client machine, create an ed25519 key pair of 256 bits.

## 2. Put the following steps in the right order to establish an SSH connection using the SSH
authentication agent:
- On the client, start a new Bash shell for the authentication agent with ssh-agent
/bin/bash.
- On the client, create a key pair using ssh-keygen.
- On the client, add your private key to a secure area of memory with ssh-add.
- Add your client’s public key to the ~/.ssh/authorized_keys file of the user you want to
login as on the remote host.
- If it does not already exist, create ~/.ssh for the user you want to login as on the server.
- Connect to the remote server.

547

Step 4:
Step 5:
Step 6:
3. Regarding port forwarding, what option and directive is used for the following tunnel types:
Tunnel Type

Directive

Remote or Reverse
4. Suppose you type the command ssh -L 8888:localhost:80 -Nf ina@halof into the
terminal of your client machine. Still on the client machine, you point a browser to
http://localhost:8888. What will you get?

548

## 1. Concerning SSH security directives:
- What directive is used in /etc/ssh/sshd_config to enable root logins:

- What directive would you use in /etc/ssh/sshd_config to specify only a local account to
accept SSH connections:

## 2. When using the same user on both the client and the server, what ssh command can you use to
transfer the client’s public key over to the server so that you can login through public key
authentication?

## 3. Create two local port tunnels in a single command forwarding local unprivileged ports 8080
and 8585 through remote server halof to the websites www.gnu.org and www.melpa.org,
respectively. Use user ina on the remote server and do not forget to use the -Nf switches:

549

In this lesson we have discussed OpenSSH 2, which uses the Secure Shell protocol to encrypt
communications between server and client. You learned:
- how to login to a remote server.
- how to execute commands remotely.
- how to create key pairs.
- how to establish key-based logins.
- how to use the authentication agent for both extra security and convenience.
- the public-key algorithms supported by OpenSSH: RSA, DSA, ecdsa, ed25519.
- the role of OpenSSH host keys.
- how to create port tunnels: local, remote and X.
The following commands were discussed in this lesson:
Log into or excute commands on a remote machine.
ssh-keygen
Generate, manage and convert authentication keys.
ssh-agent
OpenSSH authentication agent.
ssh-add
Adds private key identities to the authentication agent.

550

## 1. Logged in as user sonya on your client machine, carry out the following SSH tasks on the
remote server halof:
- Execute the command to list the contents of ~/.ssh as user serena on the remote host; then
return to your local terminal.
ssh serena@halof ls .ssh

- Login as user serena on the remote host.
ssh serena@halof

- Login as user sonya on the remote host.
ssh halof

- Delete all keys belonging to halof from your local ~/.ssh/known_hosts file.
ssh-keygen -R halof

- On your client machine, create an ecdsa key pair of 256 bits.
ssh-keygen -t ecdsa -b 256

- On your client machine, create an ed25519 key pair of 256 bits.
ssh-keygen -t ed25519

## 2. Put the following steps in the right order to establish an SSH connection using the SSH
authentication agent:
- On the client, start a new Bash shell for the authentication agent with ssh-agent
/bin/bash.
- On the client, create a key pair using ssh-keygen.
- On the client, add your private key to a secure area of memory with ssh-add.

551

- Add your client’s public key to the ~/.ssh/authorized_keys file of the user you want to
login as on the remote host.
- If it does not already exist, create ~/.ssh for the user you want to login as on the server.
- Connect to the remote server.

On the client, create a key pair using sshkeygen.

If it does not already exist, create ~/.ssh for
the user you want to login as on the server.

Add your client’s public key to the
~/.ssh/authorized_keys file of the user
you want to login as on the remote host.

Step 4:

On the client, start a new Bash shell for the
authentication agent with ssh-agent
/bin/bash.

Step 5:

On the client, add your private key to a
secure area of memory with ssh-add.

Step 6:

Connect to the remote server.

## 3. Regarding port forwarding, what option and directive is used for the following tunnel types:
Tunnel Type

Directive

-L

AllowTcpForwarding

Remote or Reverse

-R

GatewayPorts

-X

X11Forwarding

## 4. Suppose you type the command ssh -L 8888:localhost:80 -Nf ina@halof into the
terminal of your client machine. Still on the client machine, you point a browser to
http://localhost:8888. What will you get?
The webserver’s homepage of halof, as localhost is understood from the server’s
perspective.

552

## 1. Concerning SSH security directives:
- What directive is used in /etc/ssh/sshd_config to enable root logins:
PermitRootLogin
- What directive would you use in /etc/ssh/sshd_config to specify only a local account to
accept SSH connections:
AllowUsers
2. When using the same user on both the client and the server, what ssh command can you use to
transfer the client’s public key over to the server so that you can login through public key
authentication?
ssh-copy-id
3. Create two local port tunnels in a single command forwarding local unprivileged ports 8080
and 8585 through remote server halof to the websites www.gnu.org and www.melpa.org,
respectively. Use user ina on the remote server and do not forget to use the -Nf switches:
ssh -L 8080:www.gnu.org:80 -L 8585:www.melpa.org:80 -Nf ina@halof

553

### 110.3 Lesson 2

### 110.3 Securing data with encryption

In the previous lesson we learned how to use OpenSSH to encrypt remote login sessions as well as
any other subsequent exchange of information. There may be other scenarios where you may
want to encrypt files or email so that they reach their recipient safely and free from prying eyes.
You may also need to digitally sign those files or messages to prevent them from being tampered
with.
A great tool for these types of uses is the GNU Privacy Guard (aka GnuPG or simply GPG), which is
a free and open source implementation of the proprietary Pretty Good Privacy (PGP). GPG uses the
OpenPGP standard as defined by the OpenPGP Working Group of the Internet Engineering Task
Force (IETF) in RFC 4880. In this lesson we will be reviewing the basics of the GNU Privacy Guard.

Perform Basic GnuPG Configuration, Usage and Revocation
Just as with SSH, the underlying mechanism to GPG is that of asymmetric cryptography or publickey cryptography. A user generates a key pair which is made up of a private key and a public key.
The keys are mathematically related in such a way that what is encrypted by one can only be
decrypted by the other. For communication to take place successfully, the user has to send their

554

public key to the intended recipient.

GnuPG Configuration and Usage
The command to work with GPG is gpg. You can pass it a number of options to carry out different
tasks. Let us start by generating a key pair as user carol. For that, you will use the gpg --gen
-key command:
carol@debian:~$ gpg --gen-key
gpg (GnuPG) 2.2.12; Copyright (C) 2018 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
gpg: directory '/home/carol/.gnupg' created
gpg: keybox '/home/carol/.gnupg/pubring.kbx' created
Note: Use "gpg --full-generate-key" for a full featured key generation dialog.
GnuPG needs to construct a user ID to identify your key.
Real name:

After informing you — amongst other things — that the configuration directory ~/.gnupg and
your public keyring ~/.gnugpg/pubring.kbx have been created, gpg goes on to ask you to
provide your real name and email address:
Real name: carol
Email address: carol@debian
You selected this USER-ID:
"carol <carol@debian>"
Change (N)ame, (E)mail, or (O)kay/(Q)uit?

If you are OK with the resulting USER-ID and press O , you will be then asked for a passphrase (it is
recommended that it has enough complexity):
┌──────────────────────────────────────────────────────┐
│ Please enter the passphrase to

│ protect your new key

555

│ Passphrase:

Some final messages will be displayed telling you about the creation of other files as well as the
keys themselves and then you are done with the key generation process:
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: /home/carol/.gnupg/trustdb.gpg: trustdb created
gpg: key 19BBEFD16813034E marked as ultimately trusted
gpg: directory '/home/carol/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/home/carol/.gnupg/openpgprevocs.d/D18FA0021F644CDAF57FD0F919BBEFD16813034E.rev'
public and secret key created and signed.
pub

rsa3072 2020-07-03 [SC] [expires: 2022-07-03]
D18FA0021F644CDAF57FD0F919BBEFD16813034E

carol <carol@debian>
rsa3072 2020-07-03 [E] [expires: 2022-07-03]

You can now see what is inside the ~/.gnupg directory (GPG’s configuration directory):
carol@debian:~/.gnupg$ ls -l
total 16
drwx------ 2 carol carol 4096 Jul

3 23:34 openpgp-revocs.d

drwx------ 2 carol carol 4096 Jul

3 23:34 private-keys-v1.d

-rw-r--r-- 1 carol carol 1962 Jul

3 23:34 pubring.kbx

-rw------- 1 carol carol 1240 Jul

3 23:34 trustdb.gpg

Let us explain the use of each file:
opengp-revocs.d
The revocation certificate that was created along with the key pair is kept here. The
permissions on this directory are quite restrictive as anyone who has access to the certificate
could revoke the key (more on key revocation in the next subsection).

556

This is the directory that keeps your private keys, therefore permissions are restrictive.
This is your public keyring. It stores your own as well as any other imported public keys.
The trust database. This has to do with the concept of Web of Trust (which is outside the scope
of this lesson).

The arrival of GnuPG 2.1 brought along some significant changes, such as the
disappearance of the secring.gpg and pubring.gpg files in favour of privatekeys-v1.d and pubring.kbx, respectively.

Once your key pair has been created, you can view your public keys with gpg --listkeys — which will display the contents of your public keyring:
carol@debian:~/.gnupg$ gpg --list-keys
/home/carol/.gnupg/pubring.kbx
-----------------------------pub

rsa3072 2020-07-03 [SC] [expires: 2022-07-03]
D18FA0021F644CDAF57FD0F919BBEFD16813034E

[ultimate] carol <carol@debian>
rsa3072 2020-07-03 [E] [expires: 2022-07-03]

The hexadecimal string D18FA0021F644CDAF57FD0F919BBEFD16813034E is your public key
fingerprint.

Apart from the USER-ID (carol in the example), there is also the KEY-ID. The KEYID consists of the last 8 hexadecimal digits in your public key fingerprint (6813
034E). You can check your key fingerprint with the command gpg --fingerprint
USER-ID.

Key Distribution and Revocation
Now that you have your public key, you should save it (i.e. export it) to a file so that you can make
it available to your future recipients. They will then be able to use it to encrypt files or messages
intended for you (since you are the only one in posssession of the private key, you will also be the
only one able to decrypt and read them). Likewise, your recipients will also use it to decrypt and
verify your encrypted or signed messages/files. The command to use is gpg --export followed by
the USER-ID and a redirection to the output file name of your choice:

carol@debian:~/.gnupg$ gpg --export carol > carol.pub.key
carol@debian:~/.gnupg$ ls
carol.pub.key

openpgp-revocs.d

Passing the -a or --armor option to gpg --export(e.g.: gpg --export --armor
carol > carol.pub.key) will create ASCII armored output (instead of the default
binary OpenPGP format) which can be safely emailed.

As already noted, you must now send your public key file (carol.pub.key) to the recipient with
whom you want to exchange information. For instance, let us send the public key file to ina on
remote server halof using scp(secure copy):
carol@debian:~/.gnupg$ scp carol.pub.key ina@halof:/home/ina/
carol.pub.key
100% 1740

775.8KB/s

00:00

carol@debian:~/.gnupg$

ina is now in the possession of carol.pub.key. She will use it to encrypt a file and send it to
carol in the next section.

Another means of public key distribution is through the use of key servers: you
upload your public key to the server with the command gpg --keyserver
keyserver-name --send-keys KEY-ID and other users will get (i.e. import) them
with gpg --keyserver keyserver-name --recv-keys KEY-ID.

Let us close this section by discussing key revocation. Key revocation should be used when your
private keys have been compromised or retired. The first step is to create a revocation certificate
by passing gpg the option --gen-revoke followed by the USER-ID. You can precede --gen
-revoke with the --output option followed by a destination file name specification to save the
resulting certificate into a file (instead of having it printed on the terminal screen). The output
messages throughout the revocation process are quite self-explanatory:
sonya@debian:~/.gnupg$ gpg --output revocation_file.asc --gen-revoke sonya
sec

rsa3072/0989EB7E7F9F2066 2020-07-03 sonya <sonya@debian>

Create a revocation certificate for this key? (y/N) y
Please select the reason for the revocation:
0 = No reason specified

558

1 = Key has been compromised
2 = Key is superseded
3 = Key is no longer used
Q = Cancel
(Probably you want to select 1 here)
Your decision? 1
Enter an optional description; end it with an empty line:
> My laptop was stolen.
>
Reason for revocation: Key has been compromised
My laptop was stolen.
Is this okay? (y/N) y
ASCII armored output forced.
Revocation certificate created.
Please move it to a medium which you can hide away; if Mallory gets
access to this certificate he can use it to make your key unusable.
It is smart to print this certificate and store it away, just in case
your media become unreadable.

But have some caution:

The print system of

your machine might store the data and make it available to others!

The revocation certificate has been saved to the file revocation_file.asc (asc for ASCII
format):
sonya@debian:~/.gnupg$ ls
openpgp-revocs.d

revocation_file.asc

sonya@debian:~/.gnupg$ cat revocation_file.asc
-----BEGIN PGP PUBLIC KEY BLOCK----Comment: This is a revocation certificate
iQHDBCABCgAtFiEEiIVjfDnnpieFi0wvnlcN6yLCeHEFAl8ASx4PHQJzdG9sZW4g
bGFwdG9wAAoJEJ5XDesiwnhxT9YMAKkjQiMpo9Uyiy9hyvukPPSrLcmtAGLk4pKS
pLZfzA5kxa+HPQwBglAEvfNRR6VMxqXUgUGYC/IAyQQM62oNAcY2PCPrxyJNgVF7
8l4mMZKvW++5ikjZwyg6WWV0+w6oroeo9qruJFjcu752p4T+9gsHVa2r+KRqcPQe
aZ65sAvsBJlcsUDZqfWUXg2kQp9mNPCdQuqvDaKRgNCHA1zbzNFzXWVd2X5RgFo5
nY+tUP8ZQA9DTQPBLPcggICmfLopMPZYB2bft5geb2mMi2oNpf9CNPdQkdccimNV
aRjqdUP9C89PwTafBQkQiONlsR/dWTFcqprG5KOWQPA7xjeMV8wretdEgsyTxqHp
v1iRzwjshiJCKBXXvz7wSmQrJ4OfiMDHeS4ipR0AYdO8QCzmOzmcFQKikGSHGMy1
z/YRlttd6NZIKjf1TD0nTrFnRvPdsZOlKYSArbfqNrHRBQkgirOD4JPI1tYKTffq
iOeZFx25K+fj2+0AJjvrbe4HDo5m+Q==
=umI8
-----END PGP PUBLIC KEY BLOCK-----

559

To effectively revoke your private key, you now need to merge the certificate with the key, which
is done by importing the revocation certificate file to your keyring:
sonya@debian:~/.gnupg$ gpg --import revocation_file.asc
gpg: key 9E570DEB22C27871: "sonya <sonya@debian>" revocation certificate imported
gpg: Total number processed: 1

new key revocations: 1

gpg: marginals needed: 3

completes needed: 1

gpg: depth: 0

signed:

valid:

trust model: pgp

trust: 0-, 0q, 0n, 0m, 0f, 1u

gpg: next trustdb check due at 2022-07-04

List your keys now and you will be informed about your revoked key:
sonya@debian:~/.gnupg$ gpg --list-keys
/home/sonya/.gnupg/pubring.kbx
pub

rsa3072 2020-07-04 [SC] [revoked: 2020-07-04]
8885637C39E7A627858B4C2F9E570DEB22C27871

[ revoked] sonya <sonya@debian>

Last — but not least — make sure you make the revoked key available to any party that has public
keys associated with it (including keyservers).

Use GPG to Encrypt, Decrypt, Sign and Verify Files
In the previous section, carol sent her public key to ina. We will use it now to discuss how GPG
can encrypt, decrypt, sign and verify files.

Encrypting and Decrypting Files
First, ina must import carol's public key (carol.pub.key) into her keyring so that she can start
working with it:
ina@halof:~> gpg --import carol.pub.key
gpg: /home/ina/.gnupg/trustdb.gpg: trustdb created
gpg: key 19BBEFD16813034E: public key "carol <carol@debian>" imported
gpg: Total number processed: 1

imported: 1

ina@halof:~> gpg --list-keys
/home/ina/.gnupg/pubring.kbx
---------------------------pub

560

rsa3072 2020-07-03 [SC] [expires: 2022-07-03]

D18FA0021F644CDAF57FD0F919BBEFD16813034E

[ unknown] carol <carol@debian>
rsa3072 2020-07-03 [E] [expires: 2022-07-03]

Next you will create a file by writing some text into it and then encrypt it using gpg (because you
did not sign carol's key, you will be explicitly asked if you want to use that key):
ina@halof:~> echo "This is the message ..." > unencrypted-message
ina@halof:~> gpg --output encrypted-message --recipient carol --armor --encrypt unencryptedmessage
gpg: 0227347CC92A5CB1: There is no assurance this key belongs to the named user

rsa3072/0227347CC92A5CB1 2020-07-03 carol <carol@debian>

Primary key fingerprint: D18F A002 1F64 4CDA F57F

D0F9 19BB EFD1 6813 034E

Subkey fingerprint: 9D89 1BF9 39A4 C130 E44B

1135 0227 347C C92A 5CB1

It is NOT certain that the key belongs to the person named
in the user ID.

If you really know what you are doing,

you may answer the next question with yes.
Use this key anyway? (y/N) y

Let us break down the gpg command:
--output encrypted-message
Filename specification for the encrypted version of the original file (encrypted-message in
the example).
--recipient carol
Recipient’s USER-ID specification (carol in our example). If not provided, GnuPG will ask for it
(unless --default-recipient is specified).
--armor
This option produces ASCII armored output, which can be copied into an email.
--encrypt unencrypted-message
Filename specification of the original file to encrypt.
You can now send the encrypted-message to carol on debian using scp:
ina@halof:~> scp encrypted-message carol@debian:/home/carol/
carol@debian's password:

561

encrypted-message
1.8MB/s

100%

736

00:00

If you log in as carol now and try to read the encrypted-message, you will confirm that it is
actually encrypted and — therefore — unreadable:
carol@debian:~$ cat encrypted-message
-----BEGIN PGP MESSAGE----hQGMAwInNHzJKlyxAQv/brJ8Ubs/xya35sbv6kdRKm1C7ONLxL3OueWA4mCs0Y/P
GBna6ZEUCrMEgl/rCyByj3Yq74kuiTmzxAIRUDdvHfj0TtrOWjVAqIn/fPSfMkjk
dTxKo1i55tLJ+sj17dGMZDcNBinBTP4U1atuN71A5w7vH+XpcesRcFQLKiSOmYTt
F7SN3/5x5J6io4ISn+b0KbJgiJNNx+Ne/ub4Uzk4NlK7tmBklyC1VRualtxcG7R9
1klBPYSld6fTdDwT1Y4MofpyILAiGMZvUR1RXauEKf7OIzwC5gWU+UQPSgeCdKQu
X7QL0ZIBS0Ug2XKrO1k93lmDjf8PWsRIml6n/hNelaOBA3HMP0b6Ozv1gFeEsFvC
IxhUYPb+rfuNFTMEB7xIO94AAmWB9N4qknMxdDqNE8WhA728Plw6y8L2ngsplY15
MR4lIFDpljA/CcVh4BXVe9j0TdFWDUkrFMfaIfcPQwKLXEYJp19XYIaaEazkOs5D
W4pENN0YOcX0KWyAYX6r0l8BF0rq/HMenQwqAVXMG3s8ATuUOeqjBbR1x1qCvRQP
CR/3V73aQwc2j5ioQmhWYpqxiro0yKX2Ar/E6rZyJtJYrq+CUk8O3JoBaudknNFj
pwuRwF1amwnSZ/MZ/9kMKQ==
=g1jw
-----END PGP MESSAGE-----

However, as you are in possession of the private key, you can easily decrypt the message by
passing gpg the --decrypt option followed by the path to the encrypted file (the private key’s
passphrase will be required):
carol@debian:~$ gpg --decrypt encrypted-message
gpg: encrypted with 3072-bit RSA key, ID 0227347CC92A5CB1, created 2020-07-03
"carol <carol@debian>"
This is the message ...

You can also specify the --output option to save the message into a new unencrypted file:
carol@debian:~$ gpg --output unencrypted-message --decrypt encrypted-message
gpg: encrypted with 3072-bit RSA key, ID 0227347CC92A5CB1, created 2020-07-03
"carol <carol@debian>"
carol@debian:~$ cat unencrypted-message
This is the message ...

562

Signing and Verifying Files
Apart from encrypting, GPG can also be used to sign files. The --sign option is relevant here. Let
us start by creating a new message (message) and signing it with the --sign option (your private
key’s passphrase will be required):
carol@debian:~$ echo "This is the message to sign ..." > message
carol@debian:~$ gpg --output message.sig --sign message

Breakdown of the gpg command:
--output message
Filename specification of the signed version of the original file (message.sig in our example).
--sign message
Path to original file.

Using --sign the document is compressed and then signed. The output is in binary
format.

Next we will transfer the file to ina on halof using scp message.sig ina@halof:/home/ina .
Back as ina on halof, you can now verify it by using the --verify option:
ina@halof:~> gpg --verify message.sig
gpg: Signature made Sat 04 jul 2020 14:34:41 CEST

using RSA key D18FA0021F644CDAF57FD0F919BBEFD16813034E

gpg: Good signature from "carol <carol@debian>" [unknown]

If you also want to read the file, you have to decrypt it to a new file (message in our case) using
the --output option:
ina@halof:~> gpg --output message --decrypt message.sig
gpg: Signature made Sat 04 jul 2020 14:34:41 CEST

using RSA key D18FA0021F644CDAF57FD0F919BBEFD16813034E

gpg: Good signature from "carol <carol@debian>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!

There is no indication that the signature belongs to the owner.

Primary key fingerprint: D18F A002 1F64 4CDA F57F

D0F9 19BB EFD1 6813 034E

ina@halof:~> cat message

563

This is the message to sign ...

GPG-Agent
We will round this lesson off by briefly touching upon gpg-agent. gpg-agent is the daemon that
manages private keys for GPG (it is started on demand by gpg). To view a summary of the most
useful options, run gpg-agent --help or gpg-agent -h:
carol@debian:~$ gpg-agent --help
gpg-agent (GnuPG) 2.2.4
libgcrypt 1.8.1
Copyright (C) 2017 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Syntax: gpg-agent [options] [command [args]]
Secret key management for GnuPG
Options:
--daemon

run in daemon mode (background)

--server

run in server mode (foreground)

--supervised

run in supervised mode

-v, --verbose

verbose

-q, --quiet

be somewhat more quiet

-s, --sh

sh-style command output

-c, --csh

csh-style command output

564

For more information, consult the gpg-agent man page.

## 1. Complete the table by providing the correct filename:

Filename

Trust database
Directory for revocation certificates
Directory for private keys
Public keyring
2. Answer the following questions:
- What type of cryptography is used by GnuPG?

- What are the two main components of public key cryptography?

- What is the KEY-ID of the public key fingerprint 07A6 5898 2D3A F3DD 43E3 DA95 1F3F
3147 FA7F 54C7?

- What method is used to distribute public keys at a global level?

## 3. Put the following steps in the right order concerning private key revocation:
- Make the revoked key available to your correspondents.
- Create a revocation certificate.
- Import the revocation certificate to your keyring.
4. Regarding file encryption, what does the --armor option imply in the command gpg
--output encrypted-message --recipient carol --armor --encrypt unencryptedVersion: 2024-12-27

565

message?

566

## 1. Most gpg options have both a long and a short version. Complete the table with the
corresponding short version:
Long version

Short version

--armor
--output
--recipient
--decrypt
--encrypt
--sign
2. Answer the following questions concerning key export:
- What command would you use to export all of your public keys to a file called all.key?

- What command would you use to export all of your private keys to a file called
all_private.key?

## 3. What gpg option allows for carrying out most key management related tasks by presenting you
with a menu?

## 4. What gpg option allows you to make a cleartext signature?

567

This lesson has covered the GNU Privacy Guard, an excellent choice to encrypt/decrypt and
digitally sign/verify files. You learned:
- how to generate a pair of keys.
- how to list the keys in your keyring.
- the contents of the ~/.gnupg directory.
- what USER-ID and KEY-ID are.
- how to distribute public keys to your correspondents.
- how to globally distribute public keys through keyservers.
- how to revoke private keys.
- how to encrypt and decrypt files.
- how to sign and verify files.
- the basics of the GPG-Agent.
The following commands were discussed in this lesson:
gpg
OpenPGP encryption and signing tool.

568

## 1. Complete the table by providing the correct file name:

Filename

Trust database

Directory for revocation certificates

opengp-revocs.d

Directory for private keys

Public keyring

## 2. Answer the following questions:
- What type of cryptography is used by GnuPG?
Public key cryptography or asymmetric cryptography.
- What are the two main components of public key cryptography?
The public and the private keys.
- What is the KEY-ID of the public key fingerprint 07A6 5898 2D3A F3DD 43E3 DA95 1F3F
3147 FA7F 54C7?
FA7F 54C7
- What method is used to distribute public keys at a global level?
Key servers.
3. Put the following steps in the right order concerning private key revocation:
- Make the revoked key available to your correspondents
- Create a revocation certificate
- Import the revocation certificate to your keyring

Create a revocation certificate

Import the revocation certificate to your
keyring

569

Make the revoked key available to your
correspondents

## 4. Regarding file encryption, what does the --armor option imply in the command gpg
--output encrypted-message --recipient carol --armor --encrypt unencryptedmessage?
It produces ASCII armored output, which allows you to copy the resulting existing encrypted
file into an email.

570

## 1. Most gpg options have both a long and a short version. Complete the table with the
corresponding short version:
Long version

Short version

--armor

-a

--output

-o

--recipient

-r

--decrypt

--encrypt

--sign

## 2. Answer the following questions concerning key export:
- What command would you use to export all of your public keys to a file called all.key?
gpg --export --output all.key or gpg --export -o all.key
- What command would you use to export all of your private keys to a file called
all_private.key?
gpg --export-secret-keys --output all_private.key or gpg --export-secret
-keys -o all_private.key (--export-secret-keys can be replaced by --export
-secret-subkeys with a slightly different outcome — check man pgp for more
information).
3. What gpg option allows for carrying out most key management related tasks by presenting you
with a menu?
--edit-key
4. What gpg option allows you to make a cleartext signature?
--clearsign

571

Imprint
© 2024 by Linux Professional Institute: Learning Materials, “LPIC-1 (102) (Version 5.0)”.
PDF generated: 2024-12-27
This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
International License (CC BY-NC-ND 4.0). To view a copy of this license, visit
https://creativecommons.org/licenses/by-nc-nd/4.0/
While Linux Professional Institute has used good faith efforts to ensure that the information and
instructions contained in this work are accurate, Linux Professional Institute disclaims all
responsibility for errors or omissions, including without limitation responsibility for damages
resulting from the use of or reliance on this work. Use of the information and instructions
contained in this work is at your own risk. If any code samples or other technology this work
contains or describes is subject to open source licenses or the intellectual property rights of
others, it is your responsibility to ensure that your use thereof complies with such licenses and/or
rights.
The LPI Learning Materials are an initiative of Linux Professional Institute (https://lpi.org).
Learning Materials and their translations can be found at https://learning.lpi.org.
For questions and comments on this edition as well as on the entire project write an email to:
learning@lpi.org.

572
