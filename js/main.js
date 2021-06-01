// Случайное целое число
// Взято с https://learn.javascript.ru
// "Ошибку" добавил от себя)

const RANDOM_INTEGER = function (min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    if (min >= max) {
       return 'ошибка'; 
    }
    return Math.floor(rand);
  }
  
 console.log(RANDOM_INTEGER(1,5)); 


// Случайное число с плавающей точкой
// Попробовал написать сам, знаю что написал не особо правильно, но вроде работает

function randomFractNumber(min, max, _afterDot){
  let rand = min + Math.random() * (max + 1 - min);
  if (min >= max) {
    return 'ошибка'; 
 }
  return (rand.toFixed(_afterDot));
}

console.log(randomFractNumber(1,5,2));