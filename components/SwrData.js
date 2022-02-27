import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SwrData = (endpoint) => {
  const { data, error } = useSWR(endpoint, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
};

export default SwrData;
