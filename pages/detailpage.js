import Head from 'next/head';
import styles from '../styles/Detailpage.module.css';
import Link from 'next/link';
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

export default function DetailPage(recipe) {
	return (
	  <div className={styles.container}>
		<Head>
		<title>{recipe.recipeName}</title>
		  <link rel="icon" href="/favicon.ico" />
		</Head>
  
		<main className={styles.main}>
		<div className={styles.recipe__container}>
			<Link href="/" >
				<div className={styles.homebutton}>
					<div className={styles.homebutton__image}></div>
					<div className={styles.homebutton__text}> return home</div>
				</div>
			</Link>
			<div className={styles.recipe__name}>{recipe.recipeName}</div>
				<div className={styles.recipe__subtitle}>
					Ingredients
				</div>
				<div className={styles.recipe__content}>
					<div >
						{
							recipe.ingredients.map((ingredient) => (
								<div className={styles.ingredient} key={ingredient.id}>
									<div className={styles.ingredient__name}>{ingredient.name}</div>
									<div className={styles.ingredient__amount}>{ingredient.amount}</div>
								</div>
							))
						}
					</div>
					<img className={styles.recipe__photo} src={recipe.foto.url}></img>
				</div>
				<div className={styles.recipe__subtitle}>
					Instructions
				</div>
				<div className={styles.recipe__instruction}>
						{recipe.instruction}
				</div>
		</div>
		</main>
  
		<footer className={styles.footer}>
		  Created by Maarten Oste 
		</footer>
	  </div>
	)
  }

DetailPage.getInitialProps = async ({query}) => {
	const DETAILPAGE_QUERY = `query MyQuery {
		allRecipes(filter: {id: {eq: ${query.id}}}) {
		  id
		  recipeName
		  instruction
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
	  }`;

	const data = await request({
		query: DETAILPAGE_QUERY,
		variables: {}
	  });
	const recipe = data.allRecipes[0];
	return recipe;
}