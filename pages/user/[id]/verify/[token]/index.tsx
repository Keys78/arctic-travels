import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router'
import Loader from "../../../../../components/Loader";

const users = () => {
	const [isValidUrl, setValidUrl] = useState(false);
	const router = useRouter()
	const [isAnimating, setIsAnimating] = useState(true)
	// const [isLoading, updateIsLoading] = useState(false)

	useEffect(() => {
		router.isReady && verifyEmailUrl();
	}, [router.isReady]);

	useEffect(() => {
		setTimeout(function () {
			setIsAnimating(!isAnimating)
		}, 4500);
	}, [])


	const verifyEmailUrl = async () => {
		try {
			 await axios.post(`https://arctic-travels-api.cyclic.app/auth/${router.query.id}/verify/${router.query.token}`);

			setValidUrl(true);
		} catch (error) {
			console.log(error);
			setValidUrl(false);
		}
	};

	const successMessage = [
		<div className="veri-board">
			<div>
				{isAnimating && <img className="animated-gif" src="/images/fp.gif" alt="gif" />}
				{!isAnimating &&
					<>
						<img className="animated-gif" src="/images/veri_green.jpg" alt="png" />
						<h1>Email verified successfully </h1>
						<Link href="/signin"><a className='btn-class-form new-btn' >Login</a></Link>
					</>
				}
			</div>
		</div>
	]

	const notFound = [
		<div className="veri-false">
			<div>
				<img src="/images/f_o_f.gif" alt="not found" />
				<h1>404 | Page Not Found</h1>
			</div>
		</div>
	]

	return (
		<>
			{router.isReady ?
				<>
					{isValidUrl && successMessage}
					{!isValidUrl && notFound}
				</> :
				<Loader />
			}
		</>

	)
};

export default users;