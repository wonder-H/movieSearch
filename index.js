import axios from 'axios';
import 'regenerator-runtime/runtime';

const getData = axios.create({
  baseURL: 'https://www.omdbapi.com',
  params: { apikey: process.env.API_KEY },
});

const moreBtnEl = document.querySelector('.get-more-btn');
const searchData = {
  keyword: null,
  resultPage: null,
  currentPage: null,
};
//t = By ID or Title. Movie title to search for
//s = By Search. Movie title to search for.

const fetchMovies = async (inputValue) => {
  try {
    await getData.get('/', { params: { s: inputValue } }).then(({ data }) => {
      let { Error, Search, totalResults } = data;
      console.log('error search total: ', Error, Search, totalResults);
      // console.log('data : ', data);
      if (Error !== undefined) {
        showError(Error);
      } else {
        document.querySelector('header p').textContent = `${inputValue}관련 ${totalResults}개 찾음!!`;

        searchData.keyword = inputValue;
        searchData.resultPage = totalResults;
        searchData.currentPage = 10;

        createLists(Search);
      }
    });
  } catch (res) {
    console.log(res);
    alert('오류!!');
    return;
  }
};

const moreLists = async () => {
  try {
    const { data } = await getData.get('/', { params: { s: searchData.keyword, page: searchData.currentPage / 10 } });
    let { Error, Search, totalResults } = data;
    console.log('2 ', Error, Search, totalResults, data);
    if (Error !== undefined) {
      showError(Error);
      return;
    } else {
      // console.log('res', data);
      createLists(Search);
    }
  } catch (res) {
    console.log(res);
    alert('오류!!');
    return;
  }
};

document.querySelector('.get-movie-btn').addEventListener('click', () => {
  const inputValue = document.querySelector('.search-input').value.trim();
  if (inputValue === '') {
    alert('입력좀...');
    return;
  } else {
    searchData.keyword = inputValue;
    fetchMovies(inputValue);
  }
});

function showError(Error) {
  console.log(Error);
  switch (Error) {
    case 'Too many results.':
      alert('검색좀 구체적으로..');
      break;
    case 'Movie not found!':
      alert('그 영화 못찾음 :( ');
    default:
      break;
  }
}

function createLists(data) {
  const listEls = [];
  const boxEl = document.querySelector('.list-area ul');

  data.forEach((list) => {
    const listEl = document.createElement('li');
    list.Poster === 'N/A'
      ? (list.Poster = 'https://firebasestorage.googleapis.com/v0/b/imgsources.appspot.com/o/not_found_poster.jpg?alt=media&token=e309cbe1-922a-48e6-bb0d-7880add97a63')
      : (listEl.innerHTML = `<div class="list-item"><span>${list.Type}</span><p>${list.Year}</p><h4>${list.Title}</h4><div class="img-box"><img src="${list.Poster}" alt="${list.Title}" /></div></div>`);
    listEls.push(listEl);
    // console.log(listEl, listEls);
  });

  if (searchData.resultPage > searchData.currentPage) {
    //적용
    boxEl.append(...listEls);
    moreBtnEl.classList.add('active');
  } else {
    moreBtnEl.classList.remove('active');
  }
  // console.log('more lists');
}

document.querySelector('button.get-more-btn').addEventListener('click', () => {
  if (searchData.resultPage > searchData.currentPage) {
    searchData.currentPage += 10;
    moreLists();
  } else {
    return;
  }
});
