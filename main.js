let moviesList = document.querySelector('.movies-list'),
    allMovies = document.querySelector('.main-row h2 span'),
    viewedMoviesH3 = document.querySelector('.main-row h3 span');


const data = [
    { id: 1, name: 'Avengers: Age of Ultron', views: 765, viewed: false, like: false },
    { id: 2, name: 'Avengers: Infinity War', views: 978, viewed: true, like: false },
    { id: 3, name: 'Avengers: Endgame', views: 456, viewed: true, like: false },
];

data.forEach((movieItem) => {
    moviesList.innerHTML += `
        <div class="row movies-list-item ${movieItem.viewed && 'viewed'}" id='m${movieItem.id}'>
            <div class="col-6" >
                <h5 onClick="likeF(${movieItem.id})" movieId="${movieItem.id}">${movieItem.name}</h5>
            </div>
            <div class="col-3">
                <h5 movieId="${movieItem.id}">${movieItem.views}</h5>
            </div>
            <div class="col-3">
                <button class="btn btn-secondary viewedBtn" onClick="viewedF(${movieItem.id})" movieId="${movieItem.id}">Viewed</button>
                <button class="btn btn-secondary deleteBtn" onClick="deleteF(${movieItem.id})" movieId="${movieItem.id}">Delete </button>
                <button class="btn btn-secondary like">❤</button>
            </div>
        </div>
    `;
});



let movieName = document.querySelector('.movieName'),
    movieViews = document.querySelector('.movieViews'),
    addMovieBtn = document.querySelector('.addMovie');


addMovieBtn.addEventListener('click', (e) => {
    e.preventDefault();
    data.push({id: data[data.length - 1].id + 1, name: movieName.value, views:movieViews.value, viewed: false, like: false});
    let {id, name, views, viewed} = data[data.length - 1];

    let moviesListItemDiv = document.createElement('div');
    moviesListItemDiv.classList.add('row', 'movies-list-item', viewed && 'viewed');
    moviesListItemDiv.setAttribute('id', `m${id}`);
    moviesList.append(moviesListItemDiv);

    let col6Div = document.createElement('div');
    col6Div.classList.add('col-6');
    moviesListItemDiv.append(col6Div);

    let h5 = document.createElement('h5');
    h5.setAttribute('movieId', id);
    h5.setAttribute('onClick', `likeF(${id})`);
    h5.textContent = name;
    col6Div.append(h5);

    let col3Div = document.createElement('div');
    col3Div.classList.add('col-3');
    moviesListItemDiv.append(col3Div);

    let h5_2 = document.createElement('h5');
    h5_2.setAttribute('movieId', id);
    h5_2.textContent = views;
    col3Div.append(h5_2);

    let col3Div_2 = document.createElement('div');
    col3Div_2.classList.add('col-3');
    moviesListItemDiv.append(col3Div_2);

    let btnViewed = document.createElement('button');
    btnViewed.classList.add('btn', 'btn-secondary', 'viewedBtn', 'me-1');
    btnViewed.setAttribute('movieId', id);
    btnViewed.textContent = 'Viewed';
    btnViewed.setAttribute('onClick', `viewedF(${id})`)
    col3Div_2.append(btnViewed)

    let btnDeleted = document.createElement('button');
    btnDeleted.classList.add('btn', 'btn-secondary', 'deleteBtn');
    btnDeleted.setAttribute('movieId', id);
    btnDeleted.textContent = 'Delete';
    btnDeleted.setAttribute('onClick', `deleteF(${id})`)
    col3Div_2.append(btnDeleted)

    let btnLike = document.createElement('button');
    btnLike.classList.add('btn', 'btn-secondary', 'like', 'ms-1');
    btnLike.textContent = '❤';
    col3Div_2.append(btnLike);

    allMovies.innerHTML = data.length;
    movieName.value = '';
    movieViews.value = '';
})




allMovies.innerHTML += data.length;

