import { useAuthContext } from '@/hooks/use-context';

const Home = () => {
	const { user } = useAuthContext();
	return (
		<section>
			<div>Home</div>
			<div>{user?.username}</div>
			<div>{user?.email}</div>
		</section>
	);
};

export default Home;
