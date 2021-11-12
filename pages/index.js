import Head from 'next/head'
import Link from 'next/link'
import { getProjects, getColor, getProjectData, getBanner } from './projects'

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

	return {
		props: {
			projectMaps
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
			
		</div>
		<h2>
			Projects
		</h2>
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
	  	<div className="scroller"></div>
		<h2>
			About me
		</h2>
		<div className="huge-box green"></div>
		
	</div>
	</main>
	</div>
  )
}
