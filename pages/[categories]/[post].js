import Head from 'next/head'
import Link from 'next/link'

import fs from 'fs'
import { getPosts, getPostMap } from './index'

import data from "/website.json"

export async function getStaticPaths() {
	const paths = fs.readdirSync(data.pages_directory).map(categories => {
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
        context.params.post,
    ); 
	return {
		props: {
            post
		}
	}
}

export default function Page(props) {
	return (<div>
		<Head>
			<title>{props.post.name}</title>
		</Head>
		<div className={props.post.color}>
		/<Link href="/">home</Link>/<Link href={"/" + props.post.category}>{props.post.category}</Link>/{props.post.post}
		</div>
		<main>
			<img
				id="banner"
				src={props.post.banner}
				alt={props.post.name}
			/>
			<div
				id="main-text"
				className={props.post.color}
				dangerouslySetInnerHTML={{ __html: props.post.content }}
			/> 
		</main>
	</div>)
}
