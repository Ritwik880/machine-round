import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


const MovieSearch = () => {


    const API_KEY = `340aba0c93c2294e47cca47b13a0fe58`
    const url = `https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=${API_KEY}`;

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)



    const getMovies = async (link) => {
        setLoading(true);
        try {
            const response = await fetch(link);
            const data = await response.json();
            console.log(data);
            setItems(data.results);
            setTotalPage(data.total_results)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getMovies(url)
    }, [currentPage])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    return (
        <>
            {
                loading ? <div className='preloader'><h1 className='loader-heading'>Loading....</h1></div> :


                    <Box className='outer-div'>
                        <Grid container spacing={3} sx={{ display: 'flex', paddingTop: '20' }}>
                            {
                                items.map((item, id) => {
                                    return (


                                        <Grid item xs={4} pt={4} key={id}>
                                            <Card sx={{ minWidth: 275, minHeight: 280 }}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Movie Id: {item.id}
                                                    </Typography>

                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        Movie Title:
                                                        {
                                                            item.original_title
                                                        }
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Movie About:
                                                        {
                                                            item.overview
                                                        }
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>

                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>

            }

            <div className='card'>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous Page
                </button>

                <span>
                    Page {currentPage} of {totalPage}
                </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPage}>
                    Next Page
                </button>

            </div>
        </>

    )
}

export default MovieSearch