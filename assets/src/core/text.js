
function wrapWords(input = "", maxChars = 100) {
  let lines = [];
  let words = input.split(" ");
  let currentLine = "";
  //for each word index
  for (let index = 0; index < words.length; index++) {
    let word = words[index];
    if (currentLine.length + word.length > maxChars) {
      lines.push(currentLine);
      currentLine = "";
    }
    currentLine += word + " ";
  }
  lines.push(currentLine);
  return lines.filter((x) => x.length > 0).join("\n");
}
