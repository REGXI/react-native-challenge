import { useState } from "react";

// Taken from https://dev.to/jeeny/how-to-create-an-api-layer-with-react-hooks-and-typescriptand-why-3a8o

const DEFAULT_FETCH_OPTIONS = {};

type UseFetchProps = {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE"
};

type CommonFetch = {
  input?: { [index: string]: any };
  dynamicEndpoint?: string;
  fetchOptions?: RequestInit;
}

export function useFetch<T> ({ endpoint, method }: UseFetchProps) {
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  const url = `${baseUrl}${endpoint}`;

  const [data, setData] = useState<T | null>(null);

  const commonFetch = async ({
    input,
    dynamicEndpoint,
    fetchOptions = {},
  }: CommonFetch) => {
    const dynamicUrl = dynamicEndpoint ? `${url}${dynamicEndpoint}` : url;
    setIsLoading(true);

    const response = await fetch(dynamicUrl, {
      method,
      ...DEFAULT_FETCH_OPTIONS,
      ...fetchOptions, // Override with specific options
      body: JSON.stringify(input),
    });

    const data = await response.json();

    setIsLoading(false);
    setData(data);
  };

  return { isLoading, commonFetch, data };
};