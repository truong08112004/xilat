var dealerboard = document.querySelector(".dealer");
var playerboard = document.querySelector(".player");

var playerHand = [];
var dealerHand = [];
var playerScore = 0;
var dealerScore = 0;

function createCard(name, value) {
  return ["Cards/card" + name + ".png", value];
}

var cards = {
  Diamonds2: createCard("Diamonds2", 2),
  Diamonds3: createCard("Diamonds3", 3),
  Diamonds4: createCard("Diamonds4", 4),
  Diamonds5: createCard("Diamonds5", 5),
  Diamonds6: createCard("Diamonds6", 6),
  Diamonds7: createCard("Diamonds7", 7),
  Diamonds8: createCard("Diamonds8", 8),
  Diamonds9: createCard("Diamonds9", 9),
  Diamonds10: createCard("Diamonds10", 10),
  DiamondsJ: createCard("DiamondsJ", 10),
  DiamondsQ: createCard("DiamondsQ", 10),
  DiamondsK: createCard("DiamondsK", 10),
  DiamondsA: createCard("DiamondsA", 1),

  Hearts2: createCard("Hearts2", 2),
  Hearts3: createCard("Hearts3", 3),
  Hearts4: createCard("Hearts4", 4),
  Hearts5: createCard("Hearts5", 5),
  Hearts6: createCard("Hearts6", 6),
  Hearts7: createCard("Hearts7", 7),
  Hearts8: createCard("Hearts8", 8),
  Hearts9: createCard("Hearts9", 9),
  Hearts10: createCard("Hearts10", 10),
  HeartsJ: createCard("HeartsJ", 10),
  HeartsQ: createCard("HeartsQ", 10),
  HeartsK: createCard("HeartsK", 10),
  HeartsA: createCard("HeartsA", 1),

  Clubs2: createCard("Clubs2", 2),
  Clubs3: createCard("Clubs3", 3),
  Clubs4: createCard("Clubs4", 4),
  Clubs5: createCard("Clubs5", 5),
  Clubs6: createCard("Clubs6", 6),
  Clubs7: createCard("Clubs7", 7),
  Clubs8: createCard("Clubs8", 8),
  Clubs9: createCard("Clubs9", 9),
  Clubs10: createCard("Clubs10", 10),
  ClubsJ: createCard("ClubsJ", 10),
  ClubsQ: createCard("ClubsQ", 10),
  ClubsK: createCard("ClubsK", 10),
  ClubsA: createCard("ClubsA", 1),

  Spades2: createCard("Spades2", 2),
  Spades3: createCard("Spades3", 3),
  Spades4: createCard("Spades4", 4),
  Spades5: createCard("Spades5", 5),
  Spades6: createCard("Spades6", 6),
  Spades7: createCard("Spades7", 7),
  Spades8: createCard("Spades8", 8),
  Spades9: createCard("Spades9", 9),
  Spades10: createCard("Spades10", 10),
  SpadesJ: createCard("SpadesJ", 10),
  SpadesQ: createCard("SpadesQ", 10),
  SpadesK: createCard("SpadesK", 10),
  SpadesA: createCard("SpadesA", 1),
};

var allCardKeys = Object.keys(cards).slice();
// Shuffle the array using the Fisher-Yates shuffle algorithm
function shuffled() {
  for (var i = allCardKeys.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [allCardKeys[i], allCardKeys[j]] = [allCardKeys[j], allCardKeys[i]];
  }
}

function addnewcard(key) {
  var cardimage = cards[key][0];
  // console.log(cards[key][1]);
  var newcard = `<div class="card" onclick="displaycard(this)">
  <div class="card-inner">
    <div class="card-front"><img src="${cardimage}" alt=""></div>
    <div class="card-back"><img src="Cards/cardBack_blue2.png" alt=""></div>
  </div>
</div>`;
  // var newImage = document.createElement(newcard);
  // newImage.src = cards[key][0];
  return newcard;
}

function drawcard(who) {
  var drawncard = allCardKeys.pop();
  who.push(drawncard);
  if (who === playerHand) {
    // playerboard.innerHTML += addnewcard(drawncard);
    playerboard.insertAdjacentHTML("afterbegin", addnewcard(drawncard));
  } else {
    // dealerboard.innerHTML += addnewcard(drawncard);
    dealerboard.insertAdjacentHTML("afterbegin", addnewcard(drawncard));
  }
  displayplayerscore(playerHand);
}

function dealCards() {
  shuffled();
  drawcard(playerHand);
  drawcard(dealerHand);
  drawcard(playerHand);
  drawcard(dealerHand);

  console.log(playerHand);
  console.log(dealerHand);
}

function displaycard(card) {
  card.classList.toggle("rotate");
}
function refreshPage() {
  // Reload the current page
  location.reload();
}

function calpoint(hand) {
  let score = 0;
  let aceCount = 0;
  for (let i = 0; i < hand.length; i++) {
    if (cards[hand[i]][1] == 1) {
      score += 11;
      aceCount++;
    } else {
      score += cards[hand[i]][1];
    }
  }
  while (aceCount > 0 && score > 21) {
    score -= 10;
    aceCount--;
  }
  playerScore = score;
  return score;
}
function calpointdeal() {
  let score = 0;
  let aceCount = 0;
  for (let i = 0; i < dealerHand.length; i++) {
    if (cards[dealerHand[i]][1] == 1) {
      score += 11;
      aceCount++;
    } else {
      score += cards[dealerHand[i]][1];
    }
  }
  while (aceCount > 0 && score > 21) {
    score -= 10;
    aceCount--;
  }
  dealerScore = score;
  return score;
}

var playerScoreElement = document.querySelector(".playerscore");
function displayplayerscore() {
  console.log(calpoint(playerHand));
  playerScoreElement.innerText = calpoint(playerHand);
}
displayplayerscore(playerHand);

function determineWinner(playerScore, dealerScore) {
  if (playerScore > 21) {
    return "Dealer wins";
  } else if (dealerScore > 21) {
    return "Player wins";
  } else if (playerScore > dealerScore) {
    return "Player wins";
  } else if (dealerScore > playerScore) {
    return "Dealer wins";
  } else {
    return "It's a tie";
  }
}

function finish() {
  calpointdeal();
  while (dealerScore < 16) {
    drawcard(dealerHand);
    calpointdeal();
  }
  cardclick();
  let chat = document.querySelector(".chat");
  chat.innerText = determineWinner(playerScore, dealerScore);
}

function cardclick() {
  var dealerDiv = document.querySelector(".dealer");
  var cards = dealerDiv.querySelectorAll(".card");
  cards.forEach(function (card) {
    card.click();
  });
}
