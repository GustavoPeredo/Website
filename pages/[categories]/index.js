import Head from 'next/head'
import Link from 'next/link'

import fs from 'fs'
import path from 'path'

function getColor(post) {
	var color = "black"
	switch (post) {
		case "font-catcher":
			color = "orange";   
			break;
		case "font-downloader":
			color = "green";
			break;
		default:
			color = "black";
			break;
	}
	return color;
}

function getBanner(post) {
	const imagePath = 'public/images/banners/';

	const imageFiles = fs.readdirSync(imagePath);
	const projectBanner = imagePath.split("public")[1] + imageFiles.find(file => {
		return path.basename(file, path.extname(file)) === post;
	})
	return projectBanner
}

function getData(category, post) {
	const textPath = `_pages/rendered/${category}/`;
	
	const textFiles = fs.readdirSync(textPath);
	const postFile = textPath + textFiles.find(file => {
		return file.includes(post);
	});

	const postContent = fs.readFileSync(postFile, 'utf8');
	const postName = postContent.split('\n')[0].split(">")[1].split("<")[0];
	return [postName, postContent];
}

export function getPostMap(category, post) {
    const [name, content] = getData(category, post)
	const short_content = content.split("<p>")[1].split("</p>")[0]
	const color = getColor(post)
	const banner = getBanner(post)
	return {
		name,
		short_content,
        content,
		color,
		banner,
		post: post,
	}
}

export function getPosts(category) {
	const postsDirectory = path.join(process.cwd(), `_pages/rendered/${category}/`);
  	const files = fs.readdirSync(postsDirectory);
	return files.map(file => {
    	const filePath = path.join(postsDirectory, file);
		const fileExt = path.extname(filePath);
		if (fileExt != "") {
			const fileName = path.basename(filePath, fileExt);
			return fileName;
		}
	});
}

function postMaps(category) {
    const posts = getPosts(category);
	const postsMap = posts.map(post => {
		return getPostMap(category, post);
	});

	return postsMap;
}

export async function getStaticPaths() {
	const paths = fs.readdirSync("_pages/rendered/").map(categories => {
		return { params: { categories: categories}}
	})
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps(context) {
    const category = context.params.categories;
    const postsMap = postMaps(category);
    return {
        props: {
            postsMap,
            category,
        }
    }
}

export default function Page(props) {
  return (
	<div>
	<Head>
		<title>{props.category}</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>
	<main>
	<div id="text">
		<h2 className="capitalize">
			{props.category}
		</h2>
		<div className="scroller">
		{props.postsMap.map(postMap => 
			<Link href={`/${props.category}/` + postMap.post}><a>
			<div className={'box ' + postMap.color}>
				<img src={postMap.banner}/>
				<div>
					<h3>{postMap.name}</h3>
					<p 
						dangerouslySetInnerHTML={{ __html: postMap.short_content }}
					/>
				</div>
			</div>
			</a></Link>
		)}
		</div>
	</div>
	</main>
	</div>
  )
}
