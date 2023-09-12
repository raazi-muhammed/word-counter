const textAreaContent = document.querySelector("#content");

function analyzeText(input) {
	const charCount = input.length;
	const wordCount = input.trim().split(/\s+/).length;
	const sentenceCount = input.split(/[.!?]/).length - 1;
	const paragraphCount = input.split(/\n\s*\n/).length;
	return { charCount, wordCount, sentenceCount, paragraphCount };
}

function formatMinutesToTimeString(minutes) {
	if (typeof minutes !== "number" || isNaN(minutes)) return "Invalid input";

	const mins = Math.floor(minutes);
	const secs = Math.round((minutes - mins) * 60);

	if (mins === 0 && secs === 0) return "0 s";

	let result = "";
	if (mins > 0) result += `${mins}m`;
	if (secs > 0) {
		if (mins > 0) result += " ";
		result += `${secs}s`;
	}

	return result;
}

function displayContent(objOfCounting, objOfTime) {
	const displayCharacters = document.querySelector("#display-characters");
	const displayWords = document.querySelector("#display-words");
	const displaySentences = document.querySelector("#display-sentences");
	const displayParagraphs = document.querySelector("#display-paragraphs");

	const displayReading = document.querySelector("#display-reading");
	const displaySpeaking = document.querySelector("#display-speaking");

	displayCharacters.textContent = objOfCounting.charCount;
	displayWords.textContent = objOfCounting.wordCount;
	displaySentences.textContent = objOfCounting.sentenceCount;
	displayParagraphs.textContent = objOfCounting.paragraphCount;

	displayReading.textContent = objOfTime.readingTimeMinutes;
	displaySpeaking.textContent = objOfTime.speakingTimeMinutes;
}

function calculateTimeEstimates(inputText) {
	const wordsPerMinuteReading = 200;
	const wordsPerMinuteSpeaking = 150;

	const wordCount = inputText.trim().split(/\s+/).length;

	let readingTimeMinutes = wordCount / wordsPerMinuteReading;
	let speakingTimeMinutes = wordCount / wordsPerMinuteSpeaking;

	readingTimeMinutes = formatMinutesToTimeString(readingTimeMinutes);
	speakingTimeMinutes = formatMinutesToTimeString(speakingTimeMinutes);

	return { readingTimeMinutes, speakingTimeMinutes };
}

textAreaContent.addEventListener("input", () => {
	const objOfCounting = analyzeText(textAreaContent.value);
	const objOfTime = calculateTimeEstimates(textAreaContent.value);
	displayContent(objOfCounting, objOfTime);
});
