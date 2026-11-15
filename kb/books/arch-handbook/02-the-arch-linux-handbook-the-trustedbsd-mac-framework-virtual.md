---
id: arch-handbook-02
title: "The Arch Linux Handbook — The TrustedBSD MAC Framework, Virtual Memory System, SMPng Design…"
slug: arch-handbook-02-the-arch-linux-handbook-the-trustedbsd-mac-framework-virtual
source: "The Arch Linux Handbook"
sourceSection: "Chapter 6. The TrustedBSD MAC Framework, Chapter 7. Virtual Memory System, Chapter 8. SMPng Design Document, Chapter 9. Writing FreeBSD Device Drivers, Chapter 10. ISA Device Drivers"
track: linux-engineer
tier: free
tags: [linux, arch, packaging, sysadmin]
summary: "This documentation was developed for the FreeBSD Project by Chris Costello at Safeport Network Covers 5 sections: The TrustedBSD MAC Framework, Virtual Memory System, SMPng Design Document."
---
# The Arch Linux Handbook — The TrustedBSD MAC Framework, Virtual Memory System, SMPng Design…

## Chapter 6. The TrustedBSD MAC Framework
### 6.1 MAC Documentation Copyright
This documentation was developed for the FreeBSD Project by Chris Costello at Safeport Network
Services and Network Associates Laboratories, the Security Research Division of Network
Associates, Inc. under DARPA/SPAWAR contract N66001-01-C-8035 ("CBOSS"), as part of the DARPA
CHATS research program.
Redistribution and use in source (SGML DocBook) and 'compiled' forms (SGML, HTML, PDF,
PostScript, RTF and so forth) with or without modification, are permitted provided that the
following conditions are met:
1. Redistributions of source code (SGML DocBook) must retain the above copyright notice, this list
of conditions and the following disclaimer as the first lines of this file unmodified.
2. Redistributions in compiled form (transformed to other DTDs, converted to PDF, PostScript, RTF
and other formats) must reproduce the above copyright notice, this list of conditions and the
following disclaimer in the documentation and/or other materials provided with the
distribution.
THIS

DOCUMENTATION

IS

PROVIDED

BY

THE

NETWORKS

ASSOCIATES

TECHNOLOGY, INC "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
INCLUDING,

BUT

NOT

LIMITED

TO,

THE

IMPLIED

WARRANTIES

MERCHANTABILITY

AND

FITNESS

FOR

A

PARTICULAR

PURPOSE

OF
ARE

DISCLAIMED. IN NO EVENT SHALL NETWORKS ASSOCIATES TECHNOLOGY, INC



BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
DOCUMENTATION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### 6.2 Synopsis
FreeBSD includes experimental support for several mandatory access control policies, as well as a
framework for kernel security extensibility, the TrustedBSD MAC Framework. The MAC Framework
is a pluggable access control framework, permitting new security policies to be easily linked into
the kernel, loaded at boot, or loaded dynamically at run-time. The framework provides a variety of
features to make it easier to implement new security policies, including the ability to easily tag
security labels (such as confidentiality information) onto system objects.
This chapter introduces the MAC policy framework and provides documentation for a sample MAC
policy module.

### 6.3 Introduction
The TrustedBSD MAC framework provides a mechanism to allow the compile-time or run-time
extension of the kernel access control model. New system policies may be implemented as kernel
modules and linked to the kernel; if multiple policy modules are present, their results will be
composed. The MAC Framework provides a variety of access control infrastructure services to
assist policy writers, including support for transient and persistent policy-agnostic object security
labels. This support is currently considered experimental.
This chapter provides information appropriate for developers of policy modules, as well as
potential consumers of MAC-enabled environments, to learn about how the MAC Framework
supports access control extension of the kernel.

### 6.4 Policy Background
Mandatory Access Control (MAC), refers to a set of access control policies that are mandatorily
enforced on users by the operating system. MAC policies may be contrasted with Discretionary
Access Control (DAC) protections, by which non-administrative users may (at their discretion)
protect objects. In traditional UNIX systems, DAC protections include file permissions and access
control lists; MAC protections include process controls preventing inter-user debugging and
firewalls. A variety of MAC policies have been formulated by operating system designers and
security researches, including the Multi-Level Security (MLS) confidentiality policy, the Biba
integrity policy, Role-Based Access Control (RBAC), Domain and Type Enforcement (DTE), and Type
Enforcement (TE). Each model bases decisions on a variety of factors, including user identity, role,
and security clearance, as well as security labels on objects representing concepts such as data
sensitivity and integrity.
The TrustedBSD MAC Framework is capable of supporting policy modules that implement all of
these policies, as well as a broad class of system hardening policies, which may use existing security
attributes, such as user and group IDs, as well as extended attributes on files, and other system
properties. In addition, despite the name, the MAC Framework can also be used to implement
purely discretionary policies, as policy modules are given substantial flexibility in how they
authorize protections.

### 6.5 MAC Framework Kernel Architecture
The TrustedBSD MAC Framework permits kernel modules to extend the operating system security
policy, as well as providing infrastructure functionality required by many access control modules. If
multiple policies are simultaneously loaded, the MAC Framework will usefully (for some definition
of useful) compose the results of the policies.

#### 6.5.1 Kernel Elements
The MAC Framework contains a number of kernel elements:
- Framework management interfaces
- Concurrency and synchronization primitives.

- Policy registration
- Extensible security label for kernel objects
- Policy entry point composition operators
- Label management primitives
- Entry point API invoked by kernel services
- Entry point API to policy modules
- Entry points implementations (policy life cycle, object life cycle/label management, access
control checks).
- Policy-agnostic label-management system calls
- mac_syscall() multiplex system call
- Various security policies implemented as MAC policy modules

#### 6.5.2 Framework Management Interfaces
The TrustedBSD MAC Framework may be directly managed using sysctl’s, loader tunables, and
system calls.
In most cases, sysctl’s and loader tunables of the same name modify the same parameters, and
control behavior such as enforcement of protections relating to various kernel subsystems. In
addition, if MAC debugging support is compiled into the kernel, several counters will be maintained
tracking label allocation. It is generally advisable that per-subsystem enforcement controls not be
used to control policy behavior in production environments, as they broadly impact the operation
of all active policies. Instead, per-policy controls should be preferred, as they provide greater
granularity and greater operational consistency for policy modules.
Loading and unloading of policy modules is performed using the system module management
system calls and other system interfaces, including boot loader variables; policy modules will have
the opportunity to influence load and unload events, including preventing undesired unloading of
the policy.

#### 6.5.3 Policy List Concurrency and Synchronization
As the set of active policies may change at run-time, and the invocation of entry points is nonatomic, synchronization is required to prevent loading or unloading of policies while an entry point
invocation is in progress, freezing the set of active policies for the duration. This is accomplished by
means of a framework busy count: whenever an entry point is entered, the busy count is
incremented; whenever it is exited, the busy count is decremented. While the busy count is
elevated, policy list changes are not permitted, and threads attempting to modify the policy list will
sleep until the list is not busy. The busy count is protected by a mutex, and a condition variable is
used to wake up sleepers waiting on policy list modifications. One side effect of this
synchronization model is that recursion into the MAC Framework from within a policy module is
permitted, although not generally used.
Various optimizations are used to reduce the overhead of the busy count, including avoiding the
full cost of incrementing and decrementing if the list is empty or contains only static entries

(policies that are loaded before the system starts, and cannot be unloaded). A compile-time option is
also provided which prevents any change in the set of loaded policies at run-time, which eliminates
the mutex locking costs associated with supporting dynamically loaded and unloaded policies as
synchronization is no longer required.
As the MAC Framework is not permitted to block in some entry points, a normal sleep lock cannot
be used; as a result, it is possible for the load or unload attempt to block for a substantial period of
time waiting for the framework to become idle.

#### 6.5.4 Label Synchronization
As kernel objects of interest may generally be accessed from more than one thread at a time, and
simultaneous entry of more than one thread into the MAC Framework is permitted, security
attribute storage maintained by the MAC Framework is carefully synchronized. In general, existing
kernel synchronization on kernel object data is used to protect MAC Framework security labels on
the object: for example, MAC labels on sockets are protected using the existing socket mutex.
Likewise, semantics for concurrent access are generally identical to those of the container objects:
for credentials, copy-on-write semantics are maintained for label contents as with the remainder of
the credential structure. The MAC Framework asserts necessary locks on objects when invoked
with an object reference. Policy authors must be aware of these synchronization semantics, as they
will sometimes limit the types of accesses permitted on labels: for example, when a read-only
reference to a credential is passed to a policy via an entry point, only read operations are permitted
on the label state attached to the credential.

#### 6.5.5 Policy Synchronization and Concurrency
Policy modules must be written to assume that many kernel threads may simultaneously enter one
more policy entry points due to the parallel and preemptive nature of the FreeBSD kernel. If the
policy module makes use of mutable state, this may require the use of synchronization primitives
within the policy to prevent inconsistent views on that state resulting in incorrect operation of the
policy. Policies will generally be able to make use of existing FreeBSD synchronization primitives
for this purpose, including mutexes, sleep locks, condition variables, and counting semaphores.
However, policies should be written to employ these primitives carefully, respecting existing kernel
lock orders, and recognizing that some entry points are not permitted to sleep, limiting the use of
primitives in those entry points to mutexes and wakeup operations.
When policy modules call out to other kernel subsystems, they will generally need to release any inpolicy locks in order to avoid violating the kernel lock order or risking lock recursion. This will
maintain policy locks as leaf locks in the global lock order, helping to avoid deadlock.

#### 6.5.6 Policy Registration
The MAC Framework maintains two lists of active policies: a static list, and a dynamic list. The lists
differ only with regards to their locking semantics: an elevated reference count is not required to
make use of the static list. When kernel modules containing MAC Framework policies are loaded,
the policy module will use SYSINIT to invoke a registration function; when a policy module is
unloaded, SYSINIT will likewise invoke a de-registration function. Registration may fail if a policy
module is loaded more than once, if insufficient resources are available for the registration (for

example, the policy might require labeling and insufficient labeling state might be available), or
other policy prerequisites might not be met (some policies may only be loaded prior to boot).
Likewise, de-registration may fail if a policy is flagged as not unloadable.

#### 6.5.7 Entry Points
Kernel services interact with the MAC Framework in two ways: they invoke a series of APIs to
notify the framework of relevant events, and they provide a policy-agnostic label structure pointer
in security-relevant objects. The label pointer is maintained by the MAC Framework via label
management entry points, and permits the Framework to offer a labeling service to policy modules
through relatively non-invasive changes to the kernel subsystem maintaining the object. For
example, label pointers have been added to processes, process credentials, sockets, pipes, vnodes,
Mbufs, network interfaces, IP reassembly queues, and a variety of other security-relevant
structures. Kernel services also invoke the MAC Framework when they perform important security
decisions, permitting policy modules to augment those decisions based on their own criteria
(possibly including data stored in security labels). Most of these security critical decisions will be
explicit access control checks; however, some affect more general decision functions such as packet
matching for sockets and label transition at program execution.

#### 6.5.8 Policy Composition
When more than one policy module is loaded into the kernel at a time, the results of the policy
modules will be composed by the framework using a composition operator. This operator is
currently hard-coded, and requires that all active policies must approve a request for it to return
success. As policies may return a variety of error conditions (success, access denied, object does not
exist, …), a precedence operator selects the resulting error from the set of errors returned by
policies. In general, errors indicating that an object does not exist will be preferred to errors
indicating that access to an object is denied. While it is not guaranteed that the resulting
composition will be useful or secure, we have found that it is for many useful selections of policies.
For example, traditional trusted systems often ship with two or more policies using a similar
composition.

#### 6.5.9 Labeling Support
As many interesting access control extensions rely on security labels on objects, the MAC
Framework provides a set of policy-agnostic label management system calls covering a variety of
user-exposed objects. Common label types include partition identifiers, sensitivity labels, integrity
labels, compartments, domains, roles, and types. By policy agnostic, we mean that policy modules
are able to completely define the semantics of meta-data associated with an object. Policy modules
participate in the internalization and externalization of string-based labels provides by user
applications, and can expose multiple label elements to applications if desired.
In-memory labels are stored in slab-allocated struct label, which consists of a fixed-length array of
unions, each holding a void * pointer and a long. Policies registering for label storage will be
assigned a "slot" identifier, which may be used to dereference the label storage. The semantics of
the storage are left entirely up to the policy module: modules are provided with a variety of entry
points associated with the kernel object life cycle, including initialization, association/creation, and
destruction. Using these interfaces, it is possible to implement reference counting and other storage

models. Direct access to the object structure is generally not required by policy modules to retrieve
a label, as the MAC Framework generally passes both a pointer to the object and a direct pointer to
the object’s label into entry points. The primary exception to this rule is the process credential,
which must be manually dereferenced to access the credential label. This may change in future
revisions of the MAC Framework.
Initialization entry points frequently include a sleeping disposition flag indicating whether or not
an initialization is permitted to sleep; if sleeping is not permitted, a failure may be returned to
cancel allocation of the label (and hence object). This may occur, for example, in the network stack
during interrupt handling, where sleeping is not permitted, or while the caller holds a mutex. Due
to the performance cost of maintaining labels on in-flight network packets (Mbufs), policies must
specifically declare a requirement that Mbuf labels be allocated. Dynamically loaded policies
making use of labels must be able to handle the case where their init function has not been called
on an object, as objects may already exist when the policy is loaded. The MAC Framework
guarantees that uninitialized label slots will hold a 0 or NULL value, which policies may use to
detect uninitialized values. However, as allocation of Mbuf labels is conditional, policies must also
be able to handle a NULL label pointer for Mbufs if they have been loaded dynamically.
In the case of file system labels, special support is provided for the persistent storage of security
labels in extended attributes. Where available, extended attribute transactions are used to permit
consistent compound updates of security labels on vnodes—currently this support is present only
in the UFS2 file system. Policy authors may choose to implement multilabel file system object labels
using one (or more) extended attributes. For efficiency reasons, the vnode label (v_label) is a cache
of any on-disk label; policies are able to load values into the cache when the vnode is instantiated,
and update the cache as needed. As a result, the extended attribute need not be directly accessed
with every access control check.

Currently, if a labeled policy permits dynamic unloading, its state slot cannot be
reclaimed, which places a strict (and relatively low) bound on the number of
unload-reload operations for labeled policies.

#### 6.5.10 System Calls
The MAC Framework implements a number of system calls: most of these calls support the policyagnostic label retrieval and manipulation APIs exposed to user applications.
The label management calls accept a label description structure, struct mac, which contains a series
of MAC label elements. Each element contains a character string name, and character string value.
Each policy will be given the chance to claim a particular element name, permitting policies to
expose multiple independent elements if desired. Policy modules perform the internalization and
externalization between kernel labels and user-provided labels via entry points, permitting a
variety of semantics. Label management system calls are generally wrapped by user library
functions to perform memory allocation and error handling, simplifying user applications that
must manage labels.
The following MAC-related system calls are present in the FreeBSD kernel:
- mac_get_proc() may be used to retrieve the label of the current process.

- mac_set_proc() may be used to request a change in the label of the current process.
- mac_get_fd() may be used to retrieve the label of an object (file, socket, pipe, …) referenced by a
file descriptor.
- mac_get_file() may be used to retrieve the label of an object referenced by a file system path.
- mac_set_fd() may be used to request a change in the label of an object (file, socket, pipe, …)
referenced by a file descriptor.
- mac_set_file() may be used to request a change in the label of an object referenced by a file
system path.
- mac_syscall() permits policy modules to create new system calls without modifying the system
call table; it accepts a target policy name, operation number, and opaque argument for use by
the policy.
- mac_get_pid() may be used to request the label of another process by process id.
- mac_get_link() is identical to mac_get_file(), only it will not follow a symbolic link if it is the
final entry in the path, so may be used to retrieve the label on a symlink.
- mac_set_link() is identical to mac_set_file(), only it will not follow a symbolic link if it is the
final entry in a path, so may be used to manipulate the label on a symlink.
- mac_execve() is identical to the execve() system call, only it also accepts a requested label to set
the process label to when beginning execution of a new program. This change in label on
execution is referred to as a "transition".
- mac_get_peer(), actually implemented via a socket option, retrieves the label of a remote peer on
a socket, if available.
In addition to these system calls, the SIOCSIGMAC and SIOCSIFMAC network interface ioctls permit the
labels on network interfaces to be retrieved and set.

### 6.6 MAC Policy Architecture
Security policies are either linked directly into the kernel, or compiled into loadable kernel modules
that may be loaded at boot, or dynamically using the module loading system calls at runtime. Policy
modules interact with the system through a set of declared entry points, providing access to a
stream of system events and permitting the policy to influence access control decisions. Each policy
contains a number of elements:
- Optional configuration parameters for policy.
- Centralized implementation of the policy logic and parameters.
- Optional implementation of policy life cycle events, such as initialization and destruction.
- Optional support for initializing, maintaining, and destroying labels on selected kernel objects.
- Optional support for user process inspection and modification of labels on selected objects.
- Implementation of selected access control entry points that are of interest to the policy.
- Declaration of policy identity, module entry points, and policy properties.

#### 6.6.1 Policy Declaration
Modules may be declared using the MAC_POLICY_SET() macro, which names the policy, provides a
reference to the MAC entry point vector, provides load-time flags determining how the policy
framework should handle the policy, and optionally requests the allocation of label state by the
framework.

static struct mac_policy_ops mac_policy_ops =
.mpo_destroy = mac_policy_destroy,
.mpo_init = mac_policy_init,
.mpo_init_bpfdesc_label = mac_policy_init_bpfdesc_label,
.mpo_init_cred_label = mac_policy_init_label,
/* ... */
.mpo_check_vnode_setutimes = mac_policy_check_vnode_setutimes,
.mpo_check_vnode_stat = mac_policy_check_vnode_stat,
.mpo_check_vnode_write = mac_policy_check_vnode_write,
The MAC policy entry point vector, macpolicyops in this example, associates functions defined in the
module with specific entry points. A complete listing of available entry points and their prototypes
may be found in the MAC entry point reference section. Of specific interest during module
registration are the .mpo_destroy and .mpo_init entry points. .mpo_init will be invoked once a
policy is successfully registered with the module framework but prior to any other entry points
becoming active. This permits the policy to perform any policy-specific allocation and initialization,
such as initialization of any data or locks. .mpo_destroy will be invoked when a policy module is
unloaded to permit releasing of any allocated memory and destruction of locks. Currently, these
two entry points are invoked with the MAC policy list mutex held to prevent any other entry points
from being invoked: this will be changed, but in the mean time, policies should be careful about
what kernel primitives they invoke so as to avoid lock ordering or sleeping problems.
The policy declaration’s module name field exists so that the module may be uniquely identified for
the purposes of module dependencies. An appropriate string should be selected. The full string
name of the policy is displayed to the user via the kernel log during load and unload events, and
also exported when providing status information to userland processes.

#### 6.6.2 Policy Flags
The policy declaration flags field permits the module to provide the framework with information
about its capabilities at the time the module is loaded. Currently, three flags are defined:
MPC_LOADTIME_FLAG_UNLOADOK
This flag indicates that the policy module may be unloaded. If this flag is not provided, then the
policy framework will reject requests to unload the module. This flag might be used by modules
that allocate label state and are unable to free that state at runtime.
MPC_LOADTIME_FLAG_NOTLATE
This flag indicates that the policy module must be loaded and initialized early in the boot

process. If the flag is specified, attempts to register the module following boot will be rejected.
The flag may be used by policies that require pervasive labeling of all system objects, and cannot
handle objects that have not been properly initialized by the policy.
MPC_LOADTIME_FLAG_LABELMBUFS
This flag indicates that the policy module requires labeling of Mbufs, and that memory should
always be allocated for the storage of Mbuf labels. By default, the MAC Framework will not
allocate label storage for Mbufs unless at least one loaded policy has this flag set. This
measurably improves network performance when policies do not require Mbuf labeling. A
kernel option, MAC_ALWAYS_LABEL_MBUF, exists to force the MAC Framework to allocate Mbuf label
storage regardless of the setting of this flag, and may be useful in some environments.
Policies

using

MPC_LOADTIME_FLAG_LABELMBUFS

without

MPC_LOADTIME_FLAG_NOTLATE flag set must be able to correctly handle NULL Mbuf label

pointers passed into entry points. This is necessary as in-flight Mbufs without label
storage may persist after a policy enabling Mbuf labeling has been loaded. If a
policy is loaded before the network subsystem is active (i.e., the policy is not being
loaded late), then all Mbufs are guaranteed to have label storage.

#### 6.6.3 Policy Entry Points
Four classes of entry points are offered to policies registered with the framework: entry points
associated with the registration and management of policies, entry points denoting initialization,
creation, destruction, and other life cycle events for kernel objects, events associated with access
control decisions that the policy module may influence, and calls associated with the management
of labels on objects. In addition, a mac_syscall() entry point is provided so that policies may extend
the kernel interface without registering new system calls.
Policy module writers should be aware of the kernel locking strategy, as well as what object locks
are available during which entry points. Writers should attempt to avoid deadlock scenarios by
avoiding grabbing non-leaf locks inside of entry points, and also follow the locking protocol for
object access and modification. In particular, writers should be aware that while necessary locks to
access objects and their labels are generally held, sufficient locks to modify an object or its label
may not be present for all entry points. Locking information for arguments is documented in the
MAC framework entry point document.
Policy entry points will pass a reference to the object label along with the object itself. This permits
labeled policies to be unaware of the internals of the object yet still make decisions based on the
label. The exception to this is the process credential, which is assumed to be understood by policies
as a first class security object in the kernel.

### 6.7 MAC Policy Entry Point Reference
#### 6.7.1 General-Purpose Module Entry Points

6.7.1.1. mpo_init

void mpo_init(struct mac_policy_conf *conf);

conf

MAC policy definition

Policy load event. The policy list mutex is held, so sleep operations cannot be performed, and calls
out to other kernel subsystems must be made with caution. If potentially sleeping memory
allocations are required during policy initialization, they should be made using a separate module
SYSINIT().
6.7.1.2. mpo_destroy

void mpo_destroy(struct mac_policy_conf *conf);

conf

MAC policy definition

Policy load event. The policy list mutex is held, so caution should be applied.
6.7.1.3. mpo_syscall

int mpo_syscall(struct thread *td, int call, void *arg);

td

Calling thread

call

Policy-specific syscall number

arg

Pointer to syscall arguments

This entry point provides a policy-multiplexed system call so that policies may provide additional
services to user processes without registering specific system calls. The policy name provided
during registration is used to demultiplexer calls from userland, and the arguments will be
forwarded to this entry point. When implementing new services, security modules should be sure
to invoke appropriate access control checks from the MAC framework as needed. For example, if a
policy implements an augmented signal functionality, it should call the necessary signal access
control checks to invoke the MAC framework and other registered policies.

Modules must currently perform the copyin() of the syscall data on their own.

