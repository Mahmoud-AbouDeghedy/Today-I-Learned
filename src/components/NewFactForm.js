import { useState } from "react";
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

function isValidHttpURL(str) {
	let url;
	try {
		url = new URL(str);
	} catch (_) {
		return false;
	}
	return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
	const [text, setText] = useState("");
	const [source, setSource] = useState("");
	const [category, setCategory] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const textLength = text.length;

	async function handleSubmit(e) {
		e.preventDefault();

		let newFact, err;
		if (text && isValidHttpURL(source) && category && textLength <= 200) {
			{
				setIsUploading(true);
				const { data, error } = await supabase
					.from("facts")
					.insert([{ text, source, category }])
					.select();
				newFact = data;
				err = error;
				setIsUploading(false);
			}

			if (!err) {
				setFacts((facts) => [...facts, newFact[0]]);
			}

			setText("");
			setSource("");
			setCategory("");
			setShowForm(false);
		}
	}

	return (
		<form className="fact-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Share a fact with the world..."
				value={text}
				onChange={(e) => setText(e.target.value.slice(0, 200))}
				disabled={isUploading}
			/>
			<span>{200 - textLength}</span>
			<input
				type="text"
				placeholder="source link..."
				value={source}
				onChange={(e) => setSource(e.target.value)}
				disabled={isUploading}
			/>
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				disabled={isUploading}
			>
				<option value="">Choose category:</option>
				{CATEGORIES.map((cat, idx) => (
					<option key={idx} value={cat.name}>
						{cat.name.toUpperCase()}
					</option>
				))}
			</select>
			<button className="btn btn-large" disabled={isUploading}>
				POST
			</button>
		</form>
	);
}

export default NewFactForm;
