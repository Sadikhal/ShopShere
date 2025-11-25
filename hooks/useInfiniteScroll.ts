"use client";

import { useRef, useCallback } from "react";

/**
 * useInfiniteScroll Hook
 * Implements infinite scroll functionality using Intersection Observer
 * Triggers callback when the last element becomes visible
 * @param callback - Function to call when last element is visible (load more items)
 * @param isFetching - Whether data is currently being fetched (prevents duplicate calls)
 * @returns Ref callback to attach to the last element in the list
 */

export const useInfiniteScroll = (
  callback: () => void,
  isFetching: boolean,
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      // Don't observe if currently fetching
      if (isFetching) return;

      // Disconnect previous observer
      if (observer.current) observer.current.disconnect();

      // Create new observer
      observer.current = new IntersectionObserver((entries) => {
        // Trigger callback when element is visible
        if (entries[0].isIntersecting) {
          callback();
        }
      });

      // Start observing the element
      if (node) observer.current.observe(node);
    },
    [isFetching, callback],
  );

  return lastElementRef;
};
