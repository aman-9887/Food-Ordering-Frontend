import React, { useEffect } from "react";
import CountRestaurant from "./CountRestaurant";
import Restaurant from "./Restaurant";
import {
  getRestaurants,
  sortByRatings,
  toggleVegOnly,
  sortByReviews,
} from "../../actions/restaurantAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";

export default function Home() {
  const dispatch = useDispatch();

  const {
    loading: restaurantsLoading,
    error: restaurantError,
    restaurants,
    showVegOnly,
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const handleSortByReview = () => {
    dispatch(sortByReviews());
  };

  const handleSortByRatings = () => {
    dispatch(sortByRatings());
  };

  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
  };

  return (
    <>
      <CountRestaurant />
      {restaurantsLoading ? (
        <Loader />
      ) : restaurantError ? (
        <Message variant="danger">{restaurantError}</Message>
      ) : (
        <>
          <section>
            <div className="sort">
              <button className="sort_veg p-3" onClick={handleToggleVegOnly}>
                {showVegOnly ? "Show All" : "Pure Veg"}
              </button>
              <button className="sort_rev p-3" onClick={handleSortByReview}>
                Sort by Review
              </button>
              <button className="sort_rate p-3" onClick={handleSortByRatings}>
                Sort by Ratings
              </button>
            </div>
            <div className="row mt-4">
              {restaurants ? (
                restaurants.map((restaurant) =>
                  !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                    <Restaurant key={restaurant._id} restaurant={restaurant} />
                  ) : null
                )
              ) : (
                <Message variant="info">No restaurant found</Message>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
