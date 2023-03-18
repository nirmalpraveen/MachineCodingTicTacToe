let squareWidth = 4;

const block = (i, j) => {
  const el = document.createElement("div");
  el.setAttribute(
    "style",
    "height: 20px; width: 20px; border: 1px solid black; cursor: pointer"
  );
  el.setAttribute("data-x", i);
  el.setAttribute("data-y", j);
  el.addEventListener("click", function () {
    markTheBox(i, j, "tic");
    botPlayer(i, j);
  });
  el.textContent = "";
  return el;
};

const markTheBox = (i, j, mark) => {
  const box = document.querySelector(`[data-x="${i}"][data-y="${j}"]`);
  checkIfGameFinished();
  if (mark === "tic") {
    box.textContent = "X";
  } else if (mark === "tac") {
    box.textContent = "O";
  }
};

const botPlayer = (i, j) => {
  if (i < squareWidth - 1 && j < squareWidth - 1) {
    setTimeout(() => {
      markTheBox(i + 1, j + 1, "tac");
    }, 1000);
  }
};

const root = document.getElementById("root");
root.setAttribute(
  "style",
  `display: grid; grid-template-columns: repeat(${squareWidth}, 0fr); text-align: center;`
);

const createMatrix = (a, b) => {
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      root.appendChild(block(i, j));
    }
  }
};

createMatrix(squareWidth, squareWidth);

const checkIfGameFinished = () => {
  //get tics from grid
  //get toes from grid
  const tic = [];
  const toe = [];
  const blocks = root.childNodes;
  blocks.forEach((block) => {
    if (block.textContent === "X") {
      console.log("call in");
      tic.push({ x: Number(block.dataset.x), y: Number(block.dataset.y) });
      blockCheck(tic);
    }
    if (block.textContent === "O") {
      toe.push({ x: Number(block.dataset.x), y: Number(block.dataset.y) });
      // blockCheck(toe);
    }
  });
};

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    acc[key] ??= [];
    acc[key].push(obj);
    return acc;
  }, {});
}

const isLengthAchieved = (groupedDaata) => {
  var isAchieved = false;
  Object.values(groupedDaata).forEach((item) => {
    if (item?.length === squareWidth) {
      isAchieved = true;
    }
  });
  return isAchieved;
};

const blockCheck = (obj) => {
  let arr = [
    { x: 1, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 3, y: 2 }
  ];
  // console.log(arr);
  // console.log(obj);

  obj.sort((a, b) => {
    return a.y - b.y;
  });
  obj.sort((a, b) => {
    return a.x - b.x;
  });
  const groupedX = groupBy(obj, "x");
  const groupedY = groupBy(obj, "y");
  console.log(groupedX);
  // console.log(groupedY);
  const isXLengthAchieved = isLengthAchieved(groupedX);
  const isYLengthAchieved = isLengthAchieved(groupedY);
  if (isXLengthAchieved || isYLengthAchieved) {
    console.log("game ended");
  }
};

// checkIfGameFinished();