6.7.1.4. mpo_thread_userret

void mpo_thread_userret(struct thread *td);

td

Returning thread

This entry point permits policy modules to perform MAC-related events when a thread returns to
user space, via a system call return, trap return, or otherwise. This is required for policies that have
floating process labels, as it is not always possible to acquire the process lock at arbitrary points in
the stack during system call processing; process labels might represent traditional authentication
data, process history information, or other data. To employ this mechanism, intended changes to
the process credential label may be stored in the p_label protected by a per-policy spin lock, and
then set the per-thread TDF_ASTPENDING flag and per-process PS_MACPENDM flag to schedule a call to the
userret entry point. From this entry point, the policy may create a replacement credential with less
concern about the locking context. Policy writers are cautioned that event ordering relating to
scheduling an AST and the AST being performed may be complex and interlaced in multithreaded
applications.

#### 6.7.2 Label Operations
6.7.2.1. mpo_init_bpfdesc_label

void mpo_init_bpfdesc_label(struct label *label);

Initialize the label on a newly instantiated bpfdesc (BPF descriptor). Sleeping is permitted.
6.7.2.2. mpo_init_cred_label

void mpo_init_cred_label(struct label *label);

Initialize the label for a newly instantiated user credential. Sleeping is permitted.
6.7.2.3. mpo_init_devfsdirent_label

void mpo_init_devfsdirent_label(struct label *label);

Initialize the label on a newly instantiated devfs entry. Sleeping is permitted.
6.7.2.4. mpo_init_ifnet_label

void mpo_init_ifnet_label(struct label *label);

Initialize the label on a newly instantiated network interface. Sleeping is permitted.
6.7.2.5. mpo_init_ipq_label

void mpo_init_ipq_label(struct label *label, int flag);

Sleeping/non-sleeping

malloc(9); see below
Initialize the label on a newly instantiated IP fragment reassembly queue. The flag field may be
one of M_WAITOK and M_NOWAIT, and should be employed to avoid performing a sleeping
malloc(9) during this initialization call. IP fragment reassembly queue allocation frequently occurs
in performance sensitive environments, and the implementation should be careful to avoid
sleeping or long-lived operations. This entry point is permitted to fail resulting in the failure to
allocate the IP fragment reassembly queue.
6.7.2.6. mpo_init_mbuf_label

void mpo_init_mbuf_label(int flag, struct label *label);

Sleeping/non-sleeping

malloc(9); see below

Policy label to initialize

Initialize the label on a newly instantiated mbuf packet header (mbuf). The flag field may be one of
M_WAITOK and M_NOWAIT, and should be employed to avoid performing a sleeping malloc(9)
during this initialization call. Mbuf allocation frequently occurs in performance sensitive

environments, and the implementation should be careful to avoid sleeping or long-lived operations.
This entry point is permitted to fail resulting in the failure to allocate the mbuf header.
6.7.2.7. mpo_init_mount_label

void mpo_init_mount_label(struct label *mntlabel, struct label *fslabel);

mntlabel

Policy label to be initialized for

the mount itself

Policy label to be initialized for
the file system

Initialize the labels on a newly instantiated mount point. Sleeping is permitted.
6.7.2.8. mpo_init_mount_fs_label

void mpo_init_mount_fs_label(struct label *label);

Label to be initialized

Initialize the label on a newly mounted file system. Sleeping is permitted
6.7.2.9. mpo_init_pipe_label

void mpo_init_pipe_label(struct label *label);

Initialize a label for a newly instantiated pipe. Sleeping is permitted.
6.7.2.10. mpo_init_socket_label

void mpo_init_socket_label(struct label *label, int flag);

malloc(9) flags

Initialize a label for a newly instantiated socket. The flag field may be one of M_WAITOK and

M_NOWAIT, and should be employed to avoid performing a sleeping malloc(9) during this
initialization call.
6.7.2.11. mpo_init_socket_peer_label

void mpo_init_socket_peer_label(struct label *label, int flag);

malloc(9) flags

Initialize the peer label for a newly instantiated socket. The flag field may be one of M_WAITOK
and M_NOWAIT, and should be employed to avoid performing a sleeping malloc(9) during this
initialization call.
6.7.2.12. mpo_init_proc_label

void mpo_init_proc_label(struct label *label);

Initialize the label for a newly instantiated process. Sleeping is permitted.
6.7.2.13. mpo_init_vnode_label

void mpo_init_vnode_label(struct label *label);

Initialize the label on a newly instantiated vnode. Sleeping is permitted.
6.7.2.14. mpo_destroy_bpfdesc_label

void mpo_destroy_bpfdesc_label(struct label *label);

bpfdesc label

Destroy the label on a BPF descriptor. In this entry point a policy should free any internal storage

6.7.2.15. mpo_destroy_cred_label

void mpo_destroy_cred_label(struct label *label);

Destroy the label on a credential. In this entry point, a policy module should free any internal
6.7.2.16. mpo_destroy_devfsdirent_label

void mpo_destroy_devfsdirent_label(struct label *label);

Destroy the label on a devfs entry. In this entry point, a policy module should free any internal
6.7.2.17. mpo_destroy_ifnet_label

void mpo_destroy_ifnet_label(struct label *label);

Destroy the label on a removed interface. In this entry point, a policy module should free any
internal storage associated with label so that it may be destroyed.
6.7.2.18. mpo_destroy_ipq_label

void mpo_destroy_ipq_label(struct label *label);

Destroy the label on an IP fragment queue. In this entry point, a policy module should free any
internal storage associated with label so that it may be destroyed.
6.7.2.19. mpo_destroy_mbuf_label

void mpo_destroy_mbuf_label(struct label *label);

Destroy the label on an mbuf header. In this entry point, a policy module should free any internal
6.7.2.20. mpo_destroy_mount_label

void mpo_destroy_mount_label(struct label *label);

Mount point label being

destroyed
Destroy the labels on a mount point. In this entry point, a policy module should free the internal
storage associated with mntlabel so that they may be destroyed.
6.7.2.21. mpo_destroy_mount_label

void mpo_destroy_mount_label(struct label *mntlabel, struct label *fslabel);

mntlabel

Mount point label being

destroyed

File system label being
destroyed>

Destroy the labels on a mount point. In this entry point, a policy module should free the internal
storage associated with mntlabel and fslabel so that they may be destroyed.
6.7.2.22. mpo_destroy_socket_label

void mpo_destroy_socket_label(struct label *label);

Socket label being destroyed

Destroy the label on a socket. In this entry point, a policy module should free any internal storage

6.7.2.23. mpo_destroy_socket_peer_label

void mpo_destroy_socket_peer_label(struct label *peerlabel);

peerlabel

Socket peer label being

destroyed
Destroy the peer label on a socket. In this entry point, a policy module should free any internal
6.7.2.24. mpo_destroy_pipe_label

void mpo_destroy_pipe_label(struct label *label);

Pipe label

Destroy the label on a pipe. In this entry point, a policy module should free any internal storage
6.7.2.25. mpo_destroy_proc_label

void mpo_destroy_proc_label(struct label *label);

Process label

Destroy the label on a process. In this entry point, a policy module should free any internal storage
6.7.2.26. mpo_destroy_vnode_label

void mpo_destroy_vnode_label(struct label *label);

Process label

Destroy the label on a vnode. In this entry point, a policy module should free any internal storage

6.7.2.27. mpo_copy_mbuf_label

void mpo_copy_mbuf_label(struct label *src, struct label *dest);

src

Source label

dest

Destination label

Copy the label information in src into dest.
6.7.2.28. mpo_copy_pipe_label

void mpo_copy_pipe_label(struct label *src, struct label *dest);

src

Source label

dest

Destination label

Copy the label information in src into dest.
6.7.2.29. mpo_copy_vnode_label

void mpo_copy_vnode_label(struct label *src, struct label *dest);

src

Source label

dest

Destination label

Copy the label information in src into dest.
6.7.2.30. mpo_externalize_cred_label