let viewedMovies = data.filter(c => {
    if (c.viewed) {
        return c
    }
});

viewedMoviesH3.innerHTML += viewedMovies.length;




let viewedBtn = document.querySelectorAll('.viewedBtn');

function viewedF(id) {
    let selectMovie = document.querySelector(`#m${id}`);
    selectMovie.classList.toggle('viewed')
    data.filter(e => {
        if (e.id == id) {
            e.viewed = !e.viewed
            return e
        }
    });

    let viewedMovies = data.filter(c => {
        if (c.viewed) {
            return c    
        }
    });

    
    viewedMoviesH3.innerHTML = viewedMovies.length;
}

let deleteBtns = document.querySelectorAll('.deleteBtn');

function deleteF(id) {
    let newData = data.filter(c => {
        if (c.id == id) {
            const index = data.indexOf(c);
            if (index > -1) {
                data.splice(index, 1);
            }
        }
        return c
    })


    let selectMovie = document.querySelector(`#m${id}`);
    selectMovie.classList.toggle('remove');

    allMovies.innerHTML = data.length;

    let viewedMovies = data.filter(c => {
        if (c.viewed) {
            return c
        }
    });

    viewedMoviesH3.innerHTML = viewedMovies.length;
}


let movieTitle = document.querySelectorAll('.movies-list-item h5');

function likeF(id) {
    let selectMovie = document.querySelector(`#m${id}`);
    selectMovie.classList.toggle('likeD');

    data.filter(e => {
        if (e.id == id) {
            e.like = !e.like
            return e
        }
    });
}


let searchInp = document.querySelector('.searchInp');

searchInp.addEventListener('input', (e) => {
    e.preventDefault();
    let searchData = data.filter(item => {
        if (item.name.toLocaleLowerCase().indexOf(searchInp.value.toLocaleLowerCase()) > -1) {
            return item
        }
    });

    if (searchData.length == 0) {
        moviesList.innerHTML = `<h4 class='text-center'>Topilmadi!</h4>`
    }else{
        moviesList.innerHTML = "";
        searchData.forEach((movieItem) => {
            moviesList.innerHTML += `
                <div class="row movies-list-item ${movieItem.viewed && 'viewed'}" id='m${movieItem.id}'>
                    <div class="col-6" >
                        <h5 onClick="likeF(${movieItem.id})" movieId="${movieItem.id}">${movieItem.name}</h5>
                    </div>
                    <div class="col-3">
                        <h5 movieId="${movieItem.id}">${movieItem.views}</h5>
                    </div>
                    <div class="col-3">
                        <button class="btn btn-secondary viewedBtn" onClick="viewedF(${movieItem.id})" movieId="${movieItem.id}">Viewed</button>
                        <button class="btn btn-secondary deleteBtn" onClick="deleteF(${movieItem.id})" movieId="${movieItem.id}">Delete </button>
                        <button class="btn btn-secondary like">❤</button>
                    </div>
                </div>
            `;
        });
    }
})

searchInp.addEventListener('input', () => {
    if (searchInp.value == '') {
        moviesList.innerHTML = '';
        data.forEach((movieItem) => {
            moviesList.innerHTML += `
                <div class="row movies-list-item ${movieItem.viewed && 'viewed'}" id='m${movieItem.id}'>
                    <div class="col-6" >
                        <h5 onClick="likeF(${movieItem.id})" movieId="${movieItem.id}">${movieItem.name}</h5>
                    </div>
                    <div class="col-3">
                        <h5 movieId="${movieItem.id}">${movieItem.views}</h5>
                    </div>
                    <div class="col-3">
                        <button class="btn btn-secondary viewedBtn" onClick="viewedF(${movieItem.id})" movieId="${movieItem.id}">Viewed</button>
                        <button class="btn btn-secondary deleteBtn" onClick="deleteF(${movieItem.id})" movieId="${movieItem.id}">Delete </button>
                        <button class="btn btn-secondary like">❤</button>
                    </div>
                </div>
            `;
        });
    }
})



