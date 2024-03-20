import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const renderRating = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <FontAwesomeIcon icon={faStar} key={i} style={{ color: "gold" }} />
      );
    } else {
      stars.push(
        <FontAwesomeIcon icon={faStar} key={i} style={{ color: "grey" }} />
      );
    }
  }
  return stars;
};
