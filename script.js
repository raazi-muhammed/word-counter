const textAreaContent = document.querySelector("#content");

function analyzeText(input) {
	// Calculate the number of characters
	const charCount = input.length;

	// Calculate the number of words (split by spaces)
	const wordCount = input.trim().split(/\s+/).length;

	// Calculate the number of sentences (split by '.', '!', or '?')
	const sentenceCount = input.split(/[.!?]/).length - 1;

	// Calculate the number of paragraphs (split by double line breaks)
	const paragraphCount = input.split(/\n\s*\n/).length;

	// Return the results as an array
	return { charCount, wordCount, sentenceCount, paragraphCount };
}

// Example usage:
const text = `
  This is a sample text. It has multiple sentences.
  There are two paragraphs in this text.

  The end!
`;

/* const result = analyzeText(text);
console.log("Character Count:", result[0]);
console.log("Word Count:", result[1]);
console.log("Sentence Count:", result[2]);
console.log("Paragraph Count:", result[3]);
 */

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

	displayReading.textContent = objOfTime.readingTimeMinutes + " min";
	displaySpeaking.textContent = objOfTime.speakingTimeMinutes + " min";
}

function calculateTimeEstimates(inputText) {
	const wordsPerMinuteReading = 200; // Average reading speed in words per minute
	const wordsPerMinuteSpeaking = 150; // Average speaking speed in words per minute

	const wordCount = inputText.trim().split(/\s+/).length; // Calculate word count

	// Calculate reading time in minutes
	let readingTimeMinutes = wordCount / wordsPerMinuteReading;

	// Calculate speaking time in minutes
	let speakingTimeMinutes = wordCount / wordsPerMinuteSpeaking;

	// Return the estimates as an array
	speakingTimeMinutes = Number(speakingTimeMinutes.toFixed(2));
	readingTimeMinutes = Number(readingTimeMinutes.toFixed(2));

	return { readingTimeMinutes, speakingTimeMinutes };
}

// Example usage:
/* const inputText = "This is a sample text for calculating time estimates.";
const [readingTime, speakingTime] = calculateTimeEstimates(inputText);
console.log(`Estimated Reading Time: ${readingTime.toFixed(1)} minutes`);
console.log(`Estimated Speaking Time: ${speakingTime.toFixed(1)} minutes`); */

textAreaContent.addEventListener("keypress", () => {
	const objOfCounting = analyzeText(textAreaContent.value);
	const objOfTime = calculateTimeEstimates(textAreaContent.value);
	displayContent(objOfCounting, objOfTime);
});
