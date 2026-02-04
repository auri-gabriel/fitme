import React, { useState, useEffect } from 'react';
import FoodCard from '../components/Cards/FoodCard';
import fetchRestaurants from '../api/restaurantApi';

import '../styles/components/home/carousel.scss';
import HomeCarousel from '../components/Home/HomeCarousel';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  deliveryTime: string;
}

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className='mb-4'
        style={{ position: 'relative', overflowX: 'hidden' }}
      >
        <div className='container py-5'>
          <div className='row'>
            <div className='col-12 col-md-6 d-flex flex-column justify-content-center'>
              <p className='fs-3xl fw-bold'>
                {' '}
                Premium <span className='text-primary'>quality</span> Food for
                your <span className='text-primary'>healthy & Daily Life</span>
              </p>
              <p className='text-grey-700'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                deserunt sunt doloribus quos recusandae deleniti obcaecati,
                tenetur enim inventore ad! Mollitia sapiente a dignissimos,
                dolorum ullam quod velit illo eaque!
              </p>
            </div>
            <div className='col-12 col-md-6'>
              <HomeCarousel />
            </div>
          </div>
        </div>
        <img
          className='d-none d-sm-block home-banner__element-left position-absolute'
          src='src/assets/home/left-element.svg'
          alt=''
        />
        <img
          className='d-none d-sm-block home-banner__element-right position-absolute'
          src='src/assets/home/right-element.svg'
          alt=''
        />
      </div>
      <div className='container my-4'>
        <h2 className='mb-4'>Restaurants</h2>
        <div className='row g-3'>
          {restaurants.length == 0 ? (
            <div className='alert alert-warning' role='alert'>
              <p> No Restaurants found. Try again later.</p>
            </div>
          ) : (
            restaurants.map((restaurant, index) => (
              <div key={index} className='col-12 col-sm-6 col-lg-3'>
                <FoodCard
                  title={restaurant.name}
                  imageUrl='src/assets/placeholder.png'
                  region={restaurant.location}
                  rating={restaurant.rating}
                  arrivalTime={restaurant.deliveryTime}
                  url={`/restaurant/${restaurant.id}`}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
