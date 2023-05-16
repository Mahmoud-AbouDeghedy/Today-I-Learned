import { useEffect, useState } from "react";
import "../style.css";
import supabase from "../utils/supabase";
import Header from "./Header";
import FactList from "./FactList";
import Loader from "./Loader";
import NewFactForm from "./NewFactForm";
import CategoryFilter from "./CategoryFilter";

function App() {
	const [showForm, setShowForm] = useState(false);
	const [facts, setFacts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCategory, setCurrentCategory] = useState("all");

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			let query = supabase.from("facts").select("*");
			if (currentCategory !== "all")
				query = query.eq("category", currentCategory);
			const { data: facts, error } = await query
				.order("votesInteresting", { ascending: false })
				.limit(1000);

			if (error)
				alert("An error occurred while fetching facts from the database");
			else setFacts(facts);

			setIsLoading(false);
		})();
	}, [currentCategory]);

	return (
		<>
			<Header setShowForm={setShowForm} showForm={showForm} />

			{showForm ? (
				<NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
			) : null}

			<main className="main">
				<CategoryFilter setCurrentCategory={setCurrentCategory} />

				{isLoading ? (
					<Loader />
				) : (
					<FactList facts={facts} setFacts={setFacts} />
				)}
			</main>
		</>
	);
}

export default App;
