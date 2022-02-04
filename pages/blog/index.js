import Head from 'next/head'
import Link from 'next/link'
import { getBlogs, getBlogColor, getBlogData, getBlogBanner } from '../blogs'

export async function getStaticProps() {
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
			blogMaps
		}
  	}
}

export default function Page(props) {
  return (
	<div>
	<Head>
		<title>Blog</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>
	<main>
	<div id="text">
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
	</div>
	</main>
	</div>
  )
}
