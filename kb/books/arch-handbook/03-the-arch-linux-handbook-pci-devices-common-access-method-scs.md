---
id: arch-handbook-03
title: "The Arch Linux Handbook — PCI Devices, Common Access Method SCSI, USB Devices, Newbus…"
slug: arch-handbook-03-the-arch-linux-handbook-pci-devices-common-access-method-scs
source: "The Arch Linux Handbook"
sourceSection: "Chapter 11. PCI Devices, Chapter 12. Common Access Method SCSI, Chapter 13. USB Devices, Chapter 14. Newbus, Chapter 15. Sound Subsystem, Chapter 16. PC Card"
track: linux-engineer
tier: free
tags: [linux, arch, packaging, sysadmin]
summary: "This chapter will talk about the FreeBSD mechanisms for writing a device driver for a device on a Covers 6 sections: PCI Devices, Common Access Method SCSI, USB Devices."
---
# The Arch Linux Handbook — PCI Devices, Common Access Method SCSI, USB Devices, Newbus…

## Chapter 11. PCI Devices
This chapter will talk about the FreeBSD mechanisms for writing a device driver for a device on a
PCI bus.

### 11.1 Probe and Attach
Information here about how the PCI bus code iterates through the unattached devices and see if a
newly loaded kld will attach to any of them.

#### 11.1.1 Sample Driver Source (mypci.c)
- Simple KLD to play with the PCI functions.
- Murray Stokely
#include <sys/param.h>
#include <sys/systm.h>
#include <sys/errno.h>
#include <sys/kernel.h>
#include <sys/conf.h>
#include <sys/uio.h>
#include <sys/malloc.h>
#include <sys/bus.h>
macros! */

/* defines used in kernel.h */

/* types used in module initialization */
/* cdevsw struct */
/* uio struct */
/* structs, prototypes for pci bus stuff and DEVMETHOD

#include <machine/bus.h>
#include <sys/rman.h>
#include <machine/resource.h>
#include <dev/pci/pcivar.h>
#include <dev/pci/pcireg.h>

/* For pci_get macros! */

