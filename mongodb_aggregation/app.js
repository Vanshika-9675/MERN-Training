const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/movies";

const mydb = async () => {
    try {
      const client = new MongoClient(url);
  
      await client.connect();
      const movies = client.db("movies");
      const mydata = movies.collection("mydata");
  
      // call any of the below 15 functions here to get the results 
      const pipeline  = countMovies();

      const result = await mydata.aggregate(pipeline).toArray();
      console.log(result);
  
    } catch (error) {
      console.log(error);
      console.log("Internal server error");
    }
  };
  mydb();
  

//PIPELINES 

//1. fuction returning pipeline for counting total number of movies
const countMovies = () => {
  return [
    {
      $group: {
        _id: null,
        Moviescount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        Moviescount: 1,
      },
    },
  ];
};

//2. pipeline to return year of all the movies
const years = () => {
  return [
    {
      $group: {
        _id: "$year",
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id",
      },
    },
  ];
};

//3. Find the movie with the highest IMDb rating
const highestImdb = () => {
  return [
    {
      $sort: {
        "imdb.rating": -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: { _id: 0, title: 1 },
    },
  ];
};


//4. listing movies with runtime less than 20 minutes
const runtime = ()=>{
   return [
    {
        $match:
        {
            "runtime": { $lt: 20 }
        }  
   },
   {
        $project: {
          "_id": 0,
          "title": 1,
          "runtime": 1
        }   
   }
   ]
}

//5. top three movies with their plots
const bestMovies =()=>{
    return [
        {
          $sort: { "imdb.rating": -1 }
        },
        {
          $limit: 3
        },
        {
          $project: {
            "_id": 0,
            "title": 1,
            "plot": 1,
            "imdb.rating": 1
          }
        }
      ]
}

//6. finding everage runtime of the movies
const avgRuntime = ()=>{
    return [
        {
          $group: {
            _id: null,
            averageRuntime: { $avg: "$runtime" }
          }
        },
        {
            $project: {
              _id: 0,
              averageRuntime: 1,
            },
        }
    ]
}

//7. count the number of movies for each genre
const eachGenreMovies =()=>{
    return [
          {
            $unwind: "$genres"
          },
          {
            $group: {
              _id: "$genres",
              count: { $sum: 1 }
            }
          }
    ]
}

//8. finding oldest movie in the dataset
const oldestMovie = ()=>{
    return [
        {
            $sort: { "year": 1 }
          },
          {
            $limit: 1
          },
          {
            $project: {
              "_id": 0,
              "title": 1,
              "year": 1
            }
          }
    ]
}

//9. directos with the number of movies they directed
const directedmovies =()=>{
    return [
        {
          $unwind: "$directors"
        },
        {
          $group: {
            _id: "$directors",
            count: { $sum: 1 }
          }
        }
      ]
}

// 10. list the directors who have directed more than one movie.
const directedMoreThanOne = ()=>{
    return [
          {
            $unwind: "$directors"
          },
           {
            $group: {
                _id: "$directors",
                count: { $sum: 1 }
              }
            },
            {
              $match: {
                count: { $gt: 1 }
              }
            },
            {
              $project: {
                _id: 1
              }
            }
          
    ]
}

//11. finding newest movie in the dataset

const newestMovie = ()=>{
    return [
        {
            $sort: { "year": -1 }
          },
          {
            $limit: 1
          },
          {
            $project: {
              "_id": 0,
              "title": 1,
              "year": 1
            }
          }
    ]
}

//12. movie with lowest imdb votes
const lowestvotes = ()=>{
    return [
        {
          $sort: { "imdb.votes": 1 }
        },
        {
          $limit: 1
        },
        {
          $project: {
            "_id": 0,
            "title": 1,
            "imdb.votes": 1
          }
        }
      ]
}

//13. top contry with most movies released
const topContryWithMostMovies =()=>{
    return [
        {
          $unwind: "$countries"
        },
        {
          $group: {
            _id: "$countries",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: 1
        }
      ]
}

//14. longest title length movie

const longestTitle = ()=>{
    return [

            {
              $project: {
                _id: 0,
                title: 1,
                titleLength: { $strLenCP: "$title" }
              }
            },
            {
              $sort: { titleLength: -1 }
            },
            {
              $limit: 1
            }
    
    ]
}


//15. shortest title length movie

const shortestTitle = ()=>{
    return [

            {
              $project: {
                _id: 0,
                title: 1,
                titleLength: { $strLenCP: "$title" }
              }
            },
            {
              $sort: { titleLength: 1 }
            },
            {
              $limit: 1
            }
    ]
}


