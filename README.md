# node-movie-api
Node.JS - Movie API

# Movies

| Route        | HTTP Verb           | POST body  | Description |
| :-------------: |:-------------:| :-----:|:--------:|
| /api/movies     | GET | Empty | List all movies. |
| /api/movies     | POST | {'title':'John', 'category':'Doe', 'country':'Turkey', year:1992, director:"id", imdb_score: 9.4 } | Create a new movie. |
| /api/movies/:movie_id     | GET | Empty | Get a movie. |
| /api/movies/:movie_id     | PUT | {'name':'John', 'surname':'Doe'} | Update the movie's information. |
| /api/movies/:movie_id     | DELETE | Empty | Delete a movie. |
| /api/movies/top10   | GET | Empty | Get the top 10 movies. |
| /api/movies/between/:start_year/:end_year    | GET | Empty | Movies between two dates. |


# Directors

| Route        | HTTP Verb           | POST body  | Description |
| :-------------: |:-------------:| :-----:|:--------:|
| /api/directors    | GET | Empty | List all directors. |
| /api/directors    | POST | { name: 'John', surname:'Doe', bio:' Best Director' } | Create a new director. |
| /api/directors/:director_id   | GET | Empty | Get a director. |
| /api/directors/:director_id     | PUT | {'name':'John', 'surname':'Doe', 'bio': 'Best Director'} | Update the director's information. |
| /api/directors/:director_id     | DELETE | Empty | Delete a director. |
| /api/directors/:director_id/best10movie  | GET | Empty | 	The director's top 10 films. |

# Index

| Route        | HTTP Verb           | POST body  | Description |
| :-------------: |:-------------:| :-----:|:--------:|
| /register    | POST | { username: 'John', password:'123123' } | Create a new user. |
| /authenticate    | POST | { username: 'John', password:'123123' } | Generate a token. |


