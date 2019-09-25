'use strict';

const cupTable = {
    gameItem: document.querySelectorAll('.game'),
    quarterFinalItem: document.querySelectorAll('.quarter-final-game'),
    semiFinalItem: document.querySelectorAll('.semi-final-game'),
    finalItem: document.querySelector('.final-game'),
    teamItems: document.querySelectorAll('.game__item__team'),
    teamItemsQuarterFinal: document.querySelectorAll('.second-round-team'),
    teamItemsSemiFinal: document.querySelectorAll('.semi-final-round-team'),
    teamItemsFinal: document.querySelectorAll('.final-round-team'),
    goalsCount: document.querySelectorAll('.game__item__score'),
    goalsCount1: document.querySelectorAll('.second-round-score'),
    goalsCount2: document.querySelectorAll('.semi-final-round-score'),
    goalsCount3: document.querySelectorAll('.final-round-score'),
    teams: ['спартак', 'динамо', 'цска', 'барселона', 'уралан', 'зенит', 'лидс', 'тула', 'омск', 'анжи', 'терек',
        'урал', 'милан', 'аякс', 'реал мадрид', 'торпедо'],
    firstRound: [],
    secondRound: [],
    semiFinalRound: [],
    semiFinalRoundResult: [],
    finalRound: [],
    final: [],
    finalResult: [],
    winner: [],
    currentGame: {
      team: "",
      teamGoals: 0,
    },

    init(){
        this.renderTeams();
        this.renderFirstRound();
        this.renderSemiFinal();
        this.renderFinal();
        this.countGame();
    },

    countGame(){
        this.gameItem.forEach(function(item, i){
            item.insertAdjacentHTML('afterbegin', `<div class="game-number">${i+1}</div>`);
        });

        this.quarterFinalItem.forEach(function(item, i){
            item.insertAdjacentHTML('afterbegin', `<div class="game-number-quarter-final">${i+1}</div>`);
        });

        this.semiFinalItem.forEach(function(item, i){
            item.insertAdjacentHTML('afterbegin', `<div class="game-number-semi-final">${i+1}</div>`);
        });

        this.finalItem.insertAdjacentHTML('afterbegin', `<div class="game-final">1</div>`);
    },

    renderTeams(){
        for(let i = 0; i < this.teams.length; i++) {
            for(let j = 0; j < this.teamItems.length; j++) {
                this.teamItems[j].textContent = this.teams[j];
            }
            this.playGame(this.teams[i], this.firstRound);
            this.goalsCount[i].textContent = this.currentGame.teamGoals;
            this.goalsCount[i].dataset.team = this.currentGame.team;
        }

        this.countRound(this.firstRound, this.secondRound, this.goalsCount);
    },

    renderFirstRound(){
        for(let i = 0; i < this.secondRound.length; i++) {
            for(let j = 0; j < this.teamItemsQuarterFinal.length; j++) {
                this.teamItemsQuarterFinal[j].textContent = this.secondRound[j];
            }
            this.playGame(this.secondRound[i], this.semiFinalRound);
            this.goalsCount1[i].textContent = this.currentGame.teamGoals;
            this.goalsCount1[i].dataset.team = this.currentGame.team;
        }

        this.countRound(this.semiFinalRound, this.semiFinalRoundResult, this.goalsCount1);
    },

    renderSemiFinal(){
        for(let i = 0; i < this.semiFinalRoundResult.length; i++) {
            for(let j = 0; j < this.teamItemsSemiFinal.length; j++) {
                this.teamItemsSemiFinal[j].textContent = this.semiFinalRoundResult[j];
            }
            this.playGame(this.semiFinalRoundResult[i], this.finalRound);
            this.goalsCount2[i].textContent = this.currentGame.teamGoals;
            this.goalsCount2[i].dataset.team = this.currentGame.team;
        }

        this.countRound(this.finalRound, this.final, this.goalsCount2);
    },

    renderFinal(){
        for(let i = 0; i < this.final.length; i++) {
            for(let j = 0; j < this.teamItemsFinal.length; j++) {
                this.teamItemsFinal[j].textContent = this.final[j];
            }
            this.playGame(this.final[i], this.finalResult);
            this.goalsCount3[i].textContent = this.currentGame.teamGoals;
            this.goalsCount3[i].dataset.team = this.currentGame.team;
        }

        this.countRound(this.finalResult, this.winner, this.goalsCount3);
    },

    playGame(value, round){
      this.currentGame.teamGoals = Math.floor(Math.random() * 3);
      this.currentGame.team = value;
      round.push({team: value, teamGoals: this.currentGame.teamGoals});
    },

    countRound(currentRound, nextRound, goalsResult){
        for(let i = 0; i < currentRound.length; i++){
            if(i % 2 === 1) {
                continue;
            } else {
                if(currentRound[i].teamGoals > currentRound[i+1].teamGoals) {
                    nextRound.push(currentRound[i].team);
                } else if(currentRound[i].teamGoals === currentRound[i+1].teamGoals){
                    currentRound[i].teamGoals++;
                    //console.log(goalsResult);
                    //console.log(currentRound[i].team);
                    goalsResult.forEach((item) => {
                        //console.log(item.dataset);
                        if(item.dataset.team === currentRound[i].team){
                            item.textContent = currentRound[i].teamGoals;
                        }

                    });

                    nextRound.push(currentRound[i].team);
                } else {
                    nextRound.push(currentRound[i+1].team);
                }
            }
        }
    },
};

window.addEventListener('load', () => {cupTable.init()});