import Head from 'next/head'
import { getBlogs, getBlogColor, getBlogData, getBlogBanner } from '../blogs'

export async function getStaticPaths() {
	const paths = getBlogs().map(blog => {
		return { params: { blog: blog }}
	})
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps(context) {
	const [blogName, blogContents] = getBlogData(
		context.params.blog)
	const blogBanner = getBlogBanner(context.params.blog)
	const blogColor = getBlogColor(context.params.blog)
	return {
		props: {
			blogName,
			blogContents,
			blogBanner,
			blogColor
		}
	}
}

function Page(props) {
	const color_var = {"--color": "var(--" + props.blogColor + ")"};
	return <div> 
		<Head>
			<title>{props.blogName}</title>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
		<main >
			<img
				id="banner"
				src={props.blogBanner}
				alt={props.blogName}
			/>
			<div
				id="text" 
				style={ color_var }
				dangerouslySetInnerHTML={{ __html: props.blogContents }}
			/> 
		</main>
	</div>
}

export default Page;
