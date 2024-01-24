import React from 'react';
import axios from 'axios';
import qs from 'qs';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);
  const [infoPage, setInfoPage] = React.useState({
    total_items: 10,
    total_pages: 3,
    current_page: 1,
    per_page: 2,
    remaining_count: 3,
  });
  // const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

  const { searchValue } = React.useContext(SearchContext);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  React.useEffect(() => {
    setIsLoading(true);

    // const sortBy = sortType.sortProperty.replace('-', '');
    // const order = sortType.sortProperty.includes('-') ? 'ASC' : 'DESC';
    // fetch(
    //   `https://66c7de82d329f1e8.mokky.dev/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}`,
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((arr) => {
    //     setItems(arr.items);
    //     setInfoPage(arr.meta);
    //     setIsLoading(false);
    //   });
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    axios
      .get(
        `https://66c7de82d329f1e8.mokky.dev/items?page=${currentPage}&limit=8${category}&sortBy=${sortType}`,
      )
      .then((res) => {
        console.log(res);
        setItems(res.data.items);
        setInfoPage(res.data.meta);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage,
    });

    console.log(queryString);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination
        infoPage={infoPage}
        onChangePage={onChangePage}
        // onChangePage={(number) => setCurrentPages(number + 1)}
      />
    </div>
  );
};
export default Home;
