# What, Why and How to Nix and Flatpak

Flatpak and Nix are two very distinct technologies, but both can be seen as

"[post-modern](https://gist.github.com/bureado/792037b71229db3c37975e70e8a9c54a)"
package managers, in this blog post I'll write what these two technologies are,
why they are important for different uses and how to get involved with it.
This is a developer focused article, so much of the language used will be
targeted at developers.

## What

### Nix

Nix is a technology made of a language, package manager and ... . 

The nix language can be compared to .spec and PKGBUILD files with one key
difference: it is much more powerful! Instead of simply giving build and
install instructions, the nix language allows the community to develop
extensions/libraries for the language (see [flake-utils](https://github.com/numtide/flake-utils)),
forks to reuse packaging instructions from main packages (see [librewolf packaging](https://github.com/NixOS/nixpkgs/tree/master/pkgs/applications/networking/browsers/firefox/librewolf)),
modifying software (see [overrides](https://nixos.org/guides/nix-pills/nixpkgs-overriding-packages.html)
and much more that I might not know. 

The nix package manager is a lot like rust's [cargo](https://doc.rust-lang.org/cargo/getting-started/first-steps.html)
and javascript's [npm](https://www.npmjs.com/), with one key difference: It is
much more powerful! The nix package manager doesn't manage programs written in
nix, instead it manages any program that has been packaged with it, they can
be written in python, C, rust, bash and/or any other language. Furthermore,
with [flakes](https://nixos.wiki/wiki/Flakes) it will be able to manage even
non-nix "packages".

### Flatpak

![image from flatpak.org](/images/flattruck.png)

Flatpak, from the [docs](https://docs.flatpak.org/en/latest/introduction.html),
is "_a system for building, distributing, and running sandboxed desktop
applications on Linux._". The way this is done is by having two
sets of tools, namely: flatpak-builder (to package programs) and flatpak
(to manage packages), one for packagers, the other for users.

## Why

When talking about "post-modern" package managers, many have the concern that
this they are an over-complication from the traditional packaging systems
(normally accompanied by [this comic XD](https://xkcd.com/927/)), however
this not true, in the following sections I'll explain when and why to use
Nix or Flatpak.

### Nix

#### As a project dependency manager

One of the best things about nix is how it can be used as a package
manager for single projects. Long gone are the days of wasting time looking for
dependencies only to be greeted with a "requires version x or newer"
error message, now you can write a shell.nix, default.nix or flake.nix file
and have nix handle all dependencies for you and contributors to your project!

Also, it's very simple to write a shell.nix file (to get started with nix),
see the example below:
```
{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    nativeBuildInputs = with pkgs; [ 
      nodejs
      pandoc
      parallel
      gnused
    ];
}
```
This is the shell.nix file for this website, what it does is: open a shell
where nodejs, pandoc, parallel and sed are installed. In this example
there is no version fixing (for good reason, it's not needed ;) ).

This was very useful to setup a similar development environment across
developers in a startup I've been working with. Me and one other developer
were having trouble running a part of the code written by yet another developer,
in my system (Ubuntu 20.04) nodejs was too old and on his system nodejs was
too recent, there were also problems setting up pip-env on this project as well;
the solution? [A nix-shell that installed a specific nodejs version and
python dependencies](https://nixos.wiki/wiki/Python#Emulating_virtualenv_with_nix-shell)!

#### As a cli user package manager

Nix is an ideal way to install system- or user-wide command-line applications.
There are three things that nix has that can be very useful for command-line
applications (and therefore users):
1. Modification of packages
2. Ease of redistribution
3. Multiple versions of the same package installed simultaneously

Modification of packages. [Dotfiles](https://medium.com/@webprolific/getting-started-with-dotfiles-43c3602fd789)
have been the way most software allows modifications, there are [exceptions](https://suckless.org/hacking/),
regardless nix allows these customisations to be done in different ways:
[modules](https://nixos.wiki/wiki/Module) (which are options that the packager
exposes to the user) and [overrides](https://nixos.org/guides/nix-pills/nixpkgs-overriding-packages.html)
(which overrides how the package was packaged initially).

Ease of redistribution. This is useful for both distro hoppers that want to
keep their configurations across systems and people that have really cool
[configurations](https://github.com/skwp/dotfiles) and want to share with others.
What is of use knowledge/art if it's not shared?

Multiple versions of the same package. Maybe you want to test someone's configuration,
or edit your own vim configuration without breaking your current editor (vim),
this is where multiple versions of the same package are very useful! You can
have your current vim configuration aliased to `vim` and your testing
configuration to `asdf-vim` or similar.

This has become easier and easier with [home-manager](https://github.com/nix-community/home-manager)
allowing you to configure dotfiles even from non-nix programs, furthermore
it's easy to install! See how I install [mine](https://github.com/GustavoPeredo/nix-home-manager-config):
```
nix build --no-link github:GustavoPeredo/nix-home-manager-config#homeConfigurations.gustavo.activationPackage
```
```
"$(nix path-info github:GustavoPeredo/nix-home-manager-config#homeConfigurations.gustavo.activationPackage)"/activate
```
done.

### Flatpak

#### Code once, distribute everywhere

This is the key difference of flatpak, it allows the developer to develop once
and distribute the app everywhere with certainty that it will work the same
on every other computer. That's it, this allows more focus and contribution
to development rather than to packaging/solving distro specific bugs.

## How to get started with nix and/or flatpak

### Nix

The best way to start learning Nix is by tinkering (imo), a good start
would be by installing NixOS in a virtual machine or by tinkering with
other people's flakes. Useful places to find information are the official docs
and wiki:
* [Nix manual](https://nixos.org/manual/nix/stable/)
* [Nixpkgs manual](https://nixos.org/manual/nixpkgs/stable/)
* [Nix Wiki](https://nixos.wiki/wiki/)
That said, you may find the documentation a bit lacking
(a problem also expressed in this [talk](https://www.youtube.com/watch?v=qjq2wVEpSsA)),
so I also suggest taking a look at:
* [Nixpkgs git (a lot of packaging examples)](https://github.com/NixOS/nixpkgs/tree/master/pkgs/)
* [Other people configurations](https://github.com/notusknot/dotfiles-nix)

### Flatpak

The flatpak docs are simple and clear:
* [Getting Started Flatpak](https://docs.flatpak.org/en/latest/getting-started.html)
And this video by Egee is simply chef's kiss:
* [How to create Flatpaks with Gnome Builder IDE on Manjaro](https://www.youtube.com/watch?v=DuVfDQUdLWU)

## Bonus

### Further Reading

* Nix
  * [How nix works](https://nixos.org/guides/how-nix-works.html)
  * [Install nix in immutable linux systems](https://github.com/nix-community/nix-user-chroot)

* Flatpak
  * [Flatkill (famous website agains flatpaks)](https://flatkill.org/)
  * [Response to Flatkill (the other side of the argument)](https://theevilskeleton.gitlab.io/2021/02/11/response-to-flatkill-org.html)

### Suggestions? Comments? Improvements?

Feel free to e-mail me! Or to open a pull request on [github](https://github.com/GustavoPeredo/Website")

-----

This got very dense, so I might do a video about it.
