import Head from 'next/head'
import Image from 'next/image'
import path from 'path'
import fs from 'fs'

export async function getStaticPaths() {
	const postsDirectory = path.join(process.cwd(), '_pages/rendered')
  	const files = fs.readdirSync(postsDirectory)
	const paths = files.map(file => {
    		const filePath = path.join(postsDirectory, file)
		const fileName = path.basename(filePath, path.extname(filePath))
		return {
			params: {
				project: fileName,
			}
    		}
	})

	return {
		paths: paths,
		fallback: false
	}
}

export async function getStaticProps(context) {
	// Get banner
	const imagePath = 'public/images/banners/'

	const imageFiles = fs.readdirSync(imagePath)
	const projectBanner = imagePath.split("public")[1] + imageFiles.find(file => {
		return file.includes(context.params.project)
	})

	// Get HTML
	const textPath = '_pages/rendered/'
	
	const textFiles = fs.readdirSync(textPath)
	const projectFile = textPath + textFiles.find(file => {
		return file.includes(context.params.project)
	})

	const projectContents = fs.readFileSync(projectFile, 'utf8')
	const projectName = projectContents.split('\n')[0].split(">")[1].split("<")[0]
	return {
		props: {
			projectName: projectName,
			projectContents: projectContents,
			projectBanner: projectBanner
		}
	}
}

function Page(props) {
	return <div> 
		<Head>
			<title>{props.projectName}</title>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
		<main>
			<img
				id="banner"
				src={props.projectBanner}
				alt={props.projectName}
			/>
			<div id="text" dangerouslySetInnerHTML={{ __html: props.projectContents }}/> 
		</main>
	</div>
}

export default Page;
