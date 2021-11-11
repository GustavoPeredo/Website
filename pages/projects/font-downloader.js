import Head from 'next/head'

export default function Home() {
  return (
	<div>
	<Head>
		<title>Font Downloader</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>
	<main>
<h1>
Font Downloader
</h1>
<figure>
<img src="https://github.com/GustavoPeredo/Font-Downloader/actions/workflows/build.yml/badge.svg" alt="master" /><figcaption aria-hidden="true">master</figcaption>
</figure>
<h2 id="about">About</h2>
One day I was bored of my terminal font and wanted to switch, unfortunately going through the entire process of searching Google Fonts for a font, then downloading, then copying and pasting it into my .fonts folder to only then test a font was a pain. So I decided to create this app!
<div data-align="right">
&lt;a href=&#39;https://flathub.org/apps/details/org.gustavoperedo.FontDownloader&#39;&gt;&lt;img width=&#39;240&#39; alt=&#39;Download on Flathub&#39; src=&#39;https://flathub.org/assets/badges/flathub-badge-en.png&#39;/&gt;&lt;/a&gt;
</div>
<h2 id="screenshots">Screenshots</h2>
<p><img src="https://raw.githubusercontent.com/GustavoPeredo/font-downloader/master/data/screenshots/entire.png" /> <img src="https://raw.githubusercontent.com/GustavoPeredo/font-downloader/master/data/screenshots/compact.png" /> <img src="https://raw.githubusercontent.com/GustavoPeredo/font-downloader/master/data/screenshots/dark_entire.png" /> <img src="https://raw.githubusercontent.com/GustavoPeredo/font-downloader/master/data/screenshots/dark_compact.png" /></p>
<h2 id="how-to-compile">How to compile</h2>
<p>If you use GNOME Builder, simply cloning the project is enough, otherwise you need to install libhandy as a dependency.</p>
<p>Dependencies in Fedora:</p>
sudo dnf install cmake meson ninja 
sudo dnf install libhandy1-dev
<p>Then build using meson:</p>
git clone https://github.com/GustavoPeredo/font-downloader.git
cd font-downloader
mkdir build
meson build .
cd build
ninja
ninja install
<p>To run it from terminal:</p>
fontdownloader
<h2 id="translations">Translations!</h2>
<p>They are here and need your help! Don’t be afraid to open an issue or contribute to the translations here: <a href="https://poeditor.com/join/project?hash=hfnXv8Iw4o">https://poeditor.com/join/project?hash=hfnXv8Iw4o</a></p>
<h2 id="special-thanks">Special thanks</h2>
<p>For all the contributers, translators, atareao (fsync) and Selenium.H (theme)</p>
<div data-align="center">
&lt;p&gt;&lt;b&gt; Proudly part of the GNOME Circle &lt;/b&gt;&lt;/p&gt;
&lt;a href=&#39;https://circle.gnome.org/&#39;&gt;&lt;img width=&#39;240&#39; alt=&#39;GNOME Circle&#39; src=&#39;https://gitlab.gnome.org/Teams/Circle/-/raw/master/assets/button/circle-button-fullcolor.svg&#39;/&gt;&lt;/a&gt;
</div>
		</main>
		</div>
	)
}

