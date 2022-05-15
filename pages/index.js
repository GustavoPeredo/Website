import Head from 'next/head'
import Link from 'next/link'

import data from '/website.json'

export async function getStaticProps(params) {
	const prefix = (process.env.DEVEL === "yes" ? 'http://localhost:3000/' : 'https://gustavomachadoperedo.xyz/');
	const preview = await Promise.all(
		["blog", "projects"].map(async location => {
			const res = await fetch(prefix + location);
			let mod = "<div/>  ";
			if (res.status === 200) {
				const data = await res.text();
				mod = data.split("main>")[1];
			} 
			return {[location]: mod.substring(0, mod.length - 2)};
		})
	);
	return {props: {
		bg_color: data.default_color,
		preview
	}};
}

export default function Home(props) {
  return (
	<>
	<Head>
		<title>Gustavo Machado Peredo</title>
	</Head>
	<div id="main-text">
        	<h1 className={props.bg_color}>
          		Gustavo Machado Peredo
        	</h1>
	  	<h4>
	  		My Website :)
		</h4>
		{props.preview.map(category =>
			<div id={category} dangerouslySetInnerHTML={{__html: category[Object.keys(category)[0]]}}/>
		)}
		<AboutMe bg_color={props.bg_color}/>
	</div>
	</>
  )
}

function AboutMe(props) {
	return <>
		<h2>
			About me
		</h2>
		<div className={"box huge-box " + props.bg_color}>
			<img src='/images/me.png' className="center" style={{width: "196px"}}/>
			<h2>Interests</h2>

			<li>FOSS Enthusiast</li>
			<li>Learning new things</li>
			<li>Languages, Economics and Philosophy</li>

			<h2>Skills</h2>

			<h3>Interpersonal</h3>
			<li>Leadership</li>
			<li>Receiving Feedback</li>
			<li>Discipline</li>
			<li>Self-esteem</li>

			<h3>Software Development</h3>
			<li>
				<Link href="https://python.org">Python</Link>,
				 <Link href="https://rust-lang.org">Rust</Link>
				 and <Link href="https://www.w3.org/standards/webdesign/script">Javascript</Link>
				 programming languages.
			</li>
			<ul>Webdev frameworks: Django, React and NextJS</ul>
			<ul>Native software frameworks: QT and GTK</ul>
			<li>
				<Link href="https://nixos.org">Nix</Link>
				and <Link href="https://docker.com">Docker</Link>
				/<Link href="https://podman.io">Podman</Link>
				DevOps.
			</li>
			<ul>Experience with AWS deployments and various types of automation</ul>
			<li>Others: Shell scripting, api calls, git, linux, <Link href="https://flatpak.org">flatpak</Link> and SQL </li>

			<h3>Languages</h3>
			<li>Proficient</li>
			<ul>Portuguese (native)</ul>
			<ul>English <Link href="https://cambridgeenglish.org/exams-and-tests/advanced/">CAE</Link></ul>
			<li>Advanced</li>
			<ul>German <Link href="https://kmk.org/themen/deutsches-sprachdiplom-dsd.html">DSD II</Link></ul>
			<li>Beginner</li>
			<ul>French <Link href="https://fiaf.org/exams/delf-dalf/">DELF A2</Link></ul>
			<ul>Spanish (no certificate)</ul>

			<h3>Others</h3>
			<li>Image manipulation</li>
			<li>Vector drawing</li>
			<li>Video editing</li>

			<h2>Background</h2>

			<h3>Academic</h3>
			<li><Link href="https://oec.uzh.ch/de/studies/bachelor/it/wi.html">Economics and Informatics Student at the University of Zürich</Link></li>
			<ul>2020 - Current</ul>
			<li><Link href="https://chpr.aesb.com.br">Swiss School of Curitiba</Link></li>
			<ul>Average grade: 8/10 (school website)</ul>
			<ul>2016 - 2020</ul>
			<li><Link href="https://ibo.org/programmes/diploma-programme/">International Baccalaureate</Link></li>
			<ul>35/42 points</ul>
			<ul>2019 - 2020</ul>

			<h3>Experience</h3>
			<li>Fullstack Web Developer (<Link href="https://refluenced.ch">Refluenced</Link>)</li>
			<ul>Working with Django and PostgreSQL in the backend and React in the frontend</ul>
			<ul>2021-current</ul>
			<li>Software and Solutions Developer (<Link href="https://software.libellula.eu">Libellula do Brasil</Link>)</li>
			<ul>Worked with Powershell, C# and Python to
				automate CNC code generation.</ul>
			<ul>2021</ul>
			<li>Frontend Developer (<Link href="https://globalissuesnetwork.org">Global Issues Network</Link>)</li>
			<ul>Worked with React technologies on a website as volunteer</ul>
			<ul>2020-2021</ul>

			<h2>Other achievements and experiences</h2>

			<li>Best Speaker Award @ Salvador Model United Nations (2018)</li>
			<li>Student Council president (2016 and 2020)</li>
			<li>TEDxYouth@CHPR event organizer (2020)</li>
			<li>Global Issues Network Schweizerschule Curitiba member (2019-2020)</li>
			<li>Global Issues Network Brazil-Colombia Video Project Manager (2019)</li>
			<li>Volunteer as English teacher at Sociedade Crescer (2019)</li>
			<li>Font Downloader is part of the GNOME Circle initiative (2020)</li>
		</div>
	</>
}
