import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ recipes }) {
  console.log(recipes[0].foto);

  return (
    <div className={styles.container}>
      <Head>
        <title>My favourite recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          recipes.map((recipe) => (
            <div className="recipe" key={recipe.id}>
              <div className="recipe__name">{recipe.recipeName}</div>
              <img src="https://www.datocms-assets.com/35454/2769679-Pasta with scampi in tomato cream sauce.jpg"></img>
            </div>
          ))
        }
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}


export async function getStaticProps() {
  const { SiteClient } = require("datocms-client");
  const client = new SiteClient("76053cf513ef437fff9ac831dabab3");
  const recipes = await client.items.all({
      'filter[type]':'323133',
  });
  return {
    props: {
      recipes: recipes,
    },
  }
}