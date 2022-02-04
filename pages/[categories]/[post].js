import Head from 'next/head'
import fs from 'fs'
import { getPosts, getPostMap } from './index'

export async function getStaticPaths() {
	const paths = fs.readdirSync("_pages/rendered/").map(categories => {
        return getPosts(categories).map(post => {
            return {params: {
                categories: categories,
                post: post
            }};
        });
	}).flat();
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps(context) {
    const post = getPostMap(
        context.params.categories,
        context.params.post
    ); 
	return {
		props: {
            post
		}
	}
}

export default function Page(props) {
	const color_var = {"--color": "var(--" + props.post.color + ")"};
	return <div> 
		<Head>
			<title>{props.post.name}</title>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
		<main>
			<img
				id="banner"
				src={props.post.banner}
				alt={props.post.name}
			/>
			<div
				id="text" 
				style={ color_var }
				dangerouslySetInnerHTML={{ __html: props.post.content }}
			/> 
		</main>
	</div>
}