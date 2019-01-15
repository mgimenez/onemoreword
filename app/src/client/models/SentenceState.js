import { types } from 'mobx-state-tree';

const SentenceState = types
    .model('Sentence', {
        sentence: types.string,
        word: types.string,
        show: false,
        error: false
    })
    .actions(self => ({
        addWord(word) {
            self.show = true;
            self.sentence += ' ' + word;
        },
        hide() {
            self.show = false;
        }
    }))

export default SentenceState;