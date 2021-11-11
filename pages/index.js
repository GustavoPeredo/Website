import Head from 'next/head'

export default function Home() {
  return (
	<div>
	<Head>
		<title>Gustavo Machado Peredo</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>
	<main>
        	<h1>
          		Gustavo Machado Peredo
        	</h1>
	  	<h4>
	  		My Website :)
		</h4>
		<h2>
			Blog
		</h2>
	  	<div className="scroller"></div>
		<h2>
			Projects
		</h2>
	  	<div className="scroller"></div>
		<h2>
			About me
		</h2>
		<div className="huge-box green"></div>
		
	</main>
	</div>
  )
}
