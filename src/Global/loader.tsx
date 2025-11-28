import BeatLoader from 'react-spinners/BeatLoader';
const Loader = (props: any) => {
  return (
    <BeatLoader
      color={'#006736'}
      loading={props.loading}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default Loader;
