import Spinner from './Spinner';

type Props = {
    loading: boolean;
    children?: React.ReactNode;
};
const LoadingGate = (props: Props) => {
    const { loading, children } = props;

    return loading ? (
        <div className='text-center'>
            <div role='status'>
                <Spinner />
                <span>Loading...</span>
            </div>
        </div>
    ) : (
        <>{children}</>
    );
};
export default LoadingGate;
