# RE: Fitting Everything Together

My response to "Fitting Everything Together"
by Lennart Poettering.

## Introduction
[Fitting Everything Together](https://0pointer.net/blog/fitting-everything-together.html)
is a blog post by Lennart Poettering talking about his vision of an ideal Linux Desktop
system (which we will call ParticleOS for the time being). The blog post is awesome,
really! The language can be somewhat of a barrier
for the casual Linux user, but the content in it is very interesting.

For the ones that don't know, Mr. Lennart Poettering is/was the main developer
of many Linux utilities used in desktop Linux (such as
[PulseAudio](https://www.freedesktop.org/wiki/Software/PulseAudio/)
and [Systemd](https://systemd.io/)).

## Overview of ParticleOS
This overview doesn't make justice for the entire blog post by Mr. Poettering,
but I'll do my best to simplify it. The idea is a system with a total of
10 partitions following an [A/B partition scheme](https://source.android.com/devices/tech/ota/ab/)
: A UEFI Boot partition, 2 disk /usr/ disk images, 2 Verity
for the disk images, 2 Signatures for the Verities, rootfs, home partition
and a swap partition.

![ParticleOS Partition Evolution](/images/particleos-partitions.svg)

The operating system would boot through the UEFI partition,
mount the rootfs, then check for a disk's Verity integrity,
then check for /usr/ integrity, mount /usr/, mount /home/, mount Swap.
The other disk image is useful for recovery and factory reset.

### The Good
The system is bullet proof. It's impossible to tamper with disk images,
because of both Validity and Validity's integrity checks; The entire
system in encrypted from top to bottom; It's updated for the latest
security threats; Shouldn't be too different from [Fedora Silverblue](https://silverblue.fedoraproject.org/)
or [Ubuntu Core](https://ubuntu.com/core) in daily usage/hacking.

Another good thing is that many of the technologies needed to create such system already exist,
meaning such future isn't far off.

![ParticleOS Trust Chain](/images/particleos-security.svg)

### The Bad
By far what I found most frustrating by such design is the lack of extensibility
and modularity of the system (in many ways).

#### Extensibility
Let's first talk about extensibility,
there would be 3 main ways of extending "ParticleOS":

1. Mounting disk images with binaries to RAM
2. Running disk images through [Portable Services](https://systemd.io/PORTABLE_SERVICES/)
3. Flatpak

Personally*, I think that's far from ideal, because:

1. A disk image could temporarily override other disk images binaries and/or system binaries.
2. RAM and Disk Storage are still restraints for many users worldwide. By not sharing libraries
and binaries, Linux systems would become much more heavy.
3. Flatpak Runtimes don't cover many of the dependencies for multiple CLI programs,
forcing packaging contributors to include each link, hash and build instructions for
all dependencies is unviable. ([Read more about Flatpak](/blog/nix-flatpak))

#### Modularity
It should be key when designing
an OS, that [users have the nescessary tools to learn how to become contributors**](https://odysee.com/@DistroTube:2/linux-distros-fail-at-educating-their:c)
If users have the power to easily remix their operating system and it's configuration,
then they can also learn and contribute more easily.
I don't see this happening in ParticleOS, because the removal or change of any step in such
OS would require changes in many other parts.

## Conclusion
I think ParticleOS sets the bar for what a modern Linux distribution could aim for, however
the focus on security complicates customization.

Inspired by his blog post, I'll be posting my own version of "Fitting Everything Together".
Check it out [>here<](/blog/atomos).

-----------

\* These are based on my knowledge of these systems, which is, in varying degrees, limited.
Feel free to disagree with these takes and I'd more than happy to learn more about them.

** This is just IMO.

