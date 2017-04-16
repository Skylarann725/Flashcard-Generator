function ClozeCard(fullText, cloze) {
    if (this instanceof ClozeCard) {

        if (fullText.search(cloze) != -1) {

            if (typeof fullText === "string") {
                this.fullText = fullText;
            } else {
                console.log('Please use a string');

            }
            if (typeof cloze === "string") {
                this.cloze = cloze;
            } else {
                console.log('Please use a string');
            }

            this.partialText = function() {
                return this.fullText.replace(cloze, '...');
            };

        } else {
            throw new Error("Cloze statements must appear in full text.")
        }
    } else {
        return new ClozeCard(fullText, cloze);
    }

}



module.exports = ClozeCard;