let filterBtns = document.querySelectorAll('.btn-group button'),
    viewedMoviesBtn = document.querySelector('.viewedMoviesBtn'),
    allMoviesBtn = document.querySelector('.allMoviesBtn'),
    theMostViewsMovies = document.querySelector('.theMostViewsMovies');

filterBtns.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        let activeBtn = document.querySelector('.btn-group button.btn-dark');
        activeBtn.classList.remove('btn-dark');
        activeBtn.classList.add('btn-outline-dark')

        item.classList.remove('btn-outline-dark');
        item.classList.add('btn-dark');
    })
});

viewedMoviesBtn.addEventListener('click', () => {
    let viewedMovies = data.filter(c => {
        if (c.viewed) {
            return c
        }
    });

    moviesList.innerHTML = '';

    viewedMovies.forEach((movieItem) => {
        moviesList.innerHTML += `
            <div class="row movies-list-item ${movieItem.viewed && 'viewed'}" id='m${movieItem.id}'>
                <div class="col-6" >
                    <h5 onClick="likeF(${movieItem.id})" movieId="${movieItem.id}">${movieItem.name}</h5>
                </div>
                <div class="col-3">
                    <h5 movieId="${movieItem.id}">${movieItem.views}</h5>
                </div>
                <div class="col-3">
                    <button class="btn btn-secondary viewedBtn" onClick="viewedF(${movieItem.id})" movieId="${movieItem.id}">Viewed</button>
                    <button class="btn btn-secondary deleteBtn" onClick="deleteF(${movieItem.id})" movieId="${movieItem.id}">Delete </button>
                    <button class="btn btn-secondary like">❤</button>
                </div>
            </div>
        `;
    });
});


allMoviesBtn.addEventListener('click', () => {
    moviesList.innerHTML = '';

    data.forEach((movieItem) => {
        moviesList.innerHTML += `
            <div class="row movies-list-item ${movieItem.viewed && 'viewed'}" id='m${movieItem.id}'>
                <div class="col-6" >
                    <h5 onClick="likeF(${movieItem.id})" movieId="${movieItem.id}">${movieItem.name}</h5>
                </div>
                <div class="col-3">
                    <h5 movieId="${movieItem.id}">${movieItem.views}</h5>
                </div>
                <div class="col-3">
                    <button class="btn btn-secondary viewedBtn" onClick="viewedF(${movieItem.id})" movieId="${movieItem.id}">Viewed</button>
                    <button class="btn btn-secondary deleteBtn" onClick="deleteF(${movieItem.id})" movieId="${movieItem.id}">Delete </button>
                    <button class="btn btn-secondary like">❤</button>
                </div>
            </div>
        `;
    });
});

theMostViewsMovies.addEventListener('click', () => {
    let sortMovies = data.sort(function(a, b) {
        return b.views - a.views;
    });

    moviesList.innerHTML = '';

    sortMovies.forEach((movieItem) => {
        moviesList.innerHTML += `
            <div class="row movies-list-item ${movieItem.viewed && 'viewed'}" id='m${movieItem.id}'>
                <div class="col-6" >
                    <h5 onClick="likeF(${movieItem.id})" movieId="${movieItem.id}">${movieItem.name}</h5>
                </div>
                <div class="col-3">
                    <h5 movieId="${movieItem.id}">${movieItem.views}</h5>
                </div>
                <div class="col-3">
                    <button class="btn btn-secondary viewedBtn" onClick="viewedF(${movieItem.id})" movieId="${movieItem.id}">Viewed</button>
                    <button class="btn btn-secondary deleteBtn" onClick="deleteF(${movieItem.id})" movieId="${movieItem.id}">Delete </button>
                    <button class="btn btn-secondary like">❤</button>
                </div>
            </div>
        `;
    });
})