



export const ErrorPage = () => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  return (
    <div>
      Something went wrong =(
      <button onClick={reloadPage}>Refresh the page</button>
    </div>
  );
};
