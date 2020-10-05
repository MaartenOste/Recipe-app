import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { GraphQLClient } from 'graphql-request';

export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer 76053cf513ef437fff9ac831dabab3`
    }
  });
  return client.request(query, variables);
}

export default function Home({recipes}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>My favourite recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.homepage__heading}>
          <div className={styles.homepage__title}>
            My favourite recipes
          </div>
          <div className={styles.homepage__subtitle}>
            by Maarten Oste
          </div>
        </div>

        <div className={styles.recipe__container}>
        {
          recipes.map((recipe) => (
            <Link href={{pathname: '/detailpage', query: {id: recipe.id}}} key={recipe.id}>
              <div className={styles.recipe} >
                <img className={styles.recipe__photo} src={recipe.foto.url + "?w=200"} alt={recipe.foto.alt}></img>
                <div className={styles.recipe__name}>{recipe.recipeName}</div>
              </div>
            </Link>
          ))
        }
        </div>
      </main>

      <footer className={styles.footer}>
        Created by Maarten Oste 
      </footer>
    </div>
  )
}

Home.getInitialProps = async () => {
	const HOMEPAGE_QUERY = `query MyQuery {
    allRecipes {
      id
      recipeName
      foto {
        id
        url
        alt
      }
    }
  }`;

	const data = await request({
		query: HOMEPAGE_QUERY,
		variables: {}
    });
  let recipes = data.allRecipes;
  console.log(recipes);
	return {recipes};
}