/* The softc holds our per-instance data. */
struct mypci_softc {
device_t
my_dev;
struct cdev *my_cdev;
/* Function prototypes */
static d_open_t
mypci_open;
static d_close_t
mypci_close;
static d_read_t
mypci_read;
static d_write_t
mypci_write;
/* Character device entry points */

static struct cdevsw mypci_cdevsw = {
.d_version =
D_VERSION,
.d_open =
mypci_open,
.d_close = mypci_close,
.d_read =
mypci_read,
.d_write = mypci_write,
.d_name =
"mypci",
- In the cdevsw routines, we find our softc by using the si_drv1 member
- of struct cdev. We set this variable to point to our softc in our
- attach routine when we create the /dev entry.
mypci_open(struct cdev *dev, int oflags, int devtype, struct thread *td)
device_printf(sc->my_dev, "Opened successfully.\n");
mypci_close(struct cdev *dev, int fflag, int devtype, struct thread *td)
device_printf(sc->my_dev, "Closed.\n");
mypci_read(struct cdev *dev, struct uio *uio, int ioflag)
device_printf(sc->my_dev, "Asked to read %zd bytes.\n", uio->uio_resid);
mypci_write(struct cdev *dev, struct uio *uio, int ioflag)

device_printf(sc->my_dev, "Asked to write %zd bytes.\n", uio->uio_resid);
/* PCI Support Functions */
- Compare the device ID of this device against the IDs that this driver
- supports. If there is a match, set the description and return success.
mypci_probe(device_t dev)
device_printf(dev, "MyPCI Probe\nVendor ID : 0x%x\nDevice ID : 0x%x\n",
pci_get_vendor(dev), pci_get_device(dev));
if (pci_get_vendor(dev) == 0x11c1) {
printf("We've got the Winmodem, probe successful!\n");
device_set_desc(dev, "WinModem");
return (BUS_PROBE_DEFAULT);
return (ENXIO);
/* Attach function is only called if the probe is successful. */
mypci_attach(device_t dev)
printf("MyPCI Attach for : deviceID : 0x%x\n", pci_get_devid(dev));
/* Look up our softc and initialize its fields. */
sc = device_get_softc(dev);
sc->my_dev = dev;
- Create a /dev entry for this device. The kernel will assign us
- a major number automatically. We use the unit number of this
- device as the minor number and name the character device
- "mypci<unit>".
sc->my_cdev = make_dev(&mypci_cdevsw, device_get_unit(dev),
UID_ROOT, GID_WHEEL, 0600, "mypci%u", device_get_unit(dev));

sc->my_cdev->si_drv1 = sc;
printf("Mypci device loaded.\n");
/* Detach device. */
mypci_detach(device_t dev)
/* Teardown the state in our softc created in our attach routine. */
sc = device_get_softc(dev);
destroy_dev(sc->my_cdev);
printf("Mypci detach!\n");
/* Called during system shutdown after sync. */
mypci_shutdown(device_t dev)
printf("Mypci shutdown!\n");
- Device suspend routine.
mypci_suspend(device_t dev)
printf("Mypci suspend!\n");
- Device resume routine.
mypci_resume(device_t dev)
printf("Mypci resume!\n");

static device_method_t mypci_methods[] = {
/* Device interface */
DEVMETHOD(device_probe,
mypci_probe),
DEVMETHOD(device_attach,
mypci_attach),
DEVMETHOD(device_detach,
mypci_detach),
DEVMETHOD(device_shutdown, mypci_shutdown),
DEVMETHOD(device_suspend,
mypci_suspend),
DEVMETHOD(device_resume,
mypci_resume),
DEVMETHOD_END
static devclass_t mypci_devclass;
DEFINE_CLASS_0(mypci, mypci_driver, mypci_methods, sizeof(struct mypci_softc));
DRIVER_MODULE(mypci, pci, mypci_driver, mypci_devclass, 0, 0);

#### 11.1.2 Makefile for Sample Driver
KMOD=
SRCS=
SRCS+=

mypci
mypci.c
device_if.h bus_if.h pci_if.h

.include <bsd.kmod.mk>
If you place the above source file and Makefile into a directory, you may run make to compile the
sample driver. Additionally, you may run make load to load the driver into the currently running
kernel and make unload to unload the driver after it is loaded.

#### 11.1.3 Additional Resources
- PCI Special Interest Group
- PCI System Architecture, Fourth Edition by Tom Shanley, et al.

### 11.2 Bus Resources
FreeBSD provides an object-oriented mechanism for requesting resources from a parent bus.
Almost all devices will be a child member of some sort of bus (PCI, ISA, USB, SCSI, etc) and these
devices need to acquire resources from their parent bus (such as memory segments, interrupt lines,
or DMA channels).

#### 11.2.1 Base Address Registers
To do anything particularly useful with a PCI device you will need to obtain the Base Address
Registers (BARs) from the PCI Configuration space. The PCI-specific details of obtaining the BAR are

abstracted in the bus_alloc_resource() function.
For example, a typical driver might have something similar to this in the attach() function:

sc->bar0id = PCIR_BAR(0);
sc->bar0res = bus_alloc_resource(dev, SYS_RES_MEMORY, &sc->bar0id,
0, ~0, 1, RF_ACTIVE);
if (sc->bar0res == NULL) {
printf("Memory allocation of PCI base register 0 failed!\n");
error = ENXIO;
goto fail1;
sc->bar1id = PCIR_BAR(1);
sc->bar1res = bus_alloc_resource(dev, SYS_RES_MEMORY, &sc->bar1id,
0, ~0, 1, RF_ACTIVE);
if (sc->bar1res == NULL) {
printf("Memory allocation of PCI base register 1 failed!\n");
error = ENXIO;
goto fail2;
sc->bar0_bt = rman_get_bustag(sc->bar0res);
sc->bar0_bh = rman_get_bushandle(sc->bar0res);
sc->bar1_bt = rman_get_bustag(sc->bar1res);
sc->bar1_bh = rman_get_bushandle(sc->bar1res);
Handles for each base address register are kept in the softc structure so that they can be used to
write to the device later.
These handles can then be used to read or write from the device registers with the bus_space_*
functions. For example, a driver might contain a shorthand function to read from a board specific
register like this:

uint16_t
board_read(struct ni_softc *sc, uint16_t address)
return bus_space_read_2(sc->bar1_bt, sc->bar1_bh, address);
Similarly, one could write to the registers with:

board_write(struct ni_softc *sc, uint16_t address, uint16_t value)
bus_space_write_2(sc->bar1_bt, sc->bar1_bh, address, value);

These

functions

exist

in

8bit,

16bit,

32bit

versions

you

should

use

bus_space_{read|write}_{1|2|4} accordingly.
In FreeBSD 7.0 and later, you can use the bus_* functions instead of bus_space_*.
The bus_* functions take a struct resource * pointer instead of a bus tag and
handle. Thus, you could drop the bus tag and bus handle members from the softc
and rewrite the board_read() function as:

uint16_t
board_read(struct ni_softc *sc, uint16_t address)
return (bus_read(sc->bar1res, address));

#### 11.2.2 Interrupts
Interrupts are allocated from the object-oriented bus code in a way similar to the memory
resources. First an IRQ resource must be allocated from the parent bus, and then the interrupt
handler must be set up to deal with this IRQ.
Again, a sample from a device attach() function says more than words.

/* Get the IRQ resource */
sc->irqid = 0x0;
sc->irqres = bus_alloc_resource(dev, SYS_RES_IRQ, &(sc->irqid),
0, ~0, 1, RF_SHAREABLE | RF_ACTIVE);
if (sc->irqres == NULL) {
printf("IRQ allocation failed!\n");
error = ENXIO;
goto fail3;
/* Now we should set up the interrupt handler */
error = bus_setup_intr(dev, sc->irqres, INTR_TYPE_MISC,
my_handler, sc, &(sc->handler));
if (error) {
printf("Couldn't set up irq\n");
goto fail4;
Some care must be taken in the detach routine of the driver. You must quiesce the device’s
interrupt stream, and remove the interrupt handler. Once bus_teardown_intr() has returned, you
know that your interrupt handler will no longer be called and that all threads that might have been
executing this interrupt handler have returned. Since this function can sleep, you must not hold
any mutexes when calling this function.

11.2.3. DMA
This section is obsolete, and present only for historical reasons. The proper methods for dealing
with these issues is to use the bus_space_dma*() functions instead. This paragraph can be removed
when this section is updated to reflect that usage. However, at the moment, the API is in a bit of
flux, so once that settles down, it would be good to update this section to reflect that.
On the PC, peripherals that want to do bus-mastering DMA must deal with physical addresses. This
is a problem since FreeBSD uses virtual memory and deals almost exclusively with virtual
addresses. Fortunately, there is a function, vtophys() to help.

#include <vm/vm.h>
#include <vm/pmap.h>
#define vtophys(virtual_address) (...)
The solution is a bit different on the alpha however, and what we really want is a function called
vtobus().

#if defined(__alpha__)
#define vtobus(va)
#else
#define vtobus(va)

alpha_XXX_dmamap((vm_offset_t)va)
vtophys(va)

#### 11.2.4 Deallocating Resources
It is very important to deallocate all of the resources that were allocated during attach(). Care must
be taken to deallocate the correct stuff even on a failure condition so that the system will remain
usable while your driver dies.

## Chapter 12. Common Access Method SCSI
Controllers
12.1. Synopsis
This document assumes that the reader has a general understanding of device drivers in FreeBSD
and of the SCSI protocol. Much of the information in this document was extracted from the drivers:
- ncr (/sys/pci/ncr.c) by Wolfgang Stanglmeier and Stefan Esser
- sym (/sys/dev/sym/sym_hipd.c) by Gerard Roudier
- aic7xxx (/sys/dev/aic7xxx/aic7xxx.c) by Justin T. Gibbs
and from the CAM code itself (by Justin T. Gibbs, see /sys/cam/*). When some solution looked the
most logical and was essentially verbatim extracted from the code by Justin T. Gibbs, I marked it as
"recommended".
The document is illustrated with examples in pseudo-code. Although sometimes the examples have
many details and look like real code, it is still pseudo-code. It was written to demonstrate the
concepts in an understandable way. For a real driver other approaches may be more modular and
efficient. It also abstracts from the hardware details, as well as issues that would cloud the
demonstrated concepts or that are supposed to be described in the other chapters of the developers
handbook. Such details are commonly shown as calls to functions with descriptive names,
comments or pseudo-statements. Fortunately real life full-size examples with all the details can be
found in the real drivers.

### 12.2 General Architecture
CAM stands for Common Access Method. It is a generic way to address the I/O buses in a SCSI-like
way. This allows a separation of the generic device drivers from the drivers controlling the I/O bus:
for example the disk driver becomes able to control disks on both SCSI, IDE, and/or any other bus so
the disk driver portion does not have to be rewritten (or copied and modified) for every new I/O
bus. Thus the two most important active entities are:
- Peripheral Modules - a driver for peripheral devices (disk, tape, CD-ROM, etc.)
- SCSI Interface Modules (SIM) - a Host Bus Adapter drivers for connecting to an I/O bus such as
SCSI or IDE.
A peripheral driver receives requests from the OS, converts them to a sequence of SCSI commands
and passes these SCSI commands to a SCSI Interface Module. The SCSI Interface Module is
responsible for passing these commands to the actual hardware (or if the actual hardware is not
SCSI but, for example, IDE then also converting the SCSI commands to the native commands of the
hardware).
As we are interested in writing a SCSI adapter driver here, from this point on we will consider
everything from the SIM standpoint.

### 12.3 Globals and Boilerplate
A typical SIM driver needs to include the following CAM-related header files:

#include <cam/cam.h>
#include <cam/cam_ccb.h>
#include <cam/cam_sim.h>
#include <cam/cam_xpt_sim.h>
#include <cam/cam_debug.h>
#include <cam/scsi/scsi_all.h>

### 12.4 Device configuration: xxx_attach
The first thing each SIM driver must do is register itself with the CAM subsystem. This is done
during the driver’s xxx_attach() function (here and further xxx_ is used to denote the unique driver
name prefix). The xxx_attach() function itself is called by the system bus auto-configuration code
which we do not describe here.
This is achieved in multiple steps: first it is necessary to allocate the queue of requests associated
with this SIM:

struct cam_devq *devq;
if ((devq = cam_simq_alloc(SIZE)) == NULL) {
Here SIZE is the size of the queue to be allocated, maximal number of requests it could contain. It is
the number of requests that the SIM driver can handle in parallel on one SCSI card. Commonly it
can be calculated as:

SIZE = NUMBER_OF_SUPPORTED_TARGETS * MAX_SIMULTANEOUS_COMMANDS_PER_TARGET
Next we create a descriptor of our SIM:

struct cam_sim *sim;
if ((sim = cam_sim_alloc(action_func, poll_func, driver_name,
softc, unit, mtx, max_dev_transactions,
max_tagged_dev_transactions, devq)) == NULL) {
cam_simq_free(devq);
Note that if we are not able to create a SIM descriptor we free the devq also because we can do

nothing else with it and we want to conserve memory.
If a SCSI card has multiple SCSI buses on it then each bus requires its own cam_sim structure.
An interesting question is what to do if a SCSI card has more than one SCSI bus, do we need one
devq structure per card or per SCSI bus? The answer given in the comments to the CAM code is:
either way, as the driver’s author prefers.
The arguments are:
- action_func - pointer to the driver’s xxx_action function.

static void xxx_action(struct cam_sim *, union ccb *);
- poll_func - pointer to the driver’s xxx_poll()

static void xxx_poll(struct cam_sim *);
- driver_name - the name of the actual driver, such as "ncr" or "wds".
- softc - pointer to the driver’s internal descriptor for this SCSI card. This pointer will be used by
the driver in future to get private data.
- unit - the controller unit number, for example for controller "mps0" this number will be 0
- mtx - Lock associated with this SIM. For SIMs that don’t know about locking, pass in Giant. For
SIMs that do, pass in the lock used to guard this SIM’s data structures. This lock will be held
when xxx_action and xxx_poll are called.
- max_dev_transactions - maximal number of simultaneous transactions per SCSI target in the
non-tagged mode. This value will be almost universally equal to 1, with possible exceptions only
for the non-SCSI cards. Also the drivers that hope to take advantage by preparing one
transaction while another one is executed may set it to 2 but this does not seem to be worth the
complexity.
- max_tagged_dev_transactions - the same thing, but in the tagged mode. Tags are the SCSI way to
initiate multiple transactions on a device: each transaction is assigned a unique tag and the
transaction is sent to the device. When the device completes some transaction it sends back the
result together with the tag so that the SCSI adapter (and the driver) can tell which transaction
was completed. This argument is also known as the maximal tag depth. It depends on the
abilities of the SCSI adapter.
Finally we register the SCSI buses associated with our SCSI adapter:

if (xpt_bus_register(sim, softc, bus_number) != CAM_SUCCESS) {
cam_sim_free(sim, /*free_devq*/ TRUE);
If there is one devq structure per SCSI bus (i.e., we consider a card with multiple buses as multiple

cards with one bus each) then the bus number will always be 0, otherwise each bus on the SCSI
card should be get a distinct number. Each bus needs its own separate structure cam_sim.
After that our controller is completely hooked to the CAM system. The value of devq can be
discarded now: sim will be passed as an argument in all further calls from CAM and devq can be
derived from it.
CAM provides the framework for such asynchronous events. Some events originate from the lower
levels (the SIM drivers), some events originate from the peripheral drivers, some events originate
from the CAM subsystem itself. Any driver can register callbacks for some types of the
asynchronous events, so that it would be notified if these events occur.
A typical example of such an event is a device reset. Each transaction and event identifies the
devices to which it applies by the means of "path". The target-specific events normally occur during
a transaction with this device. So the path from that transaction may be re-used to report this event
(this is safe because the event path is copied in the event reporting routine but not deallocated nor
passed anywhere further). Also it is safe to allocate paths dynamically at any time including the
interrupt routines, although that incurs certain overhead, and a possible problem with this
approach is that there may be no free memory at that time. For a bus reset event we need to define
a wildcard path including all devices on the bus. So we can create the path for the future bus reset
events in advance and avoid problems with the future memory shortage:

struct cam_path *path;
if (xpt_create_path(&path, /*periph*/NULL,
cam_sim_path(sim), CAM_TARGET_WILDCARD,
CAM_LUN_WILDCARD) != CAM_REQ_CMP) {
xpt_bus_deregister(cam_sim_path(sim));
cam_sim_free(sim, /*free_devq*/TRUE);
softc->wpath = path;
softc->sim = sim;
As you can see the path includes:
- ID of the peripheral driver (NULL here because we have none)
- ID of the SIM driver (cam_sim_path(sim))
- SCSI target number of the device (CAM_TARGET_WILDCARD means "all devices")
- SCSI LUN number of the subdevice (CAM_LUN_WILDCARD means "all LUNs")
If the driver can not allocate this path it will not be able to work normally, so in that case we
dismantle that SCSI bus.
And we save the path pointer in the softc structure for future use. After that we save the value of
sim (or we can also discard it on the exit from xxx_probe() if we wish).

That is all for a minimalistic initialization. To do things right there is one more issue left.
For a SIM driver there is one particularly interesting event: when a target device is considered lost.
In this case resetting the SCSI negotiations with this device may be a good idea. So we register a
callback for this event with CAM. The request is passed to CAM by requesting CAM action on a CAM
control block for this type of request:

struct ccb_setasync csa;
xpt_setup_ccb(&csa.ccb_h, path, /*priority*/5);
csa.ccb_h.func_code = XPT_SASYNC_CB;
csa.event_enable = AC_LOST_DEVICE;
csa.callback = xxx_async;
csa.callback_arg = sim;
xpt_action((union ccb *)&csa);

### 12.5 Processing CAM messages: xxx_action
static void xxx_action(struct cam_sim *sim, union ccb *ccb);
Do some action on request of the CAM subsystem. Sim describes the SIM for the request, CCB is the
request itself. CCB stands for "CAM Control Block". It is a union of many specific instances, each
describing arguments for some type of transactions. All of these instances share the CCB header
where the common part of arguments is stored.
CAM supports the SCSI controllers working in both initiator ("normal") mode and target (simulating
a SCSI device) mode. Here we only consider the part relevant to the initiator mode.
There are a few function and macros (in other words, methods) defined to access the public data in
the struct sim:
- cam_sim_path(sim) - the path ID (see above)
- cam_sim_name(sim) - the name of the sim
- cam_sim_softc(sim) - the pointer to the softc (driver private data) structure
- cam_sim_unit(sim) - the unit number
- cam_sim_bus(sim) - the bus ID
To identify the device, xxx_action() can get the unit number and pointer to its structure softc using
these functions.
The type of request is stored in ccb→ccb_h.func_code. So generally xxx_action() consists of a big
switch:

struct xxx_softc *softc = (struct xxx_softc *) cam_sim_softc(sim);
struct ccb_hdr *ccb_h = &ccb->ccb_h;

int unit = cam_sim_unit(sim);
int bus = cam_sim_bus(sim);
switch (ccb_h->func_code) {
case ...:
ccb_h->status = CAM_REQ_INVALID;
As can be seen from the default case (if an unknown command was received) the return code of the
command is set into ccb→ccb_h.status and the completed CCB is returned back to CAM by calling
xpt_done(ccb).
xpt_done() does not have to be called from xxx_action(): For example an I/O request may be
enqueued inside the SIM driver and/or its SCSI controller. Then when the device would post an
interrupt signaling that the processing of this request is complete xpt_done() may be called from the
interrupt handling routine.
Actually, the CCB status is not only assigned as a return code but a CCB has some status all the time.
Before CCB is passed to the xxx_action() routine it gets the status CCB_REQ_INPROG meaning that it
is in progress. There are a surprising number of status values defined in /sys/cam/cam.h which
should be able to represent the status of a request in great detail. More interesting yet, the status is
in fact a "bitwise or" of an enumerated status value (the lower 6 bits) and possible additional flaglike bits (the upper bits). The enumerated values will be discussed later in more detail. The
summary of them can be found in the Errors Summary section. The possible status flags are:
- CAM_DEV_QFRZN - if the SIM driver gets a serious error (for example, the device does not
respond to the selection or breaks the SCSI protocol) when processing a CCB it should freeze the
request queue by calling xpt_freeze_simq(), return the other enqueued but not processed yet
CCBs for this device back to the CAM queue, then set this flag for the troublesome CCB and call
xpt_done(). This flag causes the CAM subsystem to unfreeze the queue after it handles the error.
- CAM_AUTOSNS_VALID

-

if

device

returned

an

error

condition

CAM_DIS_AUTOSENSE is not set in CCB the SIM driver must execute the REQUEST SENSE
command automatically to extract the sense (extended error information) data from the device.
If this attempt was successful the sense data should be saved in the CCB and this flag set.
- CAM_RELEASE_SIMQ - like CAM_DEV_QFRZN but used in case there is some problem (or
resource shortage) with the SCSI controller itself. Then all the future requests to the controller
should be stopped by xpt_freeze_simq(). The controller queue will be restarted after the SIM
driver overcomes the shortage and informs CAM by returning some CCB with this flag set.
- CAM_SIM_QUEUED - when SIM puts a CCB into its request queue this flag should be set (and
removed when this CCB gets dequeued before being returned back to CAM). This flag is not used
anywhere in the CAM code now, so its purpose is purely diagnostic.
- CAM_QOS_VALID - The QOS data is now valid.

The function xxx_action() is not allowed to sleep, so all the synchronization for resource access
must be done using SIM or device queue freezing. Besides the aforementioned flags the CAM
subsystem provides functions xpt_release_simq() and xpt_release_devq() to unfreeze the queues
directly, without passing a CCB to CAM.
The CCB header contains the following fields:
- path - path ID for the request
- target_id - target device ID for the request
- target_lun - LUN ID of the target device
- timeout - timeout interval for this command, in milliseconds
- timeout_ch - a convenience place for the SIM driver to store the timeout handle (the CAM
subsystem itself does not make any assumptions about it)
- flags - various bits of information about the request spriv_ptr0, spriv_ptr1 - fields reserved for
private use by the SIM driver (such as linking to the SIM queues or SIM private control blocks);
actually, they exist as unions: spriv_ptr0 and spriv_ptr1 have the type (void *), spriv_field0 and
spriv_field1 have the type unsigned long, sim_priv.entries[0].bytes and sim_priv.entries[1].bytes
are byte arrays of the size consistent with the other incarnations of the union and
sim_priv.bytes is one array, twice bigger.
The recommended way of using the SIM private fields of CCB is to define some meaningful names
for them and use these meaningful names in the driver, like:

#define ccb_some_meaningful_name
sim_priv.entries[0].bytes
#define ccb_hcb spriv_ptr1 /* for hardware control block */
The most common initiator mode requests are:

#### 12.5.1 XPT_SCSI_IO - execute an I/O transaction
The instance "struct ccb_scsiio csio" of the union ccb is used to transfer the arguments. They are:
- cdb_io - pointer to the SCSI command buffer or the buffer itself
- cdb_len - SCSI command length
- data_ptr - pointer to the data buffer (gets a bit complicated if scatter/gather is used)
- dxfer_len - length of the data to transfer
- sglist_cnt - counter of the scatter/gather segments
- scsi_status - place to return the SCSI status
- sense_data - buffer for the SCSI sense information if the command returns an error (the SIM
driver is supposed to run the REQUEST SENSE command automatically in this case if the CCB
flag CAM_DIS_AUTOSENSE is not set)
- sense_len - the length of that buffer (if it happens to be higher than size of sense_data the SIM
driver must silently assume the smaller value)

- resid, sense_resid - if the transfer of data or SCSI sense returned an error these are the returned
counters of the residual (not transferred) data. They do not seem to be especially meaningful, so
in a case when they are difficult to compute (say, counting bytes in the SCSI controller’s FIFO
buffer) an approximate value will do as well. For a successfully completed transfer they must be
set to zero.
- tag_action - the kind of tag to use:
- CAM_TAG_ACTION_NONE - do not use tags for this transaction
- MSG_SIMPLE_Q_TAG, MSG_HEAD_OF_Q_TAG, MSG_ORDERED_Q_TAG - value equal to the
appropriate tag message (see /sys/cam/scsi/scsi_message.h); this gives only the tag type, the
SIM driver must assign the tag value itself
The general logic of handling this request is the following:
The first thing to do is to check for possible races, to make sure that the command did not get
aborted when it was sitting in the queue:

struct ccb_scsiio *csio = &ccb->csio;
if ((ccb_h->status & CAM_STATUS_MASK) != CAM_REQ_INPROG) {
Also we check that the device is supported at all by our controller:

if (ccb_h->target_id > OUR_MAX_SUPPORTED_TARGET_ID
|| cch_h->target_id == OUR_SCSI_CONTROLLERS_OWN_ID) {
ccb_h->status = CAM_TID_INVALID;
if (ccb_h->target_lun > OUR_MAX_SUPPORTED_LUN) {
ccb_h->status = CAM_LUN_INVALID;
Then allocate whatever data structures (such as card-dependent hardware control block) we need
to process this request. If we can not then freeze the SIM queue and remember that we have a
pending operation, return the CCB back and ask CAM to re-queue it. Later when the resources
become available the SIM queue must be unfrozen by returning a ccb with the CAM_SIMQ_RELEASE bit
set in its status. Otherwise, if all went well, link the CCB with the hardware control block (HCB) and
mark it as queued.

struct xxx_hcb *hcb = allocate_hcb(softc, unit, bus);

if (hcb == NULL) {
softc->flags |= RESOURCE_SHORTAGE;
xpt_freeze_simq(sim, /*count*/1);
ccb_h->status = CAM_REQUEUE_REQ;
hcb->ccb = ccb; ccb_h->ccb_hcb = (void *)hcb;
ccb_h->status |= CAM_SIM_QUEUED;
Extract the target data from CCB into the hardware control block. Check if we are asked to assign a
tag and if yes then generate an unique tag and build the SCSI tag messages. The SIM driver is also
responsible for negotiations with the devices to set the maximal mutually supported bus width,
synchronous rate and offset.

hcb->target = ccb_h->target_id; hcb->lun = ccb_h->target_lun;
generate_identify_message(hcb);
if (ccb_h->tag_action != CAM_TAG_ACTION_NONE)
generate_unique_tag_message(hcb, ccb_h->tag_action);
if (!target_negotiated(hcb))
generate_negotiation_messages(hcb);
Then set up the SCSI command. The command storage may be specified in the CCB in many
interesting ways, specified by the CCB flags. The command buffer can be contained in CCB or
pointed to, in the latter case the pointer may be physical or virtual. Since the hardware commonly
needs physical address we always convert the address to the physical one, typically using the
busdma API.
In case if a physical address is requested it is OK to return the CCB with the status CAM_REQ_INVALID,
the current drivers do that. If necessary a physical address can be also converted or mapped back
to a virtual address but with big pain, so we do not do that.

if (ccb_h->flags & CAM_CDB_POINTER) {
/* CDB is a pointer */
if (!(ccb_h->flags & CAM_CDB_PHYS)) {
/* CDB pointer is virtual */
hcb->cmd = vtobus(csio->cdb_io.cdb_ptr);
/* CDB pointer is physical */
hcb->cmd = csio->cdb_io.cdb_ptr ;
/* CDB is in the ccb (buffer) */
hcb->cmd = vtobus(csio->cdb_io.cdb_bytes);
hcb->cmdlen = csio->cdb_len;

Now it is time to set up the data. Again, the data storage may be specified in the CCB in many
interesting ways, specified by the CCB flags. First we get the direction of the data transfer. The
simplest case is if there is no data to transfer:

int dir = (ccb_h->flags & CAM_DIR_MASK);
if (dir == CAM_DIR_NONE)
goto end_data;
Then we check if the data is in one chunk or in a scatter-gather list, and the addresses are physical
or virtual. The SCSI controller may be able to handle only a limited number of chunks of limited
length. If the request hits this limitation we return an error. We use a special function to return the
CCB to handle in one place the HCB resource shortages. The functions to add chunks are driverdependent, and here we leave them without detailed implementation. See description of the SCSI
command (CDB) handling for the details on the address-translation issues. If some variation is too
difficult or impossible to implement with a particular card it is OK to return the status
CAM_REQ_INVALID. Actually, it seems like the scatter-gather ability is not used anywhere in the CAM
code now. But at least the case for a single non-scattered virtual buffer must be implemented, it is
actively used by CAM.

int rv;
initialize_hcb_for_data(hcb);
if ((!(ccb_h->flags & CAM_SCATTER_VALID)) {
/* single buffer */
if (!(ccb_h->flags & CAM_DATA_PHYS)) {
rv = add_virtual_chunk(hcb, csio->data_ptr, csio->dxfer_len, dir);
rv = add_physical_chunk(hcb, csio->data_ptr, csio->dxfer_len, dir);
int i;
struct bus_dma_segment *segs;
segs = (struct bus_dma_segment *)csio->data_ptr;
if ((ccb_h->flags & CAM_SG_LIST_PHYS) != 0) {
/* The SG list pointer is physical */
rv = setup_hcb_for_physical_sg_list(hcb, segs, csio->sglist_cnt);
} else if (!(ccb_h->flags & CAM_DATA_PHYS)) {
/* SG buffer pointers are virtual */
for (i = 0; i < csio->sglist_cnt; i++) {
rv = add_virtual_chunk(hcb, segs[i].ds_addr,
segs[i].ds_len, dir);
if (rv != CAM_REQ_CMP)

/* SG buffer pointers are physical */
for (i = 0; i < csio->sglist_cnt; i++) {
rv = add_physical_chunk(hcb, segs[i].ds_addr,
segs[i].ds_len, dir);
if (rv != CAM_REQ_CMP)
if (rv != CAM_REQ_CMP) {
/* we expect that add_*_chunk() functions return CAM_REQ_CMP
- if they added a chunk successfully, CAM_REQ_TOO_BIG if
- the request is too big (too many bytes or too many chunks),
- CAM_REQ_INVALID in case of other troubles
free_hcb_and_ccb_done(hcb, ccb, rv);
end_data:
If disconnection is disabled for this CCB we pass this information to the hcb:

if (ccb_h->flags & CAM_DIS_DISCONNECT)
hcb_disable_disconnect(hcb);
If the controller is able to run REQUEST SENSE command all by itself then the value of the flag
CAM_DIS_AUTOSENSE should also be passed to it, to prevent automatic REQUEST SENSE if the CAM
subsystem does not want it.
The only thing left is to set up the timeout, pass our hcb to the hardware and return, the rest will be
done by the interrupt handler (or timeout handler).

ccb_h->timeout_ch = timeout(xxx_timeout, (caddr_t) hcb,
(ccb_h->timeout * hz) / 1000); /* convert milliseconds to ticks */
put_hcb_into_hardware_queue(hcb);
And here is a possible implementation of the function returning CCB:

free_hcb_and_ccb_done(struct xxx_hcb *hcb, union ccb *ccb, u_int32_t status)
struct xxx_softc *softc = hcb->softc;
ccb->ccb_h.ccb_hcb = 0;
if (hcb != NULL) {

untimeout(xxx_timeout, (caddr_t) hcb, ccb->ccb_h.timeout_ch);
/* we're about to free a hcb, so the shortage has ended */
if (softc->flags & RESOURCE_SHORTAGE) {
softc->flags &= ~RESOURCE_SHORTAGE;
status |= CAM_RELEASE_SIMQ;
free_hcb(hcb); /* also removes hcb from any internal lists */
ccb->ccb_h.status = status |
(ccb->ccb_h.status & ~(CAM_STATUS_MASK|CAM_SIM_QUEUED));

#### 12.5.2 XPT_RESET_DEV - send the SCSI "BUS DEVICE RESET" message to a
device
There is no data transferred in CCB except the header and the most interesting argument of it is
target_id. Depending on the controller hardware a hardware control block just like for the
XPT_SCSI_IO request may be constructed (see XPT_SCSI_IO request description) and sent to the
controller or the SCSI controller may be immediately programmed to send this RESET message to
the device or this request may be just not supported (and return the status CAM_REQ_INVALID). Also on
completion of the request all the disconnected transactions for this target must be aborted
(probably in the interrupt routine).
Also all the current negotiations for the target are lost on reset, so they might be cleaned too. Or
they clearing may be deferred, because anyway the target would request re-negotiation on the next
transaction.

#### 12.5.3 XPT_RESET_BUS - send the RESET signal to the SCSI bus
No arguments are passed in the CCB, the only interesting argument is the SCSI bus indicated by the
struct sim pointer.
A minimalistic implementation would forget the SCSI negotiations for all the devices on the bus and
return the status CAM_REQ_CMP.
The proper implementation would in addition actually reset the SCSI bus (possible also reset the
SCSI controller) and mark all the CCBs being processed, both those in the hardware queue and
those being disconnected, as done with the status CAM_SCSI_BUS_RESET. Like:

int targ, lun;
struct xxx_hcb *h, *hh;
struct ccb_trans_settings neg;
struct cam_path *path;
/* The SCSI bus reset may take a long time, in this case its completion
- should be checked by interrupt or timeout. But for simplicity
- we assume here that it is really fast.

reset_scsi_bus(softc);
/* drop all enqueued CCBs */
for (h = softc->first_queued_hcb; h != NULL; h = hh) {
hh = h->next;
/* the clean values of negotiations to report */
neg.sync_period = neg.sync_offset = 0;
neg.valid = (CCB_TRANS_BUS_WIDTH_VALID
| CCB_TRANS_SYNC_RATE_VALID | CCB_TRANS_SYNC_OFFSET_VALID);
/* drop all disconnected CCBs and clean negotiations */
for (targ=0; targ <= OUR_MAX_SUPPORTED_TARGET; targ++) {
clean_negotiations(softc, targ);
/* report the event if possible */
if (xpt_create_path(&path, /*periph*/NULL,
cam_sim_path(sim), targ,
CAM_LUN_WILDCARD) == CAM_REQ_CMP) {
xpt_async(AC_TRANSFER_NEG, path, &neg);
xpt_free_path(path);
for (lun=0; lun <= OUR_MAX_SUPPORTED_LUN; lun++)
for (h = softc->first_discon_hcb[targ][lun]; h != NULL; h = hh) {
xpt_async(AC_BUS_RESET, softc->wpath, NULL);
Implementing the SCSI bus reset as a function may be a good idea because it would be re-used by
the timeout function as a last resort if the things go wrong.

#### 12.5.4 XPT_ABORT - abort the specified CCB
The arguments are transferred in the instance "struct ccb_abort cab" of the union ccb. The only
argument field in it is:
- abort_ccb - pointer to the CCB to be aborted

If the abort is not supported just return the status CAM_UA_ABORT. This is also the easy way to
minimally implement this call, return CAM_UA_ABORT in any case.
The hard way is to implement this request honestly. First check that abort applies to a SCSI
transaction:

struct ccb *abort_ccb;
abort_ccb = ccb->cab.abort_ccb;
if (abort_ccb->ccb_h.func_code != XPT_SCSI_IO) {
ccb->ccb_h.status = CAM_UA_ABORT;
Then it is necessary to find this CCB in our queue. This can be done by walking the list of all our
hardware control blocks in search for one associated with this CCB:

struct xxx_hcb *hcb, *h;
hcb = NULL;
/* We assume that softc->first_hcb is the head of the list of all
- HCBs associated with this bus, including those enqueued for
- processing, being processed by hardware and disconnected ones.
for (h = softc->first_hcb; h != NULL; h = h->next) {
if (h->ccb == abort_ccb) {
hcb = h;
if (hcb == NULL) {
/* no such CCB in our queue */
ccb->ccb_h.status = CAM_PATH_INVALID;
hcb=found_hcb;
Now we look at the current processing status of the HCB. It may be either sitting in the queue
waiting to be sent to the SCSI bus, being transferred right now, or disconnected and waiting for the
result of the command, or actually completed by hardware but not yet marked as done by software.
To make sure that we do not get in any races with hardware we mark the HCB as being aborted, so
that if this HCB is about to be sent to the SCSI bus the SCSI controller will see this flag and skip it.

int hstatus;
/* shown as a function, in case special action is needed to make
- this flag visible to hardware
set_hcb_flags(hcb, HCB_BEING_ABORTED);
abort_again:
hstatus = get_hcb_status(hcb);
switch (hstatus) {
case HCB_SITTING_IN_QUEUE:
remove_hcb_from_hardware_queue(hcb);
/* FALLTHROUGH */
case HCB_COMPLETED:
/* this is an easy case */
free_hcb_and_ccb_done(hcb, abort_ccb, CAM_REQ_ABORTED);
If the CCB is being transferred right now we would like to signal to the SCSI controller in some
hardware-dependent way that we want to abort the current transfer. The SCSI controller would set
the SCSI ATTENTION signal and when the target responds to it send an ABORT message. We also
reset the timeout to make sure that the target is not sleeping forever. If the command would not get
aborted in some reasonable time like 10 seconds the timeout routine would go ahead and reset the
whole SCSI bus. Since the command will be aborted in some reasonable time we can just return the
abort request now as successfully completed, and mark the aborted CCB as aborted (but not mark it
as done yet).

case HCB_BEING_TRANSFERRED:
untimeout(xxx_timeout, (caddr_t) hcb, abort_ccb->ccb_h.timeout_ch);
abort_ccb->ccb_h.timeout_ch =
timeout(xxx_timeout, (caddr_t) hcb, 10 * hz);
abort_ccb->ccb_h.status = CAM_REQ_ABORTED;
/* ask the controller to abort that HCB, then generate
- an interrupt and stop
if (signal_hardware_to_abort_hcb_and_stop(hcb) < 0) {
/* oops, we missed the race with hardware, this transaction
- got off the bus before we aborted it, try again */
goto abort_again;
If the CCB is in the list of disconnected then set it up as an abort request and re-queue it at the front
of hardware queue. Reset the timeout and report the abort request to be completed.

case HCB_DISCONNECTED:
untimeout(xxx_timeout, (caddr_t) hcb, abort_ccb->ccb_h.timeout_ch);
abort_ccb->ccb_h.timeout_ch =
timeout(xxx_timeout, (caddr_t) hcb, 10 * hz);
put_abort_message_into_hcb(hcb);
put_hcb_at_the_front_of_hardware_queue(hcb);
That is all for the ABORT request, although there is one more issue. As the ABORT message cleans
all the ongoing transactions on a LUN we have to mark all the other active transactions on this LUN
as aborted. That should be done in the interrupt routine, after the transaction gets aborted.
Implementing the CCB abort as a function may be quite a good idea, this function can be re-used if
an I/O transaction times out. The only difference would be that the timed out transaction would
return the status CAM_CMD_TIMEOUT for the timed out request. Then the case XPT_ABORT would
be small, like that:

case XPT_ABORT:
struct ccb *abort_ccb;
abort_ccb = ccb->cab.abort_ccb;
if (abort_ccb->ccb_h.func_code != XPT_SCSI_IO) {
ccb->ccb_h.status = CAM_UA_ABORT;
if (xxx_abort_ccb(abort_ccb, CAM_REQ_ABORTED) < 0)
/* no such CCB in our queue */
ccb->ccb_h.status = CAM_PATH_INVALID;

#### 12.5.5 XPT_SET_TRAN_SETTINGS - explicitly set values of SCSI transfer
settings
The arguments are transferred in the instance "struct ccb_trans_setting cts" of the union ccb:
- valid - a bitmask showing which settings should be updated:
- CCB_TRANS_SYNC_RATE_VALID - synchronous transfer rate
- CCB_TRANS_SYNC_OFFSET_VALID - synchronous offset

- CCB_TRANS_BUS_WIDTH_VALID - bus width
- CCB_TRANS_DISC_VALID - set enable/disable disconnection
- CCB_TRANS_TQ_VALID - set enable/disable tagged queuing
- flags - consists of two parts, binary arguments and identification of sub-operations. The binary
arguments are:
- CCB_TRANS_DISC_ENB - enable disconnection
- CCB_TRANS_TAG_ENB - enable tagged queuing
- the sub-operations are:
- CCB_TRANS_CURRENT_SETTINGS - change the current negotiations
- CCB_TRANS_USER_SETTINGS - remember the desired user values sync_period, sync_offset self-explanatory, if sync_offset==0 then the asynchronous mode is requested bus_width - bus
width, in bits (not bytes)
Two sets of negotiated parameters are supported, the user settings and the current settings. The
user settings are not really used much in the SIM drivers, this is mostly just a piece of memory
where the upper levels can store (and later recall) its ideas about the parameters. Setting the user
parameters does not cause re-negotiation of the transfer rates. But when the SCSI controller does a
negotiation it must never set the values higher than the user parameters, so it is essentially the top
boundary.
The current settings are, as the name says, current. Changing them means that the parameters must
be re-negotiated on the next transfer. Again, these "new current settings" are not supposed to be
forced on the device, just they are used as the initial step of negotiations. Also they must be limited
by actual capabilities of the SCSI controller: for example, if the SCSI controller has 8-bit bus and the
request asks to set 16-bit wide transfers this parameter must be silently truncated to 8-bit transfers
before sending it to the device.
One caveat is that the bus width and synchronous parameters are per target while the
disconnection and tag enabling parameters are per lun.
The recommended implementation is to keep 3 sets of negotiated (bus width and synchronous
transfer) parameters:
- user - the user set, as above
- current - those actually in effect
- goal - those requested by setting of the "current" parameters
The code looks like:

struct ccb_trans_settings *cts;
int targ, lun;
int flags;
cts = &ccb->cts;
targ = ccb_h->target_id;

lun = ccb_h->target_lun;
flags = cts->flags;
if (flags & CCB_TRANS_USER_SETTINGS) {
if (flags & CCB_TRANS_SYNC_RATE_VALID)
softc->user_sync_period[targ] = cts->sync_period;
if (flags & CCB_TRANS_SYNC_OFFSET_VALID)
softc->user_sync_offset[targ] = cts->sync_offset;
if (flags & CCB_TRANS_BUS_WIDTH_VALID)
softc->user_bus_width[targ] = cts->bus_width;
if (flags & CCB_TRANS_DISC_VALID) {
softc->user_tflags[targ][lun] &= ~CCB_TRANS_DISC_ENB;
softc->user_tflags[targ][lun] |= flags & CCB_TRANS_DISC_ENB;
if (flags & CCB_TRANS_TQ_VALID) {
softc->user_tflags[targ][lun] &= ~CCB_TRANS_TQ_ENB;
softc->user_tflags[targ][lun] |= flags & CCB_TRANS_TQ_ENB;
if (flags & CCB_TRANS_CURRENT_SETTINGS) {
if (flags & CCB_TRANS_SYNC_RATE_VALID)
softc->goal_sync_period[targ] =
max(cts->sync_period, OUR_MIN_SUPPORTED_PERIOD);
if (flags & CCB_TRANS_SYNC_OFFSET_VALID)
softc->goal_sync_offset[targ] =
min(cts->sync_offset, OUR_MAX_SUPPORTED_OFFSET);
if (flags & CCB_TRANS_BUS_WIDTH_VALID)
softc->goal_bus_width[targ] = min(cts->bus_width, OUR_BUS_WIDTH);
if (flags & CCB_TRANS_DISC_VALID) {
softc->current_tflags[targ][lun] &= ~CCB_TRANS_DISC_ENB;
softc->current_tflags[targ][lun] |= flags & CCB_TRANS_DISC_ENB;
if (flags & CCB_TRANS_TQ_VALID) {
softc->current_tflags[targ][lun] &= ~CCB_TRANS_TQ_ENB;
softc->current_tflags[targ][lun] |= flags & CCB_TRANS_TQ_ENB;
Then when the next I/O request will be processed it will check if it has to re-negotiate, for example
by calling the function target_negotiated(hcb). It can be implemented like this:

target_negotiated(struct xxx_hcb *hcb)
struct softc *softc = hcb->softc;
int targ = hcb->targ;

if (softc->current_sync_period[targ] != softc->goal_sync_period[targ]
|| softc->current_sync_offset[targ] != softc->goal_sync_offset[targ]
|| softc->current_bus_width[targ] != softc->goal_bus_width[targ])
return 0; /* FALSE */
return 1; /* TRUE */
After the values are re-negotiated the resulting values must be assigned to both current and goal
parameters, so for future I/O transactions the current and goal parameters would be the same and
target_negotiated() would return TRUE. When the card is initialized (in xxx_attach()) the current
negotiation values must be initialized to narrow asynchronous mode, the goal and current values
must be initialized to the maximal values supported by controller.

#### 12.5.6 XPT_GET_TRAN_SETTINGS - get values of SCSI transfer settings
This operations is the reverse of XPT_SET_TRAN_SETTINGS. Fill up the CCB instance "struct
ccb_trans_setting cts" with data as requested by the flags CCB_TRANS_CURRENT_SETTINGS or
CCB_TRANS_USER_SETTINGS (if both are set then the existing drivers return the current settings).
Set all the bits in the valid field.

#### 12.5.7 XPT_CALC_GEOMETRY - calculate logical (BIOS) geometry of the disk
The arguments are transferred in the instance "struct ccb_calc_geometry ccg" of the union ccb:
- block_size - input, block (A.K.A sector) size in bytes
- volume_size - input, volume size in bytes
- cylinders - output, logical cylinders
- heads - output, logical heads
- secs_per_track - output, logical sectors per track
If the returned geometry differs much enough from what the SCSI controller BIOS thinks and a disk
on this SCSI controller is used as bootable the system may not be able to boot. The typical
calculation example taken from the aic7xxx driver is:

struct
ccb_calc_geometry *ccg;
u_int32_t size_mb;
u_int32_t secs_per_cylinder;
extended;
ccg = &ccb->ccg;
size_mb = ccg->volume_size
/ ((1024L * 1024L) / ccg->block_size);
extended = check_cards_EEPROM_for_extended_geometry(softc);
if (size_mb > 1024 && extended) {

ccg->heads = 255;
ccg->secs_per_track = 63;
ccg->heads = 64;
ccg->secs_per_track = 32;
secs_per_cylinder = ccg->heads * ccg->secs_per_track;
ccg->cylinders = ccg->volume_size / secs_per_cylinder;
This gives the general idea, the exact calculation depends on the quirks of the particular BIOS. If
BIOS provides no way set the "extended translation" flag in EEPROM this flag should normally be
assumed equal to 1. Other popular geometries are:

128 heads, 63 sectors - Symbios controllers
16 heads, 63 sectors - old controllers
Some system BIOSes and SCSI BIOSes fight with each other with variable success, for example a
combination of Symbios 875/895 SCSI and Phoenix BIOS can give geometry 128/63 after power up
and 255/63 after a hard reset or soft reboot.

#### 12.5.8 XPT_PATH_INQ - path inquiry, in other words get the SIM driver and
SCSI controller (also known as HBA - Host Bus Adapter) properties
The properties are returned in the instance "struct ccb_pathinq cpi" of the union ccb:
- version_num - the SIM driver version number, now all drivers use 1
- hba_inquiry - bitmask of features supported by the controller:
- PI_MDP_ABLE - supports MDP message (something from SCSI3?)
- PI_WIDE_32 - supports 32 bit wide SCSI
- PI_WIDE_16 - supports 16 bit wide SCSI
- PI_SDTR_ABLE - can negotiate synchronous transfer rate
- PI_LINKED_CDB - supports linked commands
- PI_TAG_ABLE - supports tagged commands
- PI_SOFT_RST - supports soft reset alternative (hard reset and soft reset are mutually
exclusive within a SCSI bus)
- target_sprt - flags for target mode support, 0 if unsupported
- hba_misc - miscellaneous controller features:
- PIM_SCANHILO - bus scans from high ID to low ID
- PIM_NOREMOVE - removable devices not included in scan

- PIM_NOINITIATOR - initiator role not supported
- PIM_NOBUSRESET - user has disabled initial BUS RESET
- hba_eng_cnt - mysterious HBA engine count, something related to compression, now is always
set to 0
- vuhba_flags - vendor-unique flags, unused now
- max_target - maximal supported target ID (7 for 8-bit bus, 15 for 16-bit bus, 127 for Fibre
Channel)
- max_lun - maximal supported LUN ID (7 for older SCSI controllers, 63 for newer ones)
- async_flags - bitmask of installed Async handler, unused now
- hpath_id - highest Path ID in the subsystem, unused now
- unit_number - the controller unit number, cam_sim_unit(sim)
- bus_id - the bus number, cam_sim_bus(sim)
- initiator_id - the SCSI ID of the controller itself
- base_transfer_speed - nominal transfer speed in KB/s for asynchronous narrow transfers,
equals to 3300 for SCSI
- sim_vid - SIM driver’s vendor id, a zero-terminated string of maximal length SIM_IDLEN
including the terminating zero
- hba_vid - SCSI controller’s vendor id, a zero-terminated string of maximal length HBA_IDLEN
including the terminating zero
- dev_name - device driver name, a zero-terminated string of maximal length DEV_IDLEN
including the terminating zero, equal to cam_sim_name(sim)
The recommended way of setting the string fields is using strncpy, like:

strncpy(cpi->dev_name, cam_sim_name(sim), DEV_IDLEN);
After setting the values set the status to CAM_REQ_CMP and mark the CCB as done.

### 12.6 Polling xxx_poll
static void xxx_poll(struct cam_sim *);
The poll function is used to simulate the interrupts when the interrupt subsystem is not functioning
(for example, when the system has crashed and is creating the system dump). The CAM subsystem
sets the proper interrupt level before calling the poll routine. So all it needs to do is to call the
interrupt routine (or the other way around, the poll routine may be doing the real action and the
interrupt routine would just call the poll routine). Why bother about a separate function then? This
has to do with different calling conventions. The xxx_poll routine gets the struct cam_sim pointer as
its argument while the PCI interrupt routine by common convention gets pointer to the struct
xxx_softc and the ISA interrupt routine gets just the device unit number. So the poll routine would

normally look as:

xxx_poll(struct cam_sim *sim)
xxx_intr((struct xxx_softc *)cam_sim_softc(sim)); /* for PCI device */
or

xxx_poll(struct cam_sim *sim)
xxx_intr(cam_sim_unit(sim)); /* for ISA device */

### 12.7 Asynchronous Events
If an asynchronous event callback has been set up then the callback function should be defined.

ahc_async(void *callback_arg, u_int32_t code, struct cam_path *path, void *arg)
- callback_arg - the value supplied when registering the callback
- code - identifies the type of event
- path - identifies the devices to which the event applies
- arg - event-specific argument
Implementation for a single type of event, AC_LOST_DEVICE, looks like:

struct xxx_softc *softc;
struct cam_sim *sim;
int targ;
struct ccb_trans_settings neg;
sim = (struct cam_sim *)callback_arg;
softc = (struct xxx_softc *)cam_sim_softc(sim);
switch (code) {
case AC_LOST_DEVICE:
targ = xpt_path_target_id(path);
if (targ <= OUR_MAX_SUPPORTED_TARGET) {
clean_negotiations(softc, targ);
/* send indication to CAM */
neg.sync_period = neg.sync_offset = 0;

neg.valid = (CCB_TRANS_BUS_WIDTH_VALID
| CCB_TRANS_SYNC_RATE_VALID | CCB_TRANS_SYNC_OFFSET_VALID);
xpt_async(AC_TRANSFER_NEG, path, &neg);

### 12.8 Interrupts
The exact type of the interrupt routine depends on the type of the peripheral bus (PCI, ISA and so
on) to which the SCSI controller is connected.
The interrupt routines of the SIM drivers run at the interrupt level splcam. So splcam() should be
used in the driver to synchronize activity between the interrupt routine and the rest of the driver
(for a multiprocessor-aware driver things get yet more interesting but we ignore this case here).
The pseudo-code in this document happily ignores the problems of synchronization. The real code
must not ignore them. A simple-minded approach is to set splcam() on the entry to the other
routines and reset it on return thus protecting them by one big critical section. To make sure that
the interrupt level will be always restored a wrapper function can be defined, like:

xxx_action(struct cam_sim *sim, union ccb *ccb)
int s;
s = splcam();
xxx_action1(sim, ccb);
splx(s);
xxx_action1(struct cam_sim *sim, union ccb *ccb)
... process the request ...
This approach is simple and robust but the problem with it is that interrupts may get blocked for a
relatively long time and this would negatively affect the system’s performance. On the other hand
the functions of the spl() family have rather high overhead, so vast amount of tiny critical sections
may not be good either.
The conditions handled by the interrupt routine and the details depend very much on the
hardware. We consider the set of "typical" conditions.
First, we check if a SCSI reset was encountered on the bus (probably caused by another SCSI
controller on the same SCSI bus). If so we drop all the enqueued and disconnected requests, report
the events and re-initialize our SCSI controller. It is important that during this initialization the

controller will not issue another reset or else two controllers on the same SCSI bus could ping-pong
resets forever. The case of fatal controller error/hang could be handled in the same place, but it will
probably need also sending RESET signal to the SCSI bus to reset the status of the connections with
the SCSI devices.

int fatal=0;
struct ccb_trans_settings neg;
struct cam_path *path;
if (detected_scsi_reset(softc)
|| (fatal = detected_fatal_controller_error(softc))) {
int targ, lun;
struct xxx_hcb *h, *hh;
/* drop all enqueued CCBs */
for(h = softc->first_queued_hcb; h != NULL; h = hh) {
hh = h->next;
/* the clean values of negotiations to report */
neg.sync_period = neg.sync_offset = 0;
neg.valid = (CCB_TRANS_BUS_WIDTH_VALID
| CCB_TRANS_SYNC_RATE_VALID | CCB_TRANS_SYNC_OFFSET_VALID);
/* drop all disconnected CCBs and clean negotiations */
for (targ=0; targ <= OUR_MAX_SUPPORTED_TARGET; targ++) {
clean_negotiations(softc, targ);
/* report the event if possible */
if (xpt_create_path(&path, /*periph*/NULL,
cam_sim_path(sim), targ,
CAM_LUN_WILDCARD) == CAM_REQ_CMP) {
xpt_async(AC_TRANSFER_NEG, path, &neg);
xpt_free_path(path);
for (lun=0; lun <= OUR_MAX_SUPPORTED_LUN; lun++)
for (h = softc->first_discon_hcb[targ][lun]; h != NULL; h = hh) {
if (fatal)
free_hcb_and_ccb_done(h, h->ccb, CAM_UNREC_HBA_ERROR);
xpt_async(AC_BUS_RESET, softc->wpath, NULL);

/* re-initialization may take a lot of time, in such case
- its completion should be signaled by another interrupt or
- checked on timeout - but for simplicity we assume here that
- it is really fast
if (!fatal) {
reinitialize_controller_without_scsi_reset(softc);
reinitialize_controller_with_scsi_reset(softc);
If interrupt is not caused by a controller-wide condition then probably something has happened to
the current hardware control block. Depending on the hardware there may be other non-HCBrelated events, we just do not consider them here. Then we analyze what happened to this HCB:

struct xxx_hcb *hcb, *h, *hh;
int hcb_status, scsi_status;
int ccb_status;
int targ;
int lun_to_freeze;
hcb = get_current_hcb(softc);
if (hcb == NULL) {
/* either stray interrupt or something went very wrong
- or this is something hardware-dependent
handle as necessary;
targ = hcb->target;
hcb_status = get_status_of_current_hcb(softc);
First we check if the HCB has completed and if so we check the returned SCSI status.

if (hcb_status == COMPLETED) {
scsi_status = get_completion_status(hcb);
Then look if this status is related to the REQUEST SENSE command and if so handle it in a simple
way.

if (hcb->flags & DOING_AUTOSENSE) {
if (scsi_status == GOOD) { /* autosense was successful */

hcb->ccb->ccb_h.status |= CAM_AUTOSNS_VALID;
free_hcb_and_ccb_done(hcb, hcb->ccb, CAM_SCSI_STATUS_ERROR);
autosense_failed:
free_hcb_and_ccb_done(hcb, hcb->ccb, CAM_AUTOSENSE_FAIL);
Else the command itself has completed, pay more attention to details. If auto-sense is not disabled
for this CCB and the command has failed with sense data then run REQUEST SENSE command to
receive that data.

hcb->ccb->csio.scsi_status = scsi_status;
calculate_residue(hcb);
if ((hcb->ccb->ccb_h.flags & CAM_DIS_AUTOSENSE)==0
&& (scsi_status == CHECK_CONDITION
|| scsi_status == COMMAND_TERMINATED)) {
/* start auto-SENSE */
hcb->flags |= DOING_AUTOSENSE;
setup_autosense_command_in_hcb(hcb);
restart_current_hcb(softc);
if (scsi_status == GOOD)
free_hcb_and_ccb_done(hcb, hcb->ccb, CAM_REQ_CMP);
free_hcb_and_ccb_done(hcb, hcb->ccb, CAM_SCSI_STATUS_ERROR);
One typical thing would be negotiation events: negotiation messages received from a SCSI target (in
answer to our negotiation attempt or by target’s initiative) or the target is unable to negotiate
(rejects our negotiation messages or does not answer them).

switch (hcb_status) {
case TARGET_REJECTED_WIDE_NEG:
/* revert to 8-bit bus */
softc->current_bus_width[targ] = softc->goal_bus_width[targ] = 8;
neg.valid = CCB_TRANS_BUS_WIDTH_VALID;
continue_current_hcb(softc);

case TARGET_ANSWERED_WIDE_NEG:
int wd;
wd = get_target_bus_width_request(softc);
if (wd <= softc->goal_bus_width[targ]) {
/* answer is acceptable */
softc->current_bus_width[targ] =
softc->goal_bus_width[targ] = neg.bus_width = wd;
neg.valid = CCB_TRANS_BUS_WIDTH_VALID;
prepare_reject_message(hcb);
continue_current_hcb(softc);
case TARGET_REQUESTED_WIDE_NEG:
int wd;
wd = get_target_bus_width_request(softc);
wd = min (wd, OUR_BUS_WIDTH);
wd = min (wd, softc->user_bus_width[targ]);
if (wd != softc->current_bus_width[targ]) {
/* the bus width has changed */
softc->current_bus_width[targ] =
softc->goal_bus_width[targ] = neg.bus_width = wd;
neg.valid = CCB_TRANS_BUS_WIDTH_VALID;
prepare_width_nego_rsponse(hcb, wd);
continue_current_hcb(softc);
Then we handle any errors that could have happened during auto-sense in the same simple-minded
way as before. Otherwise we look closer at the details again.

if (hcb->flags & DOING_AUTOSENSE)
goto autosense_failed;
switch (hcb_status) {

The next event we consider is unexpected disconnect. Which is considered normal after an ABORT
or BUS DEVICE RESET message and abnormal in other cases.

case UNEXPECTED_DISCONNECT:
if (requested_abort(hcb)) {
/* abort affects all commands on that target+LUN, so
- mark all disconnected HCBs on that target+LUN as aborted too
for (h = softc->first_discon_hcb[hcb->target][hcb->lun];
h != NULL; h = hh) {
free_hcb_and_ccb_done(h, h->ccb, CAM_REQ_ABORTED);
ccb_status = CAM_REQ_ABORTED;
} else if (requested_bus_device_reset(hcb)) {
int lun;
/* reset affects all commands on that target, so
- mark all disconnected HCBs on that target+LUN as reset
for (lun=0; lun <= OUR_MAX_SUPPORTED_LUN; lun++)
for (h = softc->first_discon_hcb[hcb->target][lun];
h != NULL; h = hh) {
/* send event */
xpt_async(AC_SENT_BDR, hcb->ccb->ccb_h.path_id, NULL);
/* this was the CAM_RESET_DEV request itself, it is completed */
ccb_status = CAM_REQ_CMP;
calculate_residue(hcb);
ccb_status = CAM_UNEXP_BUSFREE;
lun_to_freeze = hcb->lun;
If the target refuses to accept tags we notify CAM about that and return back all commands for this
LUN:

case TAGS_REJECTED:
neg.flags = 0 & ~CCB_TRANS_TAG_ENB;
neg.valid = CCB_TRANS_TQ_VALID;

ccb_status = CAM_MSG_REJECT_REC;
lun_to_freeze = hcb->lun;
Then we check a number of other conditions, with processing basically limited to setting the CCB
status:

case SELECTION_TIMEOUT:
ccb_status = CAM_SEL_TIMEOUT;
lun_to_freeze = CAM_LUN_WILDCARD;
case PARITY_ERROR:
ccb_status = CAM_UNCOR_PARITY;
case DATA_OVERRUN:
case ODD_WIDE_TRANSFER:
ccb_status = CAM_DATA_RUN_ERR;
/* all other errors are handled in a generic way */
ccb_status = CAM_REQ_CMP_ERR;
lun_to_freeze = CAM_LUN_WILDCARD;
Then we check if the error was serious enough to freeze the input queue until it gets proceeded and
do so if it is:

if (hcb->ccb->ccb_h.status & CAM_DEV_QFRZN) {
/* freeze the queue */
xpt_freeze_devq(ccb->ccb_h.path, /*count*/1);
/* re-queue all commands for this target/LUN back to CAM */
for (h = softc->first_queued_hcb; h != NULL; h = hh) {
hh = h->next;
if (targ == h->targ
&& (lun_to_freeze == CAM_LUN_WILDCARD || lun_to_freeze == h->lun))
free_hcb_and_ccb_done(h, h->ccb, CAM_REQUEUE_REQ);

free_hcb_and_ccb_done(hcb, hcb->ccb, ccb_status);
This concludes the generic interrupt handling although specific controllers may require some
additions.

### 12.9 Errors Summary
When executing an I/O request many things may go wrong. The reason of error can be reported in
the CCB status with great detail. Examples of use are spread throughout this document. For
completeness here is the summary of recommended responses for the typical error conditions:
- CAM_RESRC_UNAVAIL - some resource is temporarily unavailable and the SIM driver cannot
generate an event when it will become available. An example of this resource would be some
intra-controller hardware resource for which the controller does not generate an interrupt
when it becomes available.
- CAM_UNCOR_PARITY - unrecovered parity error occurred
- CAM_DATA_RUN_ERR - data overrun or unexpected data phase (going in other direction than
specified in CAM_DIR_MASK) or odd transfer length for wide transfer
- CAM_SEL_TIMEOUT - selection timeout occurred (target does not respond)
- CAM_CMD_TIMEOUT - command timeout occurred (the timeout function ran)
- CAM_SCSI_STATUS_ERROR - the device returned error
- CAM_AUTOSENSE_FAIL - the device returned error and the REQUEST SENSE COMMAND failed
- CAM_MSG_REJECT_REC - MESSAGE REJECT message was received
- CAM_SCSI_BUS_RESET - received SCSI bus reset
- CAM_REQ_CMP_ERR - "impossible" SCSI phase occurred or something else as weird or just a
generic error if further detail is not available
- CAM_UNEXP_BUSFREE - unexpected disconnect occurred
- CAM_BDR_SENT - BUS DEVICE RESET message was sent to the target
- CAM_UNREC_HBA_ERROR - unrecoverable Host Bus Adapter Error
- CAM_REQ_TOO_BIG - the request was too large for this controller
- CAM_REQUEUE_REQ - this request should be re-queued to preserve transaction ordering. This
typically occurs when the SIM recognizes an error that should freeze the queue and must place
other queued requests for the target at the sim level back into the XPT queue. Typical cases of
such errors are selection timeouts, command timeouts and other like conditions. In such cases
the troublesome command returns the status indicating the error, the and the other commands
which have not be sent to the bus yet get re-queued.
- CAM_LUN_INVALID - the LUN ID in the request is not supported by the SCSI controller

- CAM_TID_INVALID - the target ID in the request is not supported by the SCSI controller

### 12.10 Timeout Handling
When the timeout for an HCB expires that request should be aborted, just like with an XPT_ABORT
request. The only difference is that the returned status of aborted request should be
CAM_CMD_TIMEOUT instead of CAM_REQ_ABORTED (that is why implementation of the abort
better be done as a function). But there is one more possible problem: what if the abort request
itself will get stuck? In this case the SCSI bus should be reset, just like with an XPT_RESET_BUS
request (and the idea about implementing it as a function called from both places applies here too).
Also we should reset the whole SCSI bus if a device reset request got stuck. So after all the timeout
function would look like:

xxx_timeout(void *arg)
struct xxx_hcb *hcb = (struct xxx_hcb *)arg;
struct xxx_softc *softc;
struct ccb_hdr *ccb_h;
softc = hcb->softc;
ccb_h = &hcb->ccb->ccb_h;
if (hcb->flags & HCB_BEING_ABORTED || ccb_h->func_code == XPT_RESET_DEV) {
xxx_reset_bus(softc);
xxx_abort_ccb(hcb->ccb, CAM_CMD_TIMEOUT);
When we abort a request all the other disconnected requests to the same target/LUN get aborted
too. So there appears a question, should we return them with status CAM_REQ_ABORTED or
CAM_CMD_TIMEOUT? The current drivers use CAM_CMD_TIMEOUT. This seems logical because if
one request got timed out then probably something really bad is happening to the device, so if they
would not be disturbed they would time out by themselves.

## Chapter 13. USB Devices
### 13.1 Introduction
The Universal Serial Bus (USB) is a new way of attaching devices to personal computers. The bus
architecture features two-way communication and has been developed as a response to devices
becoming smarter and requiring more interaction with the host. USB support is included in all
current PC chipsets and is therefore available in all recently built PCs. Apple’s introduction of the
USB-only iMac has been a major incentive for hardware manufacturers to produce USB versions of
their devices. The future PC specifications specify that all legacy connectors on PCs should be
replaced by one or more USB connectors, providing generic plug and play capabilities. Support for
USB hardware was available at a very early stage in NetBSD and was developed by Lennart
Augustsson for the NetBSD project. The code has been ported to FreeBSD and we are currently
maintaining a shared code base. For the implementation of the USB subsystem a number of
features of USB are important.
Lennart Augustsson has done most of the implementation of the USB support for the NetBSD project.
Many thanks for this incredible amount of work. Many thanks also to Ardy and Dirk for their
comments and proofreading of this paper.
- Devices connect to ports on the computer directly or on devices called hubs, forming a treelike
device structure.
- The devices can be connected and disconnected at run time.
- Devices can suspend themselves and trigger resumes of the host system
- As the devices can be powered from the bus, the host software has to keep track of power
budgets for each hub.
- Different quality of service requirements by the different device types together with the
maximum of 126 devices that can be connected to the same bus, require proper scheduling of
transfers on the shared bus to take full advantage of the 12Mbps bandwidth available. (over
400Mbps with USB 2.0)
- Devices are intelligent and contain easily accessible information about themselves
The development of drivers for the USB subsystem and devices connected to it is supported by the
specifications that have been developed and will be developed. These specifications are publicly
available from the USB home pages. Apple has been very strong in pushing for standards based
drivers, by making drivers for the generic classes available in their operating system MacOS and
discouraging the use of separate drivers for each new device. This chapter tries to collate essential
information for a basic understanding of the USB 2.0 implementation stack in FreeBSD/NetBSD. It is
recommended however to read it together with the relevant 2.0 specifications and other developer
resources:
- USB 2.0 Specification (http://www.usb.org/developers/docs/usb20_docs/)
- Universal

Host

Controller

Interface

(UHCI)

Specification

Interface

(OHCI)

(ftp://ftp.netbsd.org/pub/NetBSD/misc/blymn/uhci11d.pdf)
- Open

Host

Controller

Specification(ftp://ftp.compaq.com/pub/supportinformation/papers/hcir1_0a.pdf)
- Developer section of USB home page (http://www.usb.org/developers/)

#### 13.1.1 Structure of the USB Stack
The USB support in FreeBSD can be split into three layers. The lowest layer contains the host
controller driver, providing a generic interface to the hardware and its scheduling facilities. It
supports initialisation of the hardware, scheduling of transfers and handling of completed and/or
failed transfers. Each host controller driver implements a virtual hub providing hardware
independent access to the registers controlling the root ports on the back of the machine.
The middle layer handles the device connection and disconnection, basic initialisation of the
device, driver selection, the communication channels (pipes) and does resource management. This
services layer also controls the default pipes and the device requests transferred over them.
The top layer contains the individual drivers supporting specific (classes of) devices. These drivers
implement the protocol that is used over the pipes other than the default pipe. They also implement
additional functionality to make the device available to other parts of the kernel or userland. They
use the USB driver interface (USBDI) exposed by the services layer.

### 13.2 Host Controllers
The host controller (HC) controls the transmission of packets on the bus. Frames of 1 millisecond
are used. At the start of each frame the host controller generates a Start of Frame (SOF) packet.
The SOF packet is used to synchronise to the start of the frame and to keep track of the frame
number. Within each frame packets are transferred, either from host to device (out) or from device
to host (in). Transfers are always initiated by the host (polled transfers). Therefore there can only be
one host per USB bus. Each transfer of a packet has a status stage in which the recipient of the data
can return either ACK (acknowledge reception), NAK (retry), STALL (error condition) or nothing
(garbled data stage, device not available or disconnected). Section 8.5 of the USB 2.0 Specification
explains the details of packets in more detail. Four different types of transfers can occur on a USB
bus: control, bulk, interrupt and isochronous. The types of transfers and their characteristics are
described below.
Large transfers between the device on the USB bus and the device driver are split up into multiple
packets by the host controller or the HC driver.
Device requests (control transfers) to the default endpoints are special. They consist of two or three
phases: SETUP, DATA (optional) and STATUS. The set-up packet is sent to the device. If there is a data
phase, the direction of the data packet(s) is given in the set-up packet. The direction in the status
phase is the opposite of the direction during the data phase, or IN if there was no data phase. The
host controller hardware also provides registers with the current status of the root ports and the
changes that have occurred since the last reset of the status change register. Access to these
registers is provided through a virtualised hub as suggested in the USB specification. The virtual
hub must comply with the hub device class given in chapter 11 of that specification. It must provide
a default pipe through which device requests can be sent to it. It returns the standard andhub class
specific set of descriptors. It should also provide an interrupt pipe that reports changes happening

at its ports. There are currently two specifications for host controllers available: Universal Host
Controller Interface (UHCI) from Intel and Open Host Controller Interface (OHCI) from Compaq,
Microsoft, and National Semiconductor. The UHCI specification has been designed to reduce
hardware complexity by requiring the host controller driver to supply a complete schedule of the
transfers for each frame. OHCI type controllers are much more independent by providing a more
abstract interface doing a lot of work themselves.

#### 13.2.1 UHCI
The UHCI host controller maintains a framelist with 1024 pointers to per frame data structures. It
understands two different data types: transfer descriptors (TD) and queue heads (QH). Each TD
represents a packet to be communicated to or from a device endpoint. QHs are a means to
groupTDs (and QHs) together.
Each transfer consists of one or more packets. The UHCI driver splits large transfers into multiple
packets. For every transfer, apart from isochronous transfers, a QH is allocated. For every type of
transfer these QHs are collected at a QH for that type. Isochronous transfers have to be executed
first because of the fixed latency requirement and are directly referred to by the pointer in the
framelist. The last isochronous TD refers to the QH for interrupt transfers for that frame. All QHs
for interrupt transfers point at the QH for control transfers, which in turn points at the QH for bulk
transfers. The following diagram gives a graphical overview of this:
This results in the following schedule being run in each frame. After fetching the pointer for the
current frame from the framelist the controller first executes the TDs for all the isochronous
packets in that frame. The last of these TDs refers to the QH for the interrupt transfers for that
frame. The host controller will then descend from that QH to the QHs for the individual interrupt
transfers. After finishing that queue, the QH for the interrupt transfers will refer the controller to
the QH for all control transfers. It will execute all the subqueues scheduled there, followed by all
the transfers queued at the bulk QH. To facilitate the handling of finished or failed transfers
different types of interrupts are generated by the hardware at the end of each frame. In the last TD
for a transfer the Interrupt-On Completion bit is set by the HC driver to flag an interrupt when the
transfer has completed. An error interrupt is flagged if a TD reaches its maximum error count. If
the short packet detect bit is set in a TD and less than the set packet length is transferred this
interrupt is flagged to notify the controller driver of the completed transfer. It is the host controller
driver’s task to find out which transfer has completed or produced an error. When called the
interrupt service routine will locate all the finished transfers and call their callbacks.
Refer to the UHCI Specification for a more elaborate description.

#### 13.2.2 OHCI
Programming an OHCI host controller is much simpler. The controller assumes that a set of
endpoints is available, and is aware of scheduling priorities and the ordering of the types of
transfers in a frame. The main data structure used by the host controller is the endpoint descriptor
(ED) to which a queue of transfer descriptors (TDs) is attached. The ED contains the maximum
packet size allowed for an endpoint and the controller hardware does the splitting into packets. The
pointers to the data buffers are updated after each transfer and when the start and end pointer are
equal, the TD is retired to the done-queue. The four types of endpoints (interrupt, isochronous,
control, and bulk) have their own queues. Control and bulk endpoints are queued each at their own

queue. Interrupt EDs are queued in a tree, with the level in the tree defining the frequency at which
they run.
The schedule being run by the host controller in each frame looks as follows. The controller will
first run the non-periodic control and bulk queues, up to a time limit set by the HC driver. Then the
interrupt transfers for that frame number are run, by using the lower five bits of the frame number
as an index into level 0 of the tree of interrupts EDs. At the end of this tree the isochronous EDs are
connected and these are traversed subsequently. The isochronous TDs contain the frame number of
the first frame the transfer should be run in. After all the periodic transfers have been run, the
control and bulk queues are traversed again. Periodically the interrupt service routine is called to
process the done queue and call the callbacks for each transfer and reschedule interrupt and
isochronous endpoints.
See the UHCI Specification for a more elaborate description. The middle layer provides access to the
device in a controlled way and maintains resources in use by the different drivers and the services
layer. The layer takes care of the following aspects:
- The device configuration information
- The pipes to communicate with a device
- Probing and attaching and detaching form a device.

### 13.3 USB Device Information
#### 13.3.1 Device Configuration Information
Each device provides different levels of configuration information. Each device has one or more
configurations, of which one is selected during probe/attach. A configuration provides power and
bandwidth requirements. Within each configuration there can be multiple interfaces. A device
interface is a collection of endpoints. For example USB speakers can have an interface for the audio
data (Audio Class) and an interface for the knobs, dials and buttons (HID Class). All interfaces in a
configuration are active at the same time and can be attached to by different drivers. Each interface
can have alternates, providing different quality of service parameters. In for example cameras this
is used to provide different frame sizes and numbers of frames per second.
Within each interface, 0 or more endpoints can be specified. Endpoints are the unidirectional
access points for communicating with a device. They provide buffers to temporarily store incoming
or outgoing data from the device. Each endpoint has a unique address within a configuration, the
endpoint’s number plus its direction. The default endpoint, endpoint 0, is not part of any interface
and available in all configurations. It is managed by the services layer and not directly available to
device drivers.
This hierarchical configuration information is described in the device by a standard set of
descriptors (see section 9.6 of the USB specification). They can be requested through the Get
Descriptor Request. The services layer caches these descriptors to avoid unnecessary transfers on
the USB bus. Access to the descriptors is provided through function calls.
- Device descriptors: General information about the device, like Vendor, Product and Revision Id,
supported device class, subclass and protocol if applicable, maximum packet size for the default

endpoint, etc.
- Configuration descriptors: The number of interfaces in this configuration, suspend and resume
functionality supported and power requirements.
- Interface descriptors: interface class, subclass and protocol if applicable, number of alternate
settings for the interface and the number of endpoints.
- Endpoint descriptors: Endpoint address, direction and type, maximum packet size supported
and polling frequency if type is interrupt endpoint. There is no descriptor for the default
endpoint (endpoint 0) and it is never counted in an interface descriptor.
- String descriptors: In the other descriptors string indices are supplied for some fields.These can
be used to retrieve descriptive strings, possibly in multiple languages.
Class specifications can add their own descriptor types that are available through the GetDescriptor
Request.
Pipes Communication to end points on a device flows through so-called pipes. Drivers submit
transfers to endpoints to a pipe and provide a callback to be called on completion or failure of the
transfer (asynchronous transfers) or wait for completion (synchronous transfer). Transfers to an
endpoint are serialised in the pipe. A transfer can either complete, fail or time-out (if a time-out has
been set). There are two types of time-outs for transfers. Time-outs can happen due to time-out on
the USBbus (milliseconds). These time-outs are seen as failures and can be due to disconnection of
the device. A second form of time-out is implemented in software and is triggered when a transfer
does not complete within a specified amount of time (seconds). These are caused by a device
acknowledging negatively (NAK) the transferred packets. The cause for this is the device not being
ready to receive data, buffer under- or overrun or protocol errors.
If a transfer over a pipe is larger than the maximum packet size specified in the associated
endpoint descriptor, the host controller (OHCI) or the HC driver (UHCI) will split the transfer into
packets of maximum packet size, with the last packet possibly smaller than the maximum packet
size.
Sometimes it is not a problem for a device to return less data than requested. For example abulk-intransfer to a modem might request 200 bytes of data, but the modem has only 5 bytes available at
that time. The driver can set the short packet (SPD) flag. It allows the host controller to accept a
packet even if the amount of data transferred is less than requested. This flag is only valid for intransfers, as the amount of data to be sent to a device is always known beforehand. If an
unrecoverable error occurs in a device during a transfer the pipe is stalled. Before any more data is
accepted or sent the driver needs to resolve the cause of the stall and clear the endpoint stall
condition through send the clear endpoint halt device request over the default pipe. The default
endpoint should never stall.
There are four different types of endpoints and corresponding pipes: - Control pipe / default pipe:
There is one control pipe per device, connected to the default endpoint (endpoint 0). The pipe
carries the device requests and associated data. The difference between transfers over the default
pipe and other pipes is that the protocol for the transfers is described in the USB specification.
These requests are used to reset and configure the device. A basic set of commands that must be
supported by each device is provided in chapter 9 of the USB specification. The commands
supported on this pipe can be extended by a device class specification to support additional

functionality.
- Bulk pipe: This is the USB equivalent to a raw transmission medium.
- Interrupt pipe: The host sends a request for data to the device and if the device has nothing to
send, it will NAK the data packet. Interrupt transfers are scheduled at a frequency specified
when creating the pipe.
- Isochronous pipe: These pipes are intended for isochronous data, for example video or audio
streams, with fixed latency, but no guaranteed delivery. Some support for pipes of this type is
available in the current implementation. Packets in control, bulk and interrupt transfers are
retried if an error occurs during transmission or the device acknowledges the packet negatively
(NAK) due to for example lack of buffer space to store the incoming data. Isochronous packets
are however not retried in case of failed delivery or NAK of a packet as this might violate the
timing constraints.
The availability of the necessary bandwidth is calculated during the creation of the pipe. Transfers
are scheduled within frames of 1 millisecond. The bandwidth allocation within a frame is
prescribed by the USB specification, section 5.6 [ 2]. Isochronous and interrupt transfers are
allowed to consume up to 90% of the bandwidth within a frame. Packets for control and bulk
transfers are scheduled after all isochronous and interrupt packets and will consume all the
remaining bandwidth.
More information on scheduling of transfers and bandwidth reclamation can be found in chapter 5
of the USB specification, section 1.3 of the UHCI specification, and section 3.4.2 of the OHCI
specification.

### 13.4 Device Probe and Attach
After the notification by the hub that a new device has been connected, the service layer switches
on the port, providing the device with 100 mA of current. At this point the device is in its default
state and listening to device address 0. The services layer will proceed to retrieve the various
descriptors through the default pipe. After that it will send a Set Address request to move the device
away from the default device address (address 0). Multiple device drivers might be able to support
the device. For example a modem driver might be able to support an ISDN TA through the AT
compatibility interface. A driver for that specific model of the ISDN adapter might however be able
to provide much better support for this device. To support this flexibility, the probes return
priorities indicating their level of support. Support for a specific revision of a product ranks the
highest and the generic driver the lowest priority. It might also be that multiple drivers could attach
to one device if there are multiple interfaces within one configuration. Each driver only needs to
support a subset of the interfaces.
The probing for a driver for a newly attached device checks first for device specific drivers. If not
found, the probe code iterates over all supported configurations until a driver attaches in a
configuration. To support devices with multiple drivers on different interfaces, the probe iterates
over all interfaces in a configuration that have not yet been claimed by a driver. Configurations that
exceed the power budget for the hub are ignored. During attach the driver should initialise the
device to its proper state, but not reset it, as this will make the device disconnect itself from the bus
and restart the probing process for it. To avoid consuming unnecessary bandwidth should not

claim the interrupt pipe at attach time, but should postpone allocating the pipe until the file is
opened and the data is actually used. When the file is closed the pipe should be closed again, even
though the device might still be attached.

#### 13.4.1 Device Disconnect and Detach
A device driver should expect to receive errors during any transaction with the device. The design
of USB supports and encourages the disconnection of devices at any point in time. Drivers should
make sure that they do the right thing when the device disappears.
Furthermore a device that has been disconnected and reconnected will not be reattached at the
same device instance. This might change in the future when more devices support serial numbers
(see the device descriptor) or other means of defining an identity for a device have been developed.
The disconnection of a device is signaled by a hub in the interrupt packet delivered to the hub
driver. The status change information indicates which port has seen a connection change. The
device detach method for all device drivers for the device connected on that port are called and the
structures cleaned up. If the port status indicates that in the mean time a device has been
connected to that port, the procedure for probing and attaching the device will be started. A device
reset will produce a disconnect-connect sequence on the hub and will be handled as described
above.

### 13.5 USB Drivers Protocol Information
The protocol used over pipes other than the default pipe is undefined by the USB specification.
Information on this can be found from various sources. The most accurate source is the developer’s
section on the USB home pages. From these pages, a growing number of deviceclass specifications
are available. These specifications specify what a compliant device should look like from a driver
perspective, basic functionality it needs to provide and the protocol that is to be used over the
communication channels. The USB specification includes the description of the Hub Class. A class
specification for Human Interface Devices (HID) has been created to cater for keyboards, tablets,
bar-code readers, buttons, knobs, switches, etc. A third example is the class specification for mass
storage devices. For a full list of device classes see the developers section on the USB home pages.
For many devices the protocol information has not yet been published however. Information on the
protocol being used might be available from the company making the device. Some companies will
require you to sign a Non -Disclosure Agreement (NDA) before giving you the specifications. This in
most cases precludes making the driver open source.
Another good source of information is the Linux driver sources, as a number of companies have
started to provide drivers for Linux for their devices. It is always a good idea to contact the authors
of those drivers for their source of information.
Example: Human Interface Devices The specification for the Human Interface Devices like
keyboards, mice, tablets, buttons, dials,etc. is referred to in other device class specifications and is
used in many devices.
For example audio speakers provide endpoints to the digital to analogue converters and possibly an
extra pipe for a microphone. They also provide a HID endpoint in a separate interface for the

buttons and dials on the front of the device. The same is true for the monitor control class. It is
straightforward to build support for these interfaces through the available kernel and userland
libraries together with the HID class driver or the generic driver. Another device that serves as an
example for interfaces within one configuration driven by different device drivers is a cheap
keyboard with built-in legacy mouse port. To avoid having the cost of including the hardware for a
USB hub in the device, manufacturers combined the mouse data received from the PS/2 port on the
back of the keyboard and the key presses from the keyboard into two separate interfaces in the
same configuration. The mouse and keyboard drivers each attach to the appropriate interface and
allocate the pipes to the two independent endpoints.
Example: Firmware download Many devices that have been developed are based on a general
purpose processor with an additional USB core added to it. Since the development of drivers and
firmware for USB devices is still very new, many devices require the downloading of the firmware
after they have been connected.
The procedure followed is straightforward. The device identifies itself through a vendor and
product Id. The first driver probes and attaches to it and downloads the firmware into it. After that
the device soft resets itself and the driver is detached. After a short pause the device announces its
presence on the bus. The device will have changed its vendor/product/revision Id to reflect the fact
that it has been supplied with firmware and as a consequence a second driver will probe it and
attach to it.
An example of these types of devices is the ActiveWire I/O board, based on the EZ-USB chip. For this
chip a generic firmware downloader is available. The firmware downloaded into the ActiveWire
board changes the revision Id. It will then perform a soft reset of the USB part of the EZ-USB chip to
disconnect from the USB bus and again reconnect.
Example: Mass Storage Devices Support for mass storage devices is mainly built around existing
protocols. The Iomega USB Zipdrive is based on the SCSI version of their drive. The SCSI commands
and status messages are wrapped in blocks and transferred over the bulk pipes to and from the
device, emulating a SCSI controller over the USB wire. ATAPI and UFI commands are supported in a
similar fashion.
The Mass Storage Specification supports 2 different types of wrapping of the command block.The
initial attempt was based on sending the command and status through the default pipe and using
bulk transfers for the data to be moved between the host and the device. Based on experience a
second approach was designed that was based on wrapping the command and status blocks and
sending them over the bulk out and in endpoint. The specification specifies exactly what has to
happen when and what has to be done in case an error condition is encountered. The biggest
challenge when writing drivers for these devices is to fit USB based protocol into the existing
support for mass storage devices. CAM provides hooks to do this in a fairly straight forward way.
ATAPI is less simple as historically the IDE interface has never had many different appearances.
The support for the USB floppy from Y-E Data is again less straightforward as a new command set
has been designed.

## Chapter 14. Newbus
Special thanks to Matthew N. Dodd, Warner Losh, Bill Paul, Doug Rabson, Mike Smith, Peter Wemm
and Scott Long.
This chapter explains the Newbus device framework in detail.

### 14.1 Device Drivers
#### 14.1.1 Purpose of a Device Driver
A device driver is a software component which provides the interface between the kernel’s generic
view of a peripheral (e.g., disk, network adapter) and the actual implementation of the peripheral.
The device driver interface (DDI) is the defined interface between the kernel and the device driver
component.

#### 14.1.2 Types of Device Drivers
There used to be days in UNIX®, and thus FreeBSD, in which there were four types of devices
defined:
- block device drivers
- character device drivers
- network device drivers
- pseudo-device drivers
Block devices performed in a way that used fixed size blocks [of data]. This type of driver depended
on the so-called buffer cache, which had cached accessed blocks of data in a dedicated part of
memory. Often this buffer cache was based on write-behind, which meant that when data was
modified in memory it got synced to disk whenever the system did its periodical disk flushing, thus
optimizing writes.

#### 14.1.3 Character Devices
However, in the versions of FreeBSD 4.0 and onward the distinction between block and character
devices became non-existent.

### 14.2 Overview of Newbus
Newbus is the implementation of a new bus architecture based on abstraction layers which saw its
introduction in FreeBSD 3.0 when the Alpha port was imported into the source tree. It was not until
4.0 before it became the default system to use for device drivers. Its goals are to provide a more
object-oriented means of interconnecting the various busses and devices which a host system
provides to the Operating System.
Its main features include amongst others:

- dynamic attaching
- easy modularization of drivers
- pseudo-busses
One of the most prominent changes is the migration from the flat and ad-hoc system to a device
tree layout.
At the top level resides the "root" device which is the parent to hang all other devices on. For each
architecture, there is typically a single child of "root" which has such things as host-to-PCI bridges,
etc. attached to it. For x86, this "root" device is the "nexus" device. For Alpha, various different
models of Alpha have different top-level devices corresponding to the different hardware chipsets,
including lca, apecs, cia and tsunami.
A device in the Newbus context represents a single hardware entity in the system. For instance
each PCI device is represented by a Newbus device. Any device in the system can have children; a
device which has children is often called a "bus". Examples of common busses in the system are ISA
and PCI, which manage lists of devices attached to ISA and PCI busses respectively.
Often, a connection between different kinds of bus is represented by a "bridge" device, which
normally has one child for the attached bus. An example of this is a PCI-to-PCI bridge which is
represented by a device pcibN on the parent PCI bus and has a child pciN for the attached bus. This
layout simplifies the implementation of the PCI bus tree, allowing common code to be used for both
top-level and bridged busses.
Each device in the Newbus architecture asks its parent to map its resources. The parent then asks
its own parent until the nexus is reached. So, basically the nexus is the only part of the Newbus
system which knows about all resources.
An ISA device might want to map its IO port at 0x230, so it asks its parent, in this
case the ISA bus. The ISA bus hands it over to the PCI-to-ISA bridge which in its



turn asks the PCI bus, which reaches the host-to-PCI bridge and finally the nexus.
The beauty of this transition upwards is that there is room to translate the
requests. For example, the 0x230 IO port request might become memory-mapped at
0xb0000230 on a MIPS box by the PCI bridge.

Resource allocation can be controlled at any place in the device tree. For instance on many Alpha
platforms, ISA interrupts are managed separately from PCI interrupts and resource allocations for
ISA interrupts are managed by the Alpha’s ISA bus device. On IA-32, ISA and PCI interrupts are both
managed by the top-level nexus device. For both ports, memory and port address space is managed
by a single entity - nexus for IA-32 and the relevant chipset driver on Alpha (e.g., CIA or tsunami).
In order to normalize access to memory and port mapped resources, Newbus integrates the
bus_space APIs from NetBSD. These provide a single API to replace inb/outb and direct memory
reads/writes. The advantage of this is that a single driver can easily use either memory-mapped
registers or port-mapped registers (some hardware supports both).
This support is integrated into the resource allocation mechanism. When a resource is allocated, a
driver can retrieve the associated bus_space_tag_t and bus_space_handle_t from the resource.

Newbus also allows for definitions of interface methods in files dedicated to this purpose. These are
the .m files that are found under the src/sys hierarchy.
The core of the Newbus system is an extensible "object-based programming" model. Each device in
the system has a table of methods which it supports. The system and other devices uses those
methods to control the device and request services. The different methods supported by a device
are defined by a number of "interfaces". An "interface" is simply a group of related methods which
can be implemented by a device.
In the Newbus system, the methods for a device are provided by the various device drivers in the
system. When a device is attached to a driver during auto-configuration, it uses the method table
declared by the driver. A device can later detach from its driver and re-attach to a new driver with
a new method table. This allows dynamic replacement of drivers which can be useful for driver
development.
The interfaces are described by an interface definition language similar to the language used to
define vnode operations for file systems. The interface would be stored in a methods file (which
would normally be named foo_if.m).
Example 5. Newbus Methods

INTERFACE foo
METHOD int doit {
device_t dev;
METHOD void doit_to_child {
device_t dev;
driver_t child;
} DEFAULT doit_generic_to_child;

When this interface is compiled, it generates a header file "foo_if.h" which contains function
declarations:

int FOO_DOIT(device_t dev);
int FOO_DOIT_TO_CHILD(device_t dev, device_t child);
A source file, "foo_if.c" is also created to accompany the automatically generated header file; it
contains implementations of those functions which look up the location of the relevant functions in
the object’s method table and call that function.

The system defines two main interfaces. The first fundamental interface is called "device" and
includes methods which are relevant to all devices. Methods in the "device" interface include
"probe", "attach" and "detach" to control detection of hardware and "shutdown", "suspend" and
"resume" for critical event notification.
The second, more complex interface is "bus". This interface contains methods suitable for devices
which have children, including methods to access bus specific per-device information
notification

(child_detached,

driver_added)

resource

management

[1]

, event

(alloc_resource,

activate_resource, deactivate_resource, release_resource).
Many methods in the "bus" interface are performing services for some child of the bus device.
These methods would normally use the first two arguments to specify the bus providing the service
and the child device which is requesting the service. To simplify driver code, many of these
methods have accessor functions which lookup the parent and call a method on the parent. For
instance the method BUS_TEARDOWN_INTR(device_t dev, device_t child, …) can be called using the
function bus_teardown_intr(device_t child, …).
Some bus types in the system define additional interfaces to provide access to bus-specific
functionality. For instance, the PCI bus driver defines the "pci" interface which has two methods
read_config and write_config for accessing the configuration registers of a PCI device.

### 14.3 Newbus API
As the Newbus API is huge, this section makes some effort at documenting it. More information to
come in the next revision of this document.

#### 14.3.1 Important Locations in the Source Hierarchy
src/sys/[arch]/[arch] - Kernel code for a specific machine architecture resides in this directory. For
example, the i386 architecture, or the SPARC64 architecture.
src/sys/dev/[bus] - device support for a specific [bus] resides in this directory.
src/sys/dev/pci - PCI bus support code resides in this directory.
src/sys/[isa|pci] - PCI/ISA device drivers reside in this directory. The PCI/ISA bus support code used
to exist in this directory in FreeBSD version 4.0.

#### 14.3.2 Important Structures and Type Definitions
devclass_t - This is a type definition of a pointer to a struct devclass.
device_method_t - This is the same as kobj_method_t (see src/sys/kobj.h).
device_t - This is a type definition of a pointer to a struct device. device_t represents a device in
the system. It is a kernel object. See src/sys/sys/bus_private.h for implementation details.
driver_t - This is a type definition which references struct driver. The driver struct is a class of the
device kernel object; it also holds data private to the driver.

driver_t Implementation

struct driver {
KOBJ_CLASS_FIELDS;
*priv;

/* driver private data */

A device_state_t type, which is an enumeration, device_state. It contains the possible states of a
Newbus device before and after the autoconfiguration process.
Device States _device_state_t

- src/sys/sys/bus.h
typedef enum device_state {
DS_NOTPRESENT, /* not probed or probe failed */
DS_ALIVE,
/* probe succeeded */
DS_ATTACHED,
/* attach method called */
DS_BUSY
/* device is open */
} device_state_t;

[1] bus_generic_read_ivar(9) and bus_generic_write_ivar(9)

## Chapter 15. Sound Subsystem
### 15.1 Introduction
The FreeBSD sound subsystem cleanly separates generic sound handling issues from device-specific
ones. This makes it easier to add support for new hardware.
The pcm(4) framework is the central piece of the sound subsystem. It mainly implements the
following elements:
- A system call interface (read, write, ioctls) to digitized sound and mixer functions. The ioctl
command set is compatible with the legacy OSS or Voxware interface, allowing common
multimedia applications to be ported without modification.
- Common code for processing sound data (format conversions, virtual channels).
- A uniform software interface to hardware-specific audio interface modules.
- Additional support for some common hardware interfaces (ac97), or shared hardware-specific
code (ex: ISA DMA routines).
The support for specific sound cards is implemented by hardware-specific drivers, which provide
channel and mixer interfaces to plug into the generic pcm code.
In this chapter, the term pcm will refer to the central, common part of the sound driver, as opposed
to the hardware-specific modules.
The prospective driver writer will of course want to start from an existing module and use the code
as the ultimate reference. But, while the sound code is nice and clean, it is also mostly devoid of
comments. This document tries to give an overview of the framework interface and answer some
questions that may arise while adapting the existing code.
As an alternative, or in addition to starting from a working example, you can find a commented
driver template at https://people.FreeBSD.org/~cg/template.c

### 15.2 Files
All the relevant code lives in /usr/src/sys/dev/sound/, except for the public ioctl interface definitions,
found in /usr/src/sys/sys/soundcard.h
Under /usr/src/sys/dev/sound/, the pcm/ directory holds the central code, while the pci/, isa/ and usb/
directories have the drivers for PCI and ISA boards, and for USB audio devices.

### 15.3 Probing, Attaching, etc.
Sound drivers probe and attach in almost the same way as any hardware driver module. You might
want to look at the ISA or PCI specific sections of the handbook for more information.
However, sound drivers differ in some ways:

- They declare themselves as pcm class devices, with a struct snddev_info device private
structure:

static driver_t xxx_driver = {
"pcm",
xxx_methods,
sizeof(struct snddev_info)
DRIVER_MODULE(snd_xxxpci, pci, xxx_driver, pcm_devclass, 0, 0);
MODULE_DEPEND(snd_xxxpci, snd_pcm, PCM_MINVER, PCM_PREFVER,PCM_MAXVER);
Most sound drivers need to store additional private information about their device. A private
data structure is usually allocated in the attach routine. Its address is passed to pcm by the calls
to pcm_register() and mixer_init(). pcm later passes back this address as a parameter in calls to
the sound driver interfaces.
- The sound driver attach routine should declare its MIXER or AC97 interface to pcm by calling
mixer_init(). For a MIXER interface, this causes in turn a call to xxxmixer_init().
- The sound driver attach routine declares its general CHANNEL configuration to pcm by calling
pcm_register(dev, sc, nplay, nrec), where sc is the address for the device data structure, used
in further calls from pcm, and nplay and nrec are the number of play and record channels.
- The sound driver attach routine declares each of its channel objects by calls to pcm_addchan().
This sets up the channel glue in pcm and causes in turn a call to xxxchannel_init().
- The sound driver detach routine should call pcm_unregister() before releasing its resources.
There are two possible methods to handle non-PnP devices:
- Use a device_identify() method (example: sound/isa/es1888.c). The device_identify() method
probes for the hardware at known addresses and, if it finds a supported device, creates a new
pcm device which is then passed to probe/attach.
- Use a custom kernel configuration with appropriate hints for pcm devices (example:
sound/isa/mss.c).
pcm drivers should implement device_suspend, device_resume and device_shutdown routines, so that
power management and module unloading function correctly.

### 15.4 Interfaces
The interface between the pcm core and the sound drivers is defined in terms of kernel objects.
There are two main interfaces that a sound driver will usually provide: CHANNEL and either
MIXER or AC97.
The AC97 interface is a very small hardware access (register read/write) interface, implemented by
drivers for hardware with an AC97 codec. In this case, the actual MIXER interface is provided by the
shared AC97 code in pcm.

#### 15.4.1 The CHANNEL Interface
15.4.1.1. Common Notes for Function Parameters
Sound drivers usually have a private data structure to describe their device, and one structure for
each play and record data channel that it supports.
For all CHANNEL interface functions, the first parameter is an opaque pointer.
The second parameter is a pointer to the private channel data structure, except for channel_init()
which has a pointer to the private device structure (and returns the channel pointer for further use
by pcm).
15.4.1.2. Overview of Data Transfer Operations
For sound data transfers, the pcm core and the sound drivers communicate through a shared
memory area, described by a struct snd_dbuf.
struct snd_dbuf is private to pcm, and sound drivers obtain values of interest by calls to accessor
functions (sndbuf_getxxx()).
The shared memory area has a size of sndbuf_getsize() and is divided into fixed size blocks of
sndbuf_getblksz() bytes.
When playing, the general transfer mechanism is as follows (reverse the idea for recording):
- pcm initially fills up the buffer, then calls the sound driver’s xxxchannel_trigger() function with
a parameter of PCMTRIG_START.
- The sound driver then arranges to repeatedly transfer the whole memory area (sndbuf_getbuf(),
sndbuf_getsize()) to the device, in blocks of sndbuf_getblksz() bytes. It calls back the
chn_intr()pcm function for each transferred block (this will typically happen at interrupt time).
- chn_intr() arranges to copy new data to the area that was transferred to the device (now free),
and make appropriate updates to the snd_dbuf structure.
15.4.1.3. channel_init
xxxchannel_init() is called to initialize each of the play or record channels. The calls are initiated
from the sound driver attach routine. (See the crossref:sound[pcm-probe-and-attach,probe and
attach section).

static void *
xxxchannel_init(kobj_t obj, void *data,
struct snd_dbuf *b, struct pcm_channel *c, int dir) ①
struct xxx_info *sc = data;
struct xxx_chinfo *ch;
return ch; ②

① b is the address for the channel struct snd_dbuf. It should be initialized in the function by calling
sndbuf_alloc(). The buffer size to use is normally a small multiple of the 'typical' unit transfer
size for your device.c is the pcm channel control structure pointer. This is an opaque object. The
function should store it in the local channel structure, to be used in later calls to pcm (ie:
chn_intr(c)).dir indicates the channel direction (PCMDIR_PLAY or PCMDIR_REC).
② The function should return a pointer to the private area used to control this channel. This will
be passed as a parameter to other channel interface calls.
15.4.1.4. channel_setformat
xxxchannel_setformat() should set up the hardware for the specified channel for the specified
sound format.

xxxchannel_setformat(kobj_t obj, void *data, u_int32_t format) ①
① format is specified as an AFMT_XXX value (soundcard.h).
15.4.1.5. channel_setspeed
xxxchannel_setspeed() sets up the channel hardware for the specified sampling speed, and returns
the possibly adjusted speed.

xxxchannel_setspeed(kobj_t obj, void *data, u_int32_t speed)
return speed;

15.4.1.6. channel_setblocksize
xxxchannel_setblocksize() sets the block size, which is the size of unit transactions between pcm
and the sound driver, and between the sound driver and the device. Typically, this would be the
number of bytes transferred before an interrupt occurs. During a transfer, the sound driver should
call pcm's chn_intr() every time this size has been transferred.
Most sound drivers only take note of the block size here, to be used when an actual transfer will be
started.

xxxchannel_setblocksize(kobj_t obj, void *data, u_int32_t blocksize)
return blocksize; ①
① The function returns the possibly adjusted block size. In case the block size is indeed changed,
sndbuf_resize() should be called to adjust the buffer.
15.4.1.7. channel_trigger
xxxchannel_trigger() is called by pcm to control data transfer operations in the driver.

xxxchannel_trigger(kobj_t obj, void *data, int go) ①
① go defines the action for the current call. The possible values are:

If the driver uses ISA DMA, sndbuf_isadma() should be called before performing
actions on the device, and will take care of the DMA chip side of things.

15.4.1.8. channel_getptr
xxxchannel_getptr() returns the current offset in the transfer buffer. This will typically be called by
chn_intr(), and this is how pcm knows where it can transfer new data.
15.4.1.9. channel_free
xxxchannel_free() is called to free up channel resources, for example when the driver is unloaded,
and should be implemented if the channel data structures are dynamically allocated or if
sndbuf_alloc() was not used for buffer allocation.
15.4.1.10. channel_getcaps

struct pcmchan_caps *
xxxchannel_getcaps(kobj_t obj, void *data)
return &xxx_caps; ①
① The routine returns a pointer to a (usually statically-defined) pcmchan_caps structure (defined in
sound/pcm/channel.h. The structure holds the minimum and maximum sampling frequencies,

and the accepted sound formats. Look at any sound driver for an example.
15.4.1.11. More Functions
channel_reset(), channel_resetdone(), and channel_notify() are for special purposes and should not
be implemented in a driver without discussing it on the FreeBSD multimedia mailing list.
channel_setdir() is deprecated.

#### 15.4.2 The MIXER Interface
15.4.2.1. mixer_init
xxxmixer_init() initializes the hardware and tells pcm what mixer devices are available for playing
and recording

xxxmixer_init(struct snd_mixer *m)
struct xxx_info
*sc = mix_getdevinfo(m);
u_int32_t v;
[Initialize hardware]
[Set appropriate bits in v for play mixers] ①
mix_setdevs(m, v);
[Set appropriate bits in v for record mixers]
mix_setrecdevs(m, v)
① Set bits in an integer value and call mix_setdevs() and mix_setrecdevs() to tell pcm what devices
exist.
Mixer bits definitions can be found in soundcard.h (SOUND_MASK_XXX values and SOUND_MIXER_XXX bit
shifts).
15.4.2.2. mixer_set
xxxmixer_set() sets the volume level for one mixer device.

xxxmixer_set(struct snd_mixer *m, unsigned dev,
unsigned left, unsigned right) ①
struct sc_info *sc = mix_getdevinfo(m);
[set volume level]
return left | (right << 8); ②

① The device is specified as a SOUND_MIXER_XXX value. The volume values are specified in range [0100]. A value of zero should mute the device.
② As the hardware levels probably will not match the input scale, and some rounding will occur,
the routine returns the actual level values (in range 0-100) as shown.
15.4.2.3. mixer_setrecsrc
xxxmixer_setrecsrc() sets the recording source device.

xxxmixer_setrecsrc(struct snd_mixer *m, u_int32_t src) ①
struct xxx_info *sc = mix_getdevinfo(m);
[look for non zero bit(s) in src, set up hardware]
[update src to reflect actual action]
return src; ②
① The desired recording devices are specified as a bit field
② The actual devices set for recording are returned. Some drivers can only set one device for
recording. The function should return -1 if an error occurs.
15.4.2.4. mixer_uninit, mixer_reinit
xxxmixer_uninit() should ensure that all sound is muted and if possible mixer hardware should be
powered down.
xxxmixer_reinit() should ensure that the mixer hardware is powered up and any settings not
controlled by mixer_set() or mixer_setrecsrc() are restored.

#### 15.4.3 The AC97 Interface
The AC97 interface is implemented by drivers with an AC97 codec. It only has three methods:
- xxxac97_init() returns the number of ac97 codecs found.
- ac97_read() and ac97_write() read or write a specified register.
The AC97 interface is used by the AC97 code in pcm to perform higher level operations. Look at
sound/pci/maestro3.c or many others under sound/pci/ for an example.

## Chapter 16. PC Card
This chapter will talk about the FreeBSD mechanisms for writing a device driver for a PC Card or
CardBus device. However, at present it just documents how to add a new device to an existing
pccard driver.

### 16.1 Adding a Device
Device drivers know what devices they support. There is a table of supported devices in the kernel
that drivers use to attach to a device.

#### 16.1.1 Overview
PC Cards are identified in one of two ways, both based on the Card Information Structure (CIS)
stored on the card. The first method is to use numeric manufacturer and product numbers. The
second method is to use the human readable strings that are also contained in the CIS. The PC Card
bus uses a centralized database and some macros to facilitate a design pattern to help the driver
writer match devices to his driver.
Original equipment manufacturers (OEMs) often develop a reference design for a PC Card product,
then sell this design to other companies to market. Those companies refine the design, market the
product to their target audience or geographic area, and put their own name plate onto the card.
The refinements to the physical card are typically very minor, if any changes are made at all. To
strengthen their brand, these vendors place their company name in the human readable strings in
the CIS space, but leave the manufacturer and product IDs unchanged.
Due to this practice, FreeBSD drivers usually rely on numeric IDs for device identification. Using
numeric IDs and a centralized database complicates adding IDs and support for cards to the system.
One must carefully check to see who really made the card, especially when it appears that the
vendor who made the card might already have a different manufacturer ID listed in the central
database. Linksys, D-Link, and NetGear are a number of US manufacturers of LAN hardware that
often sell the same design. These same designs can be sold in Japan under names such as Buffalo
and Corega. Often, these devices will all have the same manufacturer and product IDs.
The PC Card bus code keeps a central database of card information, but not which driver is
associated with them, in /sys/dev/pccard/pccarddevs. It also provides a set of macros that allow one
to easily construct simple entries in the table the driver uses to claim devices.
Finally, some really low end devices do not contain manufacturer identification at all. These devices
must be detected by matching the human readable CIS strings. While it would be nice if we did not
need this method as a fallback, it is necessary for some very low end CD-ROM players and Ethernet
cards. This method should generally be avoided, but a number of devices are listed in this section
because they were added prior to the recognition of the OEM nature of the PC Card business. When
adding new devices, prefer using the numeric method.

#### 16.1.2 Format of pccarddevs
There are four sections in the pccarddevs files. The first section lists the manufacturer numbers for

vendors that use them. This section is sorted in numerical order. The next section has all of the
products that are used by these vendors, along with their product ID numbers and a description
string. The description string typically is not used (instead we set the device’s description based on
the human readable CIS, even if we match on the numeric version). These two sections are then
repeated for devices that use the string matching method. Finally, C-style comments enclosed in /
and/ characters are allowed anywhere in the file.
The first section of the file contains the vendor IDs. Please keep this list sorted in numeric order.
Also, please coordinate changes to this file because we share it with NetBSD to help facilitate a
common clearing house for this information. For example, here are the first few vendor IDs:

vendor FUJITSU
vendor NETGEAR_2
vendor PANASONIC
vendor SANDISK

0x0004
0x000b
0x0032
0x0045

Fujitsu Corporation
Netgear
Matsushita Electric Industrial Co.
Sandisk Corporation

Chances are very good that the NETGEAR_2 entry is really an OEM that NETGEAR purchased cards
from and the author of support for those cards was unaware at the time that Netgear was using
someone else’s ID. These entries are fairly straightforward. The vendor keyword denotes the kind
of line that this is, followed by the name of the vendor. This name will be repeated later in
pccarddevs, as well as used in the driver’s match tables, so keep it short and a valid C identifier. A
numeric ID in hex identifies the manufacturer. Do not add IDs of the form 0xffffffff or 0xffff
because these are reserved IDs (the former is "no ID set" while the latter is sometimes seen in
extremely poor quality cards to try to indicate "none"). Finally there is a string description of the
company that makes the card. This string is not used in FreeBSD for anything but commentary
purposes.
The second section of the file contains the products. As shown in this example, the format is similar
to the vendor lines:

/* Allied Telesis K.K. */
product ALLIEDTELESIS LA_PCM
/* Archos */
product ARCHOS ARC_ATAPI

0x0002 Allied Telesis LA-PCM

0x0043 MiniCD

The product keyword is followed by the vendor name, repeated from above. This is followed by the
product name, which is used by the driver and should be a valid C identifier, but may also start
with a number. As with the vendors, the hex product ID for this card follows the same convention
for 0xffffffff and 0xffff. Finally, there is a string description of the device itself. This string
typically is not used in FreeBSD, since FreeBSD’s pccard bus driver will construct a string from the
human readable CIS entries, but it can be used in the rare cases where this is somehow insufficient.
The products are in alphabetical order by manufacturer, then numerical order by product ID. They
have a C comment before each manufacturer’s entries and there is a blank line between entries.
The third section is like the previous vendor section, but with all of the manufacturer numeric IDs
set to -1, meaning "match anything found" in the FreeBSD pccard bus code. Since these are C

identifiers, their names must be unique. Otherwise the format is identical to the first section of the
file.
The final section contains the entries for those cards that must be identified by string entries. This
section’s format is a little different from the generic section:

product ADDTRON AWP100
{ "Addtron", "AWP-100&spWireless&spPCMCIA",
"Version&sp01.02", NULL }
product ALLIEDTELESIS WR211PCM { "Allied&spTelesis&spK.K.", "WR211PCM", NULL, NULL }
Allied Telesis WR211PCM
The familiar product keyword is followed by the vendor name and the card name, just as in the
second section of the file. Here the format deviates from that used earlier. There is a {} grouping,
followed by a number of strings. These strings correspond to the vendor, product, and extra
information that is defined in a CIS_INFO tuple. These strings are filtered by the program that
generates pccarddevs.h to replace &sp with a real space. NULL strings mean that the corresponding
part of the entry should be ignored. The example shown here contains a bad entry. It should not
contain the version number unless that is critical for the operation of the card. Sometimes vendors
will have many different versions of the card in the field that all work, in which case that
information only makes it harder for someone with a similar card to use it with FreeBSD.
Sometimes it is necessary when a vendor wishes to sell many different parts under the same brand
due to market considerations (availability, price, and so forth). Then it can be critical to
disambiguating the card in those rare cases where the vendor kept the same manufacturer/product
pair. Regular expression matching is not available at this time.

#### 16.1.3 Sample Probe Routine
To understand how to add a device to the list of supported devices, one must understand the probe
and/or match routines that many drivers have. It is complicated a little in FreeBSD 5.x because
there is a compatibility layer for OLDCARD present as well. Since only the window-dressing is
different, an idealized version will be presented here.

static const struct pccard_product wi_pccard_products[] = {
PCMCIA_CARD(3COM, 3CRWE737A, 0),
PCMCIA_CARD(BUFFALO, WLI_PCM_S11, 0),
PCMCIA_CARD(BUFFALO, WLI_CF_S11G, 0),
PCMCIA_CARD(TDK, LAK_CD011WL, 0),
{ NULL }
wi_pccard_probe(dev)
device_t
dev;
const struct pccard_product *pp;
if ((pp = pccard_product_lookup(dev, wi_pccard_products,
sizeof(wi_pccard_products[0]), NULL)) != NULL) {

if (pp->pp_name != NULL)
device_set_desc(dev, pp->pp_name);
return (ENXIO);
Here we have a simple pccard probe routine that matches a few devices. As stated above, the name
may vary (if it is not foo_pccard_probe() it will be foo_pccard_match()). The function
pccard_product_lookup() is a generalized function that walks the table and returns a pointer to the
first entry that it matches. Some drivers may use this mechanism to convey additional information
about some cards to the rest of the driver, so there may be some variance in the table. The only
requirement is that each row of the table must have a struct pccard_product as the first element.
Looking at the table wi_pccard_products, one notices that all the entries are of the form
PCMCIA_CARD(foo, bar, baz). The foo part is the manufacturer ID from pccarddevs. The bar part is
the product ID. baz is the expected function number for this card. Many pccards can have multiple
functions, and some way to disambiguate function 1 from function 0 is needed. You may see
PCMCIA_CARD_D, which includes the device description from pccarddevs. You may also see
PCMCIA_CARD2 and PCMCIA_CARD2_D which are used when you need to match both CIS strings and
manufacturer numbers, in the "use the default description" and "take the description from
pccarddevs" flavors.

#### 16.1.4 Putting it All Together
To add a new device, one must first obtain the identification information from the device. The
easiest way to do this is to insert the device into a PC Card or CF slot and issue devinfo -v. Sample
output:

cbb1 pnpinfo vendor=0x104c device=0xac51 subvendor=0x1265 subdevice=0x0300
class=0x060700 at slot=10 function=1
cardbus1
pccard1
unknown pnpinfo manufacturer=0x026f product=0x030c cisvendor="BUFFALO"
cisproduct="WLI2-CF-S11" function_type=6 at function=0
manufacturer and product are the numeric IDs for this product, while cisvendor and cisproduct are
the product description strings from the CIS.
Since we first want to prefer the numeric option, first try to construct an entry based on that. The
above card has been slightly fictionalized for the purpose of this example. The vendor is BUFFALO,
which we see already has an entry:

vendor BUFFALO

0x026f

BUFFALO (Melco Corporation)

But there is no entry for this particular card. Instead we find:

/* BUFFALO */
product BUFFALO WLI_PCM_S11 0x0305
product BUFFALO LPC_CF_CLT 0x0307
product BUFFALO LPC3_CLT
0x030a
product BUFFALO WLI_CF_S11G 0x030b

BUFFALO AirStation 11Mbps WLAN
BUFFALO LPC-CF-CLT
BUFFALO LPC3-CLT Ethernet Adapter
BUFFALO AirStation 11Mbps CF WLAN

To add the device, we can just add this entry to pccarddevs:

product BUFFALO WLI2_CF_S11G

0x030c

BUFFALO AirStation ultra 802.11b CF

Once these steps are complete, the card can be added to the driver. That is a simple operation of
adding one line:

static const struct pccard_product wi_pccard_products[] = {
PCMCIA_CARD(3COM, 3CRWE737A, 0),
PCMCIA_CARD(BUFFALO, WLI_PCM_S11, 0),
PCMCIA_CARD(BUFFALO, WLI_CF_S11G, 0),
+
PCMCIA_CARD(BUFFALO, WLI_CF2_S11G, 0),
PCMCIA_CARD(TDK, LAK_CD011WL, 0),
{ NULL }
Note that I have included a ‘+’ in the line before the line that I added, but that is simply to highlight
the line. Do not add it to the actual driver. Once you have added the line, you can recompile your
kernel or module and test it. If the device is recognized and works, please submit a patch. If it does
not work, please figure out what is needed to make it work and submit a patch. If the device is not
recognized at all, you have done something wrong and should recheck each step.
If you are a FreeBSD src committer, and everything appears to be working, then you can commit
the changes to the tree. However, there are some minor tricky things to be considered. pccarddevs
must be committed to the tree first. Then pccarddevs.h must be regenerated and committed as a
second step, ensuring that the right $FreeBSD$ tag is in the latter file. Finally, commit the additions
to the driver.

#### 16.1.5 Submitting a New Device
Please do not send entries for new devices to the author directly. Instead, submit them as a PR and
send the author the PR number for his records. This ensures that entries are not lost. When
submitting a PR, it is unnecessary to include the pccardevs.h diffs in the patch, since those will be
regenerated. It is necessary to include a description of the device, as well as the patches to the client
driver. If you do not know the name, use OEM99 as the name, and the author will adjust OEM99
accordingly after investigation. Committers should not commit OEM99, but instead find the highest
OEM entry and commit one more than that.

Part III: Appendices

Appendix A: Bibliography
[1] Marshall Kirk McKusick, Keith Bostic, Michael J Karels, and John S Quarterman. Copyright © 1996
Addison-Wesley Publishing Company, Inc.. 0-201-54979-4. Addison-Wesley Publishing Company, Inc..
The Design and Implementation of the 4.4 BSD Operating System. 1-2.
