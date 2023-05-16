import { initialFacts, CATEGORIES } from "./data.js";

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

factsList.innerHTML = "";

loadFacts();
async function loadFacts() {
	const res = await fetch(
		"https://yrprtswvfwjnegoqwoft.supabase.co/rest/v1/facts",
		{
			headers: {
				apiKey:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycHJ0c3d2ZndqbmVnb3F3b2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2Mjk4MzEsImV4cCI6MTk5OTIwNTgzMX0.OJMjnmigt7CdM36_XbT7E5GTuT4-orMw1LO4MZg850I",
				authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycHJ0c3d2ZndqbmVnb3F3b2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2Mjk4MzEsImV4cCI6MTk5OTIwNTgzMX0.OJMjnmigt7CdM36_XbT7E5GTuT4-orMw1LO4MZg850I",
			},
		}
	);
	const data = await res.json();
	createFactsList(data);
}

const createFactsList = (dataArray) => {
	const htmlArray = dataArray
		.map(
			(fact) =>
				`<li class="fact">
<p>
	${fact.text}
	<a
		class="source"
		href="${fact.source}"
		target="_blank"
	>
		(Source)
	</a>
</p>
<span class="tag" style="background-color: ${
					CATEGORIES.find((cat) => cat.name === fact.category).color
				}">${fact.category}</span>
<div class="vote-buttons">
	<button>👍 ${fact.votesInteresting}</button>
	<button>🤯 ${fact.votesMindblowing}</button>
	<button>⛔️ ${fact.votesFalse}</button>
</div>
</li>`
		)
		.join("");

	factsList.insertAdjacentHTML("beforeend", htmlArray);
};

btn.addEventListener("click", function () {
	if (form.classList.contains("hidden")) {
		form.classList.remove("hidden");
		btn.textContent = "Close";
	} else {
		form.classList.add("hidden");
		btn.textContent = "Share A Fact";
	}
});
