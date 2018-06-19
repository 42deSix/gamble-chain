'use strict';
import calcHash from 'crypto-js/sha256';

export default class Block {
    constructor(initialTransaction, previousHash = '') {
        // this.miner = miner;
        this.transactions = {
            'initialTransaction': initialTransaction,
            'deckHistory': [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]],
            'cardDispenseHistory': [],
            'bettingHistory': [],
        };
        this.timestamp = new Date();
        this.previousBlockHash = previousHash;
        this.nonce = 0;
        this.blockHash = this.calculateBlockHash();
    }

    getNumParticipants = () => {
        return this.transactions.cardDispense.length;
    };

    getLatestDeckHistory = () => {
        return this.transactions.deckHistory[this.transactions.deckHistory.length - 1];
    };

    addTransaction = (type, data) => {
        this.transactions[type].push(data);
    };

    calculateBlockHash = () => {
        return calcHash(this.timestamp + JSON.stringify(this.transaction) + this.previousBlockHash + this.nonce).toString();
    };

    mine = (difficulty) => {
        let zeros = "";
        for (let i = 0; i < difficulty; i++) zeros += "0";

        while(true) {
            const hash = this.calculateBlockHash();
            if (hash.substring(0, difficulty) === zeros) {
                this.blockHash = hash;
                break;
            }
            this.nonce++;
        }

        console.log("Mining completed!");
        console.log("New block\'s nonce: " + this.nonce);
        console.log("New block\'s blockHash: " + this.blockHash);
    };
}