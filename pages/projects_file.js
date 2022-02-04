import fs from 'fs'
import path from 'path'

export function getProjects() {
	const postsDirectory = path.join(process.cwd(), '_pages/rendered/projects/')
  	const files = fs.readdirSync(postsDirectory)
	return files.map(file => {
    		const filePath = path.join(postsDirectory, file)
		const fileExt = path.extname(filePath)
		if (fileExt != "") {
			const fileName = path.basename(filePath, fileExt)
			return fileName
		}
	})
}

export function getColor(project) {
	var color = "black"
	switch (project) {
		case "font-catcher":
			color = "orange"
			break
		case "font-downloader":
			color = "green"
			break
		default:
			color = "black"
			break
	}
	return color
}

export function getProjectData(project) {
	const textPath = '_pages/rendered/projects/'
	
	const textFiles = fs.readdirSync(textPath)
	const projectFile = textPath + textFiles.find(file => {
		return file.includes(project)
	})

	const projectContents = fs.readFileSync(projectFile, 'utf8')
	const projectName = projectContents.split('\n')[0].split(">")[1].split("<")[0]
	return [projectName, projectContents]
}

export function getBanner(project) {
	const imagePath = 'public/images/banners/'

	const imageFiles = fs.readdirSync(imagePath)
	const projectBanner = imagePath.split("public")[1] + imageFiles.find(file => {
		return file.includes(project)
	})
	return projectBanner
}
