import Head from 'next/head'
import Link from 'next/link'

import fs from 'fs'
import path from 'path'

import data from "/website.json"

function getColor(post) {
	if (!(post in data.posts_colors)) {
		return data.dafault_post_color;
	}
	return data.posts_colors[post];
}

function getBanner(post) {
	const imagePath = data.banners_directory;

	const imageFiles = fs.readdirSync(imagePath);
	const projectBanner = imagePath.split("public")[1] + "/" + imageFiles.find(file => {
		return path.basename(file, path.extname(file)) === post;
	})
	return projectBanner
}

function getData(category, post) {
	const postFile = `${data.pages_directory}/${category}/${post}.html`;
	
	const postContent = fs.readFileSync(postFile, 'utf8');
	const postDate = fs.statSync(postFile
									.replace("rendered\/", "")
									.replace("html", "md")
								).ctime.toString();
	const postName = postContent.split('\n')[0].split(">")[1].split("<")[0];
	return [postName, postContent, postDate];
}

export function getPostMap(category, post) {
    const [name, content, date] = getData(category, post);
	const short_content = content.split("<p>")[1].split("</p>")[0].split(" ").slice(0,32).join(" ") + " >>";
	const color = getColor(post);
	const banner = getBanner(post);
	return {
		name,
		date,
		short_content,
        content,
		color,
		banner,
		category,
		post: post,
	}
}

export function getPosts(category) {
	const postsDirectory = path.join(`${data.pages_directory}/${category}/`);
  	const files = fs.readdirSync(postsDirectory);
	return files.map(file => {
    	const filePath = path.join(postsDirectory, file);
		const fileExt = path.extname(filePath);
		if (fileExt === ".html") {
			const fileName = path.basename(filePath, fileExt);
			return fileName;
		}
	});
}

function postMaps(category) {
    const posts = getPosts(category);
	const postsMap = posts.map((post) => {
		return getPostMap(category, post);
	}).sort(
		(a,b) => { return (new Date(b.date) - new Date(a.date)); }
	);
	return postsMap;
}

export async function getStaticPaths() {
	const paths = fs.readdirSync(data.pages_directory).map(categories => {
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
	</Head>
	/<Link href="/">home</Link>/{props.category}
	<br/>
	<br/>
	<main>
	<div id="main-text">
		<h2 className="capitalize">
			{props.category}
		</h2>
		<div className="scroller">
		{props.postsMap.map(postMap => 
			<Link href={`/${props.category}/` + postMap.post}><a>
			<div className={'box ' + postMap.color}>
				<img loading="lazy" src={postMap.banner}/>
				<div>
					<h3>{postMap.name}</h3>
					<p dangerouslySetInnerHTML={{ __html: postMap.short_content }}/>
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
