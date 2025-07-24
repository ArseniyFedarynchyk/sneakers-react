import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { Sneaker } from "../models/sneaker.model";
import { API_URL } from "../App";
import SneakerDetail from "../components/SneakerDetail";

export default function SneakerDetailsPage() {
  const sneakerSelected: Sneaker = useLoaderData();

  return <SneakerDetail sneakerSelected={sneakerSelected} />;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`${API_URL}/items/${params.sneakerId}`);
  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  return response.json();
}