int mpo_externalize_cred_label(struct label *label, char *element_name,

Produce an externalized label based on the label structure passed. An externalized label consists of
a text representation of the label contents that can be used with userland applications and read by
the user. Currently, all policies' externalize entry points will be called, so the implementation
should check the contents of element_name before attempting to fill in sb. If element_name does not
match the name of your policy, simply return 0. Only return nonzero if an error occurs while
externalizing the label data. Once the policy fills in element_data, *claimed should be incremented.
6.7.2.31. mpo_externalize_ifnet_label

int mpo_externalize_ifnet_label(struct label *label, char *element_name,

Produce an externalized label based on the label structure passed. An externalized label consists of
a text representation of the label contents that can be used with userland applications and read by
the user. Currently, all policies' externalize entry points will be called, so the implementation
should check the contents of element_name before attempting to fill in sb. If element_name does not
match the name of your policy, simply return 0. Only return nonzero if an error occurs while
externalizing the label data. Once the policy fills in element_data, *claimed should be incremented.
6.7.2.32. mpo_externalize_pipe_label

int mpo_externalize_pipe_label(struct label *label, char *element_name,

Produce an externalized label based on the label structure passed. An externalized label consists of
a text representation of the label contents that can be used with userland applications and read by
the user. Currently, all policies' externalize entry points will be called, so the implementation
should check the contents of element_name before attempting to fill in sb. If element_name does not
match the name of your policy, simply return 0. Only return nonzero if an error occurs while
externalizing the label data. Once the policy fills in element_data, *claimed should be incremented.
6.7.2.33. mpo_externalize_socket_label

int mpo_externalize_socket_label(struct label *label, char *element_name,

Produce an externalized label based on the label structure passed. An externalized label consists of
a text representation of the label contents that can be used with userland applications and read by
the user. Currently, all policies' externalize entry points will be called, so the implementation
should check the contents of element_name before attempting to fill in sb. If element_name does not
match the name of your policy, simply return 0. Only return nonzero if an error occurs while
externalizing the label data. Once the policy fills in element_data, *claimed should be incremented.
6.7.2.34. mpo_externalize_socket_peer_label

int mpo_externalize_socket_peer_label(struct label *label, char *element_name,

Produce an externalized label based on the label structure passed. An externalized label consists of
a text representation of the label contents that can be used with userland applications and read by
the user. Currently, all policies' externalize entry points will be called, so the implementation
should check the contents of element_name before attempting to fill in sb. If element_name does not
match the name of your policy, simply return 0. Only return nonzero if an error occurs while
externalizing the label data. Once the policy fills in element_data, *claimed should be incremented.
6.7.2.35. mpo_externalize_vnode_label

int mpo_externalize_vnode_label(struct label *label, char *element_name,

Produce an externalized label based on the label structure passed. An externalized label consists of
a text representation of the label contents that can be used with userland applications and read by
the user. Currently, all policies' externalize entry points will be called, so the implementation
should check the contents of element_name before attempting to fill in sb. If element_name does not
match the name of your policy, simply return 0. Only return nonzero if an error occurs while
externalizing the label data. Once the policy fills in element_data, *claimed should be incremented.
6.7.2.36. mpo_internalize_cred_label

int mpo_internalize_cred_label(struct label *label, char *element_name,

Produce an internal label structure based on externalized label data in text format. Currently, all
implementation should compare the contents of element_name to its own name in order to be sure it
should be internalizing the data in element_data. Just as in the externalize entry points, the entry
point should return 0 if element_name does not match its own name, or when data can successfully
6.7.2.37. mpo_internalize_ifnet_label

int mpo_internalize_ifnet_label(struct label *label, char *element_name,

Produce an internal label structure based on externalized label data in text format. Currently, all
implementation should compare the contents of element_name to its own name in order to be sure it
should be internalizing the data in element_data. Just as in the externalize entry points, the entry
point should return 0 if element_name does not match its own name, or when data can successfully
6.7.2.38. mpo_internalize_pipe_label

int mpo_internalize_pipe_label(struct label *label, char *element_name,

Produce an internal label structure based on externalized label data in text format. Currently, all
implementation should compare the contents of element_name to its own name in order to be sure it
should be internalizing the data in element_data. Just as in the externalize entry points, the entry
point should return 0 if element_name does not match its own name, or when data can successfully
6.7.2.39. mpo_internalize_socket_label

int mpo_internalize_socket_label(struct label *label, char *element_name,

Produce an internal label structure based on externalized label data in text format. Currently, all
implementation should compare the contents of element_name to its own name in order to be sure it
should be internalizing the data in element_data. Just as in the externalize entry points, the entry
point should return 0 if element_name does not match its own name, or when data can successfully
6.7.2.40. mpo_internalize_vnode_label

int mpo_internalize_vnode_label(struct label *label, char *element_name,

Produce an internal label structure based on externalized label data in text format. Currently, all
implementation should compare the contents of element_name to its own name in order to be sure it
should be internalizing the data in element_data. Just as in the externalize entry points, the entry
point should return 0 if element_name does not match its own name, or when data can successfully

#### 6.7.3 Label Events
This class of entry points is used by the MAC framework to permit policies to maintain label
information on kernel objects. For each labeled kernel object of interest to a MAC policy, entry
points may be registered for relevant life cycle events. All objects implement initialization, creation,
and destruction hooks. Some objects will also implement relabeling, allowing user processes to
change the labels on objects. Some objects will also implement object-specific events, such as label
events associated with IP reassembly. A typical labeled object will have the following life cycle of
entry points:

Label initialization
(object-specific wait)
Label creation

o
o

Relabel events,
Various object-specific,
Access control events

o--<--.
|
|
~-->--o

Label destruction

o

Label initialization permits policies to allocate memory and set initial values for labels without
context for the use of the object. The label slot allocated to a policy will be zeroed by default, so
some policies may not need to perform initialization.
Label creation occurs when the kernel structure is associated with an actual kernel object. For
example, Mbufs may be allocated and remain unused in a pool until they are required. mbuf
allocation causes label initialization on the mbuf to take place, but mbuf creation occurs when the
mbuf is associated with a datagram. Typically, context will be provided for a creation event,
including the circumstances of the creation, and labels of other relevant objects in the creation
process. For example, when an mbuf is created from a socket, the socket and its label will be

presented to registered policies in addition to the new mbuf and its label. Memory allocation in
creation events is discouraged, as it may occur in performance sensitive ports of the kernel; in
addition, creation calls are not permitted to fail so a failure to allocate memory cannot be reported.
Object specific events do not generally fall into the other broad classes of label events, but will
generally provide an opportunity to modify or update the label on an object based on additional
context. For example, the label on an IP fragment reassembly queue may be updated during the
MAC_UPDATE_IPQ entry point as a result of the acceptance of an additional mbuf to that queue.
Access control events are discussed in detail in the following section.
Label destruction permits policies to release storage or state associated with a label during its
association with an object so that the kernel data structures supporting the object may be reused or
released.
In addition to labels associated with specific kernel objects, an additional class of labels exists:
temporary labels. These labels are used to store update information submitted by user processes.
These labels are initialized and destroyed as with other label types, but the creation event is
MAC_INTERNALIZE, which accepts a user label to be converted to an in-kernel representation.
6.7.3.1. File System Object Labeling Event Operations
6.7.3.1.1. mpo_associate_vnode_devfs

void mpo_associate_vnode_devfs(struct mount *mp, struct label *fslabel,
struct devfs_dirent *de, struct label *delabel, struct vnode *vp,

Devfs mount point

Devfs file system label

(mp→mnt_fslabel)
de

Devfs directory entry

delabel

Policy label associated with de

vnode associated with de

Fill in the label (vlabel) for a newly created devfs vnode based on the devfs directory entry passed
in de and its label.
6.7.3.1.2. mpo_associate_vnode_extattr

int mpo_associate_vnode_extattr(struct mount *mp, struct label *fslabel,
struct vnode *vp, struct label *vlabel);

File system mount point

File system label

Vnode to label

Attempt to retrieve the label for vp from the file system extended attributes. Upon success, the value
0 is returned. Should extended attribute retrieval not be supported, an accepted fallback is to copy
fslabel into vlabel. In the event of an error, an appropriate value for errno should be returned.
6.7.3.1.3. mpo_associate_vnode_singlelabel

void mpo_associate_vnode_singlelabel(struct mount *mp, struct label *fslabel,
struct vnode *vp, struct label *vlabel);

File system mount point

File system label

Vnode to label

On non-multilabel file systems, this entry point is called to set the policy label for vp based on the
file system label, fslabel.
6.7.3.1.4. mpo_create_devfs_device

void mpo_create_devfs_device(dev_t dev, struct devfs_dirent *devfs_dirent,

dev

Device corresponding with

Devfs directory entry to be

labeled.

Label for devfs_dirent to be
filled in.

Fill out the label on a devfs_dirent being created for the passed device. This call will be made when
the device file system is mounted, regenerated, or a new device is made available.

6.7.3.1.5. mpo_create_devfs_directory

void mpo_create_devfs_directory(char *dirname, int dirnamelen,
struct devfs_dirent *devfs_dirent, struct label *label);

dirname

Name of directory being

created
namelen

Length of string dirname

Devfs directory entry for
directory being created.

Fill out the label on a devfs_dirent being created for the passed directory. This call will be made
when the device file system is mounted, regenerated, or a new device requiring a specific directory
hierarchy is made available.
6.7.3.1.6. mpo_create_devfs_symlink

void mpo_create_devfs_symlink(struct ucred *cred, struct mount *mp,
struct devfs_dirent *dd, struct label *ddlabel, struct devfs_dirent *de,
struct label *delabel);

Devfs mount point

dd

Link destination

ddlabel

Label associated with dd

de

Symlink entry

delabel

Label associated with de

Fill in the label (delabel) for a newly created devfs(5) symbolic link entry.
6.7.3.1.7. mpo_create_vnode_extattr

int mpo_create_vnode_extattr(struct ucred *cred, struct mount *mp,
struct label *fslabel, struct vnode *dvp, struct label *dlabel,
struct vnode *vp, struct label *vlabel, struct componentname *cnp);

mount

File system mount point

File system label

Parent directory vnode

Label associated with dvp

Newly created vnode

Component name for vp

Write out the label for vp to the appropriate extended attribute. If the write succeeds, fill in vlabel
with the label, and return 0. Otherwise, return an appropriate error.
6.7.3.1.8. mpo_create_mount

void mpo_create_mount(struct ucred *cred, struct mount *mp, struct label *mnt,
struct label *fslabel);

Object; file system being

mounted
mntlabel

Policy label to be filled in for mp

Policy label for the file system
mp mounts.

Fill out the labels on the mount point being created by the passed subject credential. This call will
be made when a new file system is mounted.
6.7.3.1.9. mpo_create_root_mount

void mpo_create_root_mount(struct ucred *cred, struct mount *mp,
struct label *mntlabel, struct label *fslabel);

See mpo_create_mount.
Fill out the labels on the mount point being created by the passed subject credential. This call will
be made when the root file system is mounted, after mpo_create_mount;.
6.7.3.1.10. mpo_relabel_vnode

void mpo_relabel_vnode(struct ucred *cred, struct vnode *vp,

struct label *vnodelabel, struct label *newlabel);

vnode to relabel

Existing policy label for vp

New, possibly partial label to
replace vnodelabel

Update the label on the passed vnode given the passed update vnode label and the passed subject
credential.
6.7.3.1.11. mpo_setlabel_vnode_extattr

int mpo_setlabel_vnode_extattr(struct ucred *cred, struct vnode *vp,
struct label *vlabel, struct label *intlabel);

Vnode for which the label is
being written

intlabel

Label to write out

Write

out

policy

from

intlabel

to

an

extended

attribute.

This

is

called

from

vop_stdcreatevnode_ea.
6.7.3.1.12. mpo_update_devfsdirent

void mpo_update_devfsdirent(struct devfs_dirent *devfs_dirent,
struct label *direntlabel, struct vnode *vp, struct label *vnodelabel);

Object; devfs directory entry

direntlabel

Policy label for devfs_dirent to

be updated.

Parent vnode

Update the devfs_dirent label from the passed devfs vnode label. This call will be made when a
devfs vnode has been successfully relabeled to commit the label change such that it lasts even if the

vnode is recycled. It will also be made when a symlink is created in devfs, following a call to
mac_vnode_create_from_vnode to initialize the vnode label.
6.7.3.2. IPC Object Labeling Event Operations
6.7.3.2.1. mpo_create_mbuf_from_socket

void mpo_create_mbuf_from_socket(struct socket *so, struct label *socketlabel,
struct mbuf *m, struct label *mbuflabel);

Socket

Socket locking WIP

m

Object; mbuf

Policy label to fill in for m

Set the label on a newly created mbuf header from the passed socket label. This call is made when a
new datagram or message is generated by the socket and stored in the passed mbuf.
6.7.3.2.2. mpo_create_pipe

void mpo_create_pipe(struct ucred *cred, struct pipe *pipe,

Set the label on a newly created pipe from the passed subject credential. This call is made when a
new pipe is created.
6.7.3.2.3. mpo_create_socket

void mpo_create_socket(struct ucred *cred, struct socket *so,

Object; socket to label

Label to fill in for so

Set the label on a newly created socket from the passed subject credential. This call is made when a
socket is created.
6.7.3.2.4. mpo_create_socket_from_socket

void mpo_create_socket_from_socket(struct socket *oldsocket,
struct label *oldsocketlabel, struct socket *newsocket,
struct label *newsocketlabel);

oldsocket

Listening socket

oldsocketlabel

Policy label associated with
oldsocket

newsocket

New socket

newsocketlabel

Policy label associated with
newsocketlabel

Label a socket, newsocket, newly accept(2)ed, based on the listen(2) socket, oldsocket.
6.7.3.2.5. mpo_relabel_pipe

void mpo_relabel_pipe(struct ucred *cred, struct pipe *pipe,
struct label *oldlabel, struct label *newlabel);

oldlabel

Current policy label associated

with pipe

Policy label update to apply to

Apply a new label, newlabel, to pipe.
6.7.3.2.6. mpo_relabel_socket

void mpo_relabel_socket(struct ucred *cred, struct socket *so,
struct label *oldlabel, struct label *newlabel);

oldlabel

Current label for so

Label update for so

Update the label on a socket from the passed socket label update.
6.7.3.2.7. mpo_set_socket_peer_from_mbuf

void mpo_set_socket_peer_from_mbuf(struct mbuf *mbuf, struct label *mbuflabel,
struct label *oldlabel, struct label *newlabel);

First datagram received over

Label for mbuf

oldlabel

Current label for the socket

Policy label to be filled out for
the socket

Set the peer label on a stream socket from the passed mbuf label. This call will be made when the
first datagram is received by the stream socket, with the exception of Unix domain sockets.
6.7.3.2.8. mpo_set_socket_peer_from_socket

void mpo_set_socket_peer_from_socket(struct socket *oldsocket,
struct label *oldsocketlabel, struct socket *newsocket,
struct label *newsocketpeerlabel);

oldsocket

Local socket

oldsocketlabel

Policy label for oldsocket

newsocket

Peer socket

newsocketpeerlabel

Policy label to fill in for
newsocket

Set the peer label on a stream UNIX domain socket from the passed remote socket endpoint. This
call will be made when the socket pair is connected, and will be made for both endpoints.
6.7.3.3. Network Object Labeling Event Operations
6.7.3.3.1. mpo_create_bpfdesc

void mpo_create_bpfdesc(struct ucred *cred, struct bpf_d *bpf_d,

struct label *bpflabel);

Object; bpf descriptor

bpf

Set the label on a newly created BPF descriptor from the passed subject credential. This call will be
made when a BPF device node is opened by a process with the passed subject credential.
6.7.3.3.2. mpo_create_ifnet

void mpo_create_ifnet(struct ifnet *ifnet, struct label *ifnetlabel);

Policy label to fill in for ifnet

Set the label on a newly created interface. This call may be made when a new physical interface
becomes available to the system, or when a pseudo-interface is instantiated during the boot or as a
result of a user action.
6.7.3.3.3. mpo_create_ipq

void mpo_create_ipq(struct mbuf *fragment, struct label *fragmentlabel,
struct ipq *ipq, struct label *ipqlabel);

fragment

First received IP fragment

fragmentlabel

Policy label for fragment

IP reassembly queue to be

labeled

Set the label on a newly created IP fragment reassembly queue from the mbuf header of the first
received fragment.
6.7.3.3.4. mpo_create_datagram_from_ipq

void mpo_create_create_datagram_from_ipq(struct ipq *ipq,

struct label *ipqlabel, struct mbuf *datagram, struct label *datagramlabel);

IP reassembly queue

Policy label for ipq

Datagram to be labeled

datagramlabel

datagramlabel

Set the label on a newly reassembled IP datagram from the IP fragment reassembly queue from
which it was generated.
6.7.3.3.5. mpo_create_fragment

void mpo_create_fragment(struct mbuf *datagram, struct label *datagramlabel,
struct mbuf *fragment, struct label *fragmentlabel);

Datagram

datagramlabel

Policy label for datagram

fragment

Fragment to be labeled

fragmentlabel

Set the label on the mbuf header of a newly created IP fragment from the label on the mbuf header
of the datagram it was generate from.
6.7.3.3.6. mpo_create_mbuf_from_mbuf

void mpo_create_mbuf_from_mbuf(struct mbuf *oldmbuf, struct label *oldmbuflabel,
struct mbuf *newmbuf, struct label *newmbuflabel);

oldmbuf

Existing (source) mbuf

oldmbuflabel

Policy label for oldmbuf

New mbuf to be labeled

newmbuflabel

Set the label on the mbuf header of a newly created datagram from the mbuf header of an existing
datagram. This call may be made in a number of situations, including when an mbuf is re-allocated
for alignment purposes.

6.7.3.3.7. mpo_create_mbuf_linklayer

void mpo_create_mbuf_linklayer(struct ifnet *ifnet, struct label *ifnetlabel,
struct mbuf *mbuf, struct label *mbuflabel);

mbuf header for new datagram

Set the label on the mbuf header of a newly created datagram generated for the purposes of a link
layer response for the passed interface. This call may be made in a number of situations, including
for ARP or ND6 responses in the IPv4 and IPv6 stacks.
6.7.3.3.8. mpo_create_mbuf_from_bpfdesc

void mpo_create_mbuf_from_bpfdesc(struct bpf_d *bpf_d, struct label *bpflabel,
struct mbuf *mbuf, struct label *mbuflabel);

BPF descriptor

bpflabel

Policy label for bpflabel

New mbuf to be labeled

Policy label to fill in for mbuf

Set the label on the mbuf header of a newly created datagram generated using the passed BPF
descriptor. This call is made when a write is performed to the BPF device associated with the
passed BPF descriptor.
6.7.3.3.9. mpo_create_mbuf_from_ifnet

void mpo_create_mbuf_from_ifnet(struct ifnet *ifnet, struct label *ifnetlabel,
struct mbuf *mbuf, struct label *mbuflabel);

Policy label for ifnetlabel

mbuf header for new datagram

Set the label on the mbuf header of a newly created datagram generated from the passed network
interface.
6.7.3.3.10. mpo_create_mbuf_multicast_encap

void mpo_create_mbuf_multicast_encap(struct mbuf *oldmbuf,
struct label *oldmbuflabel, struct ifnet *ifnet, struct label *ifnetlabel,
struct mbuf *newmbuf, struct label *newmbuflabel);

oldmbuf

mbuf header for existing

oldmbuflabel

Policy label for oldmbuf

mbuf header to be labeled for
new datagram

newmbuflabel

Set the label on the mbuf header of a newly created datagram generated from the existing passed
datagram when it is processed by the passed multicast encapsulation interface. This call is made
when an mbuf is to be delivered using the virtual interface.
6.7.3.3.11. mpo_create_mbuf_netlayer

void mpo_create_mbuf_netlayer(struct mbuf *oldmbuf, struct label *oldmbuflabel,
struct mbuf *newmbuf, struct label *newmbuflabel);

oldmbuf

Received datagram

oldmbuflabel

Policy label for oldmbuf

Newly created datagram

newmbuflabel

Policy label for newmbuf

Set the label on the mbuf header of a newly created datagram generated by the IP stack in response
to an existing received datagram (oldmbuf). This call may be made in a number of situations,
including when responding to ICMP request datagrams.

6.7.3.3.12. mpo_fragment_match

int mpo_fragment_match(struct mbuf *fragment, struct label *fragmentlabel,
struct ipq *ipq, struct label *ipqlabel);

fragment

IP datagram fragment

fragmentlabel

Policy label for fragment

IP fragment reassembly queue

Policy label for ipq

Determine whether an mbuf header containing an IP datagram (fragment) fragment matches the
label of the passed IP fragment reassembly queue (ipq). Return (1) for a successful match, or (0) for
no match. This call is made when the IP stack attempts to find an existing fragment reassembly
queue for a newly received fragment; if this fails, a new fragment reassembly queue may be
instantiated for the fragment. Policies may use this entry point to prevent the reassembly of
otherwise matching IP fragments if policy does not permit them to be reassembled based on the
label or other information.
6.7.3.3.13. mpo_relabel_ifnet

void mpo_relabel_ifnet(struct ucred *cred, struct ifnet *ifnet,
struct label *ifnetlabel, struct label *newlabel);

Object; Network interface

Label update to apply to ifnet

Update the label of network interface, ifnet, based on the passed update label, newlabel, and the
passed subject credential, cred.
6.7.3.3.14. mpo_update_ipq

void mpo_update_ipq(struct mbuf *fragment, struct label *fragmentlabel,
struct ipq *ipq, struct label *ipqlabel);

IP fragment

Policy label for mbuf

IP fragment reassembly queue

Policy label to be updated for

Update the label on an IP fragment reassembly queue (ipq) based on the acceptance of the passed IP
fragment mbuf header (mbuf).
6.7.3.4. Process Labeling Event Operations
6.7.3.4.1. mpo_create_cred

void mpo_create_cred(struct ucred *parent_cred, struct ucred *child_cred);

parent_cred

Parent subject credential

child_cred

Child subject credential

Set the label of a newly created subject credential from the passed subject credential. This call will
be made when crcopy(9) is invoked on a newly created struct ucred. This call should not be
confused with a process forking or creation event.
6.7.3.4.2. mpo_execve_transition

void mpo_execve_transition(struct ucred *old, struct ucred *new,
struct vnode *vp, struct label *vnodelabel);

old

Existing subject credential

new

New subject credential to be
labeled

File to execute

Update the label of a newly created subject credential (new) from the passed existing subject
credential (old) based on a label transition caused by executing the passed vnode (vp). This call
occurs when a process executes the passed vnode and one of the policies returns a success from the
mpo_execve_will_transition entry point. Policies may choose to implement this call simply by
invoking mpo_create_cred and passing the two subject credentials so as not to implement a
transitioning event. Policies should not leave this entry point unimplemented if they implement
mpo_create_cred, even if they do not implement mpo_execve_will_transition.

6.7.3.4.3. mpo_execve_will_transition

int mpo_execve_will_transition(struct ucred *old, struct vnode *vp,
struct label *vnodelabel);

old

Subject credential prior to

execve(2)

File to execute

Determine whether the policy will want to perform a transition event as a result of the execution of
the passed vnode by the passed subject credential. Return 1 if a transition is required, 0 if not. Even
if a policy returns 0, it should behave correctly in the presence of an unexpected invocation of
mpo_execve_transition, as that call may happen as a result of another policy requesting a transition.
6.7.3.4.4. mpo_create_proc0

void mpo_create_proc0(struct ucred *cred);

Subject credential to be filled in

Create the subject credential of process 0, the parent of all kernel processes.
6.7.3.4.5. mpo_create_proc1

void mpo_create_proc1(struct ucred *cred);

Subject credential to be filled in

Create the subject credential of process 1, the parent of all user processes.
6.7.3.4.6. mpo_relabel_cred

void mpo_relabel_cred(struct ucred *cred, struct label *newlabel);

Label update to apply to cred

Update the label on a subject credential from the passed update label.

#### 6.7.4 Access Control Checks
Access control entry points permit policy modules to influence access control decisions made by the
kernel. Generally, although not always, arguments to an access control entry point will include one
or more authorizing credentials, information (possibly including a label) for any other objects
involved in the operation. An access control entry point may return 0 to permit the operation, or an
errno(2) error value. The results of invoking the entry point across various registered policy
modules will be composed as follows: if all modules permit the operation to succeed, success will be
returned. If one or modules returns a failure, a failure will be returned. If more than one module
returns a failure, the errno value to return to the user will be selected using the following
precedence, implemented by the error_select() function in kern_mac.c:
Most precedence

EDEADLK
EINVAL
ESRCH
EACCES

Least precedence

EPERM

If none of the error values returned by all modules are listed in the precedence chart then an
arbitrarily selected value from the set will be returned. In general, the rules provide precedence to
errors in the following order: kernel failures, invalid arguments, object not present, access not
permitted, other.
6.7.4.1. mpo_check_bpfdesc_receive

int mpo_check_bpfdesc_receive(struct bpf_d *bpf_d, struct label *bpflabel,
struct ifnet *ifnet, struct label *ifnetlabel);

Subject; BPF descriptor

bpflabel

Policy label for bpf_d

Object; network interface

Determine whether the MAC framework should permit datagrams from the passed interface to be
delivered to the buffers of the passed BPF descriptor. Return (0) for success, or an errno value for
failure Suggested failure: EACCES for label mismatches, EPERM for lack of privilege.
6.7.4.2. mpo_check_kenv_dump

int mpo_check_kenv_dump(struct ucred *cred);

Determine whether the subject should be allowed to retrieve the kernel environment (see kenv(2)).
6.7.4.3. mpo_check_kenv_get

int mpo_check_kenv_get(struct ucred *cred, char *name);

Kernel environment variable

Determine whether the subject should be allowed to retrieve the value of the specified kernel
environment variable.
6.7.4.4. mpo_check_kenv_set

int mpo_check_kenv_set(struct ucred *cred, char *name);

Kernel environment variable

Determine whether the subject should be allowed to set the specified kernel environment variable.
6.7.4.5. mpo_check_kenv_unset

int mpo_check_kenv_unset(struct ucred *cred, char *name);

Kernel environment variable

Determine whether the subject should be allowed to unset the specified kernel environment
variable.

6.7.4.6. mpo_check_kld_load

int mpo_check_kld_load(struct ucred *cred, struct vnode *vp,

Kernel module vnode

Label associated with vp

Determine whether the subject should be allowed to load the specified module file.
6.7.4.7. mpo_check_kld_stat

int mpo_check_kld_stat(struct ucred *cred);

Determine whether the subject should be allowed to retrieve a list of loaded kernel module files
and associated statistics.
6.7.4.8. mpo_check_kld_unload

int mpo_check_kld_unload(struct ucred *cred);

Determine whether the subject should be allowed to unload a kernel module.
6.7.4.9. mpo_check_pipe_ioctl

int mpo_check_pipe_ioctl(struct ucred *cred, struct pipe *pipe,
struct label *pipelabel, unsigned long cmd, void *data);

cmd

ioctl(2) command

data

ioctl(2) data

Determine whether the subject should be allowed to make the specified ioctl(2) call.
6.7.4.10. mpo_check_pipe_poll

int mpo_check_pipe_poll(struct ucred *cred, struct pipe *pipe,

Determine whether the subject should be allowed to poll pipe.
6.7.4.11. mpo_check_pipe_read

int mpo_check_pipe_read(struct ucred *cred, struct pipe *pipe,

Determine whether the subject should be allowed read access to pipe.
6.7.4.12. mpo_check_pipe_relabel

int mpo_check_pipe_relabel(struct ucred *cred, struct pipe *pipe,
struct label *pipelabel, struct label *newlabel);

Current policy label associated
with pipe

Label update to pipelabel

Determine whether the subject should be allowed to relabel pipe.
6.7.4.13. mpo_check_pipe_stat

int mpo_check_pipe_stat(struct ucred *cred, struct pipe *pipe,

Determine whether the subject should be allowed to retrieve statistics related to pipe.
6.7.4.14. mpo_check_pipe_write

int mpo_check_pipe_write(struct ucred *cred, struct pipe *pipe,

Determine whether the subject should be allowed to write to pipe.
6.7.4.15. mpo_check_socket_bind

int mpo_check_socket_bind(struct ucred *cred, struct socket *socket,
struct label *socketlabel, struct sockaddr *sockaddr);

Socket to be bound

sockaddr

Address of socket

6.7.4.16. mpo_check_socket_connect

int mpo_check_socket_connect(struct ucred *cred, struct socket *socket,

struct label *socketlabel, struct sockaddr *sockaddr);

Socket to be connected

sockaddr

Address of socket

Determine whether the subject credential (cred) can connect the passed socket (socket) to the
passed socket address (sockaddr). Return 0 for success, or an errno value for failure. Suggested
failure: EACCES for label mismatches, EPERM for lack of privilege.
6.7.4.17. mpo_check_socket_receive

int mpo_check_socket_receive(struct ucred *cred, struct socket *so,

Socket

Policy label associated with so

Determine whether the subject should be allowed to receive information from the socket so.
6.7.4.18. mpo_check_socket_send

int mpo_check_socket_send(struct ucred *cred, struct socket *so,

Socket

Policy label associated with so

Determine whether the subject should be allowed to send information across the socket so.
6.7.4.19. mpo_check_cred_visible

int mpo_check_cred_visible(struct ucred *u1, struct ucred *u2);

u1

u2

Object credential

Determine whether the subject credential u1 can "see" other subjects with the passed subject
credential u2. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label
mismatches, EPERM for lack of privilege, or ESRCH to hide visibility. This call may be made in a
number of situations, including inter-process status sysctl’s used by ps, and in procfs lookups.
6.7.4.20. mpo_check_socket_visible

int mpo_check_socket_visible(struct ucred *cred, struct socket *socket,

6.7.4.21. mpo_check_ifnet_relabel

int mpo_check_ifnet_relabel(struct ucred *cred, struct ifnet *ifnet,
struct label *ifnetlabel, struct label *newlabel);

Object; network interface

Existing policy label for ifnet

Policy label update to later be

applied to ifnet
Determine whether the subject credential can relabel the passed network interface to the passed
label update.
6.7.4.22. mpo_check_socket_relabel

int mpo_check_socket_relabel(struct ucred *cred, struct socket *socket,
struct label *socketlabel, struct label *newlabel);

Existing policy label for socket

Label update to later be applied

to socketlabel
Determine whether the subject credential can relabel the passed socket to the passed label update.
6.7.4.23. mpo_check_cred_relabel

int mpo_check_cred_relabel(struct ucred *cred, struct label *newlabel);

Label update to later be applied

to cred
Determine whether the subject credential can relabel itself to the passed label update.
6.7.4.24. mpo_check_vnode_relabel

int mpo_check_vnode_relabel(struct ucred *cred, struct vnode *vp,
struct label *vnodelabel, struct label *newlabel);

Existing policy label for vp

Policy label update to later be
applied to vp

Determine whether the subject credential can relabel the passed vnode to the passed label update.
6.7.4.25. mpo_check_mount_stat

int mpo_check_mount_stat(struct ucred *cred, struct mount *mp,
struct label *mountlabel);

Object; file system mount

mountlabel

Policy label for mp

Determine whether the subject credential can see the results of a statfs performed on the file
system. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label
mismatches or EPERM for lack of privilege. This call may be made in a number of situations,
including during invocations of statfs(2) and related calls, as well as to determine what file systems
to exclude from listings of file systems, such as when getfsstat(2) is invoked.
6.7.4.26. mpo_check_proc_debug

int mpo_check_proc_debug(struct ucred *cred, struct proc *proc);

proc

Object; process

Determine whether the subject credential can debug the passed process. Return 0 for success, or an
errno value for failure. Suggested failure: EACCES for label mismatch, EPERM for lack of privilege,
or ESRCH to hide visibility of the target. This call may be made in a number of situations, including
use of the ptrace(2) and ktrace(2) APIs, as well as for some types of procfs operations.
6.7.4.27. mpo_check_vnode_access

int mpo_check_vnode_access(struct ucred *cred, struct vnode *vp,
struct label *label, int flags);

flags

access(2) flags

Determine how invocations of access(2) and related calls by the subject credential should return
when performed on the passed vnode using the passed access flags. This should generally be
implemented using the same semantics used in mpo_check_vnode_open. Return 0 for success, or an
errno value for failure. Suggested failure: EACCES for label mismatches or EPERM for lack of
6.7.4.28. mpo_check_vnode_chdir

int mpo_check_vnode_chdir(struct ucred *cred, struct vnode *dvp,
struct label *dlabel);

Object; vnode to chdir(2) into

Determine whether the subject credential can change the process working directory to the passed
vnode. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label
6.7.4.29. mpo_check_vnode_chroot

int mpo_check_vnode_chroot(struct ucred *cred, struct vnode *dvp,
struct label *dlabel);

Determine whether the subject should be allowed to chroot(2) into the specified directory (dvp).
6.7.4.30. mpo_check_vnode_create

int mpo_check_vnode_create(struct ucred *cred, struct vnode *dvp,
struct label *dlabel, struct componentname *cnp, struct vattr *vap);

Component name for dvp

vap

vnode attributes for vap

Determine whether the subject credential can create a vnode with the passed parent directory,
passed name information, and passed attribute information. Return 0 for success, or an errno value
for failure. Suggested failure: EACCES for label mismatch, or EPERM for lack of privilege. This call
may be made in a number of situations, including as a result of calls to open(2) with O_CREAT,
mkfifo(2), and others.

6.7.4.31. mpo_check_vnode_delete

int mpo_check_vnode_delete(struct ucred *cred, struct vnode *dvp,
struct label *dlabel, struct vnode *vp, void *label,

Parent directory vnode

Object; vnode to delete

Component name for vp

Determine whether the subject credential can delete a vnode from the passed parent directory and
passed name information. Return 0 for success, or an errno value for failure. Suggested failure:
EACCES for label mismatch, or EPERM for lack of privilege. This call may be made in a number of
situations, including as a result of calls to unlink(2) and rmdir(2). Policies implementing this entry
point should also implement mpo_check_rename_to to authorize deletion of objects as a result of
being the target of a rename.
6.7.4.32. mpo_check_vnode_deleteacl

int mpo_check_vnode_deleteacl(struct ucred *cred, struct vnode *vp,
struct label *label, acl_type_t type);

type

ACL type

Determine whether the subject credential can delete the ACL of passed type from the passed vnode.
Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label mismatch, or
EPERM for lack of privilege.
6.7.4.33. mpo_check_vnode_exec

int mpo_check_vnode_exec(struct ucred *cred, struct vnode *vp,

Object; vnode to execute

Determine whether the subject credential can execute the passed vnode. Determination of execute
privilege is made separately from decisions about any transitioning event. Return 0 for success, or
an errno value for failure. Suggested failure: EACCES for label mismatch, or EPERM for lack of
6.7.4.34. mpo_check_vnode_getacl

int mpo_check_vnode_getacl(struct ucred *cred, struct vnode *vp,
struct label *label, acl_type_t type);

type

ACL type

Determine whether the subject credential can retrieve the ACL of passed type from the passed
vnode. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label
6.7.4.35. mpo_check_vnode_getextattr

int mpo_check_vnode_getextattr(struct ucred *cred, struct vnode *vp,
struct label *label, int attrnamespace, const char *name, struct uio *uio);

attrnamespace

Extended attribute namespace

Extended attribute name

uio

I/O structure pointer; see uio(9)

Determine whether the subject credential can retrieve the extended attribute with the passed
namespace and name from the passed vnode. Policies implementing labeling using extended
attributes may be interested in special handling of operations on those extended attributes. Return

0 for success, or an errno value for failure. Suggested failure: EACCES for label mismatch, or EPERM
for lack of privilege.
6.7.4.36. mpo_check_vnode_link

int mpo_check_vnode_link(struct ucred *cred, struct vnode *dvp,
struct label *dlabel, struct vnode *vp, struct label *label,

Link destination vnode

Component name for the link

being created
Determine whether the subject should be allowed to create a link to the vnode vp with the name
specified by cnp.
6.7.4.37. mpo_check_vnode_mmap

int mpo_check_vnode_mmap(struct ucred *cred, struct vnode *vp,
struct label *label, int prot);

Vnode to map

prot

Mmap protections (see

mmap(2))
Determine whether the subject should be allowed to map the vnode vp with the protections
specified in prot.
6.7.4.38. mpo_check_vnode_mmap_downgrade

void mpo_check_vnode_mmap_downgrade(struct ucred *cred, struct vnode *vp,
struct label *label, int *prot);

See mpo_check_vnode_mmap.

prot

Mmap protections to be
downgraded

Downgrade the mmap protections based on the subject and object labels.
6.7.4.39. mpo_check_vnode_mprotect

int mpo_check_vnode_mprotect(struct ucred *cred, struct vnode *vp,
struct label *label, int prot);

Mapped vnode

prot

Memory protections

Determine whether the subject should be allowed to set the specified memory protections on
memory mapped from the vnode vp.
6.7.4.40. mpo_check_vnode_poll

int mpo_check_vnode_poll(struct ucred *active_cred, struct ucred *file_cred,
struct vnode *vp, struct label *label);

active_cred

file_cred

Credential associated with the

struct file

Polled vnode

Determine whether the subject should be allowed to poll the vnode vp.
6.7.4.41. mpo_check_vnode_rename_from

int mpo_vnode_rename_from(struct ucred *cred, struct vnode *dvp,
struct label *dlabel, struct vnode *vp, struct label *label,

Vnode to be renamed

Component name for vp

Determine whether the subject should be allowed to rename the vnode vp to something else.
6.7.4.42. mpo_check_vnode_rename_to

int mpo_check_vnode_rename_to(struct ucred *cred, struct vnode *dvp,
struct label *dlabel, struct vnode *vp, struct label *label, int samedir,

Overwritten vnode

samedir

Boolean; 1 if the source and

destination directories are the
same

Destination component name

Determine whether the subject should be allowed to rename to the vnode vp, into the directory dvp,
or to the name represented by cnp. If there is no existing file to overwrite, vp and label will be
NULL.
6.7.4.43. mpo_check_socket_listen

int mpo_check_socket_listen(struct ucred *cred, struct socket *socket,

Determine whether the subject credential can listen on the passed socket. Return 0 for success, or
an errno value for failure. Suggested failure: EACCES for label mismatch, or EPERM for lack of
6.7.4.44. mpo_check_vnode_lookup

int mpo_check_vnode_lookup(struct ucred *cred, struct vnode *dvp,
struct label *dlabel, struct componentname *cnp);

Component name being looked

up
Determine whether the subject credential can perform a lookup in the passed directory vnode for
the passed name. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for
label mismatch, or EPERM for lack of privilege.
6.7.4.45. mpo_check_vnode_open

int mpo_check_vnode_open(struct ucred *cred, struct vnode *vp,
struct label *label, int acc_mode);

acc_mode

open(2) access mode

Determine whether the subject credential can perform an open operation on the passed vnode with
the passed access mode. Return 0 for success, or an errno value for failure. Suggested failure:
EACCES for label mismatch, or EPERM for lack of privilege.
6.7.4.46. mpo_check_vnode_readdir

int mpo_check_vnode_readdir(struct ucred *cred, struct vnode *dvp,

struct label *dlabel);

Object; directory vnode

Determine whether the subject credential can perform a readdir operation on the passed directory
vnode. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label
6.7.4.47. mpo_check_vnode_readlink

int mpo_check_vnode_readlink(struct ucred *cred, struct vnode *vp,

Determine whether the subject credential can perform a readlink operation on the passed symlink
vnode. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label
mismatch, or EPERM for lack of privilege. This call may be made in a number of situations,
including an explicit readlink call by the user process, or as a result of an implicit readlink during a
name lookup by the process.
6.7.4.48. mpo_check_vnode_revoke

int mpo_check_vnode_revoke(struct ucred *cred, struct vnode *vp,

Determine whether the subject credential can revoke access to the passed vnode. Return 0 for
success, or an errno value for failure. Suggested failure: EACCES for label mismatch, or EPERM for
lack of privilege.

6.7.4.49. mpo_check_vnode_setacl

int mpo_check_vnode_setacl(struct ucred *cred, struct vnode *vp,
struct label *label, acl_type_t type, struct acl *acl);

type

ACL type

acl

ACL

Determine whether the subject credential can set the passed ACL of passed type on the passed
vnode. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label
6.7.4.50. mpo_check_vnode_setextattr

int mpo_check_vnode_setextattr(struct ucred *cred, struct vnode *vp,
struct label *label, int attrnamespace, const char *name, struct uio *uio);

attrnamespace

Extended attribute namespace

Extended attribute name

uio

I/O structure pointer; see uio(9)

Determine whether the subject credential can set the extended attribute of passed name and passed
namespace on the passed vnode. Policies implementing security labels backed into extended
attributes may want to provide additional protections for those attributes. Additionally, policies
should avoid making decisions based on the data referenced from uio, as there is a potential race
condition between this check and the actual operation. The uio may also be NULL if a delete
operation is being performed. Return 0 for success, or an errno value for failure. Suggested failure:
EACCES for label mismatch, or EPERM for lack of privilege.
6.7.4.51. mpo_check_vnode_setflags

int mpo_check_vnode_setflags(struct ucred *cred, struct vnode *vp,
struct label *label, u_long flags);

flags

File flags; see chflags(2)

Determine whether the subject credential can set the passed flags on the passed vnode. Return 0 for
success, or an errno value for failure. Suggested failure: EACCES for label mismatch, or EPERM for
lack of privilege.
6.7.4.52. mpo_check_vnode_setmode

int mpo_check_vnode_setmode(struct ucred *cred, struct vnode *vp,
struct label *label, mode_t mode);

mode

File mode; see chmod(2)

Determine whether the subject credential can set the passed mode on the passed vnode. Return 0
for success, or an errno value for failure. Suggested failure: EACCES for label mismatch, or EPERM
for lack of privilege.
6.7.4.53. mpo_check_vnode_setowner

int mpo_check_vnode_setowner(struct ucred *cred, struct vnode *vp,
struct label *label, uid_t uid, gid_t gid);

uid

User ID

gid

Group ID

Determine whether the subject credential can set the passed uid and passed gid as file uid and file
gid on the passed vnode. The IDs may be set to (-1) to request no update. Return 0 for success, or an
errno value for failure. Suggested failure: EACCES for label mismatch, or EPERM for lack of

6.7.4.54. mpo_check_vnode_setutimes

int mpo_check_vnode_setutimes(struct ucred *cred, struct vnode *vp,
struct label *label, struct timespec atime, struct timespec mtime);

Object; vp

atime

Access time; see utimes(2)

mtime

Modification time; see utimes(2)

Determine whether the subject credential can set the passed access timestamps on the passed
vnode. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label
6.7.4.55. mpo_check_proc_sched

int mpo_check_proc_sched(struct ucred *ucred, struct proc *proc);

proc

Object; process

Determine whether the subject credential can change the scheduling parameters of the passed
process. Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label
mismatch, EPERM for lack of privilege, or ESRCH to limit visibility.
See setpriority(2) for more information.
6.7.4.56. mpo_check_proc_signal

int mpo_check_proc_signal(struct ucred *cred, struct proc *proc, int signal);

proc

Object; process

signal

Signal; see kill(2)

Determine whether the subject credential can deliver the passed signal to the passed process.
Return 0 for success, or an errno value for failure. Suggested failure: EACCES for label mismatch,

EPERM for lack of privilege, or ESRCH to limit visibility.
6.7.4.57. mpo_check_vnode_stat

int mpo_check_vnode_stat(struct ucred *cred, struct vnode *vp,

Determine whether the subject credential can stat the passed vnode. Return 0 for success, or an
errno value for failure. Suggested failure: EACCES for label mismatch, or EPERM for lack of
See stat(2) for more information.
6.7.4.58. mpo_check_ifnet_transmit

int mpo_check_ifnet_transmit(struct ucred *cred, struct ifnet *ifnet,
struct label *ifnetlabel, struct mbuf *mbuf, struct label *mbuflabel);

Object; mbuf to be sent

Policy label for mbuf

Determine whether the network interface can transmit the passed mbuf. Return 0 for success, or an
errno value for failure. Suggested failure: EACCES for label mismatch, or EPERM for lack of
6.7.4.59. mpo_check_socket_deliver

int mpo_check_socket_deliver(struct ucred *cred, struct ifnet *ifnet,
struct label *ifnetlabel, struct mbuf *mbuf, struct label *mbuflabel);

Object; mbuf to be delivered

Policy label for mbuf

Determine whether the socket may receive the datagram stored in the passed mbuf header. Return
0 for success, or an errno value for failure. Suggested failures: EACCES for label mismatch, or
EPERM for lack of privilege.
6.7.4.60. mpo_check_socket_visible

int mpo_check_socket_visible(struct ucred *cred, struct socket *so,

Policy label for so

Determine whether the subject credential cred can "see" the passed socket (socket) using system
monitoring functions, such as those employed by netstat(8) and sockstat(1). Return 0 for success, or
an errno value for failure. Suggested failure: EACCES for label mismatches, EPERM for lack of
privilege, or ESRCH to hide visibility.
6.7.4.61. mpo_check_system_acct

int mpo_check_system_acct(struct ucred *ucred, struct vnode *vp,

ucred

Accounting file; acct(5)

Label associated with vp

Determine whether the subject should be allowed to enable accounting, based on its label and the
label of the accounting log file.
6.7.4.62. mpo_check_system_nfsd

int mpo_check_system_nfsd(struct ucred *cred);

Determine whether the subject should be allowed to call nfssvc(2).
6.7.4.63. mpo_check_system_reboot

int mpo_check_system_reboot(struct ucred *cred, int howto);

howto

howto parameter from reboot(2)

Determine whether the subject should be allowed to reboot the system in the specified manner.
6.7.4.64. mpo_check_system_settime

int mpo_check_system_settime(struct ucred *cred);

Determine whether the user should be allowed to set the system clock.
6.7.4.65. mpo_check_system_swapon

int mpo_check_system_swapon(struct ucred *cred, struct vnode *vp,

Swap device

Label associated with vp

Determine whether the subject should be allowed to add vp as a swap device.
6.7.4.66. mpo_check_system_sysctl

int mpo_check_system_sysctl(struct ucred *cred, int *name, u_int *namelen,
void *old, size_t *oldlenp, int inkernel, void *new, size_t newlen);

See sysctl(3)

namelen
old
oldlenp
inkernel

Boolean; 1 if called from kernel

new

See sysctl(3)

newlen
Determine whether the subject should be allowed to make the specified sysctl(3) transaction.

#### 6.7.5 Label Management Calls
Relabel events occur when a user process has requested that the label on an object be modified. A
two-phase update occurs: first, an access control check will be performed to determine if the
update is both valid and permitted, and then the update itself is performed via a separate entry
point. Relabel entry points typically accept the object, object label reference, and an update label
submitted by the process. Memory allocation during relabel is discouraged, as relabel calls are not
permitted to fail (failure should be reported earlier in the relabel check).

### 6.8 Userland Architecture
The TrustedBSD MAC Framework includes a number of policy-agnostic elements, including MAC
library interfaces for abstractly managing labels, modifications to the system credential
management and login libraries to support the assignment of MAC labels to users, and a set of tools
to monitor and modify labels on processes, files, and network interfaces. More details on the user
architecture will be added to this section in the near future.

#### 6.8.1 APIs for Policy-Agnostic Label Management
The TrustedBSD MAC Framework provides a number of library and system calls permitting
applications to manage MAC labels on objects using a policy-agnostic interface. This permits
applications to manipulate labels for a variety of policies without being written to support specific
policies. These interfaces are used by general-purpose tools such as ifconfig(8), ls(1) and ps(1) to
view labels on network interfaces, files, and processes. The APIs also support MAC management
tools including getfmac(8), getpmac(8), setfmac(8), setfsmac(8), and setpmac(8). The MAC APIs are
documented in mac(3).
Applications handle MAC labels in two forms: an internalized form used to return and set labels on
processes and objects (mac_t), and externalized form based on C strings appropriate for storage in
configuration files, display to the user, or input from the user. Each MAC label contains a number of
elements, each consisting of a name and value pair. Policy modules in the kernel bind to specific
names and interpret the values in policy-specific ways. In the externalized string form, labels are
represented by a comma-delimited list of name and value pairs separated by the / character. Labels

may be directly converted to and from text using provided APIs; when retrieving labels from the
kernel, internalized label storage must first be prepared for the desired label element set. Typically,
this is done in one of two ways: using mac_prepare(3) and an arbitrary list of desired label
elements, or one of the variants of the call that loads a default element set from the mac.conf(5)
configuration file. Per-object defaults permit application writers to usefully display labels
associated with objects without being aware of the policies present in the system.
Currently, direct manipulation of label elements other than by conversion to a text

string, string editing, and conversion back to an internalized label is not supported
by the MAC library. Such interfaces may be added in the future if they prove
necessary for application writers.

#### 6.8.2 Binding of Labels to Users
The standard user context management interface, setusercontext(3), has been modified to retrieve
MAC labels associated with a user’s class from login.conf(5). These labels are then set along with
other user context when either LOGIN_SETALL is specified, or when LOGIN_SETMAC is explicitly
specified.
It is expected that, in a future version of FreeBSD, the MAC label database will be

separated from the login.conf user class abstraction, and be maintained in a
separate database. However, the setusercontext(3) API should remain the same
following such a change.

### 6.9 Conclusion
The TrustedBSD MAC framework permits kernel modules to augment the system security policy in
a highly integrated manner. They may do this based on existing object properties, or based on label
data that is maintained with the assistance of the MAC framework. The framework is sufficiently
flexible to implement a variety of policy types, including information flow security policies such as
MLS and Biba, as well as policies based on existing BSD credentials or file protections. Policy
authors may wish to consult this documentation as well as existing security modules when
implementing a new security service.

## Chapter 7. Virtual Memory System
### 7.1 Management of Physical Memory vm_page_t
Physical memory is managed on a page-by-page basis through the vm_page_t structure. Pages of
physical memory are categorized through the placement of their respective vm_page_t structures on
one of several paging queues.
A page can be in a wired, active, inactive, cache, or free state. Except for the wired state, the page is
typically placed in a doubly link list queue representing the state that it is in. Wired pages are not
placed on any queue.
FreeBSD implements a more involved paging queue for cached and free pages in order to
implement page coloring. Each of these states involves multiple queues arranged according to the
size of the processor’s L1 and L2 caches. When a new page needs to be allocated, FreeBSD attempts
to obtain one that is reasonably well aligned from the point of view of the L1 and L2 caches relative
to the VM object the page is being allocated for.
Additionally, a page may be held with a reference count or locked with a busy count. The VM
system also implements an "ultimate locked" state for a page using the PG_BUSY bit in the page’s
flags.
In general terms, each of the paging queues operates in a LRU fashion. A page is typically placed in
a wired or active state initially. When wired, the page is usually associated with a page table
somewhere. The VM system ages the page by scanning pages in a more active paging queue (LRU)
in order to move them to a less-active paging queue. Pages that get moved into the cache are still
associated with a VM object but are candidates for immediate reuse. Pages in the free queue are
truly free. FreeBSD attempts to minimize the number of pages in the free queue, but a certain
minimum number of truly free pages must be maintained in order to accommodate page allocation
at interrupt time.
If a process attempts to access a page that does not exist in its page table but does exist in one of the
paging queues (such as the inactive or cache queues), a relatively inexpensive page reactivation
fault occurs which causes the page to be reactivated. If the page does not exist in system memory at
all, the process must block while the page is brought in from disk.
FreeBSD dynamically tunes its paging queues and attempts to maintain reasonable ratios of pages
in the various queues as well as attempts to maintain a reasonable breakdown of clean versus dirty
pages. The amount of rebalancing that occurs depends on the system’s memory load. This
rebalancing is implemented by the pageout daemon and involves laundering dirty pages (syncing
them with their backing store), noticing when pages are activity referenced (resetting their position
in the LRU queues or moving them between queues), migrating pages between queues when the
queues are out of balance, and so forth. FreeBSD’s VM system is willing to take a reasonable
number of reactivation page faults to determine how active or how idle a page actually is. This
leads to better decisions being made as to when to launder or swap-out a page.

### 7.2 The Unified Buffer Cache vm_object_t
FreeBSD implements the idea of a generic "VM object". VM objects can be associated with backing
store of various typesunbacked, swap-backed, physical device-backed, or file-backed storage. Since
the filesystem uses the same VM objects to manage in-core data relating to files, the result is a
unified buffer cache.
VM objects can be shadowed. That is, they can be stacked on top of each other. For example, you
might have a swap-backed VM object stacked on top of a file-backed VM object in order to
implement a MAP_PRIVATE mmap()ing. This stacking is also used to implement various sharing
properties, including copy-on-write, for forked address spaces.
It should be noted that a vm_page_t can only be associated with one VM object at a time. The VM
object shadowing implements the perceived sharing of the same page across multiple instances.

### 7.3 Filesystem I/O struct buf
vnode-backed VM objects, such as file-backed objects, generally need to maintain their own
clean/dirty info independent from the VM system’s idea of clean/dirty. For example, when the VM
system decides to synchronize a physical page to its backing store, the VM system needs to mark the
page clean before the page is actually written to its backing store. Additionally, filesystems need to
be able to map portions of a file or file metadata into KVM in order to operate on it.
The entities used to manage this are known as filesystem buffers, struct buf's, or bp's. When a
filesystem needs to operate on a portion of a VM object, it typically maps part of the object into a
struct buf and then maps the pages in the struct buf into KVM. In the same manner, disk I/O is
typically issued by mapping portions of objects into buffer structures and then issuing the I/O on
the buffer structures. The underlying vm_page_t’s are typically busied for the duration of the I/O.
Filesystem buffers also have their own notion of being busy, which is useful to filesystem driver
code which would rather operate on filesystem buffers instead of hard VM pages.
FreeBSD reserves a limited amount of KVM to hold mappings from struct bufs, but it should be
made clear that this KVM is used solely to hold mappings and does not limit the ability to cache
data. Physical data caching is strictly a function of vm_page_t's, not filesystem buffers. However,
since filesystem buffers are used to placehold I/O, they do inherently limit the amount of
concurrent I/O possible. However, as there are usually a few thousand filesystem buffers available,
this is not usually a problem.

### 7.4 Mapping Page Tables vm_map_t, vm_entry_t
FreeBSD separates the physical page table topology from the VM system. All hard per-process page
tables can be reconstructed on the fly and are usually considered throwaway. Special page tables
such as those managing KVM are typically permanently preallocated. These page tables are not
throwaway.
FreeBSD associates portions of vm_objects with address ranges in virtual memory through vm_map_t
and vm_entry_t structures. Page tables are directly synthesized from the vm_map_t/vm_entry_t/
vm_object_t hierarchy. Recall that I mentioned that physical pages are only directly associated with

a vm_object; that is not quite true. vm_page_t's are also linked into page tables that they are actively
associated with. One vm_page_t can be linked into several pmaps, as page tables are called. However,
the hierarchical association holds, so all references to the same page in the same object reference
the same vm_page_t and thus give us buffer cache unification across the board.

### 7.5 KVM Memory Mapping
FreeBSD uses KVM to hold various kernel structures. The single largest entity held in KVM is the
filesystem buffer cache. That is, mappings relating to struct buf entities.
Unlike Linux, FreeBSD does not map all of physical memory into KVM. This means that FreeBSD
can handle memory configurations up to 4G on 32 bit platforms. In fact, if the mmu were capable of
it, FreeBSD could theoretically handle memory configurations up to 8TB on a 32 bit platform.
However, since most 32 bit platforms are only capable of mapping 4GB of ram, this is a moot point.
KVM is managed through several mechanisms. The main mechanism used to manage KVM is the
zone allocator. The zone allocator takes a chunk of KVM and splits it up into constant-sized blocks
of memory in order to allocate a specific type of structure. You can use vmstat -m to get an overview
of current KVM utilization broken down by zone.

### 7.6 Tuning the FreeBSD VM System
A concerted effort has been made to make the FreeBSD kernel dynamically tune itself. Typically
you do not need to mess with anything beyond the maxusers and NMBCLUSTERS kernel config options.
That is, kernel compilation options specified in (typically) /usr/src/sys/i386/conf/CONFIG_FILE. A
description of all available kernel configuration options can be found in /usr/src/sys/i386/conf/LINT.
In a large system configuration you may wish to increase maxusers. Values typically range from 10
to 128. Note that raising maxusers too high can cause the system to overflow available KVM resulting
in unpredictable operation. It is better to leave maxusers at some reasonable number and add other
options, such as NMBCLUSTERS, to increase specific resources.
If your system is going to use the network heavily, you may want to increase NMBCLUSTERS. Typical
values range from 1024 to 4096.
The NBUF parameter is also traditionally used to scale the system. This parameter determines the
amount of KVA the system can use to map filesystem buffers for I/O. Note that this parameter has
nothing whatsoever to do with the unified buffer cache! This parameter is dynamically tuned in
3.0-CURRENT and later kernels and should generally not be adjusted manually. We recommend that
you not try to specify an NBUF parameter. Let the system pick it. Too small a value can result in
extremely inefficient filesystem operation while too large a value can starve the page queues by
causing too many pages to become wired down.
By default, FreeBSD kernels are not optimized. You can set debugging and optimization flags with
the makeoptions directive in the kernel configuration. Note that you should not use -g unless you can
accommodate the large (typically 7 MB+) kernels that result.

makeoptions

DEBUG="-g"

makeoptions

COPTFLAGS="-O -pipe"

Sysctl provides a way to tune kernel parameters at run-time. You typically do not need to mess with
any of the sysctl variables, especially the VM related ones.
Run time VM and system tuning is relatively straightforward. First, use Soft Updates on your
UFS/FFS

filesystems

whenever

possible.

/usr/src/sys/ufs/ffs/README.softupdates

contains

instructions (and restrictions) on how to configure it.
Second, configure sufficient swap. You should have a swap partition configured on each physical
disk, up to four, even on your "work" disks. You should have at least 2x the swap space as you have
main memory, and possibly even more if you do not have a lot of memory. You should also size
your swap partition based on the maximum memory configuration you ever intend to put on the
machine so you do not have to repartition your disks later on. If you want to be able to
accommodate a crash dump, your first swap partition must be at least as large as main memory
and /var/crash must have sufficient free space to hold the dump.
NFS-based swap is perfectly acceptable on 4.X or later systems, but you must be aware that the NFS
server will take the brunt of the paging load.

## Chapter 8. SMPng Design Document
### 8.1 Introduction
This document presents the current design and implementation of the SMPng Architecture. First,
the basic primitives and tools are introduced. Next, a general architecture for the FreeBSD kernel’s
synchronization and execution model is laid out. Then, locking strategies for specific subsystems
are discussed, documenting the approaches taken to introduce fine-grained synchronization and
parallelism for each subsystem. Finally, detailed implementation notes are provided to motivate
design choices, and make the reader aware of important implications involving the use of specific
primitives.
This document is a work-in-progress, and will be updated to reflect on-going design and
implementation activities associated with the SMPng Project. Many sections currently exist only in
outline form, but will be fleshed out as work proceeds. Updates or suggestions regarding the
document may be directed to the document editors.
The goal of SMPng is to allow concurrency in the kernel. The kernel is basically one rather large
and complex program. To make the kernel multi-threaded we use some of the same tools used to
make other programs multi-threaded. These include mutexes, shared/exclusive locks, semaphores,
and condition variables. For the definitions of these and other SMP-related terms, please see the
Glossary section of this article.

### 8.2 Basic Tools and Locking Fundamentals
#### 8.2.1 Atomic Instructions and Memory Barriers
There are several existing treatments of memory barriers and atomic instructions, so this section
will not include a lot of detail. To put it simply, one can not go around reading variables without a
lock if a lock is used to protect writes to that variable. This becomes obvious when you consider
that memory barriers simply determine relative order of memory operations; they do not make any
guarantee about timing of memory operations. That is, a memory barrier does not force the
contents of a CPU’s local cache or store buffer to flush. Instead, the memory barrier at lock release
simply ensures that all writes to the protected data will be visible to other CPU’s or devices if the
write to release the lock is visible. The CPU is free to keep that data in its cache or store buffer as
long as it wants. However, if another CPU performs an atomic instruction on the same datum, the
first CPU must guarantee that the updated value is made visible to the second CPU along with any
other operations that memory barriers may require.
For example, assuming a simple model where data is considered visible when it is in main memory
(or a global cache), when an atomic instruction is triggered on one CPU, other CPU’s store buffers
and caches must flush any writes to that same cache line along with any pending operations behind
a memory barrier.
This requires one to take special care when using an item protected by atomic instructions. For
example, in the sleep mutex implementation, we have to use an atomic_cmpset rather than an
atomic_set to turn on the MTX_CONTESTED bit. The reason is that we read the value of mtx_lock into a

variable and then make a decision based on that read. However, the value we read may be stale, or
it may change while we are making our decision. Thus, when the atomic_set executed, it may end
up setting the bit on another value than the one we made the decision on. Thus, we have to use an
atomic_cmpset to set the value only if the value we made the decision on is up-to-date and valid.
Finally, atomic instructions only allow one item to be updated or read. If one needs to atomically
update several items, then a lock must be used instead. For example, if two counters must be read
and have values that are consistent relative to each other, then those counters must be protected by
a lock rather than by separate atomic instructions.

#### 8.2.2 Read Locks Versus Write Locks
Read locks do not need to be as strong as write locks. Both types of locks need to ensure that the
data they are accessing is not stale. However, only write access requires exclusive access. Multiple
threads can safely read a value. Using different types of locks for reads and writes can be
implemented in a number of ways.
First, sx locks can be used in this manner by using an exclusive lock when writing and a shared
lock when reading. This method is quite straightforward.
A second method is a bit more obscure. You can protect a datum with multiple locks. Then for
reading that data you simply need to have a read lock of one of the locks. However, to write to the
data, you need to have a write lock of all of the locks. This can make writing rather expensive but
can be useful when data is accessed in various ways. For example, the parent process pointer is
protected by both the proctree_lock sx lock and the per-process mutex. Sometimes the proc lock is
easier as we are just checking to see who a parent of a process is that we already have locked.
However, other places such as inferior need to walk the tree of processes via parent pointers and
locking each process would be prohibitive as well as a pain to guarantee that the condition you are
checking remains valid for both the check and the actions taken as a result of the check.

#### 8.2.3 Locking Conditions and Results
If you need a lock to check the state of a variable so that you can take an action based on the state
you read, you can not just hold the lock while reading the variable and then drop the lock before
you act on the value you read. Once you drop the lock, the variable can change rendering your
decision invalid. Thus, you must hold the lock both while reading the variable and while
performing the action as a result of the test.

### 8.3 General Architecture and Design
#### 8.3.1 Interrupt Handling
Following the pattern of several other multi-threaded UNIX® kernels, FreeBSD deals with interrupt
handlers by giving them their own thread context. Providing a context for interrupt handlers
allows them to block on locks. To help avoid latency, however, interrupt threads run at real-time
kernel priority. Thus, interrupt handlers should not execute for very long to avoid starving other
kernel threads. In addition, since multiple handlers may share an interrupt thread, interrupt
handlers should not sleep or use a sleepable lock to avoid starving another interrupt handler.

The interrupt threads currently in FreeBSD are referred to as heavyweight interrupt threads. They
are called this because switching to an interrupt thread involves a full context switch. In the initial
implementation, the kernel was not preemptive and thus interrupts that interrupted a kernel
thread would have to wait until the kernel thread blocked or returned to userland before they
would have an opportunity to run.
To deal with the latency problems, the kernel in FreeBSD has been made preemptive. Currently, we
only preempt a kernel thread when we release a sleep mutex or when an interrupt comes in.
However, the plan is to make the FreeBSD kernel fully preemptive as described below.
Not all interrupt handlers execute in a thread context. Instead, some handlers execute directly in
primary interrupt context. These interrupt handlers are currently misnamed "fast" interrupt
handlers since the INTR_FAST flag used in earlier versions of the kernel is used to mark these
handlers. The only interrupts which currently use these types of interrupt handlers are clock
interrupts and serial I/O device interrupts. Since these handlers do not have their own context, they
may not acquire blocking locks and thus may only use spin mutexes.
Finally, there is one optional optimization that can be added in MD code called lightweight context
switches. Since an interrupt thread executes in a kernel context, it can borrow the vmspace of any
process. Thus, in a lightweight context switch, the switch to the interrupt thread does not switch
vmspaces but borrows the vmspace of the interrupted thread. In order to ensure that the vmspace
of the interrupted thread does not disappear out from under us, the interrupted thread is not
allowed to execute until the interrupt thread is no longer borrowing its vmspace. This can happen
when the interrupt thread either blocks or finishes. If an interrupt thread blocks, then it will use its
own context when it is made runnable again. Thus, it can release the interrupted thread.
The cons of this optimization are that they are very machine specific and complex and thus only
worth the effort if their is a large performance improvement. At this point it is probably too early to
tell, and in fact, will probably hurt performance as almost all interrupt handlers will immediately
block on Giant and require a thread fix-up when they block. Also, an alternative method of
interrupt handling has been proposed by Mike Smith that works like so:
1. Each interrupt handler has two parts: a predicate which runs in primary interrupt context and
a handler which runs in its own thread context.
2. If an interrupt handler has a predicate, then when an interrupt is triggered, the predicate is
run. If the predicate returns true then the interrupt is assumed to be fully handled and the
kernel returns from the interrupt. If the predicate returns false or there is no predicate, then
the threaded handler is scheduled to run.
Fitting light weight context switches into this scheme might prove rather complicated. Since we
may want to change to this scheme at some point in the future, it is probably best to defer work on
light weight context switches until we have settled on the final interrupt handling architecture and
determined how light weight context switches might or might not fit into it.

#### 8.3.2 Kernel Preemption and Critical Sections
8.3.2.1. Kernel Preemption in a Nutshell
Kernel preemption is fairly simple. The basic idea is that a CPU should always be doing the highest

priority work available. Well, that is the ideal at least. There are a couple of cases where the
expense of achieving the ideal is not worth being perfect.
Implementing full kernel preemption is very straightforward: when you schedule a thread to be
executed by putting it on a run queue, you check to see if its priority is higher than the currently
executing thread. If so, you initiate a context switch to that thread.
While locks can protect most data in the case of a preemption, not all of the kernel is preemption
safe. For example, if a thread holding a spin mutex preempted and the new thread attempts to grab
the same spin mutex, the new thread may spin forever as the interrupted thread may never get a
chance to execute. Also, some code such as the code to assign an address space number for a
process during exec on the Alpha needs to not be preempted as it supports the actual context switch
code. Preemption is disabled for these code sections by using a critical section.
8.3.2.2. Critical Sections
The responsibility of the critical section API is to prevent context switches inside of a critical
section. With a fully preemptive kernel, every setrunqueue of a thread other than the current thread
is a preemption point. One implementation is for critical_enter to set a per-thread flag that is
cleared by its counterpart. If setrunqueue is called with this flag set, it does not preempt regardless
of the priority of the new thread relative to the current thread. However, since critical sections are
used in spin mutexes to prevent context switches and multiple spin mutexes can be acquired, the
critical section API must support nesting. For this reason the current implementation uses a nesting
count instead of a single per-thread flag.
In order to minimize latency, preemptions inside of a critical section are deferred rather than
dropped. If a thread that would normally be preempted to is made runnable while the current
thread is in a critical section, then a per-thread flag is set to indicate that there is a pending
preemption. When the outermost critical section is exited, the flag is checked. If the flag is set, then
the current thread is preempted to allow the higher priority thread to run.
Interrupts pose a problem with regards to spin mutexes. If a low-level interrupt handler needs a
lock, it needs to not interrupt any code needing that lock to avoid possible data structure
corruption. Currently, providing this mechanism is piggybacked onto critical section API by means
of the cpu_critical_enter and cpu_critical_exit functions. Currently this API disables and reenables interrupts on all of FreeBSD’s current platforms. This approach may not be purely optimal,
but it is simple to understand and simple to get right. Theoretically, this second API need only be
used for spin mutexes that are used in primary interrupt context. However, to make the code
simpler, it is used for all spin mutexes and even all critical sections. It may be desirable to split out
the MD API from the MI API and only use it in conjunction with the MI API in the spin mutex
implementation. If this approach is taken, then the MD API likely would need a rename to show
that it is a separate API.
8.3.2.3. Design Tradeoffs
As mentioned earlier, a couple of trade-offs have been made to sacrifice cases where perfect
preemption may not always provide the best performance.
The first trade-off is that the preemption code does not take other CPUs into account. Suppose we

have a two CPU’s A and B with the priority of A’s thread as 4 and the priority of B’s thread as 2. If
CPU B makes a thread with priority 1 runnable, then in theory, we want CPU A to switch to the new
thread so that we will be running the two highest priority runnable threads. However, the cost of
determining which CPU to enforce a preemption on as well as actually signaling that CPU via an IPI
along with the synchronization that would be required would be enormous. Thus, the current code
would instead force CPU B to switch to the higher priority thread. Note that this still puts the system
in a better position as CPU B is executing a thread of priority 1 rather than a thread of priority 2.
The second trade-off limits immediate kernel preemption to real-time priority kernel threads. In the
simple case of preemption defined above, a thread is always preempted immediately (or as soon as
a critical section is exited) if a higher priority thread is made runnable. However, many threads
executing in the kernel only execute in a kernel context for a short time before either blocking or
returning to userland. Thus, if the kernel preempts these threads to run another non-realtime
kernel thread, the kernel may switch out the executing thread just before it is about to sleep or
execute. The cache on the CPU must then adjust to the new thread. When the kernel returns to the
preempted thread, it must refill all the cache information that was lost. In addition, two extra
context switches are performed that could be avoided if the kernel deferred the preemption until
the first thread blocked or returned to userland. Thus, by default, the preemption code will only
preempt immediately if the higher priority thread is a real-time priority thread.
Turning on full kernel preemption for all kernel threads has value as a debugging aid since it
exposes more race conditions. It is especially useful on UP systems were many races are hard to
simulate otherwise. Thus, there is a kernel option FULL_PREEMPTION to enable preemption for all
kernel threads that can be used for debugging purposes.

#### 8.3.3 Thread Migration
Simply put, a thread migrates when it moves from one CPU to another. In a non-preemptive kernel
this can only happen at well-defined points such as when calling msleep or returning to userland.
However, in the preemptive kernel, an interrupt can force a preemption and possible migration at
any time. This can have negative affects on per-CPU data since with the exception of curthread and
curpcb the data can change whenever you migrate. Since you can potentially migrate at any time
this renders unprotected per-CPU data access rather useless. Thus it is desirable to be able to
disable migration for sections of code that need per-CPU data to be stable.
Critical sections currently prevent migration since they do not allow context switches. However,
this may be too strong of a requirement to enforce in some cases since a critical section also
effectively blocks interrupt threads on the current processor. As a result, another API has been
provided to allow the current thread to indicate that if it preempted it should not migrate to
another CPU.
This API is known as thread pinning and is provided by the scheduler. The API consists of two
functions: sched_pin and sched_unpin. These functions manage a per-thread nesting count td_pinned.
A thread is pinned when its nesting count is greater than zero and a thread starts off unpinned with
a nesting count of zero. Each scheduler implementation is required to ensure that pinned threads
are only executed on the CPU that they were executing on when the sched_pin was first called. Since
the nesting count is only written to by the thread itself and is only read by other threads when the
pinned thread is not executing but while sched_lock is held, then td_pinned does not need any
locking. The sched_pin function increments the nesting count and sched_unpin decrements the

nesting count. Note that these functions only operate on the current thread and bind the current
thread to the CPU it is executing on at the time. To bind an arbitrary thread to a specific CPU, the
sched_bind and sched_unbind functions should be used instead.

#### 8.3.4 Callouts
The timeout kernel facility permits kernel services to register functions for execution as part of the
softclock software interrupt. Events are scheduled based on a desired number of clock ticks, and
callbacks to the consumer-provided function will occur at approximately the right time.
The global list of pending timeout events is protected by a global spin mutex, callout_lock; all
access to the timeout list must be performed with this mutex held. When softclock is woken up, it
scans the list of pending timeouts for those that should fire. In order to avoid lock order reversal,
the softclock thread will release the callout_lock mutex when invoking the provided timeout
callback function. If the CALLOUT_MPSAFE flag was not set during registration, then Giant will be
grabbed before invoking the callout, and then released afterwards. The callout_lock mutex will be
re-grabbed before proceeding. The softclock code is careful to leave the list in a consistent state
while releasing the mutex. If DIAGNOSTIC is enabled, then the time taken to execute each function is
measured, and a warning is generated if it exceeds a threshold.

### 8.4 Specific Locking Strategies
#### 8.4.1 Credentials
struct ucred is the kernel’s internal credential structure, and is generally used as the basis for
process-driven access control within the kernel. BSD-derived systems use a "copy-on-write" model
for credential data: multiple references may exist for a credential structure, and when a change
needs to be made, the structure is duplicated, modified, and then the reference replaced. Due to
wide-spread caching of the credential to implement access control on open, this results in
substantial memory savings. With a move to fine-grained SMP, this model also saves substantially
on locking operations by requiring that modification only occur on an unshared credential,
avoiding the need for explicit synchronization when consuming a known-shared credential.
Credential structures with a single reference are considered mutable; shared credential structures
must not be modified or a race condition is risked. A mutex, cr_mtxp protects the reference count of
struct ucred so as to maintain consistency. Any use of the structure requires a valid reference for
the duration of the use, or the structure may be released out from under the illegitimate consumer.
The struct ucred mutex is a leaf mutex and is implemented via a mutex pool for performance
reasons.
Usually, credentials are used in a read-only manner for access control decisions, and in this case
td_ucred is generally preferred because it requires no locking. When a process' credential is
updated the proc lock must be held across the check and update operations thus avoid races. The
process credential p_ucred must be used for check and update operations to prevent time-of-check,
time-of-use races.
If system call invocations will perform access control after an update to the process credential, the

value of td_ucred must also be refreshed to the current process value. This will prevent use of a
stale credential following a change. The kernel automatically refreshes the td_ucred pointer in the
thread structure from the process p_ucred whenever a process enters the kernel, permitting use of a
fresh credential for kernel access control.

#### 8.4.2 File Descriptors and File Descriptor Tables
Details to follow.

#### 8.4.3 Jail Structures
struct prison stores administrative details pertinent to the maintenance of jails created using the
jail(2) API. This includes the per-jail hostname, IP address, and related settings. This structure is
reference-counted since pointers to instances of the structure are shared by many credential
structures. A single mutex, pr_mtx protects read and write access to the reference count and all
mutable variables inside the struct jail. Some variables are set only when the jail is created, and a
valid reference to the struct prison is sufficient to read these values. The precise locking of each
entry is documented via comments in sys/jail.h.

#### 8.4.4 MAC Framework
The TrustedBSD MAC Framework maintains data in a variety of kernel objects, in the form of struct
label. In general, labels in kernel objects are protected by the same lock as the remainder of the
kernel object. For example, the v_label label in struct vnode is protected by the vnode lock on the
vnode.
In addition to labels maintained in standard kernel objects, the MAC Framework also maintains a
list of registered and active policies. The policy list is protected by a global mutex
(mac_policy_list_lock) and a busy count (also protected by the mutex). Since many access control
checks may occur in parallel, entry to the framework for a read-only access to the policy list
requires holding the mutex while incrementing (and later decrementing) the busy count. The
mutex need not be held for the duration of the MAC entry operation—some operations, such as
label operations on file system objects—are long-lived. To modify the policy list, such as during
policy registration and de-registration, the mutex must be held and the reference count must be
zero, to prevent modification of the list while it is in use.
A condition variable, mac_policy_list_not_busy, is available to threads that need to wait for the list
to become unbusy, but this condition variable must only be waited on if the caller is holding no
other locks, or a lock order violation may be possible. The busy count, in effect, acts as a form of
shared/exclusive lock over access to the framework: the difference is that, unlike with an sx lock,
consumers waiting for the list to become unbusy may be starved, rather than permitting lock order
problems with regards to the busy count and other locks that may be held on entry to (or inside)
the MAC Framework.

#### 8.4.5 Modules
For the module subsystem there exists a single lock that is used to protect the shared data. This lock
is a shared/exclusive (SX) lock and has a good chance of needing to be acquired (shared or
exclusively), therefore there are a few macros that have been added to make access to the lock

more easy. These macros can be located in sys/module.h and are quite basic in terms of usage. The
main structures protected under this lock are the module_t structures (when shared) and the global
modulelist_t structure, modules. One should review the related source code in kern/kern_module.c
to further understand the locking strategy.

#### 8.4.6 Newbus Device Tree
The newbus system will have one sx lock. Readers will hold a shared (read) lock (sx_slock(9)) and
writers will hold an exclusive (write) lock (sx_xlock(9)). Internal functions will not do locking at all.
Externally visible ones will lock as needed. Those items that do not matter if the race is won or lost
will not be locked, since they tend to be read all over the place (e.g., device_get_softc(9)). There will
be relatively few changes to the newbus data structures, so a single lock should be sufficient and
not impose a performance penalty.

#### 8.4.7 Pipes
…

#### 8.4.8 Processes and Threads
- process hierarchy
- proc locks, references
- thread-specific copies of proc entries to freeze during system calls, including td_ucred
- inter-process operations
- process groups and sessions

#### 8.4.9 Scheduler
Lots of references to sched_lock and notes pointing at specific primitives and related magic
elsewhere in the document.

#### 8.4.10 Select and Poll
The select and poll functions permit threads to block waiting on events on file descriptors—most
frequently, whether or not the file descriptors are readable or writable.
…

#### 8.4.11 SIGIO
The SIGIO service permits processes to request the delivery of a SIGIO signal to its process group
when the read/write status of specified file descriptors changes. At most one process or process
group is permitted to register for SIGIO from any given kernel object, and that process or group is
referred to as the owner. Each object supporting SIGIO registration contains pointer field that is
NULL if the object is not registered, or points to a struct sigio describing the registration. This field
is protected by a global mutex, sigio_lock. Callers to SIGIO maintenance functions must pass in this
field "by reference" so that local register copies of the field are not made when unprotected by the

lock.
One struct sigio is allocated for each registered object associated with any process or process
group, and contains back-pointers to the object, owner, signal information, a credential, and the
general disposition of the registration. Each process or progress group contains a list of registered
struct sigio structures, p_sigiolst for processes, and pg_sigiolst for process groups. These lists
are protected by the process or process group locks respectively. Most fields in each struct sigio
are constant for the duration of the registration, with the exception of the sio_pgsigio field which
links the struct sigio into the process or process group list. Developers implementing new kernel
objects supporting SIGIO will, in general, want to avoid holding structure locks while invoking
SIGIO supporting functions, such as fsetown or funsetown to avoid defining a lock order between
structure locks and the global SIGIO lock. This is generally possible through use of an elevated
reference count on the structure, such as reliance on a file descriptor reference to a pipe during a
pipe operation.

#### 8.4.12 Sysctl
The sysctl MIB service is invoked from both within the kernel and from userland applications
using a system call. At least two issues are raised in locking: first, the protection of the structures
maintaining the namespace, and second, interactions with kernel variables and functions that are
accessed by the sysctl interface. Since sysctl permits the direct export (and modification) of kernel
statistics and configuration parameters, the sysctl mechanism must become aware of appropriate
locking semantics for those variables. Currently, sysctl makes use of a single global sx lock to
serialize use of sysctl; however, it is assumed to operate under Giant and other protections are not
provided. The remainder of this section speculates on locking and semantic changes to sysctl.
- Need to change the order of operations for sysctl’s that update values from read old, copyin and
copyout, write new to copyin, lock, read old and write new, unlock, copyout. Normal sysctl’s that
just copyout the old value and set a new value that they copyin may still be able to follow the
old model. However, it may be cleaner to use the second model for all of the sysctl handlers to
avoid lock operations.
- To allow for the common case, a sysctl could embed a pointer to a mutex in the SYSCTL_FOO
macros and in the struct. This would work for most sysctl’s. For values protected by sx locks,
spin mutexes, or other locking strategies besides a single sleep mutex, SYSCTL_PROC nodes
could be used to get the locking right.

#### 8.4.13 Taskqueue
The taskqueue’s interface has two basic locks associated with it in order to protect the related
shared data. The taskqueue_queues_mutex is meant to serve as a lock to protect the taskqueue_queues
TAILQ. The other mutex lock associated with this system is the one in the struct taskqueue data
structure. The use of the synchronization primitive here is to protect the integrity of the data in the
struct taskqueue. It should be noted that there are no separate macros to assist the user in locking
down his/her own work since these locks are most likely not going to be used outside of
kern/subr_taskqueue.c.

### 8.5 Implementation Notes
#### 8.5.1 Sleep Queues
A sleep queue is a structure that holds the list of threads asleep on a wait channel. Each thread that
is not asleep on a wait channel carries a sleep queue structure around with it. When a thread
blocks on a wait channel, it donates its sleep queue structure to that wait channel. Sleep queues
associated with a wait channel are stored in a hash table.
The sleep queue hash table holds sleep queues for wait channels that have at least one blocked
thread. Each entry in the hash table is called a sleepqueue chain. The chain contains a linked list of
sleep queues and a spin mutex. The spin mutex protects the list of sleep queues as well as the
contents of the sleep queue structures on the list. Only one sleep queue is associated with a given
wait channel. If multiple threads block on a wait channel than the sleep queues associated with all
but the first thread are stored on a list of free sleep queues in the master sleep queue. When a
thread is removed from the sleep queue it is given one of the sleep queue structures from the
master queue’s free list if it is not the only thread asleep on the queue. The last thread is given the
master sleep queue when it is resumed. Since threads may be removed from the sleep queue in a
different order than they are added, a thread may depart from a sleep queue with a different sleep
queue structure than the one it arrived with.
The sleepq_lock function locks the spin mutex of the sleep queue chain that maps to a specific wait
channel. The sleepq_lookup function looks in the hash table for the master sleep queue associated
with a given wait channel. If no master sleep queue is found, it returns NULL. The sleepq_release
function unlocks the spin mutex associated with a given wait channel.
A thread is added to a sleep queue via the sleepq_add. This function accepts the wait channel, a
pointer to the mutex that protects the wait channel, a wait message description string, and a mask
of flags. The sleep queue chain should be locked via sleepq_lock before this function is called. If no
mutex protects the wait channel (or it is protected by Giant), then the mutex pointer argument
should be NULL. The flags argument contains a type field that indicates the kind of sleep queue that
the thread is being added to and a flag to indicate if the sleep is interruptible (
SLEEPQ_INTERRUPTIBLE). Currently there are only two types of sleep queues: traditional sleep queues
managed via the msleep and wakeup functions (SLEEPQ_MSLEEP) and condition variable sleep queues
(SLEEPQ_CONDVAR). The sleep queue type and lock pointer argument are used solely for internal
assertion checking. Code that calls sleepq_add should explicitly unlock any interlock protecting the
wait channel after the associated sleepqueue chain has been locked via sleepq_lock and before
blocking on the sleep queue via one of the waiting functions.
A timeout for a sleep is set by invoking sleepq_set_timeout. The function accepts the wait channel
and the timeout time as a relative tick count as its arguments. If a sleep should be interrupted by
arriving signals, the sleepq_catch_signals function should be called as well. This function accepts
the wait channel as its only parameter. If there is already a signal pending for this thread, then
sleepq_catch_signals will return a signal number; otherwise, it will return 0.
Once a thread has been added to a sleep queue, it blocks using one of the sleepq_wait functions.
There are four wait functions depending on whether or not the caller wishes to use a timeout or
have the sleep aborted by caught signals or an interrupt from the userland thread scheduler. The

sleepq_wait function simply waits until the current thread is explicitly resumed by one of the
wakeup functions. The sleepq_timedwait function waits until either the thread is explicitly resumed
or the timeout set by an earlier call to sleepq_set_timeout expires. The sleepq_wait_sig function
waits until either the thread is explicitly resumed or its sleep is aborted. The sleepq_timedwait_sig
function waits until either the thread is explicitly resumed, the timeout set by an earlier call to
sleepq_set_timeout expires, or the thread’s sleep is aborted. All of the wait functions accept the wait
channel as their first parameter. In addition, the sleepq_timedwait_sig function accepts a second
boolean parameter to indicate if the earlier call to sleepq_catch_signals found a pending signal.
If the thread is explicitly resumed or is aborted by a signal, then a value of zero is returned by the
wait function to indicate a successful sleep. If the thread is resumed by either a timeout or an
interrupt from the userland thread scheduler then an appropriate errno value is returned instead.
Note that since sleepq_wait can only return 0 it does not return anything and the caller should
assume a successful sleep. Also, if a thread’s sleep times out and is aborted simultaneously then
sleepq_timedwait_sig will return an error indicating that a timeout occurred. If an error value of 0
is returned and either sleepq_wait_sig or sleepq_timedwait_sig was used to block, then the function
sleepq_calc_signal_retval should be called to check for any pending signals and calculate an
appropriate return value if any are found. The signal number returned by the earlier call to
sleepq_catch_signals should be passed as the sole argument to sleepq_calc_signal_retval.
Threads asleep on a wait channel are explicitly resumed by the sleepq_broadcast and sleepq_signal
functions. Both functions accept the wait channel from which to resume threads, a priority to raise
resumed threads to, and a flags argument to indicate which type of sleep queue is being resumed.
The priority argument is treated as a minimum priority. If a thread being resumed already has a
higher priority (numerically lower) than the priority argument then its priority is not adjusted. The
flags argument is used for internal assertions to ensure that sleep queues are not being treated as
the wrong type. For example, the condition variable functions should not resume threads on a
traditional sleep queue. The sleepq_broadcast function resumes all threads that are blocked on the
specified wait channel while sleepq_signal only resumes the highest priority thread blocked on the
wait channel. The sleep queue chain should first be locked via the sleepq_lock function before
calling these functions.
A sleeping thread may have its sleep interrupted by calling the sleepq_abort function. This function
must be called with sched_lock held and the thread must be queued on a sleep queue. A thread may
also be removed from a specific sleep queue via the sleepq_remove function. This function accepts
both a thread and a wait channel as an argument and only awakens the thread if it is on the sleep
queue for the specified wait channel. If the thread is not on a sleep queue or it is on a sleep queue
for a different wait channel, then this function does nothing.

#### 8.5.2 Turnstiles
- Compare/contrast with sleep queues.
- Lookup/wait/release. - Describe TDF_TSNOBLOCK race.
- Priority propagation.

#### 8.5.3 Details of the Mutex Implementation
- Should we require mutexes to be owned for mtx_destroy() since we can not safely assert that

they are unowned by anyone else otherwise?
8.5.3.1. Spin Mutexes
- Use a critical section…
8.5.3.2. Sleep Mutexes
- Describe the races with contested mutexes
- Why it is safe to read mtx_lock of a contested mutex when holding the turnstile chain lock.

#### 8.5.4 Witness
- What does it do
- How does it work

### 8.6 Miscellaneous Topics
#### 8.6.1 Interrupt Source and ICU Abstractions
- struct isrc
- pic drivers

#### 8.6.2 Other Random Questions/Topics
- Should we pass an interlock into sema_wait?
- Should we have non-sleepable sx locks?
- Add some info about proper use of reference counts.

Glossary
atomic
An operation is atomic if all of its effects are visible to other CPUs together when the proper
access protocol is followed. In the degenerate case are atomic instructions provided directly by
machine architectures. At a higher level, if several members of a structure are protected by a
lock, then a set of operations are atomic if they are all performed while holding the lock without
releasing the lock in between any of the operations.
See Also operation.
block
A thread is blocked when it is waiting on a lock, resource, or condition. Unfortunately this term
is a bit overloaded as a result.
See Also sleep.

critical section
A section of code that is not allowed to be preempted. A critical section is entered and exited
using the critical_enter(9) API.
MD
Machine dependent.
See Also MI.
memory operation
A memory operation reads and/or writes to a memory location.
MI
Machine independent.
See Also MD.
operation
See memory operation.
primary interrupt context
Primary interrupt context refers to the code that runs when an interrupt occurs. This code can
either run an interrupt handler directly or schedule an asynchronous interrupt thread to
execute the interrupt handlers for a given interrupt source.
realtime kernel thread
A high priority kernel thread. Currently, the only realtime priority kernel threads are interrupt
threads.
See Also thread.
sleep
A thread is asleep when it is blocked on a condition variable or a sleep queue via msleep or
tsleep.
See Also block.
sleepable lock
A sleepable lock is a lock that can be held by a thread which is asleep. Lockmgr locks and sx
locks are currently the only sleepable locks in FreeBSD. Eventually, some sx locks such as the
allproc and proctree locks may become non-sleepable locks.
See Also sleep.
thread
A kernel thread represented by a struct thread. Threads own locks and hold a single execution
context.

wait channel
A kernel virtual address that threads may sleep on.

Part II: Device Drivers

## Chapter 9. Writing FreeBSD Device Drivers
### 9.1 Introduction
This chapter provides a brief introduction to writing device drivers for FreeBSD. A device in this
context is a term used mostly for hardware-related stuff that belongs to the system, like disks,
printers, or a graphics display with its keyboard. A device driver is the software component of the
operating system that controls a specific device. There are also so-called pseudo-devices where a
device driver emulates the behavior of a device in software without any particular underlying
hardware. Device drivers can be compiled into the system statically or loaded on demand through
the dynamic kernel linker facility `kld'.
Most devices in a UNIX®-like operating system are accessed through device-nodes, sometimes also
called special files. These files are usually located under the directory /dev in the filesystem
hierarchy.
Device drivers can roughly be broken down into two categories; character and network device
drivers.

### 9.2 Dynamic Kernel Linker Facility - KLD
The kld interface allows system administrators to dynamically add and remove functionality from a
running system. This allows device driver writers to load their new changes into a running kernel
without constantly rebooting to test changes.
The kld interface is used through:
- kldload - loads a new kernel module
- kldunload - unloads a kernel module
- kldstat - lists loaded modules
Skeleton Layout of a kernel module

- KLD Skeleton
- Inspired by Andrew Reiter's Daemonnews article
#include <sys/types.h>
#include <sys/systm.h> /* uprintf */
#include <sys/errno.h>
#include <sys/param.h> /* defines used in kernel.h */
#include <sys/kernel.h> /* types used in module initialization */
- Load handler that deals with the loading and unloading of a KLD.

skel_loader(struct module *m, int what, void *arg)
int err = 0;
switch (what) {
case MOD_LOAD:
/* kldload */
uprintf("Skeleton KLD loaded.\n");
case MOD_UNLOAD:
uprintf("Skeleton KLD unloaded.\n");
err = EOPNOTSUPP;
return(err);
/* Declare this module to the rest of the kernel */
static moduledata_t skel_mod = {
"skel",
skel_loader,
NULL
DECLARE_MODULE(skeleton, skel_mod, SI_SUB_KLD, SI_ORDER_ANY);

#### 9.2.1 Makefile
FreeBSD provides a system makefile to simplify compiling a kernel module.

SRCS=skeleton.c
KMOD=skeleton
.include <bsd.kmod.mk>
Running make with this makefile will create a file skeleton.ko that can be loaded into the kernel by
typing:

### 9.3 Character Devices
A character device driver is one that transfers data directly to and from a user process. This is the
most common type of device driver and there are plenty of simple examples in the source tree.
This simple example pseudo-device remembers whatever values are written to it and can then echo
them back when read.
Example 4. Example of a Sample Echo Pseudo-Device Driver for FreeBSD 10.X - 12.X

- Simple Echo pseudo-device KLD
- Murray Stokely
- Søren (Xride) Straarup
- Eitan Adler
#include <sys/types.h>
#include <sys/systm.h> /* uprintf */
#include <sys/param.h> /* defines used in kernel.h */
#include <sys/kernel.h> /* types used in module initialization */
#include <sys/conf.h>
/* cdevsw struct */
#include <sys/uio.h>
/* uio struct */
#include <sys/malloc.h>
#define BUFFERSIZE 255
/* Function prototypes */
static d_open_t
echo_open;
static d_close_t
echo_close;
static d_read_t
echo_read;
static d_write_t
echo_write;
/* Character device entry points */
static struct cdevsw echo_cdevsw = {
.d_version = D_VERSION,
.d_open = echo_open,
.d_close = echo_close,
.d_read = echo_read,
.d_write = echo_write,
.d_name = "echo",
struct s_echo {
char msg[BUFFERSIZE + 1];
int len;

/* vars */
static struct cdev *echo_dev;
static struct s_echo *echomsg;
MALLOC_DECLARE(M_ECHOBUF);
MALLOC_DEFINE(M_ECHOBUF, "echobuffer", "buffer for echo module");
- This function is called by the kld[un]load(2) system calls to
- determine what actions to take when a module is loaded or unloaded.
echo_loader(struct module *m __unused, int what, void *arg __unused)
switch (what) {
case MOD_LOAD:
/* kldload */
error = make_dev_p(MAKEDEV_CHECKNAME | MAKEDEV_WAITOK,
&echo_dev,
&echo_cdevsw,
0,
UID_ROOT,
GID_WHEEL,
0600,
"echo");
if (error != 0)
echomsg = malloc(sizeof(*echomsg), M_ECHOBUF, M_WAITOK |
M_ZERO);
printf("Echo device loaded.\n");
case MOD_UNLOAD:
destroy_dev(echo_dev);
free(echomsg, M_ECHOBUF);
printf("Echo device unloaded.\n");
error = EOPNOTSUPP;
echo_open(struct cdev *dev __unused, int oflags __unused, int devtype __unused,
struct thread *td __unused)

uprintf("Opened device \"echo\" successfully.\n");
echo_close(struct cdev *dev __unused, int fflag __unused, int devtype __unused,
struct thread *td __unused)
uprintf("Closing device \"echo\".\n");
- The read function just takes the buf that was saved via
- echo_write() and returns it to userland for accessing.
- uio(9)
echo_read(struct cdev *dev __unused, struct uio *uio, int ioflag __unused)
size_t amt;
- How big is this read operation? Either as big as the user wants,
- or as big as the remaining data. Note that the 'len' does not
- include the trailing null character.
amt = MIN(uio->uio_resid, uio->uio_offset >= echomsg->len + 1 ? 0 :
echomsg->len + 1 - uio->uio_offset);
if ((error = uiomove(echomsg->msg, amt, uio)) != 0)
uprintf("uiomove failed!\n");
- echo_write takes in a character string and saves it
- to buf for later accessing.
echo_write(struct cdev *dev __unused, struct uio *uio, int ioflag __unused)
size_t amt;
- We either write from the beginning or are appending -- do
- not allow random access.

if (uio->uio_offset != 0 && (uio->uio_offset != echomsg->len))
return (EINVAL);
/* This is a new message, reset length */
if (uio->uio_offset == 0)
echomsg->len = 0;
/* Copy the string in from user memory to kernel memory */
amt = MIN(uio->uio_resid, (BUFFERSIZE - echomsg->len));
error = uiomove(echomsg->msg + uio->uio_offset, amt, uio);
/* Now we need to null terminate and record the length */
echomsg->len = uio->uio_offset;
echomsg->msg[echomsg->len] = 0;
if (error != 0)
uprintf("Write failed: bad address!\n");
DEV_MODULE(echo, echo_loader, NULL);

With this driver loaded try:

Opened device "echo" successfully.
Test Data
Closing device "echo".
Real hardware devices are described in the next chapter.

### 9.4 Block Devices (Are Gone)
Other UNIX® systems may support a second type of disk device known as block devices. Block
devices are disk devices for which the kernel provides caching. This caching makes block-devices
almost unusable, or at least dangerously unreliable. The caching will reorder the sequence of write
operations, depriving the application of the ability to know the exact disk contents at any one
instant in time.
This makes predictable and reliable crash recovery of on-disk data structures (filesystems,
databases, etc.) impossible. Since writes may be delayed, there is no way the kernel can report to
the application which particular write operation encountered a write error, this further
compounds the consistency problem.

For this reason, no serious applications rely on block devices, and in fact, almost all applications
which access disks directly take great pains to specify that character (or "raw") devices should
always be used. As the implementation of the aliasing of each disk (partition) to two devices with
different semantics significantly complicated the relevant kernel code, FreeBSD dropped support
for cached disk devices as part of the modernization of the disk I/O infrastructure.

### 9.5 Network Drivers
Drivers for network devices do not use device nodes in order to be accessed. Their selection is
based on other decisions made inside the kernel and instead of calling open(), use of a network
device is generally introduced by using the system call socket(2).
For more information see ifnet(9), the source of the loopback device.

## Chapter 10. ISA Device Drivers
### 10.1 Synopsis
This chapter introduces the issues relevant to writing a driver for an ISA device. The pseudo-code
presented here is rather detailed and reminiscent of the real code but is still only pseudo-code. It
avoids the details irrelevant to the subject of the discussion. The real-life examples can be found in
the source code of real drivers. In particular the drivers ep and aha are good sources of information.

### 10.2 Basic Information
A typical ISA driver would need the following include files:

#include <sys/bus.h>
#include <machine/bus.h>
#include <machine/resource.h>
#include <sys/rman.h>
#include <isa/isavar.h>
#include <isa/pnpvar.h>
They describe the things specific to the ISA and generic bus subsystem.
The bus subsystem is implemented in an object-oriented fashion, its main structures are accessed
by associated method functions.
The list of bus methods implemented by an ISA driver is like one for any other bus. For a
hypothetical driver named "xxx" they would be:
- static void xxx_isa_identify (driver_t *, device_t); Normally used for bus drivers, not
device drivers. But for ISA devices this method may have special use: if the device provides
some device-specific (non-PnP) way to auto-detect devices this routine may implement it.
- static int xxx_isa_probe (device_t dev); Probe for a device at a known (or PnP) location. This
routine can also accommodate device-specific auto-detection of parameters for partially
configured devices.
- static int xxx_isa_attach (device_t dev); Attach and initialize device.
- static int xxx_isa_detach (device_t dev); Detach device before unloading the driver module.
- static int xxx_isa_shutdown (device_t dev); Execute shutdown of the device before system
shutdown.
- static int xxx_isa_suspend (device_t dev); Suspend the device before the system goes to the
power-save state. May also abort transition to the power-save state.
- static int xxx_isa_resume (device_t dev); Resume the device activity after return from powersave state.

xxx_isa_probe() and xxx_isa_attach() are mandatory, the rest of the routines are optional,
depending on the device’s needs.
The driver is linked to the system with the following set of descriptions.

/* table of supported bus methods */
static device_method_t xxx_isa_methods[] = {
/* list all the bus method functions supported by the driver */
/* omit the unsupported methods */
DEVMETHOD(device_identify, xxx_isa_identify),
DEVMETHOD(device_probe,
xxx_isa_probe),
DEVMETHOD(device_attach,
xxx_isa_attach),
DEVMETHOD(device_detach,
xxx_isa_detach),
DEVMETHOD(device_shutdown, xxx_isa_shutdown),
DEVMETHOD(device_suspend,
xxx_isa_suspend),
DEVMETHOD(device_resume,
xxx_isa_resume),
DEVMETHOD_END
static driver_t xxx_isa_driver = {
"xxx",
xxx_isa_methods,
sizeof(struct xxx_softc),
static devclass_t xxx_devclass;
DRIVER_MODULE(xxx, isa, xxx_isa_driver, xxx_devclass,
load_function, load_argument);
Here struct xxx_softc is a device-specific structure that contains private driver data and descriptors
for the driver’s resources. The bus code automatically allocates one softc descriptor per device as
needed.
If the driver is implemented as a loadable module then load_function() is called to do driverspecific initialization or clean-up when the driver is loaded or unloaded and load_argument is
passed as one of its arguments. If the driver does not support dynamic loading (in other words it
must always be linked into the kernel) then these values should be set to 0 and the last definition
would look like:

DRIVER_MODULE(xxx, isa, xxx_isa_driver,
xxx_devclass, 0, 0);
If the driver is for a device which supports PnP then a table of supported PnP IDs must be defined.
The table consists of a list of PnP IDs supported by this driver and human-readable descriptions of
the hardware types and models having these IDs. It looks like:

static struct isa_pnp_id xxx_pnp_ids[] = {
/* a line for each supported PnP ID */
{ 0x12345678,
"Our device model 1234A" },
{ 0x12345679,
"Our device model 1234B" },
{ 0,
NULL }, /* end of table */
If the driver does not support PnP devices it still needs an empty PnP ID table, like:

static struct isa_pnp_id xxx_pnp_ids[] = {
{ 0,
NULL }, /* end of table */

10.3. device_t Pointer
device_t is the pointer type for the device structure. Here we consider only the methods interesting
from the device driver writer’s standpoint. The methods to manipulate values in the device
structure are:
- device_t device_get_parent(dev) Get the parent bus of a device.
- driver_t device_get_driver(dev) Get pointer to its driver structure.
- char *device_get_name(dev) Get the driver name, such as "xxx" for our example.
- int device_get_unit(dev) Get the unit number (units are numbered from 0 for the devices
associated with each driver).
- char *device_get_nameunit(dev) Get the device name including the unit number, such as "xxx0",
"xxx1" and so on.
- char *device_get_desc(dev) Get the device description. Normally it describes the exact model of
device in human-readable form.
- device_set_desc(dev, desc) Set the description. This makes the device description point to the
string desc which may not be deallocated or changed after that.
- device_set_desc_copy(dev, desc) Set the description. The description is copied into an internal
dynamically allocated buffer, so the string desc may be changed afterwards without adverse
effects.
- void *device_get_softc(dev) Get pointer to the device descriptor (struct xxx_softc) associated
with this device.
- u_int32_t device_get_flags(dev) Get the flags specified for the device in the configuration file.
A convenience function device_printf(dev, fmt, …) may be used to print the messages from the
device driver. It automatically prepends the unitname and colon to the message.
The device_t methods are implemented in the file kern/bus_subr.c.

### 10.4 Configuration File and the Order of Identifying
and Probing During Auto-Configuration
The ISA devices are described in the kernel configuration file like:

device xxx0 at isa? port 0x300 irq 10 drq 5
iomem 0xd0000 flags 0x1 sensitive
The values of port, IRQ and so on are converted to the resource values associated with the device.
They are optional, depending on the device’s needs and abilities for auto-configuration. For
example, some devices do not need DRQ at all and some allow the driver to read the IRQ setting
from the device configuration ports. If a machine has multiple ISA buses the exact bus may be
specified in the configuration line, like isa0 or isa1, otherwise the device would be searched for on
all the ISA buses.
sensitive is a resource requesting that this device must be probed before all non-sensitive devices.
It is supported but does not seem to be used in any current driver.
For legacy ISA devices in many cases the drivers are still able to detect the configuration
parameters. But each device to be configured in the system must have a config line. If two devices
of some type are installed in the system but there is only one configuration line for the
corresponding driver, ie:

device xxx0 at isa?

then only one device will be configured.
But for the devices supporting automatic identification by the means of Plug-n-Play or some
proprietary protocol one configuration line is enough to configure all the devices in the system, like
the one above or just simply:

device xxx at isa?
If a driver supports both auto-identified and legacy devices and both kinds are installed at once in
one machine then it is enough to describe in the config file the legacy devices only. The autoidentified devices will be added automatically.
When an ISA bus is auto-configured the events happen as follows:
All the drivers' identify routines (including the PnP identify routine which identifies all the PnP
devices) are called in random order. As they identify the devices they add them to the list on the ISA
bus. Normally the drivers' identify routines associate their drivers with the new devices. The PnP
identify routine does not know about the other drivers yet so it does not associate any with the new
devices it adds.

The PnP devices are put to sleep using the PnP protocol to prevent them from being probed as
legacy devices.
The probe routines of non-PnP devices marked as sensitive are called. If probe for a device went
successfully, the attach routine is called for it.
The probe and attach routines of all non-PNP devices are called likewise.
The PnP devices are brought back from the sleep state and assigned the resources they request: I/O
and memory address ranges, IRQs and DRQs, all of them not conflicting with the attached legacy
devices.
Then for each PnP device the probe routines of all the present ISA drivers are called. The first one
that claims the device gets attached. It is possible that multiple drivers would claim the device with
different priority; in this case, the highest-priority driver wins. The probe routines must call
ISA_PNP_PROBE() to compare the actual PnP ID with the list of the IDs supported by the driver and if
the ID is not in the table return failure. That means that absolutely every driver, even the ones not
supporting any PnP devices must call ISA_PNP_PROBE(), at least with an empty PnP ID table to return
failure on unknown PnP devices.
The probe routine returns a positive value (the error code) on error, zero or negative value on
success.
The negative return values are used when a PnP device supports multiple interfaces. For example,
an older compatibility interface and a newer advanced interface which are supported by different
drivers. Then both drivers would detect the device. The driver which returns a higher value in the
probe routine takes precedence (in other words, the driver returning 0 has highest precedence,
returning -1 is next, returning -2 is after it and so on). In result the devices which support only the
old interface will be handled by the old driver (which should return -1 from the probe routine)
while the devices supporting the new interface as well will be handled by the new driver (which
should return 0 from the probe routine). If multiple drivers return the same value then the one
called first wins. So if a driver returns value 0 it may be sure that it won the priority arbitration.
The device-specific identify routines can also assign not a driver but a class of drivers to the device.
Then all the drivers in the class are probed for this device, like the case with PnP. This feature is not
implemented in any existing driver and is not considered further in this document.
As the PnP devices are disabled when probing the legacy devices they will not be attached twice
(once as legacy and once as PnP). But in case of device-dependent identify routines it is the
responsibility of the driver to make sure that the same device will not be attached by the driver
twice: once as legacy user-configured and once as auto-identified.
Another practical consequence for the auto-identified devices (both PnP and device-specific) is that
the flags can not be passed to them from the kernel configuration file. So they must either not use
the flags at all or use the flags from the device unit 0 for all the auto-identified devices or use the
sysctl interface instead of flags.
Other unusual configurations may be accommodated by accessing the configuration resources
directly

with

functions

of

families

resource_query_*()

resource_*_value().

Their

implementations are located in kern/subr_bus.c. The old IDE disk driver i386/isa/wd.c contains

examples of such use. But the standard means of configuration must always be preferred. Leave
parsing the configuration resources to the bus configuration code.

### 10.5 Resources
The information that a user enters into the kernel configuration file is processed and passed to the
kernel as configuration resources. This information is parsed by the bus configuration code and
transformed into a value of structure device_t and the bus resources associated with it. The drivers
may access the configuration resources directly using functions resource_* for more complex cases
of configuration. However, generally this is neither needed nor recommended, so this issue is not
discussed further here.
The bus resources are associated with each device. They are identified by type and number within
the type. For the ISA bus the following types are defined:
- SYS_RES_IRQ - interrupt number
- SYS_RES_DRQ - ISA DMA channel number
- SYS_RES_MEMORY - range of device memory mapped into the system memory space
- SYS_RES_IOPORT - range of device I/O registers
The enumeration within types starts from 0, so if a device has two memory regions it would have
resources of type SYS_RES_MEMORY numbered 0 and 1. The resource type has nothing to do with the C
language type, all the resource values have the C language type unsigned long and must be cast as
necessary. The resource numbers do not have to be contiguous, although for ISA they normally
would be. The permitted resource numbers for ISA devices are:

IRQ: 0-1
DRQ: 0-1
MEMORY: 0-3
IOPORT: 0-7
All the resources are represented as ranges, with a start value and count. For IRQ and DRQ
resources the count would normally be equal to 1. The values for memory refer to the physical
addresses.
Three types of activities can be performed on resources:
- set/get
- allocate/release
- activate/deactivate
Setting sets the range used by the resource. Allocation reserves the requested range that no other
driver would be able to reserve it (and checking that no other driver reserved this range already).
Activation makes the resource accessible to the driver by doing whatever is necessary for that (for
example, for memory it would be mapping into the kernel virtual address space).

The functions to manipulate resources are:
- int bus_set_resource(device_t dev, int type, int rid, u_long start, u_long count)
Set a range for a resource. Returns 0 if successful, error code otherwise. Normally, this function
will return an error only if one of type, rid, start or count has a value that falls out of the
permitted range.
- dev - driver’s device
- type - type of resource, SYS_RES_*
- rid - resource number (ID) within type
- start, count - resource range
- int bus_get_resource(device_t dev, int type, int rid, u_long *startp, u_long *countp)
Get the range of resource. Returns 0 if successful, error code if the resource is not defined yet.
- u_long

bus_get_resource_start(device_t

dev,

type,

rid)

u_long

bus_get_resource_count (device_t dev, int type, int rid)
Convenience functions to get only the start or count. Return 0 in case of error, so if the resource
start has 0 among the legitimate values it would be impossible to tell if the value is 0 or an error
occurred. Luckily, no ISA resources for add-on drivers may have a start value equal to 0.
- void bus_delete_resource(device_t dev, int type, int rid)
Delete a resource, make it undefined.
- struct resource * bus_alloc_resource(device_t dev, int type, int *rid, u_long start, u_long
end, u_long count, u_int flags)
Allocate a resource as a range of count values not allocated by anyone else, somewhere between
start and end. Alas, alignment is not supported. If the resource was not set yet it is automatically
created. The special values of start 0 and end ~0 (all ones) means that the fixed values
previously set by bus_set_resource() must be used instead: start and count as themselves and
end=(start+count), in this case if the resource was not defined before then an error is returned.
Although rid is passed by reference it is not set anywhere by the resource allocation code of the
ISA bus. (The other buses may use a different approach and modify it).
Flags are a bitmap, the flags interesting for the caller are:
- RF_ACTIVE - causes the resource to be automatically activated after allocation.
- RF_SHAREABLE - resource may be shared at the same time by multiple drivers.
- RF_TIMESHARE - resource may be time-shared by multiple drivers, i.e., allocated at the same
time by many but activated only by one at any given moment of time.
- Returns 0 on error. The allocated values may be obtained from the returned handle using
methods rhand_*().
- int bus_release_resource(device_t dev, int type, int rid, struct resource *r)

- Release the resource, r is the handle returned by bus_alloc_resource(). Returns 0 on success,
error code otherwise.
- int bus_activate_resource(device_t dev, int type, int rid, struct resource *r) int
bus_deactivate_resource(device_t dev, int type, int rid, struct resource *r)
- Activate or deactivate resource. Return 0 on success, error code otherwise. If the resource is
time-shared and currently activated by another driver then EBUSY is returned.
- int bus_setup_intr(device_t dev, struct resource *r, int flags, driver_intr_t *handler,
void *arg, void **cookiep) int bus_teardown_intr(device_t dev, struct resource *r, void
*cookie)
- Associate or de-associate the interrupt handler with a device. Return 0 on success, error code
otherwise.
- r - the activated resource handler describing the IRQ
flags - the interrupt priority level, one of:
- INTR_TYPE_TTY - terminals and other likewise character-type devices. To mask them use
spltty().
- (INTR_TYPE_TTY | INTR_TYPE_FAST) - terminal type devices with small input buffer, critical to
the data loss on input (such as the old-fashioned serial ports). To mask them use spltty().
- INTR_TYPE_BIO - block-type devices, except those on the CAM controllers. To mask them use
splbio().
- INTR_TYPE_CAM - CAM (Common Access Method) bus controllers. To mask them use splcam().
- INTR_TYPE_NET - network interface controllers. To mask them use splimp().
- INTR_TYPE_MISC - miscellaneous devices. There is no other way to mask them than by
splhigh() which masks all interrupts.
When an interrupt handler executes all the other interrupts matching its priority level will be
masked. The only exception is the MISC level for which no other interrupts are masked and which
is not masked by any other interrupt.
- handler - pointer to the handler function, the type driver_intr_t is defined as void
driver_intr_t(void *)
- arg - the argument passed to the handler to identify this particular device. It is cast from void*
to any real type by the handler. The old convention for the ISA interrupt handlers was to use the
unit number as argument, the new (recommended) convention is using a pointer to the device
softc structure.
- cookie[p] - the value received from setup() is used to identify the handler when passed to
teardown()
A number of methods are defined to operate on the resource handlers (struct resource *). Those of
interest to the device driver writers are:
- u_long rman_get_start(r) u_long rman_get_end(r) Get the start and end of allocated resource
range.

- void *rman_get_virtual(r) Get the virtual address of activated memory resource.

### 10.6 Bus Memory Mapping
In many cases data is exchanged between the driver and the device through the memory. Two
variants are possible:
(a) memory is located on the device card
(b) memory is the main memory of the computer
In case (a) the driver always copies the data back and forth between the on-card memory and the
main memory as necessary. To map the on-card memory into the kernel virtual address space the
physical address and length of the on-card memory must be defined as a SYS_RES_MEMORY resource.
That resource can then be allocated and activated, and its virtual address obtained using
rman_get_virtual(). The older drivers used the function pmap_mapdev() for this purpose, which
should not be used directly any more. Now it is one of the internal steps of resource activation.
Most of the ISA cards will have their memory configured for physical location somewhere in range
640KB-1MB. Some of the ISA cards require larger memory ranges which should be placed
somewhere under 16MB (because of the 24-bit address limitation on the ISA bus). In that case if the
machine has more memory than the start address of the device memory (in other words, they
overlap) a memory hole must be configured at the address range used by devices. Many BIOSes
allow configuration of a memory hole of 1MB starting at 14MB or 15MB. FreeBSD can handle the
memory holes properly if the BIOS reports them properly (this feature may be broken on old
BIOSes).
In case (b) just the address of the data is sent to the device, and the device uses DMA to actually
access the data in the main memory. Two limitations are present: First, ISA cards can only access
memory below 16MB. Second, the contiguous pages in virtual address space may not be contiguous
in physical address space, so the device may have to do scatter/gather operations. The bus
subsystem provides ready solutions for some of these problems, the rest has to be done by the
drivers themselves.
Two structures are used for DMA memory allocation, bus_dma_tag_t and bus_dmamap_t. Tag describes
the properties required for the DMA memory. Map represents a memory block allocated according
to these properties. Multiple maps may be associated with the same tag.
Tags are organized into a tree-like hierarchy with inheritance of the properties. A child tag inherits
all the requirements of its parent tag, and may make them more strict but never more loose.
Normally one top-level tag (with no parent) is created for each device unit. If multiple memory
areas with different requirements are needed for each device then a tag for each of them may be
created as a child of the parent tag.
The tags can be used to create a map in two ways.
First, a chunk of contiguous memory conformant with the tag requirements may be allocated (and
later may be freed). This is normally used to allocate relatively long-living areas of memory for
communication with the device. Loading of such memory into a map is trivial: it is always

considered as one chunk in the appropriate physical memory range.
Second, an arbitrary area of virtual memory may be loaded into a map. Each page of this memory
will be checked for conformance to the map requirement. If it conforms then it is left at its original
location. If it is not then a fresh conformant "bounce page" is allocated and used as intermediate
storage. When writing the data from the non-conformant original pages they will be copied to their
bounce pages first and then transferred from the bounce pages to the device. When reading the
data would go from the device to the bounce pages and then copied to their non-conformant
original pages. The process of copying between the original and bounce pages is called
synchronization. This is normally used on a per-transfer basis: buffer for each transfer would be
loaded, transfer done and buffer unloaded.
The functions working on the DMA memory are:
- int bus_dma_tag_create(bus_dma_tag_t parent, bus_size_t alignment, bus_size_t boundary,
bus_addr_t

lowaddr,

bus_addr_t

highaddr,

bus_dma_filter_t

*filter,

*filterarg,

bus_size_t maxsize, int nsegments, bus_size_t maxsegsz, int flags, bus_dma_tag_t *dmat)
Create a new tag. Returns 0 on success, the error code otherwise.
- parent - parent tag, or NULL to create a top-level tag.
- alignment - required physical alignment of the memory area to be allocated for this tag. Use
value 1 for "no specific alignment". Applies only to the future bus_dmamem_alloc() but not
bus_dmamap_create() calls.
- boundary - physical address boundary that must not be crossed when allocating the
memory. Use value 0 for "no boundary". Applies only to the future bus_dmamem_alloc() but
not bus_dmamap_create() calls. Must be power of 2. If the memory is planned to be used in
non-cascaded DMA mode (i.e., the DMA addresses will be supplied not by the device itself
but by the ISA DMA controller) then the boundary must be no larger than 64KB (64*1024)
due to the limitations of the DMA hardware.
- lowaddr, highaddr - the names are slightly misleading; these values are used to limit the
permitted range of physical addresses used to allocate the memory. The exact meaning
varies depending on the planned future use:
- For bus_dmamem_alloc() all the addresses from 0 to lowaddr-1 are considered permitted,
the higher ones are forbidden.
- For bus_dmamap_create() all the addresses outside the inclusive range [lowaddr;
highaddr] are considered accessible. The addresses of pages inside the range are passed
to the filter function which decides if they are accessible. If no filter function is supplied
then all the range is considered unaccessible.
- For the ISA devices the normal values (with no filter function) are:
lowaddr = BUS_SPACE_MAXADDR_24BIT
highaddr = BUS_SPACE_MAXADDR
- filter, filterarg - the filter function and its argument. If NULL is passed for filter then the
whole

range

[lowaddr,

highaddr]

is

considered

unaccessible

when

doing

bus_dmamap_create(). Otherwise the physical address of each attempted page in range
[lowaddr; highaddr] is passed to the filter function which decides if it is accessible. The
prototype of the filter function is: int filterfunc(void *arg, bus_addr_t paddr). It must
return 0 if the page is accessible, non-zero otherwise.
- maxsize - the maximal size of memory (in bytes) that may be allocated through this tag. In
case it is difficult to estimate or could be arbitrarily big, the value for ISA devices would be
BUS_SPACE_MAXSIZE_24BIT.
- nsegments - maximal number of scatter-gather segments supported by the device. If
unrestricted then the value BUS_SPACE_UNRESTRICTED should be used. This value is
recommended for the parent tags, the actual restrictions would then be specified for the
descendant tags. Tags with nsegments equal to BUS_SPACE_UNRESTRICTED may not be used to
actually load maps, they may be used only as parent tags. The practical limit for nsegments
seems to be about 250-300, higher values will cause kernel stack overflow (the hardware can
not normally support that many scatter-gather buffers anyway).
- maxsegsz - maximal size of a scatter-gather segment supported by the device. The maximal
value for ISA device would be BUS_SPACE_MAXSIZE_24BIT.
- flags - a bitmap of flags. The only interesting flag is:
- BUS_DMA_ALLOCNOW - requests to allocate all the potentially needed bounce pages
when creating the tag.
- dmat - pointer to the storage for the new tag to be returned.
- int bus_dma_tag_destroy(bus_dma_tag_t dmat)
Destroy a tag. Returns 0 on success, the error code otherwise.
dmat - the tag to be destroyed.
- int bus_dmamem_alloc(bus_dma_tag_t dmat, void** vaddr, int flags, bus_dmamap_t *mapp)
Allocate an area of contiguous memory described by the tag. The size of memory to be allocated
is tag’s maxsize. Returns 0 on success, the error code otherwise. The result still has to be loaded
by bus_dmamap_load() before being used to get the physical address of the memory.
- vaddr - pointer to the storage for the kernel virtual address of the allocated area to be
returned.
- flags - a bitmap of flags. The only interesting flag is:
- BUS_DMA_NOWAIT - if the memory is not immediately available return the error. If this
flag is not set then the routine is allowed to sleep until the memory becomes available.
- mapp - pointer to the storage for the new map to be returned.
- void bus_dmamem_free(bus_dma_tag_t dmat, void *vaddr, bus_dmamap_t map)
Free the memory allocated by bus_dmamem_alloc(). At present, freeing of the memory allocated
with ISA restrictions is not implemented. Due to this the recommended model of use is to keep
and re-use the allocated areas for as long as possible. Do not lightly free some area and then

shortly allocate it again. That does not mean that bus_dmamem_free() should not be used at all:
hopefully it will be properly implemented soon.
- vaddr - the kernel virtual address of the memory
- map - the map of the memory (as returned from bus_dmamem_alloc())
- int bus_dmamap_create(bus_dma_tag_t dmat, int flags, bus_dmamap_t *mapp)
Create a map for the tag, to be used in bus_dmamap_load() later. Returns 0 on success, the error
code otherwise.
- flags - theoretically, a bit map of flags. But no flags are defined yet, so at present it will be
always 0.
- mapp - pointer to the storage for the new map to be returned
- int bus_dmamap_destroy(bus_dma_tag_t dmat, bus_dmamap_t map)
Destroy a map. Returns 0 on success, the error code otherwise.
- dmat - the tag to which the map is associated
- map - the map to be destroyed
- int bus_dmamap_load(bus_dma_tag_t dmat, bus_dmamap_t map, void *buf, bus_size_t buflen,
bus_dmamap_callback_t *callback, void *callback_arg, int flags)
Load a buffer into the map (the map must be previously created by bus_dmamap_create() or
bus_dmamem_alloc()). All the pages of the buffer are checked for conformance to the tag
requirements and for those not conformant the bounce pages are allocated. An array of physical
segment descriptors is built and passed to the callback routine. This callback routine is then
expected to handle it in some way. The number of bounce buffers in the system is limited, so if
the bounce buffers are needed but not immediately available the request will be queued and
the callback will be called when the bounce buffers will become available. Returns 0 if the
callback was executed immediately or EINPROGRESS if the request was queued for future
execution. In the latter case the synchronization with queued callback routine is the
responsibility of the driver.
- map - the map
- buf - kernel virtual address of the buffer
- buflen - length of the buffer
- callback, callback_arg - the callback function and its argument
The prototype of callback function is: void callback(void *arg, bus_dma_segment_t *seg, int
nseg, int error)
- arg - the same as callback_arg passed to bus_dmamap_load()

- seg - array of the segment descriptors
- nseg - number of descriptors in array
- error - indication of the segment number overflow: if it is set to EFBIG then the buffer did not
fit into the maximal number of segments permitted by the tag. In this case only the
permitted number of descriptors will be in the array. Handling of this situation is up to the
driver: depending on the desired semantics it can either consider this an error or split the
buffer in two and handle the second part separately
Each entry in the segments array contains the fields:
- ds_addr - physical bus address of the segment
- ds_len - length of the segment
- void bus_dmamap_unload(bus_dma_tag_t dmat, bus_dmamap_t map)
unload the map.
- dmat - tag
- map - loaded map
- void bus_dmamap_sync (bus_dma_tag_t dmat, bus_dmamap_t map, bus_dmasync_op_t op)
Synchronise a loaded buffer with its bounce pages before and after physical transfer to or from
device. This is the function that does all the necessary copying of data between the original
buffer and its mapped version. The buffers must be synchronized both before and after doing
the transfer.
- dmat - tag
- map - loaded map
- op - type of synchronization operation to perform:
- BUS_DMASYNC_PREREAD - before reading from device into buffer
- BUS_DMASYNC_POSTREAD - after reading from device into buffer
- BUS_DMASYNC_PREWRITE - before writing the buffer to device
- BUS_DMASYNC_POSTWRITE - after writing the buffer to device
As of now PREREAD and POSTWRITE are null operations but that may change in the future, so they
must not be ignored in the driver. Synchronization is not needed for the memory obtained from
bus_dmamem_alloc().
Before calling the callback function from bus_dmamap_load() the segment array is stored in the stack.
And it gets pre-allocated for the maximal number of segments allowed by the tag. As a result of this
the practical limit for the number of segments on i386 architecture is about 250-300 (the kernel
stack is 4KB minus the size of the user structure, size of a segment array entry is 8 bytes, and some
space must be left). Since the array is allocated based on the maximal number this value must not
be set higher than really needed. Fortunately, for most of hardware the maximal supported number
of segments is much lower. But if the driver wants to handle buffers with a very large number of
scatter-gather segments it should do that in portions: load part of the buffer, transfer it to the

device, load next part of the buffer, and so on.
Another practical consequence is that the number of segments may limit the size of the buffer. If all
the pages in the buffer happen to be physically non-contiguous then the maximal supported buffer
size for that fragmented case would be (nsegments * page_size). For example, if a maximal number
of 10 segments is supported then on i386 maximal guaranteed supported buffer size would be 40K.
If a higher size is desired then special tricks should be used in the driver.
If the hardware does not support scatter-gather at all or the driver wants to support some buffer
size even if it is heavily fragmented then the solution is to allocate a contiguous buffer in the driver
and use it as intermediate storage if the original buffer does not fit.
Below are the typical call sequences when using a map depend on the use of the map. The
characters → are used to show the flow of time.
For a buffer which stays practically fixed during all the time between attachment and detachment
of a device:
bus_dmamem_alloc → bus_dmamap_load → …use buffer… → → bus_dmamap_unload →
bus_dmamem_free
For a buffer that changes frequently and is passed from outside the driver:

bus_dmamap_create ->
-> bus_dmamap_load -> bus_dmamap_sync(PRE...) -> do transfer ->
-> bus_dmamap_sync(POST...) -> bus_dmamap_unload ->
-> bus_dmamap_load -> bus_dmamap_sync(PRE...) -> do transfer ->
-> bus_dmamap_sync(POST...) -> bus_dmamap_unload ->
-> bus_dmamap_destroy
When loading a map created by bus_dmamem_alloc() the passed address and size of the buffer must
be the same as used in bus_dmamem_alloc(). In this case it is guaranteed that the whole buffer will be
mapped as one segment (so the callback may be based on this assumption) and the request will be
executed immediately (EINPROGRESS will never be returned). All the callback needs to do in this
case is to save the physical address.
A typical example would be:

alloc_callback(void *arg, bus_dma_segment_t *seg, int nseg, int error)
*(bus_addr_t *)arg = seg[0].ds_addr;
struct somedata {
....

struct somedata *vsomedata; /* virtual address */
bus_addr_t psomedata; /* physical bus-relative address */
bus_dma_tag_t tag_somedata;
bus_dmamap_t map_somedata;
error=bus_dma_tag_create(parent_tag, alignment,
boundary, lowaddr, highaddr, /*filter*/ NULL, /*filterarg*/ NULL,
/*maxsize*/ sizeof(struct somedata), /*nsegments*/ 1,
/*maxsegsz*/ sizeof(struct somedata), /*flags*/ 0,
&tag_somedata);
error = bus_dmamem_alloc(tag_somedata, &vsomedata, /* flags*/ 0,
&map_somedata);
bus_dmamap_load(tag_somedata, map_somedata, (void *)vsomedata,
sizeof (struct somedata), alloc_callback,
(void *) &psomedata, /*flags*/0);
Looks a bit long and complicated but that is the way to do it. The practical consequence is: if
multiple memory areas are allocated always together it would be a really good idea to combine
them all into one structure and allocate as one (if the alignment and boundary limitations permit).
When loading an arbitrary buffer into the map created by bus_dmamap_create() special measures
must be taken to synchronize with the callback in case it would be delayed. The code would look
like:

int s;
s = splsoftvm();
error = bus_dmamap_load(
dmat,
dmamap,
buffer_ptr,
buffer_len,
callback,
/*callback_arg*/ buffer_descriptor,
/*flags*/0);
if (error == EINPROGRESS) {
- Do whatever is needed to ensure synchronization
- with callback. Callback is guaranteed not to be started
- until we do splx() or tsleep().

splx(s);
Two possible approaches for the processing of requests are:
1. If requests are completed by marking them explicitly as done (such as the CAM requests) then it
would be simpler to put all the further processing into the callback driver which would mark
the request when it is done. Then not much extra synchronization is needed. For the flow
control reasons it may be a good idea to freeze the request queue until this request gets
completed.
2. If requests are completed when the function returns (such as classic read or write requests on
character devices) then a synchronization flag should be set in the buffer descriptor and
tsleep() called. Later when the callback gets called it will do its processing and check this
synchronization flag. If it is set then the callback should issue a wakeup. In this approach the
callback function could either do all the needed processing (just like the previous case) or
simply save the segments array in the buffer descriptor. Then after callback completes the
calling function could use this saved segments array and do all the processing.

10.7. DMA
The Direct Memory Access (DMA) is implemented in the ISA bus through the DMA controller
(actually, two of them but that is an irrelevant detail). To make the early ISA devices simple and
cheap the logic of the bus control and address generation was concentrated in the DMA controller.
Fortunately, FreeBSD provides a set of functions that mostly hide the annoying details of the DMA
controller from the device drivers.
The simplest case is for the fairly intelligent devices. Like the bus master devices on PCI they can
generate the bus cycles and memory addresses all by themselves. The only thing they really need
from the DMA controller is bus arbitration. So for this purpose they pretend to be cascaded slave
DMA controllers. And the only thing needed from the system DMA controller is to enable the
cascaded mode on a DMA channel by calling the following function when attaching the driver:
void isa_dmacascade(int channel_number)
All the further activity is done by programming the device. When detaching the driver no DMArelated functions need to be called.
For the simpler devices things get more complicated. The functions used are:
- int isa_dma_acquire(int chanel_number)
Reserve a DMA channel. Returns 0 on success or EBUSY if the channel was already reserved by
this or a different driver. Most of the ISA devices are not able to share DMA channels anyway, so
normally this function is called when attaching a device. This reservation was made redundant
by the modern interface of bus resources but still must be used in addition to the latter. If not
used then later, other DMA routines will panic.

- int isa_dma_release(int chanel_number)
Release a previously reserved DMA channel. No transfers must be in progress when the channel
is released (in addition the device must not try to initiate transfer after the channel is released).
- void isa_dmainit(int chan, u_int bouncebufsize)
Allocate a bounce buffer for use with the specified channel. The requested size of the buffer can
not exceed 64KB. This bounce buffer will be automatically used later if a transfer buffer
happens to be not physically contiguous or outside of the memory accessible by the ISA bus or
crossing the 64KB boundary. If the transfers will be always done from buffers which conform to
these conditions (such as those allocated by bus_dmamem_alloc() with proper limitations) then
isa_dmainit() does not have to be called. But it is quite convenient to transfer arbitrary data
using the DMA controller. The bounce buffer will automatically care of the scatter-gather issues.
- chan - channel number
- bouncebufsize - size of the bounce buffer in bytes
- void isa_dmastart(int flags, caddr_t addr, u_int nbytes, int chan)
Prepare to start a DMA transfer. This function must be called to set up the DMA controller
before actually starting transfer on the device. It checks that the buffer is contiguous and falls
into the ISA memory range, if not then the bounce buffer is automatically used. If bounce buffer
is required but not set up by isa_dmainit() or too small for the requested transfer size then the
system will panic. In case of a write request with bounce buffer the data will be automatically
copied to the bounce buffer.
- flags - a bitmask determining the type of operation to be done. The direction bits B_READ and
B_WRITE are mutually exclusive.
- B_READ - read from the ISA bus into memory
- B_WRITE - write from the memory to the ISA bus
- B_RAW - if set then the DMA controller will remember the buffer and after the end of
transfer will automatically re-initialize itself to repeat transfer of the same buffer again (of
course, the driver may change the data in the buffer before initiating another transfer in the
device). If not set then the parameters will work only for one transfer, and isa_dmastart()
will have to be called again before initiating the next transfer. Using B_RAW makes sense
only if the bounce buffer is not used.
- addr - virtual address of the buffer
- nbytes - length of the buffer. Must be less or equal to 64KB. Length of 0 is not allowed: the DMA
controller will understand it as 64KB while the kernel code will understand it as 0 and that
would cause unpredictable effects. For channels number 4 and higher the length must be even
because these channels transfer 2 bytes at a time. In case of an odd length the last byte will not
be transferred.
- chan - channel number
- void isa_dmadone(int flags, caddr_t addr, int nbytes, int chan)
Synchronize the memory after device reports that transfer is done. If that was a read operation

with a bounce buffer then the data will be copied from the bounce buffer to the original buffer.
Arguments are the same as for isa_dmastart(). Flag B_RAW is permitted but it does not affect
isa_dmadone() in any way.
- int isa_dmastatus(int channel_number)
Returns the number of bytes left in the current transfer to be transferred. In case the flag
B_READ was set in isa_dmastart() the number returned will never be equal to zero. At the end
of transfer it will be automatically reset back to the length of buffer. The normal use is to check
the number of bytes left after the device signals that the transfer is completed. If the number of
bytes is not 0 then something probably went wrong with that transfer.
- int isa_dmastop(int channel_number)
Aborts the current transfer and returns the number of bytes left untransferred.

10.8. xxx_isa_probe
This function probes if a device is present. If the driver supports auto-detection of some part of
device configuration (such as interrupt vector or memory address) this auto-detection must be
done in this routine.
As for any other bus, if the device cannot be detected or is detected but failed the self-test or some
other problem happened then it returns a positive value of error. The value ENXIO must be returned
if the device is not present. Other error values may mean other conditions. Zero or negative values
mean success. Most of the drivers return zero as success.
The negative return values are used when a PnP device supports multiple interfaces. For example,
an older compatibility interface and a newer advanced interface which are supported by different
drivers. Then both drivers would detect the device. The driver which returns a higher value in the
probe routine takes precedence (in other words, the driver returning 0 has highest precedence, one
returning -1 is next, one returning -2 is after it and so on). In result the devices which support only
the old interface will be handled by the old driver (which should return -1 from the probe routine)
while the devices supporting the new interface as well will be handled by the new driver (which
should return 0 from the probe routine).
The device descriptor struct xxx_softc is allocated by the system before calling the probe routine. If
the probe routine returns an error the descriptor will be automatically deallocated by the system.
So if a probing error occurs the driver must make sure that all the resources it used during probe
are deallocated and that nothing keeps the descriptor from being safely deallocated. If the probe
completes successfully the descriptor will be preserved by the system and later passed to the
routine xxx_isa_attach(). If a driver returns a negative value it can not be sure that it will have the
highest priority and its attach routine will be called. So in this case it also must release all the
resources before returning and if necessary allocate them again in the attach routine. When
xxx_isa_probe() returns 0 releasing the resources before returning is also a good idea and a wellbehaved driver should do so. But in cases where there is some problem with releasing the
resources the driver is allowed to keep resources between returning 0 from the probe routine and
execution of the attach routine.

A typical probe routine starts with getting the device descriptor and unit:

struct xxx_softc *sc = device_get_softc(dev);
int unit = device_get_unit(dev);
int pnperror;
sc->dev = dev; /* link it back */
sc->unit = unit;
Then check for the PnP devices. The check is carried out by a table containing the list of PnP IDs
supported by this driver and human-readable descriptions of the device models corresponding to
these IDs.

pnperror=ISA_PNP_PROBE(device_get_parent(dev), dev,
xxx_pnp_ids); if(pnperror == ENXIO) return ENXIO;
The logic of ISA_PNP_PROBE is the following: If this card (device unit) was not detected as PnP then
ENOENT will be returned. If it was detected as PnP but its detected ID does not match any of the IDs
in the table then ENXIO is returned. Finally, if it has PnP support and it matches on of the IDs in the
table, 0 is returned and the appropriate description from the table is set by device_set_desc().
If a driver supports only PnP devices then the condition would look like:

if(pnperror != 0)
return pnperror;
No special treatment is required for the drivers which do not support PnP because they pass an
empty PnP ID table and will always get ENXIO if called on a PnP card.
The probe routine normally needs at least some minimal set of resources, such as I/O port number
to find the card and probe it. Depending on the hardware the driver may be able to discover the
other necessary resources automatically. The PnP devices have all the resources pre-set by the PnP
subsystem, so the driver does not need to discover them by itself.
Typically the minimal information required to get access to the device is the I/O port number. Then
some devices allow to get the rest of information from the device configuration registers (though
not all devices do that). So first we try to get the port start value:

sc->port0 = bus_get_resource_start(dev,
SYS_RES_IOPORT, 0 /*rid*/); if(sc->port0 == 0) return ENXIO;
The base port address is saved in the structure softc for future use. If it will be used very often then
calling the resource function each time would be prohibitively slow. If we do not get a port we just
return an error. Some device drivers can instead be clever and try to probe all the possible ports,

like this:

/* table of all possible base I/O port addresses for this device */
static struct xxx_allports {
u_short port; /* port address */
short used; /* flag: if this port is already used by some unit */
} xxx_allports = {
{ 0x300, 0 },
{ 0x320, 0 },
{ 0x340, 0 },
{ 0, 0 } /* end of table */
int port, i;
port = bus_get_resource_start(dev, SYS_RES_IOPORT, 0 /*rid*/);
if(port !=0 ) {
for(i=0; xxx_allports[i].port!=0; i++) {
if(xxx_allports[i].used || xxx_allports[i].port != port)
continue;
/* found it */
xxx_allports[i].used = 1;
/* do probe on a known port */
return xxx_really_probe(dev, port);
return ENXIO; /* port is unknown or already used */
/* we get here only if we need to guess the port */
for(i=0; xxx_allports[i].port!=0; i++) {
if(xxx_allports[i].used)
continue;
/* mark as used - even if we find nothing at this port
- at least we won't probe it in future
xxx_allports[i].used = 1;
error = xxx_really_probe(dev, xxx_allports[i].port);
if(error == 0) /* found a device at that port */
/* probed all possible addresses, none worked */
Of course, normally the driver’s identify() routine should be used for such things. But there may
be one valid reason why it may be better to be done in probe(): if this probe would drive some

other sensitive device crazy. The probe routines are ordered with consideration of the sensitive
flag: the sensitive devices get probed first and the rest of the devices later. But the identify()
routines are called before any probes, so they show no respect to the sensitive devices and may
upset them.
Now, after we got the starting port we need to set the port count (except for PnP devices) because
the kernel does not have this information in the configuration file.

if(pnperror /* only for non-PnP devices */
&& bus_set_resource(dev, SYS_RES_IOPORT, 0, sc->port0,
XXX_PORT_COUNT)<0)
Finally allocate and activate a piece of port address space (special values of start and end mean "use
those we set by bus_set_resource()"):

sc->port0_rid = 0;
sc->port0_r = bus_alloc_resource(dev, SYS_RES_IOPORT,
&sc->port0_rid,
if(sc->port0_r == NULL)
Now having access to the port-mapped registers we can poke the device in some way and check if it
reacts like it is expected to. If it does not then there is probably some other device or no device at all
at this address.
Normally drivers do not set up the interrupt handlers until the attach routine. Instead they do
probes in the polling mode using the DELAY() function for timeout. The probe routine must never
hang forever, all the waits for the device must be done with timeouts. If the device does not
respond within the time it is probably broken or misconfigured and the driver must return error.
When determining the timeout interval give the device some extra time to be on the safe side:
although DELAY() is supposed to delay for the same amount of time on any machine it has some
margin of error, depending on the exact CPU.
If the probe routine really wants to check that the interrupts really work it may configure and
probe the interrupts too. But that is not recommended.

/* implemented in some very device-specific way */
if(error = xxx_probe_ports(sc))
goto bad; /* will deallocate the resources before returning */
The function xxx_probe_ports() may also set the device description depending on the exact model of
device it discovers. But if there is only one supported device model this can be as well done in a
hardcoded way. Of course, for the PnP devices the PnP support sets the description from the table

automatically.

if(pnperror)
device_set_desc(dev, "Our device model 1234");
Then the probe routine should either discover the ranges of all the resources by reading the device
configuration registers or make sure that they were set explicitly by the user. We will consider it
with an example of on-board memory. The probe routine should be as non-intrusive as possible, so
allocation and check of functionality of the rest of resources (besides the ports) would be better left
to the attach routine.
The memory address may be specified in the kernel configuration file or on some devices it may be
pre-configured in non-volatile configuration registers. If both sources are available and different,
which one should be used? Probably if the user bothered to set the address explicitly in the kernel
configuration file they know what they are doing and this one should take precedence. An example
of implementation could be:

/* try to find out the config address first */
sc->mem0_p = bus_get_resource_start(dev, SYS_RES_MEMORY, 0 /*rid*/);
if(sc->mem0_p == 0) { /* nope, not specified by user */
sc->mem0_p = xxx_read_mem0_from_device_config(sc);
if(sc->mem0_p == 0)
/* can't get it from device config registers either */
if(xxx_set_mem0_address_on_device(sc) < 0)
goto bad; /* device does not support that address */
/* just like the port, set the memory size,
- for some devices the memory size would not be constant
- but should be read from the device configuration registers instead
- to accommodate different models of devices. Another option would
- be to let the user set the memory size as "msize" configuration
- resource which will be automatically handled by the ISA bus.
if(pnperror) { /* only for non-PnP devices */
sc->mem0_size = bus_get_resource_count(dev, SYS_RES_MEMORY, 0 /*rid*/);
if(sc->mem0_size == 0) /* not specified by user */
sc->mem0_size = xxx_read_mem0_size_from_device_config(sc);
if(sc->mem0_size == 0) {
/* suppose this is a very old model of device without
- auto-configuration features and the user gave no preference,
- so assume the minimalistic case
- (of course, the real value will vary with the driver)
sc->mem0_size = 8*1024;

if(xxx_set_mem0_size_on_device(sc) < 0)
goto bad; /* device does not support that size */
if(bus_set_resource(dev, SYS_RES_MEMORY, /*rid*/0,
sc->mem0_p, sc->mem0_size)<0)
sc->mem0_size = bus_get_resource_count(dev, SYS_RES_MEMORY, 0 /*rid*/);
Resources for IRQ and DRQ are easy to check by analogy.
If all went well then release all the resources and return success.

Finally, handle the troublesome situations. All the resources should be deallocated before
returning. We make use of the fact that before the structure softc is passed to us it gets zeroed out,
so we can find out if some resource was allocated: then its descriptor is non-zero.

bad:
else /* exact error is unknown */
That would be all for the probe routine. Freeing of resources is done from multiple places, so it is
moved to a function which may look like:

xxx_free_resources(sc)
struct xxx_softc *sc;
/* check every resource and free if not zero */
/* interrupt handler */
if(sc->intr_r) {
bus_teardown_intr(sc->dev, sc->intr_r, sc->intr_cookie);
bus_release_resource(sc->dev, SYS_RES_IRQ, sc->intr_rid,
sc->intr_r);
sc->intr_r = 0;

/* all kinds of memory maps we could have allocated */
if(sc->data_p) {
bus_dmamap_unload(sc->data_tag, sc->data_map);
sc->data_p = 0;
if(sc->data) { /* sc->data_map may be legitimately equal to 0 */
/* the map will also be freed */
bus_dmamem_free(sc->data_tag, sc->data, sc->data_map);
sc->data = 0;
if(sc->data_tag) {
bus_dma_tag_destroy(sc->data_tag);
sc->data_tag = 0;
... free other maps and tags if we have them ...
if(sc->parent_tag) {
bus_dma_tag_destroy(sc->parent_tag);
sc->parent_tag = 0;
/* release all the bus resources */
if(sc->mem0_r) {
bus_release_resource(sc->dev, SYS_RES_MEMORY, sc->mem0_rid,
sc->mem0_r);
sc->mem0_r = 0;
if(sc->port0_r) {
bus_release_resource(sc->dev, SYS_RES_IOPORT, sc->port0_rid,
sc->port0_r);
sc->port0_r = 0;

10.9. xxx_isa_attach
The attach routine actually connects the driver to the system if the probe routine returned success
and the system had chosen to attach that driver. If the probe routine returned 0 then the attach
routine may expect to receive the device structure softc intact, as it was set by the probe routine.
Also if the probe routine returns 0 it may expect that the attach routine for this device shall be
called at some point in the future. If the probe routine returns a negative value then the driver may
make none of these assumptions.
The attach routine returns 0 if it completed successfully or error code otherwise.
The attach routine starts just like the probe routine, with getting some frequently used data into

more accessible variables.

struct xxx_softc *sc = device_get_softc(dev);
int unit = device_get_unit(dev);
Then allocate and activate all the necessary resources. As normally the port range will be released
before returning from probe, it has to be allocated again. We expect that the probe routine had
properly set all the resource ranges, as well as saved them in the structure softc. If the probe
routine had left some resource allocated then it does not need to be allocated again (which would
be considered an error).

sc->port0_rid = 0;
sc->port0_r = bus_alloc_resource(dev, SYS_RES_IOPORT,

&sc->port0_rid,

if(sc->port0_r == NULL)
/* on-board memory */
sc->mem0_rid = 0;
sc->mem0_r = bus_alloc_resource(dev, SYS_RES_MEMORY, &sc->mem0_rid,
if(sc->mem0_r == NULL)
/* get its virtual address */
sc->mem0_v = rman_get_virtual(sc->mem0_r);
The DMA request channel (DRQ) is allocated likewise. To initialize it use functions of the isa_dma*()
family. For example:
isa_dmacascade(sc→drq0);
The interrupt request line (IRQ) is a bit special. Besides allocation the driver’s interrupt handler
should be associated with it. Historically in the old ISA drivers the argument passed by the system
to the interrupt handler was the device unit number. But in modern drivers the convention
suggests passing the pointer to structure softc. The important reason is that when the structures
softc are allocated dynamically then getting the unit number from softc is easy while getting softc
from the unit number is difficult. Also this convention makes the drivers for different buses look
more uniform and allows them to share the code: each bus gets its own probe, attach, detach and
other bus-specific routines while the bulk of the driver code may be shared among them.

sc->intr_rid = 0;
sc->intr_r = bus_alloc_resource(dev, SYS_RES_MEMORY, &sc->intr_rid,

if(sc->intr_r == NULL)
- XXX_INTR_TYPE is supposed to be defined depending on the type of
- the driver, for example as INTR_TYPE_CAM for a CAM driver
error = bus_setup_intr(dev, sc->intr_r, XXX_INTR_TYPE,
(driver_intr_t *) xxx_intr, (void *) sc, &sc->intr_cookie);
If the device needs to make DMA to the main memory then this memory should be allocated like
described before:

error=bus_dma_tag_create(NULL, /*alignment*/ 4,
/*boundary*/ 0, /*lowaddr*/ BUS_SPACE_MAXADDR_24BIT,
/*highaddr*/ BUS_SPACE_MAXADDR, /*filter*/ NULL, /*filterarg*/ NULL,
/*maxsize*/ BUS_SPACE_MAXSIZE_24BIT,
/*nsegments*/ BUS_SPACE_UNRESTRICTED,
/*maxsegsz*/ BUS_SPACE_MAXSIZE_24BIT, /*flags*/ 0,
&sc->parent_tag);
/* many things get inherited from the parent tag
- sc->data is supposed to point to the structure with the shared data,
- for example for a ring buffer it could be:
- struct {
u_short rd_pos;
u_short wr_pos;
bf[XXX_RING_BUFFER_SIZE]
- } *data;
error=bus_dma_tag_create(sc->parent_tag, 1,
0, BUS_SPACE_MAXADDR, 0, /*filter*/ NULL, /*filterarg*/ NULL,
/*maxsize*/ sizeof(* sc->data), /*nsegments*/ 1,
/*maxsegsz*/ sizeof(* sc->data), /*flags*/ 0,
&sc->data_tag);
error = bus_dmamem_alloc(sc->data_tag, &sc->data, /* flags*/ 0,
&sc->data_map);
/* xxx_alloc_callback() just saves the physical address at
- the pointer passed as its argument, in this case &sc->data_p.
- See details in the section on bus memory mapping.

- It can be implemented like:
- static void
- xxx_alloc_callback(void *arg, bus_dma_segment_t *seg,
int nseg, int error)
- {
*(bus_addr_t *)arg = seg[0].ds_addr;
- }
bus_dmamap_load(sc->data_tag, sc->data_map, (void *)sc->data,
sizeof (* sc->data), xxx_alloc_callback, (void *) &sc->data_p,
/*flags*/0);
After all the necessary resources are allocated the device should be initialized. The initialization
may include testing that all the expected features are functional.

if(xxx_initialize(sc) < 0)
The bus subsystem will automatically print on the console the device description set by probe. But
if the driver wants to print some extra information about the device it may do so, for example:

device_printf(dev, "has on-card FIFO buffer of %d bytes\n", sc->fifosize);
If the initialization routine experiences any problems then printing messages about them before
returning error is also recommended.
The final step of the attach routine is attaching the device to its functional subsystem in the kernel.
The exact way to do it depends on the type of the driver: a character device, a block device, a
network device, a CAM SCSI bus device and so on.
If all went well then return success.

error = xxx_attach_subsystem(sc);
Finally, handle the troublesome situations. All the resources should be deallocated before returning
an error. We make use of the fact that before the structure softc is passed to us it gets zeroed out, so
we can find out if some resource was allocated: then its descriptor is non-zero.

bad:

else /* exact error is unknown */
That would be all for the attach routine.

10.10. xxx_isa_detach
If this function is present in the driver and the driver is compiled as a loadable module then the
driver gets the ability to be unloaded. This is an important feature if the hardware supports hot
plug. But the ISA bus does not support hot plug, so this feature is not particularly important for the
ISA devices. The ability to unload a driver may be useful when debugging it, but in many cases
installation of the new version of the driver would be required only after the old version somehow
wedges the system and a reboot will be needed anyway, so the efforts spent on writing the detach
routine may not be worth it. Another argument that unloading would allow upgrading the drivers
on a production machine seems to be mostly theoretical. Installing a new version of a driver is a
dangerous operation which should never be performed on a production machine (and which is not
permitted when the system is running in secure mode). Still, the detach routine may be provided
for the sake of completeness.
The detach routine returns 0 if the driver was successfully detached or the error code otherwise.
The logic of detach is a mirror of the attach. The first thing to do is to detach the driver from its
kernel subsystem. If the device is currently open then the driver has two choices: refuse to be
detached or forcibly close and proceed with detach. The choice used depends on the ability of the
particular kernel subsystem to do a forced close and on the preferences of the driver’s author.
Generally the forced close seems to be the preferred alternative.

struct xxx_softc *sc = device_get_softc(dev);
error = xxx_detach_subsystem(sc);
Next the driver may want to reset the hardware to some consistent state. That includes stopping
any ongoing transfers, disabling the DMA channels and interrupts to avoid memory corruption by
the device. For most of the drivers this is exactly what the shutdown routine does, so if it is included
in the driver we can just call it.
xxx_isa_shutdown(dev);
And finally release all the resources and return success.

10.11. xxx_isa_shutdown
This routine is called when the system is about to be shut down. It is expected to bring the
hardware to some consistent state. For most of the ISA devices no special action is required, so the
function is not really necessary because the device will be re-initialized on reboot anyway. But
some devices have to be shut down with a special procedure, to make sure that they will be
properly detected after soft reboot (this is especially true for many devices with proprietary
identification protocols). In any case disabling DMA and interrupts in the device registers and
stopping any ongoing transfers is a good idea. The exact action depends on the hardware, so we do
not consider it here in any detail.

10.12. xxx_intr
The interrupt handler is called when an interrupt is received which may be from this particular
device. The ISA bus does not support interrupt sharing (except in some special cases) so in practice
if the interrupt handler is called then the interrupt almost for sure came from its device. Still, the
interrupt handler must poll the device registers and make sure that the interrupt was generated by
its device. If not it should just return.
The old convention for the ISA drivers was getting the device unit number as an argument. This is
obsolete, and the new drivers receive whatever argument was specified for them in the attach
routine when calling bus_setup_intr(). By the new convention it should be the pointer to the
structure softc. So the interrupt handler commonly starts as:

xxx_intr(struct xxx_softc *sc)
It runs at the interrupt priority level specified by the interrupt type parameter of bus_setup_intr().
That means that all the other interrupts of the same type as well as all the software interrupts are
disabled.
To avoid races it is commonly written as a loop:

while(xxx_interrupt_pending(sc)) {
xxx_process_interrupt(sc);
xxx_acknowledge_interrupt(sc);
The interrupt handler has to acknowledge interrupt to the device only but not to the interrupt
controller, the system takes care of the latter.
