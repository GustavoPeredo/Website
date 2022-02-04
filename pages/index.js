import Head from 'next/head'
import Link from 'next/link'
import { getProjects, getColor, getProjectData, getBanner } from './projects_file'
import { getBlogs, getBlogColor, getBlogData, getBlogBanner } from './blogs'
import me from '../public/images/me.png'

export async function getStaticProps() {
	const projects = getProjects()
	const projectMaps = projects.map(project => {
		const [name, content] = getProjectData(project)
		const short_content = content.split("<p>")[1].split("</p>")[0]
		const color = getColor(project)
		const banner = getBanner(project)
		return {
			name,
			short_content,
			color,
			banner,
			project: project,
		}
	})
	const blogs = getBlogs()
	const blogMaps = blogs.map(blog => {
		const [name, content] = getBlogData(blog)
		const short_content = content.split("<p>")[1].split("</p>")[0]
		const color = getBlogColor(blog)
		const banner = getBlogBanner(blog)
		return {
			name,
			short_content,
			color,
			banner,
			blog: blog,
		}
	})

	return {
		props: {
			projectMaps,
			blogMaps
		}
  	}
}

export default function Home(props) {
  return (
	<div>
	<Head>
		<title>Gustavo Machado Peredo</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>
	<main>
	<div id="text">
        	<h1>
          		Gustavo Machado Peredo
        	</h1>
	  	<h4>
	  		My Website :)
		</h4>
		<h2>
			Blog
		</h2>
	  	<div className="scroller">
		{props.blogMaps.map(blogMap => 
			<Link href={'/blog/' + blogMap.blog}><a>
			<div className={'box ' + blogMap.color}>
				<img src={blogMap.banner}/>
				<div>
					<h3>{blogMap.name}</h3>
					<p 
						dangerouslySetInnerHTML={{ __html: blogMap.short_content }}
					/>
				</div>
			</div>
			</a></Link>
		)}
		</div>
		<h2>
			Projects
		</h2>
		<div className="scroller">
		{props.projectMaps.map(projectMap => 
			<Link href={'/projects/' + projectMap.project}><a>
			<div className={'box ' + projectMap.color}>
				<img src={projectMap.banner}/>
				<div>
					<h3>{projectMap.name}</h3>
					<p 
						dangerouslySetInnerHTML={{ __html: projectMap.short_content }}
					/>
				</div>
			</div>
			</a></Link>
		)}
	  	</div>
		<h2>
			About me
		</h2>
		<div className="huge-box green">
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
		
	</div>
	</main>
	</div>
  )
}
