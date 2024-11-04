import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
} from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { filteredHeroes, heroesLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

	const emptyRef = useRef(null);
	const nodeRef = useRef(null);

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, [dispatch, request]);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(data => console.log (data, 'Hero deleted'))
				.then(dispatch(heroDeleted(id)))
        .catch(err => console.log(err));
    },
      // eslint-disable-next-line
    [request]
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
				<CSSTransition nodeRef={emptyRef} timeout={0} classNames="hero">
					<h5 ref={emptyRef} className="text-center mt-5">Героев пока нет</h5>
				</CSSTransition>
			)
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} nodeRef={nodeRef} timeout={500} classNames="hero">
					<div ref={nodeRef}>
						<HeroesListItem {...props} onDelete={() => onDelete(id)} />
					</div>
				</CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return (
		<TransitionGroup component='ul'>
			{elements}
		</TransitionGroup>
	)
};

export default HeroesList;
