import PartnerType from "@/types/Partner";

export function splitUniqueData(data: PartnerType[]) {
  const firstMarqueeData: PartnerType[] = [];
  const secondMarqueeData: PartnerType[] = [];
  const usedNames: Set<string> = new Set();

  for (const item of data) {
    if (!usedNames.has(item.name)) {
      if (firstMarqueeData.length < data.length / 2) {
        firstMarqueeData.push(item);
      } else {
        secondMarqueeData.push(item);
      }
      usedNames.add(item.name);
    } else {
      secondMarqueeData.push(item);
    }
  }

  const secondMarqueeSet = new Set<string>();
  secondMarqueeData.forEach((item, index) => {
    if (secondMarqueeSet.has(item.name)) {
      secondMarqueeData.splice(index, 1);
    } else {
      secondMarqueeSet.add(item.name);
    }
  });

  return { firstMarqueeData, secondMarqueeData };
}

export function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
