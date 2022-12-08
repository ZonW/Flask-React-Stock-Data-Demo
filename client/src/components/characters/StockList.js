
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import SearchStocks from './SearchStocks';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import '../../App.css';

const useStyles = makeStyles({
	card: {
		maxWidth: 250,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	media: {
		height: '100%',
		width: '100%'
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12
	}
});
const StockList = () => {
	const classes = useStyles();
	const [ searchData, setSearchData ] = useState(undefined);
	const [ searchTerm, setSearchTerm ] = useState('');
	let card = null;

	useEffect(
		() => {
			console.log('search useEffect fired');
			async function fetchData() {
				try {
					console.log(`in fetch searchTerm: ${searchTerm}`);
					const { data } = await axios.get('http://localhost:8000/quote?symbol=' + searchTerm);
					//console.log(data)
					setSearchData([data]);
					
				} catch (e) {
					console.log(e);
				}
			}
			if (searchTerm) {
				console.log ('searchTerm is set')
				fetchData();
			}
		},
		[ searchTerm ]
	);



	const searchValue = async (value) => {
		setSearchTerm(value);
	};

	const buildCard = (stock) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={stock.symbol}>
				<Card className={classes.card} variant='outlined'>
					<CardActionArea>
						<Link to={`/stocks/${stock.symbol}`}>
							<CardContent>
								<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
									{stock.symbol}
								</Typography>
								<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
									{stock.shortName}
								</Typography>
								<Typography variant='body2' color='textSecondary' component='p'>
									Price: ${stock.ask}
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	if (searchTerm) {
		card =
			searchData &&
			searchData.map((char) => {
				return buildCard(char);
			});
	}

	
		return (
			<div>
				<SearchStocks searchValue={searchValue} />
				<br />
				<br />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	};

export default StockList;
