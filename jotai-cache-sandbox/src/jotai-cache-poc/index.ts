import {
  atomsWithQuery as _atomsWithQuery,
  atomsWithMutation as _atomsWithMutation,
} from "jotai-tanstack-query";
import type { Getter } from "jotai";
import type {
  MutationObserverOptions,
  QueryObserverOptions,
} from "@tanstack/query-core";

export const atomsWithCache = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData
>(
  fetcher: QueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    unknown[]
  >["queryFn"],
  getOptions?: (
    get: Getter
  ) => Omit<
    QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, unknown[]>,
    "queryFn" | "queryKey"
  >
) =>
  _atomsWithQuery((get) => ({
    suspense: true,
    useErrorBoundary: true,
    ...getOptions?.(get),
    queryFn: fetcher,
  }));

export const atomsWithMutation = <
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
  _atomsWithMutation((get) => ({
    useErrorBoundary: true,
    ...getOptions?.(get),
    mutationFn: mutate,
  }));
