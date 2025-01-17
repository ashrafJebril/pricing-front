import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCustomers = () => {
  const dispatch = useDispatch();

  // Access Redux state
  const customers = useSelector((state) => state.customersStore.customers);
  const isLoading = useSelector((state) => state.customersStore.loading);
  const page = useSelector((state) => state.customersStore.page);
  const totalPages = useSelector((state) => state.customersStore.totalPages);
  const limit = useSelector((state) => state.customersStore.limit);

  // Load a page of customers
  const loadPage = useCallback(
    (pageNumber) => {
      dispatch.customersStore.fetchCustomers({ page: pageNumber, limit });
    },
    [dispatch, limit]
  );

  // Fetch the initial page of customers
  useEffect(() => {
    loadPage(page); // Fetch the first page on mount
  }, [page, loadPage]);

  return {
    customers,
    isLoading,
    page,
    totalPages,
    loadPage,
  };
};
