import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

const CATEGORIES = [
	{ name: "technology", color: "#3b82f6" },
	{ name: "science", color: "#16a34a" },
	{ name: "finance", color: "#ef4444" },
	{ name: "society", color: "#eab308" },
	{ name: "entertainment", color: "#db2777" },
	{ name: "health", color: "#14b8a6" },
	{ name: "history", color: "#f97316" },
	{ name: "news", color: "#8b5cf6" },
];

function Fact({ fact, setFacts }) {
	const [isUpdating, setIsUpdating] = useState(false);
	const isDisputed =
		fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

	const [selectedButton, setSelectedButton] = useState(() => {
		const sessionData = localStorage.getItem("session");
		const parsedSessionData = sessionData ? JSON.parse(sessionData) : {};
		return parsedSessionData[fact.id] || null;
	});

	useEffect(() => {
		localStorage.setItem(
			"session",
			JSON.stringify({
				...JSON.parse(localStorage.getItem("session")),
				[fact.id]: selectedButton,
			})
		);
	}, [selectedButton, fact.id]);

	async function handleVote(columnName) {
		setIsUpdating(true);

		if (selectedButton === columnName) {
			setSelectedButton(null);
			fact[columnName] -= 1;
		} else {
			if (selectedButton !== null) {
				fact[selectedButton] -= 1;
			}

			fact[columnName] += 1;
			setSelectedButton(columnName);
		}

		await supabase
			.from("facts")
			.update({
				[columnName]: fact[columnName],
				[selectedButton]: fact[selectedButton],
			})
			.eq("id", fact.id)
			.select();

		setIsUpdating(false);
	}

	async function handleDeleteFact() {
		const { error } = await supabase.from("facts").delete().eq("id", fact.id);

		if (!error) {
			setFacts((facts) => facts.filter((f) => f.id !== fact.id));
		}
	}

	return (
		<li className="fact">
			<p>
				{isDisputed && <span className="disputed">[⛔️Disputed]</span>}
				{fact.text}
				<a
					className="source"
					href={fact.source}
					target="_blank"
					rel="noreferrer"
				>
					(Source)
				</a>
			</p>
			<span
				className="tag"
				style={{
					backgroundColor: CATEGORIES.find((cat) => fact.category === cat.name)
						.color,
				}}
			>
				{fact.category}
			</span>
			<div className="vote-buttons">
				<button
					className={selectedButton === "votesInteresting" ? "selected" : ""}
					onClick={() => handleVote("votesInteresting")}
					disabled={isUpdating}
				>
					👍 {fact.votesInteresting}
				</button>
				<button
					className={selectedButton === "votesMindblowing" ? "selected" : ""}
					onClick={() => handleVote("votesMindblowing")}
					disabled={isUpdating}
				>
					🤯 {fact.votesMindblowing}
				</button>
				<button
					className={selectedButton === "votesFalse" ? "selected" : ""}
					onClick={() => handleVote("votesFalse")}
					disabled={isUpdating}
				>
					⛔️ {fact.votesFalse}
				</button>
			</div>
			<IconButton
				aria-label="delete"
				className="trash-btn"
				onClick={handleDeleteFact}
			>
				<DeleteIcon />
			</IconButton>
		</li>
	);
}

export default Fact;
