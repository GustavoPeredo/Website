# AtomOS and the future

This will probably be my final post on the series
about AtomOS. This project took too much time out
of me, but was also a grateful learning experience.

## Introduction

Check the [previous post](/blog/atomos) for the my original
plan for AtomOS and the [reasons behind it](/blog/re-fitting-everything-together).

## Problems with the original plan

There is a huge problem in my approach towards AtomOS,
it deviates and ignores many issues raise by Mr. Poettering.
I'll try to explain why I think this is the case.

### The lack of secure boot

This is the most aggravating issue with my approach. The whole point
of having a trustchain is to ensure that the system is not tampered,
therefore by simply using as a base an OS without secure boot support, the
whole design was broken from the start.

#### Why not sign the yourself?

This is a valid question, but it's not as simple as it seems. The
problem is that the kernel is not the only thing that needs to be signed,
but also the bootloader, the initramfs, and the rootfs. The process
of signing all of these is not trivial and would be a requirement
for every individual user.

### Alpine as a base

Alpine is a very useful distribution, but it is not a good base for
AtomOS. The main reason is of secure boot as already mentioned,
but a second reason is that it is not a very user friendly distribution.
Currently there are many workaround required to make modern Linux
technologies to work (such as pipewire, wayland, etc).

### Root tamperability

Since the root was not signed, it is possible to tamper with it.
This is a very big problem, and it is not something that can be
solve with verity-dm, but that was lacking on the original design.

(What's the point of a secure bootloader if the root was tampered?)

## An alternative approach

The new approach for AtomOS was then to keep the pros from before:

 * Updates should be reversable (as well as factory reset).
 * The distribution should be remixable, allowing users and companies
 to remix it as they so wish.
 * All software in it should just work.
 * Shouldn't get in the way of the user.

 As well as fixint the above:
 * Lack of secure boot
 * Alpine as a base
 * Root tamperability

### The Utopia

The design of an utopic AtomOS is as follow:
 * Nix and a EFI bootloader are the only software that are signed.
 * The root system is encrypted with the administrator's password and a TPM key.
 * The root system runs on tmpfs (RAM).
 * All configurations are managed by nix.
 * User files are all encrypted using systemd-homed.
 * A single CD is both the installation media and the distribution.

The installation process of such distribution is as follow:
 1. The CD is an encrypted distribution with a generic password 
    that is automatically decrypted.

 2. A configuration file says that by default, if booting from
    a USB, the system should boot into an installation environment.

 3. The system dd's the USB drive to the user's disk.

 4. If booting from EFI, the system enrolls the TPM key as the
    system's root key. If not, it keeps the generic password.

 5. Upon reboot, use systemd-repart to resize the root and home
    partitions to fill the disk.

 6. The user is prompted for account creation and password, removing
    the generic password and enrolling the
    user's password as the root key (if administrator).

The boot process of such distribution is as follow:
 1. The system boots into the signed EFI bootloader or to a bootloader on old architectures.

 2. The bootloader decrypts the root system with the TPM key or the user's password.

 3. The initramfs runs nix store verify to verify the integrity of the root system.

 4. The initramfs mounts the root system on tmpfs.

 5. The initramfs starts systemd.

 6. Creates zram devices, so memory is not a problem.

Assuming the user has a TPM, the system is now secure. The root system
is encrypted with a key that is only known to the user and the TPM.
The root system is also verified by nix store verify,
which ensures that the root system was not tampered while decrypted.

Factory reset can be achieved by simply running `nixos-rebuild switch --rollback 1`
or by modifying /etc/nixos/configuration.nix and running `nixos-rebuild switch` and
removing the other keys from the disk encryption.

The system uses grub as a bootloader to achive [FDE](https://en.wikipedia.org/wiki/Full_disk_encryption).

### The reality

[NixOS doesn't support secure boot](https://github.com/NixOS/nixpkgs/issues/42127),
though there are [proposed solutions](https://github.com/NixOS/nixpkgs/issues/156270).

NixOS is also missing proper systemd-homed and systemd-parted.

Booting to RAM is not as important as the rest of the features so that could be dropped
for a first version.

Although nix is cool, it is not a requirement for the system to work, 
so it could be dropped for a first version. Furthermore it 
[requires extra work in Fedora Silverblue](https://gist.github.com/matthewpi/08c3d652e7879e4c4c30bead7021ff73).

So instead of using NixOS, Fedora Silverblue would be used as a base, it doesn't provide
much customization, but it allows rollbacks and factory resets.

#### The limitations

It was possible to use systemd-parted to partition the disk automatically.

Systemd-homed seems to work, but it couldn't be used with GDM or SDDM.

For some reason Anaconda (Fedora's Installer) didn't allow an encrypted /boot partition,
although it should be possible to do it.

## The end
Finally, AtomOS will just be a dream. I'm putting this project to rest after
how hard it was to make the nescessary changes to make it work. There are some
final questions I'd like to raise after this:

Instead of having a signed dm-verity verified root, isn't it possible
to simply encrypt the disk with a password and use a TPM key to decrypt it?

Why isn't running the root or /usr/ in a tmpfs more common?

Are there more people working on creating good, secure and reliable Linux distributions?