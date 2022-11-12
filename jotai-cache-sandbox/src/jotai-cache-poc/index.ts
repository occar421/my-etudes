import { atomsWithQuery, atomsWithMutation } from "jotai-tanstack-query";
import type { Getter } from "jotai";
import type {
  MutationObserverOptions,
  QueryObserverOptions,
} from "@tanstack/query-core";

export const atomWithCache = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData
>(
  fetcher: QueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData
  >["queryFn"],
  getOptions?: (
    get: Getter
  ) => Omit<
    QueryObserverOptions<TQueryFnData, TError, TData, TQueryData>,
    "queryFn" | "queryKey"
  >
) =>
  atomsWithQuery<TQueryFnData, TError, TData, TQueryData>((get) => ({
    suspense: true,
    useErrorBoundary: true,
    ...(getOptions?.(get) as any),
    queryFn: fetcher,
    queryKey: [],
  }))[0];

export const atomWithMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutate: MutationObserverOptions<
    TData,
    TError,
    TVariables,
    TContext
  >["mutationFn"],
  getOptions?: (
    get: Getter
  ) => MutationObserverOptions<TData, TError, TVariables, TContext>
) =>
  atomsWithMutation<TData, TError, TVariables, TContext>((get) => ({
    useErrorBoundary: true,
    ...getOptions?.(get),
    mutationFn: mutate,
  }))[1];
