import { types } from 'mobx-state-tree';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');


const SentenceStore = types
    .model('Sentence', {
        sentence: types.string,
        word: types.string,
        show: false,
        error: false
    })
    .actions(self => ({
        validateSentence(sentence) {
            socket.emit('validateSentence', sentence);
        },
        addWord(sentence) {
            self.show = true;
            self.sentence = sentence;
        },

        socketListeners() {
            socket.on('addWord', sentence => {
                self.addWord(sentence);
            });
            socket.on('gameOver', (username) => {
                if (self.username === username) {
                    alert('game over ' + username);
                    socket.emit('disconnect');
                }
                self.removeUser(username);
            });
        },
        hide() {
            self.show = false;
        }
    }))

export default SentenceStore;