import { useContext, useEffect } from "react";
import SneakerDetail from "../components/SneakerDetail";
import { SneakerContext } from "../store/SneakerContext";
import type { Sneaker } from "../models/sneaker.model";
import { useLoaderData } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SneakerDetailsPage() {
  const { sneakerSelected, handleSelectSneaker } = useContext(SneakerContext);
  const sneakerData: Sneaker = useLoaderData();

  useEffect(() => {
    handleSelectSneaker(sneakerData);
  }, [sneakerData, handleSelectSneaker]);

  return (
    <>
      {sneakerSelected ? (
        <SneakerDetail sneakerSelected={sneakerSelected} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
