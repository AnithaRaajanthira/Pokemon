import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>Error Occured</h1>
        <h2>
          {error.status}
          {error.statusText}
        </h2>
      </>
    );
  }
}
