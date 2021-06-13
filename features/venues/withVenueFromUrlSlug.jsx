import { useRouter } from "next/router";
import React from "react";
import { useGetVenueQuery } from "./api";

const withVenueFromUrlSlug = (Component) => {
  const Venue = (props) => {
    const router = useRouter();
    const { data, isLoading, error } = useGetVenueQuery(router.query.slug);

    return (
      <Component {...props} venueFromUrlSlug={{ data, isLoading, error }} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Venue.getInitialProps = Component.getInitialProps;
  }

  return Venue;
};

export default withVenueFromUrlSlug;
