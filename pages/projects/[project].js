import Head from 'next/head'
import { getProjects, getColor, getProjectData, getBanner } from '../projects'

export async function getStaticPaths() {
	const paths = getProjects().map(project => {
		return { params: { project: project }}
	})
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps(context) {
	const [projectName, projectContents] = getProjectData(
		context.params.project)
	const projectBanner = getBanner(context.params.project)
	const projectColor = getColor(context.params.project)
	return {
		props: {
			projectName,
			projectContents,
			projectBanner,
			projectColor
		}
	}
}

function Page(props) {
	const color_var = {"--color": "var(--" + props.projectColor + ")"};
	return <div> 
		<Head>
			<title>{props.projectName}</title>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
		<main >
			<img
				id="banner"
				src={props.projectBanner}
				alt={props.projectName}
			/>
			<div
				id="text" 
				style={ color_var }
				dangerouslySetInnerHTML={{ __html: props.projectContents }}
			/> 
		</main>
	</div>
}

export default Page;
