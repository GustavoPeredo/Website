import fs from 'fs'
import path from 'path'

export function getBlogs() {
	const postsDirectory = path.join(process.cwd(), '_pages/rendered/blog/')
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

export function getBlogColor(blog) {
	var color = "black"
	switch (blog) {
		case "hello-world":
			color = "black"
			break
		default:
			color = "black"
			break
	}
	return color
}

export function getBlogData(blog) {
	const textPath = '_pages/rendered/blog/'
	const textFiles = fs.readdirSync(textPath)
	const blogFile = textPath + textFiles.find(file => {
		return file.includes(blog)
	})

	const blogContents = fs.readFileSync(blogFile, 'utf8')
	const blogName = blogContents.split('\n')[0].split(">")[1].split("<")[0]
	return [blogName, blogContents]
}

export function getBlogBanner(blog) {
	const imagePath = 'public/images/banners/'

	const imageFiles = fs.readdirSync(imagePath)
	const blogBanner = imagePath.split("public")[1] + imageFiles.find(file => {
		return file.includes(blog)
	})
	return blogBanner
}
