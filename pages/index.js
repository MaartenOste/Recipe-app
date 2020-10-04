import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GraphQLClient } from 'graphql-request'

export default function Home({ recipes }) {
  console.log(recipes);

  return (
    <div className={styles.container}>
      <Head>
        <title>My favourite recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.recipe__container}>
        {
          recipes.map((recipe) => (
            <div className={styles.recipe} key={recipe.id}>
              <img className={styles.recipe__photo} src={recipe.foto.url + "?w=200"} alt={recipe.foto.alt}></img>
              <div className={styles.recipe__name}>{recipe.recipeName}</div>
            </div>
          ))
        }
        </div>
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
const HOMEPAGE_QUERY = `query MyQuery {
  allRecipes {
    id
    recipeName
    ingredients {
      id
      name
      amount
    }
    foto {
      id
      url
      alt
    }
  }
}`
export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer 76053cf513ef437fff9ac831dabab3`
    }
  })
  return client.request(query, variables)
}

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: {}
  });

  console.log(data);
  return {
    props: {
      recipes: data.allRecipes,
    },
  }
}