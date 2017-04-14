function ClozeCard(text, cloze) {
    if (this instanceof ClozeCard) {

        if (text.search(cloze) != -1) {

            if (typeof text === "string") {
                this.fullText = text;
            } else {
                console.log('Please use a string');

            }
            if (typeof cloze === "string") {
                this.cloze = cloze;
            } else {
                console.log('Please use a string');
            }

            this.partialText = function() {
                return this.fullText.replace(cloze, '...';)
            };

        } else {
            throw new Error("Cloze statements must appear in full text.")
        }
    } else {
        return new ClozeCard(text, cloze);
    }

}



module.exports = ClozeCard;
