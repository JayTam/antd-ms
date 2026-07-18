export type FallbackRenderProps = {
  error: Error;
  componentStack: string;
  eventId: string;
  resetError: () => void;
};
